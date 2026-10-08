import * as THREE from 'three';
import { ANIMATIONS } from './animations.js';

const box = (w, h, d, color, y = 0, x = 0) => {
  const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), new THREE.MeshLambertMaterial({ color }));
  m.position.set(x, y, 0);
  return m;
};
const limb = (w, h, color, x, y) => {
  const pivot = new THREE.Group();
  pivot.position.set(x, y, 0);
  pivot.add(box(w, h, w, color, -h / 2));
  return pivot;
};

export class Avatar {
  constructor({ name, color, accent, style }, index) {
    this.name = name;
    this.current = 'dance';
    this.offset = index * 0.7;

    this.group = new THREE.Group();
    const root = new THREE.Group();
    this.group.add(root);

    root.add(box(0.9, 0.8, 0.5, color, 1.0)); // torso
    const head = new THREE.Group();
    head.position.y = 1.75;
    head.add(box(0.65, 0.65, 0.65, 0xffd7a8));
    head.add(box(0.1, 0.12, 0.05, 0x222222, 0.05, -0.15).translateZ(0.33));
    head.add(box(0.1, 0.12, 0.05, 0x222222, 0.05, 0.15).translateZ(0.33));
    head.add(box(0.2, 0.05, 0.05, 0xd9485f, -0.15, 0).translateZ(0.33));
    this.addAccessory(head, style, accent);
    root.add(head);

    const armL = limb(0.26, 0.75, color, -0.64, 1.35);
    const armR = limb(0.26, 0.75, color, 0.64, 1.35);
    const legL = limb(0.34, 0.6, accent, -0.2, 0.6);
    const legR = limb(0.34, 0.6, accent, 0.2, 0.6);
    root.add(armL, armR, legL, legR);

    this.parts = { root, head, armL, armR, legL, legR };
  }

  addAccessory(head, style, accent) {
    if (style === 0) head.add(box(0.7, 0.2, 0.7, accent, 0.42));
    if (style === 1) { head.add(box(0.2, 0.25, 0.2, accent, 0.45, -0.25)); head.add(box(0.2, 0.25, 0.2, accent, 0.45, 0.25)); }
    if (style === 2) head.add(box(0.2, 0.4, 0.2, accent, 0.5));
    if (style === 3) { head.add(box(0.75, 0.12, 0.75, accent, 0.38)); head.add(box(0.4, 0.1, 0.4, accent, 0.48)); }
  }

  play(name) { if (ANIMATIONS[name]) this.current = name; }
  update(t) { ANIMATIONS[this.current](this.parts, t + this.offset); }
}
