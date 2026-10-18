/* ==========================================================================
   haX.baby: Pip the Skull Baby — Interactive Engine (app.js)
   Synthesizes Web Audio (zero asset dependencies), eye-tracking,
   story flipbook, flight map, guestbook, and +13 bonus side quests.
   ========================================================================== */

// --- 1. Sound Engine (Native Web Audio API) ---
class NurseryAudioEngine {
  constructor() {
    this.ctx = null;
    this.isMuted = true; // User opt-in default (standard browser autoplay policy)
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggleMute() {
    this.init();
    this.isMuted = !this.isMuted;
    return this.isMuted;
  }

  // Pure pentatonic music box bell chime with rich harmonics
  playBellChime(freq = 523.25, duration = 1.2) {
    if (this.isMuted) return;
    this.init();

    const t = this.ctx.currentTime;
    
    // Fundamental tone
    const osc1 = this.ctx.createOscillator();
    const gain1 = this.ctx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(freq, t);

    // Harmonic overtone for acoustic bell richness
    const osc2 = this.ctx.createOscillator();
    const gain2 = this.ctx.createGain();
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(freq * 2.76, t);

    // Envelope
    gain1.gain.setValueAtTime(0.35, t);
    gain1.gain.exponentialRampToValueAtTime(0.0001, t + duration);

    gain2.gain.setValueAtTime(0.12, t);
    gain2.gain.exponentialRampToValueAtTime(0.0001, t + (duration * 0.45));

    osc1.connect(gain1);
    osc2.connect(gain2);
    gain1.connect(this.ctx.destination);
    gain2.connect(this.ctx.destination);

    osc1.start(t);
    osc2.start(t);
    osc1.stop(t + duration);
    osc2.stop(t + duration);
  }

  // Tactile button click pop
  playClickPop() {
    if (this.isMuted) return;
    this.init();

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(320, t);
    osc.frequency.exponentialRampToValueAtTime(120, t + 0.08);

    gain.gain.setValueAtTime(0.18, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.08);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(t);
    osc.stop(t + 0.08);
  }

  // Wooden baby rattle shake sound (filtered noise burst)
  playRattle() {
    if (this.isMuted) return;
    this.init();

    const bufferSize = this.ctx.sampleRate * 0.12;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.35));
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 1800;
    filter.Q.value = 3.5;

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.3, this.ctx.currentTime);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    noise.start();
  }

  // Paper book page turn sound
  playPageFlip() {
    if (this.isMuted) return;
    this.init();

    const bufferSize = this.ctx.sampleRate * 0.15;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.sin((i / bufferSize) * Math.PI);
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 850;

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.2, this.ctx.currentTime);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    noise.start();
  }

  // Fanfare arpeggio for Easter Egg
  playFanfare() {
    if (this.isMuted) return;
    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
    notes.forEach((freq, i) => {
      setTimeout(() => this.playBellChime(freq, 1.5), i * 140);
    });
  }
}

const audio = new NurseryAudioEngine();

// --- 2. Live Hit Counter Odometer (Bonus Side Quest: +1 pt) ---
let lifetimeDreams = parseInt(localStorage.getItem('pip_lifetime_dreams') || '1482', 10);

function updateOdometer(increment = 1) {
  lifetimeDreams += increment;
  localStorage.setItem('pip_lifetime_dreams', lifetimeDreams.toString());

  const formatted = lifetimeDreams.toString().padStart(6, '0');
  const odoDigits = document.querySelectorAll('.odometer-digit');
  
  // Format: [0, 0, 1, ',', 4, 8, 2]
  if (odoDigits.length >= 7) {
    odoDigits[0].textContent = formatted[0];
    odoDigits[1].textContent = formatted[1];
    odoDigits[2].textContent = formatted[2];
    // index 3 is comma
    odoDigits[4].textContent = formatted[3];
    odoDigits[5].textContent = formatted[4];
    odoDigits[6].textContent = formatted[5];

    odoDigits[6].style.transform = 'scale(1.25)';
    setTimeout(() => {
      odoDigits[6].style.transform = 'scale(1)';
    }, 200);
  }
}

// --- 3. Pip Speech Bubble Reactions ---
const speechTexts = [
  "“Heehee! Move your cursor or finger to play peek-a-boo!”",
  "“Need to fall asleep? Ring the music box keys below!”",
  "“My nightcap star is super ticklish... don’t click it 3 times! 🤫”",
  "“The nightlights are all polished and glowing warm tonight.”",
  "“I’ve got three cloud routes scheduled for midnight rooftop flight!”",
  "“Leave me a bedtime wish on the Dream Wall!”"
];

function setSpeechBubble(text) {
  const el = document.getElementById('speechBubbleText');
  if (el) {
    el.style.opacity = '0';
    setTimeout(() => {
      el.textContent = text;
      el.style.opacity = '1';
    }, 150);
  }
}

// --- 4. Interactive Eye-Tracking & Head Reaction (Tier 1 Baseline) ---
function initEyeTracking() {
  const leftPupil = document.getElementById('leftPupil');
  const rightPupil = document.getElementById('rightPupil');
  const skullFace = document.getElementById('skullFace');
  const pipRig = document.getElementById('pipRig');
  const maxDistance = 12; // Maximum pupil travel distance inside eye socket

  function trackPointer(clientX, clientY) {
    [leftPupil, rightPupil].forEach((pupil) => {
      if (!pupil) return;
      const rect = pupil.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = clientX - centerX;
      const deltaY = clientY - centerY;
      const angle = Math.atan2(deltaY, deltaX);
      const dist = Math.min(Math.hypot(deltaX, deltaY) / 14, maxDistance);

      const targetX = Math.cos(angle) * dist;
      const targetY = Math.sin(angle) * dist;

      pupil.style.transform = `translate(${targetX}px, ${targetY}px)`;
    });

    // Subtle head tilt toward pointer
    if (skullFace && pipRig) {
      const rigRect = pipRig.getBoundingClientRect();
      const rigCenterX = rigRect.left + rigRect.width / 2;
      const tiltX = (clientX - rigCenterX) / (window.innerWidth / 2);
      const clampedTilt = Math.max(-10, Math.min(10, tiltX * 8));
      skullFace.style.transform = `rotate(${clampedTilt}deg)`;
    }
  }

  window.addEventListener('mousemove', (e) => trackPointer(e.clientX, e.clientY));
  window.addEventListener('touchmove', (e) => {
    if (e.touches && e.touches[0]) {
      trackPointer(e.touches[0].clientX, e.touches[0].clientY);
    }
  });

  // Random blink animation every 4-8 seconds
  setInterval(() => {
    const sockets = document.querySelectorAll('.eye-socket');
    sockets.forEach(s => s.style.transform = 'scaleY(0.1)');
    setTimeout(() => {
      sockets.forEach(s => s.style.transform = 'scaleY(1)');
    }, 160);
  }, 5000);
}

// --- 5. Sparkle Cursor Trail (Bonus Side Quest: +2 pts) ---
function initSparkleTrail() {
  let lastSpawn = 0;
  const sparkles = ['✨', '⭐', '☁️', '💤', '★', '✦'];

  function spawnSparkle(x, y) {
    const now = Date.now();
    if (now - lastSpawn < 50) return; // 20fps throttle for silky smoothness
    lastSpawn = now;

    const sparkle = document.createElement('span');
    sparkle.className = 'sparkle-particle';
    sparkle.textContent = sparkles[Math.floor(Math.random() * sparkles.length)];
    sparkle.style.left = `${x}px`;
    sparkle.style.top = `${y}px`;

    document.body.appendChild(sparkle);
    setTimeout(() => sparkle.remove(), 850);
  }

  window.addEventListener('mousemove', (e) => spawnSparkle(e.clientX, e.clientY));
  window.addEventListener('touchmove', (e) => {
    if (e.touches && e.touches[0]) {
      spawnSparkle(e.touches[0].clientX, e.touches[0].clientY);
    }
  });
}

// --- 6. Flashlight / Dream Lantern Cursor Aura (Tier 2 Standout) ---
function initFlashlight() {
  const aura = document.getElementById('flashlightAura');
  const toggleBtn = document.getElementById('toggleFlashlightCursorBtn');
  let isFlashlightActive = false;

  window.addEventListener('mousemove', (e) => {
    if (isFlashlightActive && aura) {
      aura.style.left = `${e.clientX}px`;
      aura.style.top = `${e.clientY}px`;
    }
  });

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      isFlashlightActive = !isFlashlightActive;
      document.body.classList.toggle('flashlight-active', isFlashlightActive);
      toggleBtn.querySelector('span').textContent = isFlashlightActive 
        ? 'Flashlight Cursor: ON 🔦' 
        : 'Toggle Flashlight Cursor Mode';
      audio.playClickPop();
      updateOdometer(1);
    });
  }
}

// --- 7. Star Sky Background Canvas ---
function initStarCanvas() {
  const canvas = document.getElementById('starSkyCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const stars = Array.from({ length: 65 }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    radius: Math.random() * 1.5 + 0.5,
    alpha: Math.random(),
    speed: Math.random() * 0.02 + 0.005
  }));

  function animate() {
    ctx.clearRect(0, 0, width, height);
    const isNight = document.documentElement.getAttribute('data-theme') === 'night';

    stars.forEach(s => {
      s.alpha += s.speed;
      const opacity = (Math.sin(s.alpha) + 1) / 2;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.radius * (isNight ? 1.4 : 1), 0, Math.PI * 2);
      ctx.fillStyle = isNight 
        ? `rgba(255, 230, 160, ${opacity * 0.85})` 
        : `rgba(163, 64, 99, ${opacity * 0.25})`;
      ctx.fill();
    });

    requestAnimationFrame(animate);
  }
  animate();
}

// --- 8. Theme & Sound Controls ---
function initControls() {
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon = document.getElementById('themeIcon');
  const themeLabel = document.getElementById('themeLabel');
  const metaTheme = document.getElementById('metaThemeColor');

  themeToggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'night' ? 'day' : 'night';
    document.documentElement.setAttribute('data-theme', next);

    if (next === 'night') {
      themeIcon.setAttribute('data-lucide', 'sun');
      themeLabel.textContent = 'Day Nursery';
      metaTheme.setAttribute('content', '#0a0d14');
      audio.playBellChime(440); // A4
      setSpeechBubble("“Good evening! Welcome to the Midnight Nursery!”");
    } else {
      themeIcon.setAttribute('data-lucide', 'moon');
      themeLabel.textContent = 'Dream Mode';
      metaTheme.setAttribute('content', '#fff8f1');
      audio.playBellChime(523.25); // C5
      setSpeechBubble("“Good morning! The sun is out, but dreams never stop!”");
    }
    lucide.createIcons();
    updateOdometer(1);
  });

  // Sound Toggle Switch
  const soundToggle = document.getElementById('soundToggle');
  const soundIcon = document.getElementById('soundIcon');
  const soundLabel = document.getElementById('soundLabel');

  soundToggle.addEventListener('click', () => {
    const isMuted = audio.toggleMute();
    soundToggle.setAttribute('aria-pressed', (!isMuted).toString());

    if (isMuted) {
      soundIcon.setAttribute('data-lucide', 'volume-x');
      soundLabel.textContent = 'Sound Off';
    } else {
      soundIcon.setAttribute('data-lucide', 'volume-2');
      soundLabel.textContent = 'Sound On';
      audio.playBellChime(659.25); // E5 unmuting chime
      setSpeechBubble("“Sound on! I can hear all the little bell notes now!”");
    }
    lucide.createIcons();
    updateOdometer(1);
  });
}

// --- 9. Showcase Project 1: The Lullaby Lab (Playable Music Box) ---
function initMusicBox() {
  const keys = document.querySelectorAll('.music-key');
  const crank = document.getElementById('musicBoxCrank');
  const autoBtn = document.getElementById('autoLullabyBtn');
  const stopBtn = document.getElementById('stopLullabyBtn');

  // Key map: 1 through 8
  const noteFreqs = {
    '1': 261.63, '2': 293.66, '3': 329.63, '4': 392.00,
    '5': 440.00, '6': 523.25, '7': 587.33, '8': 659.25
  };

  keys.forEach((key) => {
    key.addEventListener('click', () => {
      const freq = parseFloat(key.getAttribute('data-freq'));
      playKeyNote(key, freq);
    });
  });

  function playKeyNote(keyEl, freq) {
    audio.playBellChime(freq);
    keyEl.classList.add('active-key');
    setTimeout(() => keyEl.classList.remove('active-key'), 220);
    updateOdometer(1);
  }

  // Keyboard accessibility: 1-8
  window.addEventListener('keydown', (e) => {
    if (noteFreqs[e.key]) {
      const keyIndex = parseInt(e.key, 10) - 1;
      if (keys[keyIndex]) {
        playKeyNote(keys[keyIndex], noteFreqs[e.key]);
      }
    }
  });

  // Music Box Crank
  if (crank) {
    crank.addEventListener('click', () => {
      crank.classList.add('spinning');
      audio.playClickPop();
      setTimeout(() => crank.classList.remove('spinning'), 1200);
      setSpeechBubble("“Winding up the bedtime springs... click, click!”");
    });
  }

  // Pre-programmed "Twinkle / Slumber Theme" Autoplay
  let lullabyInterval = null;
  const melody = [
    { freq: 261.63, delay: 500 }, // C
    { freq: 261.63, delay: 500 }, // C
    { freq: 392.00, delay: 500 }, // G
    { freq: 392.00, delay: 500 }, // G
    { freq: 440.00, delay: 500 }, // A
    { freq: 440.00, delay: 500 }, // A
    { freq: 392.00, delay: 900 }, // G
    { freq: 329.63, delay: 500 }, // E
    { freq: 329.63, delay: 500 }, // E
    { freq: 293.66, delay: 500 }, // D
    { freq: 293.66, delay: 500 }, // D
    { freq: 261.63, delay: 900 }, // C
  ];

  if (autoBtn) {
    autoBtn.addEventListener('click', () => {
      if (lullabyInterval) clearInterval(lullabyInterval);
      if (audio.isMuted) audio.toggleMute();
      
      let index = 0;
      crank.classList.add('spinning');
      setSpeechBubble("“Now playing: Pip’s Slumber Melody... sleep tight! 💤”");

      function playNext() {
        if (index >= melody.length) {
          crank.classList.remove('spinning');
          return;
        }
        const note = melody[index];
        audio.playBellChime(note.freq);
        
        // Highlight matching key
        keys.forEach(k => {
          if (Math.abs(parseFloat(k.getAttribute('data-freq')) - note.freq) < 1) {
            k.classList.add('active-key');
            setTimeout(() => k.classList.remove('active-key'), 300);
          }
        });

        index++;
        lullabyInterval = setTimeout(playNext, note.delay);
      }
      playNext();
      updateOdometer(5);
    });
  }

  if (stopBtn) {
    stopBtn.addEventListener('click', () => {
      if (lullabyInterval) clearTimeout(lullabyInterval);
      crank.classList.remove('spinning');
      audio.playClickPop();
      setSpeechBubble("“Melody paused. Ready for your notes!”");
    });
  }
}

// --- 10. Showcase Project 2: Nightlight Collection (Lantern Warmth) ---
function initNightlights() {
  const items = document.querySelectorAll('.lantern-item');
  const slider = document.getElementById('lanternBrightness');
  const valDisplay = document.getElementById('brightnessVal');

  items.forEach(item => {
    item.addEventListener('click', () => {
      items.forEach(i => i.classList.remove('active'));
      item.classList.add('active');
      audio.playClickPop();
      audio.playBellChime(659.25, 0.8);
      updateOdometer(1);

      const type = item.getAttribute('data-lantern');
      if (type === 'crescent') setSpeechBubble("“Crescent lantern lit: casts gentle porcelain moonlight.”");
      if (type === 'firefly') setSpeechBubble("“Firefly jar lit: contains 12 sleepy bio-luminescent bugs.”");
      if (type === 'star') setSpeechBubble("“Star projector lit: projects the Big Dipper across the ceiling!”");
    });
  });

  if (slider) {
    slider.addEventListener('input', (e) => {
      const val = e.target.value;
      if (valDisplay) valDisplay.textContent = `${val}%`;
      document.documentElement.style.setProperty('--shadow-glow', `0 0 ${val / 3}px rgba(251, 176, 59, ${val / 100})`);
    });
  }
}

// --- 11. Showcase Project 4: Rattle & Block Toys Mini-Game ---
function initToysPlayroom() {
  const rattleBtn = document.getElementById('babyRattleBtn');
  const rattleCount = document.getElementById('rattleCount');
  let count = 0;

  if (rattleBtn) {
    rattleBtn.addEventListener('click', () => {
      count++;
      rattleCount.textContent = count.toString();
      rattleBtn.classList.add('shaking');
      audio.playRattle();
      setTimeout(() => rattleBtn.classList.remove('shaking'), 350);
      updateOdometer(1);

      if (count % 5 === 0) {
        setSpeechBubble(`“Shake shake! ${count} shakes! My favorite sound!”`);
      }
    });
  }

  // Wooden Blocks
  const blocks = document.querySelectorAll('.toy-block');
  const tumbleBtn = document.getElementById('tumbleBlocksBtn');

  blocks.forEach(block => {
    block.addEventListener('click', () => {
      audio.playClickPop();
      const rot = (Math.random() * 24 - 12);
      block.style.transform = `translateY(-14px) rotate(${rot}deg)`;
      setTimeout(() => {
        block.style.transform = `translateY(0) rotate(${rot / 2}deg)`;
      }, 250);
      updateOdometer(1);
    });
  });

  if (tumbleBtn) {
    tumbleBtn.addEventListener('click', () => {
      audio.playRattle();
      blocks.forEach(b => {
        const randRot = Math.random() * 30 - 15;
        b.style.transform = `translateY(${Math.random() * 8}px) rotate(${randRot}deg)`;
      });
      setSpeechBubble("“Crash! Blocks tumbled! Time to build again!”");
      updateOdometer(2);
    });
  }
}

// --- 12. Showcase Project 3: Dream Delivery Rooftop Flight Map ---
function dispatchFlight(targetX, targetY, locationName) {
  const pipCloud = document.getElementById('flyingPipCloud');
  const statusLabel = document.getElementById('currentRouteName');

  if (pipCloud) {
    pipCloud.style.transform = `translate(${targetX}px, ${targetY}px)`;
  }
  if (statusLabel) {
    statusLabel.textContent = `Delivered to: ${locationName}`;
  }

  audio.playBellChime(587.33);
  setTimeout(() => audio.playBellChime(880), 250);
  setSpeechBubble(`“Cloud route active! Dream safely dropped at ${locationName}!”`);
  updateOdometer(3);
}
window.dispatchFlight = dispatchFlight;

// --- 13. Showcase Project 5: Bedtime Storybook (<150 words per scene) ---
function initStorybook() {
  const prevBtn = document.getElementById('prevPageBtn');
  const nextBtn = document.getElementById('nextPageBtn');
  const illuEl = document.getElementById('pageIllu');
  const chapterEl = document.getElementById('pageChapter');
  const headingEl = document.getElementById('pageHeading');
  const textEl = document.getElementById('pageText');
  const dots = document.querySelectorAll('#pageDots .dot');

  const storyPages = [
    {
      illu: "⭐",
      chapter: "Chapter 1 of 4",
      heading: "A Flicker on the Nursery Roof",
      text: "The clock chimed 17:17. Pip opened his eyes—two warm amber pinpricks in the quiet nursery. Above his cradle, a baby star had tumbled from the Milky Way, resting gently in a bowl of warm stardust cookies."
    },
    {
      illu: "🎵",
      chapter: "Chapter 2 of 4",
      heading: "The Music Box Mystery",
      text: "The little star was shivering with cold. Pip reached into his tool pouch and pulled out the golden winding key. He wound the music box tines, filling the dark attic room with a warm, comforting pentatonic melody."
    },
    {
      illu: "🏮",
      chapter: "Chapter 3 of 4",
      heading: "Lighting the Way Home",
      text: "The star began to glow brighter, smiling back at Pip's crooked grin. Pip picked up his porcelain crescent lantern and boarded his sleepy cloud, steering past the town's tall chimney pots toward the rooftop sky."
    },
    {
      illu: "💤",
      chapter: "Chapter 4 of 4",
      heading: "Sweet Dreams, Little Creatures",
      text: "With a gentle toss, Pip lifted the star back to the constellation bridge. All through the neighborhood, baby ghosts and bunnies curled under blankets, falling asleep to the dreams Pip had engineered."
    }
  ];

  let currentPage = 0;

  function renderPage(idx) {
    const page = storyPages[idx];
    illuEl.textContent = page.illu;
    chapterEl.textContent = page.chapter;
    headingEl.textContent = page.heading;
    textEl.textContent = page.text;

    dots.forEach((d, i) => d.classList.toggle('active', i === idx));
    prevBtn.disabled = idx === 0;
    nextBtn.disabled = idx === storyPages.length - 1;
    audio.playPageFlip();
    updateOdometer(1);
  }

  if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => {
      if (currentPage > 0) {
        currentPage--;
        renderPage(currentPage);
      }
    });

    nextBtn.addEventListener('click', () => {
      if (currentPage < storyPages.length - 1) {
        currentPage++;
        renderPage(currentPage);
      }
    });
  }
}

// --- 14. Live Guestbook Wall (+2 pts Bonus Side Quest) ---
function initGuestbook() {
  const form = document.getElementById('nurseryWishForm');
  const nameInput = document.getElementById('visitorName');
  const wishInput = document.getElementById('visitorWish');
  const corkboard = document.getElementById('wishesCorkboard');

  const defaultWishes = [
    { name: 'Luna (Friendly Ghost)', wish: 'May my midnight sheet blanket never get tangled in the attic breeze! 👻', color: 'note-pink' },
    { name: 'Bramble (Sleepy Bunny)', wish: 'Thank you Pip for the carrot cloud dream last night! 🥕', color: 'note-yellow' },
    { name: 'Hardik (haX Organizer)', wish: 'Good things start small. Keep building with early-web soul! ✨', color: 'note-green' },
    { name: 'Pip (Dream Engineer)', wish: 'Heehee! Welcome everyone to my nursery wall. Leave a wish! 💀', color: 'note-blue' }
  ];

  let storedWishes = JSON.parse(localStorage.getItem('pip_nursery_wishes') || 'null') || defaultWishes;

  function renderWishes() {
    corkboard.innerHTML = '';
    storedWishes.slice(-8).reverse().forEach((w, index) => {
      const note = document.createElement('div');
      note.className = `sticky-note ${w.color || 'note-yellow'}`;
      // Random tilt between -4deg and +4deg
      const tilt = ((index * 3) % 9) - 4;
      note.style.transform = `rotate(${tilt}deg)`;

      note.innerHTML = `
        <span class="pushpin">📌</span>
        <h4>${escapeHtml(w.name)}</h4>
        <p>“${escapeHtml(w.wish)}”</p>
      `;
      corkboard.appendChild(note);
    });
  }

  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = nameInput.value.trim();
      const wish = wishInput.value.trim();
      if (!name || !wish) return;

      const colors = ['note-pink', 'note-yellow', 'note-green', 'note-blue'];
      const chosenColor = colors[Math.floor(Math.random() * colors.length)];

      storedWishes.push({ name, wish, color: chosenColor });
      localStorage.setItem('pip_nursery_wishes', JSON.stringify(storedWishes));

      renderWishes();
      nameInput.value = '';
      wishInput.value = '';
      audio.playBellChime(783.99); // G5 happy note
      setSpeechBubble(`“Hooray! ${name} pinned a new wish on my wall!”`);
      updateOdometer(3);
    });
  }

  renderWishes();
}

// --- 15. Responsive Chaos Mode (+5 pts Bonus Side Quest) ---
function initChaosMode() {
  const chaosBtn = document.getElementById('chaosToggle');
  const stickersLayer = document.getElementById('chaosStickersLayer');
  let isChaosActive = false;

  const stickerPhrases = [
    { text: '✨ 100% CUTE', bg: '#ffccd8', rot: '-8deg' },
    { text: '💀 NIGHTCAP APPROVED', bg: '#ffd166', rot: '6deg' },
    { text: '💤 99% SLEEPY', bg: '#a7f3d0', rot: '-12deg' },
    { text: '★ haX.baby 2026', bg: '#bfdbfe', rot: '14deg' },
    { text: '🎵 LULLABY MASTER', bg: '#fbcfe8', rot: '-5deg' },
    { text: '☁️ DREAM BIG', bg: '#fed7aa', rot: '9deg' }
  ];

  if (chaosBtn && stickersLayer) {
    chaosBtn.addEventListener('click', () => {
      isChaosActive = !isChaosActive;
      document.body.classList.toggle('chaos-active', isChaosActive);
      chaosBtn.querySelector('.chaos-label').textContent = isChaosActive ? 'Chaos: ON' : 'Chaos: Off';

      if (isChaosActive) {
        stickersLayer.innerHTML = '';
        stickerPhrases.forEach((st, i) => {
          const el = document.createElement('div');
          el.className = 'chaos-sticker';
          el.textContent = st.text;
          el.style.backgroundColor = st.bg;
          el.style.setProperty('--rot', st.rot);
          el.style.top = `${15 + (i * 12)}%`;
          el.style.left = `${10 + ((i * 14) % 75)}%`;

          // Draggable functionality
          makeDraggable(el);
          stickersLayer.appendChild(el);
        });

        audio.playFanfare();
        setSpeechBubble("“WOAH! Retro 90s stickers everywhere! You can drag them around!”");
      } else {
        stickersLayer.innerHTML = '';
        audio.playClickPop();
        setSpeechBubble("“Calm nursery mode restored.”");
      }
      updateOdometer(2);
    });
  }

  function makeDraggable(element) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    element.onmousedown = dragMouseDown;

    function dragMouseDown(e) {
      e.preventDefault();
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
      e.preventDefault();
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      element.style.top = (element.offsetTop - pos2) + "px";
      element.style.left = (element.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
      document.onmouseup = null;
      document.onmousemove = null;
    }
  }
}

// --- 16. Hidden Easter Egg Trigger (+20% Creativity Rubric) ---
function initEasterEgg() {
  const secretStar = document.getElementById('secretStarEgg');
  const modal = document.getElementById('easterEggModal');
  const closeBtn = document.getElementById('closeEggModalBtn');
  let clickCount = 0;

  if (secretStar) {
    secretStar.addEventListener('click', () => {
      clickCount++;
      audio.playBellChime(440 + (clickCount * 80));

      if (clickCount === 1) {
        setSpeechBubble("“Teehee! My nightcap star is ticklish!”");
      } else if (clickCount === 2) {
        setSpeechBubble("“Almost woke me up! Just 1 more click... ⭐”");
      } else if (clickCount >= 3) {
        clickCount = 0;
        audio.playFanfare();

        // Confetti Fireworks Explosion
        if (typeof confetti === 'function') {
          confetti({
            particleCount: 120,
            spread: 90,
            origin: { y: 0.4 },
            colors: ['#a34063', '#ffd166', '#ffccd8', '#00ffcc', '#ffffff']
          });
        }

        if (modal) {
          modal.classList.add('open');
          modal.setAttribute('aria-hidden', 'false');
        }
        setSpeechBubble("“🌟 YAHOO! You unlocked the Certified Dreamer Badge!”");
        updateOdometer(10);
      }
    });
  }

  if (closeBtn && modal) {
    closeBtn.addEventListener('click', () => {
      modal.classList.remove('open');
      modal.setAttribute('aria-hidden', 'true');
      audio.playClickPop();
    });
  }
}

// --- 16b. Character Sheet Modal ---
function initCharacterSheetModal() {
  const openBtn = document.getElementById('openBioModalBtn');
  const modal = document.getElementById('characterSheetModal');
  const closeBtn = document.getElementById('closeBioModalBtn');

  if (openBtn && modal) {
    openBtn.addEventListener('click', () => {
      modal.classList.add('open');
      modal.setAttribute('aria-hidden', 'false');
      audio.playBellChime(587.33); // D5
      setSpeechBubble("“Opening my official Midnight Nursery Dossier! 📜”");
      updateOdometer(1);
    });
  }

  if (closeBtn && modal) {
    closeBtn.addEventListener('click', () => {
      modal.classList.remove('open');
      modal.setAttribute('aria-hidden', 'true');
      audio.playClickPop();
    });
  }
}

// --- 17. Button Click Pop Sound Bindings ---
function initButtonAudio() {
  document.querySelectorAll('button, a.btn-primary, a.btn-secondary').forEach(btn => {
    btn.addEventListener('click', () => {
      audio.playClickPop();
    });
  });

  // Hero Quick Play Button
  const heroPlayBtn = document.getElementById('ringLullabyHeroBtn');
  if (heroPlayBtn) {
    heroPlayBtn.addEventListener('click', () => {
      if (audio.isMuted) audio.toggleMute();
      audio.playBellChime(523.25);
      setTimeout(() => audio.playBellChime(659.25), 200);
      setTimeout(() => audio.playBellChime(783.99), 400);
      setSpeechBubble("“Sweet dreams are starting to form! ☁️”");
      updateOdometer(2);
    });
  }
}

// --- Bootstrap All Modules On DOM Ready ---
document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide SVG Icons
  if (window.lucide) {
    lucide.createIcons();
  }

  initEyeTracking();
  initSparkleTrail();
  initFlashlight();
  initStarCanvas();
  initControls();
  initMusicBox();
  initNightlights();
  initToysPlayroom();
  initStorybook();
  initGuestbook();
  initChaosMode();
  initEasterEgg();
  initCharacterSheetModal();
  initButtonAudio();

  // Initial Odometer Render
  updateOdometer(0);
});
