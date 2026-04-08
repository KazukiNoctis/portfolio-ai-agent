"use client";

import { ExternalLink, Code2 } from "lucide-react";

const projects = [
  {
    title: "E-Commerce Platform",
    description:
      "Full-stack E-commerce application with interactive shopping cart, payment gateway, and admin dashboard.",
    tags: ["Next.js", "TypeScript", "Supabase", "Stripe"],
    delay: "0s",
  },
  {
    title: "Enterprise Dashboard",
    description:
      "Enterprise Management System based on dynamic dashboards with real-time analytics and role-based access.",
    tags: ["React", "Laravel", "MySQL", "Chart.js"],
    delay: "0.15s",
  },
  {
    title: "AI Portfolio Assistant",
    description:
      "Interactive portfolio website with an AI chatbot that uses RAG to answer visitor questions.",
    tags: ["Next.js", "OpenAI", "Supabase", "Vercel AI"],
    delay: "0.3s",
  },
];

export default function PortfolioSection() {
  return (
    <section id="portfolio" className="py-24 md:py-32 px-6 bg-bg-darker">
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-16 scroll-animate">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            My <span className="text-primary">Work</span>
          </h2>
          <p className="text-text-muted text-lg max-w-2xl mx-auto">
            Some of the selected projects I've worked on.
          </p>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div
              key={project.title}
              className="scroll-animate group glass-card overflow-hidden hover:-translate-y-3 transition-all duration-500 border-b-4 border-transparent hover:border-primary"
              style={{ transitionDelay: project.delay }}
            >
              {/* Card Gradient Top */}
              <div className="h-2 bg-gradient-to-r from-primary/60 via-primary to-primary/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="p-7">
                <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-text-muted text-sm leading-relaxed mb-5">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary border border-primary/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex gap-4">
                  <button className="flex items-center gap-1.5 text-sm text-text-muted hover:text-primary transition-colors duration-300">
                    <Code2 size={16} />
                    Code
                  </button>
                  <button className="flex items-center gap-1.5 text-sm text-text-muted hover:text-primary transition-colors duration-300">
                    <ExternalLink size={16} />
                    Demo
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
