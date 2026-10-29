"use client";

import { projects } from "../data/projects";
import { useState } from "react";
import type { ProjectCategory } from "../types/content";

type ProjectFilter = ProjectCategory | 'All';
const categories: ProjectFilter[] = ["Engineering", "Civic", "All"];

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState<ProjectFilter>("Engineering");
  const filteredProjects = selectedCategory === 'All'
    ? projects
    : projects.filter(project => project.categories.includes(selectedCategory));

  return (
    <div className="projects-page page-shell">
      <header className="home-heading">
        <h1>Projects</h1>
        <p>Learning by building: machine learning experiments, AI tools, and software that brings research into everyday use.</p>
      </header>

      <nav className="project-filters" aria-label="Filter projects">
        {categories.map(category => <button
          key={category}
          type="button"
          onClick={() => setSelectedCategory(category)}
          aria-pressed={selectedCategory === category}
          aria-controls="project-list"
        >{category}</button>)}
      </nav>
      <p className="sr-only" role="status">{filteredProjects.length} projects shown</p>

      <div id="project-list" className="project-list">
        {filteredProjects.map(project => {
          const isCode = new URL(project.link).hostname === 'github.com';
          return <article className="project-entry" key={project.id}>
            <a className="project-entry-image" href={project.link} target="_blank" rel="noopener noreferrer" aria-label={`View ${project.title}`} tabIndex={-1}>
              <img src={project.image} alt={project.title} loading="lazy" />
            </a>
            <div className="project-entry-content">
              <p className="project-entry-category">{project.categories.join(' · ')}</p>
              <h2><a href={project.link} target="_blank" rel="noopener noreferrer">{project.title} <span aria-hidden="true">↗</span></a></h2>
              <p className="project-entry-author">{project.credit ?? "Silas Osunba"}</p>
              <p className="project-entry-description">{project.description}</p>
              <div className="project-entry-links"><a href={project.link} target="_blank" rel="noopener noreferrer">{isCode ? 'Code' : project.categories.includes('Civic') ? 'Visit initiative' : 'Live project'} <span aria-hidden="true">↗</span><span className="sr-only"> — {project.title}</span></a></div>
            </div>
          </article>;
        })}
      </div>

      <footer className="projects-footer">
        <p>More experiments and work in progress on <a href="https://github.com/TolaniSilas" target="_blank" rel="noopener noreferrer">GitHub ↗</a></p>
      </footer>
    </div>
  );
}
