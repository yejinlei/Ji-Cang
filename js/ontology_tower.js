/**
 * 本体七层浮屠 · Three.js 3D 可视化
 * 七层同心圆盘由下至上半径递减，形成"下学上达"的浮屠塔形态：
 *   L7 文化外延 → L6 意象情感 → L5 文论术语 → L4 篇章结构
 *   L3 具体文献 → L2 集部九类 → L1 文/道/气
 * 圆盘之间以金柱贯穿，外环悬浮中文标签；鼠标拖拽旋转/滚轮缩放，自动缓慢自转。
 */
import * as THREE from '../vendor/three.module.js';

const LAYERS = [
  { code:'L1', name:'元模型',     sub:'文·道·气',     desc:'本体之元，文以载道', color:0xc8102e },
  { code:'L2', name:'域类',       sub:'集部九类',     desc:'文以类聚，体以类分', color:0xd94a4a },
  { code:'L3', name:'典籍',       sub:'具体文献',     desc:'一千六百六十九部典籍', color:0xd4b079 },
  { code:'L4', name:'卷篇',       sub:'篇章结构',     desc:'篇章卷次，法度森严', color:0xe8c98a },
  { code:'L5', name:'文论',       sub:'文论术语',     desc:'诗文评说，妙悟文心', color:0x7fb8d9 },
  { code:'L6', name:'文象',       sub:'意象情感',     desc:'意象万千，情志所托', color:0x98c379 },
  { code:'L7', name:'文化',       sub:'外延语境',     desc:'时代文化语境之延伸', color:0xb48ead }
];

export function mountTower(container) {
  // ===== 场景 =====
  const scene = new THREE.Scene();
  scene.background = null; // 透明，融入页面深空背景
  scene.fog = new THREE.Fog(0x0a1628, 18, 40);

  // ===== 相机 =====
  const w = container.clientWidth, h = Math.max(480, Math.min(640, w * 0.7));
  container.style.height = h + 'px';
  container.style.position = 'relative';
  const camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 200);
  camera.position.set(0, 6, 18);
  camera.lookAt(0, 0, 0);

  // ===== 渲染器 =====
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(w, h);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  container.appendChild(renderer.domElement);
  renderer.domElement.style.borderRadius = '12px';
  renderer.domElement.style.display = 'block';

  // ===== 灯光 =====
  scene.add(new THREE.AmbientLight(0x4a6fa5, 0.55));
  const key = new THREE.DirectionalLight(0xffd9a3, 1.1);
  key.position.set(8, 14, 10);
  key.castShadow = true;
  key.shadow.mapSize.set(1024, 1024);
  key.shadow.camera.left = -15; key.shadow.camera.right = 15;
  key.shadow.camera.top = 15;  key.shadow.camera.bottom = -15;
  scene.add(key);
  const rim = new THREE.DirectionalLight(0x5fa8d3, 0.6);
  rim.position.set(-8, 4, -6);
  scene.add(rim);
  const goldLight = new THREE.PointLight(0xd4b079, 1.4, 30);
  goldLight.position.set(0, 8, 4);
  scene.add(goldLight);

  // ===== 塔组 =====
  const tower = new THREE.Group();
  scene.add(tower);

  const layerMeshes = [];
  const layerSpacing = 1.6;     // 层间距
  const baseR = 5.2;            // 最底层半径（L7 文化）
  const topR  = 1.4;            // 最顶层半径（L1 元模型）
  const ringThick = 0.22;
  const diskH = 0.18;

  // 七层从下往上排（L7→L1），但 LAYERS 数组顺序是 L1→L7，反向迭代
  for (let i = 0; i < LAYERS.length; i++) {
    const li = LAYERS[i];
    const t = i / (LAYERS.length - 1);      // 0=顶(L1), 1=底(L7)
    const r = topR + (baseR - topR) * t;
    const y = (LAYERS.length - 1 - i) * layerSpacing; // 从 0(L1顶) → 9.6(L7底)
    const yCenter = (LAYERS.length - 1) * layerSpacing / 2; // 居中

    // --- 发光外环（圆环）---
    const ringGeo = new THREE.TorusGeometry(r, ringThick, 16, 80);
    const ringMat = new THREE.MeshStandardMaterial({
      color: li.color,
      emissive: li.color,
      emissiveIntensity: 0.55,
      metalness: 0.7,
      roughness: 0.25
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = -Math.PI / 2;
    ring.position.y = y - yCenter;
    ring.castShadow = true;
    ring.receiveShadow = true;
    tower.add(ring);

    // --- 中心薄盘（半透）---
    const diskGeo = new THREE.CylinderGeometry(r - 0.05, r - 0.05, diskH, 64, 1, true);
    const diskMat = new THREE.MeshStandardMaterial({
      color: li.color,
      transparent: true,
      opacity: 0.12,
      side: THREE.DoubleSide,
      metalness: 0.3,
      roughness: 0.6
    });
    const disk = new THREE.Mesh(diskGeo, diskMat);
    disk.position.y = y - yCenter;
    tower.add(disk);

    // --- 盘面点阵（每个盘面分布 16 颗金色小珠）---
    const beads = new THREE.Group();
    const beadCount = 16;
    for (let b = 0; b < beadCount; b++) {
      const a = (b / beadCount) * Math.PI * 2;
      const beadGeo = new THREE.SphereGeometry(0.08, 12, 12);
      const beadMat = new THREE.MeshStandardMaterial({
        color: 0xffe9a8,
        emissive: 0xd4b079,
        emissiveIntensity: 0.8,
        metalness: 0.9,
        roughness: 0.2
      });
      const bead = new THREE.Mesh(beadGeo, beadMat);
      bead.position.set(Math.cos(a) * (r - 0.25), 0, Math.sin(a) * (r - 0.25));
      beads.add(bead);
    }
    beads.position.y = y - yCenter + diskH + 0.02;
    tower.add(beads);

    // --- 中心光柱（贯穿上下）---
    if (i < LAYERS.length - 1) {
      const pillarGeo = new THREE.CylinderGeometry(0.08, 0.08, layerSpacing - diskH, 16);
      const pillarMat = new THREE.MeshStandardMaterial({
        color: 0xd4b079,
        emissive: 0xd4b079,
        emissiveIntensity: 0.4,
        metalness: 0.9,
        roughness: 0.3
      });
      const pillar = new THREE.Mesh(pillarGeo, pillarMat);
      pillar.position.y = y - yCenter - (layerSpacing - diskH) / 2;
      tower.add(pillar);
    }

    // --- 悬浮层标（CanvasTexture 汉字牌）---
    const label = makeLabelSprite(li);
    label.position.set(r + 1.8, y - yCenter, 0);
    tower.add(label);

    // --- 层代码（L1-L7）浮在环面上方 ---
    const codeLabel = makeCodeSprite(li.code, li.color);
    codeLabel.position.set(0, y - yCenter + 0.4, 0);
    tower.add(codeLabel);

    layerMeshes.push({ ring, disk, beads, label, codeLabel, li, r, y: y - yCenter });
  }

  // --- 塔刹（顶部宝珠）---
  const top = tower.children[0]; // L1 ring
  const finialY = layerMeshes[0].y + 1.2;
  const finialGeo = new THREE.SphereGeometry(0.35, 32, 32);
  const finialMat = new THREE.MeshStandardMaterial({
    color: 0xffd700,
    emissive: 0xd4b079,
    emissiveIntensity: 1.2,
    metalness: 1.0,
    roughness: 0.1
  });
  const finial = new THREE.Mesh(finialGeo, finialMat);
  finial.position.y = finialY;
  tower.add(finial);
  // 塔刹光
  const topLight = new THREE.PointLight(0xffd9a3, 1.2, 10);
  topLight.position.set(0, finialY, 0);
  tower.add(topLight);

  // --- 塔基（莲花座）---
  const baseY = layerMeshes[layerMeshes.length - 1].y - 0.4;
  const lotusGeo = new THREE.CylinderGeometry(baseR + 0.6, baseR + 1.0, 0.4, 8);
  const lotusMat = new THREE.MeshStandardMaterial({
    color: 0x3a2a1a,
    metalness: 0.5,
    roughness: 0.7
  });
  const lotus = new THREE.Mesh(lotusGeo, lotusMat);
  lotus.position.y = baseY;
  lotus.receiveShadow = true;
  tower.add(lotus);

  // --- 地面（接收阴影的圆形地板）---
  const floorGeo = new THREE.CircleGeometry(baseR + 3, 64);
  const floorMat = new THREE.MeshStandardMaterial({
    color: 0x0f1e36,
    transparent: true,
    opacity: 0.6,
    roughness: 0.9,
    metalness: 0.1
  });
  const floor = new THREE.Mesh(floorGeo, floorMat);
  floor.rotation.x = -Math.PI / 2;
  floor.position.y = baseY - 0.25;
  floor.receiveShadow = true;
  tower.add(floor);

  // --- 底座八卦方位点（12 个方位星）---
  for (let i = 0; i < 12; i++) {
    const a = (i / 12) * Math.PI * 2;
    const sr = baseR + 2.2;
    const sGeo = new THREE.SphereGeometry(0.06, 8, 8);
    const sMat = new THREE.MeshStandardMaterial({
      color: 0xd4b079, emissive: 0xd4b079, emissiveIntensity: 1.0
    });
    const s = new THREE.Mesh(sGeo, sMat);
    s.position.set(Math.cos(a) * sr, baseY + 0.05, Math.sin(a) * sr);
    tower.add(s);
  }

  // ===== 鼠标交互：拖拽旋转 + 滚轮缩放 =====
  let isDragging = false;
  let prevX = 0, prevY = 0;
  let rotY = 0, rotX = 0.25;
  let targetRotY = 0, targetRotX = 0.25;
  let dist = 18, targetDist = 18;
  let autoSpin = true;

  const dom = renderer.domElement;
  dom.style.cursor = 'grab';
  dom.addEventListener('pointerdown', e => {
    isDragging = true; autoSpin = false;
    prevX = e.clientX; prevY = e.clientY;
    dom.style.cursor = 'grabbing';
    dom.setPointerCapture(e.pointerId);
  });
  dom.addEventListener('pointermove', e => {
    if (!isDragging) return;
    const dx = e.clientX - prevX, dy = e.clientY - prevY;
    targetRotY += dx * 0.008;
    targetRotX = Math.max(-0.6, Math.min(0.9, targetRotX + dy * 0.008));
    prevX = e.clientX; prevY = e.clientY;
  });
  const endDrag = e => {
    isDragging = false;
    dom.style.cursor = 'grab';
    try { dom.releasePointerCapture(e.pointerId); } catch(_) {}
  };
  dom.addEventListener('pointerup', endDrag);
  dom.addEventListener('pointercancel', endDrag);
  dom.addEventListener('wheel', e => {
    e.preventDefault();
    targetDist = Math.max(10, Math.min(32, targetDist + e.deltaY * 0.02));
  }, { passive: false });

  // ===== Hover 高亮（射线检测）=====
  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();
  let hoverRing = null;
  const infoBox = document.createElement('div');
  infoBox.style.cssText = 'position:absolute;left:16px;bottom:16px;padding:12px 16px;border-radius:8px;' +
    'background:rgba(10,22,40,0.85);border:1px solid rgba(212,176,121,0.4);color:#e8dfc9;' +
    'font-size:13px;line-height:1.7;pointer-events:none;backdrop-filter:blur(6px);' +
    'min-width:220px;transition:opacity .3s;opacity:0;z-index:5;';
  container.appendChild(infoBox);

  dom.addEventListener('pointermove', e => {
    const rect = dom.getBoundingClientRect();
    pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
  });

  // ===== Resize =====
  function resize() {
    const w2 = container.clientWidth;
    const h2 = Math.max(480, Math.min(640, w2 * 0.7));
    container.style.height = h2 + 'px';
    camera.aspect = w2 / h2;
    camera.updateProjectionMatrix();
    renderer.setSize(w2, h2);
  }
  window.addEventListener('resize', resize);

  // ===== 动画循环 =====
  const clock = new THREE.Clock();
  function animate() {
    requestAnimationFrame(animate);
    const t = clock.getElapsedTime();

    // 自转
    if (autoSpin) targetRotY += 0.003;

    // 缓动
    rotY += (targetRotY - rotY) * 0.08;
    rotX += (targetRotX - rotX) * 0.08;
    dist += (targetDist - dist) * 0.08;

    tower.rotation.y = rotY;
    tower.rotation.x = rotX;

    // 相机位置（轨道）
    camera.position.set(
      Math.sin(rotY) * Math.cos(rotX) * dist,
      Math.sin(rotX) * dist + 2,
      Math.cos(rotY) * Math.cos(rotX) * dist
    );
    camera.lookAt(0, 0, 0);

    // 珠点呼吸
    layerMeshes.forEach((m, idx) => {
      m.beads.children.forEach((b, bi) => {
        const pulse = 0.8 + Math.sin(t * 2 + bi * 0.4 + idx) * 0.2;
        b.material.emissiveIntensity = pulse;
      });
      // 环呼吸
      m.ring.material.emissiveIntensity = 0.45 + Math.sin(t * 1.5 + idx * 0.6) * 0.2;
    });
    finial.material.emissiveIntensity = 0.9 + Math.sin(t * 3) * 0.4;

    // Hover 检测
    raycaster.setFromCamera(pointer, camera);
    const ringObjs = layerMeshes.map(m => m.ring);
    const hits = raycaster.intersectObjects(ringObjs);
    if (hits.length) {
      const hit = hits[0].object;
      if (hoverRing !== hit) {
        if (hoverRing) hoverRing.material.emissiveIntensity = 0.55;
        hoverRing = hit;
        hoverRing.material.emissiveIntensity = 1.5;
        const idx = ringObjs.indexOf(hit);
        const li = LAYERS[idx];
        infoBox.innerHTML =
          '<div style="color:#d4b079;font-size:16px;font-weight:600;letter-spacing:2px;margin-bottom:4px;">' +
          li.code + ' · ' + li.name + '</div>' +
          '<div style="color:#c9b17a;margin-bottom:4px;">' + li.sub + '</div>' +
          '<div style="color:#c5ccdc;font-size:12px;">' + li.desc + '</div>';
        infoBox.style.opacity = '1';
      }
    } else if (hoverRing) {
      hoverRing.material.emissiveIntensity = 0.55;
      hoverRing = null;
      infoBox.style.opacity = '0';
    }

    renderer.render(scene, camera);
  }
  animate();

  return { resize, dispose: () => {
    renderer.dispose();
    window.removeEventListener('resize', resize);
  }};
}

// --- 生成层标签 Sprite ---
function makeLabelSprite(li) {
  const c = document.createElement('canvas');
  c.width = 360; c.height = 140;
  const g = c.getContext('2d');
  g.clearRect(0,0,c.width,c.height);
  // 背景（半透圆角）
  g.fillStyle = 'rgba(10,22,40,0.85)';
  roundRect(g, 4, 4, c.width-8, c.height-8, 14);
  g.fill();
  g.strokeStyle = '#' + li.color.toString(16).padStart(6,'0');
  g.lineWidth = 2;
  roundRect(g, 4, 4, c.width-8, c.height-8, 14);
  g.stroke();
  // 代码
  g.fillStyle = '#' + li.color.toString(16).padStart(6,'0');
  g.font = 'bold 28px serif';
  g.textBaseline = 'middle';
  g.fillText(li.code, 20, 45);
  // 名称
  g.fillStyle = '#f5e9c8';
  g.font = 'bold 34px "KaiTi","STKaiti",serif';
  g.fillText(li.name, 90, 45);
  // 副标
  g.fillStyle = '#c9b17a';
  g.font = '22px "KaiTi","STKaiti",serif';
  g.fillText(li.sub, 20, 95);
  // 描述
  g.fillStyle = '#9aa7c0';
  g.font = '18px "KaiTi","STKaiti",serif';
  g.fillText(li.desc, 120, 95);

  const tex = new THREE.CanvasTexture(c);
  tex.minFilter = THREE.LinearFilter;
  const mat = new THREE.SpriteMaterial({ map: tex, transparent: true, depthTest: false });
  const sp = new THREE.Sprite(mat);
  sp.scale.set(4.0, 1.56, 1);
  return sp;
}

// --- 生成层代码小标签 Sprite ---
function makeCodeSprite(code, color) {
  const c = document.createElement('canvas');
  c.width = 128; c.height = 96;
  const g = c.getContext('2d');
  g.clearRect(0,0,c.width,c.height);
  g.fillStyle = '#' + color.toString(16).padStart(6,'0');
  g.font = 'bold 64px serif';
  g.textAlign = 'center'; g.textBaseline = 'middle';
  g.shadowColor = '#' + color.toString(16).padStart(6,'0');
  g.shadowBlur = 16;
  g.fillText(code, c.width/2, c.height/2);

  const tex = new THREE.CanvasTexture(c);
  tex.minFilter = THREE.LinearFilter;
  const mat = new THREE.SpriteMaterial({ map: tex, transparent: true, depthTest: false });
  const sp = new THREE.Sprite(mat);
  sp.scale.set(1.4, 1.05, 1);
  return sp;
}

function roundRect(g, x, y, w, h, r) {
  g.beginPath();
  g.moveTo(x+r, y);
  g.lineTo(x+w-r, y); g.quadraticCurveTo(x+w, y, x+w, y+r);
  g.lineTo(x+w, y+h-r); g.quadraticCurveTo(x+w, y+h, x+w-r, y+h);
  g.lineTo(x+r, y+h); g.quadraticCurveTo(x, y+h, x, y+h-r);
  g.lineTo(x, y+r); g.quadraticCurveTo(x, y, x+r, y);
  g.closePath();
}
