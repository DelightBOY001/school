"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, Mail, ChevronDown, GraduationCap } from "lucide-react";
import { useSiteConfig } from "../context/SiteConfigContext";
import Link from "next/link";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Teachers", href: "/teachers" },
  { name: "Programs", href: "/programs" },
  { name: "Facilities", href: "/facilities" },
  { name: "Admissions", href: "/admissions" },
  { name: "News", href: "/news" },
  { name: "Contact", href: "/contact" },
];

export default function Header() {
  const { config } = useSiteConfig();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Top Bar */}
      <div className="bg-school-darkBlue text-white py-2 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-sm">
          <div className="flex items-center gap-6">
            <a href={`tel:${config.phone}`} className="flex items-center gap-2 hover:text-school-gold transition-colors">
              <Phone size={14} />
              <span>{config.phone}</span>
            </a>
            <a href={`mailto:${config.email}`} className="flex items-center gap-2 hover:text-school-gold transition-colors">
              <Mail size={14} />
              <span>{config.email}</span>
            </a>
          </div>
          <div className="flex items-center gap-4">
            <span>Follow us:</span>
            <div className="flex gap-3">
              {["Facebook", "Twitter", "Instagram", "LinkedIn"].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="hover:text-school-gold transition-colors"
                >
                  {social}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <header
        className={`fixed top-0 md:top-10 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white shadow-lg py-2"
            : "bg-transparent py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${isScrolled ? "bg-school-blue" : "bg-white/20"}`}>
                <GraduationCap size={32} className={isScrolled ? "text-white" : "text-white"} />
              </div>
              <div className={`${isScrolled ? "text-school-blue" : "text-white"}`}>
                <h1 className="text-xl font-bold leading-tight">{config.schoolName.split(" ")[0]}</h1>
                <p className="text-xs tracking-wider">{config.schoolName.split(" ").slice(1).join(" ").toUpperCase() || "ACADEMY"}</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                    isScrolled
                      ? "text-gray-700 hover:text-school-blue hover:bg-blue-50"
                      : "text-white/90 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* CTA Button */}
            <div className="hidden lg:block">
              <Link
                href="/admissions"
                className={`px-6 py-2.5 rounded-lg font-semibold transition-all duration-300 ${
                  isScrolled
                    ? "bg-school-blue text-white hover:bg-blue-800"
                    : "bg-school-gold text-school-darkBlue hover:bg-yellow-400"
                }`}
              >
                Apply Now
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`lg:hidden p-2 rounded-lg ${
                isScrolled ? "text-school-blue" : "text-white"
              }`}
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-white pt-24 px-6 lg:hidden"
          >
            <nav className="flex flex-col gap-4">
              {navLinks.map((link, index) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-xl font-medium text-gray-800 py-3 border-b border-gray-100 hover:text-school-blue transition-colors"
                >
                  {link.name}
                </Link>
              ))}
              <Link
                href="/admissions"
                onClick={() => setIsMobileMenuOpen(false)}
                className="mt-4 btn-primary text-center"
              >
                Apply Now
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
