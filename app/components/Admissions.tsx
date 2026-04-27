"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import {
  FileText,
  ClipboardList,
  UserCheck,
  CreditCard,
  CheckCircle,
  Calendar,
  Phone,
  Mail,
  MapPin,
  ChevronRight,
  Download,
} from "lucide-react";

const steps = [
  {
    icon: FileText,
    title: "Online Application",
    description: "Fill out the online application form with student and parent details.",
  },
  {
    icon: ClipboardList,
    title: "Document Submission",
    description: "Upload required documents including birth certificate and previous school records.",
  },
  {
    icon: UserCheck,
    title: "Entrance Assessment",
    description: "Schedule and complete the grade-appropriate entrance assessment.",
  },
  {
    icon: CreditCard,
    title: "Fee Payment",
    description: "Complete admission fee payment to secure your child's seat.",
  },
];

const documents = [
  "Birth Certificate",
  "Previous School Records",
  "Transfer Certificate",
  "Passport Size Photographs (4)",
  "Address Proof",
  "Parent's ID Proof",
  "Immunization Records",
  "Caste Certificate (if applicable)",
];

const faqs = [
  {
    question: "What is the age criteria for admission?",
    answer:
      "For Grade 1, the child should be 6 years old by March 31st of the admission year. Age criteria vary for other grades accordingly.",
  },
  {
    question: "When does the admission process start?",
    answer:
      "Admissions for the new academic year typically begin in October. However, we accept applications year-round based on seat availability.",
  },
  {
    question: "Is there an entrance exam?",
    answer:
      "Yes, students need to appear for a grade-appropriate assessment that tests basic skills in English, Mathematics, and general awareness.",
  },
  {
    question: "What is the fee structure?",
    answer:
      "Our fee structure is competitive and transparent. Please contact our admissions office or download the fee structure document for detailed information.",
  },
];

export default function Admissions() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    parentName: "",
    email: "",
    phone: "",
    studentName: "",
    grade: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Thank you for your inquiry! Our admissions team will contact you shortly.");
    setFormData({ parentName: "", email: "", phone: "", studentName: "", grade: "", message: "" });
  };

  return (
    <section id="admissions" className="py-20 lg:py-32 bg-gray-50">
      <div className="section-padding max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-school-blue font-semibold text-sm uppercase tracking-wider mb-3">
            Admissions
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Begin Your <span className="text-gradient">Journey</span> With Us
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Join our community of learners. Our streamlined admission process makes it easy
            to secure your child&apos;s future.
          </p>
        </motion.div>

        {/* Process Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.5 }}
              className="relative"
            >
              <div className="bg-white rounded-2xl p-6 h-full card-hover">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-school-blue flex items-center justify-center">
                    <step.icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-4xl font-bold text-gray-200">0{index + 1}</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600 text-sm">{step.description}</p>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2">
                  <ChevronRight className="w-6 h-6 text-gray-300" />
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left - Information */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Required Documents */}
            <div className="bg-white rounded-2xl p-8 shadow-lg mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <FileText className="w-6 h-6 text-school-blue" />
                Required Documents
              </h3>
              <div className="grid sm:grid-cols-2 gap-3">
                {documents.map((doc, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700 text-sm">{doc}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQs */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h3>
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div key={index} className="border-b border-gray-100 last:border-0 pb-4 last:pb-0">
                    <button
                      onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                      className="w-full flex items-center justify-between text-left"
                    >
                      <span className="font-medium text-gray-900 pr-4">{faq.question}</span>
                      <ChevronRight
                        className={`w-5 h-5 text-school-blue flex-shrink-0 transition-transform duration-300 ${
                          activeFaq === index ? "rotate-90" : ""
                        }`}
                      />
                    </button>
                    {activeFaq === index && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="text-gray-600 mt-3 text-sm"
                      >
                        {faq.answer}
                      </motion.p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Download Button */}
            <a
              href="#"
              className="mt-8 inline-flex items-center gap-3 bg-school-blue text-white px-6 py-3 rounded-xl
                       hover:bg-blue-800 transition-colors"
            >
              <Download className="w-5 h-5" />
              Download Prospectus
            </a>
          </motion.div>

          {/* Right - Inquiry Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl p-8 shadow-lg"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Admission Inquiry</h3>
            <p className="text-gray-600 mb-6">Fill out the form below and we&apos;ll get back to you shortly.</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Parent Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.parentName}
                    onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-school-blue 
                             focus:border-transparent outline-none transition-all"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-school-blue 
                             focus:border-transparent outline-none transition-all"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-school-blue 
                             focus:border-transparent outline-none transition-all"
                    placeholder="+1 234 567 890"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Student Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.studentName}
                    onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-school-blue 
                             focus:border-transparent outline-none transition-all"
                    placeholder="Jane Doe"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Grade Applying For *</label>
                <select
                  required
                  value={formData.grade}
                  onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-school-blue 
                           focus:border-transparent outline-none transition-all"
                >
                  <option value="">Select Grade</option>
                  {[...Array(12)].map((_, i) => (
                    <option key={i} value={`Grade ${i + 1}`}>
                      Grade {i + 1}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-school-blue 
                           focus:border-transparent outline-none transition-all resize-none"
                  placeholder="Any specific questions or requirements..."
                />
              </div>

              <button
                type="submit"
                className="w-full btn-primary py-3 text-center"
              >
                Submit Inquiry
              </button>
            </form>
          </motion.div>
        </div>

        {/* Important Dates */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-16 bg-school-blue rounded-2xl p-8 lg:p-12"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-white mb-2">Important Dates</h3>
            <p className="text-white/80">Mark your calendar for the upcoming academic year</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { date: "Oct 1", event: "Admission Opens", icon: Calendar },
              { date: "Dec 15", event: "Last Date to Apply", icon: Calendar },
              { date: "Jan 10", event: "Entrance Exams", icon: ClipboardList },
              { date: "Mar 1", event: "New Session Begins", icon: Calendar },
            ].map((item, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
                <item.icon className="w-8 h-8 text-school-gold mx-auto mb-3" />
                <div className="text-2xl font-bold text-school-gold mb-1">{item.date}</div>
                <div className="text-white/90">{item.event}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
