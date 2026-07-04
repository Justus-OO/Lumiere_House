import { Film } from './types';

// 1. URL Normalization: Safely handle trailing slashes in env variables
const API_URL = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api').replace(/\/$/, '');

/**
 * A custom fetch wrapper that forces a timeout.
 * Native fetch will hang indefinitely if the API server stalls, which takes down your Next.js SSR.
 */
async function fetchWithTimeout(
  resource: string, 
  options: RequestInit & { timeout?: number } = {}
) {
  const { timeout = 8000, ...fetchOptions } = options; // 8-second strict timeout
  
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  
  const response = await fetch(resource, {
    ...fetchOptions,
    signal: controller.signal
  });
  
  clearTimeout(id);
  return response;
}

export async function getUpcomingFilms(): Promise<Film[]> {
  try {
    const res = await fetchWithTimeout(`${API_URL}/films`, {
      // 2. Cache Tagging: Instead of just time-based revalidation, we tag the cache.
      // This allows you to set up a Laravel Webhook later to instantly clear this cache 
      // ONLY when a film is updated (On-Demand ISR).
      next: { 
        tags: ['films-collection'],
        revalidate: 3600 // Fallback: Check every hour if no webhook is fired
      }
    });
    
    if (!res.ok) {
      throw new Error(`API Error: ${res.status} ${res.statusText}`);
    }
    
    const json = await res.json();
    return json.data || []; 
    
  } catch (error: any) {
    // 3. Graceful Degradation: Log the error for monitoring, but return an empty array 
    // so your UI's Suspense boundary can gracefully show the "Archives Sealed" state 
    // instead of throwing a 500 Server Error to the user.
    console.error('[Lumiere API] Failed to fetch upcoming slate:', error.message || error);
    return []; 
  }
}

export async function getFilmBySlug(slug: string): Promise<Film> {
  try {
    const res = await fetchWithTimeout(`${API_URL}/films/${slug}`, {
      next: { 
        tags: [`film-${slug}`], 
        revalidate: 3600 
      }
    });
    
    if (!res.ok) {
      // Differentiate between a 404 (Not Found) and a 500 (Server Down)
      if (res.status === 404) {
        throw new Error('FILM_NOT_FOUND');
      }
      throw new Error(`API Error: ${res.status} ${res.statusText}`);
    }
    
    const json = await res.json();
    return json.data;
    
  } catch (error: any) {
    console.error(`[Lumiere API] Failed to fetch film (${slug}):`, error.message || error);
    // Rethrowing here is intentional so `page.tsx` can catch it and trigger `notFound()`
    throw error; 
  }
}