# 🎯 Critter Darts 3D: Sunny Carnival Target Shoot!

**Live Game (GitHub Pages):** [https://kunruiw1991.github.io/critters-darts3d/](https://kunruiw1991.github.io/critters-darts3d/)  
**Repository:** [https://github.com/kunruiw1991/critters-darts3d](https://github.com/kunruiw1991/critters-darts3d)

![Critter Darts 3D Gameplay Screenshot](./screenshot.jpg)

---

## 🌟 Highlights & Core Features

- **High-Resolution 3D Carnival Stage (`Three.js r161` WebGL)**:
  - **Giant 3D Carnival Dartboard Wheel**: Candy-red & gold 3D carnival wheel rim with 24 animated marquee bulbs, wooden stage floor, and Ferris-wheel upright-stabilized 3D Smiling Critter target pads (`Bobby BearHug`, `DogDay`, `CatNap`, `Hoppy Hopscotch`, `CraftyCorn`, `PickyPiggy`, `Bubba Bubbaphant`, `KickinChicken`, and `Baba Chops`).
  - **Full 3D `v11` Smiling Critter Stage Cheerleaders**: High-resolution 3D `CatNap` and `DogDay` plush models (`models/catnap_plush_base_model.glb` and `models/dogday_plush_base_model.glb` with batch-merged 3D cotton stitches for fast 60 FPS WebGL rendering) cheering on golden left/right pedestals whenever you land a hit!
  - **3D Parabolic Dart Flight & Rotation Lead Compensation**: 14-pearl parabolic trajectory preview arc, 3D multi-finned carnival darts (`DART`, `TRIPLE`, `SUPER`), spring-wobble impact pinning, 3D expanding sonic yell wave rings, and 3D golden star crowns.

- **Cute Critter Vocal Yell Synthesizer (`js/audio.js`) & Comic Yell Popups**:
  - **Formant-Synthesized Cute Critter Yells**: Every Smiling Critter has a bespoke vocal formant profile (`CRITTER_YELL_PROFILES`) routing a glottal waveform (`sawtooth` + `triangle` + `sine`) through dual resonant vowel formant filters (`F1` / `F2`) with pitch-bend inflection, vibrato LFO, plush squeaker pop, and joyful pentatonic kalimba chimes.
  - **3D & 2D Cute Yell Reactions**: Hitting any Smiling Critter on the target makes them bounce forward in 3D with squash-and-stretch animation, emit 3D expanding sonic rings, play their cute vocal yell, and pop a comic speech bubble (`MEW!`, `YIP!`, `YAY!`, `WHEE!`, `WOW!`, `OINK!`, `TOOT!`, `PEEP!`, `BAA!`).

- **Bright, Clean Picture-Button UI (Simple Single-Word Labels)**:
  - Designed for instant visual clarity with large illustrated picture buttons and single simple English words (`STAGE 1..3`, `SCORE`, `SOUND`, `DART`, `TRIPLE`, `SUPER`, `SHOOT`, `WIN!`, `RETRY`, `NEXT`).
  - **6 Primary Controls**:
    1. `STAGE 1..3` (Top-left crown stage switcher)
    2. `SOUND` / `MUTE` (Top-right speaker toggle)
    3. `DART` (Single precision golden dart)
    4. `TRIPLE` (3-dart spread volley)
    5. `SUPER` (Giant star-burst shockwave dart that triggers nearby Critters to yell in chorus)
    6. `SHOOT` (One-tap auto-aim Critter shot — or tap/click directly anywhere on the 3D wheel!)

- **3 Stages & Top-3 Podium Qualification**:
  - **Stage 1**: 6 Critters (1 center `Bobby BearHug` + 5 outer ring Critters) at gentle carnival wheel speed.
  - **Stage 2**: 7 Critters with radial bobbing motion and medium wheel speed.
  - **Stage 3**: 8 Critters with fast carnival wheel spin and radial oscillation.
  - **Top-3 Podium Qualification**:
    - 🥇 **1st Place (`>= 480` pts)**: `⭐⭐⭐` (`WIN!`, unlocks `NEXT`)
    - 🥈 **2nd Place (`>= 320` pts)**: `⭐⭐` (`CLEAR!`, unlocks `NEXT`)
    - 🥉 **3rd Place (`>= 180` pts)**: `⭐` (`CLEAR!`, unlocks `NEXT`)
    - **4th / 5th Place (`< 180` pts)**: `0⭐` (`TRY!`, `NEXT` hidden, must `RETRY`)
