import * as THREE from 'three';
import { createModel } from './models.js';

export interface SplashScene {
  /** Resolves when the room has been "built" (all pieces landed). */
  built: Promise<void>;
  destroy: () => void;
}

const easeOutBack = (t: number) => {
  const c1 = 1.4;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
};
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

/**
 * Loading-screen scene: a bathroom assembles itself piece by piece —
 * floor tiles, then walls, then fittings — while the camera slowly orbits.
 */
export function createSplashScene(host: HTMLElement, duration = 1900): SplashScene {
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'low-power' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.25;
  renderer.setClearColor(0x000000, 0);
  renderer.domElement.setAttribute('aria-hidden', 'true');
  host.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);

  scene.add(new THREE.HemisphereLight(0xffffff, 0x8a9a90, 2.4));
  const sun = new THREE.DirectionalLight(0xfff1df, 3.2);
  sun.position.set(4, 8, 5);
  sun.castShadow = true;
  sun.shadow.mapSize.set(1024, 1024);
  Object.assign(sun.shadow.camera, { left: -4, right: 4, top: 4, bottom: -4 });
  sun.shadow.normalBias = 0.03;
  scene.add(sun);
  const fill = new THREE.DirectionalLight(0xd6e6ef, 1.2);
  fill.position.set(-4, 4, 2);
  scene.add(fill);

  const ground = new THREE.Mesh(new THREE.PlaneGeometry(30, 30), new THREE.ShadowMaterial({ opacity: 0.12 }));
  ground.rotation.x = -Math.PI / 2;
  ground.position.y = -0.17;
  ground.receiveShadow = true;
  scene.add(ground);

  const model = createModel('compact', 'original') as THREE.Group;
  scene.add(model);

  // Every top-level piece gets its own start time: low pieces first, so the room grows from the floor up.
  const pieces = model.children.map((object, index) => ({
    object,
    target: object.position.clone(),
    scale: object.scale.clone(),
    order: object.position.y * 10 + (object.position.x + object.position.z) * 0.6 + index * 0.001
  }));
  pieces.sort((a, b) => a.order - b.order);
  const step = (duration * 0.72) / Math.max(pieces.length, 1);
  const pieceTime = duration * 0.38;
  pieces.forEach((piece, i) => {
    (piece as typeof piece & { start: number }).start = i * step;
    piece.object.position.y = piece.target.y + 1.4;
    piece.object.scale.setScalar(0.0001);
  });

  const resize = () => {
    const { clientWidth: width, clientHeight: height } = host;
    if (!width || !height) return;
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  };
  const observer = new ResizeObserver(resize);
  observer.observe(host);
  resize();

  let startTime = 0;
  let resolveBuilt!: () => void;
  const built = new Promise<void>((resolve) => { resolveBuilt = resolve; });
  let finished = false;
  const target = new THREE.Vector3(0, 0.75, 0);

  renderer.setAnimationLoop((time) => {
    if (!startTime) startTime = time;
    const elapsed = time - startTime;

    for (const piece of pieces as (typeof pieces[number] & { start: number })[]) {
      const t = THREE.MathUtils.clamp((elapsed - piece.start) / pieceTime, 0, 1);
      const drop = easeOutCubic(t);
      piece.object.position.y = piece.target.y + (1 - drop) * 1.4;
      const s = t === 0 ? 0.0001 : easeOutBack(t);
      piece.object.scale.set(piece.scale.x * s, piece.scale.y * s, piece.scale.z * s);
    }

    // Slow orbit around the room; settles into a three-quarter view.
    const orbit = easeOutCubic(Math.min(elapsed / (duration * 1.6), 1));
    const angle = THREE.MathUtils.degToRad(-10 + orbit * 52 + elapsed * 0.004);
    const radius = 7.4 - orbit * 0.8;
    camera.position.set(Math.sin(angle) * radius, 4.1 + (1 - orbit) * 1.2, Math.cos(angle) * radius);
    camera.lookAt(target);
    renderer.render(scene, camera);

    if (!finished && elapsed > duration + pieceTime * 0.4) {
      finished = true;
      resolveBuilt();
    }
  });

  return {
    built,
    destroy() {
      renderer.setAnimationLoop(null);
      observer.disconnect();
      scene.traverse((child) => {
        if (!(child instanceof THREE.Mesh)) return;
        child.geometry.dispose();
        (Array.isArray(child.material) ? child.material : [child.material]).forEach((material) => material.dispose());
      });
      renderer.dispose();
      renderer.domElement.remove();
      resolveBuilt();
    }
  };
}
