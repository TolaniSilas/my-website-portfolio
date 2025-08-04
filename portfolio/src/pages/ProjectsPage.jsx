import React from "react";
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
  },
  {
    id: 2,
    title: "E-commerce Store",
    description:
      "A full-stack e-commerce application with shopping cart, authentication, and payment integration.",
    tech: [<FaNodeJs key="node" />, <FaReact key="react" />],
    link: "https://github.com/TolaniSilas/ecommerce",
  },
  {
    id: 3,
    title: "Data Analysis Dashboard",
    description:
      "An interactive dashboard for analyzing sales data, built with Python (Flask) and chart libraries.",
    tech: [<FaPython key="python" />, <FaDatabase key="db" />],
    link: "https://github.com/TolaniSilas/data-dashboard",
  },
];

const ProjectsPage = () => {
  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      {/* Page Header */}
      <header className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">My Projects</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Here are some of the projects I’ve worked on — ranging from personal
          experiments to real-world applications.
        </p>
      </header>

      {/* Projects Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <div
            key={project.id}
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow hover:shadow-xl transition flex flex-col"
          >
            <h2 className="text-xl font-semibold mb-2">{project.title}</h2>
            <p className="text-gray-600 dark:text-gray-300 flex-1 mb-4">
              {project.description}
            </p>

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
  );
};

export default ProjectsPage;
