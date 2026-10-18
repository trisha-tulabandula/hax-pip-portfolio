// src/components/Hero.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Music, IdCard, CloudMoon } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from './SoundSystem';

export default function Hero({ onOpenBioModal, onTriggerEasterEgg }) {
  const [clickCount, setClickCount] = useState(0);
  const [speechText, setSpeechText] = useState('“Heehee! Click my star pom-pom for a surprise! ✨”');
  const [dreamsDelivered, setDreamsDelivered] = useState(1482);

  const handleStarClick = () => {
    const nextCount = clickCount + 1;
    setClickCount(nextCount);
    sound.playBell(440 + nextCount * 80);

    if (nextCount === 1) {
      setSpeechText('“Teehee! My nightcap star is super ticklish!”');
    } else if (nextCount === 2) {
      setSpeechText('“Almost woke me up! Just 1 more click... ⭐”');
    } else if (nextCount >= 3) {
      setClickCount(0);
      sound.playFanfare();
      if (typeof confetti === 'function') {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.4 },
          colors: ['#a34063', '#ffd166', '#ffccd8', '#00ffcc', '#ffffff']
        });
      }
      setSpeechText('“🌟 YAHOO! You unlocked the Certified Dreamer Badge!”');
      setDreamsDelivered(prev => prev + 10);
      if (onTriggerEasterEgg) onTriggerEasterEgg();
    }
  };

  const formattedDreams = dreamsDelivered.toString().padStart(6, '0');

  return (
    <section id="hero" className="relative z-10 max-w-6xl mx-auto px-6 pt-12 pb-20">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Column: Hero Pitch & Answers to "What Pip Is" */}
        <motion.div 
          className="lg:col-span-7 flex flex-col items-start"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Eyebrow status pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#a34063]/10 border border-[#a34063]/25 mb-5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_#10b981]"></span>
            <span className="font-['Fredoka',sans-serif] text-xs font-semibold text-[#a34063] dark:text-[#f4729b]">
              Nursery Status: Active Shift
            </span>
            <span className="font-mono text-[11px] text-[#7d5a5a] dark:text-[#9aa4be] border-l border-[#f2decb] dark:border-[#3d3257] pl-2">
              17:17 IST
            </span>
          </div>

          <h1 className="font-['Newsreader',serif] text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-[#3d2727] dark:text-[#f5eff2] leading-[1.12] mb-5">
            I build the <span className="italic text-[#a34063] dark:text-[#f4729b] relative inline-block underline decoration-[#ffccd8] dark:decoration-[#a34063] decoration-wavy">dreams</span> you fall asleep inside.
          </h1>

          <p className="text-lg sm:text-xl text-[#7d5a5a] dark:text-[#9aa4be] leading-relaxed max-w-xl mb-8 font-['Newsreader',serif]">
            Hello, sleepy traveler! I’m <strong>Pip</strong>, a gentle baby with a smooth round skull face, glowing warm amber eye pinpricks, and a star nightcap. By night, I design soothing lullabies, glowing lanterns, and rooftop flight paths at the Midnight Nursery.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-3.5 mb-8">
            <a
              href="#projects"
              onClick={() => sound.playPop()}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#a34063] hover:bg-[#8f3353] dark:bg-[#f4729b] dark:hover:bg-[#ff85aa] text-white font-['Fredoka',sans-serif] font-semibold text-sm shadow-md transition-all hover:-translate-y-0.5 active:translate-y-0"
            >
              <Sparkles className="w-4 h-4" />
              <span>Explore Inventions</span>
            </a>

            <button
              onClick={() => {
                sound.playBell(523.25);
                setDreamsDelivered(prev => prev + 1);
              }}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white dark:bg-[#28233d] border border-[#a34063] dark:border-[#f4729b] text-[#a34063] dark:text-[#f4729b] font-['Fredoka',sans-serif] font-semibold text-sm shadow-sm transition-all hover:bg-[#a34063]/10 hover:-translate-y-0.5"
            >
              <Music className="w-4 h-4" />
              <span>Play Lullaby</span>
            </button>

            <button
              onClick={() => {
                sound.playPop();
                if (onOpenBioModal) onOpenBioModal();
              }}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white dark:bg-[#28233d] border border-[#f2decb] dark:border-[#3d3257] text-[#7d5a5a] dark:text-[#9aa4be] font-['Fredoka',sans-serif] font-semibold text-sm shadow-sm transition-all hover:border-[#a34063] hover:-translate-y-0.5"
            >
              <IdCard className="w-4 h-4 text-[#a34063] dark:text-[#f4729b]" />
              <span>Character Sheet</span>
            </button>
          </div>

          {/* Vintage Odometer Counter (+1 pt Side Quest) */}
          <div className="inline-flex flex-col gap-1.5 p-3.5 bg-white dark:bg-[#181524] border border-[#f2decb] dark:border-[#2e2642] rounded-2xl shadow-sm">
            <div className="flex items-center gap-1.5 font-mono text-[11px] font-bold tracking-wider text-[#a34063] dark:text-[#f4729b]">
              <CloudMoon className="w-3.5 h-3.5" />
              <span>LIFETIME DREAMS DELIVERED</span>
            </div>
            <div className="flex gap-1 bg-[#1e1b1b] p-1.5 rounded-lg shadow-inner w-fit font-mono font-bold text-lg text-white">
              {formattedDreams.split('').map((char, idx) => (
                <span 
                  key={idx} 
                  className={`bg-[#2b2626] px-2 py-0.5 rounded border-b-2 border-[#141111] ${idx >= 4 ? 'text-[#ffd166]' : ''}`}
                >
                  {char}
                </span>
              ))}
            </div>
            <small className="font-['Fredoka',sans-serif] text-[11px] text-[#7d5a5a] dark:text-[#9aa4be]">
              +1 dream delivered with every interaction you make!
            </small>
          </div>
        </motion.div>

        {/* Right Column: Official Pip Image with Floating Animation & Easter Egg */}
        <motion.div 
          className="lg:col-span-5 flex flex-col items-center justify-center relative"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <div className="relative w-72 sm:w-80 h-80 sm:h-96 flex items-center justify-center">
            
            {/* Background dream circle glow */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#ffccd8]/40 to-[#fbb03b]/30 dark:from-[#a34063]/30 dark:to-[#00ffcc]/20 blur-2xl animate-pulse"></div>

            {/* Official Studio Image of Pip on Cloud */}
            <motion.img
              src="https://hax.baby/baby/assets/pip_avatar_cloud.png"
              alt="Pip the Skull Baby floating on a cloud"
              className="relative z-10 w-full h-auto object-contain filter drop-shadow-2xl cursor-pointer"
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              onClick={handleStarClick}
              title="Click Pip or his star!"
            />

            {/* Interactive Easter Egg Pom-Pom Pin */}
            <button
              onClick={handleStarClick}
              className="absolute top-4 right-10 z-20 w-11 h-11 rounded-full bg-[#ffd166] text-[#2b1d16] font-bold text-lg flex items-center justify-center shadow-lg hover:scale-125 transition-transform animate-bounce"
              title="Click my star 3 times! ⭐"
              aria-label="Nightcap Star Easter Egg"
            >
              ★
            </button>
          </div>

          {/* Dynamic Pip Speech Bubble */}
          <div className="relative mt-2 px-5 py-2.5 bg-white dark:bg-[#1e1b2e] border-2 border-[#a34063] dark:border-[#f4729b] rounded-2xl shadow-md text-center max-w-xs transition-all">
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-3 h-3 bg-white dark:bg-[#1e1b2e] border-t-2 border-l-2 border-[#a34063] dark:border-[#f4729b] rotate-45"></div>
            <p className="font-['Fredoka',sans-serif] text-xs sm:text-sm font-medium text-[#a34063] dark:text-[#f4729b]">
              {speechText}
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
