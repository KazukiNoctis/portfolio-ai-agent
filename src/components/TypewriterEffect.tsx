"use client";

import { useState, useEffect, useCallback } from "react";

interface TypewriterEffectProps {
  words?: string[];
}

export default function TypewriterEffect({ 
  words = ["Web Developer", "UI/UX Designer", "AI Enthusiast", "Freelancer"] 
}: TypewriterEffectProps) {
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const tick = useCallback(() => {
    // Safety check just in case words array is empty
    if (!words || words.length === 0) return;
    
    const currentWord = words[wordIndex] || "";

    if (isDeleting) {
      setText(currentWord.substring(0, text.length - 1));
    } else {
      setText(currentWord.substring(0, text.length + 1));
    }
  }, [text, wordIndex, isDeleting, words]);

  useEffect(() => {
    if (!words || words.length === 0) return;
    
    const currentWord = words[wordIndex] || "";
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
  }, [text, isDeleting, wordIndex, tick, words]);

  return (
    <span>
      <span className="text-primary">{text}</span>
      <span className="cursor-blink text-primary font-light">|</span>
    </span>
  );
}
