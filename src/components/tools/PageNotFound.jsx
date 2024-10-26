import React from "react";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-9xl font-bold text-gray-200">404</h1>
      <p className="text-3xl font-bold mt-4">Page Not Found</p>
      <p className="text-lg mt-2">
        The page you are looking for might have been removed, had its name
        changed, or is temporarily unavailable.
      </p>
      <Link to={"/"}>
        <button className="mt-6 px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-md text-white font-bold">
          Go Back Home
        </button>
      </Link>
    </div>
  );
};

export default PageNotFound;
