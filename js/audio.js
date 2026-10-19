/**
 * Critter Darts 3D - WebAudio Cute Critter Vocal Yell & Carnival Sound Engine
 * Synthesizes distinct, adorable formant-shaped cute vocal yells ("Mew-Nyaa!",
 * "Yip-Yay!", "Wheee!", "Oink-Wee!", "Pawoo!", "Baa-Hee!") when Smiling Critters
 * on the 3D target are hit by a dart, plus tactile dart whoosh, cork thud, and
 * marimba celebration chimes.
 */

const PENTATONIC_HZ = [523.25, 587.33, 659.25, 783.99, 880.00, 1046.50, 1174.66, 1318.51];

// Distinct cute vocal formant & pitch signatures for each of the 9 Smiling Critters
const CRITTER_YELL_PROFILES = {
  catnap: {
    // Cute kitten "Mew~ Nyaa!"
    syllables: [
      { f0Start: 540, f0Peak: 860, f0End: 680, dur: 0.22, f1: [420, 820], f2: [2100, 1650], vibHz: 7.5, vibDepth: 16 },
      { f0Start: 660, f0Peak: 980, f0End: 790, dur: 0.28, f1: [480, 880], f2: [2250, 1720], vibHz: 8.5, vibDepth: 22 },
    ],
    squeakHz: [980, 1520],
    chimeNotes: [659.25, 880.0, 1046.5, 1318.51],
  },
  dogday: {
    // Cheerful puppy "Yip-Yip-Yay!"
    syllables: [
      { f0Start: 580, f0Peak: 920, f0End: 720, dur: 0.14, f1: [450, 780], f2: [2200, 1800], vibHz: 6.0, vibDepth: 10 },
      { f0Start: 640, f0Peak: 1020, f0End: 780, dur: 0.15, f1: [480, 840], f2: [2300, 1850], vibHz: 6.5, vibDepth: 12 },
      { f0Start: 690, f0Peak: 1080, f0End: 880, dur: 0.24, f1: [520, 900], f2: [2400, 1750], vibHz: 8.0, vibDepth: 18 },
    ],
    squeakHz: [1040, 1620],
    chimeNotes: [587.33, 783.99, 987.77, 1174.66],
  },
  bobby: {
    // Sweet cuddly bear cub "Aww~ Yay-hee!"
    syllables: [
      { f0Start: 510, f0Peak: 820, f0End: 740, dur: 0.20, f1: [620, 840], f2: [1450, 1950], vibHz: 7.0, vibDepth: 15 },
      { f0Start: 720, f0Peak: 1040, f0End: 890, dur: 0.26, f1: [460, 760], f2: [2350, 2050], vibHz: 9.0, vibDepth: 20 },
    ],
    squeakHz: [920, 1480],
    chimeNotes: [523.25, 659.25, 783.99, 1046.5],
  },
  hoppy: {
    // Energetic bunny "Boing~ Wheee!"
    syllables: [
      { f0Start: 460, f0Peak: 940, f0End: 860, dur: 0.17, f1: [500, 420], f2: [1200, 2400], vibHz: 7.5, vibDepth: 14 },
      { f0Start: 760, f0Peak: 1160, f0End: 980, dur: 0.28, f1: [380, 460], f2: [2450, 2600], vibHz: 10.0, vibDepth: 24 },
    ],
    squeakHz: [1100, 1740],
    chimeNotes: [659.25, 783.99, 1046.5, 1318.51],
  },
  craftycorn: {
    // Magical unicorn "Kyaa~ Wow!"
    syllables: [
      { f0Start: 640, f0Peak: 1120, f0End: 920, dur: 0.21, f1: [420, 860], f2: [2450, 1850], vibHz: 8.5, vibDepth: 18 },
      { f0Start: 780, f0Peak: 1220, f0End: 990, dur: 0.26, f1: [580, 820], f2: [1400, 2150], vibHz: 9.5, vibDepth: 22 },
    ],
    squeakHz: [1150, 1780],
    chimeNotes: [783.99, 987.77, 1174.66, 1567.98],
  },
  picky: {
    // Playful piggy "Oink~ Wee-hee!"
    syllables: [
      { f0Start: 420, f0Peak: 640, f0End: 510, dur: 0.16, f1: [520, 440], f2: [1150, 1950], vibHz: 14.0, vibDepth: 20 },
      { f0Start: 740, f0Peak: 1100, f0End: 940, dur: 0.26, f1: [360, 440], f2: [2400, 2550], vibHz: 9.0, vibDepth: 22 },
    ],
    squeakHz: [1020, 1660],
    chimeNotes: [587.33, 740.0, 880.0, 1174.66],
  },
  bubba: {
    // Baby elephant "Pawoo~ Toot!"
    syllables: [
      { f0Start: 450, f0Peak: 780, f0End: 680, dur: 0.22, f1: [640, 450], f2: [1350, 1100], vibHz: 6.5, vibDepth: 14 },
      { f0Start: 680, f0Peak: 960, f0End: 840, dur: 0.25, f1: [440, 560], f2: [1250, 1850], vibHz: 8.5, vibDepth: 18 },
    ],
    squeakHz: [880, 1420],
    chimeNotes: [523.25, 659.25, 880.0, 1046.5],
  },
  kickin: {
    // Cool chick "Peep-Peep-Yeah!"
    syllables: [
      { f0Start: 720, f0Peak: 1080, f0End: 880, dur: 0.13, f1: [380, 480], f2: [2400, 2550], vibHz: 8.0, vibDepth: 12 },
      { f0Start: 760, f0Peak: 1140, f0End: 920, dur: 0.14, f1: [400, 500], f2: [2450, 2600], vibHz: 8.0, vibDepth: 14 },
      { f0Start: 680, f0Peak: 1040, f0End: 860, dur: 0.23, f1: [540, 840], f2: [2150, 1800], vibHz: 9.0, vibDepth: 20 },
    ],
    squeakHz: [1120, 1720],
    chimeNotes: [659.25, 830.61, 987.77, 1318.51],
  },
  baba: {
    // Fluffy lamb "Baa-aa~ Hee!"
    syllables: [
      { f0Start: 540, f0Peak: 840, f0End: 740, dur: 0.24, f1: [680, 820], f2: [1550, 1750], vibHz: 16.0, vibDepth: 26 },
      { f0Start: 720, f0Peak: 1020, f0End: 880, dur: 0.22, f1: [420, 520], f2: [2300, 2480], vibHz: 9.5, vibDepth: 18 },
    ],
    squeakHz: [960, 1540],
    chimeNotes: [587.33, 783.99, 987.77, 1174.66],
  },
};

let ctx = null;
let masterGain = null;
let compressor = null;
let noiseBuffer = null;
let muted = false;
let listenersBound = false;
let gestureUnlocked = false;
let resumePending = false;
let yellCount = 0;
const lastTriggerMap = new Map();

function hasUserActivation() {
  if (typeof navigator !== 'undefined' && navigator.userActivation) {
    return Boolean(navigator.userActivation.isActive || navigator.userActivation.hasBeenActive);
  }
  return gestureUnlocked;
}

function canTrigger(key, minGapMs = 18) {
  const now = (typeof performance !== 'undefined' && performance.now) ? performance.now() : Date.now();
  const prev = lastTriggerMap.get(key) || 0;
  if (now - prev < minGapMs) return false;
  lastTriggerMap.set(key, now);
  return true;
}

function createPinkNoiseBuffer(audioCtx) {
  const sampleRate = audioCtx.sampleRate || 44100;
  const length = Math.floor(sampleRate * 1.2);
  const buffer = audioCtx.createBuffer(1, length, sampleRate);
  const data = buffer.getChannelData(0);
  let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
  for (let i = 0; i < length; i++) {
    const white = Math.random() * 2 - 1;
    b0 = 0.99886 * b0 + white * 0.0555179;
    b1 = 0.99332 * b1 + white * 0.0750759;
    b2 = 0.96900 * b2 + white * 0.1538520;
    b3 = 0.86650 * b3 + white * 0.3104856;
    b4 = 0.55000 * b4 + white * 0.5329522;
    b5 = -0.7616 * b5 - white * 0.0168980;
    data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.045;
    b6 = white * 0.115926;
  }
  return buffer;
}

function ensureContext() {
  if (typeof window === 'undefined') return null;
  if (!hasUserActivation()) return null;
  if (!ctx) {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return null;
    try {
      ctx = new AudioCtx();
      compressor = ctx.createDynamicsCompressor();
      compressor.threshold.setValueAtTime(-14, ctx.currentTime);
      compressor.knee.setValueAtTime(22, ctx.currentTime);
      compressor.ratio.setValueAtTime(5, ctx.currentTime);
      compressor.attack.setValueAtTime(0.004, ctx.currentTime);
      compressor.release.setValueAtTime(0.16, ctx.currentTime);

      masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(muted ? 0.0001 : 0.78, ctx.currentTime);

      masterGain.connect(compressor);
      compressor.connect(ctx.destination);
      noiseBuffer = createPinkNoiseBuffer(ctx);
    } catch (_) {
      return null;
    }
  }
  if (ctx && ctx.state === 'suspended' && !resumePending) {
    resumePending = true;
    try {
      const p = ctx.resume();
      if (p && typeof p.then === 'function') {
        p.then(() => { resumePending = false; }, () => { resumePending = false; });
      } else {
        resumePending = false;
      }
    } catch (_) {
      resumePending = false;
    }
  }
  return ctx;
}

function bindGestureUnlock() {
  if (listenersBound || typeof window === 'undefined') return;
  listenersBound = true;
  const unlock = () => {
    gestureUnlocked = true;
    ensureContext();
  };
  const opts = { capture: true, passive: true };
  window.addEventListener('pointerdown', unlock, opts);
  window.addEventListener('mousedown', unlock, opts);
  window.addEventListener('touchstart', unlock, opts);
  window.addEventListener('keydown', unlock, opts);
  window.addEventListener('click', unlock, opts);
}

bindGestureUnlock();

function scheduleKalimbaNote(audioCtx, dest, freq, startTime, duration = 0.24, peakGain = 0.22) {
  const osc1 = audioCtx.createOscillator();
  const osc2 = audioCtx.createOscillator();
  const gain = audioCtx.createGain();

  osc1.type = 'sine';
  osc1.frequency.setValueAtTime(freq, startTime);

  osc2.type = 'triangle';
  osc2.frequency.setValueAtTime(freq * 2, startTime);

  const g2 = audioCtx.createGain();
  g2.gain.setValueAtTime(0.16, startTime);
  g2.gain.exponentialRampToValueAtTime(0.001, startTime + duration * 0.45);

  gain.gain.setValueAtTime(0.0001, startTime);
  gain.gain.linearRampToValueAtTime(peakGain, startTime + 0.008);
  gain.gain.exponentialRampToValueAtTime(0.0008, startTime + duration);

  osc1.connect(gain);
  osc2.connect(g2);
  g2.connect(gain);
  gain.connect(dest);

  osc1.start(startTime);
  osc2.start(startTime);
  osc1.stop(startTime + duration + 0.02);
  osc2.stop(startTime + duration + 0.02);
}

function scheduleFormantSyllable(audioCtx, dest, syl, startTime, pitchScale = 1.0) {
  const dur = syl.dur;
  const f0s = syl.f0Start * pitchScale;
  const f0p = syl.f0Peak * pitchScale;
  const f0e = syl.f0End * pitchScale;

  // Glottal harmonic source (sawtooth + triangle + sweet sine fundamental)
  const oscSaw = audioCtx.createOscillator();
  const oscTri = audioCtx.createOscillator();
  const oscSub = audioCtx.createOscillator();
  oscSaw.type = 'sawtooth';
  oscTri.type = 'triangle';
  oscSub.type = 'sine';

  [oscSaw, oscTri, oscSub].forEach((osc, idx) => {
    const mult = idx === 2 ? 1.0 : 1.0;
    osc.frequency.setValueAtTime(f0s * mult, startTime);
    osc.frequency.exponentialRampToValueAtTime(f0p * mult, startTime + dur * 0.42);
    osc.frequency.exponentialRampToValueAtTime(f0e * mult, startTime + dur);
  });

  // Cute vocal vibrato LFO
  const vibOsc = audioCtx.createOscillator();
  const vibGain = audioCtx.createGain();
  vibOsc.type = 'sine';
  vibOsc.frequency.setValueAtTime(syl.vibHz || 8.0, startTime);
  vibGain.gain.setValueAtTime(syl.vibDepth || 16, startTime);
  vibOsc.connect(vibGain);
  vibGain.connect(oscSaw.frequency);
  vibGain.connect(oscTri.frequency);
  vibGain.connect(oscSub.frequency);

  // Two parallel vowel formant filters (F1 & F2) + direct sweet fundamental
  const f1Filter = audioCtx.createBiquadFilter();
  f1Filter.type = 'bandpass';
  f1Filter.Q.setValueAtTime(4.2, startTime);
  f1Filter.frequency.setValueAtTime(syl.f1[0], startTime);
  f1Filter.frequency.exponentialRampToValueAtTime(syl.f1[1], startTime + dur);

  const f2Filter = audioCtx.createBiquadFilter();
  f2Filter.type = 'bandpass';
  f2Filter.Q.setValueAtTime(5.0, startTime);
  f2Filter.frequency.setValueAtTime(syl.f2[0], startTime);
  f2Filter.frequency.exponentialRampToValueAtTime(syl.f2[1], startTime + dur);

  const srcMix = audioCtx.createGain();
  srcMix.gain.setValueAtTime(0.55, startTime);
  oscSaw.connect(srcMix);
  oscTri.connect(srcMix);

  const f1Gain = audioCtx.createGain();
  f1Gain.gain.setValueAtTime(0.42, startTime);
  const f2Gain = audioCtx.createGain();
  f2Gain.gain.setValueAtTime(0.36, startTime);
  const subGain = audioCtx.createGain();
  subGain.gain.setValueAtTime(0.24, startTime);

  srcMix.connect(f1Filter);
  srcMix.connect(f2Filter);
  f1Filter.connect(f1Gain);
  f2Filter.connect(f2Gain);
  oscSub.connect(subGain);

  const env = audioCtx.createGain();
  env.gain.setValueAtTime(0.0001, startTime);
  env.gain.linearRampToValueAtTime(0.38, startTime + Math.min(0.022, dur * 0.25));
  env.gain.setValueAtTime(0.34, startTime + dur * 0.65);
  env.gain.exponentialRampToValueAtTime(0.0008, startTime + dur);

  f1Gain.connect(env);
  f2Gain.connect(env);
  subGain.connect(env);
  env.connect(dest);

  oscSaw.start(startTime);
  oscTri.start(startTime);
  oscSub.start(startTime);
  vibOsc.start(startTime);

  const stopAt = startTime + dur + 0.02;
  oscSaw.stop(stopAt);
  oscTri.stop(stopAt);
  oscSub.stop(stopAt);
  vibOsc.stop(stopAt);
}

export const DartAudio = {
  init() {
    bindGestureUnlock();
    return ensureContext();
  },

  isMuted() {
    return muted;
  },

  setMuted(val) {
    muted = Boolean(val);
    if (ctx && masterGain) {
      const now = ctx.currentTime;
      masterGain.gain.cancelScheduledValues(now);
      masterGain.gain.setTargetAtTime(muted ? 0.0001 : 0.78, now, 0.02);
    }
    return muted;
  },

  toggleMute() {
    return this.setMuted(!muted);
  },

  getYellCount() {
    return yellCount;
  },

  playDartThrow(dartType = 'normal') {
    const audioCtx = ensureContext();
    if (!audioCtx || muted) return;
    if (!canTrigger('throw', 35)) return;
    const now = audioCtx.currentTime;

    // Tactile plunger pop + aerodynamic feather whoosh
    const popOsc = audioCtx.createOscillator();
    const popGain = audioCtx.createGain();
    popOsc.type = 'sine';
    const baseFreq = dartType === 'super' ? 220 : dartType === 'triple' ? 310 : 270;
    popOsc.frequency.setValueAtTime(baseFreq, now);
    popOsc.frequency.exponentialRampToValueAtTime(baseFreq * 2.3, now + 0.085);
    popGain.gain.setValueAtTime(0.001, now);
    popGain.gain.linearRampToValueAtTime(0.24, now + 0.012);
    popGain.gain.exponentialRampToValueAtTime(0.001, now + 0.095);
    popOsc.connect(popGain).connect(masterGain);
    popOsc.start(now);
    popOsc.stop(now + 0.10);

    if (noiseBuffer) {
      const src = audioCtx.createBufferSource();
      src.buffer = noiseBuffer;
      const filter = audioCtx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.Q.setValueAtTime(2.4, now);
      filter.frequency.setValueAtTime(620, now);
      filter.frequency.exponentialRampToValueAtTime(1950, now + 0.14);
      const nGain = audioCtx.createGain();
      nGain.gain.setValueAtTime(0.001, now);
      nGain.gain.linearRampToValueAtTime(0.18, now + 0.025);
      nGain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
      src.connect(filter).connect(nGain).connect(masterGain);
      src.start(now);
      src.stop(now + 0.16);
    }
  },

  playBoardThud(isBullseye = false) {
    const audioCtx = ensureContext();
    if (!audioCtx || muted) return;
    const now = audioCtx.currentTime;

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(isBullseye ? 195 : 145, now);
    osc.frequency.exponentialRampToValueAtTime(52, now + 0.09);
    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.28, now + 0.006);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.10);
    osc.connect(gain).connect(masterGain);
    osc.start(now);
    osc.stop(now + 0.11);
  },

  /**
   * Gentle cartoon "woop-boing" miss sound when hitting empty board or missing (-15 pts)
   */
  playMissPenalty() {
    const audioCtx = ensureContext();
    if (!audioCtx || muted) return;
    if (!canTrigger('miss', 45)) return;
    const now = audioCtx.currentTime;

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(340, now);
    osc.frequency.exponentialRampToValueAtTime(155, now + 0.22);
    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.24, now + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.24);
    osc.connect(gain).connect(masterGain);
    osc.start(now);
    osc.stop(now + 0.25);
  },

  /**
   * Playful candy-shield bounce clang when a dart hits a 3D obstacle in Stage 2+ (-15 pts)
   */
  playObstacleClang() {
    const audioCtx = ensureContext();
    if (!audioCtx || muted) return;
    if (!canTrigger('obstacle', 45)) return;
    const now = audioCtx.currentTime;

    // Bouncy spring boing
    const osc = audioCtx.createOscillator();
    const lfo = audioCtx.createOscillator();
    const lfoGain = audioCtx.createGain();
    const gain = audioCtx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(240, now);
    osc.frequency.exponentialRampToValueAtTime(420, now + 0.09);
    osc.frequency.exponentialRampToValueAtTime(190, now + 0.28);

    lfo.type = 'sine';
    lfo.frequency.setValueAtTime(26, now);
    lfoGain.gain.setValueAtTime(45, now);
    lfo.connect(lfoGain).connect(osc.frequency);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.28, now + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.30);

    osc.connect(gain).connect(masterGain);
    osc.start(now);
    lfo.start(now);
    osc.stop(now + 0.31);
    lfo.stop(now + 0.31);
  },

  /**
   * Mischievous naughty Baba Chops "Baa-ha-ha!" bleat when hitting Bad Baba in Stage 4+ (-25 pts)
   */
  playBadBabaYell() {
    const audioCtx = ensureContext();
    if (!audioCtx || muted) return;
    if (!canTrigger('bad_baba', 60)) return;
    const now = audioCtx.currentTime;

    const naughtySyllables = [
      { f0Start: 390, f0Peak: 460, f0End: 330, dur: 0.16, f1: [700, 780], f2: [1450, 1320], vibHz: 22.0, vibDepth: 32 },
      { f0Start: 350, f0Peak: 410, f0End: 280, dur: 0.16, f1: [680, 740], f2: [1400, 1280], vibHz: 22.0, vibDepth: 32 },
      { f0Start: 310, f0Peak: 360, f0End: 220, dur: 0.24, f1: [640, 700], f2: [1350, 1180], vibHz: 24.0, vibDepth: 36 },
    ];
    let cursor = now + 0.01;
    for (const syl of naughtySyllables) {
      scheduleFormantSyllable(audioCtx, masterGain, syl, cursor, 1.0);
      cursor += syl.dur + 0.025;
    }

    // Descending mischievous minor notes
    [440, 392, 329.63].forEach((hz, i) => {
      scheduleKalimbaNote(audioCtx, masterGain, hz, now + 0.04 + i * 0.09, 0.22, 0.16);
    });
  },

  /**
   * Gentle kid-friendly cartoon "Oops / Out" cadence when score drops too negative
   */
  playOutBust() {
    const audioCtx = ensureContext();
    if (!audioCtx || muted) return;
    const now = audioCtx.currentTime;
    const notes = [392.0, 369.99, 349.23, 293.66];
    notes.forEach((hz, i) => {
      scheduleKalimbaNote(
        audioCtx,
        masterGain,
        hz,
        now + i * 0.13,
        i === 3 ? 0.45 : 0.22,
        0.22
      );
    });
  },

  /**
   * Plays an unmistakable, adorable formant-synthesized cute vocal yell for the hit Smiling Critter!
   */
  playCuteCritterYell(critterId = 'catnap', combo = 1) {
    yellCount += 1;
    const audioCtx = ensureContext();
    if (!audioCtx || muted) return yellCount;
    if (!canTrigger(`yell_${critterId}`, 45)) return yellCount;

    const now = audioCtx.currentTime;
    const profile = CRITTER_YELL_PROFILES[critterId] || CRITTER_YELL_PROFILES.catnap;
    const pitchScale = 1.0 + Math.min(4, Math.max(0, combo - 1)) * 0.045;

    // 1. Plush toy squeaker transient (0.00s .. 0.09s)
    const sqOsc = audioCtx.createOscillator();
    const sqGain = audioCtx.createGain();
    sqOsc.type = 'sine';
    sqOsc.frequency.setValueAtTime(profile.squeakHz[0] * pitchScale, now);
    sqOsc.frequency.exponentialRampToValueAtTime(profile.squeakHz[1] * pitchScale, now + 0.055);
    sqOsc.frequency.exponentialRampToValueAtTime(profile.squeakHz[0] * 1.1 * pitchScale, now + 0.095);
    sqGain.gain.setValueAtTime(0.001, now);
    sqGain.gain.linearRampToValueAtTime(0.16, now + 0.012);
    sqGain.gain.exponentialRampToValueAtTime(0.001, now + 0.10);
    sqOsc.connect(sqGain).connect(masterGain);
    sqOsc.start(now);
    sqOsc.stop(now + 0.11);

    // 2. Multi-syllable Formant Cute Vocal Yell ("Mew~ Nyaa!", "Yip-Yip-Yay!", "Boing~ Wheee!")
    let cursor = now + 0.025;
    for (const syl of profile.syllables) {
      scheduleFormantSyllable(audioCtx, masterGain, syl, cursor, pitchScale);
      cursor += syl.dur + 0.028;
    }

    // 3. Sparkling Kalimba / Glockenspiel Arpeggio
    profile.chimeNotes.forEach((hz, i) => {
      scheduleKalimbaNote(
        audioCtx,
        masterGain,
        hz * pitchScale,
        now + 0.04 + i * 0.055,
        0.26,
        0.16
      );
    });

    return yellCount;
  },

  playSelectDart(dartType = 'normal') {
    const audioCtx = ensureContext();
    if (!audioCtx || muted) return;
    const now = audioCtx.currentTime;
    const idx = dartType === 'super' ? 4 : dartType === 'triple' ? 2 : 0;
    scheduleKalimbaNote(audioCtx, masterGain, PENTATONIC_HZ[idx], now, 0.18, 0.18);
    scheduleKalimbaNote(audioCtx, masterGain, PENTATONIC_HZ[idx + 2], now + 0.045, 0.22, 0.16);
  },

  playStageSwitch(stage = 1) {
    const audioCtx = ensureContext();
    if (!audioCtx || muted) return;
    const now = audioCtx.currentTime;
    const base = stage === 3 ? 2 : stage === 2 ? 1 : 0;
    [0, 2, 4, 5].forEach((offset, i) => {
      scheduleKalimbaNote(
        audioCtx,
        masterGain,
        PENTATONIC_HZ[(base + offset) % PENTATONIC_HZ.length],
        now + i * 0.06,
        0.25,
        0.18
      );
    });
  },

  playWaveResult(stars = 0) {
    const audioCtx = ensureContext();
    if (!audioCtx || muted) return;
    const now = audioCtx.currentTime;
    if (stars > 0) {
      const notes = [523.25, 659.25, 783.99, 1046.5, 1318.51];
      notes.forEach((hz, i) => {
        scheduleKalimbaNote(audioCtx, masterGain, hz, now + i * 0.085, 0.36, 0.22);
      });
    } else {
      const notes = [523.25, 440.0, 392.0];
      notes.forEach((hz, i) => {
        scheduleKalimbaNote(audioCtx, masterGain, hz, now + i * 0.11, 0.30, 0.18);
      });
    }
  },
};

if (typeof window !== 'undefined') {
  window.DartAudio = DartAudio;
}
