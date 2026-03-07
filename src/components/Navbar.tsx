"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
  { href: "/testimonials", label: "Testimonials" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 w-full z-50 py-4 px-6 md:px-12 backdrop-blur-md bg-[#0b0b0b]/60 border-b border-white/5 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          {/* We're using standard img tag here to maintain simple natural sizing for the logo */}
          <img src="/logo.png" alt="AmplifyCO.digital Logo" className="h-14 w-auto object-cover rounded-2xl shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-transform hover:scale-105" />
          <span className="text-xl font-bold tracking-tighter hidden sm:block">
            AmplifyCO<span className="text-gray-400">.digital</span>
          </span>
        </Link>
        <nav className="hidden md:flex gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm tracking-wide transition-colors hover:text-white ${
                pathname === link.href ? "text-white font-medium" : "text-gray-400"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="hidden md:flex">
          <Button variant="default" className="rounded-full bg-white text-black hover:bg-gray-200 transition-colors">
            <Link href="/contact">Start Project</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
