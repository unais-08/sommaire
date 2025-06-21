export default function Footer() {
  return (
    <footer className="bg-white py-8 px-4 sm:px-6 lg:px-8 border-t border-gray-100">
      <div className="max-w-4xl mx-auto text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} Sommaire. All rights reserved.
        {/* Optional: Add links like Privacy Policy or Terms of Service */}
        <span className="mx-2">|</span>
        <a href="/privacy-policy" className="hover:underline">
          Privacy Policy
        </a>
        <span className="mx-2">|</span>
        <a href="/terms-of-service" className="hover:underline">
          Terms of Service
        </a>
      </div>
    </footer>
  );
}
