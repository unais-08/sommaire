"use client";
import React from "react";
import Link from "next/link";

/**
 * NotFoundPage component
 * This component is rendered when a user navigates to a non-existent route in Next.js.
 * It provides a friendly 404 message and a link to return to the homepage.
 */
const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-gray-800 p-4 sm:p-6 lg:p-8">
      {/* Container for the content, centered and styled */}
      <div className="bg-white p-8 sm:p-10 lg:p-12 rounded-2xl shadow-xl max-w-lg w-full text-center border border-gray-200">
        <h1 className="text-6xl sm:text-7xl lg:text-8xl font-extrabold text-rose-600 mb-4 animate-bounce-slow">
          404
        </h1>
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
          Page Not Found
        </h2>
        <p className="text-lg sm:text-xl text-gray-600 mb-8 leading-relaxed">
          Oops! The page you're looking for doesn't exist. It might have been
          moved or deleted.
        </p>
        {/* Use Next.js Link component */}
        <Link
          href="/"
          className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-rose-600 hover:bg-rose-700 transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500"
        >
          Go back home
        </Link>
      </div>

      {/* Basic animation for the 404 text */}
      <style jsx>{`
        @keyframes bounce-slow {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        .animate-bounce-slow {
          animation: bounce-slow 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default NotFoundPage;
