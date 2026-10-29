"use client";

import { useState } from "react";
import Link from "next/link";
import { FaEnvelope, FaGithub, FaLinkedinIn } from "react-icons/fa";
import portrait from "../assets/images/silas1.webp";
import { education, experienceGroups, professionalExperience, researchExperience, service, type AboutEntry } from "../data/about";
import type { ProjectRecord } from "../lib/cms/model";
import { publications } from "../data/publications";
import { documents } from "../data/documents";

function AffiliationLogo({ entry }: { entry: AboutEntry }) {
  const [failed, setFailed] = useState(false);
  return <span className="affiliation-logo" aria-hidden="true">
    {entry.logo && !failed ? <img src={entry.logo} alt="" width={40} height={40} loading="lazy" onError={() => setFailed(true)} /> : <span>{entry.initials ?? entry.organization?.split(' ').map(word => word[0]).slice(0, 3).join('')}</span>}
  </span>;
}

function EntryList({ title, entries, subsection = false }: { title: string; entries: AboutEntry[]; subsection?: boolean }) {
  const Heading = subsection ? 'h3' : 'h2';
  const RoleHeading = subsection ? 'h4' : 'h3';
  return (
    <section className={`about-records${subsection ? " about-experience-group" : ""}`}>
      <Heading>{title}</Heading>
      <ul>{entries.map(entry => (
        <li key={`${entry.title}-${entry.organization}`}>
          <span className="about-period">{entry.period}</span>
          <div className="about-affiliation"><AffiliationLogo entry={entry} /><div><RoleHeading>{entry.title}{entry.organization && <span>, {entry.organization}</span>}</RoleHeading><p>{entry.detail}</p></div></div>
        </li>
      ))}</ul>
    </section>
  );
}

function Papers() {
  return <section className="about-records"><h2>Papers</h2><ul>
    {publications.map(publication => <li key={publication.link}>
      <span className="about-period">{publication.year}</span>
      <div className="about-paper-line"><a href={publication.link} target="_blank" rel="noopener noreferrer">{publication.title}</a>, {publication.venue}</div>
    </li>)}
  </ul></section>;
}

export default function AboutPage({ projects }: { projects: ProjectRecord[] }) {
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
        <section className="about-experience"><h2>Experience</h2>{experienceGroups.map(group => <EntryList key={group.title} title={group.title} entries={group.entries} subsection />)}</section>
        <EntryList title="Education" entries={education} />
        <Papers />
        <EntryList title="Teaching, Service, Leadership, & Impact" entries={service} />
      </div>

      <div id="about-summary" hidden={view !== 'summary'}>
        <div className="personal-summary">
          <header className="summary-intro">
            <img src={portrait.src} width={72} height={72} alt="Silas Osunba" />
            <div><p className="summary-eyebrow">A little of who I am</p><h2>Silas Osunba</h2><p className="summary-role">AI Research Engineer</p></div>
          </header>
          <p className="summary-principle">Building at the ethical and responsible layer of super intelligence.</p>
          <p className="summary-intro-note">Research, building, and sharing knowledge are connected parts of my life. I care about who technology reaches, how people use it, and what it makes possible for them.</p>

          <section className="summary-chapter">
            <h2>What drives me</h2>
            <div><p>Making intelligent systems useful, understandable, and accessible. My interests span applied machine learning, agentic AI, large language models, and explainable and trustworthy AI.</p><p>I care about responsible AI and accessible education, especially for communities across Africa.</p></div>
          </section>

          <section className="summary-chapter">
            <h2>Experience</h2>
            <div><h3 className="summary-subheading">Professional experience</h3><ul className="summary-roles">{professionalExperience.map(entry => <li key={entry.organization}><AffiliationLogo entry={entry} /><div><h4>{entry.title}</h4><p>{entry.organization}</p><span className="summary-date">{entry.period}</span><p className="summary-role-detail">{entry.detail}</p></div></li>)}</ul>
            <h3 className="summary-subheading">Research experience</h3><ul className="summary-roles">{researchExperience.map(entry => <li key={`${entry.title}-${entry.organization}`}><AffiliationLogo entry={entry} /><div><h4>{entry.title}</h4><p>{entry.organization} <span className="summary-date">· {entry.period}</span></p></div></li>)}</ul></div>
          </section>

          <section className="summary-chapter">
            <h2>Education</h2>
            <div className="summary-education"><AffiliationLogo entry={education[0]} /><div><h3>{education[0].title}</h3><p>{education[0].organization} · {education[0].period}</p><p className="summary-role-detail">{education[0].detail}</p></div></div>
          </section>

          <section className="summary-chapter">
            <h2>Ideas into practice</h2>
            <div><h3 className="summary-subheading">Selected projects</h3><ul className="summary-projects">{projects.slice(0, 3).map(project => <li key={project.id}><a href={project.link_url} target="_blank" rel="noopener noreferrer">{project.title} ↗</a></li>)}</ul>
            <h3 className="summary-subheading summary-paper-heading">Papers</h3><ul className="summary-papers">{publications.map(publication => <li key={publication.link}><a href={publication.link} target="_blank" rel="noopener noreferrer">{publication.title}</a>, {publication.venue}</li>)}</ul><div className="summary-links"><Link href="/projects">All projects ↗</Link><Link href="/research">My research ↗</Link></div></div>
          </section>

          <section className="summary-chapter">
            <h2>Teaching, Service, Leadership, &amp; Impact</h2>
            <div><p>Sharing what I know is part of the work.</p><ul className="summary-impact">{service.filter(entry => ['Co-Founder', 'Volunteer Tutor', 'Departmental Coordinator'].includes(entry.title)).map(entry => <li key={entry.title}><h3>{entry.title} · {entry.organization}</h3><p>{entry.detail}</p></li>)}</ul><p className="summary-role-detail">I also served as President, Vice President, and Acting Membership Chair of the SPE LASU Student Chapter.</p></div>
          </section>

          <section className="summary-chapter">
            <h2>Beyond the work</h2>
            <div><p>Football, current events, blockchain, and snooker. I make room for <Link href="/books">reading</Link>, thinking, and <Link href="/articles">writing</Link> about what I learn.</p></div>
          </section>

          <footer className="summary-footer">
            <Link href="/contact">Let’s connect ↗</Link>
            <div className="summary-links">{[documents.resume, documents.cv].map(document => document && <a key={document.label} href={document.openUrl} target="_blank" rel="noopener noreferrer">{document.label} (PDF) ↗</a>)}</div>
            <nav className="summary-socials" aria-label="Connect with Silas"><a href="https://www.linkedin.com/in/osunbasilas/" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer"><FaLinkedinIn /></a><a href="https://github.com/TolaniSilas" aria-label="GitHub" target="_blank" rel="noopener noreferrer"><FaGithub /></a><a href="mailto:osunbasilas@gmail.com" aria-label="Email Silas"><FaEnvelope /></a></nav>
          </footer>
        </div>
      </div>
    </article>
  );
}
