"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { AfterimagePass } from "three/examples/jsm/postprocessing/AfterimagePass.js";
import { OutputPass } from "three/examples/jsm/postprocessing/OutputPass.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const PARTICLE_COUNT = 15000;
const SPARK_COUNT = 2000;
const STAR_COUNT = 7000;
const MORPH_SPEED = 0.03;

function normalise(points: THREE.Vector3[], size: number): THREE.Vector3[] {
  if (points.length === 0) return [];
  const box = new THREE.Box3().setFromPoints(points);
  const maxDim = Math.max(...box.getSize(new THREE.Vector3()).toArray()) || 1;
  const centre = box.getCenter(new THREE.Vector3());
  return points.map((p) => p.clone().sub(centre).multiplyScalar(size / maxDim));
}

function torusKnot(n: number): THREE.Vector3[] {
  const geo = new THREE.TorusKnotGeometry(10, 3, 200, 16, 2, 3);
  const pos = geo.attributes.position;
  const pts: THREE.Vector3[] = [];
  for (let i = 0; i < pos.count; i++) pts.push(new THREE.Vector3().fromBufferAttribute(pos, i));
  const result: THREE.Vector3[] = [];
  for (let i = 0; i < n; i++) result.push(pts[i % pts.length].clone());
  return normalise(result, 50);
}

function halvorsen(n: number): THREE.Vector3[] {
  const pts: THREE.Vector3[] = [];
  let x = 0.1,
    y = 0,
    z = 0;
  const a = 1.89;
  const dt = 0.005;
  for (let i = 0; i < n * 25; i++) {
    const dx = -a * x - 4 * y - 4 * z - y * y;
    const dy = -a * y - 4 * z - 4 * x - z * z;
    const dz = -a * z - 4 * x - 4 * y - x * x;
    x += dx * dt;
    y += dy * dt;
    z += dz * dt;
    if (i > 200 && i % 25 === 0) pts.push(new THREE.Vector3(x, y, z));
    if (pts.length >= n) break;
  }
  while (pts.length < n) pts.push(pts[Math.floor(Math.random() * pts.length)].clone());
  return normalise(pts, 60);
}

function dualHelix(n: number): THREE.Vector3[] {
  const pts: THREE.Vector3[] = [];
  const turns = 5;
  const radius = 15;
  const height = 40;
  for (let i = 0; i < n; i++) {
    const isSecond = i % 2 === 0;
    const angle = (i / n) * Math.PI * 2 * turns;
    const y = (i / n) * height - height / 2;
    const r = radius + (isSecond ? 5 : -5);
    pts.push(new THREE.Vector3(Math.cos(angle) * r, y, Math.sin(angle) * r));
  }
  return normalise(pts, 60);
}

function deJong(n: number): THREE.Vector3[] {
  const pts: THREE.Vector3[] = [];
  let x = 0.1,
    y = 0.1;
  const a = 1.4,
    b = -2.3,
    c = 2.4,
    d = -2.1;
  for (let i = 0; i < n; i++) {
    const xn = Math.sin(a * y) - Math.cos(b * x);
    const yn = Math.sin(c * x) - Math.cos(d * y);
    x = xn;
    y = yn;
    pts.push(new THREE.Vector3(x, y, Math.sin(x * y * 0.5)));
  }
  return normalise(pts, 55);
}

const PATTERNS = [torusKnot, halvorsen, dualHelix, deJong];

export function HeroBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000a14, 0.008);

    const camera = new THREE.PerspectiveCamera(60, innerWidth / innerHeight, 0.1, 2500);
    camera.position.set(0, 0, 80);

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    renderer.setSize(innerWidth, innerHeight);

    const controls = new OrbitControls(camera, canvas);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.screenSpacePanning = false;
    controls.minDistance = 20;
    controls.maxDistance = 200;
    controls.target.set(0, 0, 0);
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.5;

    const starGeo = new THREE.BufferGeometry();
    const starPos = new Float32Array(STAR_COUNT * 3);
    const starCol = new Float32Array(STAR_COUNT * 3);
    const starSize = new Float32Array(STAR_COUNT);
    const starRnd = new Float32Array(STAR_COUNT);
    const R = 900;
    for (let i = 0; i < STAR_COUNT; i++) {
      const i3 = i * 3;
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = R * Math.cbrt(Math.random());
      starPos[i3] = r * Math.sin(phi) * Math.cos(theta);
      starPos[i3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      starPos[i3 + 2] = r * Math.cos(phi);
      const c = new THREE.Color().setHSL(0.52 + Math.random() * 0.06, 0.4 + 0.3 * Math.random(), 0.4 + 0.3 * Math.random());
      starCol[i3] = c.r;
      starCol[i3 + 1] = c.g;
      starCol[i3 + 2] = c.b;
      starSize[i] = 0.25 + Math.pow(Math.random(), 4) * 2.1;
      starRnd[i] = Math.random() * Math.PI * 2;
    }
    starGeo.setAttribute("position", new THREE.BufferAttribute(starPos, 3));
    starGeo.setAttribute("color", new THREE.BufferAttribute(starCol, 3));
    starGeo.setAttribute("size", new THREE.BufferAttribute(starSize, 1));
    starGeo.setAttribute("random", new THREE.BufferAttribute(starRnd, 1));

    const starMat = new THREE.ShaderMaterial({
      uniforms: { time: { value: 0 } },
      vertexShader: `
        attribute float size;
        attribute float random;
        varying vec3 vColor;
        varying float vRnd;
        void main() {
          vColor = color;
          vRnd = random;
          vec4 mv = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = size * (250.0 / -mv.z);
          gl_Position = projectionMatrix * mv;
        }`,
      fragmentShader: `
        uniform float time;
        varying vec3 vColor;
        varying float vRnd;
        void main() {
          vec2 uv = gl_PointCoord - 0.5;
          float d = length(uv);
          float a = 1.0 - smoothstep(0.4, 0.5, d);
          a *= 0.7 + 0.3 * sin(time * (0.6 + vRnd * 0.3) + vRnd * 5.0);
          if (a < 0.02) discard;
          gl_FragColor = vec4(vColor, a);
        }`,
      transparent: true,
      depthWrite: false,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
    });
    const stars = new THREE.Points(starGeo, starMat);
    scene.add(stars);

    const palette = [
      new THREE.Color(0x00d4ff),
      new THREE.Color(0x00d4ff),
      new THREE.Color(0x00d4ff),
      new THREE.Color(0x0077cc),
      new THREE.Color(0x0077cc),
      new THREE.Color(0x3b82f6),
    ];

    function makeParticles(count: number, pal: THREE.Color[]) {
      const geo = new THREE.BufferGeometry();
      const pos = new Float32Array(count * 3);
      const col = new Float32Array(count * 3);
      const size = new Float32Array(count);
      const rnd = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        const base = pal[Math.floor(Math.random() * pal.length)];
        const hsl: THREE.HSL = { h: 0, s: 0, l: 0 };
        base.getHSL(hsl);
        hsl.s = Math.min(1, Math.max(0.75, hsl.s + (Math.random() - 0.5) * 0.1));
        hsl.l = Math.min(0.75, Math.max(0.45, hsl.l + (Math.random() - 0.5) * 0.15));
        const c = new THREE.Color().setHSL(hsl.h, hsl.s, hsl.l);
        col[i3] = c.r;
        col[i3 + 1] = c.g;
        col[i3 + 2] = c.b;
        size[i] = 0.7 + Math.random() * 1.1;
        rnd[i3] = Math.random() * 10;
        rnd[i3 + 1] = Math.random() * Math.PI * 2;
        rnd[i3 + 2] = 0.5 + 0.5 * Math.random();
      }
      geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
      geo.setAttribute("color", new THREE.BufferAttribute(col, 3));
      geo.setAttribute("size", new THREE.BufferAttribute(size, 1));
      geo.setAttribute("random", new THREE.BufferAttribute(rnd, 3));

      const mat = new THREE.ShaderMaterial({
        uniforms: { time: { value: 0 } },
        vertexShader: `
          uniform float time;
          attribute float size;
          attribute vec3 random;
          varying vec3 vCol;
          varying float vR;
          void main() {
            vCol = color;
            vR = random.z;
            vec3 p = position;
            float t = time * 0.25 * random.z;
            float ax = t + random.y;
            float ay = t * 0.75 + random.x;
            float amp = (0.6 + sin(random.x + t * 0.6) * 0.3) * random.z;
            p.x += sin(ax + p.y * 0.06 + random.x * 0.1) * amp;
            p.y += cos(ay + p.z * 0.06 + random.y * 0.1) * amp;
            p.z += sin(ax * 0.85 + p.x * 0.06 + random.z * 0.1) * amp;
            vec4 mv = modelViewMatrix * vec4(p, 1.0);
            float pulse = 0.9 + 0.1 * sin(time * 1.15 + random.y);
            gl_PointSize = size * pulse * (350.0 / -mv.z);
            gl_Position = projectionMatrix * mv;
          }`,
        fragmentShader: `
          uniform float time;
                    varying vec3 vCol;
          varying float vR;
          void main() {
            vec2 uv = gl_PointCoord - 0.5;
            float d = length(uv);
            float core = smoothstep(0.05, 0.0, d);
            float angle = atan(uv.y, uv.x);
            float flare = pow(max(0.0, sin(angle * 6.0 + time * 2.0 * vR)), 4.0);
            flare *= smoothstep(0.5, 0.0, d);
            float glow = smoothstep(0.4, 0.1, d);
            float alpha = core * 1.0 + flare * 0.5 + glow * 0.2;
            vec3 finalColor = mix(vCol, vec3(0.85, 0.95, 1.0), core);
            finalColor = mix(finalColor, vCol, flare * 0.5 + glow * 0.5);
            if (alpha < 0.01) discard;
            gl_FragColor = vec4(finalColor, alpha);
          }`,
        transparent: true,
        depthWrite: false,
        vertexColors: true,
        blending: THREE.AdditiveBlending,
      });
      return new THREE.Points(geo, mat);
    }

    const particles = makeParticles(PARTICLE_COUNT, palette);
    scene.add(particles);

    const sparkGeo = new THREE.BufferGeometry();
    const sparkPos = new Float32Array(SPARK_COUNT * 3);
    const sparkSize = new Float32Array(SPARK_COUNT);
    const sparkRnd = new Float32Array(SPARK_COUNT * 3);
    for (let i = 0; i < SPARK_COUNT; i++) {
      sparkSize[i] = 0.5 + Math.random() * 0.8;
      sparkRnd[i * 3] = Math.random() * 10;
      sparkRnd[i * 3 + 1] = Math.random() * Math.PI * 2;
      sparkRnd[i * 3 + 2] = 0.5 + 0.5 * Math.random();
    }
    sparkGeo.setAttribute("position", new THREE.BufferAttribute(sparkPos, 3));
    sparkGeo.setAttribute("size", new THREE.BufferAttribute(sparkSize, 1));
    sparkGeo.setAttribute("random", new THREE.BufferAttribute(sparkRnd, 3));

    const sparkMat = new THREE.ShaderMaterial({
      uniforms: { time: { value: 0 } },
      vertexShader: `
        uniform float time;
        attribute float size;
        attribute vec3 random;
        void main() {
          vec3 p = position;
          float t = time * 0.25 * random.z;
          float ax = t + random.y, ay = t * 0.75 + random.x;
          float amp = (0.6 + sin(random.x + t * 0.6) * 0.3) * random.z;
          p.x += sin(ax + p.y * 0.06 + random.x * 0.1) * amp;
          p.y += cos(ay + p.z * 0.06 + random.y * 0.1) * amp;
          p.z += sin(ax * 0.85 + p.x * 0.06 + random.z * 0.1) * amp;
          vec4 mv = modelViewMatrix * vec4(p, 1.0);
          gl_PointSize = size * (300.0 / -mv.z);
          gl_Position = projectionMatrix * mv;
        }`,
      fragmentShader: `
        void main() {
          float d = length(gl_PointCoord - vec2(0.5));
          float a = 1.0 - smoothstep(0.4, 0.5, d);
          if (a < 0.01) discard;
          gl_FragColor = vec4(1.0, 1.0, 1.0, a);
        }`,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const sparkles = new THREE.Points(sparkGeo, sparkMat);
    scene.add(sparkles);

    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));
    composer.addPass(new UnrealBloomPass(new THREE.Vector2(innerWidth, innerHeight), 0.35, 0.4, 0.85));
    const after = new AfterimagePass();
    after.uniforms.damp.value = 0.85;
    composer.addPass(after);
    composer.addPass(new OutputPass());

    function applyPattern(idx: number) {
      const pts = PATTERNS[idx](PARTICLE_COUNT);
      const pArr = particles.geometry.attributes.position.array as Float32Array;
      const sArr = sparkles.geometry.attributes.position.array as Float32Array;
      for (let j = 0; j < PARTICLE_COUNT; j++) {
        const i3 = j * 3;
        const p = pts[j] || new THREE.Vector3();
        pArr[i3] = p.x;
        pArr[i3 + 1] = p.y;
        pArr[i3 + 2] = p.z;
        if (j < SPARK_COUNT) {
          sArr[i3] = p.x;
          sArr[i3 + 1] = p.y;
          sArr[i3 + 2] = p.z;
        }
      }
      particles.geometry.attributes.position.needsUpdate = true;
      sparkles.geometry.attributes.position.needsUpdate = true;
    }

    let currentPattern = 0;
    let isTrans = false;
    let prog = 0;
    let lastMorph = 0;
    const morphInterval = 8;

    applyPattern(currentPattern);

    function beginMorph() {
      isTrans = true;
      prog = 0;
      const next = (currentPattern + 1) % PATTERNS.length;
      const fromPts = (particles.geometry.attributes.position.array as Float32Array).slice();
      const toPts = PATTERNS[next](PARTICLE_COUNT);
      const to = new Float32Array(PARTICLE_COUNT * 3);
      for (let j = 0; j < PARTICLE_COUNT; j++) {
        const i3 = j * 3;
        const p = toPts[j];
        to[i3] = p.x;
        to[i3 + 1] = p.y;
        to[i3 + 2] = p.z;
      }
      particles.userData = { from: fromPts, to, next };
      sparkles.userData = { from: fromPts, to, next };
    }

    const clock = new THREE.Clock();
    let raf: number;
    let visible = true;
    const onVis = () => {
      visible = document.visibilityState === "visible";
    };
    document.addEventListener("visibilitychange", onVis);

    function animate() {
      raf = requestAnimationFrame(animate);
      if (!visible) return;
      const dt = clock.getDelta();
      const t = clock.getElapsedTime();

      controls.update();
      particles.material.uniforms.time.value = t;
      sparkles.material.uniforms.time.value = t;
      starMat.uniforms.time.value = t;

      if (t - lastMorph > morphInterval) {
        lastMorph = t;
        if (!isTrans) beginMorph();
      }

      if (isTrans) {
        prog += MORPH_SPEED;
        const eased = prog >= 1 ? 1 : 1 - Math.pow(1 - prog, 3);
        const { from, to } = particles.userData;
        if (to) {
          const pArr = particles.geometry.attributes.position.array as Float32Array;
          const sArr = sparkles.geometry.attributes.position.array as Float32Array;
          for (let i = 0; i < pArr.length; i++) {
            const val = from[i] + (to[i] - from[i]) * eased;
            pArr[i] = val;
            if (i < sArr.length) sArr[i] = val;
          }
          particles.geometry.attributes.position.needsUpdate = true;
          sparkles.geometry.attributes.position.needsUpdate = true;
        }
        if (prog >= 1) {
          currentPattern = particles.userData.next;
          isTrans = false;
        }
      }

      composer.render(dt);
    }

    animate();

    const handleResize = () => {
      camera.aspect = innerWidth / innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(innerWidth, innerHeight);
      composer.setSize(innerWidth, innerHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", onVis);
      controls.dispose();
      renderer.dispose();
      composer.dispose();
      starGeo.dispose();
      sparkGeo.dispose();
      starMat.dispose();
      sparkMat.dispose();
      particles.geometry.dispose();
      (particles.material as THREE.Material).dispose();
      (sparkles.material as THREE.Material).dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-auto"
      style={{ opacity: 1 }}
    />
  );
}
