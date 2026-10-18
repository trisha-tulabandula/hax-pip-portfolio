// src/components/Projects.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Square, Lightbulb, MapPin, Sparkles } from 'lucide-react';
import { sound } from './SoundSystem';

export default function Projects() {
  // Lullaby Lab State
  const [activeKey, setActiveKey] = useState(null);
  const [isPlayingMelody, setIsPlayingMelody] = useState(false);
  
  // Nightlight State
  const [activeLantern, setActiveLantern] = useState('crescent');
  const [warmthLevel, setWarmthLevel] = useState(85);

  // Rooftop Route State
  const [activeDestination, setActiveDestination] = useState('Bunny Burrow');

  const notes = [
    { label: 'C4', freq: 261.63, key: '1' },
    { label: 'D4', freq: 293.66, key: '2' },
    { label: 'E4', freq: 329.63, key: '3' },
    { label: 'G4', freq: 392.00, key: '4' },
    { label: 'A4', freq: 440.00, key: '5' },
    { label: 'C5', freq: 523.25, key: '6' },
    { label: 'D5', freq: 587.33, key: '7' },
    { label: 'E5', freq: 659.25, key: '8' },
  ];

  const handlePlayKey = (freq, label) => {
    sound.playBell(freq);
    setActiveKey(label);
    setTimeout(() => setActiveKey(null), 250);
  };

  const handleAutoMelody = () => {
    setIsPlayingMelody(true);
    const melody = [
      { freq: 261.63, label: 'C4', delay: 400 },
      { freq: 261.63, label: 'C4', delay: 400 },
      { freq: 392.00, label: 'G4', delay: 400 },
      { freq: 392.00, label: 'G4', delay: 400 },
      { freq: 440.00, label: 'A4', delay: 400 },
      { freq: 440.00, label: 'A4', delay: 400 },
      { freq: 392.00, label: 'G4', delay: 800 },
      { freq: 329.63, label: 'E4', delay: 400 },
      { freq: 329.63, label: 'E4', delay: 400 },
      { freq: 293.66, label: 'D4', delay: 400 },
      { freq: 293.66, label: 'D4', delay: 400 },
      { freq: 261.63, label: 'C4', delay: 800 },
    ];

    melody.forEach((item, idx) => {
      const cumulativeDelay = melody.slice(0, idx).reduce((acc, m) => acc + m.delay, 0);
      setTimeout(() => {
        handlePlayKey(item.freq, item.label);
        if (idx === melody.length - 1) {
          setIsPlayingMelody(false);
        }
      }, cumulativeDelay);
    });
  };

  return (
    <section id="projects" className="py-20 bg-[#fcf1e6] dark:bg-[#151221] transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="mb-14 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#a34063]/10 border border-[#a34063]/25 mb-4 font-mono text-xs uppercase font-semibold text-[#a34063] dark:text-[#f4729b]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Showcase Projects · What Pip Does</span>
          </div>
          <h2 className="font-['Newsreader',serif] text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#3d2727] dark:text-[#f5eff2] mb-3">
            The Dream Engineer’s Workshop
          </h2>
          <p className="text-base sm:text-lg text-[#7d5a5a] dark:text-[#9aa4be] font-['Newsreader',serif]">
            Every project below is interactive and alive. Test the music box, toggle the bedside lanterns, and dispatch rooftop cloud deliveries!
          </p>
        </div>

        {/* Project 1: The Lullaby Lab (Playable Glockenspiel / Music Box) */}
        <motion.article 
          className="bg-white dark:bg-[#1e1b2e] border border-[#f2decb] dark:border-[#2e2642] rounded-3xl p-6 sm:p-8 shadow-sm mb-10 transition-all hover:shadow-md"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 flex flex-col items-center sm:items-start text-center sm:text-left">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#a34063] dark:text-[#f4729b] mb-1">
                Project 01 · Tier 2 Standout
              </span>
              <h3 className="font-['Fredoka',sans-serif] text-2xl font-bold text-[#3d2727] dark:text-[#f5eff2] mb-2">
                The Lullaby Lab: Real-Time Synth
              </h3>
              <p className="text-sm sm:text-base text-[#7d5a5a] dark:text-[#9aa4be] mb-6 font-['Newsreader',serif]">
                A generative Web Audio music box synthesizing warm pentatonic bell chimes with natural acoustic decay. Tap keys or trigger auto-play!
              </p>

              {/* Official Asset Preview */}
              <div className="w-44 h-44 rounded-2xl bg-[#fff8f1] dark:bg-[#28233d] border border-[#f2decb] dark:border-[#3d3257] p-2 flex items-center justify-center mb-6 shadow-inner">
                <img 
                  src="https://hax.baby/baby/assets/pip_lullaby_box.png" 
                  alt="Official Lullaby Box Render" 
                  className="w-full h-full object-contain filter drop-shadow-md hover:scale-105 transition-transform"
                />
              </div>

              {/* Action Button */}
              <button
                onClick={handleAutoMelody}
                disabled={isPlayingMelody}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#a34063] dark:bg-[#f4729b] text-white font-['Fredoka',sans-serif] font-semibold text-xs shadow transition-all hover:scale-105 disabled:opacity-50"
              >
                <Play className="w-3.5 h-3.5" />
                <span>{isPlayingMelody ? 'Playing Lullaby...' : 'Play Pip’s Slumber Melody'}</span>
              </button>
            </div>

            {/* Interactive Music Console */}
            <div className="lg:col-span-7 bg-[#473228] border-4 border-[#2b1d16] rounded-2xl p-5 sm:p-6 shadow-2xl">
              <div className="flex justify-between items-center pb-4 mb-4 border-b border-white/20 text-white font-mono text-xs">
                <span>✦ Midnight Nursery Glockenspiel v2.4</span>
                <span className="text-[#ffd166]">Pentatonic C Major</span>
              </div>

              {/* Playable Tines Grid */}
              <div className="grid grid-cols-4 sm:grid-cols-8 gap-2 bg-[#2b1d16] p-3 rounded-xl">
                {notes.map((note) => (
                  <button
                    key={note.label}
                    onClick={() => handlePlayKey(note.freq, note.label)}
                    className={`h-28 rounded-b-lg border border-[#aa9066] flex flex-col justify-between items-center py-2 transition-all active:translate-y-2 ${
                      activeKey === note.label
                        ? 'bg-[#ffd166] translate-y-1 shadow-[0_0_14px_#ffd166]'
                        : 'bg-gradient-to-b from-[#e4d5b7] to-[#d4bc94] hover:from-[#fff3db]'
                    }`}
                  >
                    <span className="w-1.5 h-5 bg-[#aa9066] rounded-sm"></span>
                    <span className="font-mono font-bold text-xs text-[#3b281b]">{note.label}</span>
                    <span className="text-[10px] text-[#a34063]">✦</span>
                  </button>
                ))}
              </div>
              <p className="mt-3 text-center text-[11px] text-[#ffd8a8] font-['Fredoka',sans-serif]">
                💡 Click keys or press numbers 1–8 to play cozy bells!
              </p>
            </div>
          </div>
        </motion.article>

        {/* Split Grid: Project 2 (Nightlight) & Project 3 (Delivery Map) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Project 2: Nightlight Collection */}
          <motion.article 
            className="bg-white dark:bg-[#1e1b2e] border border-[#f2decb] dark:border-[#2e2642] rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col justify-between"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div>
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#a34063] dark:text-[#f4729b] mb-1 block">
                Project 02 · Tier 2 Standout
              </span>
              <h3 className="font-['Fredoka',sans-serif] text-2xl font-bold text-[#3d2727] dark:text-[#f5eff2] mb-2">
                Nightlight Collection
              </h3>
              <p className="text-sm sm:text-base text-[#7d5a5a] dark:text-[#9aa4be] mb-6 font-['Newsreader',serif]">
                Porcelain crescent lamps with brass handles and adjustable warmth sliders that soften bedroom darkness.
              </p>

              {/* Lantern Visual Stage */}
              <div className="flex flex-col sm:flex-row items-center gap-6 p-4 rounded-2xl bg-[#fff8f1] dark:bg-[#28233d] border border-[#f2decb] dark:border-[#3d3257] mb-6">
                <div className="w-32 h-32 relative flex items-center justify-center">
                  <div 
                    className="absolute inset-0 rounded-full bg-[#fbb03b] blur-xl transition-opacity duration-300"
                    style={{ opacity: warmthLevel / 100 }}
                  ></div>
                  <img 
                    src="https://hax.baby/baby/assets/pip_dream_lantern.png" 
                    alt="Dream Lantern" 
                    className="relative z-10 w-full h-full object-contain filter drop-shadow-lg"
                  />
                </div>

                <div className="flex-1 w-full flex flex-col gap-3">
                  <label className="flex justify-between font-['Fredoka',sans-serif] text-xs font-semibold text-[#3d2727] dark:text-[#f5eff2]">
                    <span>Lantern Warmth:</span>
                    <span className="text-[#a34063] dark:text-[#f4729b]">{warmthLevel}%</span>
                  </label>
                  <input 
                    type="range" 
                    min="20" 
                    max="100" 
                    value={warmthLevel} 
                    onChange={(e) => setWarmthLevel(parseInt(e.target.value, 10))}
                    className="w-full accent-[#a34063] dark:accent-[#f4729b] cursor-pointer"
                  />
                  <div className="flex gap-2">
                    {['crescent', 'firefly', 'star'].map((type) => (
                      <button
                        key={type}
                        onClick={() => {
                          setActiveLantern(type);
                          sound.playBell(659.25, 0.8);
                        }}
                        className={`flex-1 py-1 px-2 rounded-lg text-[11px] font-['Fredoka',sans-serif] font-medium border transition-colors ${
                          activeLantern === type 
                            ? 'bg-[#a34063] text-white border-[#a34063]' 
                            : 'bg-white dark:bg-[#1e1b2e] text-[#7d5a5a] dark:text-[#9aa4be] border-[#f2decb] dark:border-[#3d3257]'
                        }`}
                      >
                        {type.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <p className="text-xs text-[#7d5a5a] dark:text-[#9aa4be] font-['Newsreader',serif] italic">
              “Tested on over 400 sleepy creatures with zero scary shadows reported.”
            </p>
          </motion.article>

          {/* Project 3: Dream Delivery Routes */}
          <motion.article 
            className="bg-white dark:bg-[#1e1b2e] border border-[#f2decb] dark:border-[#2e2642] rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col justify-between"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div>
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#a34063] dark:text-[#f4729b] mb-1 block">
                Project 03 · Tier 2 Standout
              </span>
              <h3 className="font-['Fredoka',sans-serif] text-2xl font-bold text-[#3d2727] dark:text-[#f5eff2] mb-2">
                Dream Delivery Routes
              </h3>
              <p className="text-sm sm:text-base text-[#7d5a5a] dark:text-[#9aa4be] mb-6 font-['Newsreader',serif]">
                Interactive rooftop flight map showing wind currents, chimney smoke puffs, and bedtime delivery targets.
              </p>

              {/* Map Canvas / SVG Preview */}
              <div className="relative rounded-2xl bg-[#101420] border-2 border-[#2b354f] overflow-hidden p-4 mb-5 text-white">
                <div className="flex justify-between items-center text-xs mb-3 font-mono">
                  <span className="flex items-center gap-1.5 text-emerald-400">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                    <span>LIVE ROUTE: {activeDestination}</span>
                  </span>
                  <span className="text-[#ffd166]">Wind: 4 knots ESE</span>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {[
                    { name: 'Bunny Burrow', emoji: '🐰', package: 'Carrot Island Dream' },
                    { name: 'Ghost Attic', emoji: '👻', package: 'Warm Blanket Dream' },
                    { name: 'Bear Den', emoji: '🧸', package: 'Honey Stream Dream' },
                  ].map((dest) => (
                    <button
                      key={dest.name}
                      onClick={() => {
                        setActiveDestination(dest.name);
                        sound.playBell(587.33);
                      }}
                      className={`p-2.5 rounded-xl border flex flex-col items-center gap-1 text-center transition-all ${
                        activeDestination === dest.name
                          ? 'bg-[#a34063] border-[#f4729b] text-white scale-105'
                          : 'bg-[#181d2c] border-white/10 text-white/80 hover:bg-[#20273b]'
                      }`}
                    >
                      <span className="text-xl">{dest.emoji}</span>
                      <strong className="text-[11px] font-['Fredoka',sans-serif]">{dest.name}</strong>
                      <small className="text-[9px] opacity-75 font-mono">{dest.package}</small>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <p className="text-xs text-[#7d5a5a] dark:text-[#9aa4be] font-['Newsreader',serif] italic">
              “Pip navigates by star constellations to prevent waking light sleepers.”
            </p>
          </motion.article>

        </div>

      </div>
    </section>
  );
}
