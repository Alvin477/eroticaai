'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

export default function ConsentPopup() {
  const [showConsent, setShowConsent] = useState(true);
  const [isChecked, setIsChecked] = useState(false);

  const handleConsent = () => {
    if (!isChecked) return;
    localStorage.setItem('userConsent', 'true');
    setShowConsent(false);
  };

  useEffect(() => {
    const hasConsented = localStorage.getItem('userConsent');
    if (hasConsented) {
      setShowConsent(false);
    }
  }, []);

  if (!showConsent) return null;

  return (
    <AnimatePresence>
      {showConsent && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-black/80 rounded-3xl overflow-hidden max-w-5xl w-full border border-red-500/20 flex"
          >
            {/* Left Side - Image */}
            <div className="relative w-[40%] hidden md:block">
              <Image
                src="/img/consent.jpg"
                alt="Age Verification"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
            </div>

            {/* Right Side - Content */}
            <div className="flex-1 p-6 md:p-8">
              <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-red-500 to-rose-500 text-transparent bg-clip-text mb-6">
                Age Verification Required
              </h2>

              <div className="prose prose-invert prose-sm max-w-none space-y-3 mb-6 text-gray-300">
                <p className="text-lg font-semibold text-white">Adults only!</p>
                <p>This website should be accessed only by people who are at least eighteen (18) years of age and the age of majority in their jurisdiction.</p>
                <p>Erotica AI has a zero-tolerance policy toward human trafficking, prostitution, and any other illegal conduct. We cooperate with law enforcement in investigating criminal activity.</p>
                <p className="text-sm">This site uses cookies. By continuing to browse the site you are agreeing to our use of cookies.</p>
              </div>

              <div className="flex items-start gap-3 mb-6">
                <input
                  type="checkbox"
                  id="consent"
                  checked={isChecked}
                  onChange={(e) => setIsChecked(e.target.checked)}
                  className="mt-1 h-4 w-4 rounded border-gray-700 bg-gray-900 text-red-600 focus:ring-red-600 focus:ring-offset-gray-900"
                />
                <label htmlFor="consent" className="text-sm text-gray-300">
                  I have read and accept the terms and conditions. I confirm that I am at least 18 years old.
                </label>
              </div>

              <button
                onClick={handleConsent}
                disabled={!isChecked}
                className={`w-full py-3 rounded-xl font-semibold text-lg transition-all ${
                  isChecked
                    ? 'bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white cursor-pointer'
                    : 'bg-gray-800 text-gray-500 cursor-not-allowed'
                }`}
              >
                Enter Site
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 