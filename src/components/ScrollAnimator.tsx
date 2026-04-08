"use client";

import { useEffect } from "react";

export default function ScrollAnimator() {
  useEffect(() => {
    const handleScroll = () => {
      const elements = document.querySelectorAll(".scroll-animate");
      elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const windowHeight =
          window.innerHeight || document.documentElement.clientHeight;
        if (rect.top <= windowHeight * 0.85) {
          el.classList.add("show");
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Trigger once on mount for elements already in view
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return null;
}
