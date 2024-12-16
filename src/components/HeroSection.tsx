'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';

export default function HeroSection() {
  const [copied, setCopied] = useState(false);
  const caCode = '000000000000000000000000000';

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(caCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const images = [
    '/img/h1.png',
    '/img/h2.png',
    '/img/h3.png',
    '/img/h4.png',
    '/img/h5.png',
  ];

  // Calculate total width for smooth infinite scroll
  const imageWidth = 400; // width of each image container
  const gap = 16; // gap between images
  const totalWidth = (imageWidth + gap) * images.length;

  const scrollToCompanions = () => {
    const companionsSection = document.getElementById('companions-section');
    if (companionsSection) {
      companionsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-between pt-24 pb-32">
      {/* Image Carousel */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="flex gap-4 absolute h-full"
          animate={{
            x: [-totalWidth, 0]
          }}
          transition={{
            x: {
              repeat: Infinity,
              duration: 30,
              ease: "linear",
            },
          }}
          style={{ width: `${totalWidth * 2}px` }}
        >
          {/* First set of images */}
          {images.map((img, index) => (
            <div key={`first-${index}`} className="relative w-[400px] h-full flex-shrink-0">
              <Image
                src={img}
                alt="AI Companion"
                fill
                className="object-cover rounded-2xl opacity-40"
                priority={index < 5}
              />
            </div>
          ))}
          {/* Duplicate set for seamless loop */}
          {images.map((img, index) => (
            <div key={`second-${index}`} className="relative w-[400px] h-full flex-shrink-0">
              <Image
                src={img}
                alt="AI Companion"
                fill
                className="object-cover rounded-2xl opacity-40"
                priority={false}
              />
            </div>
          ))}
        </motion.div>
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 container mx-auto px-4 flex-1 flex flex-col justify-center mb-32">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-red-500 to-rose-500 text-transparent bg-clip-text"
          >
            Experience Intimate AI Conversations
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-300 mb-12"
          >
            Connect with sophisticated AI companions in a safe, private environment
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col items-center gap-6"
          >
            <div className="flex gap-6 justify-center">
              <Link href="/chat">
                <button className="bg-red-600 hover:bg-red-700 px-8 py-4 rounded-full text-lg font-semibold transition-all hover:scale-105 shadow-lg shadow-red-900/20">
                  Start Chatting
                </button>
              </Link>
              <button 
                onClick={scrollToCompanions}
                className="border-2 border-red-500 hover:bg-red-500/10 px-8 py-4 rounded-full text-lg font-semibold transition-all"
              >
                View Companions
              </button>
            </div>

            {/* CA Code Section */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              onClick={handleCopy}
              className="flex items-center gap-2 bg-black/40 px-6 py-3 rounded-xl border border-red-500/20 cursor-pointer hover:bg-black/60 transition-all group"
            >
              <span className="text-gray-400">CA:</span>
              <span className="text-red-500 font-mono">{caCode}</span>
              <motion.div
                animate={copied ? { scale: [1, 1.2, 1] } : {}}
                className="text-gray-400 group-hover:text-red-500"
              >
                {copied ? (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                  </svg>
                )}
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Feature Cards */}
      <div className="relative z-10 container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Private & Discreet",
              description: "End-to-end encryption and strict privacy measures"
            },
            {
              title: "Age Verified",
              description: "Secure verification system for user safety"
            },
            {
              title: "Premium Experience",
              description: "High-quality conversations with advanced AI models"
            }
          ].map((feature, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 + index * 0.2 }}
              className="bg-black/40 backdrop-blur-lg p-8 rounded-2xl border border-red-500/20 hover:border-red-500/40 transition-all hover:transform hover:scale-105"
            >
              <h3 className="text-xl font-semibold text-red-500 mb-4">{feature.title}</h3>
              <p className="text-gray-400 text-lg">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 