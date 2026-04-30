"use client";

import { useState, useEffect } from "react";
import { useSiteConfig } from "../../context/SiteConfigContext";
import { Save, BookOpen, CheckCircle } from "lucide-react";

export default function AboutPage() {
  const { config, updateConfig, loading } = useSiteConfig();
  const [form, setForm] = useState({
    aboutText: "",
    aboutImage: "",
    mission: "",
    vision: "",
    values: "",
    studentCount: "",
    coursesCount: "",
    successRate: "",
    yearsExperience: "",
  });
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setForm({
      aboutText: config.aboutText || "",
      aboutImage: config.aboutImage || "",
      mission: config.mission || "",
      vision: config.vision || "",
      values: config.values || "",
      studentCount: config.studentCount || "",
      coursesCount: config.coursesCount || "",
      successRate: config.successRate || "",
      yearsExperience: config.yearsExperience || "",
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
        <BookOpen className="w-6 h-6 text-school-blue" />
        <div>
          <h2 className="text-2xl font-bold text-gray-900">About Section</h2>
          <p className="text-gray-500">Update about content and statistics.</p>
        </div>
      </div>

      {success && (
        <div className="flex items-center gap-2 text-green-600 bg-green-50 p-4 rounded-lg">
          <CheckCircle className="w-5 h-5" />
          Changes saved successfully!
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">About Text</label>
          <textarea rows={4} value={form.aboutText} onChange={(e) => setForm({ ...form, aboutText: e.target.value })} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-school-blue outline-none resize-none" />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">About Image URL</label>
          <input type="url" value={form.aboutImage} onChange={(e) => setForm({ ...form, aboutImage: e.target.value })} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-school-blue outline-none" />
        </div>
        {form.aboutImage && (
          <div className="md:col-span-2">
            <img src={form.aboutImage} alt="About" className="h-32 object-cover rounded-lg" />
          </div>
        )}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Mission</label>
          <textarea rows={2} value={form.mission} onChange={(e) => setForm({ ...form, mission: e.target.value })} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-school-blue outline-none resize-none" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Vision</label>
          <textarea rows={2} value={form.vision} onChange={(e) => setForm({ ...form, vision: e.target.value })} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-school-blue outline-none resize-none" />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">Values</label>
          <input type="text" value={form.values} onChange={(e) => setForm({ ...form, values: e.target.value })} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-school-blue outline-none" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Student Count</label>
          <input type="text" value={form.studentCount} onChange={(e) => setForm({ ...form, studentCount: e.target.value })} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-school-blue outline-none" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Courses Count</label>
          <input type="text" value={form.coursesCount} onChange={(e) => setForm({ ...form, coursesCount: e.target.value })} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-school-blue outline-none" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Success Rate</label>
          <input type="text" value={form.successRate} onChange={(e) => setForm({ ...form, successRate: e.target.value })} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-school-blue outline-none" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Years Experience</label>
          <input type="text" value={form.yearsExperience} onChange={(e) => setForm({ ...form, yearsExperience: e.target.value })} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-school-blue outline-none" />
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
