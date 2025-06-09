import { FileText } from "lucide-react";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import NavLink from "@/components/common/nav-link";

export default function Header() {
  return (
    <nav className="container flex items-center justify-between py-4 lg:px-8 px-2 mx-auto">
      {/* Logo */}
      <div className="flex lg:flex-1">
        <NavLink href="/" className="flex items-center gap-1 lg:gap-2 shrink-0">
          <FileText className="w-5 h-5 lg:w-8 lg:h-8 text-gray-900 hover:rotate-12 transform transition duration-200 ease-in-out" />
          <span className="font-extrabold lg:text-xl text-gray-900">
            Sommaire
          </span>
        </NavLink>
      </div>

      {/* Center nav items */}
      <div className="flex lg:justify-center gap-4 lg:gap-12 lg:items-center">
        <NavLink href="/#pricing">Pricing</NavLink>
        <SignedIn>
          <NavLink href="/dashboard">Your Summaries</NavLink>
        </SignedIn>
      </div>

      {/* Right side */}
      <div className="flex lg:justify-end lg:flex-1 items-center gap-4">
        <SignedIn>
          <NavLink href="/upload">Upload a PDF</NavLink>
          <span className="text-sm font-medium text-gray-700">Pro</span>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>

        <SignedOut>
          <NavLink href="/sign-in">
            <Button>Sign In</Button>
          </NavLink>
        </SignedOut>
      </div>
    </nav>
  );
}
