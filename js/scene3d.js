import * as THREE from '../models/three.module.min.js';
import { buildCatNapPlushModel } from '../models/catnap_model.js';
import { buildDogDayPlushModel } from '../models/dogday_model.js';

export const CRITTER_META = {
  catnap: {
    id: 'catnap',
    name: 'CatNap',
    yellWord: 'MEW!',
    colorHex: 0x8a5cf5,
    rimHex: 0xc084fc,
    badgeBg: '#f3e8ff',
  },
  dogday: {
    id: 'dogday',
    name: 'DogDay',
    yellWord: 'YIP!',
    colorHex: 0xf97316,
    rimHex: 0xfbbf24,
    badgeBg: '#ffedd5',
  },
  bobby: {
    id: 'bobby',
    name: 'Bobby',
    yellWord: 'YAY!',
    colorHex: 0xf43f5e,
    rimHex: 0xfda4af,
    badgeBg: '#ffe4e6',
  },
  hoppy: {
    id: 'hoppy',
    name: 'Hoppy',
    yellWord: 'WHEE!',
    colorHex: 0x22c55e,
    rimHex: 0x86efac,
    badgeBg: '#dcfce7',
  },
  craftycorn: {
    id: 'craftycorn',
    name: 'Crafty',
    yellWord: 'WOW!',
    colorHex: 0x06b6d4,
    rimHex: 0x67e8f9,
    badgeBg: '#cffafe',
  },
  picky: {
    id: 'picky',
    name: 'Picky',
    yellWord: 'OINK!',
    colorHex: 0xec4899,
    rimHex: 0xf9a8d4,
    badgeBg: '#fce7f3',
  },
  bubba: {
    id: 'bubba',
    name: 'Bubba',
    yellWord: 'TOOT!',
    colorHex: 0x3b82f6,
    rimHex: 0x93c5fd,
    badgeBg: '#dbeafe',
  },
  kickin: {
    id: 'kickin',
    name: 'Kickin',
    yellWord: 'PEEP!',
    colorHex: 0xeab308,
    rimHex: 0xfde047,
    badgeBg: '#fef9c3',
  },
  baba: {
    id: 'baba',
    name: 'Baba',
    yellWord: 'BAA!',
    colorHex: 0xa855f7,
    rimHex: 0xd8b4fe,
    badgeBg: '#f3e8ff',
  },
};

/**
 * 7-Stage Progressive Carnival Difficulty System (Gentle for a 5-year-old):
 * - Stage 1: Classic Gentle Spin + Smaller Critters (~50% board area) + Parabolic Curve & Lead
 * - Stage 2: + 3D Orbiting Obstacle Shields in front of board ("第二关有遮挡物")
 * - Stage 3: + Whole Dartboard Glides Slowly Side-to-Side ("第三关盘子整体缓速移动")
 * - Stage 4: + Bad Baba Chops Hazard Targets (-25 pts) ("第四关有baba chops是坏的 射中负分")
 * - Stage 5: Fusion 1 — 3D Obstacle Shields + Slow Gliding Board
 * - Stage 6: Fusion 2 — 3D Obstacle Shields + Bad Baba Chops
 * - Stage 7: Grand Finale Fusion — 3D Obstacles + Slow Gliding Board + Bad Baba Chops
 */
export const STAGE_LAYOUTS = {
  1: {
    wheelSpeed: 0.36,
    centerCritter: 'bobby',
    outerCritters: ['dogday', 'catnap', 'hoppy', 'craftycorn', 'picky'],
    outerRadius: 1.54,
    bobAmplitude: 0.0,
    obstacles: 0,
    obstacleSpeed: 0.0,
    obstacleRadius: 1.48,
    moveAmpX: 0.0,
    moveAmpY: 0.0,
    moveSpeed: 0.0,
    badBabaIndices: [],
  },
  2: {
    wheelSpeed: 0.38,
    centerCritter: 'craftycorn',
    outerCritters: ['dogday', 'catnap', 'bobby', 'hoppy', 'bubba'],
    outerRadius: 1.54,
    bobAmplitude: 0.0,
    obstacles: 2,
    obstacleSpeed: -0.50,
    obstacleRadius: 1.48,
    moveAmpX: 0.0,
    moveAmpY: 0.0,
    moveSpeed: 0.0,
    badBabaIndices: [],
  },
  3: {
    wheelSpeed: 0.36,
    centerCritter: 'catnap',
    outerCritters: ['dogday', 'bobby', 'hoppy', 'craftycorn', 'kickin'],
    outerRadius: 1.54,
    bobAmplitude: 0.0,
    obstacles: 0,
    obstacleSpeed: 0.0,
    obstacleRadius: 1.48,
    moveAmpX: 1.05,
    moveAmpY: 0.22,
    moveSpeed: 0.56,
    badBabaIndices: [],
  },
  4: {
    wheelSpeed: 0.40,
    centerCritter: 'dogday',
    outerCritters: ['catnap', 'baba', 'hoppy', 'bobby', 'baba', 'craftycorn'],
    outerRadius: 1.56,
    bobAmplitude: 0.0,
    obstacles: 0,
    obstacleSpeed: 0.0,
    obstacleRadius: 1.48,
    moveAmpX: 0.0,
    moveAmpY: 0.0,
    moveSpeed: 0.0,
    badBabaIndices: [1, 4],
  },
  5: {
    wheelSpeed: 0.38,
    centerCritter: 'hoppy',
    outerCritters: ['dogday', 'catnap', 'bobby', 'craftycorn', 'picky'],
    outerRadius: 1.54,
    bobAmplitude: 0.0,
    obstacles: 2,
    obstacleSpeed: -0.46,
    obstacleRadius: 1.48,
    moveAmpX: 0.88,
    moveAmpY: 0.18,
    moveSpeed: 0.50,
    badBabaIndices: [],
  },
  6: {
    wheelSpeed: 0.40,
    centerCritter: 'picky',
    outerCritters: ['dogday', 'baba', 'catnap', 'hoppy', 'baba', 'bobby'],
    outerRadius: 1.56,
    bobAmplitude: 0.0,
    obstacles: 2,
    obstacleSpeed: -0.46,
    obstacleRadius: 1.48,
    moveAmpX: 0.0,
    moveAmpY: 0.0,
    moveSpeed: 0.0,
    badBabaIndices: [1, 4],
  },
  7: {
    wheelSpeed: 0.40,
    centerCritter: 'craftycorn',
    outerCritters: ['dogday', 'baba', 'catnap', 'hoppy', 'bobby', 'kickin'],
    outerRadius: 1.56,
    bobAmplitude: 0.05,
    obstacles: 2,
    obstacleSpeed: -0.44,
    obstacleRadius: 1.48,
    moveAmpX: 0.80,
    moveAmpY: 0.16,
    moveSpeed: 0.46,
    badBabaIndices: [1],
  },
};

function createSkyBackdropTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  // Bright, sunny, crystal-clear pastel carnival sky gradient
  const grad = ctx.createLinearGradient(0, 0, 0, 512);
  grad.addColorStop(0.0, '#bae6fd');
  grad.addColorStop(0.45, '#e0f2fe');
  grad.addColorStop(0.82, '#fffbeb');
  grad.addColorStop(1.0, '#fde68a');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 512, 512);

  // Soft sunbeams radiating from top center
  ctx.save();
  ctx.translate(256, 70);
  for (let i = 0; i < 16; i++) {
    ctx.rotate((Math.PI * 2) / 16);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.18)';
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(-28, 600);
    ctx.lineTo(28, 600);
    ctx.closePath();
    ctx.fill();
  }
  ctx.restore();

  // Fluffy white storybook clouds
  const clouds = [
    [95, 130, 44],
    [135, 125, 52],
    [175, 135, 38],
    [375, 110, 46],
    [418, 106, 54],
    [455, 118, 38],
  ];
  ctx.fillStyle = 'rgba(255, 255, 255, 0.86)';
  for (const [cx, cy, r] of clouds) {
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fill();
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function createDartboardFaceTexture() {
  const size = 1024;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  const cx = size / 2;
  const cy = size / 2;
  const maxR = size * 0.485;

  ctx.clearRect(0, 0, size, size);

  // 12 cheerful carnival radial wedges (clearly visible around the smaller ~50%-area Critter pads)
  const sectorColors = [
    '#fffdf9', '#ffe4e6',
    '#fffdf9', '#e0f2fe',
    '#fffdf9', '#fef3c7',
    '#fffdf9', '#dcfce7',
    '#fffdf9', '#f3e8ff',
    '#fffdf9', '#ffedd5',
  ];
  const nSectors = 12;
  for (let i = 0; i < nSectors; i++) {
    const a0 = (i / nSectors) * Math.PI * 2;
    const a1 = ((i + 1) / nSectors) * Math.PI * 2;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, maxR, a0, a1);
    ctx.closePath();
    ctx.fillStyle = sectorColors[i % sectorColors.length];
    ctx.fill();
    ctx.lineWidth = 4;
    ctx.strokeStyle = 'rgba(124, 74, 45, 0.22)';
    ctx.stroke();
  }

  // Concentric target scoring rings
  const rings = [
    { r: maxR * 0.96, stroke: '#fb7185', width: 22 },
    { r: maxR * 0.72, stroke: '#38bdf8', width: 16 },
    { r: maxR * 0.46, stroke: '#34d399', width: 16 },
    { r: maxR * 0.23, stroke: '#f59e0b', width: 18 },
  ];
  for (const ring of rings) {
    ctx.beginPath();
    ctx.arc(cx, cy, ring.r, 0, Math.PI * 2);
    ctx.lineWidth = ring.width;
    ctx.strokeStyle = ring.stroke;
    ctx.stroke();
  }

  // Center golden star bullseye
  ctx.beginPath();
  ctx.arc(cx, cy, maxR * 0.19, 0, Math.PI * 2);
  ctx.fillStyle = '#fef08a';
  ctx.fill();
  ctx.lineWidth = 7;
  ctx.strokeStyle = '#d97706';
  ctx.stroke();

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function createWoodStageTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#f3d5b5';
  ctx.fillRect(0, 0, 256, 256);
  for (let y = 0; y < 256; y += 4) {
    const shade = Math.floor(228 + Math.sin(y * 0.15) * 12);
    ctx.fillStyle = `rgb(${shade}, ${Math.floor(shade * 0.84)}, ${Math.floor(shade * 0.68)})`;
    ctx.fillRect(0, y, 256, 3);
  }
  ctx.strokeStyle = 'rgba(124, 74, 45, 0.16)';
  ctx.lineWidth = 2;
  for (let x = 0; x < 256; x += 32) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, 256);
    ctx.stroke();
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(6, 4);
  return tex;
}

/**
 * Creates a high-resolution 512x512 RGBA texture for a Smiling Critter target medallion.
 * When isBad === true (Bad Baba Chops in Stage 4+), adds a distinct crimson-purple hazard
 * warning aura, angry V-brows, and a clear red X badge so a 5-year-old immediately sees she is a hazard!
 */
function createCritterTargetTexture(renderer, critterId, isBad = false) {
  const size = 512;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  const meta = CRITTER_META[critterId] || CRITTER_META.catnap;

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  if (renderer && renderer.capabilities) {
    tex.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());
  }

  function draw(img) {
    ctx.clearRect(0, 0, size, size);

    const cx = size / 2;
    const cy = size / 2;
    const radGrad = ctx.createRadialGradient(cx, cy - 12, 30, cx, cy, 234);
    if (isBad) {
      radGrad.addColorStop(0.0, '#ffe4e6');
      radGrad.addColorStop(0.68, '#fda4af');
      radGrad.addColorStop(0.92, '#be123c');
      radGrad.addColorStop(1.0, 'rgba(190, 18, 60, 0.0)');
    } else {
      radGrad.addColorStop(0.0, '#ffffff');
      radGrad.addColorStop(0.72, meta.badgeBg || '#fffbeb');
      radGrad.addColorStop(1.0, 'rgba(255, 255, 255, 0.0)');
    }
    ctx.beginPath();
    ctx.arc(cx, cy, 236, 0, Math.PI * 2);
    ctx.fillStyle = radGrad;
    ctx.fill();

    if (img && img.naturalWidth > 0 && img.naturalHeight > 0) {
      ctx.save();
      ctx.shadowColor = isBad ? 'rgba(136, 19, 55, 0.55)' : 'rgba(45, 23, 12, 0.38)';
      ctx.shadowBlur = 18;
      ctx.shadowOffsetY = 8;
      const pad = 22;
      ctx.drawImage(img, pad, pad, size - pad * 2, size - pad * 2);
      ctx.restore();
    } else {
      const hex = isBad ? 0xe11d48 : meta.colorHex;
      const r = (hex >> 16) & 255;
      const g = (hex >> 8) & 255;
      const b = hex & 255;
      ctx.fillStyle = `rgb(${r},${g},${b})`;
      ctx.beginPath();
      ctx.arc(cx, cy, 170, 0, Math.PI * 2);
      ctx.fill();
    }

    // If this is Naughty/Bad Baba Chops (Stage 4+), draw a bold mischievous warning overlay
    if (isBad) {
      // Dashed red-and-yellow hazard border ring
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, 224, 0, Math.PI * 2);
      ctx.lineWidth = 16;
      ctx.setLineDash([28, 18]);
      ctx.strokeStyle = '#e11d48';
      ctx.stroke();

      // Mischievous angled eyebrows over Baba's eyes
      ctx.lineWidth = 14;
      ctx.lineCap = 'round';
      ctx.strokeStyle = '#4c0519';
      ctx.beginPath();
      ctx.moveTo(165, 148);
      ctx.lineTo(232, 178);
      ctx.moveTo(347, 148);
      ctx.lineTo(280, 178);
      ctx.stroke();

      // Corner red warning badge with bold white X
      const bx = 398;
      const by = 398;
      ctx.beginPath();
      ctx.arc(bx, by, 64, 0, Math.PI * 2);
      ctx.fillStyle = '#e11d48';
      ctx.fill();
      ctx.lineWidth = 8;
      ctx.setLineDash([]);
      ctx.strokeStyle = '#ffffff';
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(bx - 26, by - 26);
      ctx.lineTo(bx + 26, by + 26);
      ctx.moveTo(bx + 26, by - 26);
      ctx.lineTo(bx - 26, by + 26);
      ctx.lineWidth = 13;
      ctx.strokeStyle = '#ffffff';
      ctx.stroke();
      ctx.restore();
    }

    tex.needsUpdate = true;
  }

  draw(null);
  if (typeof Image !== 'undefined') {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => draw(img);
    img.src = `./assets/${critterId}.png`;
  }

  return tex;
}

/**
 * Builds a 3D Carnival Candy-Cloud Obstacle Shield for Stage 2 & combined stages ("第二关有遮挡物").
 */
function build3DObstacleShieldMesh(radius = 0.45) {
  const group = new THREE.Group();

  // Main glossy candy-striped bumper disc
  const shieldGeo = new THREE.CylinderGeometry(radius, radius * 1.04, 0.16, 36);
  shieldGeo.rotateX(Math.PI / 2);
  const shieldMat = new THREE.MeshStandardMaterial({
    color: 0x38bdf8,
    roughness: 0.28,
    metalness: 0.25,
  });
  const shieldMesh = new THREE.Mesh(shieldGeo, shieldMat);
  shieldMesh.castShadow = true;
  group.add(shieldMesh);

  // Fluffy 3D cloud puffs around the perimeter
  const puffMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    roughness: 0.35,
    metalness: 0.08,
  });
  const puffCount = 6;
  for (let i = 0; i < puffCount; i++) {
    const a = (i / puffCount) * Math.PI * 2;
    const puff = new THREE.Mesh(new THREE.SphereGeometry(radius * 0.42, 16, 14), puffMat);
    puff.position.set(Math.cos(a) * (radius * 0.72), Math.sin(a) * (radius * 0.72), 0.02);
    puff.scale.z = 0.55;
    group.add(puff);
  }

  // Gold & coral bumper ring on front
  const rimMesh = new THREE.Mesh(
    new THREE.TorusGeometry(radius * 0.78, 0.052, 14, 36),
    new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      roughness: 0.25,
      metalness: 0.65,
    })
  );
  rimMesh.position.z = 0.09;
  group.add(rimMesh);

  // Bold 3D coral X / Shield cross emblem on the front so kids know not to hit it
  const barGeo = new THREE.BoxGeometry(radius * 1.05, 0.13, 0.06);
  const barMat = new THREE.MeshStandardMaterial({
    color: 0xe11d48,
    roughness: 0.3,
    metalness: 0.2,
  });
  const bar1 = new THREE.Mesh(barGeo, barMat);
  bar1.position.z = 0.11;
  bar1.rotation.z = Math.PI / 4;
  group.add(bar1);

  const bar2 = new THREE.Mesh(barGeo, barMat);
  bar2.position.z = 0.11;
  bar2.rotation.z = -Math.PI / 4;
  group.add(bar2);

  return group;
}

/**
 * Builds a 3D Red Cross Hazard Sign above Bad Baba Chops
 */
function build3DHazardCrossMesh(size = 0.22) {
  const group = new THREE.Group();
  const geo = new THREE.BoxGeometry(size * 1.5, size * 0.38, 0.06);
  const mat = new THREE.MeshBasicMaterial({ color: 0xe11d48, toneMapped: false });
  const b1 = new THREE.Mesh(geo, mat);
  b1.rotation.z = Math.PI / 4;
  const b2 = new THREE.Mesh(geo, mat);
  b2.rotation.z = -Math.PI / 4;
  group.add(b1, b2);
  return group;
}

/**
 * Builds a sculpted 3D High-Resolution Dart mesh (normal, triple, or super)
 */
function build3DDartMesh(dartType = 'normal', colorHex = 0xff4757) {
  const root = new THREE.Group();
  const isSuper = dartType === 'super';
  const scale = isSuper ? 1.42 : 1.04;
  root.scale.setScalar(scale);

  const tipMat = new THREE.MeshStandardMaterial({
    color: isSuper ? 0xfbbf24 : 0xe2e8f0,
    roughness: 0.22,
    metalness: 0.85,
  });
  const tipGeo = new THREE.ConeGeometry(0.065, 0.26, 20);
  tipGeo.rotateX(-Math.PI / 2);
  const tipMesh = new THREE.Mesh(tipGeo, tipMat);
  tipMesh.position.z = -0.45;
  root.add(tipMesh);

  const collarMat = new THREE.MeshStandardMaterial({
    color: 0xfbbf24,
    roughness: 0.32,
    metalness: 0.55,
  });
  const collarMesh = new THREE.Mesh(new THREE.TorusGeometry(0.072, 0.024, 14, 28), collarMat);
  collarMesh.position.z = -0.31;
  root.add(collarMesh);

  const barrelMat = new THREE.MeshStandardMaterial({
    color: isSuper ? 0xa855f7 : colorHex,
    roughness: 0.35,
    metalness: 0.18,
  });
  const barrelGeo = new THREE.CylinderGeometry(0.078, 0.052, 0.58, 24);
  barrelGeo.rotateX(Math.PI / 2);
  const barrelMesh = new THREE.Mesh(barrelGeo, barrelMat);
  barrelMesh.position.z = -0.02;
  root.add(barrelMesh);

  const bandMat = new THREE.MeshBasicMaterial({ color: 0xffffff, toneMapped: false });
  const bandGeo = new THREE.CylinderGeometry(0.081, 0.075, 0.14, 24);
  bandGeo.rotateX(Math.PI / 2);
  const bandMesh = new THREE.Mesh(bandGeo, bandMat);
  bandMesh.position.z = -0.08;
  root.add(bandMesh);

  const finMat = new THREE.MeshStandardMaterial({
    color: isSuper ? 0xfacc15 : colorHex,
    emissive: isSuper ? 0xca8a04 : 0x000000,
    emissiveIntensity: isSuper ? 0.35 : 0.0,
    roughness: 0.4,
    metalness: 0.1,
    side: THREE.DoubleSide,
  });
  const finGeo = new THREE.BoxGeometry(0.018, 0.28, 0.26);
  for (let i = 0; i < 2; i++) {
    const fin = new THREE.Mesh(finGeo, finMat);
    fin.position.z = 0.26;
    fin.rotation.z = (i * Math.PI) / 2;
    root.add(fin);
  }

  const capMat = new THREE.MeshBasicMaterial({
    color: isSuper ? 0xfef08a : 0xffffff,
    toneMapped: false,
  });
  const cap = new THREE.Mesh(new THREE.SphereGeometry(0.06, 14, 12), capMat);
  cap.position.z = 0.34;
  root.add(cap);

  return root;
}

function buildStarMesh(radius = 0.18, colorHex = 0xfbbf24) {
  const shape = new THREE.Shape();
  const pts = 5;
  for (let i = 0; i < pts * 2; i++) {
    const r = i % 2 === 0 ? radius : radius * 0.46;
    const a = (i / (pts * 2)) * Math.PI * 2 - Math.PI / 2;
    const x = Math.cos(a) * r;
    const y = Math.sin(a) * r;
    if (i === 0) shape.moveTo(x, y);
    else shape.lineTo(x, y);
  }
  shape.closePath();
  const geo = new THREE.ExtrudeGeometry(shape, {
    depth: 0.045,
    bevelEnabled: true,
    bevelThickness: 0.015,
    bevelSize: 0.012,
    bevelSegments: 2,
  });
  geo.center();
  const mat = new THREE.MeshStandardMaterial({
    color: colorHex,
    emissive: colorHex,
    emissiveIntensity: 0.28,
    roughness: 0.25,
    metalness: 0.45,
  });
  return new THREE.Mesh(geo, mat);
}

export function createDartScene(canvas, callbacks = {}) {
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: false,
    powerPreference: 'high-performance',
    preserveDrawingBuffer: true,
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.NoToneMapping;

  const scene = new THREE.Scene();
  scene.background = createSkyBackdropTexture();

  const pmremGen = new THREE.PMREMGenerator(renderer);
  const envScene = new THREE.Scene();
  envScene.background = new THREE.Color(0xfff8eb);
  const sb1 = new THREE.Mesh(
    new THREE.PlaneGeometry(12, 12),
    new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide })
  );
  sb1.position.set(0, 7, 5);
  sb1.lookAt(0, 1.5, 0);
  envScene.add(sb1);
  scene.environment = pmremGen.fromScene(envScene, 0.04).texture;

  const hemiLight = new THREE.HemisphereLight(0xfffdf9, 0xf3d5b5, 1.25);
  hemiLight.position.set(0, 8, 2);
  scene.add(hemiLight);

  const dirLight = new THREE.DirectionalLight(0xffffff, 1.85);
  dirLight.position.set(2.8, 5.6, 6.2);
  dirLight.castShadow = true;
  dirLight.shadow.mapSize.set(1024, 1024);
  dirLight.shadow.camera.near = 1.0;
  dirLight.shadow.camera.far = 18.0;
  const sd = 5.5;
  dirLight.shadow.camera.left = -sd;
  dirLight.shadow.camera.right = sd;
  dirLight.shadow.camera.top = sd;
  dirLight.shadow.camera.bottom = -sd;
  dirLight.shadow.bias = -0.0008;
  scene.add(dirLight);

  const fillLight = new THREE.DirectionalLight(0xfff0f5, 0.85);
  fillLight.position.set(-4.0, 2.5, 4.5);
  scene.add(fillLight);

  const camera = new THREE.PerspectiveCamera(40, 16 / 10, 0.1, 60);
  const baseCamPos = new THREE.Vector3(0, 1.72, 6.55);
  const baseLookAt = new THREE.Vector3(0, 1.78, -1.80);

  // Carnival Wooden Stage Floor & Pillars
  const stageGroup = new THREE.Group();
  scene.add(stageGroup);

  const floorMesh = new THREE.Mesh(
    new THREE.BoxGeometry(16, 0.5, 10),
    new THREE.MeshStandardMaterial({
      map: createWoodStageTexture(),
      roughness: 0.72,
      metalness: 0.05,
    })
  );
  floorMesh.position.set(0, -1.45, -0.5);
  floorMesh.receiveShadow = true;
  stageGroup.add(floorMesh);

  const pillarMat = new THREE.MeshStandardMaterial({
    color: 0xb45309,
    roughness: 0.58,
    metalness: 0.15,
  });
  [-3.25, 3.25].forEach((px) => {
    const pillar = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.24, 4.4, 20), pillarMat);
    pillar.position.set(px, 0.70, -2.55);
    pillar.castShadow = true;
    stageGroup.add(pillar);
  });

  // Overhead Carnival Glide Rail (visual track for Stage 3+ moving dartboard)
  const railBar = new THREE.Mesh(
    new THREE.CylinderGeometry(0.08, 0.08, 6.7, 16),
    new THREE.MeshStandardMaterial({ color: 0xf59e0b, roughness: 0.3, metalness: 0.65 })
  );
  railBar.rotation.z = Math.PI / 2;
  railBar.position.set(0, 2.82, -2.55);
  stageGroup.add(railBar);

  // 2 Full 3D Articulated Smiling Critter Cheerleaders on Left & Right Stage Pedestals
  const pedestalMat = new THREE.MeshStandardMaterial({
    color: 0xfbbf24,
    roughness: 0.38,
    metalness: 0.32,
  });
  const stageCheerCritters = [];

  function addStageCheerleader(builderFn, xPos, rotY, colorHex) {
    const pedGroup = new THREE.Group();
    pedGroup.position.set(xPos, -0.82, -1.25);
    stageGroup.add(pedGroup);

    const pedBase = new THREE.Mesh(new THREE.CylinderGeometry(0.64, 0.74, 0.34, 28), pedestalMat);
    pedBase.receiveShadow = true;
    pedGroup.add(pedBase);

    const pedTop = new THREE.Mesh(
      new THREE.CylinderGeometry(0.56, 0.56, 0.08, 28),
      new THREE.MeshStandardMaterial({ color: colorHex, roughness: 0.5 })
    );
    pedTop.position.y = 0.19;
    pedGroup.add(pedTop);

    try {
      const rig = builderFn(THREE);
      rig.root.position.set(0, 0.21, 0);
      rig.root.rotation.y = rotY;
      rig.root.scale.setScalar(0.95);
      pedGroup.add(rig.root);
      stageCheerCritters.push({
        rig,
        baseY: 0.21,
        baseRotY: rotY,
        cheerTimer: 0,
      });
    } catch (_) {
      // Ignore if builder fails
    }
  }

  addStageCheerleader(buildCatNapPlushModel, -3.65, 0.36, 0x8a5cf5);
  addStageCheerleader(buildDogDayPlushModel, 3.65, -0.36, 0xf97316);

  // ============================================================================
  // GIANT 3D CARNIVAL DARTBOARD WHEEL
  // ============================================================================
  const BASE_WHEEL_CENTER = new THREE.Vector3(0, 1.84, -2.10);
  const BOARD_RADIUS = 2.52;

  const wheelMountGroup = new THREE.Group();
  wheelMountGroup.position.copy(BASE_WHEEL_CENTER);
  scene.add(wheelMountGroup);

  const targetWheelGroup = new THREE.Group();
  wheelMountGroup.add(targetWheelGroup);

  // 3D Orbiting Obstacle Shields Group (mounted in front of wheelMountGroup at z = +0.52)
  const OBSTACLE_LOCAL_Z = 0.52;
  const obstaclesGroup = new THREE.Group();
  obstaclesGroup.position.z = OBSTACLE_LOCAL_Z;
  wheelMountGroup.add(obstaclesGroup);

  // 3D Dartboard backing cylinder + face texture
  const boardBackMat = new THREE.MeshStandardMaterial({
    color: 0x7c2d12,
    roughness: 0.65,
    metalness: 0.12,
  });
  const boardFaceMat = new THREE.MeshBasicMaterial({
    map: createDartboardFaceTexture(),
    toneMapped: false,
  });
  const boardCylinderGeo = new THREE.CylinderGeometry(BOARD_RADIUS, BOARD_RADIUS * 1.02, 0.32, 64);
  boardCylinderGeo.rotateX(Math.PI / 2);
  const boardMesh = new THREE.Mesh(boardCylinderGeo, [boardBackMat, boardFaceMat, boardBackMat]);
  boardMesh.position.z = -0.16;
  boardMesh.receiveShadow = true;
  targetWheelGroup.add(boardMesh);

  // Outer Candy-Red & Gold 3D Carnival Rim
  const outerRimMesh = new THREE.Mesh(
    new THREE.TorusGeometry(BOARD_RADIUS + 0.06, 0.19, 24, 72),
    new THREE.MeshStandardMaterial({
      color: 0xe11d48,
      roughness: 0.32,
      metalness: 0.28,
    })
  );
  outerRimMesh.position.z = -0.02;
  targetWheelGroup.add(outerRimMesh);

  const innerGoldRimMesh = new THREE.Mesh(
    new THREE.TorusGeometry(BOARD_RADIUS - 0.10, 0.055, 16, 72),
    new THREE.MeshStandardMaterial({
      color: 0xfbbf24,
      roughness: 0.25,
      metalness: 0.72,
    })
  );
  innerGoldRimMesh.position.z = 0.04;
  targetWheelGroup.add(innerGoldRimMesh);

  // 24 3D Glowing Carnival Marquee Bulbs around the Wheel Rim
  const marqueeBulbs = [];
  const bulbGeo = new THREE.SphereGeometry(0.082, 14, 12);
  for (let i = 0; i < 24; i++) {
    const a = (i / 24) * Math.PI * 2;
    const bMat = new THREE.MeshBasicMaterial({
      color: i % 2 === 0 ? 0xfef08a : 0xffedd5,
      toneMapped: false,
    });
    const bulb = new THREE.Mesh(bulbGeo, bMat);
    bulb.position.set(
      Math.cos(a) * (BOARD_RADIUS + 0.06),
      Math.sin(a) * (BOARD_RADIUS + 0.06),
      0.14
    );
    targetWheelGroup.add(bulb);
    marqueeBulbs.push(bulb);
  }

  // Group for Critter Target Pads + Group for Pinned 3D Darts
  const critterPadsRoot = new THREE.Group();
  targetWheelGroup.add(critterPadsRoot);

  const pinnedDartsGroup = new THREE.Group();
  targetWheelGroup.add(pinnedDartsGroup);

  const textureCache = new Map();
  function getCritterTex(critterId, isBad = false) {
    const key = `${critterId}_${isBad ? 'bad' : 'good'}`;
    if (!textureCache.has(key)) {
      textureCache.set(key, createCritterTargetTexture(renderer, critterId, isBad));
    }
    return textureCache.get(key);
  }
  Object.keys(CRITTER_META).forEach((cid) => getCritterTex(cid, false));
  getCritterTex('baba', true);

  let critterTargets = [];
  let obstacleShields = [];
  let currentStage = 1;
  let wheelAngle = 0;
  let obstacleAngle = 0;
  let sceneElapsed = 0;

  /**
   * Computes the exact world center of the dartboard at any time t (supports Stage 3/5/7 slow gliding!)
   */
  function getBoardCenterAtTime(t) {
    const layout = STAGE_LAYOUTS[currentStage] || STAGE_LAYOUTS[1];
    if (!layout.moveAmpX && !layout.moveAmpY) {
      return BASE_WHEEL_CENTER.clone();
    }
    const ox = Math.sin(t * layout.moveSpeed) * (layout.moveAmpX || 0);
    const oy = Math.sin(t * layout.moveSpeed * 2.0) * (layout.moveAmpY || 0);
    return new THREE.Vector3(
      BASE_WHEEL_CENTER.x + ox,
      BASE_WHEEL_CENTER.y + oy,
      BASE_WHEEL_CENTER.z
    );
  }

  /**
   * Smaller Critter Medallions occupying ~50% of the board disk area ("critter小一点，占盘子50%面积就够了"):
   * - Center pad radius = 0.45, Outer pad radius = 0.39 (so 0.45 + 2*0.39 = 1.23 out of BOARD_RADIUS 2.52 -> ~49% radial span,
   *   and wide colorful dartboard sectors are exposed between all Critters so missed throws hit the board wood!)
   */
  function buildCritterTargetPad(critterId, isCenter, index, totalOuter, outerRadius, isBad = false) {
    const meta = CRITTER_META[critterId] || CRITTER_META.catnap;
    const padRadius = isCenter ? 0.45 : 0.39;
    const baseAngle = isCenter ? 0 : (index / totalOuter) * Math.PI * 2;
    const baseDist = isCenter ? 0 : outerRadius;

    const padGroup = new THREE.Group();
    padGroup.position.set(
      Math.cos(baseAngle) * baseDist,
      Math.sin(baseAngle) * baseDist,
      0.06
    );
    critterPadsRoot.add(padGroup);

    // 1. 3D Cushioned Target Base Cylinder
    const cushionGeo = new THREE.CylinderGeometry(padRadius, padRadius * 1.05, 0.15, 36);
    cushionGeo.rotateX(Math.PI / 2);
    const cushionMat = new THREE.MeshStandardMaterial({
      color: isBad ? 0xbe123c : meta.colorHex,
      roughness: 0.42,
      metalness: 0.15,
    });
    const cushionMesh = new THREE.Mesh(cushionGeo, cushionMat);
    cushionMesh.position.z = 0.04;
    padGroup.add(cushionMesh);

    // 2. 3D Bevel Rim around the Critter Pad (Crimson hazard rim for Bad Baba Chops)
    const padRimMat = new THREE.MeshStandardMaterial({
      color: isBad ? 0xf43f5e : isCenter ? 0xfbbf24 : meta.rimHex,
      emissive: isBad ? 0x881337 : 0x000000,
      emissiveIntensity: isBad ? 0.45 : 0.0,
      roughness: 0.25,
      metalness: 0.68,
    });
    const padRimMesh = new THREE.Mesh(
      new THREE.TorusGeometry(padRadius, 0.048, 16, 40),
      padRimMat
    );
    padRimMesh.position.z = 0.11;
    padGroup.add(padRimMesh);

    // 3. Counter-rotating Upright Critter Plush Relief Group
    const uprightGroup = new THREE.Group();
    uprightGroup.position.z = 0.14;
    padGroup.add(uprightGroup);

    const portraitMat = new THREE.MeshBasicMaterial({
      map: getCritterTex(critterId, isBad),
      transparent: true,
      toneMapped: false,
      depthWrite: false,
    });
    const portraitSize = padRadius * 1.84;
    const portraitMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(portraitSize, portraitSize),
      portraitMat
    );
    portraitMesh.position.z = 0.05;
    uprightGroup.add(portraitMesh);

    // 3D Hazard Sign above Bad Baba Chops so 5-year-olds immediately recognize "Don't Shoot!"
    let hazardSign = null;
    if (isBad) {
      hazardSign = build3DHazardCrossMesh(0.22);
      hazardSign.position.set(0, padRadius * 0.96, 0.12);
      uprightGroup.add(hazardSign);
    }

    // 3D Sonic Cute Yell Wave Rings
    const yellRings = [];
    for (let rIdx = 0; rIdx < 2; rIdx++) {
      const yRingMat = new THREE.MeshBasicMaterial({
        color: isBad ? 0xe11d48 : rIdx === 0 ? 0xfbbf24 : 0xff6b8b,
        transparent: true,
        opacity: 0.0,
        toneMapped: false,
        depthWrite: false,
      });
      const yRing = new THREE.Mesh(new THREE.RingGeometry(0.14, 0.20, 32), yRingMat);
      yRing.position.set(0, 0.05, 0.12 + rIdx * 0.02);
      yRing.visible = false;
      uprightGroup.add(yRing);
      yellRings.push({ mesh: yRing, mat: yRingMat });
    }

    // 3D Golden Star Hit Crown above Happy Critter
    const hitStar = buildStarMesh(0.14, 0xfbbf24);
    hitStar.position.set(0, padRadius * 0.92, 0.10);
    hitStar.visible = false;
    uprightGroup.add(hitStar);

    return {
      critterId,
      meta,
      isCenter,
      isBad,
      index,
      totalOuter,
      baseAngle,
      baseDist,
      padRadius,
      padGroup,
      cushionMesh,
      uprightGroup,
      portraitMesh,
      padRimMat,
      hazardSign,
      yellRings,
      hitStar,
      hitCount: 0,
      yellTimer: 0,
      yellDuration: 0.95,
      popFactor: 1.0,
      isTargetable: true,
    };
  }

  // Center Critter Peek-a-Boo ("中心那个critter太容易 应该让它时隐时现")
  const CENTER_PEEKABOO_PERIOD = 4.2;

  function getCenterPopFactorAtTime(t, pad = null) {
    if (pad && pad.yellTimer > 0) return 1.0;
    const u = (((t % CENTER_PEEKABOO_PERIOD) + CENTER_PEEKABOO_PERIOD) % CENTER_PEEKABOO_PERIOD) / CENTER_PEEKABOO_PERIOD;
    if (u < 0.08) {
      return Math.sin((u / 0.08) * (Math.PI * 0.5));
    }
    if (u < 0.44) {
      return 1.0;
    }
    if (u < 0.54) {
      return Math.cos(((u - 0.44) / 0.10) * (Math.PI * 0.5));
    }
    return 0.0;
  }

  function isCenterTargetableAtTime(t, pad = null) {
    return getCenterPopFactorAtTime(t, pad) >= 0.45;
  }

  function rebuildStageTargets(stageNum = 1) {
    currentStage = stageNum;
    const layout = STAGE_LAYOUTS[stageNum] || STAGE_LAYOUTS[1];

    while (critterPadsRoot.children.length > 0) {
      critterPadsRoot.remove(critterPadsRoot.children[0]);
    }
    while (pinnedDartsGroup.children.length > 0) {
      pinnedDartsGroup.remove(pinnedDartsGroup.children[0]);
    }
    while (obstaclesGroup.children.length > 0) {
      obstaclesGroup.remove(obstaclesGroup.children[0]);
    }
    critterTargets = [];
    obstacleShields = [];
    wheelAngle = 0;
    obstacleAngle = 0;
    targetWheelGroup.rotation.z = 0;
    obstaclesGroup.rotation.z = 0;
    wheelMountGroup.position.copy( getBoardCenterAtTime(sceneElapsed) );

    // Center Bullseye Critter (always friendly)
    critterTargets.push(
      buildCritterTargetPad(layout.centerCritter, true, 0, layout.outerCritters.length, 0, false)
    );

    // Outer Ring Critters (some may be Bad Baba Chops in Stage 4, 6, 7)
    const badSet = new Set(layout.badBabaIndices || []);
    layout.outerCritters.forEach((cid, idx) => {
      const isBad = cid === 'baba' && badSet.has(idx);
      critterTargets.push(
        buildCritterTargetPad(cid, false, idx, layout.outerCritters.length, layout.outerRadius, isBad)
      );
    });

    // Build 3D Orbiting Obstacle Shields for Stage 2, 5, 6, 7 ("第二关有遮挡物")
    const numObstacles = layout.obstacles || 0;
    const obsRadius = layout.obstacleRadius || 1.48;
    const shieldHitRadius = 0.44;
    for (let i = 0; i < numObstacles; i++) {
      const baseAngle = (i / numObstacles) * Math.PI * 2 + Math.PI * 0.25;
      const mesh = build3DObstacleShieldMesh(shieldHitRadius);
      mesh.position.set(
        Math.cos(baseAngle) * obsRadius,
        Math.sin(baseAngle) * obsRadius,
        0
      );
      obstaclesGroup.add(mesh);
      obstacleShields.push({
        index: i,
        baseAngle,
        orbitRadius: obsRadius,
        hitRadius: shieldHitRadius,
        mesh,
        bounceTimer: 0,
      });
    }
  }

  rebuildStageTargets(1);

  // ============================================================================
  // TRUE 3D PARABOLIC BALLISTIC CURVE & LEAD-PREDICTION ENGINE
  // ("射飞镖要有曲线预判的引擎，不能点哪儿就是哪儿")
  // ============================================================================
  const LAUNCH_ORIGIN = new THREE.Vector3(0, -0.36, 3.65);
  const TARGET_PLANE_Z = BASE_WHEEL_CENTER.z + 0.22; // -1.88
  const FLIGHT_DURATION = 0.44; // 440ms flight time so board rotation & movement require lead prediction!
  const GRAVITY_DROP_Y = 0.52;  // Upward lob + gravity drop so impact is 0.52 units below raw straight sightline!
  const CURVE_WIND_X = 0.14;    // Subtle lateral spin curve drift

  /**
   * Converts the player's pointer sightline (sightPos on target plane) into the actual
   * parabolic ballistic impact point after gravity drop and spin curve drift.
   * Because of GRAVITY_DROP_Y (0.52) and CURVE_WIND_X (0.14), clicking directly on a
   * spot will NOT land on that spot ("不能点哪儿就是哪儿") — the dart arcs up and curves down!
   */
  function computeBallisticImpactFromSight(sightPos) {
    const impact = sightPos.clone();
    impact.x = sightPos.x + CURVE_WIND_X + sightPos.x * 0.06;
    impact.y = sightPos.y - GRAVITY_DROP_Y;
    impact.z = TARGET_PLANE_Z;
    return impact;
  }

  /**
   * Inverse of computeBallisticImpactFromSight: given a desired landing impact point,
   * returns the sightPos where the player/launcher must aim.
   */
  function computeSightFromDesiredImpact(desiredImpact) {
    const sight = desiredImpact.clone();
    sight.x = (desiredImpact.x - CURVE_WIND_X) / 1.06;
    sight.y = desiredImpact.y + GRAVITY_DROP_Y;
    sight.z = TARGET_PLANE_Z;
    return sight;
  }

  function sampleParabolicArc(start, end, u, arcLift = 0.78, sideCurve = 0.16) {
    const x = start.x + (end.x - start.x) * u + Math.sin(u * Math.PI) * sideCurve;
    const y = start.y + (end.y - start.y) * u + Math.sin(u * Math.PI) * arcLift;
    const z = start.z + (end.z - start.z) * u;
    return new THREE.Vector3(x, y, z);
  }

  const launcherGroup = new THREE.Group();
  launcherGroup.position.copy(LAUNCH_ORIGIN);
  scene.add(launcherGroup);

  const launcherBase = new THREE.Mesh(
    new THREE.CylinderGeometry(0.28, 0.36, 0.24, 24),
    new THREE.MeshStandardMaterial({ color: 0xf59e0b, roughness: 0.35, metalness: 0.45 })
  );
  launcherBase.position.set(0, -0.18, 0.08);
  launcherGroup.add(launcherBase);

  const previewDartHolder = new THREE.Group();
  launcherGroup.add(previewDartHolder);

  let currentDartType = 'normal';
  function refreshPreviewDart(dartType = 'normal') {
    currentDartType = dartType;
    while (previewDartHolder.children.length > 0) {
      previewDartHolder.remove(previewDartHolder.children[0]);
    }
    if (dartType === 'triple') {
      [-0.22, 0, 0.22].forEach((ox, idx) => {
        const colors = [0x38bdf8, 0xff4757, 0x22c55e];
        const d = build3DDartMesh('normal', colors[idx]);
        d.position.set(ox, 0, 0);
        previewDartHolder.add(d);
      });
    } else if (dartType === 'super') {
      const d = build3DDartMesh('super', 0xa855f7);
      previewDartHolder.add(d);
    } else {
      const d = build3DDartMesh('normal', 0xff4757);
      previewDartHolder.add(d);
    }
  }
  refreshPreviewDart('normal');

  // Player's Pointer Sight Position vs Parabolic Landing Impact Position
  const sightWorldPos = new THREE.Vector3(-0.14, BASE_WHEEL_CENTER.y + GRAVITY_DROP_Y, TARGET_PLANE_Z);
  const aimWorldPos = computeBallisticImpactFromSight(sightWorldPos);
  let manualAimActive = false;
  let manualAimHoldTimer = 0;

  // 1. Upper Sight Crosshair (shows where the pointer/hand is aiming before gravity drop)
  const sightMarkerGroup = new THREE.Group();
  sightMarkerGroup.position.copy(sightWorldPos);
  scene.add(sightMarkerGroup);

  const sightRingMat = new THREE.MeshBasicMaterial({
    color: 0x38bdf8,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.85,
    toneMapped: false,
    depthTest: false,
  });
  const sightRing = new THREE.Mesh(new THREE.RingGeometry(0.11, 0.16, 24), sightRingMat);
  sightRing.renderOrder = 19;
  sightMarkerGroup.add(sightRing);

  // 2. Parabolic Impact Landing Reticle on the Target Plane (color-coded by 0.44s lead prediction!)
  const reticleGroup = new THREE.Group();
  reticleGroup.position.copy(aimWorldPos);
  scene.add(reticleGroup);

  const retOuterMat = new THREE.MeshBasicMaterial({
    color: 0xfef08a,
    side: THREE.DoubleSide,
    toneMapped: false,
    depthTest: false,
  });
  const retOuter = new THREE.Mesh(new THREE.RingGeometry(0.28, 0.36, 36), retOuterMat);
  retOuter.renderOrder = 20;
  reticleGroup.add(retOuter);

  const retInnerMat = new THREE.MeshBasicMaterial({
    color: 0xff4757,
    side: THREE.DoubleSide,
    toneMapped: false,
    depthTest: false,
  });
  const retInner = new THREE.Mesh(new THREE.RingGeometry(0.05, 0.11, 24), retInnerMat);
  retInner.renderOrder = 21;
  reticleGroup.add(retInner);

  // 3. 16 Glowing 3D Parabolic Trajectory Arc Pearls from Launcher to Landing Reticle
  const arcDots = [];
  const arcDotGeo = new THREE.SphereGeometry(0.052, 10, 10);
  for (let i = 1; i <= 16; i++) {
    const dotMat = new THREE.MeshBasicMaterial({
      color: i % 2 === 0 ? 0xfef08a : 0xffffff,
      transparent: true,
      opacity: 0.86,
      toneMapped: false,
    });
    const dot = new THREE.Mesh(arcDotGeo, dotMat);
    scene.add(dot);
    arcDots.push({ mesh: dot, mat: dotMat, u: i / 17 });
  }

  /**
   * Predicts what a dart landing at `impactPos` after `FLIGHT_DURATION` (0.44s) will hit!
   * Accounts for future board glide, future wheel rotation, and future 3D obstacle positions.
   */
  function predictFutureOutcomeAtImpact(impactPos, nowElapsed) {
    const layout = STAGE_LAYOUTS[currentStage] || STAGE_LAYOUTS[1];

    // 1. Check if the parabolic arc will hit a 3D Obstacle Shield at u = 0.85
    if (obstacleShields.length > 0) {
      const obsTime = nowElapsed + FLIGHT_DURATION * 0.85;
      const obsBoardCenter = getBoardCenterAtTime(obsTime);
      const futureObsAngle = obstacleAngle + layout.obstacleSpeed * (FLIGHT_DURATION * 0.85);
      const dartAtObsPlane = sampleParabolicArc(LAUNCH_ORIGIN, impactPos, 0.85);
      for (const shield of obstacleShields) {
        const a = shield.baseAngle + futureObsAngle;
        const sx = obsBoardCenter.x + Math.cos(a) * shield.orbitRadius;
        const sy = obsBoardCenter.y + Math.sin(a) * shield.orbitRadius;
        if (Math.hypot(dartAtObsPlane.x - sx, dartAtObsPlane.y - sy) <= shield.hitRadius * 0.95) {
          return 'obstacle';
        }
      }
    }

    // 2. Check where the board & Critter pads will be at t = nowElapsed + FLIGHT_DURATION
    const impactTime = nowElapsed + FLIGHT_DURATION;
    const futureBoardCenter = getBoardCenterAtTime(impactTime);
    const futureWheelAngle = wheelAngle + layout.wheelSpeed * FLIGHT_DURATION;
    const hitRadiusBonus = currentDartType === 'super' ? 0.85 : 0.08;

    let closestPad = null;
    let closestDist = Infinity;
    for (const pad of critterTargets) {
      if (pad.isCenter && !isCenterTargetableAtTime(impactTime, pad)) {
        continue;
      }
      let px = futureBoardCenter.x;
      let py = futureBoardCenter.y;
      if (!pad.isCenter) {
        const r =
          pad.baseDist +
          (layout.bobAmplitude > 0
            ? Math.sin(impactTime * 2.8 + pad.index * 1.05) * layout.bobAmplitude
            : 0);
        const totalAngle = pad.baseAngle + futureWheelAngle;
        px += Math.cos(totalAngle) * r;
        py += Math.sin(totalAngle) * r;
      }
      const d = Math.hypot(impactPos.x - px, impactPos.y - py);
      if (d <= pad.padRadius + hitRadiusBonus && d < closestDist) {
        closestDist = d;
        closestPad = pad;
      }
    }

    if (closestPad) {
      return closestPad.isBad ? 'bad_critter' : 'good_critter';
    }
    return 'miss';
  }

  function updateAimVisuals(t = 0) {
    sightMarkerGroup.position.copy(sightWorldPos);
    reticleGroup.position.copy(aimWorldPos);

    // Evaluate 0.44s lead prediction so the landing ring gives instant visual feedback to a 5-year-old
    const outcome = predictFutureOutcomeAtImpact(aimWorldPos, t);
    if (outcome === 'good_critter') {
      retOuterMat.color.setHex(0x4ade80); // Bright emerald green = Lead is locked onto a Happy Critter!
      retInnerMat.color.setHex(0xfef08a);
    } else if (outcome === 'obstacle' || outcome === 'bad_critter') {
      retOuterMat.color.setHex(0xf43f5e); // Warning crimson = Will hit Obstacle or Bad Baba Chops!
      retInnerMat.color.setHex(0x881337);
    } else {
      retOuterMat.color.setHex(0xfef08a); // Gold/coral = Empty board wood (Miss -15)
      retInnerMat.color.setHex(0xff4757);
    }

    const pulse = 1.0 + Math.sin(t * 7.5) * (outcome === 'good_critter' ? 0.14 : 0.06);
    const typeScale = currentDartType === 'super' ? 1.42 : currentDartType === 'triple' ? 1.18 : 1.0;
    reticleGroup.scale.setScalar(pulse * typeScale);
    retOuter.rotation.z = t * 1.8;

    for (let i = 0; i < arcDots.length; i++) {
      const d = arcDots[i];
      const p = sampleParabolicArc(LAUNCH_ORIGIN, aimWorldPos, d.u);
      d.mesh.position.copy(p);
      const s = 0.78 + 0.35 * Math.sin(t * 9.0 - d.u * 6.5);
      d.mesh.scale.setScalar(s);
      if (outcome === 'good_critter') {
        d.mat.color.setHex(i % 2 === 0 ? 0x4ade80 : 0xfef08a);
      } else if (outcome === 'obstacle' || outcome === 'bad_critter') {
        d.mat.color.setHex(i % 2 === 0 ? 0xfb7185 : 0xfef08a);
      } else {
        d.mat.color.setHex(i % 2 === 0 ? 0xfef08a : 0xffffff);
      }
    }

    // Orient launcher preview dart along initial upward tangent of parabolic arc
    const pNear = sampleParabolicArc(LAUNCH_ORIGIN, aimWorldPos, 0.10);
    launcherGroup.lookAt(pNear);
  }

  // ============================================================================
  // FLYING 3D DARTS, DEFLECTED DARTS & 3D STAR/HEART BURST PARTICLES
  // ============================================================================
  const flyingDarts = [];
  const deflectedDarts = [];
  const pinnedDarts = [];
  const burstParticles = [];
  const starBurstGeo = new THREE.OctahedronGeometry(0.11, 0);

  function spawnHitBurst(worldPos, colorHex = 0xfbbf24, count = 16) {
    for (let i = 0; i < count; i++) {
      const a = (i / count) * Math.PI * 2 + (Math.random() - 0.5) * 0.25;
      const spd = 2.2 + Math.random() * 2.8;
      const mat = new THREE.MeshBasicMaterial({
        color: i % 3 === 0 ? 0xfef08a : i % 3 === 1 ? colorHex : 0xff6b8b,
        toneMapped: false,
      });
      const mesh = new THREE.Mesh(starBurstGeo, mat);
      mesh.position.copy(worldPos);
      scene.add(mesh);
      burstParticles.push({
        mesh,
        mat,
        vx: Math.cos(a) * spd,
        vy: Math.sin(a) * spd + 1.2,
        vz: 1.0 + Math.random() * 1.8,
        life: 0.65,
        maxLife: 0.65,
      });
    }
  }

  let trauma = 0;

  function triggerCritterReaction(pad, hitWorldPos) {
    pad.hitCount += 1;
    pad.yellTimer = pad.yellDuration;
    if (!pad.isBad) {
      pad.hitStar.visible = true;
    }
    for (const yr of pad.yellRings) {
      yr.mesh.visible = true;
      yr.mat.opacity = 0.95;
      yr.mesh.scale.setScalar(0.5);
    }
    if (!pad.isBad) {
      for (const ch of stageCheerCritters) {
        ch.cheerTimer = 0.95;
      }
    }
    trauma = Math.min(1.0, trauma + 0.42);
    spawnHitBurst(hitWorldPos, pad.isBad ? 0xe11d48 : pad.meta.colorHex, 18);
  }

  function resolveDartImpact(flight) {
    const hitWorld = flight.endPos.clone();
    scene.remove(flight.mesh);

    const currentBoardCenter = wheelMountGroup.position;
    const distFromBoardCenter = Math.hypot(
      hitWorld.x - currentBoardCenter.x,
      hitWorld.y - currentBoardCenter.y
    );

    // Pin the 3D dart onto targetWheelGroup if it landed on the dartboard disk
    if (distFromBoardCenter <= BOARD_RADIUS * 1.04) {
      const localHit = targetWheelGroup.worldToLocal(hitWorld.clone());
      const pinnedMesh = build3DDartMesh(flight.dartType, flight.colorHex);
      pinnedMesh.position.copy(localHit);
      pinnedMesh.position.z = 0.22;
      pinnedDartsGroup.add(pinnedMesh);
      pinnedDarts.push({
        mesh: pinnedMesh,
        wobbleTimer: 0.65,
      });
    }

    // Check which Smiling Critter target pad(s) are at hitWorld AT THIS IMPACT INSTANT
    const hitCritters = [];
    const hitRadiusBonus = flight.dartType === 'super' ? 0.85 : 0.08;

    for (const pad of critterTargets) {
      if (pad.isCenter && !isCenterTargetableAtTime(sceneElapsed, pad)) {
        continue;
      }
      const padWorld = new THREE.Vector3();
      pad.padGroup.getWorldPosition(padWorld);
      const dx = hitWorld.x - padWorld.x;
      const dy = hitWorld.y - padWorld.y;
      const dist = Math.hypot(dx, dy);
      if (dist <= pad.padRadius + hitRadiusBonus) {
        hitCritters.push({ pad, dist, padWorld });
      }
    }

    hitCritters.sort((a, b) => a.dist - b.dist);

    if (hitCritters.length > 0) {
      // If Super Star Bomb hits multiple targets, filter out Bad Baba Chops from AoE splash unless she was the primary closest target
      let chosen = [];
      if (flight.dartType === 'super') {
        const primary = hitCritters[0];
        if (primary.pad.isBad && distFromBoardCenter > 0 && primary.dist <= primary.pad.padRadius) {
          chosen = [primary];
        } else {
          chosen = hitCritters.filter((h) => !h.pad.isBad).slice(0, 3);
          if (chosen.length === 0) chosen = [primary];
        }
      } else {
        chosen = [hitCritters[0]];
      }

      for (const item of chosen) {
        triggerCritterReaction(item.pad, item.padWorld);
        const screenPt = worldToScreen(item.padWorld.clone().add(new THREE.Vector3(0, 0.52, 0.2)));
        if (item.pad.isBad) {
          if (callbacks.onBadCritterHit) {
            callbacks.onBadCritterHit({
              critterId: item.pad.critterId,
              meta: item.pad.meta,
              dartType: flight.dartType,
              screenX: screenPt.x,
              screenY: screenPt.y,
            });
          }
        } else if (callbacks.onCritterHit) {
          callbacks.onCritterHit({
            critterId: item.pad.critterId,
            meta: item.pad.meta,
            isCenter: item.pad.isCenter,
            dartType: flight.dartType,
            screenX: screenPt.x,
            screenY: screenPt.y,
          });
        }
      }
      if (flight.batchTracker) {
        flight.batchTracker.anyCritterHit = true;
      }
    } else {
      // Missed all Critters (hit empty board wood or outside board rim) -> Miss penalty!
      // For Triple Dart, only apply a single miss penalty if all 3 darts in the fan missed
      if (flight.batchTracker) {
        flight.batchTracker.resolvedCount += 1;
        if (
          flight.batchTracker.resolvedCount >= flight.batchTracker.totalCount &&
          !flight.batchTracker.anyCritterHit &&
          !flight.batchTracker.penaltyApplied
        ) {
          flight.batchTracker.penaltyApplied = true;
          spawnHitBurst(hitWorld, 0xfb7185, 8);
          const screenPt = worldToScreen(hitWorld);
          if (callbacks.onBoardMiss) {
            callbacks.onBoardMiss({
              distRatio: distFromBoardCenter / BOARD_RADIUS,
              screenX: screenPt.x,
              screenY: screenPt.y,
            });
          }
        }
      } else {
        spawnHitBurst(hitWorld, 0xfb7185, 8);
        const screenPt = worldToScreen(hitWorld);
        if (callbacks.onBoardMiss) {
          callbacks.onBoardMiss({
            distRatio: distFromBoardCenter / BOARD_RADIUS,
            screenX: screenPt.x,
            screenY: screenPt.y,
          });
        }
      }
    }
  }

  /**
   * Fires a dart from the player's pointer sightPos (or direct impact override).
   * Zero auto-homing cheat: the dart follows the exact 3D parabolic curve with GRAVITY_DROP_Y
   * over FLIGHT_DURATION (0.44s), so players must lead the spinning/gliding targets!
   */
  function shootDartAt(sightOrTargetPoint = null, dartType = currentDartType, isDirectImpactPoint = false) {
    let baseImpact;
    if (sightOrTargetPoint) {
      if (isDirectImpactPoint) {
        baseImpact = sightOrTargetPoint.clone();
        baseImpact.z = TARGET_PLANE_Z;
      } else {
        sightWorldPos.copy(sightOrTargetPoint);
        sightWorldPos.z = TARGET_PLANE_Z;
        baseImpact = computeBallisticImpactFromSight(sightWorldPos);
        aimWorldPos.copy(baseImpact);
      }
    } else {
      baseImpact = aimWorldPos.clone();
    }

    const offsets = dartType === 'triple' ? [-0.52, 0, 0.52] : [0];
    const colors = dartType === 'triple' ? [0x38bdf8, 0xff4757, 0x22c55e] : [0xff4757];
    const batchTracker = {
      totalCount: offsets.length,
      resolvedCount: 0,
      anyCritterHit: false,
      penaltyApplied: false,
    };

    offsets.forEach((ox, idx) => {
      const endPos = baseImpact.clone();
      endPos.x += ox;
      endPos.y += idx === 1 ? 0.06 : 0;

      const mesh = build3DDartMesh(dartType === 'super' ? 'super' : 'normal', colors[idx] || 0xff4757);
      mesh.position.copy(LAUNCH_ORIGIN);
      scene.add(mesh);

      flyingDarts.push({
        mesh,
        dartType,
        colorHex: colors[idx] || 0xff4757,
        startPos: LAUNCH_ORIGIN.clone(),
        endPos,
        elapsed: 0,
        duration: FLIGHT_DURATION,
        checkedObstacle: false,
        batchTracker,
      });
    });

    previewDartHolder.position.z = 0.22;
  }

  function screenToTargetWorld(clientX, clientY) {
    const rect = canvas.getBoundingClientRect();
    if (!rect.width || !rect.height) return sightWorldPos.clone();
    const ndcX = ((clientX - rect.left) / rect.width) * 2 - 1;
    const ndcY = -((clientY - rect.top) / rect.height) * 2 + 1;

    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(new THREE.Vector2(ndcX, ndcY), camera);
    const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), -TARGET_PLANE_Z);
    const hit = new THREE.Vector3();
    if (raycaster.ray.intersectPlane(plane, hit)) {
      hit.x = Math.max(-3.6, Math.min(3.6, hit.x));
      hit.y = Math.max(-0.4, Math.min(4.6, hit.y));
      hit.z = TARGET_PLANE_Z;
      return hit;
    }
    return sightWorldPos.clone();
  }

  function worldToScreen(worldVec) {
    const rect = canvas.getBoundingClientRect();
    const w = rect.width || window.innerWidth || 1280;
    const h = rect.height || window.innerHeight || 800;
    const projected = worldVec.clone().project(camera);
    return {
      x: (projected.x * 0.5 + 0.5) * w,
      y: (-projected.y * 0.5 + 0.5) * h,
    };
  }

  function setAimFromClient(clientX, clientY) {
    const sightPt = screenToTargetWorld(clientX, clientY);
    sightWorldPos.copy(sightPt);
    aimWorldPos.copy(computeBallisticImpactFromSight(sightPt));
    manualAimActive = true;
    manualAimHoldTimer = 4.5;
    return sightPt;
  }

  /**
   * Computes the exact lead-predicted sight position required right now so that a parabolic dart
   * flying for FLIGHT_DURATION (0.44s) lands squarely on Critter pad `idx` when it arrives there!
   */
  function getLeadPredictedSightForPad(idx = 0) {
    if (!critterTargets.length) return sightWorldPos.clone();
    const impactTime = sceneElapsed + FLIGHT_DURATION;
    let pad = critterTargets[((idx % critterTargets.length) + critterTargets.length) % critterTargets.length];
    if (pad.isBad || (pad.isCenter && !isCenterTargetableAtTime(impactTime, pad))) {
      const goodPads = critterTargets.filter(
        (p) => !p.isBad && (!p.isCenter || isCenterTargetableAtTime(impactTime, p))
      );
      if (goodPads.length > 0) {
        pad = goodPads[idx % goodPads.length];
      }
    }

    const layout = STAGE_LAYOUTS[currentStage] || STAGE_LAYOUTS[1];
    const futureBoardCenter = getBoardCenterAtTime(impactTime);
    const futureWheelAngle = wheelAngle + layout.wheelSpeed * FLIGHT_DURATION;

    const futurePadWorld = futureBoardCenter.clone();
    if (!pad.isCenter) {
      const r =
        pad.baseDist +
        (layout.bobAmplitude > 0
          ? Math.sin(impactTime * 2.8 + pad.index * 1.05) * layout.bobAmplitude
          : 0);
      const totalAngle = pad.baseAngle + futureWheelAngle;
      futurePadWorld.x += Math.cos(totalAngle) * r;
      futurePadWorld.y += Math.sin(totalAngle) * r;
    }
    futurePadWorld.z = TARGET_PLANE_Z;
    return computeSightFromDesiredImpact(futurePadWorld);
  }

  function resize() {
    const w = canvas.clientWidth || window.innerWidth || 1280;
    const h = canvas.clientHeight || window.innerHeight || 800;
    renderer.setSize(w, h, false);
    const aspect = w / Math.max(1, h);
    camera.aspect = aspect;

    if (aspect < 0.85) {
      camera.fov = 52;
      baseCamPos.set(0, 1.68, 8.25);
    } else if (aspect < 1.25) {
      camera.fov = 44;
      baseCamPos.set(0, 1.70, 7.20);
    } else {
      camera.fov = 39;
      baseCamPos.set(0, 1.72, 6.45);
    }
    camera.position.copy(baseCamPos);
    camera.lookAt(baseLookAt);
    camera.updateProjectionMatrix();
  }

  window.addEventListener('resize', resize);
  resize();

  function step(dt, elapsed, shouldRender = true) {
    const clampedDt = Math.min(0.05, Math.max(0.001, dt));
    sceneElapsed = elapsed;
    const layout = STAGE_LAYOUTS[currentStage] || STAGE_LAYOUTS[1];

    // 1. Whole-Dartboard Slow Gliding Movement (Stage 3, 5, 7 — "第三关盘子整体缓速移动")
    const boardCenter = getBoardCenterAtTime(elapsed);
    wheelMountGroup.position.copy(boardCenter);

    // 2. Rotate Giant 3D Carnival Dartboard Wheel
    wheelAngle += layout.wheelSpeed * clampedDt;
    targetWheelGroup.rotation.z = wheelAngle;

    // 3. Rotate 3D Orbiting Obstacle Shields (Stage 2, 5, 6, 7 — "第二关有遮挡物")
    if (obstacleShields.length > 0) {
      obstacleAngle += (layout.obstacleSpeed || -0.50) * clampedDt;
      obstaclesGroup.rotation.z = obstacleAngle;
      for (const sh of obstacleShields) {
        sh.mesh.rotation.z = -obstacleAngle;
        if (sh.bounceTimer > 0) {
          sh.bounceTimer = Math.max(0, sh.bounceTimer - clampedDt);
          const s = 1.0 + Math.sin(sh.bounceTimer * 28.0) * 0.25 * sh.bounceTimer;
          sh.mesh.scale.set(s, s, 1.0);
        } else {
          sh.mesh.scale.set(1, 1, 1);
        }
      }
    }

    // Chase marquee bulbs around wheel perimeter
    for (let i = 0; i < marqueeBulbs.length; i++) {
      const wave = Math.sin(elapsed * 8.0 - i * 0.55);
      marqueeBulbs[i].scale.setScalar(0.92 + 0.22 * Math.max(0, wave));
    }

    // 4. Update each Smiling Critter Target Pad (keep upright + animate cute yell squash & stretch + Center Peek-a-Boo)
    for (const pad of critterTargets) {
      if (pad.isCenter) {
        const popFactor = getCenterPopFactorAtTime(elapsed, pad);
        pad.popFactor = popFactor;
        pad.isTargetable = popFactor >= 0.45;
        const showCenter = popFactor > 0.04;
        if (pad.cushionMesh) {
          pad.cushionMesh.visible = showCenter;
          pad.cushionMesh.scale.setScalar(Math.max(0.05, popFactor));
        }
        pad.uprightGroup.visible = showCenter;
        // Blink golden bullseye hatch rim right before ducking away
        const uCycle = (((elapsed % CENTER_PEEKABOO_PERIOD) + CENTER_PEEKABOO_PERIOD) % CENTER_PEEKABOO_PERIOD) / CENTER_PEEKABOO_PERIOD;
        if (uCycle >= 0.34 && uCycle < 0.44 && pad.yellTimer <= 0) {
          const blink = Math.sin(elapsed * 28.0) > 0;
          pad.padRimMat.emissive.setHex(blink ? 0xf59e0b : 0x000000);
          pad.padRimMat.emissiveIntensity = blink ? 0.55 : 0.0;
        } else {
          pad.padRimMat.emissive.setHex(0x000000);
          pad.padRimMat.emissiveIntensity = 0.0;
        }
      } else if (layout.bobAmplitude > 0) {
        const r =
          pad.baseDist +
          Math.sin(elapsed * 2.8 + pad.index * 1.05) * layout.bobAmplitude;
        pad.padGroup.position.x = Math.cos(pad.baseAngle) * r;
        pad.padGroup.position.y = Math.sin(pad.baseAngle) * r;
      }

      const sway = Math.sin(elapsed * 3.2 + pad.index * 0.9) * 0.06;
      pad.uprightGroup.rotation.z = -wheelAngle + sway;

      if (pad.hazardSign) {
        pad.hazardSign.scale.setScalar(1.0 + Math.sin(elapsed * 7.0 + pad.index) * 0.16);
      }

      const centerScale = pad.isCenter ? Math.max(0.05, pad.popFactor ?? 1.0) : 1.0;

      if (pad.yellTimer > 0) {
        pad.yellTimer = Math.max(0, pad.yellTimer - clampedDt);
        const u = 1.0 - pad.yellTimer / pad.yellDuration;
        const env = Math.sin(u * Math.PI);

        pad.uprightGroup.position.z = 0.14 + env * 0.42;
        const sx = (1.0 + Math.sin(u * Math.PI * 5.0) * 0.26 * (1.0 - u * 0.5)) * centerScale;
        const sy = (1.0 - Math.sin(u * Math.PI * 5.0) * 0.22 * (1.0 - u * 0.5) + env * 0.25) * centerScale;
        pad.portraitMesh.scale.set(sx, sy, 1.0);
        pad.uprightGroup.rotation.z =
          -wheelAngle + Math.sin(u * Math.PI * 8.0) * 0.24 * (1.0 - u);

        pad.yellRings.forEach((yr, idx) => {
          const ru = (u * 1.6 + idx * 0.35) % 1.0;
          yr.mesh.visible = true;
          yr.mesh.scale.setScalar(0.55 + ru * 2.1);
          yr.mat.opacity = Math.max(0, (1.0 - ru) * 0.85 * env);
        });
      } else {
        const breathe = (1.0 + Math.sin(elapsed * 3.6 + pad.index) * 0.035) * centerScale;
        pad.uprightGroup.position.z = pad.isCenter ? -0.08 * (1.0 - centerScale) + 0.14 * centerScale : 0.14;
        pad.portraitMesh.scale.set(breathe, breathe, 1.0);
        for (const yr of pad.yellRings) {
          yr.mesh.visible = false;
        }
      }

      if (pad.hitStar.visible) {
        pad.hitStar.rotation.z = elapsed * 2.5;
      }
    }

    // 5. Animate the 2 3D Articulated Stage Cheerleader Critters (CatNap & DogDay)
    for (let i = 0; i < stageCheerCritters.length; i++) {
      const ch = stageCheerCritters[i];
      const { rig } = ch;
      if (ch.cheerTimer > 0) {
        ch.cheerTimer = Math.max(0, ch.cheerTimer - clampedDt);
        const jump = Math.abs(Math.sin(ch.cheerTimer * Math.PI * 3.0)) * 0.28;
        rig.root.position.y = ch.baseY + jump;
        rig.root.rotation.y = ch.baseRotY + Math.sin(elapsed * 14.0) * 0.25;
        if (rig.jawGroup) rig.jawGroup.rotation.x = 0.28;
        if (rig.leftArmGroup) rig.leftArmGroup.rotation.z = -0.85;
        if (rig.rightArmGroup) rig.rightArmGroup.rotation.z = 0.85;
      } else {
        rig.root.position.y = ch.baseY + Math.abs(Math.sin(elapsed * 2.6 + i)) * 0.05;
        rig.root.rotation.y = ch.baseRotY + Math.sin(elapsed * 1.8 + i) * 0.08;
        if (rig.jawGroup) rig.jawGroup.rotation.x = 0.04;
        if (rig.leftArmGroup) rig.leftArmGroup.rotation.z = Math.sin(elapsed * 2.5) * 0.12;
        if (rig.rightArmGroup) rig.rightArmGroup.rotation.z = -Math.sin(elapsed * 2.5) * 0.12;
      }
    }

    // 6. Gentle figure-8 sweep of aim crosshair when player hasn't manually moved pointer recently
    if (manualAimHoldTimer > 0) {
      manualAimHoldTimer = Math.max(0, manualAimHoldTimer - clampedDt);
      if (manualAimHoldTimer === 0) manualAimActive = false;
    }
    if (!manualAimActive) {
      const sweepR = layout.outerRadius * 0.96;
      const desiredImpact = new THREE.Vector3(
        boardCenter.x + Math.cos(elapsed * 0.95) * sweepR,
        boardCenter.y + Math.sin(elapsed * 1.35) * sweepR * 0.82,
        TARGET_PLANE_Z
      );
      aimWorldPos.copy(desiredImpact);
      sightWorldPos.copy(computeSightFromDesiredImpact(desiredImpact));
    }
    updateAimVisuals(elapsed);

    // Launcher recoil recovery
    previewDartHolder.position.z *= Math.pow(0.001, clampedDt);

    // 7. Substepped Flying Dart Ballistic Trajectory & 3D Obstacle Shield Interception
    for (let i = flyingDarts.length - 1; i >= 0; i--) {
      const f = flyingDarts[i];
      f.elapsed += clampedDt;
      const u = Math.min(1.0, f.elapsed / f.duration);
      const pos = sampleParabolicArc(f.startPos, f.endPos, u);
      const nextU = Math.min(1.0, u + 0.04);
      const nextPos = sampleParabolicArc(f.startPos, f.endPos, nextU);
      f.mesh.position.copy(pos);
      if (nextU > u) {
        f.mesh.lookAt(nextPos);
      }
      f.mesh.rotateZ(elapsed * 12.0);

      // Check 3D Obstacle Shield collision when dart reaches the obstacle plane (u in [0.80, 0.90])
      if (!f.checkedObstacle && u >= 0.83 && obstacleShields.length > 0) {
        f.checkedObstacle = true;
        let hitShield = null;
        const shieldWorld = new THREE.Vector3();
        for (const sh of obstacleShields) {
          sh.mesh.getWorldPosition(shieldWorld);
          const dist = Math.hypot(pos.x - shieldWorld.x, pos.y - shieldWorld.y);
          if (dist <= sh.hitRadius * 0.96) {
            hitShield = { sh, shieldWorld: shieldWorld.clone() };
            break;
          }
        }
        if (hitShield) {
          flyingDarts.splice(i, 1);
          hitShield.sh.bounceTimer = 0.55;
          spawnHitBurst(pos, 0xf59e0b, 12);

          // Spawn a 3D bouncing/ricocheting dart that clangs off the shield!
          deflectedDarts.push({
            mesh: f.mesh,
            vx: (Math.random() - 0.5) * 3.5,
            vy: 2.4 + Math.random() * 1.5,
            vz: 3.2,
            life: 0.55,
          });

          if (f.batchTracker && !f.batchTracker.penaltyApplied && !f.batchTracker.anyCritterHit) {
            f.batchTracker.penaltyApplied = true;
            const screenPt = worldToScreen(hitShield.shieldWorld);
            if (callbacks.onObstacleHit) {
              callbacks.onObstacleHit({
                screenX: screenPt.x,
                screenY: screenPt.y,
              });
            }
          }
          continue;
        }
      }

      if (u >= 1.0) {
        flyingDarts.splice(i, 1);
        resolveDartImpact(f);
      }
    }

    // Animate deflected darts bouncing off 3D obstacle shields
    for (let i = deflectedDarts.length - 1; i >= 0; i--) {
      const d = deflectedDarts[i];
      d.life -= clampedDt;
      if (d.life <= 0) {
        scene.remove(d.mesh);
        deflectedDarts.splice(i, 1);
        continue;
      }
      d.vy -= 12.0 * clampedDt;
      d.mesh.position.x += d.vx * clampedDt;
      d.mesh.position.y += d.vy * clampedDt;
      d.mesh.position.z += d.vz * clampedDt;
      d.mesh.rotation.x += 14.0 * clampedDt;
      d.mesh.rotation.y += 11.0 * clampedDt;
    }

    // 8. Pinned Dart Spring Wobble
    for (const pd of pinnedDarts) {
      if (pd.wobbleTimer > 0) {
        pd.wobbleTimer = Math.max(0, pd.wobbleTimer - clampedDt);
        const w = Math.sin(pd.wobbleTimer * 42.0) * pd.wobbleTimer * 0.22;
        pd.mesh.rotation.x = w;
        pd.mesh.rotation.y = w * 0.7;
      } else {
        pd.mesh.rotation.set(0, 0, 0);
      }
    }

    // 9. Update 3D Star/Heart Burst Particles
    for (let i = burstParticles.length - 1; i >= 0; i--) {
      const p = burstParticles[i];
      p.life -= clampedDt;
      if (p.life <= 0) {
        scene.remove(p.mesh);
        p.mat.dispose();
        burstParticles.splice(i, 1);
        continue;
      }
      p.vy -= 6.5 * clampedDt;
      p.mesh.position.x += p.vx * clampedDt;
      p.mesh.position.y += p.vy * clampedDt;
      p.mesh.position.z += p.vz * clampedDt;
      p.mesh.rotation.x += 6.0 * clampedDt;
      p.mesh.rotation.y += 8.0 * clampedDt;
      p.mesh.scale.setScalar(Math.max(0.01, p.life / p.maxLife));
    }

    // 10. Subtle Post-Lerp Positional Camera Shake (<= 0.08 units, zero rotational shake)
    if (trauma > 0) {
      trauma = Math.max(0, trauma - clampedDt * 2.8);
      const shake = trauma * trauma * 0.075;
      camera.position.set(
        baseCamPos.x + Math.sin(elapsed * 47.0) * shake,
        baseCamPos.y + Math.cos(elapsed * 53.0) * shake,
        baseCamPos.z
      );
    } else {
      camera.position.copy(baseCamPos);
    }
    camera.lookAt(baseLookAt);

    if (shouldRender) {
      renderer.render(scene, camera);
    }
  }

  function getTargetScreenPositions() {
    return critterTargets.map((pad) => {
      const pw = new THREE.Vector3();
      pad.padGroup.getWorldPosition(pw);
      const sp = worldToScreen(pw);
      return {
        critterId: pad.critterId,
        yellWord: pad.meta.yellWord,
        isCenter: pad.isCenter,
        isBad: pad.isBad,
        isTargetable: pad.isCenter ? isCenterTargetableAtTime(sceneElapsed, pad) : true,
        popFactor: pad.isCenter ? getCenterPopFactorAtTime(sceneElapsed, pad) : 1.0,
        hitCount: pad.hitCount,
        x: Math.round(sp.x),
        y: Math.round(sp.y),
        worldX: pw.x,
        worldY: pw.y,
      };
    });
  }

  function getCritterPadWorldPosition(idx = 0) {
    if (!critterTargets.length) return aimWorldPos.clone();
    const pad = critterTargets[((idx % critterTargets.length) + critterTargets.length) % critterTargets.length];
    const pw = new THREE.Vector3();
    pad.padGroup.getWorldPosition(pw);
    return pw;
  }

  return {
    renderer,
    scene,
    camera,
    step,
    resize,
    rebuildStageTargets,
    refreshPreviewDart,
    setAimFromClient,
    shootDartAt,
    getLeadPredictedSightForPad,
    computeBallisticImpactFromSight,
    computeSightFromDesiredImpact,
    getTargetScreenPositions,
    getCritterPadWorldPosition,
    getCritterTargets: () => critterTargets,
    getObstacleShields: () => obstacleShields,
    getBoardPosition: () => wheelMountGroup.position.clone(),
    getFlyingDartCount: () => flyingDarts.length + deflectedDarts.length,
  };
}
