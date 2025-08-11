import React from "react";
import { Link } from "react-router-dom";

// Sample blog posts data
const posts = [
  {
    id: 1,
    title: "Getting Started with React",
    date: "July 25, 2025",
    excerpt: "React makes building UIs simple and powerful. In this post, I explain the basics of components, props, and state.",
    slug: "getting-started-with-react",
  },
  {
    id: 2,
    title: "Dark Mode in Tailwind + React",
    date: "July 30, 2025",
    excerpt: "Implementing dark mode has never been easier with TailwindCSS. Learn how I added it to my portfolio website.",
    slug: "dark-mode-in-tailwind-react",
  },
  {
    id: 3,
    title: "Why I Love Frontend Development",
    date: "August 2, 2025",
    excerpt: "Frontend development allows me to bring ideas to life quickly. Here’s why I enjoy working with React and modern web tools.",
    slug: "why-i-love-frontend-development",
  },
];

const BlogPage = () => {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold text-center mb-12">My Blog</h1>
      
      <div className="grid md:grid-cols-2 gap-10">
        {posts.map((post) => (
          <div
            key={post.id}
            className="p-6 rounded-lg shadow hover:shadow-xl transition"
          >
            <h2 className="text-2xl font-semibold mb-2">{post.title}</h2>
            <p className="text-sm mb-3">
              {post.date}
            </p>
            <p className="mb-4">
              {post.excerpt}
            </p>
            <Link
              to={`/blog/${post.slug}`}
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              Read More →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogPage;
