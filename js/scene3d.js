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

export const STAGE_LAYOUTS = {
  1: {
    wheelSpeed: 0.52,
    centerCritter: 'bobby',
    outerCritters: ['catnap', 'dogday', 'hoppy', 'craftycorn', 'picky', 'bubba'],
    outerRadius: 1.62,
    bobAmplitude: 0.0,
  },
  2: {
    wheelSpeed: 0.68,
    centerCritter: 'craftycorn',
    outerCritters: ['dogday', 'catnap', 'kickin', 'baba', 'bobby', 'hoppy'],
    outerRadius: 1.64,
    bobAmplitude: 0.14,
  },
  3: {
    wheelSpeed: 0.78,
    centerCritter: 'catnap',
    outerCritters: ['dogday', 'bobby', 'hoppy', 'craftycorn', 'picky', 'bubba', 'kickin', 'baba'],
    outerRadius: 1.70,
    bobAmplitude: 0.16,
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

  // 12 cheerful carnival radial wedges
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
    ctx.strokeStyle = 'rgba(124, 74, 45, 0.18)';
    ctx.stroke();
  }

  // Concentric target scoring rings
  const rings = [
    { r: maxR * 0.96, stroke: '#fb7185', width: 22 },
    { r: maxR * 0.72, stroke: '#38bdf8', width: 18 },
    { r: maxR * 0.46, stroke: '#34d399', width: 18 },
    { r: maxR * 0.25, stroke: '#f59e0b', width: 20 },
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
  ctx.arc(cx, cy, maxR * 0.22, 0, Math.PI * 2);
  ctx.fillStyle = '#fef08a';
  ctx.fill();
  ctx.lineWidth = 8;
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
 * Creates a high-resolution 512x512 RGBA texture for a Smiling Critter target medallion
 * with vibrant plush shading, clean cocoa/gold frame, and automatic image load upgrade.
 */
function createCritterTargetTexture(renderer, critterId) {
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

    // Soft circular pastel halo behind the Critter plush so transparency pops cleanly
    const cx = size / 2;
    const cy = size / 2;
    const radGrad = ctx.createRadialGradient(cx, cy - 12, 30, cx, cy, 232);
    radGrad.addColorStop(0.0, '#ffffff');
    radGrad.addColorStop(0.72, meta.badgeBg || '#fffbeb');
    radGrad.addColorStop(1.0, 'rgba(255, 255, 255, 0.0)');
    ctx.beginPath();
    ctx.arc(cx, cy, 236, 0, Math.PI * 2);
    ctx.fillStyle = radGrad;
    ctx.fill();

    if (img && img.naturalWidth > 0 && img.naturalHeight > 0) {
      ctx.save();
      // Crisp drop shadow so the 3D plush pops off the target cushion
      ctx.shadowColor = 'rgba(45, 23, 12, 0.38)';
      ctx.shadowBlur = 18;
      ctx.shadowOffsetY = 8;
      const pad = 18;
      ctx.drawImage(img, pad, pad, size - pad * 2, size - pad * 2);
      ctx.restore();
    } else {
      // Immediate fallback before PNG finishes loading
      const hex = meta.colorHex;
      const r = (hex >> 16) & 255;
      const g = (hex >> 8) & 255;
      const b = hex & 255;
      ctx.fillStyle = `rgb(${r},${g},${b})`;
      ctx.beginPath();
      ctx.arc(cx, cy, 170, 0, Math.PI * 2);
      ctx.fill();
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
 * Builds a sculpted 3D High-Resolution Dart mesh (normal, triple, or super)
 */
function build3DDartMesh(dartType = 'normal', colorHex = 0xff4757) {
  const root = new THREE.Group();
  const isSuper = dartType === 'super';
  const scale = isSuper ? 1.48 : 1.08;
  root.scale.setScalar(scale);

  // Dart aligns along -Z (tip at z = -0.58, fins at z = +0.36)
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

  // Suction/plush collar ring right behind tip
  const collarMat = new THREE.MeshStandardMaterial({
    color: 0xfbbf24,
    roughness: 0.32,
    metalness: 0.55,
  });
  const collarMesh = new THREE.Mesh(new THREE.TorusGeometry(0.072, 0.024, 14, 28), collarMat);
  collarMesh.position.z = -0.31;
  root.add(collarMesh);

  // Sleek barrel body
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

  // White candy stripe band around barrel
  const bandMat = new THREE.MeshBasicMaterial({ color: 0xffffff, toneMapped: false });
  const bandGeo = new THREE.CylinderGeometry(0.081, 0.075, 0.14, 24);
  bandGeo.rotateX(Math.PI / 2);
  const bandMesh = new THREE.Mesh(bandGeo, bandMat);
  bandMesh.position.z = -0.08;
  root.add(bandMesh);

  // 4 tail fins
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

  // Glowing end cap
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

  // Studio softbox PMREM environment so metallic brass rims & glossy plush eyes gleam
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

  // Bright, sunny, physically calibrated Three.js r161 lighting
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

  // Carnival Wooden Stage Floor & Archway
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

  // Wooden Carnival Stand Pillars supporting the Giant 3D Dartboard Wheel
  const pillarMat = new THREE.MeshStandardMaterial({
    color: 0xb45309,
    roughness: 0.58,
    metalness: 0.15,
  });
  [-2.65, 2.65].forEach((px) => {
    const pillar = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.24, 4.2, 20), pillarMat);
    pillar.position.set(px, 0.65, -2.55);
    pillar.castShadow = true;
    stageGroup.add(pillar);
  });

  // 2 Full 3D Articulated Smiling Critter Cheerleaders on Left & Right Stage Pedestals!
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

  addStageCheerleader(buildCatNapPlushModel, -3.55, 0.36, 0x8a5cf5);
  addStageCheerleader(buildDogDayPlushModel, 3.55, -0.36, 0xf97316);

  // ============================================================================
  // GIANT 3D CARNIVAL DARTBOARD WHEEL (Center Stage, >= 60% of viewport)
  // ============================================================================
  const WHEEL_CENTER = new THREE.Vector3(0, 1.84, -2.10);
  const BOARD_RADIUS = 2.52;

  const wheelMountGroup = new THREE.Group();
  wheelMountGroup.position.copy(WHEEL_CENTER);
  scene.add(wheelMountGroup);

  const targetWheelGroup = new THREE.Group();
  wheelMountGroup.add(targetWheelGroup);

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

  // Group forCritter Target Pads + Group for Pinned 3D Darts
  const critterPadsRoot = new THREE.Group();
  targetWheelGroup.add(critterPadsRoot);

  const pinnedDartsGroup = new THREE.Group();
  targetWheelGroup.add(pinnedDartsGroup);

  const textureCache = new Map();
  function getCritterTex(critterId) {
    if (!textureCache.has(critterId)) {
      textureCache.set(critterId, createCritterTargetTexture(renderer, critterId));
    }
    return textureCache.get(critterId);
  }
  // Preload all 9 Smiling Critters target textures at scene creation so Stage 2 & Stage 3 render on frame 0
  Object.keys(CRITTER_META).forEach((cid) => getCritterTex(cid));

  let critterTargets = [];
  let currentStage = 1;
  let wheelAngle = 0;

  function buildCritterTargetPad(critterId, isCenter, index, totalOuter, outerRadius) {
    const meta = CRITTER_META[critterId] || CRITTER_META.catnap;
    const padRadius = isCenter ? 0.68 : totalOuter >= 8 ? 0.49 : 0.56;
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
    const cushionGeo = new THREE.CylinderGeometry(padRadius, padRadius * 1.05, 0.16, 40);
    cushionGeo.rotateX(Math.PI / 2);
    const cushionMat = new THREE.MeshStandardMaterial({
      color: meta.colorHex,
      roughness: 0.42,
      metalness: 0.15,
    });
    const cushionMesh = new THREE.Mesh(cushionGeo, cushionMat);
    cushionMesh.position.z = 0.04;
    padGroup.add(cushionMesh);

    // 2. 3D Golden / Colored Bevel Rim around the Critter Pad
    const padRimMat = new THREE.MeshStandardMaterial({
      color: isCenter ? 0xfbbf24 : meta.rimHex,
      roughness: 0.25,
      metalness: 0.68,
    });
    const padRimMesh = new THREE.Mesh(
      new THREE.TorusGeometry(padRadius, 0.055, 16, 44),
      padRimMat
    );
    padRimMesh.position.z = 0.11;
    padGroup.add(padRimMesh);

    // 3. Counter-rotating Upright Critter Plush Relief Group (stays upright like a Ferris wheel gondola!)
    const uprightGroup = new THREE.Group();
    uprightGroup.position.z = 0.14;
    padGroup.add(uprightGroup);

    // High-resolution RGBA Smiling Critter Plush Disc (double-layered for 3D relief pop)
    const portraitMat = new THREE.MeshBasicMaterial({
      map: getCritterTex(critterId),
      transparent: true,
      toneMapped: false,
      depthWrite: false,
    });
    const portraitSize = padRadius * 2.08;
    const portraitMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(portraitSize, portraitSize),
      portraitMat
    );
    portraitMesh.position.z = 0.05;
    uprightGroup.add(portraitMesh);

    // 3D Sonic Cute Yell Wave Rings (expand from mouth when hit!)
    const yellRings = [];
    for (let rIdx = 0; rIdx < 2; rIdx++) {
      const yRingMat = new THREE.MeshBasicMaterial({
        color: rIdx === 0 ? 0xfbbf24 : 0xff6b8b,
        transparent: true,
        opacity: 0.0,
        toneMapped: false,
        depthWrite: false,
      });
      const yRing = new THREE.Mesh(new THREE.RingGeometry(0.18, 0.25, 32), yRingMat);
      yRing.position.set(0, 0.06, 0.12 + rIdx * 0.02);
      yRing.visible = false;
      uprightGroup.add(yRing);
      yellRings.push({ mesh: yRing, mat: yRingMat });
    }

    // 3D Golden Star Hit Crown above the Critter
    const hitStar = buildStarMesh(0.16, 0xfbbf24);
    hitStar.position.set(0, padRadius * 0.88, 0.10);
    hitStar.visible = false;
    uprightGroup.add(hitStar);

    return {
      critterId,
      meta,
      isCenter,
      index,
      totalOuter,
      baseAngle,
      baseDist,
      padRadius,
      padGroup,
      uprightGroup,
      portraitMesh,
      padRimMat,
      yellRings,
      hitStar,
      hitCount: 0,
      yellTimer: 0,
      yellDuration: 0.95,
    };
  }

  function rebuildStageTargets(stageNum = 1) {
    currentStage = stageNum;
    const layout = STAGE_LAYOUTS[stageNum] || STAGE_LAYOUTS[1];

    // Clear old pads & pinned darts
    while (critterPadsRoot.children.length > 0) {
      critterPadsRoot.remove(critterPadsRoot.children[0]);
    }
    while (pinnedDartsGroup.children.length > 0) {
      pinnedDartsGroup.remove(pinnedDartsGroup.children[0]);
    }
    critterTargets = [];

    // Center Bullseye Critter
    critterTargets.push(
      buildCritterTargetPad(layout.centerCritter, true, 0, layout.outerCritters.length, 0)
    );

    // Outer Ring Critters
    layout.outerCritters.forEach((cid, idx) => {
      critterTargets.push(
        buildCritterTargetPad(cid, false, idx, layout.outerCritters.length, layout.outerRadius)
      );
    });
  }

  rebuildStageTargets(1);

  // ============================================================================
  // 3D FOREGROUND DART LAUNCHER, GLOWING CROSSHAIR & PARABOLIC TRAJECTORY ARC
  // ============================================================================
  const LAUNCH_ORIGIN = new THREE.Vector3(0, -0.32, 3.65);
  const TARGET_PLANE_Z = WHEEL_CENTER.z + 0.22; // -1.88

  const launcherGroup = new THREE.Group();
  launcherGroup.position.copy(LAUNCH_ORIGIN);
  scene.add(launcherGroup);

  // Golden Toy Launcher Stand
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

  // 3D Glowing Crosshair Reticle on the Target Plane
  const aimWorldPos = new THREE.Vector3(0, WHEEL_CENTER.y, TARGET_PLANE_Z);
  let manualAimActive = false;
  let manualAimHoldTimer = 0;

  const reticleGroup = new THREE.Group();
  reticleGroup.position.copy(aimWorldPos);
  scene.add(reticleGroup);

  const retOuter = new THREE.Mesh(
    new THREE.RingGeometry(0.32, 0.40, 36),
    new THREE.MeshBasicMaterial({
      color: 0xfef08a,
      side: THREE.DoubleSide,
      toneMapped: false,
      depthTest: false,
    })
  );
  retOuter.renderOrder = 20;
  reticleGroup.add(retOuter);

  const retInner = new THREE.Mesh(
    new THREE.RingGeometry(0.06, 0.12, 24),
    new THREE.MeshBasicMaterial({
      color: 0xff4757,
      side: THREE.DoubleSide,
      toneMapped: false,
      depthTest: false,
    })
  );
  retInner.renderOrder = 21;
  reticleGroup.add(retInner);

  // 14 Glowing 3D Trajectory Arc Pearls from Launcher to Reticle
  const arcDots = [];
  const arcDotGeo = new THREE.SphereGeometry(0.048, 10, 10);
  for (let i = 1; i <= 14; i++) {
    const dotMat = new THREE.MeshBasicMaterial({
      color: i % 2 === 0 ? 0xfef08a : 0xffffff,
      transparent: true,
      opacity: 0.78,
      toneMapped: false,
    });
    const dot = new THREE.Mesh(arcDotGeo, dotMat);
    scene.add(dot);
    arcDots.push({ mesh: dot, u: i / 15 });
  }

  function sampleParabolicArc(start, end, u, arcLift = 0.68) {
    const x = start.x + (end.x - start.x) * u;
    const y = start.y + (end.y - start.y) * u + Math.sin(u * Math.PI) * arcLift;
    const z = start.z + (end.z - start.z) * u;
    return new THREE.Vector3(x, y, z);
  }

  function updateAimVisuals(t = 0) {
    reticleGroup.position.copy(aimWorldPos);
    const pulse = 1.0 + Math.sin(t * 7.0) * 0.08;
    const typeScale = currentDartType === 'super' ? 1.45 : currentDartType === 'triple' ? 1.2 : 1.0;
    reticleGroup.scale.setScalar(pulse * typeScale);
    retOuter.rotation.z = t * 1.8;

    for (const d of arcDots) {
      const p = sampleParabolicArc(LAUNCH_ORIGIN, aimWorldPos, d.u, 0.65);
      d.mesh.position.copy(p);
      const s = 0.75 + 0.35 * Math.sin(t * 8.0 - d.u * 6.0);
      d.mesh.scale.setScalar(s);
    }

    // Orient launcher preview dart along initial tangent of parabolic arc
    const pNear = sampleParabolicArc(LAUNCH_ORIGIN, aimWorldPos, 0.12, 0.65);
    launcherGroup.lookAt(pNear);
  }

  // ============================================================================
  // FLYING 3D DARTS & 3D STAR/HEART BURST PARTICLES
  // ============================================================================
  const flyingDarts = [];
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
    pad.hitStar.visible = true;
    for (const yr of pad.yellRings) {
      yr.mesh.visible = true;
      yr.mat.opacity = 0.95;
      yr.mesh.scale.setScalar(0.5);
    }
    // Also trigger the 3D Stage Cheerleader Critters!
    for (const ch of stageCheerCritters) {
      ch.cheerTimer = 0.95;
    }
    trauma = Math.min(1.0, trauma + 0.45);
    spawnHitBurst(hitWorldPos, pad.meta.colorHex, 18);
  }

  function resolveDartImpact(flight) {
    const hitWorld = flight.endPos.clone();
    scene.remove(flight.mesh);

    // Attach a pinned 3D dart onto targetWheelGroup so it spins with the wheel!
    const localHit = targetWheelGroup.worldToLocal(hitWorld.clone());
    const pinnedMesh = build3DDartMesh(flight.dartType, flight.colorHex);
    pinnedMesh.position.copy(localHit);
    pinnedMesh.position.z = 0.22;
    pinnedDartsGroup.add(pinnedMesh);
    pinnedDarts.push({
      mesh: pinnedMesh,
      wobbleTimer: 0.65,
    });

    // Check which Smiling Critter target pad(s) were hit!
    const hitCritters = [];
    const hitRadiusBonus = flight.dartType === 'super' ? 1.55 : 0.26;

    for (const pad of critterTargets) {
      const padWorld = new THREE.Vector3();
      pad.padGroup.getWorldPosition(padWorld);
      const dx = hitWorld.x - padWorld.x;
      const dy = hitWorld.y - padWorld.y;
      const dist = Math.hypot(dx, dy);
      if (dist <= pad.padRadius + hitRadiusBonus) {
        hitCritters.push({ pad, dist, padWorld });
      }
    }

    // Sort by closest hit first
    hitCritters.sort((a, b) => a.dist - b.dist);

    if (hitCritters.length > 0) {
      // Normal/triple dart triggers the closest Critter hit; Super dart triggers up to 3 nearby Critters!
      const maxTargets = flight.dartType === 'super' ? Math.min(3, hitCritters.length) : 1;
      const chosen = hitCritters.slice(0, maxTargets);
      for (const item of chosen) {
        triggerCritterReaction(item.pad, item.padWorld);
        const screenPt = worldToScreen(item.padWorld.clone().add(new THREE.Vector3(0, 0.55, 0.2)));
        if (callbacks.onCritterHit) {
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
    } else {
      // Hit the dartboard between Critters — award board ring points
      const distFromCenter = Math.hypot(
        hitWorld.x - WHEEL_CENTER.x,
        hitWorld.y - WHEEL_CENTER.y
      );
      if (distFromCenter <= BOARD_RADIUS * 1.05) {
        spawnHitBurst(hitWorld, 0x38bdf8, 8);
        const screenPt = worldToScreen(hitWorld);
        if (callbacks.onBoardHit) {
          callbacks.onBoardHit({
            distRatio: distFromCenter / BOARD_RADIUS,
            screenX: screenPt.x,
            screenY: screenPt.y,
          });
        }
      }
    }
  }

  /**
   * Fires the currently selected dart toward targetWorldPos (or current aimWorldPos).
   * Compensates for wheel rotation over the 0.24s flight time so tapping directly on a
   * Smiling Critter reliably lands right on that Critter!
   */
  function shootDartAt(targetPoint = null, dartType = currentDartType) {
    const baseAim = (targetPoint || aimWorldPos).clone();
    baseAim.z = TARGET_PLANE_Z;

    // Clamp within reachable carnival stage area
    const dx0 = baseAim.x - WHEEL_CENTER.x;
    const dy0 = baseAim.y - WHEEL_CENTER.y;
    const r0 = Math.hypot(dx0, dy0);
    if (r0 > BOARD_RADIUS * 0.96) {
      const scale = (BOARD_RADIUS * 0.96) / r0;
      baseAim.x = WHEEL_CENTER.x + dx0 * scale;
      baseAim.y = WHEEL_CENTER.y + dy0 * scale;
    }

    // If the player aimed near a Smiling Critter pad, lead the rotating pad over flightDuration
    const flightDuration = 0.24;
    const layout = STAGE_LAYOUTS[currentStage] || STAGE_LAYOUTS[1];
    let bestPad = null;
    let bestDist = Infinity;
    for (const pad of critterTargets) {
      const pw = new THREE.Vector3();
      pad.padGroup.getWorldPosition(pw);
      const d = Math.hypot(baseAim.x - pw.x, baseAim.y - pw.y);
      if (d < pad.padRadius * 1.25 && d < bestDist) {
        bestDist = d;
        bestPad = pad;
      }
    }
    if (bestPad && !bestPad.isCenter) {
      const futureWheelAngle = wheelAngle + layout.wheelSpeed * flightDuration;
      const totalAngle = bestPad.baseAngle + futureWheelAngle;
      baseAim.x = WHEEL_CENTER.x + Math.cos(totalAngle) * bestPad.baseDist;
      baseAim.y = WHEEL_CENTER.y + Math.sin(totalAngle) * bestPad.baseDist;
    } else if (bestPad && bestPad.isCenter) {
      baseAim.x = WHEEL_CENTER.x;
      baseAim.y = WHEEL_CENTER.y;
    }

    const offsets = dartType === 'triple' ? [-0.62, 0, 0.62] : [0];
    const colors = dartType === 'triple' ? [0x38bdf8, 0xff4757, 0x22c55e] : [0xff4757];

    offsets.forEach((ox, idx) => {
      const endPos = baseAim.clone();
      endPos.x += ox;
      endPos.y += idx === 1 ? 0.12 : 0;

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
        duration: flightDuration,
      });
    });

    // Recoil kick on preview launcher
    previewDartHolder.position.z = 0.22;
  }

  function screenToTargetWorld(clientX, clientY) {
    const rect = canvas.getBoundingClientRect();
    if (!rect.width || !rect.height) return aimWorldPos.clone();
    const ndcX = ((clientX - rect.left) / rect.width) * 2 - 1;
    const ndcY = -((clientY - rect.top) / rect.height) * 2 + 1;

    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(new THREE.Vector2(ndcX, ndcY), camera);
    const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), -TARGET_PLANE_Z);
    const hit = new THREE.Vector3();
    if (raycaster.ray.intersectPlane(plane, hit)) {
      const dx = hit.x - WHEEL_CENTER.x;
      const dy = hit.y - WHEEL_CENTER.y;
      const r = Math.hypot(dx, dy);
      const maxR = BOARD_RADIUS * 0.96;
      if (r > maxR) {
        hit.x = WHEEL_CENTER.x + (dx / r) * maxR;
        hit.y = WHEEL_CENTER.y + (dy / r) * maxR;
      }
      hit.z = TARGET_PLANE_Z;
      return hit;
    }
    return aimWorldPos.clone();
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
    const pt = screenToTargetWorld(clientX, clientY);
    aimWorldPos.copy(pt);
    manualAimActive = true;
    manualAimHoldTimer = 4.0;
    return pt;
  }

  function resize() {
    const w = canvas.clientWidth || window.innerWidth || 1280;
    const h = canvas.clientHeight || window.innerHeight || 800;
    renderer.setSize(w, h, false);
    const aspect = w / Math.max(1, h);
    camera.aspect = aspect;

    // Responsive framing so the Giant 3D Dartboard Wheel + Launcher fit 100% on both portrait & landscape
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
    const layout = STAGE_LAYOUTS[currentStage] || STAGE_LAYOUTS[1];

    // 1. Rotate Giant 3D Carnival Dartboard Wheel
    wheelAngle += layout.wheelSpeed * clampedDt;
    targetWheelGroup.rotation.z = wheelAngle;

    // Chase marquee bulbs around wheel perimeter
    for (let i = 0; i < marqueeBulbs.length; i++) {
      const wave = Math.sin(elapsed * 8.0 - i * 0.55);
      marqueeBulbs[i].scale.setScalar(0.92 + 0.22 * Math.max(0, wave));
    }

    // 2. Update each Smiling Critter Target Pad (keep upright + animate cute yell squash & stretch!)
    for (const pad of critterTargets) {
      if (!pad.isCenter && layout.bobAmplitude > 0) {
        const r =
          pad.baseDist +
          Math.sin(elapsed * 2.8 + pad.index * 1.05) * layout.bobAmplitude;
        pad.padGroup.position.x = Math.cos(pad.baseAngle) * r;
        pad.padGroup.position.y = Math.sin(pad.baseAngle) * r;
      }

      // Keep Critter upright as wheel spins + gentle joyful sway
      const sway = Math.sin(elapsed * 3.2 + pad.index * 0.9) * 0.06;
      pad.uprightGroup.rotation.z = -wheelAngle + sway;

      if (pad.yellTimer > 0) {
        pad.yellTimer = Math.max(0, pad.yellTimer - clampedDt);
        const u = 1.0 - pad.yellTimer / pad.yellDuration;
        const env = Math.sin(u * Math.PI);

        // Pop forward in 3D + bouncy squash-and-stretch celebration!
        pad.uprightGroup.position.z = 0.14 + env * 0.42;
        const sx = 1.0 + Math.sin(u * Math.PI * 5.0) * 0.26 * (1.0 - u * 0.5);
        const sy = 1.0 - Math.sin(u * Math.PI * 5.0) * 0.22 * (1.0 - u * 0.5) + env * 0.25;
        pad.portraitMesh.scale.set(sx, sy, 1.0);
        pad.uprightGroup.rotation.z =
          -wheelAngle + Math.sin(u * Math.PI * 8.0) * 0.24 * (1.0 - u);

        // Expand 3D sonic yell wave rings from mouth
        pad.yellRings.forEach((yr, idx) => {
          const ru = (u * 1.6 + idx * 0.35) % 1.0;
          yr.mesh.visible = true;
          yr.mesh.scale.setScalar(0.55 + ru * 2.1);
          yr.mat.opacity = Math.max(0, (1.0 - ru) * 0.85 * env);
        });
      } else {
        // Gentle idle breathing pulse on the target
        const breathe = 1.0 + Math.sin(elapsed * 3.6 + pad.index) * 0.035;
        pad.uprightGroup.position.z = 0.14;
        pad.portraitMesh.scale.set(breathe, breathe, 1.0);
        for (const yr of pad.yellRings) {
          yr.mesh.visible = false;
        }
      }

      if (pad.hitStar.visible) {
        pad.hitStar.rotation.z = elapsed * 2.5;
      }
    }

    // 3. Animate the 2 3D Articulated Stage Cheerleader Critters (CatNap & DogDay)
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

    // 4. Gentle figure-8 sweep of aim crosshair when player hasn't manually dragged recently
    if (manualAimHoldTimer > 0) {
      manualAimHoldTimer = Math.max(0, manualAimHoldTimer - clampedDt);
      if (manualAimHoldTimer === 0) manualAimActive = false;
    }
    if (!manualAimActive) {
      const sweepR = layout.outerRadius * 0.92;
      aimWorldPos.x = WHEEL_CENTER.x + Math.cos(elapsed * 1.15) * sweepR;
      aimWorldPos.y = WHEEL_CENTER.y + Math.sin(elapsed * 1.72) * sweepR * 0.85;
      aimWorldPos.z = TARGET_PLANE_Z;
    }
    updateAimVisuals(elapsed);

    // Launcher recoil recovery
    previewDartHolder.position.z *= Math.pow(0.001, clampedDt);

    // 5. Substepped 120Hz Flying Dart Physics
    for (let i = flyingDarts.length - 1; i >= 0; i--) {
      const f = flyingDarts[i];
      f.elapsed += clampedDt;
      const u = Math.min(1.0, f.elapsed / f.duration);
      const pos = sampleParabolicArc(f.startPos, f.endPos, u, 0.65);
      const nextU = Math.min(1.0, u + 0.04);
      const nextPos = sampleParabolicArc(f.startPos, f.endPos, nextU, 0.65);
      f.mesh.position.copy(pos);
      if (nextU > u) {
        f.mesh.lookAt(nextPos);
      }
      f.mesh.rotateZ(elapsed * 12.0);

      if (u >= 1.0) {
        flyingDarts.splice(i, 1);
        resolveDartImpact(f);
      }
    }

    // 6. Pinned Dart Spring Wobble
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

    // 7. Update 3D Star/Heart Burst Particles
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

    // 8. Subtle Post-Lerp Positional Camera Shake (strictly <= 0.08 units, zero rotational shake)
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
    getTargetScreenPositions,
    getCritterPadWorldPosition,
    getCritterTargets: () => critterTargets,
    getFlyingDartCount: () => flyingDarts.length,
  };
}
