
import { projects } from "../data/projects";
import { posts } from "../data/blog";
import { publications } from "../data/publications";
import Link from "next/link";
import silasphoto1 from "../assets/images/silas1.webp";
import labPhoto from "../assets/images/lab1.webp";

const HomePage = () => {

  return (
    <div className="flex flex-col overflow-x-hidden">
      <section className="home-hero personal-hero page-shell">
        <div className="hero-copy">
          <h1>Silas Osunba<span className="hero-role">Research Engineer & Applied AI Engineer</span></h1>
          <p className="hero-description">I am on a mission of democratizing the ethical usage of artificial intelligence and super intelligence in under-represented, under-developed and developed countries in Africa. My research interests are in Trustworthy AI, Responsible AI and all things about Machine Intelligence.</p>
          <div className="flex flex-wrap gap-3">
            <Link href="/projects" className="btn-primary">My projects <span aria-hidden="true">↗</span></Link>
            <Link href="/contact" className="btn-secondary">Let’s talk</Link>
          </div>
          <div className="hero-footnote"><span /> Open to research & collaboration</div>
        </div>
        <figure className="hero-portrait">
          <div className="portrait-frame"><img src={silasphoto1.src} alt="Silas Osunba" fetchPriority="high" /></div>
          <figcaption><span>Curiosity. Rigor. Purpose.</span><span aria-hidden="true">↗</span></figcaption>
        </figure>
      </section>
      <div className="expertise-strip"><div className="page-shell"><span>Explore</span><span aria-hidden="true">✳</span><span>Build</span><span aria-hidden="true">✳</span><span>Learn</span><span aria-hidden="true">✳</span><span>Share</span></div></div>
      <section id="biography" className="page-shell section-space biography-section">

        <h2 className="section-title mb-12 text-center">
          Biography
        </h2>
        <div className="grid items-start gap-14 md:grid-cols-2">
          <div className="flex justify-center">
            <div className="about-note"><p className="font-display text-4xl leading-tight">“Excellence is<br />a practice.”</p><span>Engineering with curiosity and purpose.</span></div>
          </div>
          <div className="mx-auto mt-8 max-w-[680px] space-y-6 text-base leading-relaxed text-muted sm:text-lg dark:text-muted-dark md:mt-0">
            <p>
              Welcome. I&apos;m{" "}
              <span className="font-semibold text-accent dark:text-gold">Silas Osunba</span>, a
              results-driven engineer and researcher. I earned a baccalaureate degree in{" "}
              <span className="font-semibold text-ink dark:text-ink-dark">
                Electronic & Computer Engineering
              </span>{" "}
              from Lagos State University, graduating with highest honors.
            </p>
            <p>
              I&apos;m guided by a simple tenet: excellence is a practice. I have led educational programs
              and community outreach, and I advocate for{" "}
              <span className="italic text-accent dark:text-gold">AI for Social Good</span>.
            </p>
            <p>
              Outside research, I follow current events, watch football, study blockchain, and play snooker
              — sometimes the best shot comes after careful observation.
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-2 md:justify-start">
              <a
                href="https://docs.google.com/document/d/12pPsc9r_XsGnkyR1deLyTiweF9qSkJoHtXVpVNV7PqM/edit?tab=t.0"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                View résumé
              </a>
              <Link href="/contact" className="btn-secondary">
                Let&apos;s Connect
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="journal-section section-space">
        <div className="page-shell journal-grid">
          <div><div className="section-heading"><div><h2 className="section-title">Research & publications</h2></div></div>
            <div className="publication-list">{publications.map((publication, index) => <a key={publication.link} href={publication.link} target="_blank" rel="noopener noreferrer"><span className="entry-number">0{index + 1}</span><p>{publication.citation}</p><span aria-hidden="true">↗</span></a>)}</div>
            <Link href="/research" className="text-link">Explore my research ↗</Link>
          </div>
          <div><h2 className="section-title mb-8">Latest articles</h2>
            {posts.map(post => <article className="article-preview" key={post.id}><time>{post.date}</time><h3 className="font-display text-2xl">{post.title}</h3><p>{post.excerpt}</p><a href={post.slug} target="_blank" rel="noopener noreferrer" className="text-link">Read article ↗</a></article>)}
            <Link href="/blog" className="text-link">More writing ↗</Link>
          </div>
        </div>
      </section>
      <section className="page-shell section-space">
        <div className="section-heading"><div><h2 className="section-title">My projects</h2></div><Link href="/projects" className="text-link">All projects ↗</Link></div>
        <div className="grid gap-7 md:grid-cols-2">
          {projects.slice(0, 2).map((project, index) => (
            <a className="work-card group" key={project.id} href={project.link} target="_blank" rel="noopener noreferrer">
              <div className="work-image"><img src={project.image} alt={project.title} loading="lazy" /><span>0{index + 1} / AI & ML</span></div>
              <div className="flex items-start justify-between gap-4 pt-6"><div><h3 className="font-display text-2xl">{project.title}</h3><p className="mt-3 text-muted dark:text-muted-dark">{index === 0 ? "Exploring vision architectures, from image classification to generative models." : "Building decoder-only Transformers from scratch to understand how language models learn."}</p></div><span className="project-arrow" aria-hidden="true">↗</span></div>
            </a>
          ))}
        </div>
      </section>
      <section className="page-shell section-space collaboration-section"><h2 className="section-title mb-10">How can we work together?</h2><div className="service-grid">
        <article><span className="service-symbol" aria-hidden="true">↗</span><h3>Build AI & ML systems</h3><p>Turn a problem into a practical machine learning solution, from experiments to software.</p><Link href="/contact" className="text-link">Discuss a project ↗</Link></article>
        <article><span className="service-symbol" aria-hidden="true">✳</span><h3>Explore a research question</h3><p>Connect around intelligent systems, energy-aware machine learning, and AI for social good.</p><Link href="/research" className="text-link">My research interests ↗</Link></article>
        <article><span className="service-symbol" aria-hidden="true">✎</span><h3>Share technical knowledge</h3><p>Make complex concepts accessible through technical writing and thoughtful conversations.</p><Link href="/blog" className="text-link">Explore my writing ↗</Link></article>
      </div></section>
÷÷          {/*
          <h2 className="section-title mb-10">Tech Stack</h2>
          <div className="mb-12 flex flex-wrap justify-center gap-3">
            {(["Languages", "Libraries & Frameworks", "Tools & Platforms"] as TechCategory[]).map(
              (category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  aria-pressed={selectedCategory === category}
                  className={`rounded-full px-5 py-2 text-sm font-medium transition ${
                    selectedCategory === category
                      ? "bg-accent text-white shadow-lg"
                      : "border border-line bg-canvas text-muted hover:border-accent dark:border-line-dark dark:bg-canvas-dark dark:text-muted-dark"
                  }`}
                >
                  {category}
                </button>
              ),
            )}
          </div>
          <div className="flex flex-wrap justify-center gap-6">
            {filteredTechs.map((tech) => (
              <div
                key={tech.name}
                className="card-surface flex h-32 w-28 flex-col items-center justify-between p-4 hover:-translate-y-1 sm:h-36 sm:w-32"
              >
                <div className="flex h-20 items-center justify-center text-accent dark:text-gold">
                  {tech.icon}
                </div>
                <p className="text-center text-sm font-medium">{tech.name}</p>
              </div>
            ))}
          </div> */}
        {/* </div>
      </section> */}

      <section className="page-shell section-space personal-note"><img src={labPhoto.src} alt="Silas working on an electronics experiment in the laboratory" loading="lazy" /><div><h2 className="section-title">Grounded in curiosity.<br />Driven by purpose.</h2><p>My path began in Electronic & Computer Engineering at Lagos State University. Today, that same curiosity shapes how I approach research, software, and learning.</p><p>I care about educational outreach and AI for Social Good. Away from the screen, you’ll find me following football, exploring blockchain, or playing a game of snooker.</p><Link href="/contact" className="text-link">Let’s connect ↗</Link></div></section>
      <section className="contact-banner px-6 py-20 text-center text-white">
        <h2 className="font-display mb-4 text-3xl font-semibold sm:text-4xl">Want to work together?</h2>
        <p className="mx-auto mb-8 max-w-xl text-lg text-white/90">
          I&apos;m open to collaboration, research, and building systems that matter.
        </p>
        <Link href="/contact" className="inline-flex rounded-full bg-white px-8 py-3 font-semibold text-accent transition hover:bg-canvas">
          Get in Touch
        </Link>
      </section>
    </div>
  );
};

export default HomePage;
