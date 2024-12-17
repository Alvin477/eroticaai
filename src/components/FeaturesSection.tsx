'use client';

import { motion } from 'framer-motion';

const features = [
  {
    icon: (
      <svg className="w-8 h-8 md:w-10 md:h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
    title: "Intimate Conversations",
    description: "Engage in deep, passionate conversations that fulfill your desires and fantasies with understanding companions."
  },
  {
    icon: (
      <svg className="w-8 h-8 md:w-10 md:h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
    title: "Complete Privacy",
    description: "Your intimate moments are yours alone. Advanced encryption ensures your conversations remain completely private."
  },
  {
    icon: (
      <svg className="w-8 h-8 md:w-10 md:h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    title: "Deep Connection",
    description: "Experience passionate relationships with companions who remember your desires and adapt to your preferences."
  }
];

export default function FeaturesSection() {
  return (
    <>
      <section className="py-16 md:py-24 bg-gradient-to-b from-black/90 to-black/95">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12 md:mb-20"
            >
              <h2 className="text-2xl md:text-4xl font-light mb-4 tracking-wide text-white">
                UNLEASH YOUR DESIRES
              </h2>
              <div className="w-32 md:w-40 h-0.5 bg-gradient-to-r from-transparent via-red-500 to-transparent mx-auto mb-6" />
            </motion.div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-16">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  className="relative group"
                >
                  <div className="bg-black/40 backdrop-blur-sm p-6 md:p-8 rounded-lg border border-red-500/10 group-hover:border-red-500/30 transition-all duration-500">
                    <div className="text-red-500 mb-6 group-hover:scale-110 transition-transform duration-500 flex justify-center md:justify-start">
                      {feature.icon}
                    </div>
                    <h3 className="text-lg md:text-xl font-light text-white mb-3 md:mb-4 tracking-wide text-center md:text-left">
                      {feature.title}
                    </h3>
                    <p className="text-gray-400 text-sm md:text-base leading-relaxed text-center md:text-left">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-center"
            >
              <div className="inline-block p-1 bg-gradient-to-r from-red-500/20 via-red-500/40 to-red-500/20 rounded-lg">
                <button className="px-6 md:px-8 py-3 md:py-4 bg-black rounded-lg text-white hover:bg-black/80 transition-all duration-300 text-base md:text-lg tracking-wider">
                  BEGIN YOUR JOURNEY
                </button>
              </div>
              <p className="mt-4 text-gray-500 text-xs md:text-sm">
                Instant access • No credit card required
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/95 border-t border-red-500/10">
        <div className="container mx-auto px-4 py-8 md:py-12">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Logo & Description */}
              <div className="text-center md:text-left">
                <div className="text-2xl md:text-3xl font-bold mb-4">
                  <span className="text-red-500">AdultRoom AI</span>
                  <span className="text-white">AI</span>
                </div>
                <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                  Experience intimate connections and passionate conversations with our sophisticated AI companions.
                </p>
              </div>

              {/* Contact */}
              <div className="text-center md:text-right">
                <h4 className="text-white text-sm font-semibold mb-4 uppercase tracking-wider">24/7 Support</h4>
                <p className="text-gray-400 text-sm md:text-base">
                  support@AdultRoom AIi.com
                </p>
                <p className="text-gray-400 text-sm md:text-base mt-2">
                  Available anytime for your needs
                </p>
              </div>
            </div>

            {/* Copyright */}
            <div className="border-t border-red-500/10 mt-8 md:mt-12 pt-6 md:pt-8 text-center">
              <p className="text-gray-500 text-xs md:text-sm">
                © {new Date().getFullYear()} AdultRoom AI. All rights reserved. Must be 18+ to use this service.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
} 