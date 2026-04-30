"use client";

import { useState } from "react";
import { useSiteConfig } from "../../context/SiteConfigContext";
import { Newspaper, Plus, Trash2, Edit2, X, Save } from "lucide-react";

export default function NewsPage() {
  const { config, addNews, updateNews, deleteNews, loading, refreshData } = useSiteConfig();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [form, setForm] = useState({ title: "", excerpt: "", content: "", image: "", category: "", author: "" });

  const openModal = (item: any = null) => {
    setEditingItem(item);
    if (item) {
      setForm({ title: item.title, excerpt: item.excerpt, content: item.content, image: item.image, category: item.category, author: item.author });
    } else {
      setForm({ title: "", excerpt: "", content: "", image: "", category: "", author: "" });
    }
    setModalOpen(true);
  };

  const closeModal = () => { setModalOpen(false); setEditingItem(null); };

  const handleSave = async () => {
    if (editingItem) {
      await updateNews(editingItem.id, form);
    } else {
      await addNews(form);
    }
    closeModal();
    await refreshData();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this news?")) return;
    await deleteNews(id);
    await refreshData();
  };

  if (loading) return <div className="text-center py-12 text-gray-500">Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Newspaper className="w-6 h-6 text-school-blue" />
          <div>
            <h2 className="text-2xl font-bold text-gray-900">News & Events</h2>
            <p className="text-gray-500">Manage news articles.</p>
          </div>
        </div>
        <button onClick={() => openModal()} className="flex items-center gap-2 px-4 py-2 bg-school-blue text-white rounded-lg hover:bg-blue-800 transition-colors">
          <Plus className="w-4 h-4" />Add News
        </button>
      </div>

      <div className="space-y-4">
        {config.news.map((item) => (
          <div key={item.id} className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
            <img src={item.image} alt={item.title} className="w-24 h-16 rounded-lg object-cover" />
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900 truncate">{item.title}</h3>
              <p className="text-sm text-gray-500 truncate">{item.excerpt}</p>
              <p className="text-xs text-gray-400">{item.date} &bull; {item.category}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => openModal(item)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"><Edit2 className="w-4 h-4" /></button>
              <button onClick={() => handleDelete(item.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg"><Trash2 className="w-4 h-4" /></button>
            </div>
          </div>
        ))}
        {config.news.length === 0 && <p className="text-gray-500 text-center py-8">No news yet.</p>}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold">{editingItem ? "Edit News" : "Add News"}</h3>
              <button onClick={closeModal} className="p-2 hover:bg-gray-100 rounded-lg"><X className="w-5 h-5" /></button>
            </div>
            <div className="space-y-4">
              <div><label className="block text-sm font-medium mb-1">Title</label><input type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full px-3 py-2 border rounded-lg" /></div>
              <div><label className="block text-sm font-medium mb-1">Excerpt</label><input type="text" value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} className="w-full px-3 py-2 border rounded-lg" /></div>
              <div><label className="block text-sm font-medium mb-1">Image URL</label><input type="url" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} className="w-full px-3 py-2 border rounded-lg" /></div>
              <div className="grid grid-cols-2 gap-3">
                <div><label className="block text-sm font-medium mb-1">Category</label><input type="text" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full px-3 py-2 border rounded-lg" /></div>
                <div><label className="block text-sm font-medium mb-1">Author</label><input type="text" value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })} className="w-full px-3 py-2 border rounded-lg" /></div>
              </div>
              <div><label className="block text-sm font-medium mb-1">Content</label><textarea rows={4} value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} className="w-full px-3 py-2 border rounded-lg resize-none" /></div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={closeModal} className="flex-1 px-4 py-2 border rounded-lg hover:bg-gray-50">Cancel</button>
              <button onClick={handleSave} className="flex-1 px-4 py-2 bg-school-blue text-white rounded-lg hover:bg-blue-800 flex items-center justify-center gap-2"><Save className="w-4 h-4" />Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
