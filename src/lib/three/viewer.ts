import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { createModel } from "./models.js";
import type { MaterialKey, ModelKey, ViewKey } from "../data/models3d";

export interface ViewerHandle {
  setModel: (key: ModelKey, material: MaterialKey) => void;
  setView: (view: ViewKey) => void;
  zoom: (factor: number) => void;
  rotate: (enabled: boolean) => void;
  destroy: () => void;
}

function disposeObject(object: THREE.Object3D) {
  const geometries = new Set<THREE.BufferGeometry>();
  const materials = new Set<THREE.Material>();
  object.traverse((child) => {
    if (!(child instanceof THREE.Mesh)) return;
    geometries.add(child.geometry);
    const list = Array.isArray(child.material)
      ? child.material
      : [child.material];
    list.forEach((material) => materials.add(material));
  });
  geometries.forEach((geometry) => geometry.dispose());
  materials.forEach((material) => material.dispose());
}

export function createViewer(
  host: HTMLElement,
  onContextLost: () => void,
): ViewerHandle {
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.3;
  renderer.domElement.tabIndex = 0;
  renderer.domElement.setAttribute("role", "application");
  renderer.domElement.setAttribute(
    "aria-label",
    "3D model. Šipkami otočíte pohled, klávesami plus a mínus přiblížíte nebo oddálíte.",
  );
  renderer.domElement.setAttribute("aria-describedby", "viewer-instructions");
  host.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xe6ebe7);
  const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.07;
  controls.target.set(0, 0.8, 0);
  controls.minDistance = 3;
  controls.maxDistance = 13;
  controls.maxPolarAngle = Math.PI * 0.49;
  controls.minPolarAngle = 0.05;
  controls.autoRotateSpeed = 0.8;
  controls.enablePan = false;

  scene.add(new THREE.HemisphereLight(0xffffff, 0x718678, 2.6));
  const light = new THREE.DirectionalLight(0xfff0de, 3.5);
  light.position.set(4, 7, 4);
  light.castShadow = true;
  light.shadow.mapSize.set(2048, 2048);
  Object.assign(light.shadow.camera, {
    left: -5,
    right: 5,
    top: 5,
    bottom: -5,
  });
  light.shadow.normalBias = 0.035;
  scene.add(light);
  const fill = new THREE.DirectionalLight(0xd1e3f0, 1.5);
  fill.position.set(-3, 5, 2);
  scene.add(fill);
  const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(200, 200),
    new THREE.MeshStandardMaterial({ color: 0xe6ebe7, roughness: 1 }),
  );
  floor.rotation.x = -Math.PI / 2;
  floor.position.y = -0.19;
  floor.receiveShadow = true;
  scene.add(floor);

  let model: THREE.Group | null = null;
  let visible = true;
  let destroyed = false;
  let previousTime = 0;

  const resize = () => {
    const { clientWidth: width, clientHeight: height } = host;
    if (!width || !height || destroyed) return;
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  };
  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(host);
  const visibilityObserver = new IntersectionObserver(
    ([entry]) => {
      visible = entry.isIntersecting;
    },
    { rootMargin: "100px" },
  );
  visibilityObserver.observe(host);

  function zoom(factor: number) {
    const offset = camera.position.clone().sub(controls.target);
    const length = THREE.MathUtils.clamp(
      offset.length() * factor,
      controls.minDistance,
      controls.maxDistance,
    );
    camera.position.copy(controls.target).add(offset.setLength(length));
    controls.update();
  }

  const onKey = (event: KeyboardEvent) => {
    if (["+", "=", "-"].includes(event.key)) {
      event.preventDefault();
      zoom(event.key === "-" ? 1.13 : 0.88);
      return;
    }
    if (
      !["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(event.key)
    )
      return;
    event.preventDefault();
    const spherical = new THREE.Spherical().setFromVector3(
      camera.position.clone().sub(controls.target),
    );
    if (event.key === "ArrowLeft") spherical.theta -= 0.12;
    if (event.key === "ArrowRight") spherical.theta += 0.12;
    if (event.key === "ArrowUp") spherical.phi -= 0.1;
    if (event.key === "ArrowDown") spherical.phi += 0.1;
    spherical.phi = THREE.MathUtils.clamp(
      spherical.phi,
      controls.minPolarAngle,
      controls.maxPolarAngle,
    );
    camera.position
      .copy(controls.target)
      .add(new THREE.Vector3().setFromSpherical(spherical));
    controls.update();
  };
  host.addEventListener("keydown", onKey);
  const onLoss = (event: Event) => {
    event.preventDefault();
    renderer.setAnimationLoop(null);
    onContextLost();
  };
  renderer.domElement.addEventListener("webglcontextlost", onLoss);

  const viewer: ViewerHandle = {
    setModel(key, material) {
      if (model) {
        scene.remove(model);
        disposeObject(model);
      }
      model = createModel(key, material);
      scene.add(model);
      host.dataset.renderedModel = key;
      host.dataset.renderedMaterial = material;
    },
    setView(view) {
      controls.autoRotate = false;
      controls.target.set(0, 0.8, 0);
      if (view === "top") {
        camera.position.set(0.001, 9, 0.001);
        controls.target.set(0, 0, 0);
      } else if (view === "front") camera.position.set(0.1, 3.6, 7.7);
      else camera.position.set(4.8, 4.7, 6);
      controls.update();
    },
    zoom,
    rotate(enabled) {
      controls.autoRotate = enabled;
    },
    destroy() {
      if (destroyed) return;
      destroyed = true;
      renderer.setAnimationLoop(null);
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      host.removeEventListener("keydown", onKey);
      renderer.domElement.removeEventListener("webglcontextlost", onLoss);
      controls.dispose();
      disposeObject(scene);
      renderer.dispose();
      renderer.domElement.remove();
    },
  };
  viewer.setView("perspective");
  resize();
  renderer.setAnimationLoop((time) => {
    const delta = previousTime
      ? Math.min((time - previousTime) / 1000, 0.05)
      : 1 / 60;
    previousTime = time;
    if (!visible || document.hidden) return;
    controls.update(delta);
    renderer.render(scene, camera);
  });
  return viewer;
}
