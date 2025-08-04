import React from "react";

const SchedulePage = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16 text-center">
      {/* Page Title */}
      <h1 className="text-3xl font-bold mb-2">Silas Osunba</h1>
      <h2 className="text-xl text-gray-600 dark:text-gray-300 mb-8">
        Schedule a Meeting
      </h2>

      {/* Meeting Info */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-10">
        <p className="text-lg font-semibold mb-2">20 min</p>
        <p className="text-gray-600 dark:text-gray-300">
          Web conferencing details provided upon confirmation.
        </p>
      </div>

      {/* Calendar Section (static mockup for now) */}
      <div className="bg-gray-100 dark:bg-gray-900 p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">Select a Date & Time</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-6">August 2025</p>

        <div className="grid grid-cols-7 gap-2 text-gray-700 dark:text-gray-300">
          {Array.from({ length: 31 }, (_, i) => (
            <div
              key={i + 1}
              className="p-3 rounded-md hover:bg-blue-600 hover:text-white cursor-pointer transition"
            >
              {i + 1}
            </div>
          ))}
        </div>
      </div>

      {/* Cookie Settings (Footer note) */}
      <p className="mt-8 text-sm text-gray-500 dark:text-gray-400">
        Cookie settings
      </p>
    </div>
  );
};

export default SchedulePage;
