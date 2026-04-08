"use client";

import { useState } from "react";
import { Send, Mail, MapPin, Phone, CheckCircle } from "lucide-react";

export default function ContactSection() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder — connect to real form handler (Formspree, etc.)
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section id="contact" className="py-24 md:py-32 px-6 bg-bg-darker">
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-16 scroll-animate">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Let's <span className="text-primary">Collaborate</span>
          </h2>
          <p className="text-text-muted text-lg max-w-xl mx-auto">
            Interested in working together? Send me a message and let's turn your ideas into reality.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Contact Info */}
          <div className="lg:col-span-2 scroll-animate space-y-6">
            <div className="glass-card p-6 flex items-start gap-4 hover:-translate-y-1 transition-all duration-300">
              <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Mail size={20} className="text-primary" />
              </div>
              <div>
                <h4 className="font-semibold text-sm mb-1">Email</h4>
                <p className="text-text-muted text-sm">ferdy@example.com</p>
              </div>
            </div>

            <div className="glass-card p-6 flex items-start gap-4 hover:-translate-y-1 transition-all duration-300">
              <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Phone size={20} className="text-primary" />
              </div>
              <div>
                <h4 className="font-semibold text-sm mb-1">Phone</h4>
                <p className="text-text-muted text-sm">+62 812 xxxx xxxx</p>
              </div>
            </div>

            <div className="glass-card p-6 flex items-start gap-4 hover:-translate-y-1 transition-all duration-300">
              <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <MapPin size={20} className="text-primary" />
              </div>
              <div>
                <h4 className="font-semibold text-sm mb-1">Location</h4>
                <p className="text-text-muted text-sm">Indonesia</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3 scroll-animate" style={{ transitionDelay: "0.15s" }}>
            <form onSubmit={handleSubmit} className="glass-card p-8 space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <input
                  id="contact-name"
                  type="text"
                  placeholder="Your Name"
                  required
                  className="w-full px-4 py-3.5 rounded-xl bg-bg-input border border-border-input text-white text-sm placeholder:text-text-muted/60 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all duration-300"
                />
                <input
                  id="contact-email"
                  type="email"
                  placeholder="Your Email"
                  required
                  className="w-full px-4 py-3.5 rounded-xl bg-bg-input border border-border-input text-white text-sm placeholder:text-text-muted/60 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all duration-300"
                />
              </div>
              <input
                id="contact-subject"
                type="text"
                placeholder="Subject"
                className="w-full px-4 py-3.5 rounded-xl bg-bg-input border border-border-input text-white text-sm placeholder:text-text-muted/60 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all duration-300"
              />
              <textarea
                id="contact-message"
                placeholder="Your Message"
                rows={5}
                required
                className="w-full px-4 py-3.5 rounded-xl bg-bg-input border border-border-input text-white text-sm placeholder:text-text-muted/60 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all duration-300 resize-none"
              />
              <button
                id="contact-submit"
                type="submit"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-primary text-white rounded-full font-semibold transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(255,74,87,0.4)]"
              >
                {submitted ? (
                  <>
                    <CheckCircle size={18} />
                    Sent!
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
