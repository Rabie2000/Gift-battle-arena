import * as THREE from 'three';
import { CONFIG } from './config.js';
import { Arena } from './arena/Arena.js';
import { Avatar } from './avatars/Avatar.js';
import { ANIMATIONS } from './avatars/animations.js';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0b0620);
scene.fog = new THREE.Fog(0x0b0620, 15, 35);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
document.body.appendChild(renderer.domElement);

const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);

function resize() {
  const w = innerWidth, h = innerHeight, aspect = w / h;
  renderer.setSize(w, h);
  camera.aspect = aspect;
  const k = aspect < 1 ? 1 + (1 - aspect) * 0.9 : 1;
  camera.position.set(0, 9 * k, 11 * k);
  camera.lookAt(0, 0.5, 0);
  camera.updateProjectionMatrix();
}
addEventListener('resize', resize);
resize();

scene.add(new THREE.HemisphereLight(0xffffff, 0x332266, 1.1));
const sun = new THREE.DirectionalLight(0xffffff, 1.2);
sun.position.set(5, 10, 6);
scene.add(sun);

const arena = new Arena(scene, CONFIG);
const avatars = CONFIG.players.map((p, i) => {
  const a = new Avatar(p, i);
  a.group.position.copy(arena.slots[i]);
  a.group.lookAt(0, 0, 0);
  scene.add(a.group);
  return a;
});

// أزرار معاينة مؤقتة للـPhase 1
const bar = document.getElementById('anims');
Object.keys(ANIMATIONS).forEach((name) => {
  const b = document.createElement('button');
  b.textContent = name;
  b.onclick = () => avatars.forEach((a) => a.play(name));
  bar.appendChild(b);
});

const fpsEl = document.getElementById('fps');
let frames = 0, last = performance.now();
const clock = new THREE.Clock();

renderer.setAnimationLoop(() => {
  const t = clock.getElapsedTime();
  arena.update(t);
  avatars.forEach((a) => a.update(t));
  renderer.render(scene, camera);
  frames++;
  const now = performance.now();
  if (now - last >= 1000) { fpsEl.textContent = frames + ' FPS'; frames = 0; last = now; }
});
