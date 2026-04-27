"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import {
  getSiteConfig,
  updateSiteConfig,
  getTeachers,
  addTeacher as addTeacherFB,
  updateTeacher as updateTeacherFB,
  deleteTeacher as deleteTeacherFB,
  getPrincipal,
  updatePrincipal as updatePrincipalFB,
  getPhotos,
  addPhoto as addPhotoFB,
  deletePhoto as deletePhotoFB,
  getNews,
  addNews as addNewsFB,
  updateNews as updateNewsFB,
  deleteNews as deleteNewsFB,
  getTestimonials,
  addTestimonial as addTestimonialFB,
  deleteTestimonial as deleteTestimonialFB,
  getInquiries,
  addInquiry as addInquiryFB,
  updateInquiryStatus as updateInquiryStatusFB,
  deleteInquiry as deleteInquiryFB,
  getAdmissionInquiries,
  addAdmissionInquiry as addAdmissionInquiryFB,
  updateAdmissionInquiryStatus as updateAdmissionInquiryStatusFB,
  deleteAdmissionInquiry as deleteAdmissionInquiryFB
} from "../lib/supabase";

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

  // Initialize default data if Firebase is empty
  const initializeDefaultData = async () => {
    try {
      const [teachers, news, testimonials] = await Promise.all([
        getTeachers(),
        getNews(),
        getTestimonials()
      ]);

      // Add sample teachers if empty
      if (teachers.length === 0) {
        for (const teacher of sampleTeachers) {
          await addTeacherFB(teacher);
        }
        console.log("Sample teachers added");
      }

      // Add sample news if empty
      if (news.length === 0) {
        for (const item of sampleNews) {
          await addNewsFB({ ...item, date: new Date().toISOString().split('T')[0] });
        }
        console.log("Sample news added");
      }

      // Add sample testimonials if empty
      if (testimonials.length === 0) {
        for (const testimonial of sampleTestimonials) {
          await addTestimonialFB(testimonial);
        }
        console.log("Sample testimonials added");
      }
    } catch (error) {
      console.error("Error initializing default data:", error);
    }
  };

  // Load all data from Firebase
  const refreshData = async () => {
    setLoading(true);
    try {
      // Initialize default data if needed
      await initializeDefaultData();

      // Get site config
      const siteConfig = await getSiteConfig();
      
      // Get all collections in parallel
      const [teachers, principal, photos, news, testimonials, inquiries, admissionInquiries] = await Promise.all([
        getTeachers(),
        getPrincipal(),
        getPhotos(),
        getNews(),
        getTestimonials(),
        getInquiries(),
        getAdmissionInquiries()
      ]);

      setConfig(prev => ({
        ...prev,
        ...(siteConfig || {}),
        teachers: teachers.length > 0 ? teachers as Teacher[] : prev.teachers,
        principal: (principal as Principal) || prev.principal,
        photos: photos.length > 0 ? photos as Photo[] : prev.photos,
        news: news.length > 0 ? news as NewsArticle[] : prev.news,
        testimonials: testimonials.length > 0 ? testimonials as Testimonial[] : prev.testimonials,
        inquiries: inquiries.length > 0 ? inquiries.map((i: any) => ({
          ...i,
          date: i.createdAt?.toDate?.() ? i.createdAt.toDate().toISOString().split('T')[0] : new Date().toISOString().split('T')[0]
        })) : prev.inquiries,
        admissionInquiries: admissionInquiries.length > 0 ? admissionInquiries.map((i: any) => ({
          ...i,
          date: i.createdAt?.toDate?.() ? i.createdAt.toDate().toISOString().split('T')[0] : new Date().toISOString().split('T')[0]
        })) : prev.admissionInquiries
      }));
    } catch (error) {
      console.error("Error loading data from Firebase:", error);
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
    await updateSiteConfig(newConfig);
  };

  const addTeacher = async (teacher: Omit<Teacher, "id">) => {
    const result = await addTeacherFB(teacher);
    if (result) {
      await refreshData();
    }
  };

  const updateTeacher = async (id: string, teacher: Partial<Teacher>) => {
    await updateTeacherFB(id, teacher);
    await refreshData();
  };

  const deleteTeacher = async (id: string) => {
    await deleteTeacherFB(id);
    await refreshData();
  };

  const updatePrincipal = async (principal: Principal) => {
    await updatePrincipalFB(principal);
    await refreshData();
  };

  const addPhoto = async (photo: Omit<Photo, "id">) => {
    await addPhotoFB(photo);
    await refreshData();
  };

  const deletePhoto = async (id: string) => {
    await deletePhotoFB(id);
    await refreshData();
  };

  const addInquiry = async (inquiry: Omit<Inquiry, "id" | "date" | "status">) => {
    await addInquiryFB(inquiry);
    await refreshData();
  };

  const updateInquiryStatus = async (id: string, status: Inquiry["status"]) => {
    await updateInquiryStatusFB(id, status);
    await refreshData();
  };

  const deleteInquiry = async (id: string) => {
    await deleteInquiryFB(id);
    await refreshData();
  };

  const addAdmissionInquiry = async (inquiry: Omit<AdmissionInquiry, "id" | "date" | "status">) => {
    await addAdmissionInquiryFB(inquiry);
    await refreshData();
  };

  const updateAdmissionInquiryStatus = async (id: string, status: AdmissionInquiry["status"]) => {
    await updateAdmissionInquiryStatusFB(id, status);
    await refreshData();
  };

  const deleteAdmissionInquiry = async (id: string) => {
    await deleteAdmissionInquiryFB(id);
    await refreshData();
  };

  const addNews = async (news: Omit<NewsArticle, "id" | "date">) => {
    await addNewsFB(news);
    await refreshData();
  };

  const updateNews = async (id: string, news: Partial<NewsArticle>) => {
    await updateNewsFB(id, news);
    await refreshData();
  };

  const deleteNews = async (id: string) => {
    await deleteNewsFB(id);
    await refreshData();
  };

  const addTestimonial = async (testimonial: Omit<Testimonial, "id">) => {
    await addTestimonialFB(testimonial);
    await refreshData();
  };

  const deleteTestimonial = async (id: string) => {
    await deleteTestimonialFB(id);
    await refreshData();
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
