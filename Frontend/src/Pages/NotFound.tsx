import React from "react";

const NotFound: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center">
      <h1 className="text-4xl font-bold text-red-500">404</h1>
      <p className="mt-4 text-xl">Page Not Found</p>
      <p className="mt-2 text-gray-600">
        The page you are looking for does not exist.
      </p>
      <a href="/" className="mt-6 text-blue-500 hover:underline">
        Go back to Home
      </a>
    </div>
  );
};

export default NotFound;
