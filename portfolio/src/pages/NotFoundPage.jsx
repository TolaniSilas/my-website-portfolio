import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-6">
      {/* Big 404 Text */}
      <h1 className="text-8xl font-extrabold text-blue-600 dark:text-blue-400 mb-6">
        404
      </h1>

      {/* Message */}
      <h2 className="text-2xl sm:text-3xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
        Oops! Page Not Found
      </h2>
      <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md">
        Sorry, the page you are looking for doesn't exist, has been moved, or is
        temporarily unavailable.
      </p>

      {/* Back to Home Button */}
      <Link
        to="/"
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
