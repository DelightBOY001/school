"use client";

import { motion } from "framer-motion";
import { Calendar, ArrowRight } from "lucide-react";
import { useSiteConfig } from "../context/SiteConfigContext";

export default function News() {
  const { config } = useSiteConfig();

  return (
    <section id="news" className="py-20 lg:py-32 bg-gray-50">
      <div className="section-padding max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
          <span className="inline-block text-school-blue font-semibold text-sm uppercase tracking-wider mb-3">Latest Updates</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">News & <span className="text-gradient">Events</span></h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">Stay updated with the latest happenings at our school.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {config.news.map((item, index) => (
            <motion.article key={item.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className="relative h-48 overflow-hidden"><img src={item.image} alt={item.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" /></div>
              <div className="p-6">
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-3"><span className="px-3 py-1 bg-school-blue/10 text-school-blue rounded-full text-xs font-medium">{item.category}</span><span className="flex items-center gap-1"><Calendar className="w-4 h-4" />{item.date}</span></div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">{item.title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-3">{item.excerpt}</p>
                <a href="#" className="inline-flex items-center gap-2 text-school-blue font-semibold hover:gap-3 transition-all">Read More<ArrowRight className="w-4 h-4" /></a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
