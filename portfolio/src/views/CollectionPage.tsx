"use client";
import { useContent, ContentProvider, ContentStatus } from '../context/ContentContext';
import { safeUrl } from '../lib/content-model';
export default function CollectionPage({ kind }: { kind: 'book' | 'plan' }) {
  return <ContentProvider><CollectionContent kind={kind} /></ContentProvider>;
}

function CollectionContent({ kind }: { kind: 'book' | 'plan' }) {
  const { entries } = useContent();
  const items = entries.filter(e => e.kind === kind);
  return <div className="page-shell min-h-[65vh] pb-20"><header className={`page-intro${kind === 'book' ? ' books-intro' : ''}`}><h1 className="section-title">{kind === 'book' ? 'Books' : 'List66'}</h1>
    {kind === 'book' ? <div className="mt-5 max-w-2xl text-sm leading-relaxed text-muted dark:text-muted-dark">
      <p>Most of what I know today comes from reading, learning, and thinking about what I’ve learned. Reading makes one stay afloat, confident, receptive, and informed, which is why I always nudge people to read.</p>
      <figure className="mt-5 border-l-2 border-line pl-4 dark:border-line-dark">
        <blockquote className="italic">“An informed mind is a living and healthy mind because it cannot be diluted nor tricked by obfuscators.”</blockquote>
        <figcaption className="mt-2 text-xs">— Silas Osunba</figcaption>
      </figure>
    </div> : <p>Things I hope to do, explore, and learn.</p>}
    </header>
    <ContentStatus kind={kind} hasItems={items.length > 0} />
    <div className="grid gap-6 md:grid-cols-2">{items.map(entry => <article key={entry.id} className="card-surface p-6">
      {kind === 'book' && safeUrl(entry.image, true) && <img src={safeUrl(entry.image, true)} alt={`Cover of ${entry.title}`} className="mb-5 h-48 max-w-full object-contain" />}
      <p className="section-kicker">{entry.status === 'in-progress' ? (kind === 'book' ? 'Reading' : 'In progress') : entry.status === 'completed' ? 'Completed' : (kind === 'book' ? 'Want to read' : 'Planned')}</p>
      <h2 className="font-display text-2xl">{entry.title}</h2>{entry.author && <p className="mt-2">{entry.author}</p>}{entry.date && <p className="mt-2 text-sm text-muted">{entry.date}</p>}
      <p className="my-5 whitespace-pre-line leading-8">{entry.body}</p>{safeUrl(entry.url) && <a href={safeUrl(entry.url)} target="_blank" rel="noopener noreferrer" className="text-link">Read more ↗</a>}
    </article>)}</div>
  </div>;
}
