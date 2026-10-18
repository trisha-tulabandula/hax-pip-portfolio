// src/components/CharacterSheetModal.jsx
import React from 'react';
import { X, Sparkles, ShieldCheck } from 'lucide-react';
import { sound } from './SoundSystem';

export default function CharacterSheetModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="charSheetHeading"
    >
      <div className="relative w-full max-w-xl bg-white dark:bg-[#1e1b2e] border-2 border-[#a34063] dark:border-[#f4729b] rounded-3xl p-6 sm:p-8 shadow-2xl animate-scale-up text-[#3d2727] dark:text-[#f5eff2]">
        
        {/* Close button */}
        <button
          onClick={() => {
            sound.playPop();
            onClose();
          }}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
          aria-label="Close Character Sheet"
        >
          <X className="w-5 h-5 text-[#a34063] dark:text-[#f4729b]" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-5">
          <span className="text-3xl">📜</span>
          <div>
            <h3 id="charSheetHeading" className="font-['Fredoka',sans-serif] text-2xl font-bold text-[#a34063] dark:text-[#f4729b]">
              Pip’s 5-Point Character Sheet
            </h3>
            <span className="font-mono text-xs text-[#7d5a5a] dark:text-[#9aa4be] uppercase tracking-wider">
              Track 1 Canon · Midnight Nursery
            </span>
          </div>
        </div>

        {/* 5-Point Specifications */}
        <div className="space-y-4 bg-[#fff8f1] dark:bg-[#151221] p-5 rounded-2xl border border-[#f2decb] dark:border-[#2e2642] font-['Newsreader',serif] text-sm sm:text-base text-[#7d5a5a] dark:text-[#9aa4be]">
          <div>
            <strong className="block font-['Fredoka',sans-serif] text-xs uppercase font-bold text-[#a34063] dark:text-[#f4729b] mb-0.5">
              1. Name
            </strong>
            <span className="text-[#3d2727] dark:text-[#f5eff2] font-medium text-base">Pip</span>
          </div>

          <div>
            <strong className="block font-['Fredoka',sans-serif] text-xs uppercase font-bold text-[#a34063] dark:text-[#f4729b] mb-0.5">
              2. What They Are
            </strong>
            <p>
              A sleepy baby with a smooth round skull face, huge soft eye sockets with glowing warm amber pinpricks, a tiny crooked smile, and a bedtime nightcap with stars and a pink bow. (Always cozy and friendly — never scary, creepy, or gory!).
            </p>
          </div>

          <div>
            <strong className="block font-['Fredoka',sans-serif] text-xs uppercase font-bold text-[#a34063] dark:text-[#f4729b] mb-0.5">
              3. What They Do
            </strong>
            <p>
              Junior Dream Engineer at Midnight Nursery. Pip designs the dreams, lullabies, nightlights, and bedtime stories that help the neighborhood's little creatures fall asleep.
            </p>
          </div>

          <div>
            <strong className="block font-['Fredoka',sans-serif] text-xs uppercase font-bold text-[#a34063] dark:text-[#f4729b] mb-0.5">
              4. Their Story
            </strong>
            <p>
              Awakened when a baby star tumbled from the Milky Way into his cloud cradle. Pip caught the star, tuned a lullaby music box to comfort it, and became the night's gentle dream guardian.
            </p>
          </div>

          <div>
            <strong className="block font-['Fredoka',sans-serif] text-xs uppercase font-bold text-[#a34063] dark:text-[#f4729b] mb-0.5">
              5. Tagline
            </strong>
            <p className="italic font-bold text-[#a34063] dark:text-[#f4729b]">
              “I build the dreams you fall asleep inside.”
            </p>
          </div>
        </div>

        {/* Footer info */}
        <div className="mt-5 flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-xs font-mono text-emerald-600 dark:text-emerald-400">
            <ShieldCheck className="w-4 h-4" />
            <span>100% Canon Compliant</span>
          </span>
          <button
            onClick={() => {
              sound.playPop();
              onClose();
            }}
            className="px-5 py-2 rounded-full bg-[#a34063] hover:bg-[#8f3353] dark:bg-[#f4729b] text-white font-['Fredoka',sans-serif] font-semibold text-xs shadow transition-transform active:scale-95"
          >
            Close Sheet
          </button>
        </div>

      </div>
    </div>
  );
}
