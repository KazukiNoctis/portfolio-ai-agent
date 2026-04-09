"use client";

import { useState } from "react";
import { Send, Mail, MapPin, CheckCircle, Loader2 } from "lucide-react";

export default function ContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formElement = e.currentTarget;
    setLoading(true);

    const formData = new FormData(formElement);
    formData.append("access_key", "40d373e1-0f5c-4095-babe-7346ed459a07");
    
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: json,
      });

      const data = await response.json();

      if (response.status === 200) {
        setSubmitted(true);
        formElement.reset();
        setTimeout(() => setSubmitted(false), 3000);
      } else {
        console.error("Web3Forms Response:", data);
        alert("Failed to send: " + (data.message || "Unknown error"));
      }
    } catch (error) {
      console.error("Submission Error:", error);
      alert("Error: " + (error instanceof Error ? error.message : "Something went wrong"));
    } finally {
      setLoading(false);
    }
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
          <div className="lg:col-span-2 scroll-animate space-y-8">
            <div className="glass-card p-8 flex items-start gap-6 hover:-translate-y-1 transition-all duration-300">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Mail size={26} className="text-primary" />
              </div>
              <div>
                <h4 className="font-semibold text-lg mb-1.5">Email</h4>
                <p className="text-text-muted text-base">arhamiferdy6@gmail.com</p>
              </div>
            </div>

            <div className="glass-card p-8 flex items-start gap-6 hover:-translate-y-1 transition-all duration-300">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <MapPin size={26} className="text-primary" />
              </div>
              <div>
                <h4 className="font-semibold text-lg mb-1.5">Location</h4>
                <p className="text-text-muted text-base">Indonesia</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3 scroll-animate" style={{ transitionDelay: "0.15s" }}>
            <form onSubmit={handleSubmit} className="glass-card p-8 space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  placeholder="Your Name"
                  required
                  className="w-full px-4 py-3.5 rounded-xl bg-bg-input border border-border-input text-white text-sm placeholder:text-text-muted/60 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all duration-300"
                />
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  placeholder="Your Email"
                  required
                  className="w-full px-4 py-3.5 rounded-xl bg-bg-input border border-border-input text-white text-sm placeholder:text-text-muted/60 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all duration-300"
                />
              </div>
              <input
                id="contact-subject"
                name="subject"
                type="text"
                placeholder="Subject"
                className="w-full px-4 py-3.5 rounded-xl bg-bg-input border border-border-input text-white text-sm placeholder:text-text-muted/60 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all duration-300"
              />
              <textarea
                id="contact-message"
                name="message"
                placeholder="Your Message"
                rows={5}
                required
                className="w-full px-4 py-3.5 rounded-xl bg-bg-input border border-border-input text-white text-sm placeholder:text-text-muted/60 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all duration-300 resize-none"
              />
              <button
                id="contact-submit"
                type="submit"
                disabled={loading || submitted}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-primary text-white rounded-full font-semibold transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(255,74,87,0.4)] disabled:opacity-70 disabled:hover:-translate-y-0 disabled:hover:shadow-none"
              >
                {loading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Sending...
                  </>
                ) : submitted ? (
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
