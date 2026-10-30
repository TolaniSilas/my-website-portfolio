"use client";

import { useState } from "react";
import Link from "next/link";
import { education, experienceGroups, service, type AboutEntry } from "../data/about";
import { publications } from "../data/publications";

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

export default function AboutPage() {
  return (
    <article className="about-page page-shell">
      <header className="home-heading">
        <h1>About</h1>
        <p>AI research, responsible intelligence, and the people it serves.</p>
      </header>
      <div id="about-story">
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

    </article>
  );
}
