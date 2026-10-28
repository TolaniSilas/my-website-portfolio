const SchedulePage = () => {
  return (
    <div className="mx-auto max-w-4xl px-6 py-28 text-center">

      <h1 className="section-title mb-2">Silas Osunba</h1>
      <h2 className="mb-8 text-xl text-muted dark:text-muted-dark">Schedule a Meeting</h2>

      <div className="card-surface mb-10 p-6">
        <p className="mb-2 text-lg font-semibold">20 min</p>
        <p className="text-muted dark:text-muted-dark">
          Web conferencing details provided upon confirmation.
        </p>
      </div>

      <div className="card-surface p-6">
        <h3 className="mb-4 text-lg font-semibold">Find a time to connect</h3>
        <p className="mb-6 text-muted dark:text-muted-dark">
          Email me a short note about what you would like to discuss, along with
          a few times that work for you and your time zone. I’ll reply to confirm
          a time and share the meeting details.
        </p>
        <a
          href={`mailto:osunbasilas@gmail.com?subject=${encodeURIComponent("20-minute meeting request")}&body=${encodeURIComponent("Hi Silas,\n\nI’d like to discuss:\n\nMy time zone:\nTimes that work for me:\n\nThanks!")}`}
          className="btn-primary"
        >
          Request a meeting by email
        </a>
        <p className="mt-4 text-sm text-muted dark:text-muted-dark">
          Or email osunbasilas@gmail.com directly.
        </p>
      </div>
    </div>
  );
};

export default SchedulePage;
