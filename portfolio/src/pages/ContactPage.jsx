import { useEffect, useState } from "react";

export default function BlogPage() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // ✅ Detect dark mode toggle dynamically (same as Contact page)
  useEffect(() => {
    const html = document.documentElement;
    const observer = new MutationObserver(() => {
      setIsDarkMode(html.classList.contains("dark"));
    });

    observer.observe(html, { attributes: true, attributeFilter: ["class"] });
    setIsDarkMode(html.classList.contains("dark"));
    return () => observer.disconnect();
  }, []);

  const posts = [
    {
      id: 1,
      title:
        "Getting Started with LLMs: How to Serve LLM Applications as API Endpoints with FastAPI in Python",
      date: "August 20, 2024",
      excerpt:
        "Large Language Models (LLMs) are transforming how developers build intelligent applications. In this post, I walk through how to serve LLM applications efficiently as API endpoints using FastAPI in Python.",
      slug: "https://medium.com/@tolanisilas3606/getting-started-with-llms-how-to-serve-llm-applications-as-api-endpoints-with-fastapi-in-python-af015399ef3e",
    },
    // Add more posts as needed
  ];

  return (
    <div
      className={`min-h-screen px-6 pt-28 pb-20 transition-colors duration-700
      ${isDarkMode ? "bg-black text-white" : "bg-white text-black"}`}
    >
      {/* Header */}
      <div className="text-center mb-16">
        <h1
          className={`text-4xl md:text-5xl font-bold mb-5 ${
            isDarkMode ? "text-blue-400" : "text-blue-600"
          }`}
        >
          My Blog
        </h1>
        <p
          className={`max-w-2xl mx-auto text-lg leading-relaxed ${
            isDarkMode ? "text-gray-300" : "text-gray-700"
          }`}
        >
          Welcome to my digital space where I share my thoughts, information, and
          insights on technology trends, data science, AI, and machine learning.
          Explore my latest posts below.
        </p>
      </div>

      {/* Posts Grid */}
      <div className="max-w-6xl mx-auto grid gap-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <article
            key={post.id}
            className={`p-6 rounded-2xl border shadow-md hover:shadow-xl transition-all duration-300 ease-in-out hover:-translate-y-1
            ${
              isDarkMode
                ? "bg-gray-900 border-gray-700"
                : "bg-white border-gray-200"
            }`}
          >
            <h2
              className={`text-xl md:text-2xl font-semibold mb-2 ${
                isDarkMode ? "text-blue-400" : "text-blue-600"
              }`}
            >
              {post.title}
            </h2>
            <time className="text-sm text-gray-500 mb-3 block">
              {post.date}
            </time>
            <p
              className={`mb-6 leading-relaxed ${
                isDarkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              {post.excerpt}
            </p>
            <a
              href={post.slug}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-block font-medium hover:underline ${
                isDarkMode ? "text-blue-400" : "text-blue-600"
              }`}
            >
              Read More →
            </a>
          </article>
        ))}
      </div>

      {/* Read More CTA */}
      <div
        className={`max-w-4xl mx-auto mt-20 p-10 rounded-2xl border shadow-lg text-center transition-colors duration-700
        ${
          isDarkMode
            ? "bg-gray-900 border-gray-700"
            : "bg-gray-50 border-gray-200"
        }`}
      >
        <h2
          className={`text-2xl md:text-3xl font-bold mb-4 ${
            isDarkMode ? "text-blue-400" : "text-blue-600"
          }`}
        >
          Read More of My Blog Posts
        </h2>

        <p
          className={`mb-6 leading-relaxed ${
            isDarkMode ? "text-gray-300" : "text-gray-700"
          }`}
        >
          Want to explore more of my writings? Visit my Medium profile to read
          additional technical articles and thought pieces.
        </p>

        <a
          href="https://medium.com/@tolanisilas3606"
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-block py-3 px-8 rounded-xl font-semibold transition transform hover:-translate-y-1 hover:shadow-lg duration-300 ease-in-out ${
            isDarkMode
              ? "bg-blue-500 hover:bg-blue-600 text-white"
              : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}
        >
          View My Medium Profile
        </a>
      </div>
    </div>
  );
}
