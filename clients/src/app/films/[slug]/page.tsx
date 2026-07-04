import { getFilmBySlug, getUpcomingFilms } from '@/features/films/api';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import ShareButton from '@/components/ShareButton';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const film = await getFilmBySlug(slug);
    return {
      title: `${film.title} | Lumiere House`,
      description: film.logline,
      openGraph: {
        title: film.title,
        description: film.logline,
        images: [{ url: film.poster_url, width: 800, height: 1200, alt: film.title }],
        type: 'video.movie',
      },
      twitter: {
        card: 'summary_large_image',
        title: film.title,
        description: film.logline,
        images: [film.poster_url],
      },
    };
  } catch {
    return { title: 'Exhibition Not Found | Lumiere House' };
  }
}

export async function generateStaticParams() {
  try {
    const films = await getUpcomingFilms();
    return films.map((film) => ({ slug: film.slug }));
  } catch (e) {
    return [];
  }
}

export default async function FilmDetail({ params }: Props) {
  const { slug } = await params;
  
  let film;
  let allFilms;
  let nextFilm;

  try {
    // Fetch the specific film AND the full slate in parallel
    [film, allFilms] = await Promise.all([
      getFilmBySlug(slug),
      getUpcomingFilms()
    ]);

    // Feature: The Continuous Loop. Find the next film in the array to link at the bottom.
    const currentIndex = allFilms.findIndex((f) => f.slug === slug);
    nextFilm = allFilms[(currentIndex + 1) % allFilms.length];

  } catch (e) {
    notFound();
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Movie',
    name: film.title,
    image: film.poster_url,
    abstract: film.logline,
    description: film.synopsis,
    director: { '@type': 'Person', name: film.director },
    datePublished: film.release_date,
    genre: film.genre,
  };

  const formattedDate = new Date(film.release_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <main className="min-h-screen bg-[#F9F9F6] text-[#111] selection:bg-[#111] selection:text-[#F9F9F6]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="w-full max-w-[1920px] mx-auto px-6 lg:px-12 xl:px-24 py-12 md:py-24">
        
        {/* 1. TOP UTILITY HEADER */}
        <header className="mb-16 md:mb-24 flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-black/20 pb-8">
          <Link href="/" className="text-xs uppercase tracking-[0.2em] font-sans font-medium hover:text-gray-500 transition-colors flex items-center gap-2 group">
            <span className="group-hover:-translate-x-1 transition-transform">←</span> Return to Slate
          </Link>
          <div className="text-left md:text-right">
            <span className="block text-xs uppercase tracking-[0.2em] font-sans text-gray-500 mb-1">
              Exhibition No. {film.id.toString().padStart(3, '0')}
            </span>
            <span className="block text-[10px] uppercase tracking-widest font-sans text-gray-400">
              {film.genre} / Lumiere House Archives
            </span>
          </div>
        </header>

        {/* 2. CINEMATIC TITLE STAGE */}
        <div className="mb-16 md:mb-24 max-w-5xl">
          <div className="flex items-center gap-4 mb-8">
            <span className="w-16 h-[1px] bg-[#111]"></span>
            <p className="text-xs uppercase tracking-[0.2em] text-[#111] font-sans font-medium">
              Official Selection
            </p>
          </div>
          <h1 className="text-6xl md:text-8xl xl:text-[8rem] font-serif text-[#111] tracking-tighter mb-8 leading-[0.9]">
            {film.title}
          </h1>
          <blockquote className="text-2xl md:text-4xl text-gray-600 font-serif italic border-l-2 border-black/20 pl-6 md:pl-10 py-2 leading-tight">
            "{film.logline}"
          </blockquote>
        </div>

        {/* 3. DOSSIER GRID */}
        <article className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 xl:gap-32">
          
          {/* Left Column: Visuals & Data */}
          <div className="lg:col-span-5 flex flex-col gap-12">
            <figure className="aspect-[2/3] w-full relative bg-[#EBEBE8] border border-black/10 p-3 md:p-4 shadow-sm group">
              <div className="relative w-full h-full overflow-hidden">
                <Image
                  src={film.poster_url}
                  alt={`Official poster for ${film.title}`}
                  fill
                  quality={100}
                  className="object-cover transition-transform duration-[1200ms] group-hover:scale-105"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </figure>

            {/* Feature: Dynamic Status Block */}
            <div className="bg-[#111] text-[#F9F9F6] p-8 flex flex-col gap-2 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10 font-serif text-6xl">#</div>
              <h4 className="text-[10px] uppercase tracking-[0.3em] font-sans text-gray-400 mb-2">Exhibition Status</h4>
              <p className="text-xl font-serif">Premieres {formattedDate}</p>
              <p className="text-xs font-sans text-gray-400 mt-2">Private registry invites will be dispatched 14 days prior to screening.</p>
            </div>

            <div className="border-t border-black/20 pt-6">
              <h3 className="text-xs uppercase tracking-[0.2em] font-sans font-medium mb-6">Production Specifications</h3>
              <dl className="grid grid-cols-2 gap-y-6 gap-x-8 text-sm font-serif">
                <div>
                  <dt className="text-[10px] uppercase tracking-widest font-sans text-gray-500 mb-1">Director</dt>
                  <dd className="text-[#111] text-lg">{film.director}</dd>
                </div>
                <div>
                  <dt className="text-[10px] uppercase tracking-widest font-sans text-gray-500 mb-1">Format</dt>
                  <dd className="text-[#111] text-lg">Digital 4K / 35mm</dd>
                </div>
              </dl>
            </div>
          </div>

          {/* Right Column: Editorial Body */}
          <div className="lg:col-span-7 flex flex-col pt-4">
            
            {/* Feature: The Editorial Drop Cap */}
            <div className="text-lg md:text-xl xl:text-2xl text-gray-800 font-serif leading-loose mb-16 max-w-4xl 
              first-letter:text-7xl first-letter:md:text-9xl first-letter:font-serif first-letter:text-[#111] first-letter:float-left first-letter:mr-6 first-letter:mt-2 first-letter:leading-[0.8]">
              <p>{film.synopsis}</p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 border-t border-black/20 pt-12 max-w-3xl">
              <a 
                href={film.trailer_url}
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-10 py-4 bg-[#111] text-[#F9F9F6] text-xs uppercase tracking-widest font-sans font-medium hover:bg-gray-800 transition-colors border border-transparent text-center"
              >
                View Trailer
              </a>
              <ShareButton title={film.title} />
            </div>
          </div>
        </article>
      </div>

      {/* 4. FEATURE: CONTINUOUS LOOP FOOTER */}
      {nextFilm && (
        <section className="w-full border-t border-black/20 bg-[#EBEBE8] mt-24 group block cursor-pointer transition-colors hover:bg-[#E0E0DB]">
          <Link href={`/films/${nextFilm.slug}`} className="block w-full max-w-[1920px] mx-auto px-6 lg:px-12 xl:px-24 py-24 md:py-32 outline-none focus-visible:ring-4 focus-visible:ring-inset focus-visible:ring-black">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] font-sans text-gray-500 mb-6 flex items-center gap-4">
                  <span className="w-8 h-[1px] bg-gray-400"></span> Next Exhibition
                </p>
                <h2 className="text-4xl md:text-6xl font-serif text-[#111] tracking-tight group-hover:text-gray-600 transition-colors">
                  {nextFilm.title}
                </h2>
              </div>
              <div className="text-left md:text-right hidden sm:block">
                <span className="text-[10px] uppercase tracking-widest font-sans text-gray-500 block mb-2">Director</span>
                <span className="text-lg font-serif text-[#111]">{nextFilm.director}</span>
              </div>
              <div className="w-16 h-16 rounded-full border border-black/20 flex items-center justify-center group-hover:bg-[#111] group-hover:text-white group-hover:border-[#111] transition-all duration-500 shrink-0">
                →
              </div>
            </div>
          </Link>
        </section>
      )}
    </main>
  );
}