import React, { useState } from "react";
import { FaReact, FaNodeJs, FaPython, FaDatabase } from "react-icons/fa";
import { Link } from "react-router-dom";

// Example project data
const projects = [
  {
    id: 1,
    title: "Portfolio Website",
    description:
      "My personal portfolio built with React, TailwindCSS, and Framer Motion. Includes dark mode and responsive design.",
    tech: [<FaReact key="react" />, <FaDatabase key="db" />],
    link: "https://github.com/TolaniSilas/portfolio",
    image: "/images/portfolio.png",
    category: "web",
  },
  {
    id: 2,
    title: "E-commerce Store",
    description:
      "A full-stack e-commerce application with shopping cart, authentication, and payment integration.",
    tech: [<FaNodeJs key="node" />, <FaReact key="react" />],
    link: "https://github.com/TolaniSilas/ecommerce",
    image: "/images/ecommerce.png",
    category: "backend",
  },
  {
    id: 3,
    title: "Data Analysis Dashboard",
    description:
      "An interactive dashboard for analyzing sales data, built with Python (Flask) and chart libraries.",
    tech: [<FaPython key="python" />, <FaDatabase key="db" />],
    link: "https://github.com/TolaniSilas/data-dashboard",
    image: "/images/dashboard.png",
    category: "machine-learning",
  },
];

const ProjectsPage = () => {
  const [filter, setFilter] = useState("all");

  const filteredProjects =
    filter === "all"
      ? projects
      : projects.filter((project) => project.category === filter);

  return (
    <div className="w-full">
      {/* Top Banner Image */}
      <div className="pt-16">
        <img
          src="/images/image.png" // Add your banner image in /public/images/
          alt="Projects Banner"
          className="w-full sm:h-[80vh] md:h-[80vh] lg:h-[80vh] object-cover"
        />
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Page Header */}
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">My Projects</h1>
          <p className="text-lg max-w-2xl mx-auto">
            Here are some of the projects I've worked on - ranging from personal
            experiments to real-world applications.
          </p>
        </header>

        {/* Filter Buttons */}
        <div className="flex justify-center gap-4 mb-10 flex-wrap">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded-lg ${
              filter === "all"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 dark:bg-gray-700 dark:text-white"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter("machine-learning")}
            className={`px-4 py-2 rounded-lg ${
              filter === "machine-learning"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 dark:bg-gray-700 dark:text-white"
            }`}
          >
            Machine Learning
          </button>
          <button
            onClick={() => setFilter("backend")}
            className={`px-4 py-2 rounded-lg ${
              filter === "backend"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 dark:bg-gray-700 dark:text-white"
            }`}
          >
            Backend Development
          </button>
          <button
            onClick={() => setFilter("web")}
            className={`px-4 py-2 rounded-lg ${
              filter === "web"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 dark:bg-gray-700 dark:text-white"
            }`}
          >
            Web Development
          </button>
        </div>

        {/* Projects Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="p-6 rounded-lg shadow hover:shadow-xl transition flex flex-col bg-white dark:bg-gray-800"
            >
              {/* Project Image */}
              <img
                src={project.image}
                alt={project.title}
                className="rounded-md mb-4 w-full h-48 object-cover"
              />
              <h2 className="text-xl font-semibold mb-2">{project.title}</h2>
              <p className="flex-1 mb-4">{project.description}</p>

              {/* Tech Stack Icons */}
              <div className="flex gap-3 text-2xl text-blue-600 dark:text-blue-400 mb-4">
                {project.tech}
              </div>

              {/* GitHub / Live Link */}
              <Link
                to={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:underline mt-auto"
              >
                View Project →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;
