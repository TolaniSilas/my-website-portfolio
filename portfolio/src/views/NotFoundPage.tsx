import Link from "next/link";

const NotFoundPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-canvas px-6 text-center text-ink dark:bg-canvas-dark dark:text-ink-dark">
      <p className="section-kicker">Error</p>
      <h1 className="font-display mb-6 text-8xl font-semibold text-accent dark:text-gold">404</h1>
      <h2 className="mb-4 text-2xl font-semibold sm:text-3xl">Page not found</h2>
      <p className="mb-8 max-w-md text-muted dark:text-muted-dark">
        The page you are looking for doesn&apos;t exist, has been moved, or is temporarily unavailable.
      </p>
      <Link href="/" className="btn-primary">
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
