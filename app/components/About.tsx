"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Target, Eye, Heart, Lightbulb, Award, Clock, Users, BookOpen, Trophy } from "lucide-react";
import { useSiteConfig } from "../context/SiteConfigContext";

export default function About() {
  const { config } = useSiteConfig();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const features = [
    { icon: Target, title: "Our Mission", description: config.mission },
    { icon: Eye, title: "Our Vision", description: config.vision },
    { icon: Heart, title: "Our Values", description: config.values },
  ];

  const highlights = [
    { number: config.yearsExperience, label: "Years of Excellence", icon: Clock },
    { number: config.teachers.length.toString() + "+", label: "Expert Faculty", icon: Users },
    { number: config.successRate, label: "Success Rate", icon: BookOpen },
    { number: "50+", label: "Awards Won", icon: Trophy },
  ];

  return (
    <section id="about" className="py-20 lg:py-32 bg-white">
      <div className="section-padding max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-school-blue font-semibold text-sm uppercase tracking-wider mb-3">
            About Us
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Building a Legacy of{" "}
            <span className="text-gradient">Excellence</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Excellence Academy has been at the forefront of quality education,
            shaping young minds and preparing them for a successful future.
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Left - Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={config.aboutImage}
                alt="School Campus"
                className="w-full h-[400px] lg:h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-school-blue/60 to-transparent" />
            </div>
            {/* Floating Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="absolute -bottom-6 -right-6 bg-school-gold text-school-darkBlue p-6 rounded-xl shadow-xl max-w-xs"
            >
              <div className="text-4xl font-bold mb-1">{config.yearsExperience}</div>
              <div className="font-medium">Years of Educational Excellence</div>
            </motion.div>
          </motion.div>

          {/* Right - Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-6">
              Empowering Students for a Brighter Tomorrow
            </h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Founded in 1999, Excellence Academy has grown from a small
              institution to one of the most prestigious schools in the region.
              Our commitment to academic excellence, combined with a focus on
              character development, has helped thousands of students achieve
              their dreams.
            </p>
            <p className="text-gray-600 mb-8 leading-relaxed">
              We believe that education goes beyond textbooks. Our holistic
              approach ensures that students develop not just academically, but
              also emotionally, socially, and physically. With state-of-the-art
              facilities and a dedicated team of educators, we provide an
              environment where every child can thrive.
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { icon: Lightbulb, text: "Innovative Teaching Methods" },
                { icon: Award, text: "Award-Winning Faculty" },
                { icon: Clock, text: "Flexible Learning Options" },
                { icon: Heart, text: "Student-Centered Approach" },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-school-blue" />
                  </div>
                  <span className="font-medium text-gray-700">{item.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Features Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              whileHover={{ y: -10 }}
              className="bg-gray-50 rounded-2xl p-8 card-hover"
            >
              <div className="w-14 h-14 rounded-xl bg-school-blue/10 flex items-center justify-center mb-6">
                <feature.icon className="w-7 h-7 text-school-blue" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">
                {feature.title}
              </h4>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-school-blue rounded-2xl p-8 lg:p-12"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {highlights.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl lg:text-5xl font-bold text-school-gold mb-2">
                  {item.number}
                </div>
                <div className="text-white/80">{item.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
