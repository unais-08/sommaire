// components/common/Header.tsx
"use client"; // This component needs to be a client component due to useState and event listeners

import React, { useState } from "react";
import { FileText, Menu, X, Upload, LayoutDashboard } from "lucide-react"; // Import additional icons
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import NavLink from "@/components/common/nav-link"; // Assuming this is correct
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const handleSignIn = () => {
    closeMobileMenu();
    router.push("/sign-in");
  };
  // Helper function to close menu (e.g., after clicking a link)
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <nav className="bg-white/95 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Main Header Row */}
        <div className="flex items-center justify-between py-4 lg:py-4">
          {/* Logo (always visible) */}
          <div className="flex-none lg:flex-1">
            <NavLink
              href="/"
              className="flex items-center gap-2 lg:gap-2 shrink-0"
            >
              <FileText className="w-7 h-7 lg:w-8 lg:h-8 text-gray-900 hover:rotate-12 transform transition duration-200 ease-in-out" />
              <span className="font-extrabold text-xl lg:text-xl text-gray-900">
                Sommaire
              </span>
            </NavLink>
          </div>

          {/* Mobile Quick Actions (visible on mobile when signed in) */}
          <SignedIn>
            <div className="flex lg:hidden items-center gap-3">
              <NavLink
                href="/dashboard"
                className="p-2.5 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <LayoutDashboard className="w-5 h-5 text-gray-700" />
              </NavLink>
              <NavLink href="/upload">
                <Button
                  size="sm"
                  className="bg-gray-900 hover:bg-gray-800 text-white px-4 py-2.5 text-sm font-medium rounded-lg shadow-sm"
                >
                  <Upload className="w-4 h-4 mr-1.5" />
                  Upload
                </Button>
              </NavLink>
            </div>
          </SignedIn>

          {/* Mobile Menu Toggle (hamburger) */}
          <div className="lg:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle mobile menu"
              className="ml-3 hover:bg-gray-50 rounded-lg p-2.5"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5 text-gray-700" />
              ) : (
                <Menu className="h-5 w-5 text-gray-700" />
              )}
            </Button>
          </div>

          {/* Desktop Navigation (visible only on lg screens and up) */}
          <div className="hidden lg:flex lg:justify-center lg:flex-1 gap-12 items-center">
            <NavLink href="/#pricing">Pricing</NavLink>
            <SignedIn>
              <NavLink href="/dashboard">Your Summaries</NavLink>
              <NavLink href="/upload">Upload a PDF</NavLink>
            </SignedIn>
          </div>

          {/* Desktop Right side (UserButton and Pro, visible only on lg screens and up) */}
          <div className="hidden lg:flex lg:justify-end lg:flex-1 items-center gap-4">
            <SignedIn>
              <span className="text-sm font-medium text-gray-700 bg-gray-100 px-2 py-1 rounded-full">
                Pro
              </span>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
            <SignedOut>
              <NavLink href="/sign-in">
                <Button className="bg-gray-900 hover:bg-gray-800">
                  Sign In
                </Button>
              </NavLink>
            </SignedOut>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay (visible only when isMobileMenuOpen is true) - Enhanced design */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-white z-40 lg:hidden">
          <div className="flex flex-col h-full">
            {/* Menu Header - Enhanced */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <FileText className="w-6 h-6 text-gray-900" />
                <span className="font-bold text-lg text-gray-900">Menu</span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={closeMobileMenu}
                className="hover:bg-gray-100 rounded-lg"
              >
                <X className="h-5 w-5 text-gray-700" />
              </Button>
            </div>

            {/* Menu Content - Simplified and more visible */}
            <div className="flex-1 p-4 bg-white h-screen">
              {/* Account Section - For signed in users */}
              <SignedIn>
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-gray-800 mb-3">
                    Account
                  </h3>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <UserButton afterSignOutUrl="/" />
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        Pro Member
                      </div>
                      <div className="text-xs text-gray-500">
                        Active subscription
                      </div>
                    </div>
                  </div>
                </div>
              </SignedIn>

              {/* Navigation Section */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-800 mb-3">
                  Navigation
                </h3>
                <div className="space-y-2">
                  <NavLink
                    href="/#pricing"
                    onClick={closeMobileMenu}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <span className="text-xl">💰</span>
                    <div>
                      <div className="font-medium text-gray-900">Pricing</div>
                      <div className="text-sm text-gray-500">
                        View our plans
                      </div>
                    </div>
                  </NavLink>
                </div>
              </div>

              {/* Documents Section - For signed in users */}
              <SignedIn>
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-gray-800 mb-3">
                    Your Documents
                  </h3>
                  <div className="space-y-2">
                    <NavLink
                      href="/dashboard"
                      onClick={closeMobileMenu}
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center">
                        <LayoutDashboard className="w-4 h-4 text-green-600" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">
                          Your Summaries
                        </div>
                        <div className="text-sm text-gray-500">
                          Manage documents
                        </div>
                      </div>
                    </NavLink>
                    <NavLink
                      href="/upload"
                      onClick={closeMobileMenu}
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center">
                        <Upload className="w-4 h-4 text-purple-600" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">
                          Upload PDF
                        </div>
                        <div className="text-sm text-gray-500">
                          Add new document
                        </div>
                      </div>
                    </NavLink>
                  </div>
                </div>
              </SignedIn>

              {/* Sign In Section - For logged out users */}
              <SignedOut>
                <div className="mb-6">
                  <div className="flex flex-col items-center gap-1">
                    <h3 className="text-sm font-semibold text-gray-800 mb-2">
                      Get Started
                    </h3>

                    <Button
                      className="bg-rose-500 hover:bg-gray-800 "
                      onClick={handleSignIn}
                    >
                      ✨ Sign In
                    </Button>

                    <p className="text-sm text-gray-600 mt-2 text-center">
                      Sign in to access summaries and upload documents
                    </p>
                  </div>
                </div>
              </SignedOut>
            </div>

            {/* Menu Footer */}
            <div className="p-4 border-t border-gray-200 bg-gray-50">
              <div className="text-center">
                <p className="text-xs text-gray-500">
                  Made with ❤️ by Sommaire Team
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
