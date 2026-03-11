"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import MeetingModal from "./MeetingModal";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
  { href: "/testimonials", label: "Testimonials" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isMeetingModalOpen, setIsMeetingModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <MeetingModal isOpen={isMeetingModalOpen} onClose={() => setIsMeetingModalOpen(false)} />
      <header className="fixed top-0 left-0 w-full z-50 py-4 px-6 md:px-12 backdrop-blur-md bg-[#0b0b0b]/60 border-b border-white/5 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-1">
          {/* We're using standard img tag here to maintain simple natural sizing for the logo */}
          <img src="/logo.png" alt="AmplifyCO.digital Logo" className="h-20 w-auto object-contain transition-transform hover:scale-105 drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]" />
          <span className="text-xl font-sans font-bold tracking-tighter hidden sm:block text-white">
            AmplifyCO<span className="text-gray-400 font-light">.digital</span>
          </span>
        </Link>
        <nav className="hidden md:flex gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm tracking-wide transition-colors hover:text-white ${pathname === link.href ? "text-white font-medium" : "text-gray-400"
                }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="hidden md:flex gap-4">
          <Button variant="outline" className="rounded-full border-white/20 text-white hover:bg-white/10 transition-colors" onClick={() => setIsMeetingModalOpen(true)}>
            Schedule Meeting
          </Button>
          <Button variant="default" className="rounded-full bg-white text-black hover:bg-gray-200 transition-colors">
            <Link href="/contact">Start Project</Link>
          </Button>
        </div>
        
        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-white p-2 focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 w-full bg-[#0b0b0b] border-b border-white/10 shadow-2xl md:hidden overflow-hidden"
          >
            <div className="flex flex-col px-6 py-6 gap-6">
              <nav className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`text-lg tracking-wide transition-colors ${
                      pathname === link.href ? "text-white font-medium" : "text-gray-400"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
              <div className="flex flex-col gap-3 py-4 border-t border-white/10">
                <Button 
                  variant="outline" 
                  className="w-full justify-center rounded-full border-white/20 text-white hover:bg-white/10 transition-colors" 
                  onClick={() => {
                    setIsMeetingModalOpen(true);
                    setIsMobileMenuOpen(false);
                  }}
                >
                  Schedule Meeting
                </Button>
                <Button 
                  variant="default" 
                  className="w-full justify-center rounded-full bg-white text-black hover:bg-gray-200 transition-colors"
                >
                  <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)}>Start Project</Link>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
    </>
  );
}
