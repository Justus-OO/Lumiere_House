'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ShareButton({ title }: { title: string }) {
  const [showToast, setShowToast] = useState(false);

  // Auto-dismiss the toast after 3 seconds
  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => setShowToast(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title, url: window.location.href });
      } catch (err: any) {
        // If the user simply closes the native share menu, don't show the error.
        // If it actually fails, fallback to the clipboard copy.
        if (err.name !== 'AbortError') {
          copyToClipboard();
        }
      }
    } else {
      // Desktop browsers without native share support default to this
      copyToClipboard();
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    setShowToast(true);
  };

  return (
    <>
      <button 
        onClick={handleShare}
        className="inline-flex items-center justify-center px-10 py-4 bg-transparent text-[#111] text-xs uppercase tracking-widest font-sans font-medium hover:bg-black/5 transition-colors border border-black/20 text-center cursor-pointer"
      >
        Share Dossier
      </button>

      {/* The Premium Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95, x: '-50%' }}
            animate={{ opacity: 1, y: 0, scale: 1, x: '-50%' }}
            exit={{ opacity: 0, y: 20, scale: 0.95, x: '-50%' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-12 left-1/2 z-[999] flex items-center gap-4 bg-[#111] text-[#F9F9F6] px-8 py-4 shadow-2xl border border-white/10"
          >
            {/* Elegant Checkmark Icon */}
            <span className="flex items-center justify-center w-5 h-5 rounded-full border border-[#F9F9F6]/30 text-[9px]">
              ✓
            </span>
            {/* Toast Text */}
            <span className="text-[10px] uppercase tracking-[0.2em] font-sans font-medium mt-[2px]">
              Link copied to clipboard
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}