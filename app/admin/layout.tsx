"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Video,
  Eye,
  Lock,
  ArrowLeft,
  CheckCircle,
  AlertCircle,
  LogOut,
  Users,
  GraduationCap,
  Building2,
  Newspaper,
  Quote,
  Inbox,
  BookOpen,
  Camera,
  School,
  LayoutDashboard,
  UserPlus
} from "lucide-react";
import { useSiteConfig } from "../context/SiteConfigContext";

const NAV_ITEMS = [
  { id: "", label: "Dashboard", icon: LayoutDashboard, href: "/admin" },
  { id: "school", label: "School Info", icon: Building2, href: "/admin/school" },
  { id: "hero", label: "Hero Section", icon: Video, href: "/admin/hero" },
  { id: "about", label: "About", icon: BookOpen, href: "/admin/about" },
  { id: "principal", label: "Principal", icon: GraduationCap, href: "/admin/principal" },
  { id: "teachers", label: "Teachers", icon: Users, href: "/admin/teachers" },
  { id: "photos", label: "Photos", icon: Camera, href: "/admin/photos" },
  { id: "news", label: "News", icon: Newspaper, href: "/admin/news" },
  { id: "testimonials", label: "Testimonials", icon: Quote, href: "/admin/testimonials" },
  { id: "inquiries", label: "Inquiries", icon: Inbox, href: "/admin/inquiries" },
  { id: "admissions", label: "Admissions", icon: School, href: "/admin/admissions" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { isAdmin, setIsAdmin } = useSiteConfig();
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const pathname = usePathname();

  useEffect(() => {
    const adminSession = sessionStorage.getItem("adminSession");
    if (adminSession === "active") {
      setIsAdmin(true);
    }
  }, [setIsAdmin]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "admin123") {
      setIsAdmin(true);
      sessionStorage.setItem("adminSession", "active");
      setLoginError("");
    } else {
      setLoginError("Invalid password. Try 'admin123' for demo.");
    }
  };

  const handleLogout = () => {
    setIsAdmin(false);
    sessionStorage.removeItem("adminSession");
  };

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-school-blue to-school-darkBlue flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md"
        >
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-school-blue rounded-xl flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Staff Admin Panel</h1>
            <p className="text-gray-500 mt-2">Enter password to access site settings</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-school-blue focus:border-transparent outline-none transition-all"
                placeholder="Enter admin password"
              />
            </div>
            {loginError && (
              <div className="flex items-center gap-2 text-red-500 text-sm bg-red-50 p-3 rounded-lg">
                <AlertCircle className="w-4 h-4" />
                {loginError}
              </div>
            )}
            <button
              type="submit"
              className="w-full bg-school-blue text-white font-semibold py-3 rounded-lg hover:bg-blue-800 transition-colors"
            >
              Login
            </button>
          </form>
          <div className="mt-6 text-center">
            <Link href="/" className="text-school-blue hover:underline text-sm">
              &larr; Back to Website
            </Link>
          </div>
          <p className="text-xs text-gray-400 text-center mt-6">Demo password: admin123</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/" className="flex items-center gap-2 text-gray-600 hover:text-school-blue transition-colors">
                <ArrowLeft className="w-5 h-5" />
                Back to Site
              </Link>
              <div className="h-6 w-px bg-gray-300" />
              <h1 className="text-xl font-bold text-gray-900">Admin Dashboard</h1>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => window.open("/", "_blank")}
                className="flex items-center gap-2 px-4 py-2 text-school-blue hover:bg-blue-50 rounded-lg transition-colors"
              >
                <Eye className="w-4 h-4" />
                Preview
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <nav className="space-y-1 sticky top-24">
              {NAV_ITEMS.map((item) => {
                const isActive = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
                return (
                  <Link
                    key={item.id}
                    href={item.href}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                      isActive
                        ? "bg-school-blue text-white"
                        : "bg-white text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <motion.div
              key={pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-sm p-6"
            >
              {children}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
