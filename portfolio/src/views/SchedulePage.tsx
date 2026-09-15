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
        <h3 className="mb-4 text-lg font-semibold">Select a Date & Time</h3>
        <p className="mb-6 text-muted dark:text-muted-dark">August 2025</p>
        <div className="grid grid-cols-7 gap-2 text-muted dark:text-muted-dark">
          {Array.from({ length: 31 }, (_, i) => (
            <div
              key={i + 1}
              className="cursor-pointer rounded-md p-3 transition hover:bg-accent hover:text-white"
            >
              {i + 1}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SchedulePage;
