"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Quote, ChevronLeft, ChevronRight, Star } from "lucide-react";
import { useSiteConfig } from "../context/SiteConfigContext";

export default function Testimonials() {
  const { config } = useSiteConfig();
  const [activeIndex, setActiveIndex] = useState(0);

  const nextTestimonial = () => setActiveIndex((prev) => (prev + 1) % config.testimonials.length);
  const prevTestimonial = () => setActiveIndex((prev) => (prev - 1 + config.testimonials.length) % config.testimonials.length);

  if (config.testimonials.length === 0) return null;

  const testimonial = config.testimonials[activeIndex];

  return (
    <section className="py-20 lg:py-32 bg-school-blue relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-school-blue to-school-darkBlue" />
      <div className="section-padding max-w-5xl mx-auto relative z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
          <span className="inline-block text-white/70 font-semibold text-sm uppercase tracking-wider mb-3">Testimonials</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">What People <span className="text-school-gold">Say</span></h2>
        </motion.div>

        <motion.div key={activeIndex} initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="text-center">
          <Quote className="w-16 h-16 text-school-gold mx-auto mb-8 opacity-50" />
          <p className="text-xl sm:text-2xl lg:text-3xl text-white font-medium leading-relaxed mb-8 max-w-4xl mx-auto">&ldquo;{testimonial.content}&rdquo;</p>
          <div className="flex justify-center gap-1 mb-6">
            {Array.from({ length: testimonial.rating }).map((_, i) => (
              <Star key={i} className="w-5 h-5 text-school-gold fill-school-gold" />
            ))}
          </div>
          <div className="flex items-center justify-center gap-4">
            <img src={testimonial.photo} alt={testimonial.name} className="w-16 h-16 rounded-full object-cover border-2 border-school-gold" />
            <div className="text-left"><h4 className="text-lg font-semibold text-white">{testimonial.name}</h4><p className="text-white/70">{testimonial.role}</p></div>
          </div>
        </motion.div>

        <div className="flex justify-center gap-4 mt-12">
          <button onClick={prevTestimonial} className="w-12 h-12 rounded-full border border-white/30 text-white flex items-center justify-center hover:bg-white/10 transition-colors"><ChevronLeft className="w-6 h-6" /></button>
          <div className="flex items-center gap-2">
            {config.testimonials.map((_, index) => (
              <button key={index} onClick={() => setActiveIndex(index)} className={`w-3 h-3 rounded-full transition-colors ${index === activeIndex ? "bg-school-gold" : "bg-white/30"}`} />
            ))}
          </div>
          <button onClick={nextTestimonial} className="w-12 h-12 rounded-full border border-white/30 text-white flex items-center justify-center hover:bg-white/10 transition-colors"><ChevronRight className="w-6 h-6" /></button>
        </div>
      </div>
    </section>
  );
}
