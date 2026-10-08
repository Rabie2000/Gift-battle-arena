import * as THREE from 'three';

export class Arena {
  constructor(scene, cfg) {
    this.cfg = cfg;
    const floor = new THREE.Mesh(
      new THREE.CylinderGeometry(cfg.arena.radius, cfg.arena.radius, 0.4, 48),
      new THREE.MeshLambertMaterial({ color: 0x1b1446 })
    );
    floor.position.y = -0.2;
    scene.add(floor);

    this.ring = new THREE.Mesh(
      new THREE.TorusGeometry(cfg.arena.radius, 0.12, 8, 64),
      new THREE.MeshBasicMaterial({ color: 0xff3df5 })
    );
    this.ring.rotation.x = Math.PI / 2;
    scene.add(this.ring);

    const n = cfg.players.length;
    this.slots = cfg.players.map((p, i) => {
      const a = (i / n) * Math.PI * 2 + Math.PI / 4;
      const pos = new THREE.Vector3(Math.cos(a) * cfg.arena.slotRadius, 0, Math.sin(a) * cfg.arena.slotRadius);
      const pad = new THREE.Mesh(
        new THREE.CylinderGeometry(0.9, 0.9, 0.06, 32),
        new THREE.MeshBasicMaterial({ color: p.color })
      );
      pad.position.copy(pos);
      pad.position.y = 0.03;
      scene.add(pad);
      return pos;
    });
  }

  update(t) { this.ring.material.color.setHSL((t * 0.1) % 1, 1, 0.6); }
}
