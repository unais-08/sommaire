import React from "react";
import { ArrowRight } from "lucide-react"; // Assuming ArrowRight icon from lucide-react

/**
 * CallToActionSection Component
 * This component displays a call to action for users to save reading time,
 * encouraging them to get started with the AI-powered summarizer.
 */
export default function CallToActionSection() {
  return (
    <section className="py-16 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
          Ready to Save Hours of Reading Time?
        </h2>
        <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
          Transform lengthy documents into clear, actionable insights with our
          AI-powered summarizer.
        </p>
        <a
          href="/get-started" // Link to your "Get Started" page
          className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-white font-semibold text-lg transition-all duration-300 ease-in-out shadow-lg
                     bg-gradient-to-r from-gray-800 to-rose-600 hover:from-gray-900 hover:to-rose-700"
        >
          Get Started <ArrowRight className="ml-2 h-6 w-6" />
        </a>
      </div>
    </section>
  );
}
