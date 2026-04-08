import { streamText } from "ai";
import { openai } from "@ai-sdk/openai";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabase = supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null;

// Initialize OpenAI client for embeddings
const embeddingModel = "text-embedding-3-small";

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    // Get the last user message
    const lastUserMessage = messages
      .filter((m: { role: string }) => m.role === "user")
      .pop();

    if (!lastUserMessage) {
      return new Response("No user message found", { status: 400 });
    }

    // Generate embedding for the user's query
    let contextText = "";

    try {
      let queryText = lastUserMessage.content || "";
      if (lastUserMessage.parts && Array.isArray(lastUserMessage.parts)) {
        queryText = lastUserMessage.parts
          .filter((p: any) => p.type === "text")
          .map((p: any) => p.text)
          .join("");
      }

      const embeddingResponse = await fetch(
        "https://api.openai.com/v1/embeddings",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: embeddingModel,
            input: queryText,
          }),
        }
      );

      if (embeddingResponse.ok) {
        const embeddingData = await embeddingResponse.json();
        const queryEmbedding = embeddingData.data[0].embedding;

        let documents = null;
        let error = null;
        
        if (supabase) {
          const result = await supabase.rpc(
            "match_documents",
            {
              query_embedding: queryEmbedding,
              match_threshold: 0.05,
              match_count: 5,
            }
          );
          documents = result.data;
          error = result.error;
          if (error) {
            console.error("Supabase RPC Error:", JSON.stringify(error));
          }
        }

        if (!error && documents && documents.length > 0) {
          contextText = documents
            .map(
              (doc: { content: string; metadata?: any }) => {
                const metaString = doc.metadata ? `[Metadata Category/Topic: ${JSON.stringify(doc.metadata)}]` : "";
                return `${metaString}\n${doc.content}`;
              }
            )
            .join("\n\n---\n\n");
        }
      }
    } catch (embeddingError) {
      console.error("Embedding/search error (proceeding without RAG):", embeddingError);
      // Continue without RAG context - the AI will still respond using its general knowledge
    }

    // Build the system prompt with or without RAG context
    const systemPrompt = contextText
      ? `You are [Your Name]'s AI portfolio assistant. Your job is to enthusiastically and professionally answer visitor questions about [Your Name]'s experience, skills, and projects based on the context provided.
      
      CRITICAL INSTRUCTIONS:
      1. Use the Context Information below to answer the user's questions. Synthesize and connect experience fragments to explain their career journey or skills.
      2. If the context does not contain enough information to fully answer, provide whatever relevant details you do have, and politely offer their email ([Your Email]) for further questions.
      3. Your tone must be friendly, professional, concise, yet enthusiastic.
      4. DO NOT invent fake projects or fake skills not found in the context.
      5. Answer in the same language the user asks. If English, reply in English. If Indonesian, reply in Indonesian.
      
      Context Information:
      ${contextText}
      
      You are currently chatting with a visitor on [Your Name]'s portfolio website. Keep responses concise unless asked for details.`
      : `You are [Your Name]'s AI portfolio assistant. 
You can help answer questions about [Your Name], their skills, experience, and projects.
If you are unsure of the answer, state that you don't have that specific information in your database yet.
Use friendly and professional language. Answer in the same language the user asks.

General information:
- [Your Name] is a Web Developer & UI/UX Designer
- [Your Name] is experienced in building modern web applications
- Technology stack: Next.js, React, TypeScript, Tailwind CSS, Laravel, and more
- Interested in AI/ML integration and Web3`;

    // Convert UIMessages to CoreMessages suitable for streamText
    const coreMessages = messages.map((msg: any) => {
      let textContent = msg.content || "";
      if (msg.parts && Array.isArray(msg.parts)) {
        textContent = msg.parts
          .filter((p: any) => p.type === "text")
          .map((p: any) => p.text)
          .join("");
      }
      return {
        role: msg.role,
        content: textContent,
      };
    });

    // Stream the response using Vercel AI SDK
    const result = streamText({
      model: openai("gpt-4o-mini"),
      system: systemPrompt,
      messages: coreMessages,
    });

    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error("Chat API error:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
