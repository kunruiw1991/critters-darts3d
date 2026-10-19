import { createDartScene, CRITTER_META, STAGE_LAYOUTS } from './scene3d.js';
import { DartAudio } from './audio.js';

// Gentle, 5-year-old-friendly Top-3 Podium qualification thresholds
const RIVAL_SCORES = [210, 140, 80, 35];
const RIVAL_CRITTERS = ['dogday', 'catnap', 'bobby', 'hoppy'];
const PLAYER_CRITTER = 'craftycorn';
const MAX_DARTS_PER_STAGE = 12;

// Penalties & Negative Score Out ("射丢了罚分，分数太负就出局了")
export const MISS_PENALTY = -15;
export const OBSTACLE_PENALTY = -15;
export const BAD_BABA_PENALTY = -25;
export const BUST_SCORE_THRESHOLD = -45;

const state = {
  stage: 1,
  maxStages: 7,
  score: 0,
  combo: 0,
  hits: 0,
  misses: 0,
  obstacleHits: 0,
  badBabaHits: 0,
  yells: 0,
  dartsLeft: MAX_DARTS_PER_STAGE,
  maxDarts: MAX_DARTS_PER_STAGE,
  dartType: 'normal',
  roundOver: false,
  isBusted: false,
  rank: 5,
  stars: 0,
  elapsed: 0,
  lastYellCritter: null,
  lastYellWord: '',
};

let sceneApi = null;
let roundFinishTimer = 0;

function computeRankAndStars(score, isBusted = false) {
  if (isBusted || score <= BUST_SCORE_THRESHOLD) {
    return { rank: 5, stars: 0 };
  }
  let rank = 1;
  for (const rScore of RIVAL_SCORES) {
    if (score < rScore) rank += 1;
  }
  let stars = 0;
  if (rank === 1) stars = 3;
  else if (rank === 2) stars = 2;
  else if (rank === 3) stars = 1;
  else stars = 0;
  return { rank, stars };
}

// Preload all 9 Smiling Critter images so popup badges render immediately on frame 0
if (typeof Image !== 'undefined') {
  Object.keys(CRITTER_META).forEach((cid) => {
    const img = new Image();
    img.src = `./assets/${cid}.png`;
  });
}

const activeYellBadges = [];

function updateYellBadges(dt) {
  for (let i = activeYellBadges.length - 1; i >= 0; i--) {
    const b = activeYellBadges[i];
    b.age = (b.age || 0) + dt;
    b.life -= dt;
    if (b.el) {
      const u = Math.min(1, b.age / (b.maxLife || 1.45));
      const liftPx = 58 + u * 52;
      const scale = u < 0.2 ? 1.04 + (u / 0.2) * 0.12 : 1.16 - ((u - 0.2) / 0.8) * 0.18;
      const opacity = u > 0.78 ? Math.max(0, 1 - (u - 0.78) / 0.22) : 1;
      b.el.style.transform = `translate(-50%, -${liftPx}%) scale(${scale.toFixed(3)})`;
      b.el.style.opacity = `${opacity.toFixed(3)}`;
    }
    if (b.life <= 0) {
      if (b.el && b.el.parentNode) b.el.parentNode.removeChild(b.el);
      activeYellBadges.splice(i, 1);
    }
  }
}

function clearYellBadges() {
  for (const b of activeYellBadges) {
    if (b.el && b.el.parentNode) b.el.parentNode.removeChild(b.el);
  }
  activeYellBadges.length = 0;
}

function spawnFloatingYellBadge({ critterId, yellWord, points, screenX, screenY, isNegative = false }) {
  const layer = document.getElementById('yellPopupLayer');
  if (!layer) return;

  while (activeYellBadges.length >= 2) {
    const oldest = activeYellBadges.shift();
    if (oldest && oldest.el && oldest.el.parentNode) {
      oldest.el.parentNode.removeChild(oldest.el);
    }
  }

  const badge = document.createElement('div');
  badge.className = `yell-popup-badge ${isNegative ? 'penalty-badge' : ''}`;
  const clampedX = Math.max(115, Math.min((window.innerWidth || 1280) - 115, screenX || 640));
  const clampedY = Math.max(115, Math.min((window.innerHeight || 800) - 170, screenY || 320));
  badge.style.left = `${clampedX}px`;
  badge.style.top = `${clampedY}px`;

  const signStr = points > 0 ? `+${points}` : `${points}`;
  const avatarHtml = critterId
    ? `<div class="yell-popup-avatar" style="background-image:url('./assets/${critterId}.png')"></div>`
    : '';

  badge.innerHTML = `
    ${avatarHtml}
    <span class="yell-popup-word">${yellWord}</span>
    <span class="yell-popup-pts ${isNegative ? 'neg-pts' : ''}">${signStr}</span>
  `;
  layer.appendChild(badge);
  activeYellBadges.push({ el: badge, age: 0, life: 1.35, maxLife: 1.35 });
}

function checkBustCondition() {
  if (!state.roundOver && state.score <= BUST_SCORE_THRESHOLD) {
    state.isBusted = true;
    state.roundOver = true;
    state.rank = 5;
    state.stars = 0;
    DartAudio.playOutBust();
    showPodiumModal();
    return true;
  }
  return false;
}

function handleCritterHit({ critterId, meta, isCenter, dartType, screenX, screenY }) {
  if (state.roundOver) return;
  state.combo += 1;
  state.hits += 1;
  state.yells += 1;
  state.lastYellCritter = critterId;
  state.lastYellWord = meta.yellWord;

  const basePts = isCenter ? 65 : 45;
  const comboBonus = Math.min(45, (state.combo - 1) * 15);
  const gained = basePts + comboBonus;
  state.score += gained;

  DartAudio.playCuteCritterYell(critterId, state.combo);

  spawnFloatingYellBadge({
    critterId,
    yellWord: meta.yellWord,
    points: gained,
    screenX,
    screenY,
    isNegative: false,
  });

  updateHud();
}

function handleBadCritterHit({ critterId, meta, screenX, screenY }) {
  if (state.roundOver) return;
  state.combo = 0;
  state.badBabaHits += 1;
  state.lastYellCritter = critterId;
  state.lastYellWord = 'BAD!';
  state.score += BAD_BABA_PENALTY;

  DartAudio.playBadBabaYell();

  spawnFloatingYellBadge({
    critterId: 'baba',
    yellWord: 'BAD!',
    points: BAD_BABA_PENALTY,
    screenX,
    screenY,
    isNegative: true,
  });

  updateHud();
  checkBustCondition();
}

function handleObstacleHit({ screenX, screenY }) {
  if (state.roundOver) return;
  state.combo = 0;
  state.obstacleHits += 1;
  state.score += OBSTACLE_PENALTY;

  DartAudio.playObstacleClang();

  spawnFloatingYellBadge({
    critterId: null,
    yellWord: 'BLOCK!',
    points: OBSTACLE_PENALTY,
    screenX,
    screenY,
    isNegative: true,
  });

  updateHud();
  checkBustCondition();
}

function handleBoardMiss({ screenX, screenY }) {
  if (state.roundOver) return;
  state.combo = 0;
  state.misses += 1;
  state.score += MISS_PENALTY;

  DartAudio.playMissPenalty();

  spawnFloatingYellBadge({
    critterId: null,
    yellWord: 'MISS!',
    points: MISS_PENALTY,
    screenX,
    screenY,
    isNegative: true,
  });

  updateHud();
  checkBustCondition();
}

function updateHud() {
  const stageText = document.getElementById('stageLabel');
  if (stageText) stageText.textContent = `STAGE ${state.stage}`;

  // Update active stage hazard picture badges (Shield, Move, Bad Baba)
  const layout = STAGE_LAYOUTS[state.stage] || STAGE_LAYOUTS[1];
  const shieldIcon = document.getElementById('ruleIconShield');
  const moveIcon = document.getElementById('ruleIconMove');
  const babaIcon = document.getElementById('ruleIconBaba');
  if (shieldIcon) shieldIcon.classList.toggle('active', (layout.obstacles || 0) > 0);
  if (moveIcon) moveIcon.classList.toggle('active', (layout.moveAmpX || 0) > 0);
  if (babaIcon) babaIcon.classList.toggle('active', (layout.badBabaIndices || []).length > 0);

  const scoreText = document.getElementById('scoreLabel');
  const scorePill = document.getElementById('scorePill');
  if (scoreText) {
    scoreText.textContent = `SCORE ${state.score}`;
    scoreText.classList.toggle('negative', state.score < 0);
  }
  if (scorePill) {
    scorePill.classList.toggle('danger-negative', state.score < 0);
  }

  const barFill = document.getElementById('scoreBarFill');
  const bustFill = document.getElementById('bustBarFill');
  if (barFill) {
    const pct = state.score > 0 ? Math.min(100, Math.round((state.score / RIVAL_SCORES[0]) * 100)) : 0;
    barFill.style.width = `${pct}%`;
  }
  if (bustFill) {
    const negPct =
      state.score < 0
        ? Math.min(100, Math.round((Math.abs(state.score) / Math.abs(BUST_SCORE_THRESHOLD)) * 100))
        : 0;
    bustFill.style.width = `${negPct}%`;
  }

  const star1 = document.getElementById('hudStar1');
  const star2 = document.getElementById('hudStar2');
  const star3 = document.getElementById('hudStar3');
  if (star1) star1.classList.toggle('earned', state.score >= RIVAL_SCORES[2]);
  if (star2) star2.classList.toggle('earned', state.score >= RIVAL_SCORES[1]);
  if (star3) star3.classList.toggle('earned', state.score >= RIVAL_SCORES[0]);

  const dartsCountEl = document.getElementById('dartsCountLabel');
  if (dartsCountEl) dartsCountEl.textContent = `${state.dartsLeft}`;

  const dartPipsWrap = document.getElementById('dartPips');
  if (dartPipsWrap && dartPipsWrap.children.length === state.maxDarts) {
    Array.from(dartPipsWrap.children).forEach((pip, idx) => {
      pip.classList.toggle('spent', idx >= state.dartsLeft);
    });
  }

  const btnMap = {
    normal: document.getElementById('btnDartNormal'),
    triple: document.getElementById('btnDartTriple'),
    super: document.getElementById('btnDartSuper'),
  };
  Object.entries(btnMap).forEach(([type, btn]) => {
    if (btn) btn.classList.toggle('active', state.dartType === type);
  });
}

function selectDartType(dartType) {
  if (!['normal', 'triple', 'super'].includes(dartType)) return;
  state.dartType = dartType;
  if (sceneApi) sceneApi.refreshPreviewDart(dartType);
  DartAudio.playSelectDart(dartType);
  updateHud();
}

function fireCurrentDart(sightWorldPos = null, isDirectImpactPoint = false) {
  if (state.roundOver || state.dartsLeft <= 0) return false;
  if (!sceneApi) return false;

  state.dartsLeft -= 1;
  roundFinishTimer = 0.65;
  DartAudio.playDartThrow(state.dartType);
  sceneApi.shootDartAt(sightWorldPos, state.dartType, isDirectImpactPoint);
  updateHud();
  return true;
}

function showPodiumModal() {
  const modal = document.getElementById('podiumModal');
  if (!modal) return;

  const { rank, stars } = computeRankAndStars(state.score, state.isBusted);
  state.rank = rank;
  state.stars = stars;

  const entries = [
    { critterId: PLAYER_CRITTER, score: state.score, isPlayer: true },
    ...RIVAL_CRITTERS.map((cid, idx) => ({
      critterId: cid,
      score: RIVAL_SCORES[idx],
      isPlayer: false,
    })),
  ];
  entries.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return a.isPlayer ? -1 : 1;
  });

  const starsRow = document.getElementById('podiumStarsRow');
  if (starsRow) {
    Array.from(starsRow.children).forEach((starEl, idx) => {
      starEl.classList.toggle('earned', idx < stars);
    });
  }

  const titleEl = document.getElementById('podiumStatusWord');
  if (titleEl) {
    if (state.isBusted) {
      titleEl.textContent = 'OUT!';
    } else {
      titleEl.textContent = stars >= 3 ? 'WIN!' : stars >= 1 ? 'CLEAR!' : 'TRY!';
    }
  }

  const rowsContainer = document.getElementById('podiumList');
  if (rowsContainer) {
    rowsContainer.innerHTML = entries
      .map((item, idx) => {
        const rNum = idx + 1;
        const badgeColor =
          rNum === 1 ? '#fbbf24' : rNum === 2 ? '#cbd5e1' : rNum === 3 ? '#f59e0b' : '#e2e8f0';
        const barPct = Math.max(0, Math.min(100, Math.round((Math.max(0, item.score) / 240) * 100)));
        return `
          <div class="podium-row ${item.isPlayer ? 'player-row' : ''} ${rNum <= 3 ? 'top3-row' : ''}">
            <div class="podium-rank-circle" style="background:${badgeColor}">${rNum}</div>
            <img class="podium-avatar" src="./assets/${item.critterId}.png" alt="${item.critterId}" />
            <div class="podium-bar-wrap">
              <div class="podium-bar-fill" style="width:${barPct}%"></div>
            </div>
            <div class="podium-score-num">${item.score}</div>
          </div>
        `;
      })
      .join('');
  }

  // Strict Top-3 Podium Qualification: only show NEXT button when rank <= 3 (stars >= 1) and not Busted
  const nextBtn = document.getElementById('btnNextStage');
  if (nextBtn) {
    nextBtn.style.display = stars >= 1 && !state.isBusted ? 'flex' : 'none';
  }

  modal.classList.add('visible');
}

function hidePodiumModal() {
  const modal = document.getElementById('podiumModal');
  if (modal) modal.classList.remove('visible');
}

function startStage(stageNum = 1) {
  const clamped = ((stageNum - 1) % state.maxStages) + 1;
  state.stage = clamped;
  state.elapsed = 0;
  state.score = 0;
  state.combo = 0;
  state.hits = 0;
  state.misses = 0;
  state.obstacleHits = 0;
  state.badBabaHits = 0;
  state.yells = 0;
  state.dartsLeft = state.maxDarts;
  state.roundOver = false;
  state.isBusted = false;
  state.rank = 5;
  state.stars = 0;
  roundFinishTimer = 0;

  hidePodiumModal();
  clearYellBadges();
  if (sceneApi) {
    sceneApi.rebuildStageTargets(clamped);
    sceneApi.refreshPreviewDart(state.dartType);
  }
  updateHud();
}

function stepSingleSubstep(dt, shouldRender = true) {
  state.elapsed += dt;
  updateYellBadges(dt);
  if (sceneApi) {
    sceneApi.step(dt, state.elapsed, shouldRender);
  }

  if (!state.roundOver && state.dartsLeft <= 0) {
    const inFlight = sceneApi ? sceneApi.getFlyingDartCount() : 0;
    if (inFlight === 0) {
      roundFinishTimer -= dt;
      if (roundFinishTimer <= 0) {
        state.roundOver = true;
        const { rank, stars } = computeRankAndStars(state.score, state.isBusted);
        state.rank = rank;
        state.stars = stars;
        DartAudio.playWaveResult(stars);
        showPodiumModal();
      }
    }
  }
}

function stepGame(dt) {
  let rem = Math.min(2.0, Math.max(0.001, dt));
  while (rem > 0.0001) {
    const stepDt = Math.min(1 / 60, rem);
    const isLast = rem - stepDt <= 0.0001;
    stepSingleSubstep(stepDt, isLast);
    rem -= stepDt;
  }
}

function initGame() {
  const canvas = document.getElementById('gameCanvas');
  if (!canvas) return;

  const dartPipsWrap = document.getElementById('dartPips');
  if (dartPipsWrap) {
    dartPipsWrap.innerHTML = Array.from({ length: state.maxDarts })
      .map(
        () => `
        <svg class="dart-pip" viewBox="0 0 24 24">
          <path d="M12 2 L16 10 L13 10 L14 19 L17 22 L7 22 L10 19 L11 10 L8 10 Z" fill="#ff4757" stroke="#4a2c18" stroke-width="1.8" stroke-linejoin="round"/>
          <circle cx="12" cy="5" r="2.2" fill="#fde047"/>
        </svg>
      `
      )
      .join('');
  }

  sceneApi = createDartScene(canvas, {
    onCritterHit: handleCritterHit,
    onBadCritterHit: handleBadCritterHit,
    onObstacleHit: handleObstacleHit,
    onBoardMiss: handleBoardMiss,
  });

  // Parabolic Curve & Lead-Prediction Aiming on the 3D Canvas ("射飞镖要有曲线预判的引擎，不能点哪儿就是哪儿")
  canvas.addEventListener('pointerdown', (e) => {
    if (state.roundOver) return;
    DartAudio.init();
    const sightPt = sceneApi.setAimFromClient(e.clientX, e.clientY);
    fireCurrentDart(sightPt, false);
  });

  canvas.addEventListener('pointermove', (e) => {
    if (state.roundOver) return;
    sceneApi.setAimFromClient(e.clientX, e.clientY);
  });

  // Top-Left Stage Cycle Picture Button (#stageBtn)
  const stageBtn = document.getElementById('stageBtn');
  if (stageBtn) {
    stageBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      DartAudio.init();
      const nextS = (state.stage % state.maxStages) + 1;
      DartAudio.playStageSwitch(nextS);
      startStage(nextS);
    });
  }

  // Top-Right Sound Picture Button (#soundBtn)
  const soundBtn = document.getElementById('soundBtn');
  if (soundBtn) {
    soundBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      DartAudio.init();
      const isMuted = DartAudio.toggleMute();
      soundBtn.classList.toggle('muted', isMuted);
      const soundWord = document.getElementById('soundLabel');
      if (soundWord) soundWord.textContent = isMuted ? 'MUTE' : 'SOUND';
    });
  }

  // Bottom Picture Buttons (#btnDartNormal, #btnDartTriple, #btnDartSuper, #btnShoot)
  const btnNormal = document.getElementById('btnDartNormal');
  if (btnNormal) {
    btnNormal.addEventListener('click', (e) => {
      e.stopPropagation();
      DartAudio.init();
      selectDartType('normal');
    });
  }

  const btnTriple = document.getElementById('btnDartTriple');
  if (btnTriple) {
    btnTriple.addEventListener('click', (e) => {
      e.stopPropagation();
      DartAudio.init();
      selectDartType('triple');
    });
  }

  const btnSuper = document.getElementById('btnDartSuper');
  if (btnSuper) {
    btnSuper.addEventListener('click', (e) => {
      e.stopPropagation();
      DartAudio.init();
      selectDartType('super');
    });
  }

  const btnShoot = document.getElementById('btnShoot');
  if (btnShoot) {
    btnShoot.addEventListener('click', (e) => {
      e.stopPropagation();
      DartAudio.init();
      // Assistive kid-friendly SHOOT button uses the lead-prediction solver to aim along the parabolic curve!
      const pads = sceneApi.getCritterTargets();
      if (pads && pads.length > 0) {
        const targetIdx = (state.maxDarts - state.dartsLeft) % pads.length;
        const leadSight = sceneApi.getLeadPredictedSightForPad(targetIdx);
        fireCurrentDart(leadSight, false);
      } else {
        fireCurrentDart(null, false);
      }
    });
  }

  // Podium Modal Picture Buttons (#btnRetryStage, #btnNextStage)
  const btnRetry = document.getElementById('btnRetryStage');
  if (btnRetry) {
    btnRetry.addEventListener('click', (e) => {
      e.stopPropagation();
      DartAudio.init();
      startStage(state.stage);
    });
  }

  const btnNext = document.getElementById('btnNextStage');
  if (btnNext) {
    btnNext.addEventListener('click', (e) => {
      e.stopPropagation();
      if (state.stars < 1 || state.isBusted) return;
      DartAudio.init();
      const nextS = (state.stage % state.maxStages) + 1;
      DartAudio.playStageSwitch(nextS);
      startStage(nextS);
    });
  }

  startStage(1);

  let prevTime = performance.now();
  function loop(now) {
    const dt = Math.min(0.05, Math.max(0.001, (now - prevTime) / 1000));
    prevTime = now;
    stepGame(dt);
    window.requestAnimationFrame(loop);
  }
  window.requestAnimationFrame(loop);
}

// Expose deterministic testing & inspection hooks on window
if (typeof window !== 'undefined') {
  window.critterDartsGame = {
    get state() {
      return state;
    },
    get sceneApi() {
      return sceneApi;
    },
    startStage,
    selectDartType,
    fireCurrentDart,
    stepGame,
    getTargetScreenPositions: () => (sceneApi ? sceneApi.getTargetScreenPositions() : []),
    shootCritterByIndex: (idx = 0) => {
      if (!sceneApi) return false;
      const leadSight = sceneApi.getLeadPredictedSightForPad(idx);
      return fireCurrentDart(leadSight, false);
    },
    shootRawAtImpact: (x, y) => {
      if (!sceneApi) return false;
      const vec = sceneApi.getCritterPadWorldPosition(0).clone();
      vec.x = x;
      vec.y = y;
      return fireCurrentDart(vec, true);
    },
  };
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initGame);
} else {
  initGame();
}
