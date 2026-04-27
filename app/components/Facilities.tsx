"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import {
  Building2,
  FlaskConical,
  BookOpen,
  Monitor,
  Music,
  Dumbbell,
  Bus,
  Utensils,
  Wifi,
  Shield,
  X,
} from "lucide-react";

const facilities = [
  {
    icon: Building2,
    title: "Modern Classrooms",
    description: "Spacious, well-ventilated classrooms equipped with smart boards and modern teaching aids.",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80",
    features: ["Smart Boards", "Air Conditioned", "Ergonomic Furniture"],
  },
  {
    icon: FlaskConical,
    title: "Science Laboratories",
    description: "State-of-the-art physics, chemistry, and biology labs with latest equipment and safety measures.",
    image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&q=80",
    features: ["Modern Equipment", "Safety Standards", "Practical Learning"],
  },
  {
    icon: BookOpen,
    title: "Library & Resource Center",
    description: "Well-stocked library with thousands of books, digital resources, and quiet study areas.",
    image: "https://images.unsplash.com/photo-1568667256549-094345857637?w=800&q=80",
    features: ["50,000+ Books", "Digital Catalog", "Reading Rooms"],
  },
  {
    icon: Monitor,
    title: "Computer Labs",
    description: "Modern computer labs with high-speed internet and latest software for digital learning.",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80",
    features: ["High-Speed Internet", "Latest Hardware", "Coding Labs"],
  },
  {
    icon: Music,
    title: "Arts & Music Studio",
    description: "Dedicated spaces for visual arts, music practice, and performing arts training.",
    image: "https://images.unsplash.com/photo-1514117445516-2ecfc9c4ec90?w=800&q=80",
    features: ["Art Studios", "Music Rooms", "Dance Hall"],
  },
  {
    icon: Dumbbell,
    title: "Sports Complex",
    description: "Extensive sports facilities including indoor and outdoor courts, swimming pool, and gym.",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80",
    features: ["Swimming Pool", "Gymnasium", "Sports Fields"],
  },
  {
    icon: Bus,
    title: "Transportation",
    description: "Safe and comfortable bus service covering all major routes with GPS tracking.",
    image: "https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=800&q=80",
    features: ["GPS Tracking", "Experienced Drivers", "All Routes Covered"],
  },
  {
    icon: Utensils,
    title: "Cafeteria",
    description: "Hygienic cafeteria serving nutritious and delicious meals prepared under expert supervision.",
    image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&q=80",
    features: ["Nutritious Meals", "Hygienic Kitchen", "Multiple Options"],
  },
  {
    icon: Wifi,
    title: "Smart Campus",
    description: "Campus-wide WiFi, smart ID cards, and digital attendance systems for seamless operations.",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c3?w=800&q=80",
    features: ["Campus WiFi", "Smart ID Cards", "Digital Systems"],
  },
  {
    icon: Shield,
    title: "Safety & Security",
    description: "24/7 security with CCTV surveillance, trained guards, and emergency response systems.",
    image: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=800&q=80",
    features: ["CCTV Coverage", "Trained Guards", "Emergency Response"],
  },
];

export default function Facilities() {
  const [selectedFacility, setSelectedFacility] = useState<typeof facilities[0] | null>(null);

  return (
    <section id="facilities" className="py-20 lg:py-32 bg-white">
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
            Our Facilities
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            World-Class <span className="text-gradient">Infrastructure</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Experience learning in a modern, safe, and stimulating environment designed
            to bring out the best in every student.
          </p>
        </motion.div>

        {/* Facilities Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {facilities.map((facility, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, duration: 0.5 }}
              whileHover={{ y: -8 }}
              onClick={() => setSelectedFacility(facility)}
              className="bg-gray-50 rounded-xl p-6 cursor-pointer card-hover group"
            >
              <div className="w-14 h-14 rounded-xl bg-school-blue/10 flex items-center justify-center mb-4 
                            group-hover:bg-school-blue group-hover:text-white transition-all duration-300">
                <facility.icon className="w-7 h-7 text-school-blue group-hover:text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{facility.title}</h3>
              <p className="text-gray-600 text-sm line-clamp-2">{facility.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Image Gallery */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-16"
        >
          <h3 className="text-2xl font-bold text-center mb-8">Campus Gallery</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {facilities.slice(0, 8).map((facility, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.03 }}
                className={`relative rounded-xl overflow-hidden group cursor-pointer ${
                  index === 0 || index === 5 ? "md:col-span-2 md:row-span-2" : ""
                }`}
                onClick={() => setSelectedFacility(facility)}
              >
                <img
                  src={facility.image}
                  alt={facility.title}
                  className="w-full h-full object-cover aspect-square md:aspect-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-school-blue/80 to-transparent 
                              opacity-0 group-hover:opacity-100 transition-opacity duration-300 
                              flex items-end p-4">
                  <span className="text-white font-semibold">{facility.title}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Modal */}
      {selectedFacility && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={() => setSelectedFacility(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-2xl overflow-hidden max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <img
                src={selectedFacility.image}
                alt={selectedFacility.title}
                className="w-full h-64 object-cover"
              />
              <button
                onClick={() => setSelectedFacility(null)}
                className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center
                         shadow-lg hover:bg-gray-100 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-8">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-school-blue/10 flex items-center justify-center">
                  <selectedFacility.icon className="w-6 h-6 text-school-blue" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">{selectedFacility.title}</h3>
              </div>
              <p className="text-gray-600 mb-6">{selectedFacility.description}</p>
              <div className="flex flex-wrap gap-3">
                {selectedFacility.features.map((feature, idx) => (
                  <span
                    key={idx}
                    className="px-4 py-2 bg-school-blue/10 text-school-blue rounded-full text-sm font-medium"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}
