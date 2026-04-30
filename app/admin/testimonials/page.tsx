"use client";

import { useState } from "react";
import { useSiteConfig } from "../../context/SiteConfigContext";
import { Quote, Plus, Trash2, X, Save } from "lucide-react";

export default function TestimonialsPage() {
  const { config, addTestimonial, deleteTestimonial, loading, refreshData } = useSiteConfig();
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({ name: "", role: "", photo: "", content: "", rating: 5 });

  const handleAdd = async () => {
    await addTestimonial(form);
    setForm({ name: "", role: "", photo: "", content: "", rating: 5 });
    setModalOpen(false);
    await refreshData();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this testimonial?")) return;
    await deleteTestimonial(id);
    await refreshData();
  };

  if (loading) return <div className="text-center py-12 text-gray-500">Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Quote className="w-6 h-6 text-school-blue" />
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Testimonials</h2>
            <p className="text-gray-500">Manage testimonials and reviews.</p>
          </div>
        </div>
        <button onClick={() => setModalOpen(true)} className="flex items-center gap-2 px-4 py-2 bg-school-blue text-white rounded-lg hover:bg-blue-800 transition-colors">
          <Plus className="w-4 h-4" />Add Testimonial
        </button>
      </div>

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
              <button onClick={() => handleDelete(t.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg"><Trash2 className="w-4 h-4" /></button>
            </div>
          </div>
        ))}
        {config.testimonials.length === 0 && <p className="text-gray-500 text-center py-8 col-span-2">No testimonials yet.</p>}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold">Add Testimonial</h3>
              <button onClick={() => setModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-lg"><X className="w-5 h-5" /></button>
            </div>
            <div className="space-y-4">
              <div><label className="block text-sm font-medium mb-1">Name</label><input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-3 py-2 border rounded-lg" /></div>
              <div><label className="block text-sm font-medium mb-1">Role</label><input type="text" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} className="w-full px-3 py-2 border rounded-lg" /></div>
              <div><label className="block text-sm font-medium mb-1">Photo URL</label><input type="url" value={form.photo} onChange={(e) => setForm({ ...form, photo: e.target.value })} className="w-full px-3 py-2 border rounded-lg" /></div>
              <div><label className="block text-sm font-medium mb-1">Rating (1-5)</label><input type="number" min={1} max={5} value={form.rating} onChange={(e) => setForm({ ...form, rating: parseInt(e.target.value) })} className="w-full px-3 py-2 border rounded-lg" /></div>
              <div><label className="block text-sm font-medium mb-1">Content</label><textarea rows={3} value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} className="w-full px-3 py-2 border rounded-lg resize-none" /></div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setModalOpen(false)} className="flex-1 px-4 py-2 border rounded-lg hover:bg-gray-50">Cancel</button>
              <button onClick={handleAdd} className="flex-1 px-4 py-2 bg-school-blue text-white rounded-lg hover:bg-blue-800 flex items-center justify-center gap-2"><Save className="w-4 h-4" />Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
