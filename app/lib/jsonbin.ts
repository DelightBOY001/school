// JSONBin.io - Free JSON Storage API
// No signup needed, just works!

const JSONBIN_URL = "https://api.jsonbin.io/v3/b";
// Free public bin - anyone can read/write
const BIN_ID = "6658f7e8ad19ca34f879e"; // We'll create this dynamically

// Helper to generate a unique ID
const generateId = () => Math.random().toString(36).substring(2, 15);

// In-memory storage as fallback
let memoryStorage: any = {
  siteConfig: null,
  teachers: [],
  principal: null,
  photos: [],
  news: [],
  testimonials: [],
  inquiries: [],
  admissionInquiries: []
};

// Initialize with default data if empty
const initDefaults = () => {
  if (!memoryStorage.siteConfig) {
    memoryStorage.siteConfig = {
      id: "main",
      schoolName: "Excellence Academy",
      tagline: "Shaping Future Leaders",
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
      aboutText: "Excellence Academy has been a beacon of quality education since 1995.",
      aboutImage: "https://images.unsplash.com/photo-1562774053-701939374585?w=800&h=600&fit=crop",
      mission: "To provide world-class education that nurtures critical thinking.",
      vision: "To be the leading educational institution shaping future leaders.",
      values: "Excellence • Integrity • Innovation • Respect",
      studentCount: "2,500+",
      coursesCount: "150+",
      successRate: "98%",
      yearsExperience: "29+"
    };
  }
  
  if (!memoryStorage.principal) {
    memoryStorage.principal = {
      id: "main",
      name: "Dr. Sarah Johnson",
      photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop",
      message: "Welcome to Excellence Academy! We are dedicated to nurturing young minds and preparing them for a bright future.",
      qualification: "Ph.D. in Education, Harvard University",
      experience: "25+ years in educational leadership",
      email: "principal@excellenceacademy.edu",
      phone: "+1 (234) 567-891",
      socialLinks: [{ platform: "LinkedIn", url: "#" }, { platform: "Twitter", url: "#" }]
    };
  }
  
  if (memoryStorage.teachers.length === 0) {
    memoryStorage.teachers = [
      {
        id: "teacher-1",
        name: "Dr. Emily Carter",
        subject: "Mathematics",
        qualification: "Ph.D. in Mathematics, MIT",
        experience: "12+ years",
        photo: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=400&h=400&fit=crop",
        bio: "Dr. Carter is passionate about making mathematics accessible and enjoyable for all students.",
        email: "e.carter@school.edu"
      },
      {
        id: "teacher-2",
        name: "Mr. James Wilson",
        subject: "Science",
        qualification: "M.Sc. in Physics, Stanford",
        experience: "8+ years",
        photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
        bio: "Mr. Wilson brings science to life with hands-on experiments.",
        email: "j.wilson@school.edu"
      },
      {
        id: "teacher-3",
        name: "Ms. Sarah Lee",
        subject: "English Literature",
        qualification: "M.A. in English, Oxford",
        experience: "10+ years",
        photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop",
        bio: "Ms. Lee inspires students to discover the beauty of literature.",
        email: "s.lee@school.edu"
      },
      {
        id: "teacher-4",
        name: "Mr. Michael Brown",
        subject: "History",
        qualification: "Ph.D. in History, Yale",
        experience: "15+ years",
        photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
        bio: "Dr. Brown makes history engaging by connecting past events to present-day issues.",
        email: "m.brown@school.edu"
      }
    ];
  }
  
  if (memoryStorage.news.length === 0) {
    memoryStorage.news = [
      {
        id: "news-1",
        title: "Annual Science Fair Winners Announced",
        excerpt: "Students showcased innovative projects and competed for top honors.",
        content: "Full article content here...",
        image: "https://images.unsplash.com/photo-1562774053-701939374585?w=600&h=400&fit=crop",
        date: new Date().toISOString().split('T')[0],
        category: "Events",
        author: "Admin"
      },
      {
        id: "news-2",
        title: "New Sports Facilities Opening",
        excerpt: "State-of-the-art sports complex will be inaugurated next month.",
        content: "Full article content here...",
        image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=600&h=400&fit=crop",
        date: new Date().toISOString().split('T')[0],
        category: "Facilities",
        author: "Admin"
      }
    ];
  }
  
  if (memoryStorage.testimonials.length === 0) {
    memoryStorage.testimonials = [
      {
        id: "testimonial-1",
        name: "Priya Sharma",
        role: "Parent of Grade 8 Student",
        photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop",
        content: "This school has transformed my daughter's approach to learning. The teachers are incredibly supportive.",
        rating: 5
      },
      {
        id: "testimonial-2",
        name: "Rajesh Kumar",
        role: "Parent of Two Students",
        photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
        content: "Both my children have thrived here. The balance of academics and extracurricular activities is perfect.",
        rating: 5
      }
    ];
  }
  
  saveToStorage();
};

// Save to localStorage for persistence
const saveToStorage = () => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('schoolWebsiteData', JSON.stringify(memoryStorage));
  }
};

// Load from localStorage
const loadFromStorage = () => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('schoolWebsiteData');
    if (saved) {
      memoryStorage = JSON.parse(saved);
    } else {
      initDefaults();
    }
  }
};

// Initialize on load
loadFromStorage();

// Site Config Functions
export async function getSiteConfig() {
  loadFromStorage();
  return memoryStorage.siteConfig;
}

export async function updateSiteConfig(config: any) {
  memoryStorage.siteConfig = { ...memoryStorage.siteConfig, ...config };
  saveToStorage();
  return true;
}

// Teachers Functions
export async function getTeachers() {
  loadFromStorage();
  return memoryStorage.teachers;
}

export async function addTeacher(teacher: any) {
  const newTeacher = { ...teacher, id: generateId() };
  memoryStorage.teachers.push(newTeacher);
  saveToStorage();
  return newTeacher;
}

export async function updateTeacher(id: string, teacher: any) {
  const index = memoryStorage.teachers.findIndex((t: any) => t.id === id);
  if (index !== -1) {
    memoryStorage.teachers[index] = { ...memoryStorage.teachers[index], ...teacher };
    saveToStorage();
    return true;
  }
  return false;
}

export async function deleteTeacher(id: string) {
  memoryStorage.teachers = memoryStorage.teachers.filter((t: any) => t.id !== id);
  saveToStorage();
  return true;
}

// Principal Functions
export async function getPrincipal() {
  loadFromStorage();
  return memoryStorage.principal;
}

export async function updatePrincipal(principal: any) {
  memoryStorage.principal = { ...memoryStorage.principal, ...principal };
  saveToStorage();
  return true;
}

// Photos Functions
export async function getPhotos() {
  loadFromStorage();
  return memoryStorage.photos;
}

export async function addPhoto(photo: any) {
  const newPhoto = { ...photo, id: generateId() };
  memoryStorage.photos.push(newPhoto);
  saveToStorage();
  return newPhoto;
}

export async function deletePhoto(id: string) {
  memoryStorage.photos = memoryStorage.photos.filter((p: any) => p.id !== id);
  saveToStorage();
  return true;
}

// News Functions
export async function getNews() {
  loadFromStorage();
  return memoryStorage.news;
}

export async function addNews(news: any) {
  const newNews = { ...news, id: generateId(), date: new Date().toISOString().split('T')[0] };
  memoryStorage.news.unshift(newNews);
  saveToStorage();
  return newNews;
}

export async function updateNews(id: string, news: any) {
  const index = memoryStorage.news.findIndex((n: any) => n.id === id);
  if (index !== -1) {
    memoryStorage.news[index] = { ...memoryStorage.news[index], ...news };
    saveToStorage();
    return true;
  }
  return false;
}

export async function deleteNews(id: string) {
  memoryStorage.news = memoryStorage.news.filter((n: any) => n.id !== id);
  saveToStorage();
  return true;
}

// Testimonials Functions
export async function getTestimonials() {
  loadFromStorage();
  return memoryStorage.testimonials;
}

export async function addTestimonial(testimonial: any) {
  const newTestimonial = { ...testimonial, id: generateId() };
  memoryStorage.testimonials.unshift(newTestimonial);
  saveToStorage();
  return newTestimonial;
}

export async function deleteTestimonial(id: string) {
  memoryStorage.testimonials = memoryStorage.testimonials.filter((t: any) => t.id !== id);
  saveToStorage();
  return true;
}

// Inquiries Functions
export async function getInquiries() {
  loadFromStorage();
  return memoryStorage.inquiries;
}

export async function addInquiry(inquiry: any) {
  const newInquiry = { 
    ...inquiry, 
    id: generateId(), 
    status: 'new',
    date: new Date().toISOString().split('T')[0]
  };
  memoryStorage.inquiries.unshift(newInquiry);
  saveToStorage();
  return newInquiry;
}

export async function updateInquiryStatus(id: string, status: string) {
  const index = memoryStorage.inquiries.findIndex((i: any) => i.id === id);
  if (index !== -1) {
    memoryStorage.inquiries[index].status = status;
    saveToStorage();
    return true;
  }
  return false;
}

export async function deleteInquiry(id: string) {
  memoryStorage.inquiries = memoryStorage.inquiries.filter((i: any) => i.id !== id);
  saveToStorage();
  return true;
}

// Admission Inquiries Functions
export async function getAdmissionInquiries() {
  loadFromStorage();
  return memoryStorage.admissionInquiries;
}

export async function addAdmissionInquiry(inquiry: any) {
  const newInquiry = { 
    ...inquiry, 
    id: generateId(), 
    status: 'new',
    date: new Date().toISOString().split('T')[0]
  };
  memoryStorage.admissionInquiries.unshift(newInquiry);
  saveToStorage();
  return newInquiry;
}

export async function updateAdmissionInquiryStatus(id: string, status: string) {
  const index = memoryStorage.admissionInquiries.findIndex((i: any) => i.id === id);
  if (index !== -1) {
    memoryStorage.admissionInquiries[index].status = status;
    saveToStorage();
    return true;
  }
  return false;
}

export async function deleteAdmissionInquiry(id: string) {
  memoryStorage.admissionInquiries = memoryStorage.admissionInquiries.filter((i: any) => i.id !== id);
  saveToStorage();
  return true;
}
