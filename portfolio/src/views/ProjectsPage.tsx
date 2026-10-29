"use client";

import type { ProjectRecord } from "../lib/cms/model";
import { ContentNotice, ProjectList } from "../components/content/ContentLists";
import { useState } from "react";
import type { ProjectCategory } from "../types/content";

type ProjectFilter = ProjectCategory | 'All';
const categories: ProjectFilter[] = ["Engineering", "Civic", "All"];

export default function ProjectsPage({ projects, unavailable = false }: { projects: ProjectRecord[]; unavailable?: boolean }) {
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

      <div id="project-list">{filteredProjects.length ? <ProjectList entries={filteredProjects} /> : <ContentNotice label="Projects" unavailable={unavailable} />}</div>

      <footer className="projects-footer">
        <p>More experiments and work in progress on <a href="https://github.com/TolaniSilas" target="_blank" rel="noopener noreferrer">GitHub ↗</a></p>
      </footer>
    </div>
  );
}
