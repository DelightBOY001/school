"use client";

import { useSiteConfig } from "../../context/SiteConfigContext";
import { School, Clock, Check, Award, Trash2 } from "lucide-react";

export default function AdmissionsPage() {
  const { config, updateAdmissionInquiryStatus, deleteAdmissionInquiry, loading, refreshData } = useSiteConfig();

  const handleStatus = async (id: string, status: string) => {
    await updateAdmissionInquiryStatus(id, status as any);
    await refreshData();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this admission inquiry?")) return;
    await deleteAdmissionInquiry(id);
    await refreshData();
  };

  if (loading) return <div className="text-center py-12 text-gray-500">Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <School className="w-6 h-6 text-school-blue" />
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Admission Inquiries</h2>
            <p className="text-gray-500">View and manage admission applications.</p>
          </div>
        </div>
        <div className="flex gap-2">
          <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium">{config.admissionInquiries.filter(i => i.status === "new").length} New</span>
          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">{config.admissionInquiries.filter(i => i.status === "admitted").length} Admitted</span>
        </div>
      </div>

      <div className="space-y-4">
        {config.admissionInquiries.length === 0 && <p className="text-gray-500 text-center py-8">No admission inquiries yet.</p>}
        {config.admissionInquiries.map((inquiry) => (
          <div key={inquiry.id} className={`p-5 rounded-xl border-2 ${inquiry.status === "new" ? "border-red-300 bg-red-50" : inquiry.status === "contacted" ? "border-yellow-300 bg-yellow-50" : inquiry.status === "scheduled" ? "border-blue-300 bg-blue-50" : inquiry.status === "admitted" ? "border-green-300 bg-green-50" : "border-gray-300 bg-gray-50"}`}>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <h3 className="font-semibold text-gray-900">{inquiry.studentName}</h3>
                  <span className={`px-2 py-1 text-xs rounded-full ${inquiry.status === "new" ? "bg-red-200 text-red-800" : inquiry.status === "contacted" ? "bg-yellow-200 text-yellow-800" : inquiry.status === "scheduled" ? "bg-blue-200 text-blue-800" : inquiry.status === "admitted" ? "bg-green-200 text-green-800" : "bg-gray-200 text-gray-800"}`}>{inquiry.status}</span>
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
                {inquiry.status === "new" && <button onClick={() => handleStatus(inquiry.id, "contacted")} className="p-2 text-yellow-600 hover:bg-yellow-100 rounded-lg" title="Mark as Contacted"><Clock className="w-4 h-4" /></button>}
                {inquiry.status === "contacted" && <button onClick={() => handleStatus(inquiry.id, "scheduled")} className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg" title="Mark as Scheduled"><Check className="w-4 h-4" /></button>}
                {inquiry.status === "scheduled" && <button onClick={() => handleStatus(inquiry.id, "admitted")} className="p-2 text-green-600 hover:bg-green-100 rounded-lg" title="Mark as Admitted"><Award className="w-4 h-4" /></button>}
                <button onClick={() => handleDelete(inquiry.id)} className="p-2 text-red-600 hover:bg-red-100 rounded-lg" title="Delete"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
