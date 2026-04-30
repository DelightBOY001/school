"use client";

import { useSiteConfig } from "../../context/SiteConfigContext";
import { Inbox, Clock, Check, Trash2 } from "lucide-react";

export default function InquiriesPage() {
  const { config, updateInquiryStatus, deleteInquiry, loading, refreshData } = useSiteConfig();

  const handleStatus = async (id: string, status: string) => {
    await updateInquiryStatus(id, status as any);
    await refreshData();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this inquiry?")) return;
    await deleteInquiry(id);
    await refreshData();
  };

  if (loading) return <div className="text-center py-12 text-gray-500">Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Inbox className="w-6 h-6 text-school-blue" />
        <div>
          <h2 className="text-2xl font-bold text-gray-900">General Inquiries</h2>
          <p className="text-gray-500">View and manage contact form submissions.</p>
        </div>
      </div>

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
                <div className="flex gap-4 text-sm text-gray-500 mb-2">
                  <span>{inquiry.email}</span>
                  <span>{inquiry.phone}</span>
                  <span>{inquiry.date}</span>
                </div>
                <p className="text-gray-700">{inquiry.message}</p>
              </div>
              <div className="flex gap-2 ml-4">
                {inquiry.status !== "contacted" && <button onClick={() => handleStatus(inquiry.id, "contacted")} className="p-2 text-yellow-600 hover:bg-yellow-100 rounded-lg" title="Mark as Contacted"><Clock className="w-4 h-4" /></button>}
                {inquiry.status !== "resolved" && <button onClick={() => handleStatus(inquiry.id, "resolved")} className="p-2 text-green-600 hover:bg-green-100 rounded-lg" title="Mark as Resolved"><Check className="w-4 h-4" /></button>}
                <button onClick={() => handleDelete(inquiry.id)} className="p-2 text-red-600 hover:bg-red-100 rounded-lg" title="Delete"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
