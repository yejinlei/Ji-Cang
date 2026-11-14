/**
 * 集藏本体论 · 4×7×9 正交三维图谱
 * 输入：全局 JICANG_TBOX、JICANG_ORTHO（由 data/ontology.js 提供）
 * 挂载：window.JiCangOntology3D = { mount(containerId) }
 *
 * 三维坐标：
 *   X 轴：4 轴（A1 文体典要 / A2 义理意象 / A3 人物传承 / A4 时代事件）
 *   Y 轴：7 层（L6→L0，下俗上元）
 *   Z 轴：9 类（别集/总集/诗文评/小说/演义/话本/宝卷/笑话/谜语）
 * 共 4×7×9 = 252 个节点。
 *
 * 交互：
 *   鼠标拖拽旋转 · 滚轮缩放 · 右键平移
 *   悬停节点显示 tooltip（轴/层/类 + 该位置本体描述）
 *   点击右侧图例按钮高亮某轴 / 某层 / 某类
 */
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const AXIS_COLORS = {
  A1: 0x8B2500, // 文体典要 · 朱
  A2: 0xB8860B, // 义理意象 · 金
  A3: 0x2F4F4F, // 人物传承 · 墨青
  A4: 0x5C4033  // 时代事件 · 褐
};
const LAYER_COLORS = [0x7a736a,0x6b3fa0,0x8B2500,0xB8860B,0x2f6b5f,0x5C4033,0x1a1a1a];
const LAYER_OPACITY_BASE = [0.18,0.22,0.28,0.32,0.38,0.44,0.50];
const PARTITION_COLORS = {
  bieji:   0x8B2500,
  zongji:  0xB8860B,
  wenping: 0x2F4F4F,
  xiaoshuo:0x5C4033,
  yanyi:   0x8B4513,
  huaben:  0x6b3fa0,
  baojuan: 0xa9801f,
  xiaohua: 0xb5651d,
  miyu:    0x2f6b5f
};

// 工具：用 Canvas 画中文字符作为 Sprite 纹理
function makeTextSprite(text, { color='#222', bg=null, fontSize=64, padding=12, fontWeight='bold' } = {}) {
  const lines = String(text || '').split('\n').filter(l => l.length > 0);
  if (!lines.length) return null;
  const lineHeight = Math.ceil(fontSize * 1.3);
  const measure = document.createElement('canvas').getContext('2d');
  measure.font = `${fontWeight} ${fontSize}px "Songti SC","STSong","SimSun",serif`;
  const textWidth = Math.max(1, ...lines.map(l => Math.ceil(measure.measureText(l).width)));
  const canvas = document.createElement('canvas');
  canvas.width = textWidth + padding*2;
  canvas.height = lineHeight * lines.length + padding*2;
  const ctx = canvas.getContext('2d');
  if (bg) {
    ctx.fillStyle = bg;
    ctx.fillRect(0,0,canvas.width,canvas.height);
  }
  ctx.font = `${fontWeight} ${fontSize}px "Songti SC","STSong","SimSun",serif`;
  ctx.fillStyle = color;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  const totalH = lineHeight * lines.length;
  lines.forEach((line, i) => {
    ctx.fillText(line, canvas.width/2, padding + totalH/2 - totalH/2 + lineHeight*i + lineHeight/2);
  });
  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.LinearFilter;
  const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: texture, depthTest:false, transparent:true }));
  const scale = 0.012;
  sprite.scale.set(canvas.width*scale, canvas.height*scale, 1);
  sprite.userData.canvas = canvas;
  return sprite;
}

function makeLabelPlane(text, { color='#222', fontSize=48, fontWeight='700', bg=null } = {}) {
  const lines = String(text || '').split('\n').filter(l => l.length > 0);
  if (!lines.length) return null;
  const lineHeight = Math.ceil(fontSize*1.3);
  const m = document.createElement('canvas').getContext('2d');
  m.font = `${fontWeight} ${fontSize}px "PingFang SC","Microsoft YaHei",sans-serif`;
  const w = Math.max(1,...lines.map(l => Math.ceil(m.measureText(l).width)));
  const c = document.createElement('canvas');
  c.width = w + 16; c.height = lineHeight*lines.length + 12;
  const g = c.getContext('2d');
  if (bg) { g.fillStyle=bg; g.fillRect(0,0,c.width,c.height); }
  g.font = `${fontWeight} ${fontSize}px "PingFang SC","Microsoft YaHei",sans-serif`;
  g.fillStyle = color; g.textAlign='center'; g.textBaseline='middle';
  const total = lineHeight*lines.length;
  lines.forEach((l,i)=>g.fillText(l, c.width/2, 6 + total/2 - total/2 + lineHeight*i + lineHeight/2));
  const tex = new THREE.CanvasTexture(c); tex.minFilter=THREE.LinearFilter;
  const geo = new THREE.PlaneGeometry(c.width*0.012, c.height*0.012);
  const mat = new THREE.MeshBasicMaterial({ map:tex, transparent:true, depthWrite:false, side:THREE.DoubleSide });
  const mesh = new THREE.Mesh(geo, mat);
  return mesh;
}

export function mountOntology3D(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  if (!window.JICANG_ORTHO || !window.JICANG_TBOX) {
    container.innerHTML = '<div class="p-8 text-center text-gray-500">本体数据尚未加载</div>';
    return;
  }

  const W = container.clientWidth, H = container.clientHeight || 520;

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xf8f4ea); // 宣纸底

  const camera = new THREE.PerspectiveCamera(45, W/H, 0.1, 1000);
  camera.position.set(12, 10, 14);

  const renderer = new THREE.WebGLRenderer({ antialias:true, alpha:true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(W, H);
  container.innerHTML = '';
  container.appendChild(renderer.domElement);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.08;
  controls.target.set(1.5, 3, 4);
  controls.minDistance = 6;
  controls.maxDistance = 36;

  // 光源
  scene.add(new THREE.AmbientLight(0xffffff, 0.85));
  const dir = new THREE.DirectionalLight(0xffffff, 0.6);
  dir.position.set(6,12,8); scene.add(dir);

  // ───────── 构建网格 ─────────
  const grid = window.JICANG_ORTHO;
  const axes = grid.axes;       // 4
  const layers = grid.layers;   // 7 (L6..L0)
  const parts = grid.partitions;// 9

  // 坐标变换：index -> world position（居中）
  const X = i => i - (axes.length-1)/2;        // -1.5..1.5
  const Y = i => i;                            //  0..6 (L6 在 y=0，L0 在 y=6)
  const Z = i => i - (parts.length-1)/2;       // -4..4

  const nodesGroup = new THREE.Group();
  const edgesGroup = new THREE.Group();
  const labelsGroup = new THREE.Group();
  scene.add(nodesGroup, edgesGroup, labelsGroup);

  // 层平面（淡色半透明）
  layers.forEach((ly, li) => {
    const geo = new THREE.PlaneGeometry(axes.length*1.2, parts.length*1.15);
    const mat = new THREE.MeshBasicMaterial({
      color: LAYER_COLORS[li], transparent:true,
      opacity: LAYER_OPACITY_BASE[li], side:THREE.DoubleSide, depthWrite:false
    });
    const plane = new THREE.Mesh(geo, mat);
    plane.rotation.x = -Math.PI/2;
    plane.position.set((axes.length-1)/2, Y(li)-0.01, (parts.length-1)/2);
    edgesGroup.add(plane);
  });

  // 网格线
  const lineMat = new THREE.LineBasicMaterial({ color:0xc9b99a, transparent:true, opacity:0.35 });
  for (let li=0; li<layers.length; li++) {
    for (let ai=0; ai<axes.length; ai++) {
      const pts=[];
      for (let pi=0; pi<parts.length; pi++) pts.push(new THREE.Vector3(X(ai), Y(li), Z(pi)));
      edgesGroup.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), lineMat));
    }
    for (let pi=0; pi<parts.length; pi++) {
      const pts=[];
      for (let ai=0; ai<axes.length; ai++) pts.push(new THREE.Vector3(X(ai), Y(li), Z(pi)));
      edgesGroup.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), lineMat));
    }
  }
  // 垂直柱线（跨层连接同一列）
  const vertMat = new THREE.LineBasicMaterial({ color:0x9a8b6e, transparent:true, opacity:0.25 });
  for (let ai=0; ai<axes.length; ai++) {
    for (let pi=0; pi<parts.length; pi++) {
      const pts=[];
      for (let li=0; li<layers.length; li++) pts.push(new THREE.Vector3(X(ai), Y(li), Z(pi)));
      edgesGroup.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), vertMat));
    }
  }

  // 252 个节点
  const nodes = [];
  const nodeGeo = new THREE.SphereGeometry(0.12, 20, 20);
  axes.forEach((ax, ai) => {
    layers.forEach((ly, li) => {
      parts.forEach((pc, pi) => {
        const active = (grid.grid[pc] && grid.grid[pc][ax]) ? grid.grid[pc][ax][li] === 1 : false;
        const color = PARTITION_COLORS[pc] || 0x999999;
        const mat = new THREE.MeshStandardMaterial({
          color,
          roughness: 0.55,
          metalness: 0.1,
          emissive: active ? color : 0x000000,
          emissiveIntensity: active ? 0.45 : 0.0,
          transparent: true,
          opacity: active ? 0.95 : 0.35
        });
        const sph = new THREE.Mesh(nodeGeo, mat);
        sph.position.set(X(ai), Y(li)+0.08, Z(pi));
        sph.userData = {
          axis: ax, layer: ly, partition: pc,
          active, ai, li, pi,
          baseColor: new THREE.Color(color),
          baseOpacity: active ? 0.95 : 0.35,
          baseEmissive: active ? 0.45 : 0.0
        };
        nodesGroup.add(sph);
        nodes.push(sph);
      });
    });
  });

  // 轴标签（X 轴两端）
  axes.forEach((ax, ai) => {
    const axInfo = window.JICANG_TBOX.axes.find(a => a.id === ax);
    const lbl = makeLabelPlane(axInfo.name, { color:'#3b2b15', fontSize:44 });
    if (lbl) {
      lbl.position.set(X(ai), Y(6)+0.9, Z(-4)-0.8);
      labelsGroup.add(lbl);
    }
    const idLbl = makeLabelPlane(ax, { color:'#8B2500', fontSize:34, fontWeight:'900' });
    if (idLbl) {
      idLbl.position.set(X(ai), Y(6)+0.4, Z(-4)-0.8);
      labelsGroup.add(idLbl);
    }
  });

  // 层标签（Y 轴侧面）
  layers.forEach((ly, li) => {
    const lyInfo = window.JICANG_TBOX.layers.find(l => l.id === ly);
    const lbl = makeLabelPlane(`${ly} ${lyInfo.name}`, { color:'#2a2013', fontSize:36 });
    if (lbl) {
      lbl.position.set(X(-1.5)-1.3, Y(li)+0.1, Z(-4)-0.2);
      labelsGroup.add(lbl);
    }
  });

  // 九类标签（Z 轴顶部）
  const partMap = {};
  (window.JICANG_PARTITIONS||[]).forEach(p => partMap[p.code]=p);
  parts.forEach((pc, pi) => {
    const info = partMap[pc];
    const name = info ? info.name : pc;
    const lbl = makeLabelPlane(name, { color:'#3b2b15', fontSize:38 });
    if (lbl) {
      lbl.position.set(X(-1.5)-1.3, Y(6)+0.3, Z(pi));
      labelsGroup.add(lbl);
    }
  });

  // 坐标指示：中心"集藏"大字
  const centerLbl = makeTextSprite('集藏本体', { color:'#8B2500', fontSize:84, padding:18 });
  if (centerLbl) {
    centerLbl.position.set((axes.length-1)/2, Y(3)+0.1, (parts.length-1)/2);
    centerLbl.scale.set(2.6, 1.2, 1);
    labelsGroup.add(centerLbl);
  }

  // ───────── Tooltip + 悬停拾取 ─────────
  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();
  const tooltip = document.createElement('div');
  Object.assign(tooltip.style, {
    position:'absolute', pointerEvents:'none', zIndex:10,
    background:'rgba(30,20,10,0.88)', color:'#f8f0df',
    padding:'8px 12px', borderRadius:'8px', fontSize:'13px', lineHeight:'1.55',
    fontFamily:'"PingFang SC","Microsoft YaHei",sans-serif',
    boxShadow:'0 4px 14px rgba(0,0,0,0.25)', maxWidth:'260px',
    display:'none', transition:'opacity .15s'
  });
  container.style.position = 'relative';
  container.appendChild(tooltip);

  let hovered = null;
  function onPointerMove(ev){
    const rect = renderer.domElement.getBoundingClientRect();
    pointer.x = ((ev.clientX-rect.left)/rect.width)*2-1;
    pointer.y = -((ev.clientY-rect.top)/rect.height)*2+1;
    raycaster.setFromCamera(pointer, camera);
    const hits = raycaster.intersectObjects(nodes, false);
    if (hits.length) {
      const n = hits[0].object;
      if (hovered !== n) {
        if (hovered) resetNode(hovered);
        hovered = n;
        highlightNode(n, true);
        showTooltip(n, ev.clientX-rect.left, ev.clientY-rect.top);
      } else {
        tooltip.style.left = (ev.clientX-rect.left+14)+'px';
        tooltip.style.top  = (ev.clientY-rect.top+14)+'px';
      }
      renderer.domElement.style.cursor = 'pointer';
    } else {
      if (hovered) { resetNode(hovered); hovered=null; tooltip.style.display='none'; }
      renderer.domElement.style.cursor = 'grab';
    }
  }
  renderer.domElement.addEventListener('pointermove', onPointerMove);
  renderer.domElement.addEventListener('pointerleave', ()=>{
    if (hovered){ resetNode(hovered); hovered=null; tooltip.style.display='none'; }
  });

  function highlightNode(n, primary){
    n.material.emissiveIntensity = primary ? 1.2 : 0.7;
    n.scale.setScalar(primary ? 1.8 : 1.3);
  }
  function resetNode(n){
    n.material.emissiveIntensity = n.userData.baseEmissive;
    n.scale.setScalar(1);
  }
  function showTooltip(n, x, y) {
    const d = n.userData;
    const axInfo = window.JICANG_TBOX.axes.find(a=>a.id===d.axis);
    const lyInfo = window.JICANG_TBOX.layers.find(l=>l.id===d.layer);
    const pcInfo = partMap[d.partition];
    const cellLabel = (grid.layerAxisLabels[d.layer] && grid.layerAxisLabels[d.layer][d.axis]) || '';
    tooltip.innerHTML =
      `<div style="font-weight:700;font-size:14px;color:#ffd59a;margin-bottom:4px">` +
      `${pcInfo?pcInfo.name:d.partition} · ${lyInfo.name} · ${axInfo.name}</div>` +
      `<div style="opacity:.8;margin-bottom:4px">坐标 (${d.axis}, ${d.layer}, ${d.partition}) · ${d.active?'<span style="color:#8ef0a8">专属节点</span>':'<span style="color:#c8c0b0">共享层</span>'}</div>` +
      `<div>${cellLabel||''}</div>`;
    tooltip.style.display = 'block';
    tooltip.style.left = (x+14)+'px';
    tooltip.style.top  = (y+14)+'px';
  }

  // ───────── 控制面板（右上）─────────
  const panel = document.createElement('div');
  panel.innerHTML = `
    <div class="ont3d-panel">
      <div class="ont3d-title">四轴 × 七层 × 九类 = 252 节点</div>
      <div class="ont3d-legend">
        <div class="ont3d-legend-row"><b>轴</b>
          <span data-hl="axis:A1" style="color:#8B2500">A1 文体典要</span>
          <span data-hl="axis:A2" style="color:#B8860B">A2 义理意象</span>
          <span data-hl="axis:A3" style="color:#2F4F4F">A3 人物传承</span>
          <span data-hl="axis:A4" style="color:#5C4033">A4 时代事件</span>
        </div>
        <div class="ont3d-legend-row"><b>层</b>
          <span data-hl="reset" style="color:#666">重置</span>
        </div>
        <div class="ont3d-hint">拖拽旋转 · 滚轮缩放 · 悬停节点查看</div>
      </div>
    </div>
  `;
  Object.assign(panel.style, {
    position:'absolute', top:'12px', right:'12px', zIndex:9,
    background:'rgba(255,252,245,0.92)', backdropFilter:'blur(6px)',
    border:'1px solid rgba(139,37,0,0.18)', borderRadius:'10px',
    padding:'10px 14px', fontSize:'12px', lineHeight:'1.7',
    fontFamily:'"PingFang SC","Microsoft YaHei",sans-serif',
    boxShadow:'0 4px 14px rgba(0,0,0,0.08)', maxWidth:'300px'
  });
  container.appendChild(panel);
  // 注入 panel 样式
  const style = document.createElement('style');
  style.textContent = `
    .ont3d-panel .ont3d-title{font-weight:700;color:#8B2500;font-size:13px;margin-bottom:6px}
    .ont3d-panel .ont3d-legend-row{display:flex;flex-wrap:wrap;gap:6px 10px;align-items:center;margin-top:2px}
    .ont3d-panel .ont3d-legend-row b{color:#6b4a1f;min-width:20px}
    .ont3d-panel [data-hl]{cursor:pointer;padding:1px 6px;border-radius:4px;transition:background .15s}
    .ont3d-panel [data-hl]:hover{background:rgba(139,37,0,0.1)}
    .ont3d-panel .ont3d-hint{margin-top:6px;color:#8a7a5e;font-size:11px}
  `;
  container.appendChild(style);

  // 层按钮动态生成
  const layerRow = panel.querySelector('.ont3d-legend-row:nth-of-type(2)');
  layers.forEach((ly, li) => {
    const info = window.JICANG_TBOX.layers.find(l=>l.id===ly);
    const sp = document.createElement('span');
    sp.textContent = `${ly} ${info.name.replace('层','')}`;
    sp.dataset.hl = `layer:${ly}`;
    sp.style.cursor='pointer';
    sp.style.padding='1px 6px';
    sp.style.borderRadius='4px';
    sp.style.color = '#6b4a1f';
    sp.onmouseover = ()=>sp.style.background='rgba(139,37,0,0.1)';
    sp.onmouseout  = ()=>sp.style.background='transparent';
    sp.onclick = ()=>applyHighlight('layer', ly);
    layerRow.appendChild(sp);
  });

  // 绑定高亮
  function applyHighlight(mode, key){
    nodes.forEach(n=>{
      const d = n.userData;
      let on = true;
      if (mode==='axis') on = (d.axis===key);
      else if (mode==='layer') on = (d.layer===key);
      else if (mode==='partition') on = (d.partition===key);
      if (mode==='reset') on = true;
      if (on) {
        n.material.opacity = d.baseOpacity;
        n.material.emissiveIntensity = d.baseEmissive;
        n.visible = true;
      } else {
        n.material.opacity = 0.08;
        n.material.emissiveIntensity = 0;
      }
    });
  }
  panel.addEventListener('click', (e)=>{
    const t = e.target.closest('[data-hl]');
    if (!t) return;
    const [mode, key] = t.dataset.hl.split(':');
    applyHighlight(mode, key);
  });

  // ───────── 渲染循环 ─────────
  let rafId;
  function animate(){
    rafId = requestAnimationFrame(animate);
    // labels 始终朝向相机
    labelsGroup.children.forEach(ch=>{ ch.quaternion.copy(camera.quaternion); });
    controls.update();
    renderer.render(scene, camera);
  }
  animate();

  function onResize(){
    const w = container.clientWidth, h = container.clientHeight || 520;
    camera.aspect = w/h; camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  }
  window.addEventListener('resize', onResize);

  return {
    scene, camera, renderer, controls, nodes,
    dispose(){
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      container.innerHTML = '';
    }
  };
}

window.JiCangOntology3D = { mount: mountOntology3D };
export { mountOntology3D };
