// src/App.jsx
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import StoryScroll from './components/StoryScroll';
import Guestbook from './components/Guestbook';
import SparkleCursor from './components/SparkleCursor';
import CharacterSheetModal from './components/CharacterSheetModal';
import { sound } from './components/SoundSystem';

export default function App() {
  const [isNight, setIsNight] = useState(false);
  const [isMuted, setIsMuted] = useState(sound.isMuted);
  const [isBioModalOpen, setIsBioModalOpen] = useState(false);

  const handleToggleTheme = () => {
    setIsNight(prev => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      return next;
    });
  };

  const handleToggleMute = () => {
    const nextMuted = sound.toggleMute();
    setIsMuted(nextMuted);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isNight ? 'bg-[#0a0d14] text-[#f5eff2]' : 'bg-[#fff8f1] text-[#3d2727]'}`}>
      
      {/* Retro Sparkle Cursor Particles */}
      <SparkleCursor />

      {/* Marquee Top Banner */}
      <div className="bg-[#a34063] dark:bg-[#281b24] text-white py-1.5 px-4 text-center font-['Fredoka',sans-serif] text-xs font-medium tracking-wide">
        ✨ <strong>haX.baby Hackathon #001</strong> · Baby’s First Website (17–19 Oct 2026) · Track 1: Pip the Skull Baby
      </div>

      {/* Navigation Bar */}
      <Navbar 
        isNight={isNight} 
        onToggleTheme={handleToggleTheme}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
      />

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <Hero 
          onOpenBioModal={() => setIsBioModalOpen(true)}
        />

        {/* 3 Showcase Projects */}
        <Projects />

        {/* Origin Story Scroll */}
        <StoryScroll />

        {/* Live Guestbook Wall */}
        <Guestbook />
      </main>

      {/* Early-Web Footer */}
      <footer className="border-t border-[#f2decb] dark:border-[#2e2642] py-12 px-6 bg-white/50 dark:bg-[#151221]/50 text-center font-['Newsreader',serif] text-sm text-[#7d5a5a] dark:text-[#9aa4be]">
        <div className="max-w-4xl mx-auto space-y-3">
          <p className="font-['Fredoka',sans-serif] text-base font-bold text-[#a34063] dark:text-[#f4729b]">
            Pip the Skull Baby · Junior Dream Engineer
          </p>
          <p className="italic">
            “Good things start small.” — Official entry for haX.baby 48-Hour Hackathon 2026.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-xs font-mono pt-2 text-[#a34063] dark:text-[#f4729b]">
            <span>✅ Live Guestbook (+2 pts)</span>
            <span>✅ Sparkle Cursor (+2 pts)</span>
            <span>✅ Odometer Ticker (+1 pt)</span>
            <span>✅ Web Audio + Mute (+3 pts)</span>
            <span>✅ Chaos Mode Ready (+5 pts)</span>
          </div>
          <p className="text-xs pt-4 text-[#7d5a5a]/70 dark:text-[#9aa4be]/70">
            Made with curiosity for haX.baby · 2026. Zero external audio dependencies.
          </p>
        </div>
      </footer>

      {/* Character Sheet Modal */}
      <CharacterSheetModal 
        isOpen={isBioModalOpen}
        onClose={() => setIsBioModalOpen(false)}
      />

    </div>
  );
}
