// كل animation دالة: (parts, t) => تضبط الأوضاع. أضف حركة جديدة هنا فقط.
const reset = (p) => {
  p.root.position.set(0, 0, 0);
  p.root.rotation.set(0, 0, 0);
  p.root.scale.set(1, 1, 1);
  [p.armL, p.armR, p.legL, p.legR, p.head].forEach((x) => x.rotation.set(0, 0, 0));
};

export const ANIMATIONS = {
  idle(p, t) {
    reset(p);
    p.root.position.y = Math.sin(t * 2) * 0.03;
    p.armL.rotation.x = Math.sin(t * 2) * 0.1;
    p.armR.rotation.x = -Math.sin(t * 2) * 0.1;
  },
  dance(p, t) {
    reset(p);
    const b = Math.sin(t * 8);
    p.root.position.y = Math.abs(b) * 0.25;
    p.root.rotation.y = Math.sin(t * 4) * 0.4;
    p.armL.rotation.z = -2.2 + b * 0.5;
    p.armR.rotation.z = 2.2 + b * 0.5;
    p.legL.rotation.x = b * 0.5;
    p.legR.rotation.x = -b * 0.5;
    p.head.rotation.z = Math.sin(t * 4) * 0.15;
  },
  celebrate(p, t) {
    reset(p);
    p.root.position.y = Math.abs(Math.sin(t * 6)) * 0.6;
    p.root.rotation.y = t * 4;
    p.armL.rotation.z = -2.8;
    p.armR.rotation.z = 2.8;
  },
  power(p, t) {
    reset(p);
    const s = 1.1 + Math.sin(t * 10) * 0.05;
    p.root.scale.set(s, s, s);
    p.root.position.x = Math.sin(t * 40) * 0.04;
    p.legL.rotation.z = -0.3;
    p.legR.rotation.z = 0.3;
    p.armL.rotation.z = -1.6;
    p.armR.rotation.z = 1.6;
    p.head.rotation.x = -0.25;
  },
  defeat(p, t) {
    reset(p);
    p.root.position.y = -0.3;
    p.head.rotation.x = 0.7;
    p.root.rotation.x = 0.15;
    p.armL.rotation.x = 0.3 + Math.sin(t * 1.5) * 0.05;
    p.armR.rotation.x = 0.3 + Math.sin(t * 1.5) * 0.05;
  },
};
