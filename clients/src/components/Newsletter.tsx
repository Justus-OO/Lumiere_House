'use client';

import { useState, useRef } from 'react';
import { subscribeToNewsletter } from '@/features/newsletter/api';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error' | 'validation_error'>('idle');
  const [message, setMessage] = useState('');
  
  // Honeypot ref for spam bot protection
  const honeypotRef = useRef<HTMLInputElement>(null);

  // Strict email validation regex
  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // 1. Honeypot Check: If a bot filled out this hidden field, silently reject.
    if (honeypotRef.current && honeypotRef.current.value !== '') {
      setStatus('error');
      setMessage('Submission rejected by automated security.');
      return;
    }

    // 2. Client-Side Validation
    if (!isValidEmail(email)) {
      setStatus('validation_error');
      setMessage('Please enter a valid email address.');
      return;
    }

    if (!consent) {
      setStatus('validation_error');
      setMessage('You must agree to the House terms to join the registry.');
      return;
    }

    // 3. API Submission
    setStatus('loading');
    try {
      const res = await subscribeToNewsletter(email);
      setStatus('success');
      setMessage(res.message || 'Successfully added to the registry.');
      setEmail('');
      setConsent(false);
    } catch (err: any) {
      setStatus('error');
      setMessage(err.message || 'Failed to subscribe. You may already be registered.');
    }
  };

  return (
    <section className="border-y border-black/20 bg-[#F9F9F6] py-24 px-6 relative overflow-hidden">
      {/* Subtle structural background lines for the editorial feel */}
      <div className="absolute inset-0 pointer-events-none flex justify-center opacity-10">
        <div className="w-full max-w-7xl border-x border-black h-full"></div>
      </div>

      <div className="max-w-xl mx-auto text-center relative z-10">
        <h2 className="text-4xl font-serif text-[#111] mb-4">The Registry</h2>
        <p className="text-gray-600 font-serif mb-10 text-lg">
          Join our exclusive ledger for private screening invites, early access to dossiers, and premiere updates.
        </p>
        
        <form onSubmit={handleSubmit} className="relative flex flex-col gap-6 text-left" noValidate>
          
          {/* Honeypot Field (Hidden from real users, visible to screenreader bots) */}
          <div className="absolute left-[-9999px]" aria-hidden="true">
            <label htmlFor="website_url">Leave this field blank if you are human</label>
            <input 
              ref={honeypotRef}
              type="text" 
              id="website_url" 
              name="website_url" 
              tabIndex={-1} 
              autoComplete="off" 
            />
          </div>

          {/* Email Input Group */}
          <div className="flex flex-col sm:flex-row gap-0 w-full shadow-sm">
            <input
              type="email"
              id="registry_email"
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (status === 'validation_error') setStatus('idle'); // Clear error on typing
              }}
              placeholder="Enter your email address"
              aria-invalid={status === 'validation_error' || status === 'error'}
              aria-describedby="registry_feedback"
              className="flex-1 bg-white border border-black/20 text-[#111] px-6 py-4 focus:outline-none focus:border-black transition-colors placeholder:text-gray-400 font-sans"
            />
            <button
              type="submit"
              disabled={status === 'loading' || status === 'success'}
              className="bg-[#111] text-white px-10 py-4 uppercase tracking-widest text-xs font-sans font-medium hover:bg-gray-800 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed border border-[#111]"
            >
              {status === 'loading' ? 'Processing...' : status === 'success' ? 'Accepted' : 'Inquire'}
            </button>
          </div>

          {/* GDPR / Terms Consent Checkbox */}
          <div className="flex items-start gap-3 mt-2">
            <div className="relative flex items-center mt-1">
              <input
                type="checkbox"
                id="consent"
                checked={consent}
                onChange={(e) => {
                  setConsent(e.target.checked);
                  if (status === 'validation_error') setStatus('idle');
                }}
                className="peer appearance-none w-4 h-4 border border-black/30 checked:bg-[#111] checked:border-[#111] cursor-pointer transition-colors focus:ring-2 focus:ring-black focus:ring-offset-2 focus:ring-offset-[#F9F9F6]"
              />
              <svg 
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 pointer-events-none opacity-0 peer-checked:opacity-100 text-white transition-opacity" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor" 
                strokeWidth={3}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <label htmlFor="consent" className="text-xs text-gray-500 font-sans leading-relaxed cursor-pointer select-none">
              I agree to receive communications from Lumiere House. I understand that my data will be handled in accordance with the House Privacy Policy and that I may withdraw my inquiry at any time.
            </label>
          </div>
        </form>
        
        {/* Accessible Live Region for Feedback Messages */}
        <div 
          id="registry_feedback"
          aria-live="polite" 
          className="min-h-[2rem] mt-6"
        >
          {status === 'success' && (
            <p className="text-sm text-[#111] font-serif font-medium animate-fade-in">
              {message}
            </p>
          )}
          {(status === 'error' || status === 'validation_error') && (
            <p className="text-sm text-red-700 font-serif animate-fade-in border-l-2 border-red-700 pl-3 inline-block">
              {message}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}