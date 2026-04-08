"use client";

import TypewriterEffect from "./TypewriterEffect";
import { ArrowDown, Sparkles } from "lucide-react";

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center text-center px-6 overflow-hidden"
    >
      {/* Background Gradient Orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary/8 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/3 rounded-full blur-[120px]" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto">
        {/* Badge */}
        <div className="animate-fade-in-up inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-8">
          <Sparkles size={14} />
          <span>AI-Powered Portfolio</span>
        </div>

        {/* Greeting */}
        <h3 className="animate-fade-in-up-delay-1 text-xl md:text-2xl text-text-muted font-light mb-2">
          Hello, I'm
        </h3>

        {/* Name */}
        <h1 className="animate-fade-in-up-delay-1 text-5xl md:text-7xl font-bold mb-4 tracking-tight">
          <span className="gradient-text">Ferdy</span>
        </h1>

        {/* Typewriter */}
        <h2 className="animate-fade-in-up-delay-2 text-2xl md:text-3xl mb-6 font-light">
          I am a <TypewriterEffect />
        </h2>

        {/* Description */}
        <p className="animate-fade-in-up-delay-2 text-text-muted text-lg max-w-xl mx-auto mb-10 leading-relaxed">
          I build beautiful and functional user interfaces, empowered
          by artificial intelligence for an exceptional collaborative experience.
        </p>

        {/* CTA Buttons */}
        <div className="animate-fade-in-up-delay-3 flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#chat"
            className="group inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-primary text-white rounded-full font-semibold transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(255,74,87,0.4)]"
          >
            <Sparkles size={18} className="group-hover:animate-spin" />
            Ask My AI
          </a>
          <a
            href="#portfolio"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 border border-border-subtle text-text-primary rounded-full font-semibold transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:bg-primary/5"
          >
            View My Work
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <a href="#about" className="text-text-muted hover:text-primary transition-colors">
          <ArrowDown size={24} />
        </a>
      </div>
    </section>
  );
}
