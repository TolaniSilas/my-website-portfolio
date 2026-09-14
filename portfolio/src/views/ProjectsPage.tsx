"use client";

import { projects } from "../data/projects";
import { useState } from "react";
import { motion } from "framer-motion";
import { FaGithub } from "react-icons/fa";
import type { ProjectCategory } from "../types/content";

const categories: ProjectCategory[] = [
  "All Projects",
  "AI & ML",
  "Backend Development",
  "Web Development",
];

const ProjectsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>("All Projects");
  const filteredProjects =
    selectedCategory === "All Projects"
      ? projects
      : projects.filter((project) => project.categories.includes(selectedCategory));

  return (
    <div className="min-h-screen">
      <header className="page-shell page-intro"><p className="section-kicker">Portfolio / Selected projects</p><h1 className="section-title">Ideas, built into reality.</h1><p>Explorations in machine learning, thoughtful software, and systems that connect research to practical problems.</p></header>
      <div className="mb-16 flex flex-wrap justify-center gap-3 px-4">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            aria-pressed={selectedCategory === cat}
            className={`rounded-full px-5 py-2 text-sm font-medium transition ${
              selectedCategory === cat
                ? "bg-accent text-white shadow-lg"
                : "border border-line bg-surface text-muted hover:border-accent dark:border-line-dark dark:bg-surface-dark dark:text-muted-dark"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="mx-auto grid max-w-6xl gap-8 px-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {filteredProjects.map((project) => (
          <motion.article
            key={project.id}
            className="card-surface group flex h-full flex-col overflow-hidden"
            whileHover={{ y: -5 }}
          >
            <img
              src={project.image}
              loading="lazy"
              alt={project.title}
              className="h-48 w-full object-cover transition duration-500 group-hover:scale-105"
            />
            <div className="flex flex-grow flex-col p-6">
              <h3 className="font-display mb-2 text-xl text-accent dark:text-gold">{project.title}</h3>
              <p className="mb-4 line-clamp-4 text-sm leading-relaxed text-muted dark:text-muted-dark">
                {project.description}
              </p>
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto text-sm font-semibold text-accent hover:underline dark:text-gold"
              >
                View Project →
              </a>
            </div>
          </motion.article>
        ))}
      </div>

      <motion.div className="card-surface mx-auto mt-24 mb-16 max-w-4xl p-8 text-center sm:p-10">
        <FaGithub className="mx-auto mb-4 text-5xl text-accent dark:text-gold" />
        <h2 className="font-display mb-4 text-2xl font-semibold md:text-3xl">Explore more on GitHub</h2>
        <p className="mb-6 px-2 leading-relaxed text-muted dark:text-muted-dark sm:px-6">
          Data science, machine learning, backend systems, and software engineering.
        </p>
        <a
          href="https://github.com/TolaniSilas"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary"
        >
          Visit My GitHub
        </a>
      </motion.div>
    </div>
  );
};

export default ProjectsPage;
