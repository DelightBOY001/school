"use client";

import { useState } from "react";
import { useSiteConfig } from "../../context/SiteConfigContext";
import { Camera, Plus, Trash2 } from "lucide-react";

export default function PhotosPage() {
  const { config, addPhoto, deletePhoto, loading, refreshData } = useSiteConfig();
  const [url, setUrl] = useState("");
  const [caption, setCaption] = useState("");
  const [category, setCategory] = useState("");

  const handleAdd = async () => {
    if (!url) return;
    await addPhoto({ url, caption, category });
    setUrl(""); setCaption(""); setCategory("");
    await refreshData();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this photo?")) return;
    await deletePhoto(id);
    await refreshData();
  };

  if (loading) return <div className="text-center py-12 text-gray-500">Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Camera className="w-6 h-6 text-school-blue" />
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Photo Gallery</h2>
          <p className="text-gray-500">Manage gallery photos.</p>
        </div>
      </div>

      <div className="bg-gray-50 p-4 rounded-xl space-y-3">
        <div className="grid md:grid-cols-3 gap-3">
          <input type="url" placeholder="Photo URL" value={url} onChange={(e) => setUrl(e.target.value)} className="px-3 py-2 border rounded-lg" />
          <input type="text" placeholder="Caption" value={caption} onChange={(e) => setCaption(e.target.value)} className="px-3 py-2 border rounded-lg" />
          <input type="text" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} className="px-3 py-2 border rounded-lg" />
        </div>
        <button onClick={handleAdd} className="flex items-center gap-2 px-4 py-2 bg-school-blue text-white rounded-lg hover:bg-blue-800">
          <Plus className="w-4 h-4" />Add Photo
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {config.photos.map((photo) => (
          <div key={photo.id} className="relative group rounded-xl overflow-hidden">
            <img src={photo.url} alt={photo.caption} className="w-full h-48 object-cover" />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
              <div className="flex-1">
                <p className="text-white text-sm font-medium">{photo.caption}</p>
                <p className="text-white/70 text-xs">{photo.category}</p>
              </div>
              <button onClick={() => handleDelete(photo.id)} className="p-2 text-white hover:bg-white/20 rounded-lg ml-2">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
        {config.photos.length === 0 && <p className="text-gray-500 text-center py-8 col-span-3">No photos yet.</p>}
      </div>
    </div>
  );
}
