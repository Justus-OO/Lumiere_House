import { Suspense } from 'react';
import { Metadata } from 'next';
import { getUpcomingFilms } from '@/features/films/api';
import FilmCard from '@/components/FilmCard';
import FilmCardSkeleton from '@/components/FilmCardSkeleton';
import Hero from '@/components/Hero';
import Newsletter from '@/components/Newsletter';
import { Film } from '@/features/films/types';

// 1. GLOBAL METADATA FOR THE HOMEPAGE
export const metadata: Metadata = {
  title: 'Lumiere House | The Premiere Destination',
  description: 'An independent studio-adjacent house dedicated to the art of the launch. We curate cinematic events, exclusive premieres, and global campaigns.',
  openGraph: {
    title: 'Lumiere House',
    description: 'We do not just release films; we curate cinematic events.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lumiere House',
    description: 'The Premiere Destination for cinematic events.',
  },
};

// 2. THE ASYNC DATA COMPONENT
async function FilmSlate() {
  let films: Film[] = [];
  let apiError = false;

  try {
    films = await getUpcomingFilms();
  } catch (e) {
    console.error('API not reachable:', e);
    apiError = true;
  }

  // Graceful Empty State
  if (apiError || films.length === 0) {
    return (
      <div className="py-24 text-center border border-black/10 bg-white">
        <p className="text-2xl font-serif text-gray-400 mb-2">The Archives are Currently Sealed</p>
        <p className="text-xs uppercase tracking-[0.2em] font-sans text-gray-400">Please check back for upcoming announcements.</p>
      </div>
    );
  }

  // Featured Exhibition Logic
  const featuredFilm = films[0];
  const gridFilms = films.slice(1);

  return (
    <div className="flex flex-col gap-16 xl:gap-24 animate-fade-in">
      {/* The Featured Spread */}
      {featuredFilm && (
        <div className="w-full">
          <FilmCard film={featuredFilm} variant="featured" priority={true} />
        </div>
      )}

      {/* The Standard Grid */}
      {gridFilms.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 xl:gap-x-16 gap-y-16 pt-8 border-t border-black/10">
          {gridFilms.map((film) => (
            <FilmCard key={film.id} film={film} variant="standard" />
          ))}
        </div>
      )}
    </div>
  );
}

// 3. THE MAIN PAGE COMPONENT
export default function Home() {
  return (
    <main className="min-h-screen bg-[#F9F9F6] text-[#111] selection:bg-[#111] selection:text-[#F9F9F6]">
      <Hero />

      {/* The Upcoming Slate */}
      {/* UNCONSTRAINED: Swapped to max-w-[1920px] and wider responsive padding */}
      <section className="w-full max-w-[1920px] mx-auto px-6 py-24 md:py-32 lg:px-12 xl:px-24">
        <header className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8 pb-6 border-b-2 border-[#111]">
          <h2 className="text-4xl md:text-5xl font-serif text-[#111] tracking-tight">Upcoming Slate</h2>
          <div className="text-xs uppercase tracking-[0.15em] text-gray-500 font-sans font-medium flex items-center gap-4">
            <span className="w-12 h-[1px] bg-gray-300 hidden md:block"></span>
            Curated Exhibitions
          </div>
        </header>

        {/* 4. THE SUSPENSE BOUNDARY & SKELETON LOADER */}
        <Suspense 
          fallback={
            <div className="flex flex-col gap-16 xl:gap-24">
              {/* Featured Skeleton */}
              <div className="w-full">
                <FilmCardSkeleton />
              </div>
              {/* Grid Skeletons */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 xl:gap-x-16 gap-y-16 pt-8 border-t border-black/10">
                <FilmCardSkeleton />
                <FilmCardSkeleton />
                <FilmCardSkeleton />
              </div>
            </div>
          }
        >
          <FilmSlate />
        </Suspense>
      </section>

      {/* UPGRADED "THE HOUSE" SECTION */}
      {/* UNCONSTRAINED: Removed tight max-w-6xl wrapper, replaced with edge-to-edge max-w-[1920px] */}
      <section className="w-full bg-[#EBEBE8] border-t border-black/20 py-32 px-6 lg:px-12 xl:px-24">
        <div className="w-full max-w-[1920px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 xl:gap-24 items-start">
            
            {/* Editorial Statement */}
            <div className="lg:col-span-5 xl:col-span-4 border-l-2 border-[#111] pl-8">
              <h2 className="text-4xl font-serif mb-8 text-[#111] tracking-tight">The Philosophy</h2>
              <p className="text-lg text-gray-700 font-serif leading-relaxed mb-6">
                We are an independent, studio-adjacent house dedicated exclusively to the art of the launch. 
              </p>
              <p className="text-sm text-gray-600 font-sans leading-relaxed">
                In an era of endless streaming feeds and digital noise, we believe that cinema still demands reverence. 
                From exclusive red-carpet premieres to highly calibrated global campaigns, we ensure that every 
                film we touch becomes a cultural event—a moment in time that cannot be scrolled past.
              </p>
            </div>

            {/* Services Grid */}
            <div className="lg:col-span-7 xl:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-x-12 xl:gap-x-20 gap-y-16">
              <div className="border-t border-black/20 pt-6">
                <span className="text-[10px] uppercase tracking-widest text-gray-400 font-sans block mb-3">Service 01</span>
                <h3 className="text-2xl font-serif mb-3 text-[#111]">Premieres</h3>
                <p className="text-gray-600 text-sm font-sans leading-relaxed">
                  Bespoke, physical events that capture the world's attention with timeless elegance. We handle venue curation, guestlists, and red-carpet execution.
                </p>
              </div>
              
              <div className="border-t border-black/20 pt-6">
                <span className="text-[10px] uppercase tracking-widest text-gray-400 font-sans block mb-3">Service 02</span>
                <h3 className="text-2xl font-serif mb-3 text-[#111]">Campaigns</h3>
                <p className="text-gray-600 text-sm font-sans leading-relaxed">
                  Striking physical and digital marketing that builds relentless anticipation. We create trailers, posters, and print media that demand to be seen.
                </p>
              </div>

              <div className="border-t border-black/20 pt-6 md:col-span-2">
                <span className="text-[10px] uppercase tracking-widest text-gray-400 font-sans block mb-3">Service 03</span>
                <h3 className="text-2xl font-serif mb-3 text-[#111]">Press & Editorial</h3>
                <p className="text-gray-600 text-sm font-sans leading-relaxed max-w-2xl xl:max-w-4xl">
                  Curated editorial coverage and highly-controlled talent access. We secure features in the world's most prestigious publications, framing our filmmakers as modern auteurs.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      <Newsletter />
    </main>
  );
}