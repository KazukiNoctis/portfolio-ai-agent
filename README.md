# AI-Powered Portfolio

This is a modern, AI-powered portfolio website built with [Next.js](https://nextjs.org), designed to showcase your projects and skills. It features an integrated AI assistant (using the Vercel AI SDK and OpenAI) that can answer visitor questions about your experience using Retrieval-Augmented Generation (RAG).

## Features

- **Next.js & React**: Modern front-end framework.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **AI Assistant**: Conversational assistant powered by `gpt-4o-mini`, Vercel AI SDK, and OpenAI.
- **RAG Integration**: Uses Supabase with `pgvector` to store and retrieve document embeddings (`text-embedding-3-small`) based on user queries.

## Getting Started

### 1. Clone & Install Dependencies

```bash
git clone https://github.com/your-username/your-repository.git
cd your-repository
npm install
```

### 2. Environment Variables

Create a `.env.local` file in the root directory and add the following keys (you can copy these from `.env.example` if available):

```ini
OPENAI_API_KEY=your_openai_api_key
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Database Setup (Supabase)

To enable the RAG feature, you need to set up a vector database in Supabase so the AI can retrieve information about you.

1. Go to your Supabase project dashboard.
2. Enable the `pgvector` extension:
   - Navigate to **Database** > **Extensions** and search for `vector`. 
   - Enable it if not already enabled.
3. Open the **SQL Editor**, and run the following script to create the required `portfolio_documents` table and the `match_documents` function. The function runs cosine similarity searches against the data you ingest:

```sql
-- Enable the pgvector extension to work with embedding vectors
create extension if not exists vector;

-- Create the table to store your context documents
create table portfolio_documents (
  id bigserial primary key,
  content text not null,
  metadata jsonb,
  embedding vector(1536) -- Using OpenAI's text-embedding-3-small
);

-- Create a function to similarity search for documents
create or replace function match_documents (
  query_embedding vector(1536),
  match_threshold float,
  match_count int
)
returns table (
  id bigint,
  content text,
  metadata jsonb,
  similarity float
)
language sql stable
as $$
  select
    portfolio_documents.id,
    portfolio_documents.content,
    portfolio_documents.metadata,
    1 - (portfolio_documents.embedding <=> query_embedding) as similarity
  from portfolio_documents
  where 1 - (portfolio_documents.embedding <=> query_embedding) > match_threshold
  order by similarity desc
  limit match_count;
$$;
```

**Important**: You will need to ingest your own contextual data (e.g., your resume, experiences, or project details) into the `portfolio_documents` table. Make sure to generate your text embeddings using OpenAI's `text-embedding-3-small` so that the vector dimensions match exactly (1536).

### 4. Customizing for Yourself

- Update `src/app/api/chat/route.ts` and replace instances of `[Your Name]` and `[Your Email]` with your actual details within the system prompt. This guarantees the AI agent accurately portrays you.
- Go through the UI screens (like the homepage, about page, and projects) to customize the hard-coded personal information.

### 5. Run the Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result. You can start editing pages by modifying `app/page.tsx` (or `src/app/page.tsx` depending on your setup).

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new).

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
