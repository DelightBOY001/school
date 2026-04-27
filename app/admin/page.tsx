"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSiteConfig } from "../context/SiteConfigContext";
import { supabase } from "../lib/supabase";
import { 
  Video, 
  Save, 
  Eye, 
  Lock, 
  ArrowLeft, 
  CheckCircle, 
  AlertCircle,
  Image,
  Type,
  LogOut,
  Users,
  GraduationCap,
  Mail,
  Phone,
  MapPin,
  Plus,
  Trash2,
  Edit2,
  Newspaper,
  Quote,
  Inbox,
  X,
  Check,
  Clock,
  Building2,
  Award,
  BookOpen,
  Camera,
  MessageSquare,
  School,
  UserPlus
} from "lucide-react";
import Link from "next/link";

const TABS = [
  { id: "school", label: "School Info", icon: Building2 },
  { id: "hero", label: "Hero Section", icon: Video },
  { id: "about", label: "About", icon: BookOpen },
  { id: "principal", label: "Principal", icon: GraduationCap },
  { id: "teachers", label: "Teachers", icon: Users },
  { id: "photos", label: "Photos", icon: Camera },
  { id: "news", label: "News", icon: Newspaper },
  { id: "testimonials", label: "Testimonials", icon: Quote },
  { id: "inquiries", label: "Inquiries", icon: Inbox },
  { id: "admissions", label: "Admission Inquiries", icon: School },
];

export default function AdminPanel() {
  const { 
    config, 
    loading,
    updateConfig,
    addTeacher,
    updateTeacher,
    deleteTeacher,
    addPhoto,
    deletePhoto,
    updateInquiryStatus,
    deleteInquiry,
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
  } = useSiteConfig();
  
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [activeTab, setActiveTab] = useState("school");
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  // Modals
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [editingItem, setEditingItem] = useState<any>(null);

  // Form states
  const [schoolForm, setSchoolForm] = useState({
    schoolName: config.schoolName,
    tagline: config.tagline,
    address: config.address,
    phone: config.phone,
    email: config.email,
  });

  const [heroForm, setHeroForm] = useState({
    heroVideoUrl: config.heroVideoUrl,
    heroVideoPoster: config.heroVideoPoster,
    heroBadge: config.heroBadge,
    heroTitle: config.heroTitle,
    heroSubtitle: config.heroSubtitle,
  });

  const [aboutForm, setAboutForm] = useState({
    aboutText: config.aboutText,
    aboutImage: config.aboutImage,
    mission: config.mission,
    vision: config.vision,
    values: config.values,
    studentCount: config.studentCount,
    coursesCount: config.coursesCount,
    successRate: config.successRate,
    yearsExperience: config.yearsExperience,
  });

  const [principalForm, setPrincipalForm] = useState(config.principal);

  // Update forms when config changes
  useEffect(() => {
    setSchoolForm({
      schoolName: config.schoolName,
      tagline: config.tagline,
      address: config.address,
      phone: config.phone,
      email: config.email,
    });
    setHeroForm({
      heroVideoUrl: config.heroVideoUrl,
      heroVideoPoster: config.heroVideoPoster,
      heroBadge: config.heroBadge,
      heroTitle: config.heroTitle,
      heroSubtitle: config.heroSubtitle,
    });
    setAboutForm({
      aboutText: config.aboutText,
      aboutImage: config.aboutImage,
      mission: config.mission,
      vision: config.vision,
      values: config.values,
      studentCount: config.studentCount,
      coursesCount: config.coursesCount,
      successRate: config.successRate,
      yearsExperience: config.yearsExperience,
    });
    setPrincipalForm(config.principal);
  }, [config]);

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

  const handleSaveSchool = async () => {
    setIsSaving(true);
    await updateConfig(schoolForm);
    setIsSaving(false);
    showSuccess();
  };

  const handleSaveHero = async () => {
    setIsSaving(true);
    await updateConfig(heroForm);
    setIsSaving(false);
    showSuccess();
  };

  const handleSaveAbout = async () => {
    setIsSaving(true);
    await updateConfig(aboutForm);
    setIsSaving(false);
    showSuccess();
  };

  const handleSavePrincipal = async () => {
    setIsSaving(true);
    await updatePrincipal(principalForm);
    setIsSaving(false);
    showSuccess();
  };

  const showSuccess = () => {
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const openModal = (type: string, item: any = null) => {
    setModalType(type);
    setEditingItem(item);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingItem(null);
  };

  const handleDelete = async (type: string, id: string) => {
    if (!confirm("Are you sure you want to delete this item?")) return;
    
    switch (type) {
      case "teacher":
        await deleteTeacher(id);
        break;
      case "photo":
        await deletePhoto(id);
        break;
      case "news":
        await deleteNews(id);
        break;
      case "testimonial":
        await deleteTestimonial(id);
        break;
      case "inquiry":
        await deleteInquiry(id);
        break;
      case "admissionInquiry":
        await deleteAdmissionInquiry(id);
        break;
    }
    await refreshData();
  };

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-school-blue to-school-darkBlue flex items-center justify-center p-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
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
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-school-blue focus:border-transparent outline-none transition-all" placeholder="Enter admin password" />
            </div>
            {loginError && <div className="flex items-center gap-2 text-red-500 text-sm bg-red-50 p-3 rounded-lg"><AlertCircle className="w-4 h-4" />{loginError}</div>}
            <button type="submit" className="w-full bg-school-blue text-white font-semibold py-3 rounded-lg hover:bg-blue-800 transition-colors">Login</button>
          </form>
          <div className="mt-6 text-center"><Link href="/" className="text-school-blue hover:underline text-sm">← Back to Website</Link></div>
          <p className="text-xs text-gray-400 text-center mt-6">Demo password: admin123</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/" className="flex items-center gap-2 text-gray-600 hover:text-school-blue transition-colors"><ArrowLeft className="w-5 h-5" />Back to Site</Link>
              <div className="h-6 w-px bg-gray-300" />
              <h1 className="text-xl font-bold text-gray-900">Admin Dashboard</h1>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={() => window.open("/", "_blank")} className="flex items-center gap-2 px-4 py-2 text-school-blue hover:bg-blue-50 rounded-lg transition-colors"><Eye className="w-4 h-4" />Preview</button>
              <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"><LogOut className="w-4 h-4" />Logout</button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <nav className="space-y-1">
              {TABS.map((tab) => (
                <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${activeTab === tab.id ? "bg-school-blue text-white" : "bg-white text-gray-700 hover:bg-gray-100"}`}>
                  <tab.icon className="w-5 h-5" />{tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="lg:col-span-3">
            <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl shadow-sm p-6">
              {saveSuccess && <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-2 text-green-600 bg-green-50 p-4 rounded-lg mb-6"><CheckCircle className="w-5 h-5" />Changes saved successfully!</motion.div>}

              {/* SCHOOL INFO TAB */}
              {activeTab === "school" && (
                <div className="space-y-6">
                  <div><h2 className="text-2xl font-bold text-gray-900 mb-2">School Information</h2><p className="text-gray-500">Update your school name, contact details, and branding.</p></div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div><label className="block text-sm font-medium text-gray-700 mb-2">School Name</label><input type="text" value={schoolForm.schoolName} onChange={(e) => setSchoolForm({...schoolForm, schoolName: e.target.value})} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-school-blue outline-none" /></div>
                    <div><label className="block text-sm font-medium text-gray-700 mb-2">Tagline</label><input type="text" value={schoolForm.tagline} onChange={(e) => setSchoolForm({...schoolForm, tagline: e.target.value})} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-school-blue outline-none" /></div>
                    <div className="md:col-span-2"><label className="block text-sm font-medium text-gray-700 mb-2">Address</label><input type="text" value={schoolForm.address} onChange={(e) => setSchoolForm({...schoolForm, address: e.target.value})} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-school-blue outline-none" /></div>
                    <div><label className="block text-sm font-medium text-gray-700 mb-2">Phone</label><input type="text" value={schoolForm.phone} onChange={(e) => setSchoolForm({...schoolForm, phone: e.target.value})} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-school-blue outline-none" /></div>
                    <div><label className="block text-sm font-medium text-gray-700 mb-2">Email</label><input type="email" value={schoolForm.email} onChange={(e) => setSchoolForm({...schoolForm, email: e.target.value})} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-school-blue outline-none" /></div>
                  </div>
                  <div className="pt-6 border-t border-gray-200"><button onClick={handleSaveSchool} className="flex items-center gap-2 px-6 py-3 bg-school-blue text-white font-semibold rounded-lg hover:bg-blue-800 transition-colors"><Save className="w-5 h-5" />Save Changes</button></div>
                </div>
              )}

              {/* HERO TAB */}
              {activeTab === "hero" && (
                <div className="space-y-6">
                  <div><h2 className="text-2xl font-bold text-gray-900 mb-2">Hero Section</h2><p className="text-gray-500">Customize the hero video and banner text.</p></div>
                  <div className="bg-gray-100 rounded-xl p-4"><label className="block text-sm font-medium text-gray-700 mb-3">Video Preview</label><div className="aspect-video rounded-lg overflow-hidden bg-black"><video src={heroForm.heroVideoUrl} poster={heroForm.heroVideoPoster} className="w-full h-full object-cover" controls muted /></div></div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="md:col-span-2"><label className="block text-sm font-medium text-gray-700 mb-2">Video URL</label><input type="url" value={heroForm.heroVideoUrl} onChange={(e) => setHeroForm({...heroForm, heroVideoUrl: e.target.value})} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-school-blue outline-none" /></div>
                    <div className="md:col-span-2"><label className="block text-sm font-medium text-gray-700 mb-2">Video Poster</label><input type="url" value={heroForm.heroVideoPoster} onChange={(e) => setHeroForm({...heroForm, heroVideoPoster: e.target.value})} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-school-blue outline-none" /></div>
                    <div><label className="block text-sm font-medium text-gray-700 mb-2">Badge Text</label><input type="text" value={heroForm.heroBadge} onChange={(e) => setHeroForm({...heroForm, heroBadge: e.target.value})} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-school-blue outline-none" /></div>
                    <div><label className="block text-sm font-medium text-gray-700 mb-2">Hero Title</label><input type="text" value={heroForm.heroTitle} onChange={(e) => setHeroForm({...heroForm, heroTitle: e.target.value})} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-school-blue outline-none" /></div>
                    <div className="md:col-span-2"><label className="block text-sm font-medium text-gray-700 mb-2">Subtitle</label><input type="text" value={heroForm.heroSubtitle} onChange={(e) => setHeroForm({...heroForm, heroSubtitle: e.target.value})} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-school-blue outline-none" /></div>
                  </div>
                  <div className="pt-6 border-t border-gray-200"><button onClick={handleSaveHero} className="flex items-center gap-2 px-6 py-3 bg-school-blue text-white font-semibold rounded-lg hover:bg-blue-800 transition-colors"><Save className="w-5 h-5" />Save Changes</button></div>
                </div>
              )}

              {/* ABOUT TAB */}
              {activeTab === "about" && (
                <div className="space-y-6">
                  <div><h2 className="text-2xl font-bold text-gray-900 mb-2">About Section</h2><p className="text-gray-500">Update about content and statistics.</p></div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="md:col-span-2"><label className="block text-sm font-medium text-gray-700 mb-2">About Text</label><textarea rows={4} value={aboutForm.aboutText} onChange={(e) => setAboutForm({...aboutForm, aboutText: e.target.value})} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-school-blue outline-none resize-none" /></div>
                    <div className="md:col-span-2"><label className="block text-sm font-medium text-gray-700 mb-2">About Image URL</label><input type="url" value={aboutForm.aboutImage} onChange={(e) => setAboutForm({...aboutForm, aboutImage: e.target.value})} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-school-blue outline-none" /></div>
                    <div><label className="block text-sm font-medium text-gray-700 mb-2">Mission</label><textarea rows={2} value={aboutForm.mission} onChange={(e) => setAboutForm({...aboutForm, mission: e.target.value})} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-school-blue outline-none resize-none" /></div>
                    <div><label className="block text-sm font-medium text-gray-700 mb-2">Vision</label><textarea rows={2} value={aboutForm.vision} onChange={(e) => setAboutForm({...aboutForm, vision: e.target.value})} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-school-blue outline-none resize-none" /></div>
                    <div className="md:col-span-2"><label className="block text-sm font-medium text-gray-700 mb-2">Values</label><input type="text" value={aboutForm.values} onChange={(e) => setAboutForm({...aboutForm, values: e.target.value})} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-school-blue outline-none" /></div>
                  </div>
                  <div className="pt-6 border-t border-gray-200"><button onClick={handleSaveAbout} className="flex items-center gap-2 px-6 py-3 bg-school-blue text-white font-semibold rounded-lg hover:bg-blue-800 transition-colors"><Save className="w-5 h-5" />Save Changes</button></div>
                </div>
              )}

              {/* PRINCIPAL TAB */}
              {activeTab === "principal" && (
                <div className="space-y-6">
                  <div><h2 className="text-2xl font-bold text-gray-900 mb-2">Principal Details</h2><p className="text-gray-500">Update principal information and welcome message.</p></div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div><label className="block text-sm font-medium text-gray-700 mb-2">Name</label><input type="text" value={principalForm.name} onChange={(e) => setPrincipalForm({...principalForm, name: e.target.value})} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-school-blue outline-none" /></div>
                    <div><label className="block text-sm font-medium text-gray-700 mb-2">Photo URL</label><input type="url" value={principalForm.photo} onChange={(e) => setPrincipalForm({...principalForm, photo: e.target.value})} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-school-blue outline-none" /></div>
                    {principalForm.photo && <div className="md:col-span-2"><img src={principalForm.photo} alt="Principal" className="w-32 h-32 object-cover rounded-xl" /></div>}
                    <div className="md:col-span-2"><label className="block text-sm font-medium text-gray-700 mb-2">Welcome Message</label><textarea rows={4} value={principalForm.message} onChange={(e) => setPrincipalForm({...principalForm, message: e.target.value})} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-school-blue outline-none resize-none" /></div>
                    <div><label className="block text-sm font-medium text-gray-700 mb-2">Qualification</label><input type="text" value={principalForm.qualification} onChange={(e) => setPrincipalForm({...principalForm, qualification: e.target.value})} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-school-blue outline-none" /></div>
                    <div><label className="block text-sm font-medium text-gray-700 mb-2">Experience</label><input type="text" value={principalForm.experience} onChange={(e) => setPrincipalForm({...principalForm, experience: e.target.value})} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-school-blue outline-none" /></div>
                  </div>
                  <div className="pt-6 border-t border-gray-200"><button onClick={handleSavePrincipal} className="flex items-center gap-2 px-6 py-3 bg-school-blue text-white font-semibold rounded-lg hover:bg-blue-800 transition-colors"><Save className="w-5 h-5" />Save Changes</button></div>
                </div>
              )}

              {/* TEACHERS TAB */}
              {activeTab === "teachers" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between"><div><h2 className="text-2xl font-bold text-gray-900 mb-2">Teachers</h2><p className="text-gray-500">Manage faculty members.</p></div><button onClick={() => openModal("teacher")} className="flex items-center gap-2 px-4 py-2 bg-school-blue text-white rounded-lg hover:bg-blue-800 transition-colors"><Plus className="w-4 h-4" />Add Teacher</button></div>
                  <div className="grid md:grid-cols-2 gap-4">
                    {config.teachers.map((teacher) => (
                      <div key={teacher.id} className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                        <img src={teacher.photo} alt={teacher.name} className="w-16 h-16 rounded-lg object-cover" />
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-gray-900 truncate">{teacher.name}</h3>
                          <p className="text-sm text-gray-500">{teacher.subject}</p>
                          <p className="text-xs text-gray-400">{teacher.qualification}</p>
                        </div>
                        <div className="flex gap-2">
                          <button onClick={() => openModal("teacher", teacher)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"><Edit2 className="w-4 h-4" /></button>
                          <button onClick={() => deleteTeacher(teacher.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg"><Trash2 className="w-4 h-4" /></button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* PHOTOS TAB */}
              {activeTab === "photos" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between"><div><h2 className="text-2xl font-bold text-gray-900 mb-2">Photo Gallery</h2><p className="text-gray-500">Manage gallery photos.</p></div><button onClick={() => openModal("photo")} className="flex items-center gap-2 px-4 py-2 bg-school-blue text-white rounded-lg hover:bg-blue-800 transition-colors"><Plus className="w-4 h-4" />Add Photo</button></div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {config.photos.map((photo) => (
                      <div key={photo.id} className="relative group rounded-xl overflow-hidden">
                        <img src={photo.url} alt={photo.caption} className="w-full h-48 object-cover" />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                          <div className="flex-1"><p className="text-white text-sm font-medium">{photo.caption}</p><p className="text-white/70 text-xs">{photo.category}</p></div>
                          <button onClick={() => deletePhoto(photo.id)} className="p-2 text-white hover:bg-white/20 rounded-lg ml-2"><Trash2 className="w-4 h-4" /></button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* NEWS TAB */}
              {activeTab === "news" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between"><div><h2 className="text-2xl font-bold text-gray-900 mb-2">News & Events</h2><p className="text-gray-500">Manage news articles.</p></div><button onClick={() => openModal("news")} className="flex items-center gap-2 px-4 py-2 bg-school-blue text-white rounded-lg hover:bg-blue-800 transition-colors"><Plus className="w-4 h-4" />Add News</button></div>
                  <div className="space-y-4">
                    {config.news.map((item) => (
                      <div key={item.id} className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                        <img src={item.image} alt={item.title} className="w-24 h-16 rounded-lg object-cover" />
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-gray-900 truncate">{item.title}</h3>
                          <p className="text-sm text-gray-500 truncate">{item.excerpt}</p>
                          <p className="text-xs text-gray-400">{item.date} • {item.category}</p>
                        </div>
                        <div className="flex gap-2">
                          <button onClick={() => openModal("news", item)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"><Edit2 className="w-4 h-4" /></button>
                          <button onClick={() => deleteNews(item.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg"><Trash2 className="w-4 h-4" /></button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TESTIMONIALS TAB */}
              {activeTab === "testimonials" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between"><div><h2 className="text-2xl font-bold text-gray-900 mb-2">Testimonials</h2><p className="text-gray-500">Manage testimonials and reviews.</p></div><button onClick={() => openModal("testimonial")} className="flex items-center gap-2 px-4 py-2 bg-school-blue text-white rounded-lg hover:bg-blue-800 transition-colors"><Plus className="w-4 h-4" />Add Testimonial</button></div>
                  <div className="grid md:grid-cols-2 gap-4">
                    {config.testimonials.map((t) => (
                      <div key={t.id} className="p-4 bg-gray-50 rounded-xl">
                        <div className="flex items-center gap-3 mb-3">
                          <img src={t.photo} alt={t.name} className="w-12 h-12 rounded-full object-cover" />
                          <div><h3 className="font-semibold text-gray-900">{t.name}</h3><p className="text-sm text-gray-500">{t.role}</p></div>
                        </div>
                        <p className="text-sm text-gray-600 mb-3 line-clamp-3">{t.content}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex gap-1">{Array.from({length: t.rating}).map((_, i) => (<span key={i} className="text-school-gold">★</span>))}</div>
                          <button onClick={() => deleteTestimonial(t.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg"><Trash2 className="w-4 h-4" /></button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* INQUIRIES TAB */}
              {activeTab === "inquiries" && (
                <div className="space-y-6">
                  <div><h2 className="text-2xl font-bold text-gray-900 mb-2">General Inquiries</h2><p className="text-gray-500">View and manage contact form submissions.</p></div>
                  <div className="space-y-4">
                    {config.inquiries.length === 0 && <p className="text-gray-500 text-center py-8">No inquiries yet.</p>}
                    {config.inquiries.map((inquiry) => (
                      <div key={inquiry.id} className={`p-4 rounded-xl border-2 ${inquiry.status === "new" ? "border-red-300 bg-red-50" : inquiry.status === "contacted" ? "border-yellow-300 bg-yellow-50" : "border-green-300 bg-green-50"}`}>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="font-semibold text-gray-900">{inquiry.name}</h3>
                              <span className={`px-2 py-1 text-xs rounded-full ${inquiry.status === "new" ? "bg-red-200 text-red-800" : inquiry.status === "contacted" ? "bg-yellow-200 text-yellow-800" : "bg-green-200 text-green-800"}`}>{inquiry.status}</span>
                            </div>
                            <div className="flex gap-4 text-sm text-gray-500 mb-2"><span>{inquiry.email}</span><span>{inquiry.phone}</span><span>{inquiry.date}</span></div>
                            <p className="text-gray-700">{inquiry.message}</p>
                          </div>
                          <div className="flex gap-2 ml-4">
                            {inquiry.status !== "contacted" && <button onClick={() => updateInquiryStatus(inquiry.id, "contacted")} className="p-2 text-yellow-600 hover:bg-yellow-100 rounded-lg" title="Mark as Contacted"><Clock className="w-4 h-4" /></button>}
                            {inquiry.status !== "resolved" && <button onClick={() => updateInquiryStatus(inquiry.id, "resolved")} className="p-2 text-green-600 hover:bg-green-100 rounded-lg" title="Mark as Resolved"><Check className="w-4 h-4" /></button>}
                            <button onClick={() => handleDelete("inquiry", inquiry.id)} className="p-2 text-red-600 hover:bg-red-100 rounded-lg" title="Delete"><Trash2 className="w-4 h-4" /></button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ADMISSION INQUIRIES TAB */}
              {activeTab === "admissions" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">Admission Inquiries</h2>
                      <p className="text-gray-500">View and manage admission applications.</p>
                    </div>
                    <div className="flex gap-2">
                      <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium">
                        {config.admissionInquiries.filter(i => i.status === "new").length} New
                      </span>
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                        {config.admissionInquiries.filter(i => i.status === "admitted").length} Admitted
                      </span>
                    </div>
                  </div>
                  <div className="space-y-4">
                    {config.admissionInquiries.length === 0 && <p className="text-gray-500 text-center py-8">No admission inquiries yet.</p>}
                    {config.admissionInquiries.map((inquiry) => (
                      <div key={inquiry.id} className={`p-5 rounded-xl border-2 ${
                        inquiry.status === "new" ? "border-red-300 bg-red-50" : 
                        inquiry.status === "contacted" ? "border-yellow-300 bg-yellow-50" : 
                        inquiry.status === "scheduled" ? "border-blue-300 bg-blue-50" :
                        inquiry.status === "admitted" ? "border-green-300 bg-green-50" : 
                        "border-gray-300 bg-gray-50"
                      }`}>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-3">
                              <UserPlus className="w-5 h-5 text-school-blue" />
                              <h3 className="font-semibold text-gray-900">{inquiry.studentName}</h3>
                              <span className={`px-2 py-1 text-xs rounded-full ${
                                inquiry.status === "new" ? "bg-red-200 text-red-800" : 
                                inquiry.status === "contacted" ? "bg-yellow-200 text-yellow-800" : 
                                inquiry.status === "scheduled" ? "bg-blue-200 text-blue-800" :
                                inquiry.status === "admitted" ? "bg-green-200 text-green-800" : 
                                "bg-gray-200 text-gray-800"
                              }`}>{inquiry.status}</span>
                            </div>
                            <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                              <div><span className="text-gray-500">Parent:</span> <span className="font-medium">{inquiry.parentName}</span></div>
                              <div><span className="text-gray-500">Grade:</span> <span className="font-medium">{inquiry.gradeApplying}</span></div>
                              <div><span className="text-gray-500">Email:</span> <span className="font-medium">{inquiry.email}</span></div>
                              <div><span className="text-gray-500">Phone:</span> <span className="font-medium">{inquiry.phone}</span></div>
                            </div>
                            <div className="mb-2"><span className="text-gray-500 text-sm">Previous School:</span> <span className="text-sm font-medium">{inquiry.previousSchool}</span></div>
                            <p className="text-gray-700 text-sm bg-white/50 p-2 rounded">{inquiry.message}</p>
                            <div className="text-xs text-gray-400 mt-2">Submitted: {inquiry.date}</div>
                          </div>
                          <div className="flex flex-col gap-2 ml-4">
                            {inquiry.status === "new" && <button onClick={() => updateAdmissionInquiryStatus(inquiry.id, "contacted")} className="p-2 text-yellow-600 hover:bg-yellow-100 rounded-lg" title="Mark as Contacted"><Clock className="w-4 h-4" /></button>}
                            {inquiry.status === "contacted" && <button onClick={() => updateAdmissionInquiryStatus(inquiry.id, "scheduled")} className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg" title="Mark as Interview Scheduled"><Check className="w-4 h-4" /></button>}
                            {inquiry.status === "scheduled" && <button onClick={() => updateAdmissionInquiryStatus(inquiry.id, "admitted")} className="p-2 text-green-600 hover:bg-green-100 rounded-lg" title="Mark as Admitted"><Award className="w-4 h-4" /></button>}
                            <button onClick={() => handleDelete("admissionInquiry", inquiry.id)} className="p-2 text-red-600 hover:bg-red-100 rounded-lg" title="Delete"><Trash2 className="w-4 h-4" /></button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>

      {/* MODALS */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} className="bg-white rounded-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">
                  {modalType === "teacher" ? (editingItem ? "Edit Teacher" : "Add Teacher") :
                   modalType === "photo" ? "Add Photo" :
                   modalType === "news" ? (editingItem ? "Edit News" : "Add News") :
                   modalType === "testimonial" ? "Add Testimonial" : "Add Item"}
                </h2>
                <button onClick={closeModal} className="p-2 hover:bg-gray-100 rounded-lg"><X className="w-5 h-5" /></button>
              </div>
              <ModalContent type={modalType} item={editingItem} onClose={closeModal} onSave={(data) => {
                if (modalType === "teacher") editingItem ? updateTeacher(editingItem.id, data) : addTeacher(data);
                if (modalType === "photo") addPhoto(data);
                if (modalType === "news") editingItem ? updateNews(editingItem.id, data) : addNews(data);
                if (modalType === "testimonial") addTestimonial(data);
                closeModal();
              }} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Modal Content Component
function ModalContent({ type, item, onClose, onSave }: { type: string; item: any; onClose: () => void; onSave: (data: any) => void }) {
  const [formData, setFormData] = useState(item || {});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {type === "teacher" && (
        <>
          <div><label className="block text-sm font-medium text-gray-700 mb-2">Name</label><input required type="text" value={formData.name || ""} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-school-blue outline-none" /></div>
          <div><label className="block text-sm font-medium text-gray-700 mb-2">Subject</label><input required type="text" value={formData.subject || ""} onChange={(e) => setFormData({...formData, subject: e.target.value})} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-school-blue outline-none" /></div>
          <div><label className="block text-sm font-medium text-gray-700 mb-2">Qualification</label><input required type="text" value={formData.qualification || ""} onChange={(e) => setFormData({...formData, qualification: e.target.value})} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-school-blue outline-none" /></div>
          <div><label className="block text-sm font-medium text-gray-700 mb-2">Experience</label><input required type="text" value={formData.experience || ""} onChange={(e) => setFormData({...formData, experience: e.target.value})} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-school-blue outline-none" /></div>
          <div><label className="block text-sm font-medium text-gray-700 mb-2">Photo URL</label><input required type="url" value={formData.photo || ""} onChange={(e) => setFormData({...formData, photo: e.target.value})} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-school-blue outline-none" /></div>
          <div><label className="block text-sm font-medium text-gray-700 mb-2">Bio</label><textarea rows={3} value={formData.bio || ""} onChange={(e) => setFormData({...formData, bio: e.target.value})} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-school-blue outline-none resize-none" /></div>
        </>
      )}
      {type === "photo" && (
        <>
          <div><label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label><input required type="url" value={formData.url || ""} onChange={(e) => setFormData({...formData, url: e.target.value})} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-school-blue outline-none" /></div>
          <div><label className="block text-sm font-medium text-gray-700 mb-2">Caption</label><input required type="text" value={formData.caption || ""} onChange={(e) => setFormData({...formData, caption: e.target.value})} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-school-blue outline-none" /></div>
          <div><label className="block text-sm font-medium text-gray-700 mb-2">Category</label><select value={formData.category || "facilities"} onChange={(e) => setFormData({...formData, category: e.target.value})} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-school-blue outline-none"><option value="facilities">Facilities</option><option value="events">Events</option><option value="activities">Activities</option></select></div>
        </>
      )}
      {type === "news" && (
        <>
          <div><label className="block text-sm font-medium text-gray-700 mb-2">Title</label><input required type="text" value={formData.title || ""} onChange={(e) => setFormData({...formData, title: e.target.value})} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-school-blue outline-none" /></div>
          <div><label className="block text-sm font-medium text-gray-700 mb-2">Excerpt</label><input required type="text" value={formData.excerpt || ""} onChange={(e) => setFormData({...formData, excerpt: e.target.value})} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-school-blue outline-none" /></div>
          <div><label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label><input required type="url" value={formData.image || ""} onChange={(e) => setFormData({...formData, image: e.target.value})} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-school-blue outline-none" /></div>
          <div><label className="block text-sm font-medium text-gray-700 mb-2">Category</label><select value={formData.category || "Academic"} onChange={(e) => setFormData({...formData, category: e.target.value})} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-school-blue outline-none"><option value="Academic">Academic</option><option value="Sports">Sports</option><option value="Events">Events</option><option value="Facilities">Facilities</option></select></div>
        </>
      )}
      {type === "testimonial" && (
        <>
          <div><label className="block text-sm font-medium text-gray-700 mb-2">Name</label><input required type="text" value={formData.name || ""} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-school-blue outline-none" /></div>
          <div><label className="block text-sm font-medium text-gray-700 mb-2">Role</label><input required type="text" value={formData.role || ""} onChange={(e) => setFormData({...formData, role: e.target.value})} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-school-blue outline-none" /></div>
          <div><label className="block text-sm font-medium text-gray-700 mb-2">Photo URL</label><input required type="url" value={formData.photo || ""} onChange={(e) => setFormData({...formData, photo: e.target.value})} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-school-blue outline-none" /></div>
          <div><label className="block text-sm font-medium text-gray-700 mb-2">Content</label><textarea required rows={4} value={formData.content || ""} onChange={(e) => setFormData({...formData, content: e.target.value})} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-school-blue outline-none resize-none" /></div>
          <div><label className="block text-sm font-medium text-gray-700 mb-2">Rating</label><select value={formData.rating || 5} onChange={(e) => setFormData({...formData, rating: parseInt(e.target.value)})} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-school-blue outline-none"><option value="5">5 Stars</option><option value="4">4 Stars</option><option value="3">3 Stars</option></select></div>
        </>
      )}
      <div className="flex gap-3 pt-4">
        <button type="button" onClick={onClose} className="flex-1 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">Cancel</button>
        <button type="submit" className="flex-1 px-4 py-3 bg-school-blue text-white rounded-lg hover:bg-blue-800 transition-colors">Save</button>
      </div>
    </form>
  );
}
