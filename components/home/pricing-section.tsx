import React from "react";
import { ArrowRight, Check } from "lucide-react";
import { cn } from "@/lib/utils";
// Define the type for a single pricing plan
type PriceType = {
  name: string;
  price: number;
  description: string;
  items: string[];
  id: string;
  paymentLink: string;
  priceId: string; // Although not used in this component, keeping for type consistency
};

// Data for the pricing plans
const plans: PriceType[] = [
  {
    id: "basic",
    name: "Basic",
    description: "Ideal for individuals or small teams",
    price: 9,
    items: [
      "5 PDF summaries per month",
      "Standard processing speed",
      "Email support",
    ],
    paymentLink: "https://buy.stripe.com/00g5nC0bG7a8c1GdQ4",
    priceId: "price_1N4Zy2Lz5a8c1GdQ4",
  },
  {
    id: "pro",
    name: "Pro",
    description: "Perfect for professionals and freelancers",
    price: 19,
    items: [
      "Unlimited PDF summaries",
      "Priority processing",
      "24/7 priority support",
      "Markdown Export",
    ],
    paymentLink: "https://buy.stripe.com/00g5nC0bG7a8c1GdQ4",
    priceId: "price_1N4Zy2Lz5a8c1GdQ4",
  },
];

/**
 * PricingCard Component
 * Renders a single pricing plan card with name, description, price, features, and a buy button.
 * Styles are enhanced for better visual appeal and responsiveness.
 */
function PricingCard({
  name,
  price,
  description,
  items,
  id,
  paymentLink,
}: PriceType) {
  const isPro = id === "pro"; // Helper to check if it's the Pro plan

  return (
    <div className="relative w-full max-w-sm mx-auto flex flex-col">
      {/* Main card container with conditional styling for Pro plan */}
      <div
        className={cn(
          "relative flex flex-col flex-1 p-6 sm:p-8 rounded-2xl border border-gray-200 bg-white shadow-lg",
          "transform transition-transform duration-300 ease-in-out hover:-translate-y-2 hover:scale-105", // Added hover effects
          isPro && "border-rose-500 border-2" // Thicker, rose border for Pro
        )}
      >
        {/* Header section of the card */}
        <div className="flex flex-col mb-6">
          <p className="text-xl lg:text-2xl font-bold capitalize text-gray-900 mb-2">
            {name}
          </p>
          <p className="text-gray-600 text-sm">{description}</p>
        </div>

        {/* Price display */}
        <div className="flex items-baseline mb-6">
          <span className="text-5xl font-extrabold text-gray-900 leading-none">
            ${price}
          </span>
          <span className="text-gray-500 text-base ml-1">/month</span>
        </div>

        {/* Features list */}
        <ul className="flex-1 space-y-3 mb-8 text-gray-700">
          {items.map((item, idx) => (
            <li key={idx} className="flex items-center gap-3 text-base">
              {/* Increased Check icon size for better visibility */}
              <Check className="h-5 w-5 text-green-500 shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        {/* Buy Now button */}
        <div className="mt-auto">
          {" "}
          {/* Pushes button to bottom */}
          {/* Replaced Next.js Link with a standard <a> tag for broader compatibility */}
          <a
            href={paymentLink}
            className={cn(
              "w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-white font-semibold transition-all duration-300 ease-in-out shadow-md",
              isPro
                ? "bg-gradient-to-r from-rose-700 to-pink-800 hover:from-rose-800 hover:to-pink-900 border-rose-900 border-2" // Stronger gradient for Pro
                : "bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 border-rose-100 border-2" // Lighter gradient for Basic
            )}
          >
            Buy Now <ArrowRight className="ml-1 h-5 w-5" />
          </a>
        </div>
      </div>
    </div>
  );
}

/**
 * PricingSection Component
 * Main component to display the pricing plans.
 */
export default function PricingSection() {
  return (
    <section className="py-16 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-6xl mx-auto text-center mb-12 lg:mb-16">
        <h2 className="text-rose-600 text-xl font-bold uppercase tracking-wider mb-2">
          Pricing
        </h2>
        <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
          Choose a plan that's right for you
        </h3>
      </div>

      <div className="relative flex flex-col lg:flex-row items-center lg:items-stretch justify-center gap-8 max-w-6xl mx-auto">
        {/* Pricing Card display here */}
        {plans.map((plan) => (
          <PricingCard key={plan.id} {...plan} />
        ))}
      </div>
    </section>
  );
}
