import React from "react";
import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-neutral-900">
      <div className="text-7xl mb-4">🚫</div>
      <h1 className="text-4xl font-bold mb-2">404 - Page Not Found</h1>
      <p className="mb-6 text-lg text-neutral-600">
        Sorry, the page you are looking for does not exist.
      </p>
      <button
        className="px-6 py-2 bg-neutral-900 text-white rounded hover:bg-neutral-700 transition"
        onClick={() => navigate("/")}
      >
        Go Home
      </button>
    </div>
  );
}

export default NotFound;
