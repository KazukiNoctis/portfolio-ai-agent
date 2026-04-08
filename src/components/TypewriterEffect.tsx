"use client";

import { useState, useEffect, useCallback } from "react";

const words = ["Web Developer", "UI/UX Designer", "AI Enthusiast", "Freelancer"];

export default function TypewriterEffect() {
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const tick = useCallback(() => {
    const currentWord = words[wordIndex];

    if (isDeleting) {
      setText(currentWord.substring(0, text.length - 1));
    } else {
      setText(currentWord.substring(0, text.length + 1));
    }
  }, [text, wordIndex, isDeleting]);

  useEffect(() => {
    const currentWord = words[wordIndex];
    let speed = isDeleting ? 50 : 100;

    if (!isDeleting && text === currentWord) {
      speed = 2000;
      setTimeout(() => setIsDeleting(true), speed);
      return;
    }

    if (isDeleting && text === "") {
      setIsDeleting(false);
      setWordIndex((prev) => (prev + 1) % words.length);
      speed = 400;
    }

    const timer = setTimeout(tick, speed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, wordIndex, tick]);

  return (
    <span>
      <span className="text-primary">{text}</span>
      <span className="cursor-blink text-primary font-light">|</span>
    </span>
  );
}
