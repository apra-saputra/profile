"use client";

import { useState, useEffect } from "react";

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Tambahkan event listener saat scroll terjadi
    window.addEventListener("scroll", handleScroll);

    // Bersihkan event listener saat komponen unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = () => {
    // Jika posisi scroll di atas 200px, tampilkan tombol
    if (window.scrollY > 600) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      className={`${
        isVisible ? "fixed bottom-5 right-5 opacity-60 z-50" : "hidden"
      } p-2 rounded-2xl shadow-md transition-all duration-400 border-2 border-primary hover:bg-bg-secondary hover:border-yellow-300 hover:text-accent hover:opacity-80`}
      onClick={scrollToTop}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 19V5M5 12l7-7 7 7" />
      </svg>
      up
    </button>
  );
};

export default BackToTop;
