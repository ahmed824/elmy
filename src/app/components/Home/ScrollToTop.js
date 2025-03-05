"use client";

import { useEffect, useState } from "react";

const ScrollToTop = () => {
  const [showButton, setShowButton] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
      setShowButton(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-20 right-2 sm:bottom-8 sm:right-8 p-[2px] rounded-full transition-opacity duration-300 z-50 ${
        showButton ? "opacity-100" : "opacity-0"
      }`}
      style={{
        background: `conic-gradient(
          #A239F0 0%,
          #8A2BE2 ${scrollProgress / 2}%,
          #A239F0 ${scrollProgress}%,
          transparent ${scrollProgress}% 100%
        )`,
      }}
    >
      <div className="w-10 h-10 flex items-center justify-center rounded-full bg-white">
        <svg
          className="w-6 h-6 text-mainColor"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 10l7-7m0 0l7 7m-7-7v18"
          />
        </svg>
      </div>
    </button>
  );
};

export default ScrollToTop;
