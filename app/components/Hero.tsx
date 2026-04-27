"use client";

import { motion } from "framer-motion";
import { Play, ChevronDown, Award, Users, BookOpen } from "lucide-react";
import { useSiteConfig } from "../context/SiteConfigContext";
import { useEffect, useRef, useState } from "react";

export default function Hero() {
  const { config, loading } = useSiteConfig();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoError, setVideoError] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);

  // Reload video when URL changes
  useEffect(() => {
    if (videoRef.current && config.heroVideoUrl) {
      setVideoError(false);
      setVideoLoaded(false);
      videoRef.current.load();
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.log("Autoplay prevented:", err);
        });
      }
    }
  }, [config.heroVideoUrl]);

  const stats = [
    { icon: Users, value: config.studentCount, label: "Students" },
    { icon: BookOpen, value: config.coursesCount, label: "Courses" },
    { icon: Award, value: config.successRate, label: "Success Rate" },
  ];


  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0 bg-school-blue">
        {loading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin" />
          </div>
        ) : videoError ? (
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${config.heroVideoPoster})` }}
          />
        ) : (
          <video
            ref={videoRef}
            key={config.heroVideoUrl}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover"
            poster={config.heroVideoPoster}
            onLoadedData={() => setVideoLoaded(true)}
            onError={() => setVideoError(true)}
          >
            <source src={config.heroVideoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}
        {/* Overlay */}
        <div className="absolute inset-0 video-overlay" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full section-padding pt-32 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6"
              >
                <span className="w-2 h-2 bg-school-gold rounded-full animate-pulse" />
                <span className="text-white/90 text-sm font-medium">
                  {config.heroBadge}
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight mb-6"
              >
                {config.heroTitle}{" "}
                <span className="text-school-gold">{config.heroSubtitle}</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="text-lg sm:text-xl text-white/80 mb-8 max-w-xl"
              >
                {config.aboutText}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="flex flex-wrap gap-4"
              >
                <a href="#admissions" className="btn-primary text-lg">
                  Apply Now
                </a>
                <a
                  href="#about"
                  className="px-6 py-3 border-2 border-white text-white font-semibold rounded-lg 
                           hover:bg-white hover:text-school-darkBlue transition-all duration-300 flex items-center gap-2"
                >
                  <Play size={20} />
                  Learn More
                </a>
              </motion.div>
            </motion.div>

            {/* Right Content - Stats Card */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="hidden lg:block"
            >
              <div className="glass rounded-2xl p-8 max-w-md ml-auto">
                <h3 className="text-white text-2xl font-semibold mb-6">
                  Why Choose Excellence Academy?
                </h3>
                <div className="space-y-6">
                  {[
                    "State-of-the-art Infrastructure",
                    "Experienced & Dedicated Faculty",
                    "Focus on Holistic Development",
                    "Excellent Academic Track Record",
                    "Modern Teaching Methodologies",
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.8 + index * 0.1 }}
                      className="flex items-center gap-3"
                    >
                      <div className="w-6 h-6 rounded-full bg-school-gold flex items-center justify-center">
                        <span className="text-school-darkBlue text-sm font-bold">
                          ✓
                        </span>
                      </div>
                      <span className="text-white/90">{item}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="glass rounded-xl p-6 text-center"
              >
                <stat.icon className="w-10 h-10 text-school-gold mx-auto mb-3" />
                <div className="text-3xl sm:text-4xl font-bold text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-white/70">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-white/60"
        >
          <ChevronDown size={32} />
        </motion.div>
      </motion.div>
    </section>
  );
}
