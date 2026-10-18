// src/components/Navbar.jsx
import React from 'react';
import { Volume2, VolumeX, Moon, Sun, Sparkles } from 'lucide-react';
import { sound } from './SoundSystem';

export default function Navbar({ isNight, onToggleTheme, isMuted, onToggleMute }) {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md border-b transition-colors duration-300 bg-[#fff8f1]/90 dark:bg-[#1e1b2e]/90 border-[#f2decb] dark:border-[#2e2642]">
      <div className="max-w-6xl mx-auto px-6 py-3.5 flex items-center justify-between gap-4">
        
        {/* Brand */}
        <a href="#hero" className="flex items-center gap-2.5 text-inherit no-underline group">
          <div className="w-9 h-9 rounded-full bg-white dark:bg-[#28233d] border-2 border-[#a34063] dark:border-[#f4729b] flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
            <span className="text-lg">💀</span>
          </div>
          <div className="flex flex-col">
            <span className="font-['Fredoka',sans-serif] font-bold text-lg leading-tight text-[#3d2727] dark:text-[#f5eff2]">
              Pip<span className="text-[#a34063] dark:text-[#f4729b]">.</span>baby
            </span>
            <span className="font-mono text-[10px] tracking-wider uppercase text-[#a34063] dark:text-[#f4729b] font-semibold">
              Junior Dream Engineer
            </span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-6 font-['Fredoka',sans-serif] text-sm font-medium text-[#7d5a5a] dark:text-[#9aa4be]">
          <a href="#about" className="hover:text-[#a34063] dark:hover:text-[#f4729b] transition-colors">About Pip</a>
          <a href="#projects" className="hover:text-[#a34063] dark:hover:text-[#f4729b] transition-colors">Inventions</a>
          <a href="#story" className="hover:text-[#a34063] dark:hover:text-[#f4729b] transition-colors">Bedtime Story</a>
          <a href="#guestbook" className="hover:text-[#a34063] dark:hover:text-[#f4729b] transition-colors">Dream Wall</a>
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2.5">
          {/* Mute Toggle Button */}
          <button
            onClick={() => {
              onToggleMute();
              sound.playPop();
            }}
            aria-label="Toggle Sound Effects"
            aria-pressed={!isMuted}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border text-xs font-['Fredoka',sans-serif] font-semibold shadow-sm transition-all bg-white dark:bg-[#28233d] border-[#f2decb] dark:border-[#3d3257] text-[#3d2727] dark:text-[#f5eff2] hover:border-[#a34063] dark:hover:border-[#f4729b] active:scale-95"
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5 text-[#a34063] dark:text-[#f4729b]" /> : <Volume2 className="w-3.5 h-3.5 text-emerald-500" />}
            <span>{isMuted ? 'Sound Off' : 'Sound On'}</span>
          </button>

          {/* Day / Night Theme Switcher */}
          <button
            onClick={() => {
              onToggleTheme();
              sound.playBell(isNight ? 523.25 : 440);
            }}
            aria-label="Toggle Dream Theme"
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border text-xs font-['Fredoka',sans-serif] font-semibold shadow-sm transition-all bg-white dark:bg-[#28233d] border-[#f2decb] dark:border-[#3d3257] text-[#3d2727] dark:text-[#f5eff2] hover:border-[#a34063] dark:hover:border-[#f4729b] active:scale-95"
          >
            {isNight ? <Sun className="w-3.5 h-3.5 text-[#ffd166]" /> : <Moon className="w-3.5 h-3.5 text-[#a34063]" />}
            <span>{isNight ? 'Daylight' : 'Dream Mode'}</span>
          </button>
        </div>

      </div>
    </header>
  );
}
