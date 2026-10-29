import { posts } from "../data/articles";

export default function ArticlesPage() {
  return (
    <div className="articles-page page-shell">
      <header className="home-heading">
        <h1>Articles</h1>
        <p>Notes on what I’m learning, building, and thinking about in AI and software.</p>
      </header>

      <div className="article-list">
        {posts.map(post => (
          <article key={post.id} className="article-entry">
            <a className="article-entry-image" href={post.slug} target="_blank" rel="noopener noreferrer" aria-label={`Read ${post.title}`} tabIndex={-1}>
              <img src={post.image} alt="" loading="lazy" />
            </a>
            <div className="article-entry-content">
              <div className="article-entry-meta"><time dateTime={post.dateTime}>{post.date}</time><span>{post.readingMinutes} min read</span></div>
              <h2><a href={post.slug} target="_blank" rel="noopener noreferrer">{post.title} <span aria-hidden="true">↗</span></a></h2>
              <p>{post.excerpt}</p>
            </div>
          </article>
        ))}
      </div>

      <footer className="projects-footer">
        <p>More notes and writing on <a href="https://medium.com/@tolanisilas3606" target="_blank" rel="noopener noreferrer">Medium ↗</a></p>
      </footer>
    </div>
  );
}
