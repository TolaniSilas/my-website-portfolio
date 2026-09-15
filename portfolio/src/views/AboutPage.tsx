
import Link from "next/link";
import portrait from "../assets/images/silas1.webp";

// Expand this biography as your story grows.
export default function AboutPage() {
  return (
    <article className="page-shell pb-20">
      <header className="page-intro">

        <h1 className="section-title">About me</h1>
        <p>I’m Silas Osunba, an engineer and researcher guided by curiosity, purpose, and the belief that excellence is a practice.</p>
      </header>
      <div className="grid items-start gap-12 md:grid-cols-[1fr_1.6fr] lg:gap-20">
        <figure>
          <img src={portrait.src} alt="Silas Osunba" width={portrait.width} height={portrait.height} className="w-full rounded-md" />
          <figcaption className="mt-4 text-sm text-muted dark:text-muted-dark">Engineering with curiosity and purpose.</figcaption>
        </figure>
        <div className="space-y-10">
          <section>
            <h2 className="section-title mb-5">My background</h2>
            <p className="leading-8 text-muted dark:text-muted-dark">I earned my degree in Electronic & Computer Engineering from Lagos State University, graduating with highest honors. That foundation shapes how I approach software, machine learning, and the physical systems they connect to.</p>
          </section>
          <section>
            <h2 className="section-title mb-5">What I’m drawn to</h2>
            <p className="leading-8 text-muted dark:text-muted-dark">My work sits at the intersection of machine learning, software, and research. I’m interested in intelligent, energy-aware systems, with research interests in autonomous systems, robot learning, embodied AI, and trustworthy AI.</p>
            <Link href="/research" className="text-link mt-5 inline-block">Explore my research ↗</Link>
          </section>
          <section>
            <h2 className="section-title mb-5">What matters to me</h2>
            <p className="leading-8 text-muted dark:text-muted-dark">I have led educational programs and community outreach, and I advocate for AI for Social Good. I care about sharing knowledge and exploring how technology can help people.</p>
          </section>
          <section>
            <h2 className="section-title mb-5">Beyond the work</h2>
            <p className="leading-8 text-muted dark:text-muted-dark">Outside research, I follow current events, watch football, study blockchain, and play snooker. These interests give me space to explore, reflect, and see things from a different perspective.</p>
          </section>
          <Link href="/contact" className="btn-primary">Let’s connect ↗</Link>
        </div>
      </div>
    </article>
  );
}
