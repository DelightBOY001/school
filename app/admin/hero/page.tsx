"use client";

import { useState, useEffect } from "react";
import { useSiteConfig } from "../../context/SiteConfigContext";
import { Save, Video, CheckCircle } from "lucide-react";

export default function HeroPage() {
  const { config, updateConfig, loading } = useSiteConfig();
  const [form, setForm] = useState({
    heroVideoUrl: "",
    heroVideoPoster: "",
    heroBadge: "",
    heroTitle: "",
    heroSubtitle: "",
  });
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setForm({
      heroVideoUrl: config.heroVideoUrl || "",
      heroVideoPoster: config.heroVideoPoster || "",
      heroBadge: config.heroBadge || "",
      heroTitle: config.heroTitle || "",
      heroSubtitle: config.heroSubtitle || "",
    });
  }, [config]);

  const handleSave = async () => {
    setSaving(true);
    await updateConfig(form);
    setSaving(false);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  if (loading) return <div className="text-center py-12 text-gray-500">Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Video className="w-6 h-6 text-school-blue" />
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Hero Section</h2>
          <p className="text-gray-500">Customize the hero video and banner text.</p>
        </div>
      </div>

      {success && (
        <div className="flex items-center gap-2 text-green-600 bg-green-50 p-4 rounded-lg">
          <CheckCircle className="w-5 h-5" />
          Changes saved successfully!
        </div>
      )}

      <div className="bg-gray-100 rounded-xl p-4">
        <label className="block text-sm font-medium text-gray-700 mb-3">Video Preview</label>
        <div className="aspect-video rounded-lg overflow-hidden bg-black">
          <video src={form.heroVideoUrl} poster={form.heroVideoPoster} className="w-full h-full object-cover" controls muted />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">Video URL</label>
          <input type="url" value={form.heroVideoUrl} onChange={(e) => setForm({ ...form, heroVideoUrl: e.target.value })} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-school-blue outline-none" />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">Video Poster</label>
          <input type="url" value={form.heroVideoPoster} onChange={(e) => setForm({ ...form, heroVideoPoster: e.target.value })} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-school-blue outline-none" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Badge Text</label>
          <input type="text" value={form.heroBadge} onChange={(e) => setForm({ ...form, heroBadge: e.target.value })} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-school-blue outline-none" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Hero Title</label>
          <input type="text" value={form.heroTitle} onChange={(e) => setForm({ ...form, heroTitle: e.target.value })} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-school-blue outline-none" />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">Subtitle</label>
          <input type="text" value={form.heroSubtitle} onChange={(e) => setForm({ ...form, heroSubtitle: e.target.value })} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-school-blue outline-none" />
        </div>
      </div>

      <div className="pt-6 border-t border-gray-200">
        <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 px-6 py-3 bg-school-blue text-white font-semibold rounded-lg hover:bg-blue-800 transition-colors disabled:opacity-50">
          <Save className="w-5 h-5" />
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
}
