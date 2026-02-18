"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  FileText,
  Menu,
  X,
  Upload,
  LayoutDashboard,
  LogOut,
  LogIn,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import NavLink from "@/components/common/nav-link";
import { useRouter, usePathname } from "next/navigation";
import { signOut } from "@/lib/auth";

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const checkAuth = useCallback(() => {
    const hasSession = document.cookie.includes("is_logged_in=true");
    setIsLoggedIn(hasSession);
  }, []);

  // Check auth on mount, on focus, on route change
  useEffect(() => {
    checkAuth();
    window.addEventListener("focus", checkAuth);
    const interval = setInterval(checkAuth, 1000);
    return () => {
      window.removeEventListener("focus", checkAuth);
      clearInterval(interval);
    };
  }, [checkAuth, pathname]);

  // Add scroll shadow
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const handleSignOut = async () => {
    setIsMobileMenuOpen(false);
    await signOut();
    setIsLoggedIn(false);
    router.push("/");
    router.refresh();
  };

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const navLinks = [
    { href: "/#pricing", label: "Pricing" },
    ...(isLoggedIn
      ? [
          { href: "/dashboard", label: "Dashboard" },
          { href: "/upload", label: "Upload" },
        ]
      : []),
  ];

  return (
    <nav
      className={`sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b transition-shadow duration-300 ${
        isScrolled ? "border-gray-200 shadow-sm" : "border-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <NavLink href="/" className="flex items-center gap-2 shrink-0 group">
            <div className="relative">
              <FileText className="w-7 h-7 text-rose-500 group-hover:rotate-12 transition-transform duration-300" />
            </div>
            <span className="font-extrabold text-xl tracking-tight text-gray-900">
              Sommaire
            </span>
          </NavLink>

          {/* Desktop Nav Links - Center */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.href}
                href={link.href}
                className="px-4 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-all duration-200"
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* Desktop Auth Actions - Right */}
          <div className="hidden md:flex items-center gap-3">
            {isLoggedIn ? (
              <>
                <NavLink href="/upload">
                  <Button
                    size="sm"
                    className="bg-rose-500 hover:bg-rose-600 text-white rounded-lg gap-2 shadow-sm hover:shadow transition-all duration-200"
                  >
                    <Upload className="w-4 h-4" />
                    Upload PDF
                  </Button>
                </NavLink>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleSignOut}
                  className="text-gray-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg gap-2 transition-all duration-200"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <NavLink href="/sign-in">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-gray-600 hover:text-gray-900 rounded-lg"
                  >
                    Sign In
                  </Button>
                </NavLink>
                <NavLink href="/sign-up">
                  <Button
                    size="sm"
                    className="bg-gray-900 hover:bg-gray-800 text-white rounded-lg gap-2 shadow-sm hover:shadow transition-all duration-200"
                  >
                    <Sparkles className="w-4 h-4" />
                    Get Started
                  </Button>
                </NavLink>
              </>
            )}
          </div>

          {/* Mobile: Quick actions + Hamburger */}
          <div className="flex md:hidden items-center gap-2">
            {isLoggedIn && (
              <NavLink href="/upload">
                <Button
                  size="sm"
                  className="bg-rose-500 hover:bg-rose-600 text-white rounded-lg gap-1.5 shadow-sm h-9 px-3 text-xs"
                >
                  <Upload className="w-3.5 h-3.5" />
                  Upload
                </Button>
              </NavLink>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
              className="hover:bg-gray-100 rounded-lg h-9 w-9"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5 text-gray-700" />
              ) : (
                <Menu className="h-5 w-5 text-gray-700" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
            onClick={closeMobileMenu}
          />

          {/* Slide-in Panel */}
          <div className="fixed inset-y-0 right-0 w-full max-w-sm bg-white shadow-2xl z-50 md:hidden animate-in slide-in-from-right duration-300">
            <div className="flex flex-col h-full">
              {/* Mobile Menu Header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-rose-500" />
                  <span className="font-bold text-gray-900">Menu</span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={closeMobileMenu}
                  className="hover:bg-gray-100 rounded-lg h-9 w-9"
                >
                  <X className="h-5 w-5 text-gray-600" />
                </Button>
              </div>

              {/* Mobile Menu Body */}
              <div className="flex-1 overflow-y-auto px-5 py-6">
                {/* Nav Links */}
                <div className="space-y-1">
                  <NavLink
                    href="/#pricing"
                    onClick={closeMobileMenu}
                    className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-gray-50 transition-colors text-gray-700 hover:text-gray-900"
                  >
                    <span className="text-lg">💰</span>
                    <span className="font-medium">Pricing</span>
                  </NavLink>

                  {isLoggedIn && (
                    <>
                      <NavLink
                        href="/dashboard"
                        onClick={closeMobileMenu}
                        className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-gray-50 transition-colors text-gray-700 hover:text-gray-900"
                      >
                        <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center">
                          <LayoutDashboard className="w-4 h-4 text-emerald-600" />
                        </div>
                        <div>
                          <div className="font-medium">Dashboard</div>
                          <div className="text-xs text-gray-500">
                            View your summaries
                          </div>
                        </div>
                      </NavLink>
                      <NavLink
                        href="/upload"
                        onClick={closeMobileMenu}
                        className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-gray-50 transition-colors text-gray-700 hover:text-gray-900"
                      >
                        <div className="w-8 h-8 rounded-lg bg-violet-50 flex items-center justify-center">
                          <Upload className="w-4 h-4 text-violet-600" />
                        </div>
                        <div>
                          <div className="font-medium">Upload PDF</div>
                          <div className="text-xs text-gray-500">
                            Summarize a new document
                          </div>
                        </div>
                      </NavLink>
                    </>
                  )}
                </div>

                {/* Divider */}
                <div className="my-6 border-t border-gray-100" />

                {/* Auth Action */}
                {isLoggedIn ? (
                  <Button
                    variant="ghost"
                    className="w-full justify-start gap-3 px-3 py-3 h-auto text-gray-600 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all duration-200"
                    onClick={handleSignOut}
                  >
                    <div className="w-8 h-8 rounded-lg bg-rose-50 flex items-center justify-center">
                      <LogOut className="w-4 h-4 text-rose-500" />
                    </div>
                    <div className="text-left">
                      <div className="font-medium">Sign Out</div>
                      <div className="text-xs text-gray-400">
                        End your session
                      </div>
                    </div>
                  </Button>
                ) : (
                  <div className="space-y-3">
                    <NavLink href="/sign-in" onClick={closeMobileMenu}>
                      <Button
                        variant="outline"
                        className="w-full rounded-xl h-11 text-gray-700 border-gray-200 hover:bg-gray-50 gap-2"
                      >
                        <LogIn className="w-4 h-4" />
                        Sign In
                      </Button>
                    </NavLink>
                    <NavLink href="/sign-up" onClick={closeMobileMenu}>
                      <Button className="w-full rounded-xl h-11 bg-gray-900 hover:bg-gray-800 text-white gap-2 shadow-sm">
                        <Sparkles className="w-4 h-4" />
                        Get Started Free
                      </Button>
                    </NavLink>
                  </div>
                )}
              </div>

              {/* Mobile Menu Footer */}
              <div className="px-5 py-4 border-t border-gray-100 bg-gray-50/50">
                <p className="text-xs text-center text-gray-400">
                  Sommaire — AI-Powered PDF Summaries
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </nav>
  );
}
