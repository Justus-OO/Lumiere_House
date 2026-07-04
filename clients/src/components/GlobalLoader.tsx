'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function GlobalLoader() {
  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
    // 1. Session Check: Have they already seen the premiere sequence?
    const hasBooted = sessionStorage.getItem('lumiere_booted');

    if (hasBooted) {
      setIsLoading(false);
      return;
    }

    // 2. First Visit Boot Sequence
    document.body.style.overflow = 'hidden';
    
    const timer = setTimeout(() => {
      setIsLoading(false);
      document.body.style.overflow = ''; // Restore scrolling
      sessionStorage.setItem('lumiere_booted', 'true'); // Lock it out for future loads
    }, 2500); 

    return () => clearTimeout(timer);
  }, []);

  // Prevent server/client hydration mismatch by not rendering anything until mounted
  if (!isMounted) return null;

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="global-loader"
          initial={{ y: 0 }}
          // "Film Shutter" Exit: Swipes the entire curtain up off the screen
          exit={{ y: '-100vh' }} 
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }} // Aggressive ease-in-out curve
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#F9F9F6] text-[#111]"
        >
          <div className="flex flex-col items-center gap-6 relative z-10">
            
            {/* Subtle Pre-title */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-[10px] uppercase tracking-[0.3em] font-sans text-gray-400"
            >
              Preparing Exhibition
            </motion.div>

            {/* The House Monogram / Title */}
            <motion.h1
              initial={{ opacity: 0, filter: 'blur(10px)' }}
              animate={{ opacity: 1, filter: 'blur(0px)' }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="text-4xl md:text-5xl font-serif tracking-tight text-[#111]"
            >
              Lumiere House
            </motion.h1>

            {/* The "Sexy" Indeterminate Progress Line */}
            <div className="w-32 h-[1px] bg-black/10 mt-4 overflow-hidden relative">
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{
                  repeat: Infinity,
                  duration: 1.2,
                  ease: [0.65, 0, 0.35, 1], 
                }}
                className="absolute inset-0 bg-[#111] w-full"
              />
            </div>
          </div>

          {/* Analog Noise Filter for texture */}
          <div className="pointer-events-none absolute inset-0 z-0 opacity-[0.25] mix-blend-multiply">
            <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
              <filter id="noise">
                <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" />
                <feColorMatrix type="matrix" values="1 0 0 0 0, 0 1 0 0 0, 0 0 1 0 0, 0 0 0 0.1 0" />
              </filter>
              <rect width="100%" height="100%" filter="url(#noise)" />
            </svg>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}