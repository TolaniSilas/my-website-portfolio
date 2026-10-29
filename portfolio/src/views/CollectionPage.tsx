"use client";
import { useContent, ContentProvider, ContentStatus } from '../context/ContentContext';
import { safeUrl } from '../lib/content-model';
export default function CollectionPage() {
  return <ContentProvider><CollectionContent /></ContentProvider>;
}

function CollectionContent() {
  const { entries } = useContent();
  const items = entries.filter(e => e.kind === 'book');
  return <div className="books-page page-shell min-h-[65vh]"><header className="books-intro"><h1 className="page-title">Books</h1>
    <div className="mt-5 max-w-2xl text-sm leading-relaxed text-muted dark:text-muted-dark">
      <p>Most of what I know today comes from reading, learning, and thinking about what I’ve learned. Reading makes one stay afloat, confident, receptive, and informed, which is why I always nudge people to read.</p>
      <figure className="mt-5 border-l-2 border-line pl-4 dark:border-line-dark">
        <blockquote className="italic">“An informed mind is a living and healthy mind because it cannot be diluted nor tricked by obfuscators.”</blockquote>
        <figcaption className="mt-2 text-xs">— Silas Osunba</figcaption>
      </figure>
    </div>
    </header>
    <ContentStatus hasItems={items.length > 0} />
    <div className="grid gap-6 md:grid-cols-2">{items.map(entry => <article key={entry.id} className="card-surface p-6">
      {safeUrl(entry.image, true) && <img src={safeUrl(entry.image, true)} alt={`Cover of ${entry.title}`} className="mb-5 h-48 max-w-full object-contain" />}
      <p className="section-kicker">{entry.status === 'in-progress' ? 'Reading' : entry.status === 'completed' ? 'Completed' : 'Want to read'}</p>
      <h2 className="content-title">{entry.title}</h2>{entry.author && <p className="mt-2">{entry.author}</p>}{entry.date && <p className="mt-2 text-sm text-muted">{entry.date}</p>}
      <p className="my-5 whitespace-pre-line text-sm leading-relaxed">{entry.body}</p>{safeUrl(entry.url) && <a href={safeUrl(entry.url)} target="_blank" rel="noopener noreferrer" className="text-link">Read more ↗</a>}
    </article>)}</div>
  </div>;
}
