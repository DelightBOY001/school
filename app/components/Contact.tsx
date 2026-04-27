"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send, Facebook, Twitter, Instagram, Linkedin, Youtube, CheckCircle } from "lucide-react";
import { useSiteConfig } from "../context/SiteConfigContext";

const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Youtube, href: "#", label: "YouTube" },
];

export default function Contact() {
  const { config, addInquiry } = useSiteConfig();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await addInquiry({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
      });
      setSubmitted(true);
      setFormData({ name: "", email: "", phone: "", message: "" });
      setTimeout(() => setSubmitted(false), 5000);
    } catch (error) {
      console.error("Error submitting inquiry:", error);
      alert("Failed to submit inquiry. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    { icon: MapPin, title: "Address", content: config.address, link: "#" },
    { icon: Phone, title: "Phone", content: config.phone, link: `tel:${config.phone}` },
    { icon: Mail, title: "Email", content: config.email, link: `mailto:${config.email}` },
    { icon: Clock, title: "Office Hours", content: "Monday - Friday: 8:00 AM - 4:00 PM", subContent: "Saturday: 9:00 AM - 12:00 PM", link: "#" },
  ];

  return (
    <section id="contact" className="py-20 lg:py-32 bg-white">
      <div className="section-padding max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
          <span className="inline-block text-school-blue font-semibold text-sm uppercase tracking-wider mb-3">Contact Us</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Get in <span className="text-gradient">Touch</span></h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">Have questions? We would love to hear from you. Send us a message.</p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="lg:col-span-1 space-y-6">
            {contactInfo.map((item, index) => (
              <a key={index} href={item.link} className="flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors">
                <div className="w-12 h-12 rounded-lg bg-school-blue/10 flex items-center justify-center shrink-0"><item.icon className="w-6 h-6 text-school-blue" /></div>
                <div><h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3><p className="text-gray-600 text-sm">{item.content}</p>{item.subContent && <p className="text-gray-500 text-sm mt-1">{item.subContent}</p>}</div>
              </a>
            ))}
            <div className="flex gap-3 pt-4">
              {socialLinks.map((social, index) => (
                <motion.a key={index} href={social.href} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} className="w-10 h-10 rounded-full bg-school-blue text-white flex items-center justify-center hover:bg-blue-800 transition-colors" aria-label={social.label}><social.icon className="w-5 h-5" /></motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="lg:col-span-2">
            {submitted ? (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center h-full flex flex-col items-center justify-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4"><CheckCircle className="w-8 h-8 text-green-600" /></div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h3>
                <p className="text-gray-600">Your message has been sent. We will get back to you soon.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-gray-50 rounded-2xl p-8 space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div><label className="block text-sm font-medium text-gray-700 mb-2">Your Name</label><input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-school-blue outline-none" placeholder="John Doe" /></div>
                  <div><label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label><input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-school-blue outline-none" placeholder="john@example.com" /></div>
                </div>
                <div><label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label><input type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-school-blue outline-none" placeholder="+1 (234) 567-890" /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-2">Message</label><textarea required rows={5} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-school-blue outline-none resize-none" placeholder="Tell us about your inquiry..."></textarea></div>
                <button type="submit" disabled={isSubmitting} className="w-full py-4 bg-school-blue text-white font-semibold rounded-lg hover:bg-blue-800 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
                  {isSubmitting ? (
                    <><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />Sending...</>
                  ) : (
                    <><Send className="w-5 h-5" />Send Message</>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }} className="mt-12 rounded-2xl overflow-hidden h-[400px]">
          <iframe src={config.mapEmbedUrl} width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="School Location"></iframe>
        </motion.div>
      </div>
    </section>
  );
}
