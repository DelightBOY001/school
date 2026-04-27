"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { GraduationCap, Award, Mail, Phone, Linkedin, Twitter, X, User } from "lucide-react";
import { useSiteConfig } from "../context/SiteConfigContext";

export default function Team() {
  const { config, loading } = useSiteConfig();
  const [selectedTeacher, setSelectedTeacher] = useState<typeof config.teachers[0] | null>(null);
  const [showPrincipalModal, setShowPrincipalModal] = useState(false);

  const { principal, teachers } = config;

  if (loading) {
    return (
      <section id="team" className="py-20 lg:py-32 bg-white">
        <div className="section-padding max-w-7xl mx-auto text-center">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="team" className="py-20 lg:py-32 bg-white">
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
            Our Team
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Meet Our <span className="text-gradient">Leadership</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Dedicated educators committed to nurturing excellence in every student
          </p>
        </motion.div>

        {/* Principal Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <div className="bg-gradient-to-br from-school-blue to-school-darkBlue rounded-3xl p-8 lg:p-12 text-white overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
            
            <div className="relative z-10 grid lg:grid-cols-3 gap-8 items-center">
              <div className="lg:col-span-1">
                <div className="relative">
                  <div className="w-48 h-48 lg:w-64 lg:h-64 rounded-2xl overflow-hidden border-4 border-school-gold shadow-2xl mx-auto lg:mx-0">
                    <img 
                      src={principal.photo} 
                      alt={principal.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-4 -right-4 lg:right-auto lg:-left-4 bg-school-gold text-school-darkBlue p-3 rounded-xl shadow-lg">
                    <GraduationCap className="w-8 h-8" />
                  </div>
                </div>
              </div>
              
              <div className="lg:col-span-2 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-4">
                  <Award className="w-4 h-4 text-school-gold" />
                  <span className="text-sm font-medium">Principal</span>
                </div>
                
                <h3 className="text-3xl lg:text-4xl font-bold mb-2">{principal.name}</h3>
                <p className="text-white/80 mb-4">{principal.qualification}</p>
                
                <p className="text-white/90 text-lg leading-relaxed mb-6 max-w-2xl">
                  &ldquo;{principal.message}&rdquo;
                </p>
                
                <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                  <div className="flex items-center gap-2 text-sm text-white/80">
                    <User className="w-4 h-4" />
                    {principal.experience}
                  </div>
                  {principal.email && (
                    <a href={`mailto:${principal.email}`} className="flex items-center gap-2 text-sm text-white/80 hover:text-school-gold transition-colors">
                      <Mail className="w-4 h-4" />
                      {principal.email}
                    </a>
                  )}
                  {principal.phone && (
                    <a href={`tel:${principal.phone}`} className="flex items-center gap-2 text-sm text-white/80 hover:text-school-gold transition-colors">
                      <Phone className="w-4 h-4" />
                      {principal.phone}
                    </a>
                  )}
                </div>
                
                {principal.socialLinks && principal.socialLinks.length > 0 && (
                  <div className="flex gap-3 mt-6 justify-center lg:justify-start">
                    {principal.socialLinks.map((link, idx) => (
                      <a 
                        key={idx}
                        href={link.url}
                        className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-school-gold hover:text-school-darkBlue transition-all"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {link.platform === "LinkedIn" && <Linkedin className="w-5 h-5" />}
                        {link.platform === "Twitter" && <Twitter className="w-5 h-5" />}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Teachers Grid */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Our Expert <span className="text-school-blue">Faculty</span>
          </h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {teachers.map((teacher, index) => (
              <motion.div
                key={teacher.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                onClick={() => setSelectedTeacher(teacher)}
                className="group cursor-pointer"
              >
                <div className="bg-gray-50 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all">
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src={teacher.photo} 
                      alt={teacher.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-school-blue/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform">
                      <p className="text-white text-sm line-clamp-2">{teacher.bio}</p>
                    </div>
                  </div>
                  <div className="p-5">
                    <h4 className="text-lg font-bold text-gray-900 mb-1">{teacher.name}</h4>
                    <p className="text-school-blue font-medium text-sm mb-2">{teacher.subject}</p>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Award className="w-3 h-3" />
                      {teacher.qualification}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Stats Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-school-gold rounded-2xl p-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center"
        >
          <div>
            <div className="text-3xl lg:text-4xl font-bold text-school-darkBlue mb-1">{teachers.length}+</div>
            <div className="text-school-darkBlue/70 text-sm">Expert Teachers</div>
          </div>
          <div>
            <div className="text-3xl lg:text-4xl font-bold text-school-darkBlue mb-1">15+</div>
            <div className="text-school-darkBlue/70 text-sm">PhD Holders</div>
          </div>
          <div>
            <div className="text-3xl lg:text-4xl font-bold text-school-darkBlue mb-1">10+</div>
            <div className="text-school-darkBlue/70 text-sm">Years Avg. Experience</div>
          </div>
          <div>
            <div className="text-3xl lg:text-4xl font-bold text-school-darkBlue mb-1">50+</div>
            <div className="text-school-darkBlue/70 text-sm">Support Staff</div>
          </div>
        </motion.div>
      </div>

      {/* Teacher Detail Modal */}
      {selectedTeacher && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" onClick={() => setSelectedTeacher(null)}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white rounded-3xl overflow-hidden max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            <div className="relative h-64">
              <img 
                src={selectedTeacher.photo} 
                alt={selectedTeacher.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <button 
                onClick={() => setSelectedTeacher(null)}
                className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="absolute bottom-4 left-6 text-white">
                <h3 className="text-2xl font-bold">{selectedTeacher.name}</h3>
                <p className="text-white/90">{selectedTeacher.subject}</p>
              </div>
            </div>
            <div className="p-6">
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <Award className="w-5 h-5 text-school-blue" />
                  <div>
                    <p className="text-xs text-gray-500">Qualification</p>
                    <p className="font-medium text-sm">{selectedTeacher.qualification}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <User className="w-5 h-5 text-school-blue" />
                  <div>
                    <p className="text-xs text-gray-500">Experience</p>
                    <p className="font-medium text-sm">{selectedTeacher.experience}</p>
                  </div>
                </div>
              </div>
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-2">About</h4>
                <p className="text-gray-600 leading-relaxed">{selectedTeacher.bio}</p>
              </div>
              {selectedTeacher.email && (
                <a 
                  href={`mailto:${selectedTeacher.email}`}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-school-blue text-white rounded-xl hover:bg-blue-800 transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  Contact {selectedTeacher.name.split(' ')[0]}
                </a>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
}
