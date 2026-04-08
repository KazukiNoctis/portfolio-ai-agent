"use client";

import { useState } from "react";
import { ExternalLink, Code2, X, ChevronLeft, ChevronRight, Image as ImageIcon } from "lucide-react";

export interface Project {
  title: string;
  description: string;
  stack: string[];
  code_url?: string;
  demo_url?: string;
  image_urls?: string[];
  delay?: string;
}

const defaultProjects: Project[] = [
  {
    title: "E-Commerce Platform",
    description:
      "Full-stack E-commerce application with interactive shopping cart, payment gateway, and admin dashboard.",
    stack: ["Next.js", "TypeScript", "Supabase", "Stripe"],
    delay: "0s",
  },
  {
    title: "Enterprise Dashboard",
    description:
      "Enterprise Management System based on dynamic dashboards with real-time analytics and role-based access.",
    stack: ["React", "Laravel", "MySQL", "Chart.js"],
    delay: "0.15s",
  },
  {
    title: "AI Portfolio Assistant",
    description:
      "Interactive portfolio website with an AI chatbot that uses RAG to answer visitor questions.",
    stack: ["Next.js", "OpenAI", "Supabase", "Vercel AI"],
    delay: "0.3s",
  },
];

interface PortfolioSectionProps {
  projects?: Project[];
}

export default function PortfolioSection({ projects = defaultProjects }: PortfolioSectionProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openLightbox = (project: Project) => {
    if (project.image_urls && project.image_urls.length > 0) {
      setSelectedProject(project);
      setCurrentImageIndex(0);
      document.body.style.overflow = "hidden"; // Prevent background scrolling
    }
  };

  const closeLightbox = () => {
    setSelectedProject(null);
    document.body.style.overflow = "auto";
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedProject?.image_urls) {
      setCurrentImageIndex((prev) => (prev + 1) % selectedProject.image_urls!.length);
    }
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedProject?.image_urls) {
      setCurrentImageIndex((prev) =>
        prev === 0 ? selectedProject.image_urls!.length - 1 : prev - 1
      );
    }
  };

  return (
    <section id="portfolio" className="py-24 md:py-32 px-6 bg-bg-darker">
      <div className="max-w-6xl mx-auto relative">
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
          {projects.map((project, idx) => {
            const hasImages = project.image_urls && project.image_urls.length > 0;
            const thumbnailUrl = hasImages ? project.image_urls![0] : null;

            return (
              <div
                key={project.title + idx}
                className="scroll-animate flex flex-col group glass-card overflow-hidden hover:-translate-y-3 transition-all duration-500 border-b-4 border-transparent hover:border-primary"
                style={{ transitionDelay: project.delay || "0s" }}
              >
                {/* Card Gradient Top */}
                <div className="h-2 bg-gradient-to-r from-primary/60 via-primary to-primary/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Thumbnail Layer */}
                <div 
                  className={`w-full h-48 relative overflow-hidden bg-bg-subtle/50 flex items-center justify-center ${hasImages ? "cursor-pointer" : ""}`}
                  onClick={() => openLightbox(project)}
                >
                  {thumbnailUrl ? (
                    <>
                      <img 
                        src={thumbnailUrl} 
                        alt={project.title} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      {/* Image Count Badge */}
                      <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-sm text-white text-xs px-2 py-1 rounded flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <ImageIcon size={14} />
                        <span>{project.image_urls!.length}</span>
                      </div>
                      {/* Overlay on hover */}
                      <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <span className="bg-bg-card/90 text-primary px-4 py-2 rounded-full text-sm font-medium backdrop-blur-md transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                          View Gallery
                        </span>
                      </div>
                    </>
                  ) : (
                    <div className="text-text-muted/50 flex flex-col items-center gap-2">
                       <ImageIcon size={32} />
                       <span className="text-sm border border-border-subtle px-3 py-1 rounded-full">No Preview</span>
                    </div>
                  )}
                </div>

                <div className="p-7 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-text-muted text-sm leading-relaxed mb-5 flex-1">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.stack && project.stack.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary border border-primary/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex gap-4 mt-auto">
                    {project.code_url && (
                      <a 
                        href={project.code_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-sm text-text-muted hover:text-primary transition-colors duration-300"
                      >
                        <Code2 size={16} />
                        Code
                      </a>
                    )}
                    {project.demo_url && (
                      <a 
                        href={project.demo_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-sm text-text-muted hover:text-primary transition-colors duration-300"
                      >
                        <ExternalLink size={16} />
                        Demo
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Lightbox / Image Gallery Modal */}
      {selectedProject && selectedProject.image_urls && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-fade-in"
          onClick={closeLightbox}
        >
          {/* Close Button */}
          <button 
            className="absolute top-6 right-6 text-white/70 hover:text-white bg-white/10 hover:bg-primary/50 p-2 rounded-full backdrop-blur-sm transition-all"
            onClick={closeLightbox}
          >
            <X size={24} />
          </button>

          <div className="relative max-w-5xl w-full max-h-[85vh] flex flex-col items-center">
            {/* Main Image */}
            <img 
              src={selectedProject.image_urls[currentImageIndex]} 
              alt={`${selectedProject.title} screenshot ${currentImageIndex + 1}`}
              className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl border border-white/10"
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking the image
            />
            
            {/* Image Counter */}
            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-white/80 font-medium tracking-widest text-sm bg-black/50 px-4 py-1.5 rounded-full backdrop-blur-sm">
              {currentImageIndex + 1} / {selectedProject.image_urls.length}
            </div>

            {/* Navigation Arrows (Only show if > 1 image) */}
            {selectedProject.image_urls.length > 1 && (
              <>
                <button 
                  className="absolute left-2 md:-left-12 top-1/2 -translate-y-1/2 text-white/50 hover:text-white bg-black/40 hover:bg-primary/60 p-3 rounded-full backdrop-blur-sm transition-all shadow-lg"
                  onClick={handlePrev}
                >
                  <ChevronLeft size={28} />
                </button>
                <button 
                  className="absolute right-2 md:-right-12 top-1/2 -translate-y-1/2 text-white/50 hover:text-white bg-black/40 hover:bg-primary/60 p-3 rounded-full backdrop-blur-sm transition-all shadow-lg"
                  onClick={handleNext}
                >
                  <ChevronRight size={28} />
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
