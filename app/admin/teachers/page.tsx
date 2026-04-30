"use client";

import { useState } from "react";
import { useSiteConfig } from "../../context/SiteConfigContext";
import { Users, Plus, Trash2, Edit2, X, Save } from "lucide-react";

export default function TeachersPage() {
  const { config, addTeacher, updateTeacher, deleteTeacher, loading, refreshData } = useSiteConfig();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [form, setForm] = useState({ name: "", subject: "", qualification: "", experience: "", photo: "", bio: "", email: "" });

  const openModal = (item: any = null) => {
    setEditingItem(item);
    if (item) {
      setForm({ name: item.name, subject: item.subject, qualification: item.qualification, experience: item.experience, photo: item.photo, bio: item.bio, email: item.email || "" });
    } else {
      setForm({ name: "", subject: "", qualification: "", experience: "", photo: "", bio: "", email: "" });
    }
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingItem(null);
  };

  const handleSave = async () => {
    if (editingItem) {
      await updateTeacher(editingItem.id, form);
    } else {
      await addTeacher(form);
    }
    closeModal();
    await refreshData();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure?")) return;
    await deleteTeacher(id);
    await refreshData();
  };

  if (loading) return <div className="text-center py-12 text-gray-500">Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Users className="w-6 h-6 text-school-blue" />
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Teachers</h2>
            <p className="text-gray-500">Manage faculty members.</p>
          </div>
        </div>
        <button onClick={() => openModal()} className="flex items-center gap-2 px-4 py-2 bg-school-blue text-white rounded-lg hover:bg-blue-800 transition-colors">
          <Plus className="w-4 h-4" />Add Teacher
        </button>
      </div>

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
              <button onClick={() => openModal(teacher)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"><Edit2 className="w-4 h-4" /></button>
              <button onClick={() => handleDelete(teacher.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg"><Trash2 className="w-4 h-4" /></button>
            </div>
          </div>
        ))}
        {config.teachers.length === 0 && <p className="text-gray-500 text-center py-8 col-span-2">No teachers yet.</p>}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold">{editingItem ? "Edit Teacher" : "Add Teacher"}</h3>
              <button onClick={closeModal} className="p-2 hover:bg-gray-100 rounded-lg"><X className="w-5 h-5" /></button>
            </div>
            <div className="space-y-4">
              <div><label className="block text-sm font-medium mb-1">Name</label><input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-3 py-2 border rounded-lg" /></div>
              <div><label className="block text-sm font-medium mb-1">Subject</label><input type="text" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} className="w-full px-3 py-2 border rounded-lg" /></div>
              <div><label className="block text-sm font-medium mb-1">Qualification</label><input type="text" value={form.qualification} onChange={(e) => setForm({ ...form, qualification: e.target.value })} className="w-full px-3 py-2 border rounded-lg" /></div>
              <div><label className="block text-sm font-medium mb-1">Experience</label><input type="text" value={form.experience} onChange={(e) => setForm({ ...form, experience: e.target.value })} className="w-full px-3 py-2 border rounded-lg" /></div>
              <div><label className="block text-sm font-medium mb-1">Photo URL</label><input type="url" value={form.photo} onChange={(e) => setForm({ ...form, photo: e.target.value })} className="w-full px-3 py-2 border rounded-lg" /></div>
              <div><label className="block text-sm font-medium mb-1">Email</label><input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full px-3 py-2 border rounded-lg" /></div>
              <div><label className="block text-sm font-medium mb-1">Bio</label><textarea rows={3} value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} className="w-full px-3 py-2 border rounded-lg resize-none" /></div>
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
