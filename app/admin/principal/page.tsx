"use client";

import { useState, useEffect } from "react";
import { useSiteConfig } from "../../context/SiteConfigContext";
import { Save, GraduationCap, CheckCircle } from "lucide-react";

export default function PrincipalPage() {
  const { config, updatePrincipal, loading } = useSiteConfig();
  const [form, setForm] = useState({
    name: "",
    photo: "",
    message: "",
    qualification: "",
    experience: "",
    email: "",
    phone: "",
  });
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (config.principal) {
      setForm({
        name: config.principal.name || "",
        photo: config.principal.photo || "",
        message: config.principal.message || "",
        qualification: config.principal.qualification || "",
        experience: config.principal.experience || "",
        email: config.principal.email || "",
        phone: config.principal.phone || "",
      });
    }
  }, [config.principal]);

  const handleSave = async () => {
    setSaving(true);
    await updatePrincipal(form as any);
    setSaving(false);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  if (loading) return <div className="text-center py-12 text-gray-500">Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <GraduationCap className="w-6 h-6 text-school-blue" />
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Principal Details</h2>
          <p className="text-gray-500">Update principal information and welcome message.</p>
        </div>
      </div>

      {success && (
        <div className="flex items-center gap-2 text-green-600 bg-green-50 p-4 rounded-lg">
          <CheckCircle className="w-5 h-5" />
          Changes saved successfully!
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
          <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-school-blue outline-none" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Photo URL</label>
          <input type="url" value={form.photo} onChange={(e) => setForm({ ...form, photo: e.target.value })} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-school-blue outline-none" />
        </div>
        {form.photo && <div className="md:col-span-2"><img src={form.photo} alt="Principal" className="w-32 h-32 object-cover rounded-xl" /></div>}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">Welcome Message</label>
          <textarea rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-school-blue outline-none resize-none" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Qualification</label>
          <input type="text" value={form.qualification} onChange={(e) => setForm({ ...form, qualification: e.target.value })} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-school-blue outline-none" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Experience</label>
          <input type="text" value={form.experience} onChange={(e) => setForm({ ...form, experience: e.target.value })} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-school-blue outline-none" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
          <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-school-blue outline-none" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
          <input type="text" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-school-blue outline-none" />
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
