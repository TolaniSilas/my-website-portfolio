import Link from "next/link";
import portrait from "../assets/images/silas1.webp";
import { getPublicContent } from "../lib/cms/repository";
import { ContentNotice, NewsList } from "../components/content/ContentLists";

export default async function HomePage() {
  const news = await getPublicContent("news");
  return (
    <article className="home-introduction page-shell">
      <header className="home-heading">
        <h1>Silas Osunba</h1>
        <p>Building at the ethical and responsible layer of super intelligence.</p>
      </header>

      <div className="home-biography">
        <figure className="home-profile">
          <img
          src={portrait.src}
          alt="Silas Osunba"
          width={portrait.width}
          height={portrait.height}
          fetchPriority="high"
          className="home-photo"
          />
        </figure>
        <div className="home-prose">
          <p>I’m Silas Osunba, an AI Research Engineer.</p>
          <p>
            I work at the intersection of machine learning, software, and research.
            I’m interested in trustworthy AI, responsible AI, and how we can make
            intelligent systems useful and accessible to more people.
          </p>
          <p>
            I studied Electronic &amp; Computer Engineering at Lagos State University,
            graduating with highest honors. You can explore my <Link href="/projects">projects</Link> and <Link href="/research">research</Link> to
            see what I’ve been working on.
          </p>
          <p>
            I care about AI for Social Good, education, and community outreach.
            My aim is to help more people understand and use AI responsibly,
            particularly in communities across Africa.
          </p>
          <p>
            Away from work, I follow football, explore blockchain, and play snooker.
            I also <Link href="/articles">write</Link> about what I learn and keep track
            of what I <Link href="/books">read</Link>. <Link href="/about">More about me</Link>.
          </p>
        </div>
      </div>
      <section className="home-news" aria-labelledby="news-heading">
        <h2 id="news-heading">News</h2>
        {news.entries.length ? <NewsList entries={news.entries} /> : <ContentNotice label="News" unavailable={news.unavailable} />}
      </section>
    </article>
  );
}
