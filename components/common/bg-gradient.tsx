import React from "react";
export default function BgGradient({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`relative isolate ${className}`}>
      {/* This div creates the gradient background with specific styling */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-30"
        style={{
          clipPath:
            "polygon(50% 0%, 61% 35%,98%0 35%, 68% 57%,79% 91%,50% 70%,21% 91%,32% 57%,2% 35%,39% 35%)",
        }}
      >
        <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-linear-to-b from-emerald-500 via-teal-500 to-cyan-500 opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72rem]" />
      </div>
      {/* Children content is rendered here, on top of the gradient background */}
      {children}
    </div>
  );
}
