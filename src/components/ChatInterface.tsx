"use client";

import { useChat } from "@ai-sdk/react";
import { useRef, useEffect, useState } from "react";
import { Send, Bot, User, Sparkles, MessageCircle } from "lucide-react";

export default function ChatInterface() {
  const { messages, status, error, sendMessage } = useChat({
    // Vercel AI SDK v3 changed how API URL is set, wait let's just use useChat() it might still default to /api/chat. 
    // Actually the newer useChat doesn't use 'api', it might rely on transport or fetch.
    // Let me remove the `api` parameter to use defaults, or if it fails we will configure it appropriately.
  });

  const [input, setInput] = useState("");
  const isLoading = status === "submitted" || status === "streaming";

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (messages.length > 0 && messagesEndRef.current) {
      const scrollContainer = messagesEndRef.current.parentElement;
      if (scrollContainer) {
        scrollContainer.scrollTo({
          top: scrollContainer.scrollHeight,
          behavior: "smooth",
        });
      }
    }
  }, [messages]);

  const suggestedQuestions = [
    "What's your experience as a developer?",
    "What projects have you worked on?",
    "What can you help me build or solve?",
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    sendMessage({ text: input });
    setInput("");
  };

  return (
    <section id="chat" className="py-24 md:py-32 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-12 scroll-animate">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
            <Sparkles size={14} />
            <span>Powered by AI</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ask <span className="text-primary">My AI</span>
          </h2>
          <p className="text-text-muted text-lg max-w-xl mx-auto">
            Ask me anything about my skills, experience, projects, or how we can collaborate. My AI assistant is ready to help!
          </p>
        </div>

        {/* Chat Container */}
        <div className="scroll-animate glass-card overflow-hidden" style={{ boxShadow: "0 0 60px rgba(255, 74, 87, 0.08)" }}>
          {/* Chat Header */}
          <div className="px-6 py-4 border-b border-border-subtle flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
              <Bot size={20} className="text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-sm">Ferdy AI Assistant</h3>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs text-text-muted">Online</span>
              </div>
            </div>
          </div>

          {/* Messages Area */}
          <div className="h-[420px] overflow-y-auto px-6 py-6 space-y-5">
            {/* Welcome Message */}
            {messages.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                  <MessageCircle size={28} className="text-primary" />
                </div>
                <h4 className="text-lg font-semibold mb-2">
                  Hello! 👋
                </h4>
                <p className="text-text-muted text-sm mb-6 max-w-sm">
                  I am Ferdy's AI assistant. Ask me anything about Ferdy's skills, experience, or projects.
                </p>

                {/* Suggested Questions */}
                <div className="flex flex-wrap gap-2 justify-center">
                  {suggestedQuestions.map((q) => (
                    <button
                      key={q}
                      onClick={() => {
                        setInput(q);
                        sendMessage({ text: q });
                        setInput("");
                      }}
                      className="px-4 py-2 text-xs rounded-full border border-border-subtle bg-bg-input text-text-secondary hover:border-primary/50 hover:text-primary transition-all duration-300"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Message Bubbles */}
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {/* AI Avatar */}
                {message.role === "assistant" && (
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center mt-1">
                    <Bot size={16} className="text-primary" />
                  </div>
                )}

                {/* Bubble */}
                <div
                  className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed chat-message ${
                    message.role === "user"
                      ? "bg-primary text-white rounded-br-md"
                      : "bg-chat-ai border border-border-subtle rounded-bl-md text-text-secondary"
                  }`}
                >
                  {message.parts.map((p, i) => {
                    if (p.type === 'text') {
                      const textParts = p.text.split(/(\*\*.*?\*\*)/g);
                      return (
                        <span key={i} className="whitespace-pre-wrap">
                          {textParts.map((tPart, tIdx) => {
                            if (tPart.startsWith("**") && tPart.endsWith("**")) {
                              return <strong key={tIdx} className="text-white font-semibold">{tPart.slice(2, -2)}</strong>;
                            }
                            return <span key={tIdx}>{tPart}</span>;
                          })}
                        </span>
                      );
                    }
                    if (p.type === 'reasoning') return <div key={i} className="text-xs italic text-gray-400 whitespace-pre-wrap">{p.text}</div>;
                    return null;
                  })}
                </div>

                {/* User Avatar */}
                {message.role === "user" && (
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/30 flex items-center justify-center mt-1">
                    <User size={16} className="text-white" />
                  </div>
                )}
              </div>
            ))}

            {/* Loading Indicator */}
            {isLoading && (
              <div className="flex gap-3 justify-start">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center mt-1">
                  <Bot size={16} className="text-primary" />
                </div>
                <div className="bg-chat-ai border border-border-subtle px-4 py-3 rounded-2xl rounded-bl-md">
                  <div className="flex gap-1.5">
                    <span className="loading-dot w-2 h-2 rounded-full bg-primary" />
                    <span className="loading-dot w-2 h-2 rounded-full bg-primary" />
                    <span className="loading-dot w-2 h-2 rounded-full bg-primary" />
                  </div>
                </div>
              </div>
            )}

            {/* Error */}
            {error && (
              <div className="text-center">
                <p className="text-red-400 text-sm bg-red-400/10 border border-red-400/20 px-4 py-2 rounded-lg inline-block">
                  Sorry, an error occurred. Please try again.
                </p>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <form
            onSubmit={handleSubmit}
            className="px-6 py-4 border-t border-border-subtle flex gap-3"
          >
            <input
              id="chat-input"
              type="text"
              value={input}
              onChange={handleInputChange}
              placeholder="Type your question..."
              disabled={isLoading}
              className="flex-1 px-4 py-3 rounded-xl bg-bg-input border border-border-input text-white text-sm placeholder:text-text-muted/60 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all duration-300 disabled:opacity-50"
            />
            <button
              id="chat-submit"
              type="submit"
              disabled={isLoading || !input.trim()}
              className="px-4 py-3 bg-primary hover:bg-primary/90 disabled:bg-primary/30 text-white rounded-xl transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_5px_20px_rgba(255,74,87,0.3)] disabled:hover:translate-y-0 disabled:hover:shadow-none"
            >
              <Send size={18} />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
