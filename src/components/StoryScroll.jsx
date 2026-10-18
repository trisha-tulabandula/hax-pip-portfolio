// src/components/StoryScroll.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';

export default function StoryScroll() {
  const scenes = [
    {
      time: '17:17 IST',
      emoji: '🍵',
      title: '1. The Twilight Yawn',
      story: 'The nursery clock chimed 17:17. Pip opened his eyes—two warm amber pinpricks in the quiet dusk. In his velvet-lined cloud cradle, he brewed a thimble of chamomile stardust tea and polished his nightcap star until it sparkled.',
      highlight: 'Every sweet dream starts with a rested dreamer.'
    },
    {
      time: '21:00 IST',
      emoji: '🎵',
      title: '2. Gathering Stardust & Harmonics',
      story: 'In the Lullaby Lab, Pip tuned every brass chime. He caught fallen star sparks in porcelain jars, blending lavender dew drops with pentatonic notes so the melodies would land gently on sleeping ears.',
      highlight: 'Never too loud. Just a gentle hush.'
    },
    {
      time: '02:00 IST',
      emoji: '☁️',
      title: '3. Midnight Rooftop Flight',
      story: 'Soaring above the quiet chimney pots, Pip slipped dreams through open bedroom windows. Little ghost babies and bunnies curled into deep slumber under soft blankets as Pip watched from the moonlit sky.',
      highlight: 'Sleep tight, little creatures. Pip is watching.'
    }
  ];

  return (
    <section id="story" className="py-20 bg-[#fff8f1] dark:bg-[#1e1b2e] transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#a34063]/10 border border-[#a34063]/25 mb-4 font-mono text-xs uppercase font-semibold text-[#a34063] dark:text-[#f4729b]">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Origin Story · What Pip’s Story Is</span>
          </div>
          <h2 className="font-['Newsreader',serif] text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#3d2727] dark:text-[#f5eff2] mb-3">
            Pip’s Bedtime Journey
          </h2>
          <p className="text-base sm:text-lg text-[#7d5a5a] dark:text-[#9aa4be] font-['Newsreader',serif]">
            A 3-act scroll journey through the quiet hours of Midnight Nursery.
          </p>
        </div>

        {/* Scroll Scene Cards */}
        <div className="space-y-10">
          {scenes.map((scene, idx) => (
            <motion.div
              key={scene.title}
              className="relative bg-white dark:bg-[#28233d] border border-[#f2decb] dark:border-[#3d3257] rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row gap-6 items-start hover:shadow-md transition-shadow"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
            >
              {/* Badge & Emoji */}
              <div className="flex sm:flex-col items-center gap-3 shrink-0">
                <span className="w-14 h-14 rounded-2xl bg-[#fff8f1] dark:bg-[#1e1b2e] border border-[#f2decb] dark:border-[#3d3257] flex items-center justify-center text-3xl shadow-inner">
                  {scene.emoji}
                </span>
                <span className="font-mono text-xs font-bold text-[#a34063] dark:text-[#f4729b] bg-[#a34063]/10 px-2 py-0.5 rounded-md">
                  {scene.time}
                </span>
              </div>

              {/* Story Content */}
              <div className="flex-1">
                <h3 className="font-['Fredoka',sans-serif] text-xl font-bold text-[#3d2727] dark:text-[#f5eff2] mb-2">
                  {scene.title}
                </h3>
                <p className="text-base text-[#7d5a5a] dark:text-[#9aa4be] leading-relaxed font-['Newsreader',serif] mb-3">
                  {scene.story}
                </p>
                <p className="text-xs font-mono italic text-[#a34063] dark:text-[#f4729b]">
                  ✦ {scene.highlight}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
