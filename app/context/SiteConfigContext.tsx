"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface Teacher {
  id: string;
  name: string;
  subject: string;
  qualification: string;
  experience: string;
  photo: string;
  bio: string;
  email?: string;
  displayOrder?: number;
}

export interface Principal {
  id?: string;
  name: string;
  photo: string;
  message: string;
  qualification: string;
  experience: string;
  email?: string;
  phone?: string;
  socialLinks?: { platform: string; url: string }[];
}

export interface Photo {
  id: string;
  url: string;
  caption: string;
  category: string;
}

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  status: "new" | "contacted" | "resolved";
  date: string;
  createdAt?: any;
}

export interface AdmissionInquiry {
  id: string;
  studentName: string;
  parentName: string;
  email: string;
  phone: string;
  gradeApplying: string;
  previousSchool: string;
  message: string;
  status: "new" | "contacted" | "scheduled" | "admitted" | "rejected";
  date: string;
  createdAt?: any;
}

export interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  date: string;
  category: string;
  author: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  photo: string;
  content: string;
  rating: number;
}

export interface SiteConfig {
  schoolName: string;
  tagline: string;
  logo: string;
  heroVideoUrl: string;
  heroVideoPoster: string;
  heroBadge: string;
  heroTitle: string;
  heroSubtitle: string;
  address: string;
  phone: string;
  email: string;
  mapEmbedUrl: string;
  aboutText: string;
  aboutImage: string;
  mission: string;
  vision: string;
  values: string;
  studentCount: string;
  coursesCount: string;
  successRate: string;
  yearsExperience: string;
  principal: Principal;
  teachers: Teacher[];
  photos: Photo[];
  news: NewsArticle[];
  testimonials: Testimonial[];
  inquiries: Inquiry[];
  admissionInquiries: AdmissionInquiry[];
}

interface SiteConfigContextType {
  config: SiteConfig;
  loading: boolean;
  updateConfig: (newConfig: Partial<SiteConfig>) => Promise<void>;
  addTeacher: (teacher: Omit<Teacher, "id">) => Promise<void>;
  updateTeacher: (id: string, teacher: Partial<Teacher>) => Promise<void>;
  deleteTeacher: (id: string) => Promise<void>;
  addPhoto: (photo: Omit<Photo, "id">) => Promise<void>;
  deletePhoto: (id: string) => Promise<void>;
  addInquiry: (inquiry: Omit<Inquiry, "id" | "date" | "status">) => Promise<void>;
  updateInquiryStatus: (id: string, status: Inquiry["status"]) => Promise<void>;
  deleteInquiry: (id: string) => Promise<void>;
  addAdmissionInquiry: (inquiry: Omit<AdmissionInquiry, "id" | "date" | "status">) => Promise<void>;
  updateAdmissionInquiryStatus: (id: string, status: AdmissionInquiry["status"]) => Promise<void>;
  deleteAdmissionInquiry: (id: string) => Promise<void>;
  addNews: (news: Omit<NewsArticle, "id" | "date">) => Promise<void>;
  updateNews: (id: string, news: Partial<NewsArticle>) => Promise<void>;
  deleteNews: (id: string) => Promise<void>;
  addTestimonial: (testimonial: Omit<Testimonial, "id">) => Promise<void>;
  deleteTestimonial: (id: string) => Promise<void>;
  updatePrincipal: (principal: Principal) => Promise<void>;
  refreshData: () => Promise<void>;
  isAdmin: boolean;
  setIsAdmin: (value: boolean) => void;
}

const defaultConfig: SiteConfig = {
  schoolName: "Excellence Academy",
  tagline: "Shaping Future Leaders Through Excellence in Education",
  logo: "/logo.png",
  heroVideoUrl: "https://assets.mixkit.co/videos/preview/mixkit-students-walking-through-a-university-campus-4807-large.mp4",
  heroVideoPoster: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1920&h=1080&fit=crop",
  heroBadge: "Admissions Open for 2024-25",
  heroTitle: "Shaping Future Leaders",
  heroSubtitle: "Through Excellence in Education",
  address: "123 Education Lane, Knowledge City, 12345",
  phone: "+1 (234) 567-890",
  email: "info@excellenceacademy.edu",
  mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387193.30591910525!2d-74.25986652089301!3d40.69714941680757!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s!4v1703000000000!5m2!1sen!2s",
  aboutText: "Excellence Academy has been a beacon of quality education since 1995. With state-of-the-art facilities, experienced faculty, and a student-centered approach, we prepare young minds for the challenges of tomorrow.",
  aboutImage: "https://images.unsplash.com/photo-1562774053-701939374585?w=800&h=600&fit=crop",
  mission: "To provide world-class education that nurtures critical thinking, creativity, and character in every student.",
  vision: "To be the leading educational institution that shapes future leaders and innovators who make a positive impact on society.",
  values: "Excellence • Integrity • Innovation • Inclusivity • Respect",
  studentCount: "2,500+",
  coursesCount: "150+",
  successRate: "98%",
  yearsExperience: "29+",
  principal: {
    name: "Dr. Sarah Johnson",
    photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop",
    message: "Welcome to Excellence Academy! We are dedicated to nurturing young minds and preparing them for a bright future. Our commitment to academic excellence ensures every student reaches their full potential.",
    qualification: "Ph.D. in Education, Harvard University",
    experience: "25+ years in educational leadership",
    email: "principal@excellenceacademy.edu",
    phone: "+1 (234) 567-891",
    socialLinks: [
      { platform: "LinkedIn", url: "#" },
      { platform: "Twitter", url: "#" }
    ]
  },
  teachers: [],
  photos: [],
  news: [],
  testimonials: [],
  inquiries: [],
  admissionInquiries: []
};

const SiteConfigContext = createContext<SiteConfigContextType | undefined>(undefined);

export function SiteConfigProvider({ children }: { children: ReactNode }) {
  const [config, setConfig] = useState<SiteConfig>(defaultConfig);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  // Check admin session
  useEffect(() => {
    const adminSession = sessionStorage.getItem("adminSession");
    if (adminSession === "active") {
      setIsAdmin(true);
    }
  }, []);

  // Default sample data
  const sampleTeachers: Omit<Teacher, "id">[] = [
    {
      name: "Dr. Emily Carter",
      subject: "Mathematics",
      qualification: "Ph.D. in Mathematics, MIT",
      experience: "12+ years",
      photo: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=400&h=400&fit=crop",
      bio: "Dr. Carter is passionate about making mathematics accessible and enjoyable for all students. She specializes in advanced calculus and has published several papers in mathematical education.",
      email: "e.carter@school.edu"
    },
    {
      name: "Mr. James Wilson",
      subject: "Science",
      qualification: "M.Sc. in Physics, Stanford",
      experience: "8+ years",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
      bio: "Mr. Wilson brings science to life with hands-on experiments and real-world applications. He leads our robotics club and science fair programs.",
      email: "j.wilson@school.edu"
    },
    {
      name: "Ms. Sarah Lee",
      subject: "English Literature",
      qualification: "M.A. in English, Oxford",
      experience: "10+ years",
      photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop",
      bio: "Ms. Lee inspires students to discover the beauty of literature. She directs our annual school play and creative writing workshops.",
      email: "s.lee@school.edu"
    },
    {
      name: "Mr. Michael Brown",
      subject: "History",
      qualification: "Ph.D. in History, Yale",
      experience: "15+ years",
      photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
      bio: "Dr. Brown makes history engaging by connecting past events to present-day issues. He organizes educational field trips to historical sites.",
      email: "m.brown@school.edu"
    }
  ];

  const sampleNews: Omit<NewsArticle, "id" | "date">[] = [
    {
      title: "Annual Science Fair Winners Announced",
      excerpt: "Students showcased innovative projects and competed for top honors in our annual science exhibition.",
      content: "Full article content here...",
      image: "https://images.unsplash.com/photo-1562774053-701939374585?w=600&h=400&fit=crop",
      category: "Events",
      author: "Admin"
    },
    {
      title: "New Sports Facilities Opening",
      excerpt: "State-of-the-art sports complex will be inaugurated next month with modern equipment.",
      content: "Full article content here...",
      image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=600&h=400&fit=crop",
      category: "Facilities",
      author: "Admin"
    }
  ];

  const sampleTestimonials: Omit<Testimonial, "id">[] = [
    {
      name: "Priya Sharma",
      role: "Parent of Grade 8 Student",
      photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop",
      content: "This school has transformed my daughter's approach to learning. The teachers are incredibly supportive and the facilities are world-class.",
      rating: 5
    },
    {
      name: "Rajesh Kumar",
      role: "Parent of Two Students",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
      content: "Both my children have thrived here. The balance of academics and extracurricular activities is perfect for holistic development.",
      rating: 5
    }
  ];

  // Load data from localStorage (works without Supabase)
  const refreshData = async () => {
    setLoading(true);
    try {
      console.log("🔄 Loading data from localStorage...");

      // Try to load from localStorage first
      const savedConfig = localStorage.getItem('siteConfig');
      if (savedConfig) {
        setConfig(JSON.parse(savedConfig));
        console.log("✅ Data loaded from localStorage");
      } else {
        // Use default config if nothing saved
        setConfig(defaultConfig);
        console.log("✅ Using default data");
      }
    } catch (error) {
      console.error("❌ Error loading data:", error);
      setConfig(defaultConfig);
    } finally {
      setLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    refreshData();
  }, []);

  const updateConfig = async (newConfig: Partial<SiteConfig>) => {
    const updated = { ...config, ...newConfig };
    setConfig(updated);
    // Save to localStorage
    localStorage.setItem('siteConfig', JSON.stringify(updated));
    console.log("✅ Config saved to localStorage");
  };

  const addTeacher = async (teacher: Omit<Teacher, "id">) => {
    const newTeacher = { ...teacher, id: `teacher-${Date.now()}` };
    const updated = { ...config, teachers: [...config.teachers, newTeacher] };
    setConfig(updated);
    localStorage.setItem('siteConfig', JSON.stringify(updated));
  };

  const updateTeacher = async (id: string, teacher: Partial<Teacher>) => {
    const updated = { ...config, teachers: config.teachers.map(t => t.id === id ? { ...t, ...teacher } : t) };
    setConfig(updated);
    localStorage.setItem('siteConfig', JSON.stringify(updated));
  };

  const deleteTeacher = async (id: string) => {
    const updated = { ...config, teachers: config.teachers.filter(t => t.id !== id) };
    setConfig(updated);
    localStorage.setItem('siteConfig', JSON.stringify(updated));
  };

  const updatePrincipal = async (principal: Principal) => {
    const updated = { ...config, principal };
    setConfig(updated);
    localStorage.setItem('siteConfig', JSON.stringify(updated));
  };

  const addPhoto = async (photo: Omit<Photo, "id">) => {
    const newPhoto = { ...photo, id: `photo-${Date.now()}` };
    const updated = { ...config, photos: [...config.photos, newPhoto] };
    setConfig(updated);
    localStorage.setItem('siteConfig', JSON.stringify(updated));
  };

  const deletePhoto = async (id: string) => {
    const updated = { ...config, photos: config.photos.filter(p => p.id !== id) };
    setConfig(updated);
    localStorage.setItem('siteConfig', JSON.stringify(updated));
  };

  const addInquiry = async (inquiry: Omit<Inquiry, "id" | "date" | "status">) => {
    const newInquiry = { ...inquiry, id: `inquiry-${Date.now()}`, date: new Date().toISOString().split('T')[0], status: 'new' as const };
    const updated = { ...config, inquiries: [newInquiry, ...config.inquiries] };
    setConfig(updated);
    localStorage.setItem('siteConfig', JSON.stringify(updated));
  };

  const updateInquiryStatus = async (id: string, status: Inquiry["status"]) => {
    const updated = { ...config, inquiries: config.inquiries.map(i => i.id === id ? { ...i, status } : i) };
    setConfig(updated);
    localStorage.setItem('siteConfig', JSON.stringify(updated));
  };

  const deleteInquiry = async (id: string) => {
    const updated = { ...config, inquiries: config.inquiries.filter(i => i.id !== id) };
    setConfig(updated);
    localStorage.setItem('siteConfig', JSON.stringify(updated));
  };

  const addAdmissionInquiry = async (inquiry: Omit<AdmissionInquiry, "id" | "date" | "status">) => {
    const newInquiry = { ...inquiry, id: `admission-${Date.now()}`, date: new Date().toISOString().split('T')[0], status: 'new' as const };
    const updated = { ...config, admissionInquiries: [newInquiry, ...config.admissionInquiries] };
    setConfig(updated);
    localStorage.setItem('siteConfig', JSON.stringify(updated));
  };

  const updateAdmissionInquiryStatus = async (id: string, status: AdmissionInquiry["status"]) => {
    const updated = { ...config, admissionInquiries: config.admissionInquiries.map(i => i.id === id ? { ...i, status } : i) };
    setConfig(updated);
    localStorage.setItem('siteConfig', JSON.stringify(updated));
  };

  const deleteAdmissionInquiry = async (id: string) => {
    const updated = { ...config, admissionInquiries: config.admissionInquiries.filter(i => i.id !== id) };
    setConfig(updated);
    localStorage.setItem('siteConfig', JSON.stringify(updated));
  };

  const addNews = async (news: Omit<NewsArticle, "id" | "date">) => {
    const newNews = { ...news, id: `news-${Date.now()}`, date: new Date().toISOString().split('T')[0] };
    const updated = { ...config, news: [newNews, ...config.news] };
    setConfig(updated);
    localStorage.setItem('siteConfig', JSON.stringify(updated));
  };

  const updateNews = async (id: string, news: Partial<NewsArticle>) => {
    const updated = { ...config, news: config.news.map(n => n.id === id ? { ...n, ...news } : n) };
    setConfig(updated);
    localStorage.setItem('siteConfig', JSON.stringify(updated));
  };

  const deleteNews = async (id: string) => {
    const updated = { ...config, news: config.news.filter(n => n.id !== id) };
    setConfig(updated);
    localStorage.setItem('siteConfig', JSON.stringify(updated));
  };

  const addTestimonial = async (testimonial: Omit<Testimonial, "id">) => {
    const newTestimonial = { ...testimonial, id: `testimonial-${Date.now()}` };
    const updated = { ...config, testimonials: [newTestimonial, ...config.testimonials] };
    setConfig(updated);
    localStorage.setItem('siteConfig', JSON.stringify(updated));
  };

  const deleteTestimonial = async (id: string) => {
    const updated = { ...config, testimonials: config.testimonials.filter(t => t.id !== id) };
    setConfig(updated);
    localStorage.setItem('siteConfig', JSON.stringify(updated));
  };

  return (
    <SiteConfigContext.Provider value={{
      config,
      loading,
      updateConfig,
      addTeacher,
      updateTeacher,
      deleteTeacher,
      addPhoto,
      deletePhoto,
      addInquiry,
      updateInquiryStatus,
      deleteInquiry,
      addAdmissionInquiry,
      updateAdmissionInquiryStatus,
      deleteAdmissionInquiry,
      addNews,
      updateNews,
      deleteNews,
      addTestimonial,
      deleteTestimonial,
      updatePrincipal,
      refreshData,
      isAdmin,
      setIsAdmin
    }}>
      {children}
    </SiteConfigContext.Provider>
  );
}

export function useSiteConfig() {
  const context = useContext(SiteConfigContext);
  if (context === undefined) {
    throw new Error("useSiteConfig must be used within a SiteConfigProvider");
  }
  return context;
}
