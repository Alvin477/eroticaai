'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function HeroSection() {
  // Commenting out CA code functionality
  /*
  const [copied, setCopied] = useState(false);
  const caCode = '000000000000000000000000000';

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(caCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };
  */

  const images = [
    '/img/h1.png',
    '/img/h2.png',
    '/img/h3.png',
    '/img/h4.png',
    '/img/h5.png',
  ];

  // Responsive image width based on container
  const getImageWidth = () => {
    if (typeof window !== 'undefined') {
      const vw = Math.min(window.innerWidth, 1200); // Max width container
      return vw < 768 ? Math.min(300, vw - 32) : 400; // Account for padding
    }
    return 400;
  };

  const imageWidth = getImageWidth();
  const gap = 16;
  const totalWidth = (imageWidth + gap) * images.length;

  const scrollToCompanions = () => {
    const companionsSection = document.getElementById('companions-section');
    if (companionsSection) {
      companionsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full overflow-x-hidden">
      <section className="relative min-h-screen flex flex-col justify-between pt-16 sm:pt-24 pb-16 sm:pb-32">
        {/* Image Carousel */}
        <div className="absolute inset-0 w-full overflow-hidden">
          <div className="absolute inset-0 w-full overflow-hidden">
            <motion.div 
              className="flex gap-2 sm:gap-4 absolute h-full"
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
              style={{ 
                width: `${totalWidth * 2}px`, 
                willChange: 'transform',
                transform: 'translateX(0)' 
              }}
            >
              {/* First set of images */}
              {images.map((img, index) => (
                <div 
                  key={`first-${index}`} 
                  className="relative h-full flex-shrink-0"
                  style={{ width: `${imageWidth}px` }}
                >
                  <Image
                    src={img}
                    alt="AI Companion"
                    fill
                    className="object-cover rounded-lg sm:rounded-2xl opacity-40"
                    priority={index < 5}
                  />
                </div>
              ))}
              {/* Duplicate set for seamless loop */}
              {images.map((img, index) => (
                <div 
                  key={`second-${index}`} 
                  className="relative h-full flex-shrink-0"
                  style={{ width: `${imageWidth}px` }}
                >
                  <Image
                    src={img}
                    alt="AI Companion"
                    fill
                    className="object-cover rounded-lg sm:rounded-2xl opacity-40"
                    priority={false}
                  />
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Content Overlay */}
        <div className="relative z-10 container mx-auto px-4 flex-1 flex flex-col justify-center mb-8 sm:mb-16 md:mb-32 max-w-full">
          <div className="max-w-3xl mx-auto text-center w-full">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 sm:mb-6 md:mb-8 bg-gradient-to-r from-red-500 to-rose-500 text-transparent bg-clip-text px-2"
            >
              Experience Intimate AI Conversations
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-base sm:text-lg md:text-2xl text-gray-300 mb-6 sm:mb-8 md:mb-12 px-2 sm:px-4"
            >
              Connect with sophisticated AI companions in a safe, private environment
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col items-center gap-4 md:gap-6"
            >
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center w-full px-2 sm:px-4">
                <Link href="/chat" className="w-full sm:w-auto">
                  <button className="w-full sm:w-auto bg-red-600 hover:bg-red-700 px-4 sm:px-6 md:px-8 py-3 sm:py-4 rounded-full text-sm sm:text-base md:text-lg font-semibold transition-all hover:scale-105 shadow-lg shadow-red-900/20">
                    Start Chatting
                  </button>
                </Link>
                <button 
                  onClick={scrollToCompanions}
                  className="w-full sm:w-auto border-2 border-red-500 hover:bg-red-500/10 px-4 sm:px-6 md:px-8 py-3 sm:py-4 rounded-full text-sm sm:text-base md:text-lg font-semibold transition-all"
                >
                  View Companions
                </button>
              </div>

              {/* Commenting out CA Code Section 
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                onClick={handleCopy}
                className="flex items-center gap-2 bg-black/40 px-4 sm:px-6 py-2 sm:py-3 rounded-xl border border-red-500/20 cursor-pointer hover:bg-black/60 transition-all group text-sm sm:text-base"
              >
                <span className="text-gray-400">CA:</span>
                <span className="text-red-500 font-mono truncate max-w-[150px] sm:max-w-full">{caCode}</span>
                <motion.div
                  animate={copied ? { scale: [1, 1.2, 1] } : {}}
                  className="text-gray-400 group-hover:text-red-500"
                >
                  {copied ? (
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                    </svg>
                  )}
                </motion.div>
              </motion.div>
              */}
            </motion.div>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="relative z-10 container mx-auto px-2 sm:px-4 max-w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-8">
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
                className="bg-black/40 backdrop-blur-lg p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl border border-red-500/20 hover:border-red-500/40 transition-all hover:transform hover:scale-105"
              >
                <h3 className="text-lg sm:text-xl font-semibold text-red-500 mb-2 sm:mb-4">{feature.title}</h3>
                <p className="text-gray-400 text-sm sm:text-base md:text-lg">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
} 