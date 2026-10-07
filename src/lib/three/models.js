import * as THREE from "three";

export function createModel(kind = "compact", variant = "original") {
  const group = new THREE.Group();
  const originals = {
    compact: { wall: 0xc8c6bd, floor: 0x767e7b, cabinet: 0x95724e },
    walkin: { wall: 0xe2e0d4, floor: 0x958b79, cabinet: 0xffffff },
    kitchen: { wall: 0xf1eee4, floor: 0x997452, cabinet: 0xf3f1e8 },
  };
  const p = { ...originals[kind] };
  if (variant === "light") {
    p.wall = 0xeeeade;
    p.floor = 0xc5c2b6;
    p.cabinet = 0xeae6d9;
  }
  if (variant === "dark") {
    p.wall = 0x565e5b;
    p.floor = 0x353f3a;
    p.cabinet = kind === "kitchen" ? 0x3c4b46 : 0x8f6a46;
  }
  const mat = (c, roughness = 0.8, metalness = 0) =>
    new THREE.MeshStandardMaterial({ color: c, roughness, metalness });
  const m = {
    wall: mat(p.wall),
    floor: mat(p.floor),
    cabinet: mat(p.cabinet),
    wood: mat(variant === "dark" ? 0x74553d : variant === "light" ? 0xb79a78 : 0x97704b),
    white: mat(0xf8f8f2, 0.22),
    chrome: mat(0xcbd3d5, 0.18, 0.88),
    black: mat(0x202626, 0.3, 0.45),
    grout: mat(0x6f766f),
    mirror: mat(0xacc5c8, 0.08, 0.8),
    warm: new THREE.MeshBasicMaterial({ color: 0xffebbd }),
    fabric: mat(variant === "dark" ? 0xb5b7ad : 0xf2eee4, 0.98),
    plant: mat(0x496a53, 0.95),
    terracotta: mat(0x94765e),
    glass: new THREE.MeshPhysicalMaterial({
      color: 0xcde4dd,
      transparent: true,
      opacity: 0.18,
      roughness: 0.05,
      metalness: 0,
      side: THREE.DoubleSide,
      depthWrite: false,
    }),
  };
  function box(parent, w, h, d, x, y, z, material) {
    const o = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), material);
    o.position.set(x, y, z);
    o.castShadow = true;
    o.receiveShadow = true;
    parent.add(o);
    return o;
  }
  function sphere(parent, r, x, y, z, material, scale = [1, 1, 1]) {
    const o = new THREE.Mesh(new THREE.SphereGeometry(r, 32, 20), material);
    o.position.set(x, y, z);
    o.scale.set(...scale);
    o.castShadow = true;
    parent.add(o);
    return o;
  }
  function cyl(parent, r, h, x, y, z, material, r2 = r) {
    const o = new THREE.Mesh(
      new THREE.CylinderGeometry(r, r2, h, 24),
      material,
    );
    o.position.set(x, y, z);
    o.castShadow = true;
    parent.add(o);
    return o;
  }
  function tube(parent, points, r, material) {
    const c = new THREE.CatmullRomCurve3(
      points.map((q) => new THREE.Vector3(...q)),
    );
    const o = new THREE.Mesh(
      new THREE.TubeGeometry(c, 32, r, 10, false),
      material,
    );
    o.castShadow = true;
    parent.add(o);
    return o;
  }
  function room(w, d, plank = false) {
    box(group, w + 0.16, 0.15, d + 0.16, 0, -0.09, 0, m.grout);
    for (let a = 0; a < (plank ? 8 : 6); a++)
      for (let b = 0; b < (plank ? 7 : 5); b++) {
        const nx = plank ? 8 : 6,
          nz = plank ? 7 : 5,
          tw = w / nx,
          td = d / nz;
        const mm = mat(
          new THREE.Color(p.floor).multiplyScalar(
            0.96 + ((a * 7 + b * 3) % 5) * 0.018,
          ),
        );
        box(
          group,
          tw - 0.012,
          0.035,
          td - 0.012,
          -w / 2 + tw * (a + 0.5),
          0.003,
          -d / 2 + td * (b + 0.5),
          mm,
        );
      }
    const height = 2.35;
    box(group, w, 0.08, 0.11, 0, 0.045, -d / 2, m.wall);
    box(group, 0.11, 0.08, d, -w / 2, 0.045, 0, m.wall);
    // Open front and right walls make the interior visible as a cutaway.
    for (let a = 0; a < 5; a++)
      for (let b = 0; b < 4; b++)
        box(
          group,
          w / 5 - 0.008,
          height / 4 - 0.008,
          0.09,
          -w / 2 + (w / 5) * (a + 0.5),
          (height / 4) * (b + 0.5),
          -d / 2,
          m.wall,
        );
    for (let a = 0; a < 4; a++)
      for (let b = 0; b < 4; b++)
        box(
          group,
          0.09,
          height / 4 - 0.008,
          d / 4 - 0.008,
          -w / 2,
          (height / 4) * (b + 0.5),
          -d / 2 + (d / 4) * (a + 0.5),
          m.wall,
        );
  }
  function faucet(parent, x, y, z, color = m.chrome) {
    cyl(parent, 0.027, 0.17, x, y + 0.085, z, color);
    tube(
      parent,
      [
        [x, y + 0.13, z],
        [x, y + 0.2, z],
        [x, y + 0.22, z + 0.08],
        [x, y + 0.2, z + 0.13],
      ],
      0.023,
      color,
    );
    box(parent, 0.025, 0.014, 0.095, x, y + 0.22, z - 0.01, color);
  }
  function basin(parent, x, y, z, w = 0.78, d = 0.48) {
    const shape = new THREE.Shape();
    shape.moveTo(-w / 2, -d / 2);
    shape.lineTo(w / 2, -d / 2);
    shape.lineTo(w / 2, d / 2);
    shape.lineTo(-w / 2, d / 2);
    shape.closePath();
    const hole = new THREE.Path();
    hole.absellipse(0, 0, w * 0.3, d * 0.31, 0, Math.PI * 2, true);
    shape.holes.push(hole);
    const top = new THREE.Mesh(
      new THREE.ExtrudeGeometry(shape, {
        depth: 0.045,
        bevelEnabled: true,
        bevelSegments: 2,
        steps: 1,
        bevelSize: 0.008,
        bevelThickness: 0.008,
      }),
      m.white,
    );
    top.rotation.x = -Math.PI / 2;
    top.position.set(x, y, z);
    top.castShadow = true;
    parent.add(top);
    const pts = [
      new THREE.Vector2(0, -0.14),
      new THREE.Vector2(0.1, -0.135),
      new THREE.Vector2(0.18, -0.1),
      new THREE.Vector2(0.25, 0),
    ];
    const bowl = new THREE.Mesh(
      new THREE.LatheGeometry(pts, 48),
      new THREE.MeshStandardMaterial({
        color: 0xf4f5ee,
        roughness: 0.18,
        side: THREE.DoubleSide,
      }),
    );
    bowl.scale.set((w * 0.3) / 0.25, 1, (d * 0.31) / 0.25);
    bowl.position.set(x, y, z);
    parent.add(bowl);
    const drain = cyl(parent, 0.025, 0.008, x, y - 0.133, z, m.chrome);
    faucet(parent, x, y + 0.045, z - d * 0.34);
  }
  function vanity(x, z, rotate = 0, wood = true) {
    const g = new THREE.Group();
    g.position.set(x, 0, z);
    g.rotation.y = rotate;
    group.add(g);
    box(g, 0.83, 0.6, 0.46, 0, 0.51, 0, wood ? m.cabinet : m.white);
    box(g, 0.81, 0.02, 0.018, 0, 0.51, 0.24, m.black);
    box(g, 0.58, 0.015, 0.025, 0, 0.69, 0.252, m.black);
    box(g, 0.58, 0.015, 0.025, 0, 0.38, 0.252, m.black);
    basin(g, 0, 0.82, 0, 0.89, 0.51);
    box(g, 0.85, 0.66, 0.035, 0, 1.54, -0.22, m.mirror);
    box(g, 0.87, 0.022, 0.07, 0, 1.89, -0.22, m.chrome);
    return g;
  }
  function shower(x, z, size = 0.98, curved = false) {
    const g = new THREE.Group();
    g.position.set(x, 0, z);
    group.add(g);
    box(g, size, 0.08, size, 0, 0.065, 0, m.white);
    box(g, size, 0.06, 0.04, 0, 0.14, size / 2, m.white);
    box(g, 0.04, 0.06, size, -size / 2, 0.14, 0, m.white);
    box(g, 0.04, 0.06, size, size / 2, 0.14, 0, m.white);
    cyl(g, 0.055, 0.008, 0, 0.11, -0.18, m.chrome);
    if (curved) {
      box(g, size, 0.0 + 1.95, 0.016, 0, 1.1, size / 2, m.glass);
      box(g, 0.016, 1.95, size, size / 2, 1.1, 0, m.glass);
      box(g, 0.028, 1.95, 0.028, size / 2, 1.1, size / 2, m.chrome);
      box(g, size, 0.026, 0.03, 0, 2.08, size / 2, m.chrome);
      box(g, 0.024, 0.27, 0.025, 0.05, 1.18, size / 2 + 0.03, m.chrome);
    } else {
      box(g, 0.018, 1.85, size, -size / 2, 1.07, 0, m.glass);
      box(g, 0.027, 1.88, 0.027, -size / 2, 1.07, size / 2, m.chrome);
    }
    cyl(g, 0.018, 1.45, 0.15, 1.26, -size / 2 + 0.075, m.chrome);
    cyl(g, 0.034, 0.21, 0.15, 0.79, -size / 2 + 0.12, m.black);
    tube(
      g,
      [
        [0.15, 1.9, -size / 2 + 0.075],
        [0.15, 2.05, -size / 2 + 0.075],
        [0.15, 2.08, -0.08],
      ],
      0.018,
      m.chrome,
    );
    const head = cyl(g, 0.115, 0.025, 0.15, 2.05, -0.08, m.chrome);
    tube(
      g,
      [
        [0.15, 0.8, -size / 2 + 0.1],
        [0.38, 0.4, -size / 2 + 0.14],
        [0.28, 1.35, -size / 2 + 0.16],
      ],
      0.012,
      m.chrome,
    );
  }
  function toilet(x, z) {
    const g = new THREE.Group();
    g.position.set(x, 0, z);
    group.add(g);
    const pts = [
      [0.0, 0.18],
      [0.13, 0.2],
      [0.2, 0.28],
      [0.25, 0.45],
      [0.25, 0.48],
    ].map((p) => new THREE.Vector2(...p));
    const b = new THREE.Mesh(new THREE.LatheGeometry(pts, 40), m.white);
    b.scale.z = 1.32;
    b.position.z = 0.08;
    b.castShadow = true;
    g.add(b);
    sphere(g, 0.25, 0, 0.485, 0.08, m.white, [1, 0.09, 1.32]);
    box(g, 0.32, 0.2, 0.06, 0, 0.93, -0.24, m.white);
    const bt = cyl(g, 0.045, 0.014, -0.05, 0.94, -0.202, m.chrome);
    bt.rotation.x = Math.PI / 2;
    const bt2 = cyl(g, 0.033, 0.014, 0.06, 0.94, -0.202, m.chrome);
    bt2.rotation.x = Math.PI / 2;
  }
  function radiator(x, z, angle = 0) {
    const g = new THREE.Group();
    g.position.set(x, 0, z);
    g.rotation.y = angle;
    group.add(g);
    cyl(g, 0.022, 1.47, -0.23, 1.17, 0, m.chrome);
    cyl(g, 0.022, 1.47, 0.23, 1.17, 0, m.chrome);
    for (let i = 0; i < 13; i++) {
      const r = cyl(g, 0.015, 0.46, 0, 0.5 + i * 0.105, 0, m.chrome);
      r.rotation.z = Math.PI / 2;
    }
  }
  function toiletries(parent, x, y, z) {
    for (const [dx, radius, height, color] of [
      [-0.09, 0.028, 0.17, m.white],
      [0.015, 0.022, 0.13, m.black],
      [0.095, 0.033, 0.09, m.terracotta],
    ]) {
      cyl(parent, radius, height, x + dx, y + height / 2, z, color);
      cyl(parent, radius * 0.58, 0.018, x + dx, y + height + 0.009, z, m.chrome);
    }
  }
  function towel(parent, x, y, z, rotation = 0) {
    const g = new THREE.Group();
    g.position.set(x, y, z);
    g.rotation.y = rotation;
    parent.add(g);
    cyl(g, 0.012, 0.47, 0, 0, 0, m.chrome).rotation.z = Math.PI / 2;
    box(g, 0.37, 0.36, 0.027, 0, -0.18, 0.018, m.fabric);
    box(g, 0.37, 0.009, 0.03, 0, -0.35, 0.02, m.white);
  }
  function plant(parent, x, y, z) {
    cyl(parent, 0.085, 0.13, x, y + 0.065, z, m.terracotta, 0.063);
    for (let i = 0; i < 7; i++) {
      const a = i * Math.PI * 2 / 7;
      const leaf = sphere(parent, 0.09, x + Math.cos(a) * 0.07, y + 0.21 + (i % 2) * 0.05, z + Math.sin(a) * 0.07, m.plant, [0.35, 1.35, 0.55]);
      leaf.rotation.z = Math.cos(a) * 0.55;
      leaf.rotation.x = Math.sin(a) * 0.55;
    }
  }
  function bathroomLighting(width, depth) {
    box(group, width * 0.48, 0.018, 0.025, 0, 2.22, -depth / 2 + 0.11, m.warm);
    box(group, 0.018, 0.018, depth * 0.35, -width / 2 + 0.11, 2.22, -0.25, m.warm);
  }
  if (kind === "compact") {
    room(2.85, 2.6);
    bathroomLighting(2.85, 2.6);
    vanity(-1.12, 0.4, Math.PI / 2, true);
    shower(-0.44, -0.7, 0.98, true);
    box(group, 0.48, 0.32, 0.028, -0.46, 1.28, -1.25, m.grout);
    box(group, 0.4, 0.025, 0.12, -0.46, 1.14, -1.19, m.white);
    toiletries(group, -0.47, 1.15, -1.18);
    towel(group, 0.45, 1.33, -1.22);
    box(group, 0.42, 0.035, 0.19, -0.99, 1.98, 0.56, m.wood);
    plant(group, -1.01, 2.0, 0.55);
    const wash = new THREE.Group();
    wash.position.set(0.83, 0, -0.8);
    group.add(wash);
    box(wash, 0.65, 0.86, 0.66, 0, 0.46, 0, m.white);
    const outer = cyl(wash, 0.235, 0.04, 0, 0.42, 0.348, m.chrome);
    outer.rotation.x = Math.PI / 2;
    const inner = cyl(wash, 0.195, 0.052, 0, 0.42, 0.37, m.black);
    inner.rotation.x = Math.PI / 2;
    const glass = cyl(
      wash,
      0.172,
      0.008,
      0,
      0.42,
      0.401,
      new THREE.MeshStandardMaterial({
        color: 0x506b71,
        roughness: 0.13,
        metalness: 0.7,
      }),
    );
    glass.rotation.x = Math.PI / 2;
    box(wash, 0.62, 0.06, 0.012, 0, 0.79, 0.34, m.white);
    const knob = cyl(wash, 0.03, 0.02, 0.13, 0.79, 0.36, m.chrome);
    knob.rotation.x = Math.PI / 2;
    box(wash, 0.15, 0.035, 0.018, -0.18, 0.79, 0.36, m.black);
    box(group, 1.1, 0.04, 0.045, -0.65, 2.05, -1.22, m.chrome);
  } else if (kind === "walkin") {
    room(2.75, 3.15);
    bathroomLighting(2.75, 3.15);
    toilet(-0.79, -1.15);
    shower(0.66, -0.99, 1.1, false);
    vanity(0.99, 0.72, -Math.PI / 2, false);
    radiator(1.24, 0.48, Math.PI / 2);
    box(group, 0.46, 0.36, 0.025, 0.74, 1.28, -1.52, m.grout);
    box(group, 0.42, 0.022, 0.14, 0.74, 1.12, -1.43, m.white);
    toiletries(group, 0.75, 1.14, -1.43);
    towel(group, -1.18, 1.28, 0.45, Math.PI / 2);
    box(group, 0.54, 0.035, 0.24, -0.95, 0.89, 1.22, m.wood);
    plant(group, -0.95, 0.91, 1.22);
    // Window opening is represented by a frame on the back wall.
    box(group, 0.52, 0.8, 0.05, -0.83, 1.75, -1.5, m.black);
    box(group, 0.43, 0.7, 0.022, -0.83, 1.75, -1.46, mat(0xb8d3ca, 0.24));
    box(group, 0.56, 0.04, 0.14, -0.83, 1.35, -1.45, m.white);
  } else {
    room(3.8, 3.4, true);
    const fronts = m.cabinet;
    function cabinet(x, z, rot = 0, oven = false) {
      const g = new THREE.Group();
      g.position.set(x, 0, z);
      g.rotation.y = rot;
      group.add(g);
      box(g, 0.64, 0.79, 0.58, 0, 0.49, 0, fronts);
      box(g, 0.665, 0.045, 0.63, 0, 0.91, 0, m.wood);
      box(g, 0.62, 0.7, 0.025, 0, 0.5, 0.306, oven ? m.black : fronts);
      if (oven) {
        box(g, 0.5, 0.35, 0.014, 0, 0.45, 0.326, m.mirror);
        box(g, 0.48, 0.026, 0.04, 0, 0.69, 0.34, m.chrome);
        box(g, 0.4, 0.015, 0.38, 0, 0.94, 0, m.black);
      } else {
        for (const xx of [-0.25, 0.25])
          box(g, 0.022, 0.65, 0.018, xx, 0.5, 0.325, fronts);
        box(g, 0.53, 0.018, 0.016, 0, 0.2, 0.325, fronts);
        box(g, 0.53, 0.018, 0.016, 0, 0.81, 0.325, fronts);
        box(g, 0.26, 0.016, 0.035, 0, 0.77, 0.35, m.black);
      }
      box(g, 0.55, 0.08, 0.45, 0, 0.055, -0.02, m.black);
      return g;
    }
    for (let i = 0; i < 4; i++) {
      cabinet(-1.39 + i * 0.66, -1.37, 0, i === 2);
      const x = -1.39 + i * 0.66;
      box(group, 0.64, 0.88, 0.33, x, 1.96, -1.5, fronts);
      box(group, 0.58, 0.8, 0.016, x, 1.96, -1.322, fronts);
      box(group, 0.22, 0.012, 0.035, x, 1.62, -1.3, m.black);
    }
    for (let i = 0; i < 3; i++)
      cabinet(-1.57, -0.72 + i * 0.66, Math.PI / 2, false);
    // Backsplash, under-cabinet lights and the appliances make the cutaway legible from every view.
    box(group, 2.8, 0.6, 0.022, -0.3, 1.25, -1.642, m.black);
    box(group, 0.022, 0.6, 1.99, -1.84, 1.25, -0.64, m.black);
    box(group, 2.46, 0.014, 0.016, -0.32, 1.49, -1.3, m.warm);
    box(group, 0.014, 0.014, 1.52, -1.56, 1.49, -0.67, m.warm);
    const sink = new THREE.Group();
    sink.position.set(-1.57, 0, -0.06);
    sink.rotation.y = Math.PI / 2;
    group.add(sink);
    box(sink, 0.5, 0.035, 0.38, 0, 0.945, 0, m.black);
    box(sink, 0.42, 0.006, 0.29, 0, 0.951, 0, mat(0x111d1d, 0.25));
    faucet(sink, 0, 0.96, -0.22, m.black);
    box(sink, 0.22, 0.014, 0.12, 0, 0.96, 0.02, m.chrome);
    cyl(sink, 0.025, 0.008, 0, 0.967, 0.02, m.black);
    box(group, 0.71, 2.29, 0.64, 1.28, 1.18, -1.37, fronts);
    box(group, 0.66, 1.36, 0.025, 1.28, 1.57, -1.032, fronts);
    box(group, 0.66, 0.79, 0.025, 1.28, 0.45, -1.032, fronts);
    box(group, 0.44, 0.02, 0.035, 1.28, 0.84, -1.0, m.black);
    box(group, 0.44, 0.02, 0.035, 1.28, 1.01, -1.0, m.black);
    box(group, 0.49, 0.3, 0.1, -0.66, 1.81, -1.28, m.black);
    box(group, 0.33, 0.19, 0.011, -0.71, 1.81, -1.215, m.mirror);
    // Hob rings and controls on the oven cabinet.
    for (const [x, z] of [[-0.34, -1.48], [-0.07, -1.48], [-0.34, -1.18], [-0.07, -1.18]]) {
      const ring = new THREE.Mesh(new THREE.TorusGeometry(0.09, 0.008, 6, 30), m.chrome);
      ring.rotation.x = -Math.PI / 2;
      ring.position.set(x, 0.951, z);
      group.add(ring);
    }
    for (let i = 0; i < 3; i++) cyl(group, 0.014, 0.012, -0.61 + i * 0.06, 0.94, -1.04, m.black);
    box(group, 0.35, 0.025, 0.2, 0.18, 0.956, -1.38, m.wood);
    cyl(group, 0.065, 0.13, 0.22, 1.035, -1.37, m.white);
    plant(group, -1.53, 0.96, 0.37);
    box(group, 0.59, 0.04, 0.13, 0.43, 1.62, -1.42, m.wood);
    toiletries(group, 0.43, 1.65, -1.43);
  }
  group.userData = { kind, variant };
  return group;
}
