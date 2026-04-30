"use client";

import { useSiteConfig } from "../context/SiteConfigContext";
import Link from "next/link";
import {
  LayoutDashboard,
  Building2,
  Video,
  BookOpen,
  GraduationCap,
  Users,
  Camera,
  Newspaper,
  Quote,
  Inbox,
  School,
  TrendingUp,
  Eye
} from "lucide-react";

export default function AdminDashboard() {
  const { config, loading } = useSiteConfig();

  if (loading) return <div className="text-center py-12 text-gray-500">Loading...</div>;

  const stats = [
    { label: "Teachers", value: config.teachers.length, icon: Users, href: "/admin/teachers", color: "bg-blue-500" },
    { label: "Photos", value: config.photos.length, icon: Camera, href: "/admin/photos", color: "bg-purple-500" },
    { label: "News", value: config.news.length, icon: Newspaper, href: "/admin/news", color: "bg-orange-500" },
    { label: "Testimonials", value: config.testimonials.length, icon: Quote, href: "/admin/testimonials", color: "bg-pink-500" },
    { label: "Inquiries", value: config.inquiries.length, icon: Inbox, href: "/admin/inquiries", color: "bg-yellow-500" },
    { label: "Admissions", value: config.admissionInquiries.length, icon: School, href: "/admin/admissions", color: "bg-green-500" },
  ];

  const quickLinks = [
    { label: "School Info", icon: Building2, href: "/admin/school", desc: "Update name, contact, address" },
    { label: "Hero Section", icon: Video, href: "/admin/hero", desc: "Change video, banner text" },
    { label: "About", icon: BookOpen, href: "/admin/about", desc: "Mission, vision, stats" },
    { label: "Principal", icon: GraduationCap, href: "/admin/principal", desc: "Principal details & message" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Dashboard</h2>
        <p className="text-gray-500">Overview of your school website content.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="bg-gray-50 hover:bg-gray-100 rounded-xl p-4 transition-colors"
          >
            <div className="flex items-center justify-between mb-2">
              <stat.icon className="w-5 h-5 text-gray-600" />
              <span className={`${stat.color} text-white text-xs font-bold px-2 py-1 rounded-full`}>
                {stat.value}
              </span>
            </div>
            <p className="text-sm font-medium text-gray-700">{stat.label}</p>
          </Link>
        ))}
      </div>

      {/* Quick Links */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Settings</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {quickLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="flex items-center gap-4 p-4 bg-gray-50 hover:bg-blue-50 rounded-xl transition-colors"
            >
              <div className="w-10 h-10 bg-school-blue/10 rounded-lg flex items-center justify-center">
                <link.icon className="w-5 h-5 text-school-blue" />
              </div>
              <div>
                <p className="font-medium text-gray-900">{link.label}</p>
                <p className="text-sm text-gray-500">{link.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Preview Link */}
      <div className="flex justify-center">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-2 text-school-blue hover:underline"
        >
          <Eye className="w-4 h-4" />
          Preview Live Website
        </Link>
      </div>
    </div>
  );
}
