'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

const companions = [
  { id: 'kenzie', name: 'Kenzie', origin: 'American', image: '/img/Kenzie - American.jpg', online: true, rating: 4.9, responseTime: '< 1 min' },
  { id: 'milana', name: 'Milana', origin: '', image: '/img/Milana.jpg', online: true, rating: 4.9, responseTime: '< 1 min' },
  { id: 'tatiana', name: 'Tatiana', origin: '', image: '/img/Tatiana.jpg', online: true, rating: 4.8, responseTime: '< 1 min' },
  { id: 'lily', name: 'Lily', origin: 'Indonesian', image: '/img/Lily - Indonesian.jpg', online: true, rating: 4.9, responseTime: '< 1 min' },
  { id: 'scarlett', name: 'Scarlett', origin: '', image: '/img/Scarlett.jpg', online: true, rating: 5.0, responseTime: '< 1 min' },
  { id: 'briana', name: 'Briana', origin: '', image: '/img/Briana.jpg', online: true, rating: 4.8, responseTime: '< 1 min' },
  { id: 'elysia', name: 'Elysia', origin: 'Irish', image: '/img/Elysia - Irish.jpg', online: true, rating: 4.9, responseTime: '< 1 min' },
  { id: 'sofie', name: 'Sofie', origin: 'Canada', image: '/img/Sofie - Canada.jpg', online: true, rating: 5.0, responseTime: '< 1 min' },
  { id: 'natasha', name: 'Natasha', origin: 'American', image: '/img/Natasha - American.jpg', online: true, rating: 4.9, responseTime: '< 1 min' },
  { id: 'sicha', name: 'Sicha', origin: '', image: '/img/Sicha.jpg', online: false, rating: 4.8, responseTime: '5 min' },
  { id: 'niya', name: 'Niya', origin: 'Dubai', image: '/img/Niya - Dubai.jpg', online: false, rating: 4.9, responseTime: '5 min' },
  { id: 'stacy', name: 'Stacy', origin: 'India', image: '/img/Stacy - India.jpg', online: true, rating: 4.8, responseTime: '< 1 min' },
];

export default function CompanionsSection() {
  const router = useRouter();

  const handleCompanionClick = (companionId: string) => {
    router.push(`/companion/${companionId}`);
  };

  return (
    <section id="companions-section" className="py-16 md:py-24 bg-gradient-to-b from-black/95 to-black/90">
      <div className="container mx-auto px-4">
        {/* Elegant Header */}
        <div className="text-center mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-block"
          >
            <h2 className="text-2xl md:text-4xl font-light mb-4 tracking-wide text-white">
              EXCLUSIVE COMPANIONS
            </h2>
            <div className="w-32 md:w-40 h-0.5 bg-gradient-to-r from-transparent via-red-500 to-transparent mx-auto" />
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-gray-400 mt-6 max-w-2xl mx-auto text-sm md:text-base tracking-wider px-4"
          >
            Discover your perfect match among our carefully curated selection of sophisticated AI companions
          </motion.p>
        </div>

        {/* Companions Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 max-w-[1400px] mx-auto">
          {companions.map((companion, index) => (
            <motion.div
              key={companion.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group cursor-pointer"
              onClick={() => handleCompanionClick(companion.id)}
            >
              <div className="relative overflow-hidden rounded-lg shadow-2xl">
                {/* Online Status */}
                <div className="absolute top-2 md:top-3 left-2 md:left-3 z-10 flex items-center space-x-1 md:space-x-2 bg-black/60 backdrop-blur-sm px-2 py-1 rounded-full">
                  <div className={`w-1.5 md:w-2 h-1.5 md:h-2 rounded-full ${companion.online ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`} />
                  <span className="text-[10px] md:text-xs font-light tracking-wider text-white">
                    {companion.online ? 'Online' : 'Away'}
                  </span>
                </div>

                {/* Image Container */}
                <div className="aspect-[3/4] relative">
                  <Image
                    src={companion.image}
                    alt={companion.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                  {/* Elegant Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-700" />
                </div>
                
                {/* Content Overlay */}
                <div className="absolute inset-0 flex flex-col justify-end p-2 md:p-4 transform translate-y-6 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="bg-black/60 backdrop-blur-sm p-2 md:p-4 -mx-2 md:-mx-4 -mb-2 md:-mb-4">
                    <div className="flex justify-between items-start mb-1 md:mb-2">
                      <div>
                        <h3 className="text-sm md:text-lg font-light text-white tracking-wider">
                          {companion.name.toUpperCase()}
                        </h3>
                        {companion.origin && (
                          <p className="text-red-400 text-[10px] md:text-xs tracking-wide font-light">
                            {companion.origin}
                          </p>
                        )}
                      </div>
                      <div className="flex items-center space-x-1">
                        <svg className="w-3 h-3 md:w-4 md:h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="text-yellow-400 text-xs md:text-sm font-medium">{companion.rating}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-[10px] md:text-xs text-gray-300">
                      <span className="font-light">Response Time:</span>
                      <span className="text-green-400">{companion.responseTime}</span>
                    </div>
                  </div>
                </div>

                {/* Hover Border Effect */}
                <div className="absolute inset-0 border-2 border-red-500/0 group-hover:border-red-500/40 transition-all duration-500 rounded-lg" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 