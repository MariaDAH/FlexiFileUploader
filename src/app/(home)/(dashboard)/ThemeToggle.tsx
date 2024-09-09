"use client";
import { useState, useEffect } from "react";

const ThemeToggle = () => {
  const [activeTheme, setActiveTheme] = useState("light");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("theme") || "light";
    setActiveTheme(savedTheme);
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      document.body.dataset.theme = activeTheme;
      window.localStorage.setItem("theme", activeTheme);
    }
  }, [activeTheme, isMounted]);

  const toggleTheme = () => {
    const newTheme = activeTheme === "light" ? "dark" : "light";
    setActiveTheme(newTheme);
  };

  if (!isMounted) {
    return null;
  }

  return (
    <button
      aria-label={`Change to ${
        activeTheme === "light" ? "dark" : "light"
      } mode`}
      title={`Change to ${activeTheme === "light" ? "dark" : "light"} mode`}
      type="button"
      onClick={toggleTheme}
      className={`relative flex items-center justify-around w-20 h-10 p-1 border-0 rounded-full cursor-pointer transition-all duration-250 ease-in-out ${
        activeTheme === "light" ? "bg-gray-700" : "bg-gray-500"
      } focus:outline focus-visible:outline-offset-2 hover:shadow-lg`}
    >
      <span
        className={`absolute top-1  left-2 w-8 h-8 rounded-full bg-white transition-transform duration-250 ease-in-out ${
          activeTheme === "dark" ? "transform translate-x-full" : ""
        }`}
      />
      <span>🌙</span>
      <span>☀️</span>
    </button>
  );
};

export default ThemeToggle;
