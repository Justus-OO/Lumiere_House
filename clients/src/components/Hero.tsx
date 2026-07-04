'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Film } from '@/features/films/types';

interface HeroProps {
  featuredFilm?: Film | null;
  totalFilms?: number;
}

export default function Hero({ featuredFilm, totalFilms = 0 }: HeroProps) {
  const [time, setTime] = useState<string>('');

  // Hydrate a real-time analog clock for the editorial ticker
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', timeZoneName: 'short' }));
    };
    updateClock();
    const interval = setInterval(updateClock, 60000);
    return () => clearInterval(interval);
  }, []);

  const transitionConfig = { duration: 1.2, ease: [0.16, 1, 0.3, 1] };
  
  // Format the next exhibition date dynamically
  const nextDate = featuredFilm 
    ? new Date(featuredFilm.release_date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    : 'TBA';

  return (
    <section className="relative w-full border-b border-black/20 bg-[#F9F9F6] overflow-hidden flex flex-col min-h-[90vh]">
      {/* 1. SVG Noise Texture */}
      <div className="pointer-events-none absolute inset-0 z-0 opacity-[0.25] mix-blend-multiply">
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
          <filter id="noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" />
            <feColorMatrix type="matrix" values="1 0 0 0 0, 0 1 0 0 0, 0 0 1 0 0, 0 0 0 0.1 0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noise)" />
        </svg>
      </div>

      {/* 2. Editorial Top Ticker - UPGRADED TO 1920px */}
      <div className="relative z-10 w-full max-w-[1920px] mx-auto border-b border-black/10 px-6 lg:px-12 xl:px-24 py-2 flex justify-between items-center text-[10px] uppercase tracking-[0.2em] font-sans text-gray-500">
        <div className="flex gap-6">
          <span>Vol. IV — Issue 26</span>
          <span className="hidden md:inline">The Independent Standard</span>
        </div>
        <div>
          <span>{time || 'Loading...'}</span>
        </div>
      </div>

      {/* 3. The Main Masthead - UPGRADED TO 1920px */}
      <div className="relative z-10 flex-1 flex flex-col justify-center max-w-[1920px] mx-auto w-full px-6 lg:px-12 xl:px-24 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-24 items-center">
          

          <div className="lg:col-span-8 xl:col-span-8">
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
transition={{ ...transitionConfig, ease: transitionConfig.ease as any, delay: 0.1 }}
              className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-6 font-sans font-medium flex items-center gap-4"
            >
              <span className="w-8 h-[1px] bg-gray-400"></span>
              Est. 2026 — The Premiere Destination
            </motion.p>
            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...transitionConfig, ease: transitionConfig.ease as any, delay: 0.1 }}
              className="text-6xl md:text-8xl lg:text-[10rem] xl:text-[12rem] font-serif text-[#111] tracking-tighter leading-[0.85] mb-8"
            >
              Lumiere <br /> House.
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...transitionConfig, ease: transitionConfig.ease as any, delay: 0.1 }}
              className="text-lg md:text-2xl text-gray-700 font-serif max-w-2xl xl:max-w-4xl leading-relaxed border-l-2 border-black/20 pl-6 py-2"
            >
              We do not just release films; we curate cinematic events. A heritage approach to modern storytelling, reserved for the extraordinary.
            </motion.p>
          </div>

          {/* Right: The "In Focus" Featured Sub-grid */}
          <div className="lg:col-span-4 xl:col-span-4 flex flex-col justify-center">
            {featuredFilm && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ ...transitionConfig, ease: transitionConfig.ease as any, delay: 0.6 }}
                className="border border-black/10 bg-white p-4 xl:p-6 shadow-sm relative group cursor-pointer transition-colors hover:border-black/30 w-full max-w-md ml-auto"
              >
                <div className="absolute -top-3 -left-3 bg-[#111] text-[#F9F9F6] text-[9px] uppercase tracking-[0.2em] px-3 py-1 font-sans z-10">
                  In Focus
                </div>
                <div className="aspect-[4/3] w-full bg-gray-200 mb-4 overflow-hidden">
                  <img 
                    src={featuredFilm.poster_url} 
                    alt={featuredFilm.title} 
                    className="w-full h-full object-cover grayscale transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <h3 className="font-serif text-xl xl:text-2xl text-[#111] mb-1 line-clamp-1">
                  {featuredFilm.title}
                </h3>
                <p className="font-sans text-xs uppercase tracking-widest text-gray-500 mb-4 xl:mb-6">
                  Dir. {featuredFilm.director}
                </p>
                <Link href={`/films/${featuredFilm.slug}`} className="text-xs font-sans font-medium uppercase tracking-[0.1em] border-b border-black pb-1 hover:text-gray-500 transition-colors inline-block relative z-20">
                  Read the Dossier →
                </Link>
              </motion.div>
            )}
          </div>

        </div>
      </div>

      {/* 4. The Hero Data Footer - UPGRADED TO 1920px */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 1 }}
        className="relative z-10 w-full border-t border-black/10 px-6 lg:px-12 xl:px-24 py-6 mt-auto"
      >
        <div className="max-w-[1920px] mx-auto w-full grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 text-xs uppercase tracking-[0.15em] font-sans text-[#111]">
          
          <div className="flex flex-col gap-1">
            <span className="text-gray-400">Current Slate</span>
            <span className="font-medium">{totalFilms.toString().padStart(2, '0')} Premieres</span>
          </div>
          
          <div className="flex flex-col gap-1">
            <span className="text-gray-400">Next Exhibition</span>
            <span className="font-medium">{nextDate}</span>
          </div>
          
          <div className="flex flex-col gap-1 hidden md:flex">
            <span className="text-gray-400">Global Registry</span>
            <span className="font-medium">Accepting Inquiries</span>
          </div>
          
          {/* Subtle Scroll Indicator */}
          <div className="flex flex-col gap-1 md:items-end justify-center">
            <span className="animate-pulse text-gray-400 flex items-center gap-2">
              Scroll to Explore <span className="text-[10px]">▼</span>
            </span>
          </div>

        </div>
      </motion.div>
    </section>
  );
}