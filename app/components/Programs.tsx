"use client";

import { motion } from "framer-motion";
import {
  BookOpen,
  FlaskConical,
  Calculator,
  Palette,
  Music,
  Globe,
  Code,
  HeartPulse,
  ArrowRight,
} from "lucide-react";

const programs = [
  {
    icon: BookOpen,
    title: "Primary Education",
    grade: "Grades 1-5",
    description:
      "Foundation years focusing on basic literacy, numeracy, and social skills development through interactive learning.",
    color: "bg-blue-500",
    features: ["Activity-Based Learning", "Personal Attention", "Holistic Development"],
  },
  {
    icon: FlaskConical,
    title: "Middle School",
    grade: "Grades 6-8",
    description:
      "Comprehensive curriculum with emphasis on science, mathematics, and critical thinking skills.",
    color: "bg-green-500",
    features: ["Science Labs", "Project Work", "Skill Building"],
  },
  {
    icon: Calculator,
    title: "High School",
    grade: "Grades 9-10",
    description:
      "Rigorous academic preparation with multiple subject streams and career guidance programs.",
    color: "bg-purple-500",
    features: ["Career Counseling", "Competitive Exam Prep", "Leadership Training"],
  },
  {
    icon: Globe,
    title: "Senior Secondary",
    grade: "Grades 11-12",
    description:
      "Advanced studies in Science, Commerce, and Humanities streams with expert faculty guidance.",
    color: "bg-orange-500",
    features: ["Expert Faculty", "Stream Options", "University Prep"],
  },
  {
    icon: Palette,
    title: "Arts & Creativity",
    grade: "All Grades",
    description:
      "Comprehensive arts program including visual arts, crafts, and creative expression workshops.",
    color: "bg-pink-500",
    features: ["Visual Arts", "Craft Workshops", "Art Exhibitions"],
  },
  {
    icon: Music,
    title: "Performing Arts",
    grade: "All Grades",
    description:
      "Music, dance, and drama programs to nurture artistic talents and boost confidence.",
    color: "bg-red-500",
    features: ["Music Classes", "Dance Training", "Theatre Workshops"],
  },
  {
    icon: Code,
    title: "Technology & Coding",
    grade: "Grades 5-12",
    description:
      "Computer science and coding curriculum preparing students for the digital future.",
    color: "bg-cyan-500",
    features: ["Coding Classes", "Robotics Lab", "AI Introduction"],
  },
  {
    icon: HeartPulse,
    title: "Sports & Physical Ed",
    grade: "All Grades",
    description:
      "Comprehensive sports program with professional coaching in multiple disciplines.",
    color: "bg-emerald-500",
    features: ["Indoor Sports", "Outdoor Games", "Fitness Training"],
  },
];

export default function Programs() {
  return (
    <section id="programs" className="py-20 lg:py-32 bg-gray-50">
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
            Academic Programs
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Comprehensive <span className="text-gradient">Education</span> for Every Stage
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            From primary to senior secondary, we offer diverse programs designed to nurture
            talent and prepare students for future success.
          </p>
        </motion.div>

        {/* Programs Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {programs.map((program, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -10 }}
              className="bg-white rounded-2xl overflow-hidden shadow-lg card-hover group"
            >
              {/* Card Header */}
              <div className={`${program.color} p-6`}>
                <program.icon className="w-10 h-10 text-white mb-4" />
                <h3 className="text-xl font-bold text-white">{program.title}</h3>
                <span className="text-white/80 text-sm">{program.grade}</span>
              </div>

              {/* Card Body */}
              <div className="p-6">
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {program.description}
                </p>
                <ul className="space-y-2 mb-4">
                  {program.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-school-blue" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 text-school-blue font-medium text-sm 
                           group-hover:gap-3 transition-all duration-300"
                >
                  Learn More <ArrowRight size={16} />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-16 bg-school-blue rounded-2xl p-8 lg:p-12 text-center"
        >
          <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">
            Ready to Begin Your Educational Journey?
          </h3>
          <p className="text-white/80 mb-8 max-w-2xl mx-auto">
            Explore our programs and find the perfect fit for your child&apos;s educational needs.
            Our admissions team is here to help.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#admissions" className="btn-primary">
              View Admission Process
            </a>
            <a
              href="#contact"
              className="px-6 py-3 border-2 border-white text-white font-semibold rounded-lg 
                       hover:bg-white hover:text-school-blue transition-all duration-300"
            >
              Contact Us
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
