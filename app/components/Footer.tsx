"use client";

import { motion } from "framer-motion";
import { GraduationCap, MapPin, Phone, Mail, Facebook, Twitter, Instagram, Linkedin, Youtube, ArrowUp, Heart } from "lucide-react";
import { useSiteConfig } from "../context/SiteConfigContext";
import Link from "next/link";

const quickLinks = [
  { name: "About Us", href: "#about" },
  { name: "Academic Programs", href: "#programs" },
  { name: "Admissions", href: "#admissions" },
  { name: "Facilities", href: "#facilities" },
  { name: "News & Events", href: "#news" },
  { name: "Contact Us", href: "#contact" },
];

const resources = [
  { name: "Student Portal", href: "#" },
  { name: "Parent Portal", href: "#" },
  { name: "Academic Calendar", href: "#" },
  { name: "Fee Structure", href: "#" },
  { name: "Download Forms", href: "#" },
  { name: "Career Opportunities", href: "#" },
  { name: "Staff Login", href: "/admin" },
];

const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Youtube, href: "#", label: "YouTube" },
];

export default function Footer() {
  const { config } = useSiteConfig();
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="bg-school-darkBlue text-white">
      <div className="section-padding py-16 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <a href="#home" className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-school-gold"><GraduationCap className="w-8 h-8 text-school-darkBlue" /></div>
              <div><h3 className="text-xl font-bold">{config.schoolName.split(" ")[0]}</h3><p className="text-xs tracking-wider text-white/60">{config.schoolName.split(" ").slice(1).join(" ").toUpperCase() || "ACADEMY"}</p></div>
            </a>
            <p className="text-white/70 text-sm leading-relaxed mb-6">{config.tagline}</p>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-white/70"><MapPin className="w-4 h-4 text-school-gold" /><span>{config.address}</span></div>
              <div className="flex items-center gap-3 text-sm text-white/70"><Phone className="w-4 h-4 text-school-gold" /><span>{config.phone}</span></div>
              <div className="flex items-center gap-3 text-sm text-white/70"><Mail className="w-4 h-4 text-school-gold" /><span>{config.email}</span></div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1, duration: 0.6 }}>
            <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}><a href={link.href} className="text-white/70 hover:text-school-gold transition-colors text-sm">{link.name}</a></li>
              ))}
            </ul>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2, duration: 0.6 }}>
            <h4 className="text-lg font-semibold mb-6">Resources</h4>
            <ul className="space-y-3">
              {resources.map((link, index) => (
                <li key={index}><Link href={link.href} className="text-white/70 hover:text-school-gold transition-colors text-sm">{link.name}</Link></li>
              ))}
            </ul>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3, duration: 0.6 }}>
            <h4 className="text-lg font-semibold mb-6">Newsletter</h4>
            <p className="text-white/70 text-sm mb-4">Subscribe to receive updates.</p>
            <form className="space-y-3">
              <input type="email" placeholder="Enter your email" className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-school-gold transition-all" />
              <button type="submit" className="w-full py-3 bg-school-gold text-school-darkBlue font-semibold rounded-lg hover:bg-yellow-400 transition-colors">Subscribe</button>
            </form>
            <div className="flex gap-3 mt-6">
              {socialLinks.map((social, index) => (
                <motion.a key={index} href={social.href} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-school-gold hover:text-school-darkBlue transition-all" aria-label={social.label}><social.icon className="w-4 h-4" /></motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="section-padding py-6 max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/60 text-sm text-center md:text-left">© {new Date().getFullYear()} {config.schoolName}. All rights reserved.</p>
          <p className="text-white/60 text-sm flex items-center gap-1">Made with <Heart className="w-4 h-4 text-red-500 fill-red-500" /> for education</p>
          <div className="flex gap-6 text-sm text-white/60">
            <a href="#" className="hover:text-school-gold transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-school-gold transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>

      <motion.button onClick={scrollToTop} initial={{ opacity: 0 }} animate={{ opacity: 1 }} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} className="fixed bottom-8 right-8 w-12 h-12 bg-school-gold text-school-darkBlue rounded-full shadow-lg flex items-center justify-center hover:bg-yellow-400 transition-colors z-40" aria-label="Scroll to top"><ArrowUp className="w-6 h-6" /></motion.button>
    </footer>
  );
}
