import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const posts = [
  {
    id: 1,
    title:
      "Getting Started with LLMs: How to Serve LLM Applications as API Endpoints with FastAPI in Python",
    date: "August 20, 2024",
    excerpt:
      "Large Language Models (LLMs) are leading advancements in Generative AI, revolutionizing how machines comprehend and produce human-like text. In this blog, we'll explore how APIs short for Application Programming Interfaces, enable applications to harness the power of LLMs.",
    slug: "https://medium.com/@tolanisilas3606/getting-started-with-llms-how-to-serve-llm-applications-as-api-endpoints-with-fastapi-in-python-af015399ef3e",
  },
];

export default function BlogPage() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [typedText, setTypedText] = useState("");

  const fullText =
    "Welcome to my digital space where I share my thoughts, information and insights on technology trends, data science, AI and machine learning. Explore my latest posts below.";

  // Initialize AOS
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  // Detect dark mode toggle dynamically (from navbar)
  useEffect(() => {
    const html = document.documentElement;
    const observer = new MutationObserver(() => {
      setIsDarkMode(html.classList.contains("dark"));
    });

    observer.observe(html, { attributes: true, attributeFilter: ["class"] });

    // Set the initial mode
    setIsDarkMode(html.classList.contains("dark"));

    return () => observer.disconnect();
  }, []);

  // ✅ Fixed typewriter effect (full text now always displays)
  useEffect(() => {
    let index = 0;
    const speed = 35; // typing speed (ms per character)

    const type = () => {
      if (index < fullText.length) {
        setTypedText(fullText.slice(0, index + 1));
        index++;
        setTimeout(type, speed);
      }
    };

    type(); // start typing
  }, [fullText]);

  return (
    <div
      className={`min-h-screen px-6 pt-28 pb-16 transition-colors duration-700 ${
        isDarkMode ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      {/* Header */}
      <div className="text-center mb-16 mt-4">
        <h1
          className="text-4xl md:text-5xl font-bold mb-5 text-blue-600 dark:text-blue-400"
          data-aos="fade-up"
        >
          My Blog
        </h1>
        <p className="max-w-2xl mx-auto text-lg leading-relaxed min-h-[120px]">
          {typedText}
          <span className="animate-pulse">|</span> {/* blinking cursor */}
        </p>
      </div>

      {/* Posts grid */}
      <div className="max-w-6xl mx-auto grid gap-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <article
            key={post.id}
            className={`relative group p-6 rounded-2xl border shadow-md hover:shadow-xl transition-all duration-300 ease-in-out hover:-translate-y-1 ${
              isDarkMode
                ? "bg-gray-900 border-gray-700"
                : "bg-white border-gray-200"
            }`}
          >
            <h2 className="text-xl md:text-2xl font-semibold mb-2 text-blue-500 dark:text-blue-400">
              {post.title}
            </h2>
            <time className="text-sm mb-3 block">{post.date}</time>
            <p className="mb-6">{post.excerpt}</p>
            <a
              href={post.slug}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-blue-500 dark:text-blue-400 font-medium hover:underline"
            >
              Read More →
            </a>
          </article>
        ))}
      </div>

      {/* Read more CTA */}
      <div
        className={`max-w-4xl mx-auto mt-20 p-10 rounded-2xl border shadow-lg text-center transition-colors duration-500 ${
          isDarkMode
            ? "bg-gray-900 border-gray-700"
            : "bg-gray-50 border-gray-200"
        }`}
        data-aos="zoom-in"
      >
        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-blue-600 dark:text-blue-400">
          Read More of My Blog Posts
        </h2>

        <p className="mb-6 leading-relaxed">
          Want to explore more of my writings? Visit my Medium profile to read
          more technical articles and thought pieces.
        </p>

        <a
          href="https://medium.com/@tolanisilas3606"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white py-3 px-8 rounded-xl font-semibold transition transform hover:-translate-y-1 hover:shadow-lg"
        >
          View My Medium Profile
        </a>
      </div>
    </div>
  );
}
