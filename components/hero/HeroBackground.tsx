"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const NODE_COUNT = 120;
const CONNECTION_DISTANCE = 2.2;
const FLOAT_SPEED = 0.00018;

function randomRange(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export function HeroBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // ── Renderer ──────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);

    // ── Scene & Camera ─────────────────────────────────────────
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 100);
    camera.position.z = 7;

    // ── Nodes ──────────────────────────────────────────────────
    type NodeData = {
      mesh: THREE.Mesh;
      velocity: THREE.Vector3;
      phase: number;
    };

    const nodeGeo = new THREE.SphereGeometry(0.04, 8, 8);

    const nodes: NodeData[] = Array.from({ length: NODE_COUNT }, () => {
      const mat = new THREE.MeshBasicMaterial({
        color: new THREE.Color().setHSL(randomRange(0.55, 0.65), 0.9, 0.75),
        transparent: true,
        opacity: randomRange(0.5, 0.95),
      });
      const mesh = new THREE.Mesh(nodeGeo, mat);
      mesh.position.set(
        randomRange(-8, 8),
        randomRange(-5, 5),
        randomRange(-3, 1)
      );
      scene.add(mesh);

      return {
        mesh,
        velocity: new THREE.Vector3(
          randomRange(-0.002, 0.002),
          randomRange(-0.002, 0.002),
          0
        ),
        phase: Math.random() * Math.PI * 2,
      };
    });

    // ── Connection lines ───────────────────────────────────────
    const MAX_LINES = NODE_COUNT * 4;
    const linePositions = new Float32Array(MAX_LINES * 2 * 3);
    const lineColors = new Float32Array(MAX_LINES * 2 * 3);

    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));
    lineGeo.setAttribute("color", new THREE.BufferAttribute(lineColors, 3));

    const lineMat = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const lineSegments = new THREE.LineSegments(lineGeo, lineMat);
    scene.add(lineSegments);

    // ── Mouse parallax ─────────────────────────────────────────
    const mouse = new THREE.Vector2(0, 0);
    const targetCam = new THREE.Vector2(0, 0);

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMouseMove);

    // ── Resize ─────────────────────────────────────────────────
    const resize = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    // ── Animate ────────────────────────────────────────────────
    let rafId: number;
    let t = 0;

    const colorA = new THREE.Color(0x3b82f6); // blue-500
    const colorB = new THREE.Color(0x14b8a6); // teal-500

    const animate = () => {
      rafId = requestAnimationFrame(animate);
      t += FLOAT_SPEED;

      // Smooth camera parallax
      targetCam.x += (mouse.x * 0.6 - targetCam.x) * 0.04;
      targetCam.y += (mouse.y * 0.3 - targetCam.y) * 0.04;
      camera.position.x = targetCam.x;
      camera.position.y = targetCam.y;
      camera.lookAt(scene.position);

      // Move nodes
      nodes.forEach((n, i) => {
        n.mesh.position.x += n.velocity.x + Math.sin(t * 0.8 + n.phase) * 0.0008;
        n.mesh.position.y += n.velocity.y + Math.cos(t * 0.6 + n.phase) * 0.0008;

        // Wrap around edges
        if (n.mesh.position.x > 9) n.mesh.position.x = -9;
        if (n.mesh.position.x < -9) n.mesh.position.x = 9;
        if (n.mesh.position.y > 6) n.mesh.position.y = -6;
        if (n.mesh.position.y < -6) n.mesh.position.y = 6;

        // Pulse opacity
        (n.mesh.material as THREE.MeshBasicMaterial).opacity =
          0.5 + 0.45 * Math.sin(t * 60 + n.phase);

        // Pulse size
        const s = 0.85 + 0.3 * Math.sin(t * 40 + n.phase + i);
        n.mesh.scale.setScalar(s);
      });

      // Build connections
      let lineIdx = 0;
      const pos = lineGeo.attributes.position as THREE.BufferAttribute;
      const col = lineGeo.attributes.color as THREE.BufferAttribute;

      for (let i = 0; i < NODE_COUNT && lineIdx < MAX_LINES; i++) {
        for (let j = i + 1; j < NODE_COUNT && lineIdx < MAX_LINES; j++) {
          const dist = nodes[i].mesh.position.distanceTo(nodes[j].mesh.position);
          if (dist < CONNECTION_DISTANCE) {
            const alpha = 1 - dist / CONNECTION_DISTANCE;
            const lerpColor = colorA.clone().lerp(colorB, (i + j) / (NODE_COUNT * 2));

            const base = lineIdx * 6;
            pos.array[base]     = nodes[i].mesh.position.x;
            pos.array[base + 1] = nodes[i].mesh.position.y;
            pos.array[base + 2] = nodes[i].mesh.position.z;
            pos.array[base + 3] = nodes[j].mesh.position.x;
            pos.array[base + 4] = nodes[j].mesh.position.y;
            pos.array[base + 5] = nodes[j].mesh.position.z;

            col.array[base]     = lerpColor.r * alpha;
            col.array[base + 1] = lerpColor.g * alpha;
            col.array[base + 2] = lerpColor.b * alpha;
            col.array[base + 3] = lerpColor.r * alpha;
            col.array[base + 4] = lerpColor.g * alpha;
            col.array[base + 5] = lerpColor.b * alpha;

            lineIdx++;
          }
        }
      }

      // Zero out unused line slots
      for (let i = lineIdx * 6; i < MAX_LINES * 6; i++) {
        pos.array[i] = 0;
        col.array[i] = 0;
      }

      pos.needsUpdate = true;
      col.needsUpdate = true;
      lineGeo.setDrawRange(0, lineIdx * 2);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMouseMove);
      ro.disconnect();
      renderer.dispose();
      nodeGeo.dispose();
      lineGeo.dispose();
      lineMat.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.55 }}
    />
  );
}
