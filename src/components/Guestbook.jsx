// src/components/Guestbook.jsx
import React, { useState, useEffect } from 'react';
import { MessageSquare, Pin } from 'lucide-react';
import { sound } from './SoundSystem';

export default function Guestbook() {
  const defaultWishes = [
    { name: 'Luna (Ghost)', wish: 'May my midnight blankets stay soft and warm in the attic breeze! 👻', color: 'bg-[#ffd6df]' },
    { name: 'Bramble (Bunny)', wish: 'Thank you Pip for the carrot island cloud dream! 🥕', color: 'bg-[#fff3c4]' },
    { name: 'Hardik (haX)', wish: 'Good things start small. Keep building with early-web soul! ✨', color: 'bg-[#d3f9d8]' },
    { name: 'Pip (Engineer)', wish: 'Heehee! Welcome everyone to my dream wall. Sleep tight! 💀', color: 'bg-[#d0ebff]' }
  ];

  const [wishes, setWishes] = useState([]);
  const [authorName, setAuthorName] = useState('');
  const [wishText, setWishText] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('pip_react_wishes');
    if (saved) {
      try {
        setWishes(JSON.parse(saved));
      } catch (e) {
        setWishes(defaultWishes);
      }
    } else {
      setWishes(defaultWishes);
    }
  }, []);

  const handleAddWish = (e) => {
    e.preventDefault();
    if (!authorName.trim() || !wishText.trim()) return;

    const colors = ['bg-[#ffd6df]', 'bg-[#fff3c4]', 'bg-[#d3f9d8]', 'bg-[#d0ebff]', 'bg-[#fbcfe8]'];
    const chosenColor = colors[Math.floor(Math.random() * colors.length)];

    const newWish = {
      name: authorName.trim(),
      wish: wishText.trim(),
      color: chosenColor
    };

    const updated = [newWish, ...wishes];
    setWishes(updated);
    localStorage.setItem('pip_react_wishes', JSON.stringify(updated));

    setAuthorName('');
    setWishText('');
    sound.playBell(783.99); // G5 note
  };

  return (
    <section id="guestbook" className="py-20 bg-[#fcf1e6] dark:bg-[#151221] transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#a34063]/10 border border-[#a34063]/25 mb-4 font-mono text-xs uppercase font-semibold text-[#a34063] dark:text-[#f4729b]">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Bonus Side Quest (+2 pts) · Live Guestbook</span>
          </div>
          <h2 className="font-['Newsreader',serif] text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#3d2727] dark:text-[#f5eff2] mb-3">
            Leave a Bedtime Wish for Pip
          </h2>
          <p className="text-base sm:text-lg text-[#7d5a5a] dark:text-[#9aa4be] font-['Newsreader',serif]">
            Pin a gentle note to Pip’s corkboard wall. Your message stays pinned whenever you return.
          </p>
        </div>

        {/* Input Form */}
        <form onSubmit={handleAddWish} className="flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto mb-12">
          <input
            type="text"
            placeholder="Your name or creature (e.g. Luna the Ghost)"
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            required
            maxLength={30}
            className="flex-1 px-4 py-3 rounded-2xl border border-[#f2decb] dark:border-[#3d3257] bg-white dark:bg-[#1e1b2e] text-[#3d2727] dark:text-[#f5eff2] font-['Newsreader',serif] text-sm focus:outline-none focus:border-[#a34063]"
          />
          <input
            type="text"
            placeholder="Your bedtime wish for Pip..."
            value={wishText}
            onChange={(e) => setWishText(e.target.value)}
            required
            maxLength={75}
            className="flex-1 px-4 py-3 rounded-2xl border border-[#f2decb] dark:border-[#3d3257] bg-white dark:bg-[#1e1b2e] text-[#3d2727] dark:text-[#f5eff2] font-['Newsreader',serif] text-sm focus:outline-none focus:border-[#a34063]"
          />
          <button
            type="submit"
            className="px-6 py-3 rounded-2xl bg-[#a34063] dark:bg-[#f4729b] text-white font-['Fredoka',sans-serif] font-semibold text-sm shadow hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <Pin className="w-4 h-4" />
            <span>Pin Wish</span>
          </button>
        </form>

        {/* Corkboard Grid with Sticky Notes */}
        <div className="bg-[#e2ba87] dark:bg-[#222b3d] border-8 border-[#b58852] dark:border-[#323e57] rounded-3xl p-6 sm:p-8 shadow-2xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
            {wishes.slice(0, 8).map((w, index) => {
              const tilt = ((index * 3) % 7) - 3; // -3 to +3 deg
              return (
                <div
                  key={index}
                  style={{ transform: `rotate(${tilt}deg)` }}
                  className={`relative p-5 rounded-md shadow-md text-[#3b281b] transition-transform hover:scale-105 hover:rotate-0 hover:z-10 ${w.color || 'bg-[#fff3c4]'}`}
                >
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-sm filter drop-shadow">
                    📌
                  </span>
                  <h4 className="font-['Fredoka',sans-serif] font-bold text-xs mb-1 text-[#2b1d16]">
                    {w.name}
                  </h4>
                  <p className="font-['Newsreader',serif] text-sm leading-relaxed text-[#3d2727]">
                    “{w.wish}”
                  </p>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
