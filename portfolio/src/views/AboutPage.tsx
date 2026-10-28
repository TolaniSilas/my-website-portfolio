"use client";

import { useState } from "react";
import Link from "next/link";
import { FaEnvelope, FaGithub, FaLinkedinIn } from "react-icons/fa";
import portrait from "../assets/images/silas1.webp";
import { education, experience, service, type AboutEntry } from "../data/about";
import { projects } from "../data/projects";
import { publications } from "../data/publications";
import { documents } from "../data/documents";

function EntryList({ title, entries }: { title: string; entries: AboutEntry[] }) {
  return (
    <section className="about-records">
      <h2>{title}</h2>
      <ul>{entries.map(entry => (
        <li key={`${entry.title}-${entry.organization}`}>
          <span className="about-period">{entry.period}</span>
          <div><h3>{entry.title}{entry.organization && <span>, {entry.organization}</span>}</h3><p>{entry.detail}</p></div>
        </li>
      ))}</ul>
    </section>
  );
}

function Papers() {
  return <section className="about-records"><h2>Papers</h2><ul>
    {publications.map(publication => <li key={publication.link}>
      <span className="about-period">2025</span>
      <a href={publication.link} target="_blank" rel="noopener noreferrer">{publication.citation}</a>
    </li>)}
  </ul></section>;
}

export default function AboutPage() {
  const [view, setView] = useState<'about' | 'summary'>('about');
  return (
    <article className="about-page page-shell">
      <header className="home-heading">
        <h1>About</h1>
        <p>AI research, responsible intelligence, and the people it serves.</p>
      </header>
      <nav className="about-switcher" aria-label="About page views">
        <button type="button" aria-pressed={view === 'about'} aria-controls="about-story" onClick={() => setView('about')}>About</button>
        <button type="button" aria-pressed={view === 'summary'} aria-controls="about-summary" onClick={() => setView('summary')}>In summary</button>
      </nav>

      <div id="about-story" hidden={view !== 'about'}>
        <div className="about-story">
          <p>I’m Silas Osunba, an AI Research Engineer. My work brings together machine learning, software, and a question I keep returning to: how can more people use intelligent systems ethically and responsibly?</p>
          <p>I studied Electronic &amp; Computer Engineering at Lagos State University, graduating with First Class Honors and ranking first in my class of 118. My thesis explored machine learning for modeling rain-induced attenuation in satellite communications.</p>
          <p>My research has taken me through oil spill detection, heart disease prediction, and fuel cell performance. I’m interested in applied machine learning, agentic AI, large language models, and explainable and trustworthy AI.</p>
          <p>I also build software. At Moniepoint, I worked on analytics systems; at Condere Corp, I work on agentic AI and human-in-the-loop recruitment systems. My <Link href="/projects">projects</Link> are another way I explore ideas through implementation.</p>
          <p>Education and community matter to me. I co-founded Inspire The Student Initiative, tutored engineering students, and served as president of the SPE LASU Student Chapter. Sharing knowledge is part of how I put responsible technology into practice.</p>
          <p>Outside the work, I follow football and current events, explore blockchain, and play snooker. I <Link href="/articles">write</Link> about what I learn, too.</p>
        </div>
        <EntryList title="Work & research" entries={experience} />
        <EntryList title="Education" entries={education} />
        <Papers />
        <EntryList title="Service & teaching" entries={service} />
      </div>

      <div id="about-summary" hidden={view !== 'summary'}>
        <div className="about-identity">
          <img src={portrait.src} width={48} height={48} alt="Silas Osunba" />
          <div><h2>Silas Osunba</h2><p>AI Research Engineer</p></div>
          <Link href="/contact" className="about-contact-link">Get in touch ↗</Link>
        </div>
        <div className="about-summary-grid">
          <section className="about-panel"><h2>Focus</h2><p>Applied machine learning, agentic AI, large language models, and explainable and trustworthy AI.</p></section>
          <section className="about-panel"><h2>What matters to me</h2><p>Ethical and responsible AI, accessible education, and sharing knowledge with communities across Africa.</p></section>
          <section className="about-panel"><h2>Education</h2><p>B.Sc., Electronic &amp; Computer Engineering<br />Lagos State University · 2020–2025</p><p className="about-muted">First Class Honors · 4.77/5.0 · 1/118</p></section>
          <section className="about-panel"><h2>Work & research</h2><ul className="about-mini-list">{experience.map(entry => <li key={entry.organization}><span className="about-muted">{entry.period}</span><h3>{entry.title}</h3><p>{entry.organization}</p></li>)}</ul></section>
          <section className="about-panel"><h2>Selected projects <Link href="/projects">All projects ↗</Link></h2><ul className="about-mini-list">{projects.slice(0, 3).map(project => <li key={project.id}><a href={project.link} target="_blank" rel="noopener noreferrer">{project.title} ↗</a></li>)}</ul></section>
          <section className="about-panel"><h2>Service & teaching</h2><ul className="about-mini-list">{service.slice(0, 4).map(entry => <li key={entry.title}><h3>{entry.title}</h3><p>{entry.organization}</p><span className="about-muted">{entry.period}</span></li>)}</ul></section>
          <section className="about-panel about-panel-wide"><h2>Papers <Link href="/research">Research ↗</Link></h2><ul className="about-mini-list">{publications.map(publication => <li key={publication.link}><a href={publication.link} target="_blank" rel="noopener noreferrer">{publication.citation}</a></li>)}</ul></section>
          <section className="about-panel"><h2>Elsewhere</h2><p>Football, current events, blockchain, and snooker.</p><div className="about-socials"><a href="https://www.linkedin.com/in/osunbasilas/" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer"><FaLinkedinIn /></a><a href="https://github.com/TolaniSilas" aria-label="GitHub" target="_blank" rel="noopener noreferrer"><FaGithub /></a><a href="mailto:osunbasilas@gmail.com" aria-label="Email Silas"><FaEnvelope /></a></div></section>
          <section className="about-panel"><h2>Documents</h2><ul className="about-mini-list">{[documents.resume, documents.cv].map(document => document && <li key={document.label}><a href={document.openUrl} target="_blank" rel="noopener noreferrer">{document.label} (PDF) ↗</a></li>)}</ul></section>
        </div>
      </div>
    </article>
  );
}
