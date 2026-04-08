"use client";

import { Code2, Palette, Brain, Globe } from "lucide-react";

const skills = [
  {
    icon: Code2,
    title: "Web Development",
    description:
      "Building modern web applications with Next.js, React, TypeScript, and Laravel.",
    delay: "0s",
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description:
      "Designing intuitive and engaging interfaces for the best user experience.",
    delay: "0.15s",
  },
  {
    icon: Brain,
    title: "AI Integration",
    description:
      "Integrating artificial intelligence into applications for smarter solutions.",
    delay: "0.3s",
  },
  {
    icon: Globe,
    title: "Web3 & Blockchain",
    description:
      "Exploring decentralized technologies and smart contracts for the future of the web.",
    delay: "0.45s",
  },
];

export default function AboutSection() {
  return (
    <section id="about" className="py-24 md:py-32 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-16 scroll-animate">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            About <span className="text-primary">Me</span>
          </h2>
          <p className="text-text-muted text-lg max-w-2xl mx-auto leading-relaxed">
            I am a web developer with a passion for UI/UX design and web interactivity.
            I have extensive experience building responsive and dynamic web applications 
            using the latest technologies.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {skills.map((skill) => (
            <div
              key={skill.title}
              className="scroll-animate group glass-card p-6 hover:-translate-y-2 transition-all duration-500 border-b-2 border-transparent hover:border-primary"
              style={{ transitionDelay: skill.delay }}
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                <skill.icon size={24} className="text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{skill.title}</h3>
              <p className="text-text-muted text-sm leading-relaxed">
                {skill.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
