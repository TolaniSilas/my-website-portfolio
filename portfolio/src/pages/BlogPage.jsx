import React from "react";

// Sample blog posts data
const posts = [
  {
    id: 1,
    title: "Getting Started with LLMs: How to Serve LLM Applications as API Endpoints with FastAPI in Python",
    date: "August 20, 2024",
    excerpt:
      "React makes building UIs simple and powerful. In this post, I explain the basics of components, props, and state.",
    slug: "https://medium.com/@tolanisilas3606/getting-started-with-llms-how-to-serve-llm-applications-as-api-endpoints-with-fastapi-in-python-af015399ef3e",
  },
  // Add more posts as needed
];

const BlogPage = () => {
  return (
    <div className="min-h-screen px-6 pt-28 pb-16 transition-colors duration-500 bg-white text-black dark:bg-black dark:text-white">
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-5 text-blue-600">
          My Blog
        </h1>
        <p className="max-w-2xl mx-auto text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
          Welcome to my digital space where I share my thoughts, information and insights on technology trends, data science, AI and machine learning. Explore my latest posts below.
        </p>
      </div>

      {/* Posts grid */}
      <div className="max-w-6xl mx-auto grid gap-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <article
            key={post.id}
            className="relative group p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-md hover:shadow-xl transition-all duration-300 ease-in-out hover:-translate-y-1 bg-white dark:bg-gray-900"
          >
            <h2 className="text-xl md:text-2xl font-semibold mb-2 text-blue-500 dark:text-blue-400">
              {post.title}
            </h2>
            <time className="text-sm text-gray-500 mb-3 block">{post.date}</time>
            <p className="text-gray-700 dark:text-gray-300 mb-6">{post.excerpt}</p>
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

      {/* Read more CTA at the end */}
      <div className="max-w-4xl mx-auto mt-20 p-10 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg bg-gray-50 dark:bg-gray-900 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-blue-600 dark:text-blue-400">
          Read More of My Blog Posts
        </h2>

        <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
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
};

export default BlogPage;
