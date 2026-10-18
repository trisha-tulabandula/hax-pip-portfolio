// src/components/SparkleCursor.jsx
import React, { useEffect, useRef } from 'react';

export default function SparkleCursor() {
  const lastSpawn = useRef(0);

  useEffect(() => {
    const sparkles = ['✨', '⭐', '☁️', '💤', '★', '✦'];

    const handlePointer = (e) => {
      const x = e.clientX || (e.touches && e.touches[0]?.clientX);
      const y = e.clientY || (e.touches && e.touches[0]?.clientY);
      if (!x || !y) return;

      const now = Date.now();
      if (now - lastSpawn.current < 55) return;
      lastSpawn.current = now;

      const el = document.createElement('span');
      el.className = 'fixed pointer-events-none text-base z-[9999] select-none animate-sparkle';
      el.textContent = sparkles[Math.floor(Math.random() * sparkles.length)];
      el.style.left = `${x}px`;
      el.style.top = `${y}px`;

      document.body.appendChild(el);
      setTimeout(() => el.remove(), 800);
    };

    window.addEventListener('mousemove', handlePointer);
    window.addEventListener('touchmove', handlePointer);

    return () => {
      window.removeEventListener('mousemove', handlePointer);
      window.removeEventListener('touchmove', handlePointer);
    };
  }, []);

  return null;
}
