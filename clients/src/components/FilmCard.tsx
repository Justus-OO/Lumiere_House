'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Film } from '@/features/films/types';

interface FilmCardProps {
  film: Film;
  variant?: 'standard' | 'featured';
  priority?: boolean;
}

export default function FilmCard({ film, variant = 'standard', priority = false }: FilmCardProps) {
  const [imageError, setImageError] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const formattedYear = new Date(film.release_date).getFullYear();
  const exactDate = new Date(film.release_date).toLocaleDateString('en-US', { month: 'long', day: 'numeric' });

  const handleSaveClick = (e: React.MouseEvent) => {
    e.preventDefault(); 
    setIsSaved(!isSaved);
  };

  // ---------------------------------------------------------------------------
  // VARIANT: FEATURED (The Magazine Spread Layout)
  // ---------------------------------------------------------------------------
  if (variant === 'featured') {
    return (
      <Link 
        href={`/films/${film.slug}`}
        className="group block w-full outline-none focus-visible:ring-2 focus-visible:ring-[#111]"
        aria-label={`View dossier for ${film.title}`}
      >
        <article className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 xl:gap-24 items-center">
          
          {/* Left Column: The Massive 16:9 Frame */}
          <div className="lg:col-span-8 relative aspect-video xl:aspect-[21/9] w-full overflow-hidden bg-[#EBEBE8] border border-black/10">
            {/* The Cinematic Reveal Overlay */}
            <div className="absolute inset-0 bg-black/20 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-[800ms] ease-[cubic-bezier(0.25,1,0.5,1)] pointer-events-none" />
            
            {/* The Badge */}
            <div className="absolute top-6 left-6 z-20 bg-[#111] text-[#F9F9F6] text-[10px] uppercase tracking-[0.2em] px-4 py-2 font-sans font-medium overflow-hidden">
              <span className="block transform translate-y-0 group-hover:-translate-y-full transition-transform duration-500">
                Featured Exhibition
              </span>
              <span className="block absolute inset-0 px-4 py-2 bg-white text-[#111] transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                View Dossier
              </span>
            </div>

            {!imageError ? (
              <Image
                src={film.poster_url}
                alt={film.title}
                fill
                priority={priority}
                quality={100} // Bypasses Next.js default compression for maximum quality
                onError={() => setImageError(true)}
                // Removed grayscale classes here for full color
                className="object-cover scale-[1.02] group-hover:scale-100 transition-all duration-[1200ms] ease-[cubic-bezier(0.25,1,0.5,1)]"
                sizes="(max-width: 1024px) 100vw, 75vw"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-gray-400 font-serif text-2xl bg-gray-100">
                Image Unavailable
              </div>
            )}
          </div>

          {/* Right Column: Editorial Typography */}
          <div className="lg:col-span-4 flex flex-col justify-center">
            <div className="flex items-center gap-4 mb-6">
              <span className="w-8 h-[1px] bg-black/30 group-hover:w-16 transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"></span>
              <p className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-sans">
                Dir. {film.director} — {formattedYear}
              </p>
            </div>
            
            <h2 className="text-5xl lg:text-6xl xl:text-7xl font-serif text-[#111] mb-6 leading-[1.1] tracking-tight group-hover:text-gray-600 transition-colors duration-500">
              {film.title}
            </h2>
            
            <p className="text-lg text-gray-600 font-serif leading-relaxed mb-10 max-w-lg">
              {film.logline}
            </p>

            <div className="flex items-center justify-between border-t border-black/20 pt-6">
              <span className="text-xs uppercase tracking-[0.15em] font-sans font-medium text-[#111]">
                Premieres {exactDate}
              </span>
              <span className="w-10 h-10 rounded-full border border-black/20 flex items-center justify-center group-hover:bg-[#111] group-hover:text-white group-hover:border-[#111] transition-all duration-500">
                →
              </span>
            </div>
          </div>
        </article>
      </Link>
    );
  }

  // ---------------------------------------------------------------------------
  // VARIANT: STANDARD (The Gallery Print Layout)
  // ---------------------------------------------------------------------------
  return (
    <Link 
      href={`/films/${film.slug}`} 
      className="group block w-full outline-none focus-visible:ring-2 focus-visible:ring-[#111]"
      aria-label={`View dossier for ${film.title}`}
    >
      <article className="flex flex-col h-full cursor-pointer">
        
        {/* The Frame */}
        <div className="w-full relative overflow-hidden bg-[#EBEBE8] aspect-[2/3] border border-black/10 group-hover:border-black/30 transition-colors duration-700">
          
          {/* Elegant Save Registry Button */}
          <button 
            onClick={handleSaveClick}
            aria-label={isSaved ? "Remove from Registry" : "Save to Registry"}
            className={`absolute top-4 right-4 z-20 w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] ${
              isSaved 
                ? 'bg-[#111] border-[#111] text-[#F9F9F6] opacity-100 scale-100' 
                : 'bg-white/90 border-transparent text-[#111] opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 hover:bg-black hover:text-white'
            }`}
          >
            {isSaved ? (
              <span className="text-[10px]" aria-hidden="true">★</span>
            ) : (
              <span className="text-[14px] leading-none mb-[2px]" aria-hidden="true">+</span>
            )}
          </button>

          {/* Image Layer */}
          {!imageError ? (
            <Image
              src={film.poster_url}
              alt={`Official exhibition poster for ${film.title}`}
              fill
              priority={priority}
              quality={100} // Bypasses Next.js default compression for maximum quality
              onError={() => setImageError(true)}
              // Removed grayscale classes here for full color
              className="object-cover scale-[1.03] group-hover:scale-100 transition-all duration-[1200ms] ease-[cubic-bezier(0.25,1,0.5,1)]"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100 text-gray-400 p-6 text-center">
              <span className="text-2xl mb-2 font-serif">Image Unavailable</span>
            </div>
          )}

          {/* Bottom Gradient Data Reveal */}
          <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-[600ms] ease-[cubic-bezier(0.25,1,0.5,1)] flex flex-col justify-end pointer-events-none z-10">
            <span className="text-white/80 text-[9px] uppercase tracking-[0.2em] font-sans mb-1">
              {film.genre}
            </span>
            <span className="text-white text-xs uppercase tracking-widest font-sans font-medium">
              Read Dossier →
            </span>
          </div>
        </div>
        
        {/* Typography Block */}
        <div className="pt-5 flex flex-col flex-1">
          <div className="flex justify-between items-start mb-3">
            <h3 className="text-2xl font-serif text-[#111] group-hover:text-gray-500 transition-colors duration-300">
              {film.title}
            </h3>
            <span className="text-[10px] uppercase tracking-[0.15em] text-gray-400 font-sans mt-2 shrink-0">
              {formattedYear}
            </span>
          </div>
          
          <p className="text-sm text-gray-600 font-serif leading-relaxed line-clamp-2 mb-4">
            {film.logline}
          </p>

          <p className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-sans font-medium mt-auto border-t border-black/10 pt-4">
            Dir. {film.director}
          </p>
        </div>
      </article>
    </Link>
  );
}