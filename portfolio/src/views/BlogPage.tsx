"use client";
import { useContent } from "../context/ContentContext";


export default function BlogPage() {
  const { posts } = useContent();
  return (
    <div className="min-h-screen px-6 pt-28 pb-16">
      <div className="mb-16 mt-4 text-center">
        <p className="section-kicker">Writing</p>
        <h1 className="section-title mb-5">
          Articles
        </h1>
        <p className="mx-auto min-h-[88px] max-w-2xl text-lg leading-relaxed text-muted dark:text-muted-dark">
          Notes and perspectives on technology, data science, and building intelligent systems.
        </p>
      </div>

      <div className="mx-auto grid max-w-6xl gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <article key={post.id} className="card-surface group p-6 transition hover:-translate-y-1">
            <time className="mb-3 block text-xs uppercase tracking-[0.18em] text-gold">{post.date}</time>
            <h2 className="font-display mb-3 text-xl font-semibold md:text-2xl">{post.title}</h2>
            <p className="mb-6 text-muted dark:text-muted-dark">{post.excerpt}</p>
            <a
              href={post.slug}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-accent hover:underline dark:text-gold"
            >
              Read More →
            </a>
          </article>
        ))}
      </div>

      <div className="card-surface mx-auto mt-20 max-w-4xl p-10 text-center">
        <h2 className="font-display mb-4 text-2xl font-semibold md:text-3xl">More writing on Medium</h2>
        <p className="mb-6 leading-relaxed text-muted dark:text-muted-dark">
          Visit my Medium profile for additional technical articles and notes.
        </p>
        <a
          href="https://medium.com/@tolanisilas3606"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary"
        >
          View Medium Profile
        </a>
      </div>
    </div>
  );
}
