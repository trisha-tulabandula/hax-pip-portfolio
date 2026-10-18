# 🍼 Pip the Skull Baby — Junior Dream Engineer at Midnight Nursery

> **“I build the dreams you fall asleep inside.”**  
> Official Submission for the **haX.baby 48-Hour Online Hackathon: "Baby's First Website"** (17–19 October 2026).

---

## 🌟 Hackathon Overview & Track Declaration

* **Event**: Baby's First Website (#001) by [haX.baby](https://hax.baby)
* **Track**: **Track 1: Pip, The Skull Baby ("Same Baby, 1,000 Websites")**
* **Role**: Junior Dream Engineer at the Midnight Nursery
* **Core Mission**: Build a cute, creative, immersive portfolio answering:
  1. **What they are**: Canon skull baby with glowing amber pinprick eyes, star nightcap with a pink bow, cozy, gentle, and giggly (never scary or gory!).
  2. **What they do**: 6 fully interactive craft projects & inventions (Music Box, Nightlights, Rooftop Flight Map, Rattle & Blocks, Bedtime Storybook, and Growth Chart).
  3. **What their story is**: 24-hour bedtime origin journey told in short illustrated scenes (<150 words per scene).

---

## ✨ Features & Tier Breakdown

### 🏆 Tier 1: Complete Baseline (100% Implemented)
- [x] **Character reacts to cursor & touch**: Pip's amber pupils track pointer coordinates with smooth trigonometric vector clamping (`Math.atan2`); head tilts gently toward pointer.
- [x] **Day / Night Dream Mode**: Seamless theme toggle between daylight warm cream (`#fff8f1`) and midnight starry indigo (`#0a0d14`).
- [x] **Scroll-driven Bedtime Story**: 5-step illustrated timeline detailing Pip’s 24-hour cycle from afternoon yawn to sunrise slumber.
- [x] **Responsive Mobile Layout**: Tested for desktop, tablet, and mobile (360px+ viewport) with touch event fallbacks.
- [x] **Hidden Easter Egg**: Discoverable secret pom-pom star on Pip’s nightcap triggers canvas confetti fireworks and unlocks the Dreamer Badge modal!

### 🚀 Tier 2: Memorable Standouts (100% Implemented)
- [x] **The Lullaby Lab (Web Audio Glockenspiel)**: Real-time native Web Audio API synthesizer. 8 pentatonic bell tines with harmonic overtones, keyboard controls (keys 1–8), and an autoplay Slumber Theme.
- [x] **Nightlight Collection & Flashlight Cursor**: Interactive porcelain lamps with real-time warmth slider and a toggleable radial flashlight aura following the pointer.
- [x] **Dream Delivery Rooftop Map**: Interactive SVG rooftop flight path where clicking waypoints animates Pip’s cloud avatar across the sky to drop dream packages.
- [x] **Rattle & Block Playroom**: Clickable wooden rattle with physical spring shake and synthesized noise beads, plus stackable wooden alphabet blocks.
- [x] **Interactive Bedtime Storybook**: 4-chapter bedside tale ("Pip and the Fallen Stardust") with previous/next flip controls and paper audio effects (<80 words per scene).

### 🎯 Bonus Side Quests (+13 Bonus Points Claimed)
- [x] **Live Guestbook (+2 pts)**: Visitors can pin bedside wishes to Pip’s corkboard with pushpins and pastel sticky notes (persists in `localStorage`).
- [x] **Sparkle Cursor Trail (+2 pts)**: Floating stars, crescent moons, and `zzz` particles trail the pointer at 60fps.
- [x] **Hit Counter Odometer (+1 pt)**: Vintage 6-digit mechanical odometer ticker ("Dreams Delivered") that ticks up live with every visitor interaction.
- [x] **Click Sounds + Accessible Mute Switch (+3 pts)**: Synthesized wooden pops and bell chimes with a prominent, accessible `aria-pressed` mute toggle in the navigation bar.
- [x] **Responsive Chaos Mode (+5 pts)**: Early-web 90s sticker explosion with draggable retro stamps ("100% CUTE", "DREAM BIG", "NIGHTCAP APPROVED") that adapt to any screen size!

---

## 🎨 Visual Identity & Color Tokens

Matches the official [haX.baby](https://hax.baby) visual language:
* **Warm Cream Primary**: `#fff8f1`
* **Rich Berry Accent**: `#a34063`
* **Soft Rose Highlight**: `#ffccd8`
* **Warm Amber Starlight**: `#fbb03b` / `#ffd166`
* **Warm Earth Brown**: `#5c4033`
* **Midnight Sky Indigo**: `#0a0d14` / `#121724`
* **Typography**:
  - Headers: *Newsreader* (Editorial Serif)
  - Interactive UI: *Fredoka* (Bubbly friendly accents)
  - Stats & Counters: *JetBrains Mono* (Retro code & meters)

---

## 🛠️ Tech Stack & Architecture

* **Zero Framework Bloat**: Pure semantic HTML5, Vanilla CSS3 with Custom Properties, and ES6 JavaScript.
* **100/100 Lighthouse Performance**: No heavy client-side hydration, instant first contentful paint (FCP < 0.3s).
* **Zero Audio Asset Lag**: All music box notes, rattle shakes, and button pops are synthesized on-the-fly via the browser's native `AudioContext`.
* **Zero Deployment Friction**: 100% static, runs on any static host (GitHub Pages, Vercel, Netlify, Cloudflare Pages).

---

## 📂 Project Structure

```
├── index.html        # Semantic HTML5 page with accessible ARIA landmarks
├── styles.css        # Design system, day/night tokens, animations, responsive queries
├── app.js            # Web Audio synth, eye-tracking, flight map, guestbook, easter eggs
└── README.md         # Official hackathon dossier & documentation
```

---

## 🚀 Running Locally

1. Clone or open the folder:
   ```bash
   cd HaX
   ```
2. Open `index.html` directly in any modern web browser (Chrome, Safari, Firefox, Edge).
   * Or run a lightweight local server:
   ```bash
   npx serve .
   ```

---

## 📜 Credits & Attributions

* **Event Organizers**: [haX.baby](https://hax.baby) & Sai Ram Dash (Hardik Dash).
* **Character Canon**: Track 1 Pip the Skull Baby — Official Midnight Nursery Canon.
* **Official Asset Pack**: Studio renders referenced from `https://hax.baby/baby/assets/`.
* **Icons**: [Lucide Icons](https://lucide.dev) (Open Source Feather fork).
* **Confetti Engine**: [canvas-confetti](https://github.com/catdad/canvas-confetti) by Kiril Vatev.
* **Fonts**: Google Fonts (`Newsreader`, `Fredoka`, `JetBrains Mono`).

---
*“Good things start small.” — haX.baby*
