'use client';

import { useEffect, useRef, useCallback } from 'react';
import * as THREE from 'three';

const rippleVertex = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`;

// Lush dark-purple + sakura-pink shader with strong ripples and falling petals
const rippleFragment = `
precision highp float;
uniform float uTime;
uniform vec2 uMouse;
uniform vec2 uResolution;
varying vec2 vUv;

// --- Noise ---
vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
vec2 mod289v2(vec2 x){return x-floor(x*(1.0/289.0))*289.0;}
vec3 permute(vec3 x){return mod289(((x*34.0)+1.0)*x);}
float snoise(vec2 v){
  const vec4 C=vec4(0.211324865405187,0.366025403784439,-0.577350269189626,0.024390243902439);
  vec2 i=floor(v+dot(v,C.yy));vec2 x0=v-i+dot(i,C.xx);
  vec2 i1=(x0.x>x0.y)?vec2(1,0):vec2(0,1);vec4 x12=x0.xyxy+C.xxzz;x12.xy-=i1;
  i=mod289v2(i);
  vec3 p=permute(permute(i.y+vec3(0,i1.y,1))+i.x+vec3(0,i1.x,1));
  vec3 m=max(0.5-vec3(dot(x0,x0),dot(x12.xy,x12.xy),dot(x12.zw,x12.zw)),0.0);
  m=m*m;m=m*m;
  vec3 x3=2.0*fract(p*C.www)-1.0;vec3 h=abs(x3)-0.5;
  vec3 ox=floor(x3+0.5);vec3 a0=x3-ox;
  m*=1.79284291400159-0.85373472095314*(a0*a0+h*h);
  vec3 g;g.x=a0.x*x0.x+h.x*x0.y;g.yz=a0.yz*x12.xz+h.yz*x12.yw;
  return 130.0*dot(m,g);
}

// --- Hash for petal randomness ---
float hash(float n){return fract(sin(n)*43758.5453123);}

// --- Sakura petal shape (soft ellipse) ---
float petal(vec2 p, float size){
  p.x *= 1.4;
  float d = length(p) / size;
  return smoothstep(1.0, 0.6, d);
}

void main(){
  vec2 uv = vUv;
  vec2 aspect = vec2(uResolution.x / uResolution.y, 1.0);

  // ======= MOUSE RIPPLE (strong, visible) =======
  float dist = length((uv - uMouse) * aspect);
  // Multiple concentric ripple rings
  float ripple1 = sin(dist * 25.0 - uTime * 5.0) * exp(-dist * 3.0) * 0.06;
  float ripple2 = sin(dist * 40.0 - uTime * 7.0) * exp(-dist * 5.0) * 0.03;
  float ripple = ripple1 + ripple2;

  // ======= AMBIENT WAVES =======
  float wave1 = snoise(uv * 2.5 + uTime * 0.12) * 0.02;
  float wave2 = snoise(uv * 4.0 - uTime * 0.08 + 3.0) * 0.012;
  float wave3 = snoise(uv * 1.5 + vec2(uTime * 0.05, uTime * 0.03)) * 0.015;

  vec2 distorted = uv + vec2(ripple + wave1 + wave3, ripple + wave2);

  // ======= BACKGROUND: Deep night purple gradient =======
  vec3 deepPurple  = vec3(0.055, 0.035, 0.11);  // #0e0920 — 漆黒紫
  vec3 midPurple   = vec3(0.11, 0.065, 0.17);    // #1c1029 — 暗紫
  vec3 warmPurple  = vec3(0.16, 0.09, 0.22);     // #291838 — 溫紫

  // Vertical gradient with noise variation
  float grad = distorted.y + snoise(distorted * 1.5 + uTime * 0.03) * 0.08;
  vec3 bg = mix(deepPurple, midPurple, smoothstep(0.0, 0.5, grad));
  bg = mix(bg, warmPurple, smoothstep(0.4, 1.0, grad));

  // ======= SAKURA GLOW ORBS (multiple, pulsating) =======
  vec3 sakuraPink   = vec3(1.0, 0.72, 0.83);   // #FFB8D4 — 華麗粉
  vec3 sakuraHot    = vec3(1.0, 0.55, 0.72);    // #FF8CB8 — 濃粉
  vec3 lavender     = vec3(0.65, 0.5, 0.95);    // #A680F2 — 薰衣草
  vec3 deepRose     = vec3(0.8, 0.3, 0.55);     // #CC4D8C — 深玫瑰

  // Large pulsating sakura orbs
  float pulse1 = 0.8 + 0.2 * sin(uTime * 0.6);
  float pulse2 = 0.8 + 0.2 * sin(uTime * 0.8 + 1.5);
  float pulse3 = 0.8 + 0.2 * sin(uTime * 0.5 + 3.0);

  float orb1 = exp(-length((distorted - vec2(0.2, 0.75)) * aspect) * 2.2) * 0.22 * pulse1;
  float orb2 = exp(-length((distorted - vec2(0.8, 0.65)) * aspect) * 2.5) * 0.18 * pulse2;
  float orb3 = exp(-length((distorted - vec2(0.5, 0.2)) * aspect) * 2.0) * 0.15 * pulse3;
  float orb4 = exp(-length((distorted - vec2(0.15, 0.3)) * aspect) * 3.0) * 0.12;
  float orb5 = exp(-length((distorted - vec2(0.85, 0.2)) * aspect) * 3.0) * 0.10;

  bg += sakuraPink * orb1;
  bg += sakuraHot * orb2;
  bg += lavender * orb3;
  bg += deepRose * orb4;
  bg += lavender * orb5;

  // ======= MOUSE GLOW (bright sakura where cursor is) =======
  float mouseGlow = exp(-dist * 4.0) * 0.35;
  float mouseRing = exp(-abs(dist - 0.15) * 20.0) * 0.15; // ring around cursor
  bg += sakuraPink * mouseGlow + sakuraHot * mouseRing;

  // ======= FALLING SAKURA PETALS in shader =======
  for(int i = 0; i < 15; i++){
    float fi = float(i);
    float seed = hash(fi * 127.1);
    float speed = 0.04 + seed * 0.04;
    float startX = hash(fi * 311.7);
    float size = 0.008 + seed * 0.012;

    // Position: fall down, sway horizontally
    float py = fract(-uTime * speed + seed);  // 0→1 top→bottom
    float px = startX + sin(uTime * 0.5 + fi * 2.0) * 0.08 + sin(uTime * 0.3 + fi) * 0.04;

    vec2 petalPos = vec2(px, py);
    vec2 delta = (distorted - petalPos) * aspect;

    // Rotate petal
    float angle = uTime * (0.3 + seed * 0.5) + fi;
    float ca = cos(angle), sa = sin(angle);
    delta = vec2(delta.x * ca - delta.y * sa, delta.x * sa + delta.y * ca);

    float p = petal(delta, size);
    // Fade in/out at top/bottom
    float fade = smoothstep(0.0, 0.1, py) * smoothstep(1.0, 0.85, py);
    // Color: mix between pink variants
    vec3 petalColor = mix(sakuraPink, vec3(1.0, 0.85, 0.92), seed);
    bg += petalColor * p * fade * (0.15 + seed * 0.1);
  }

  // ======= SUBTLE NOISE GRAIN =======
  float grain = snoise(distorted * 10.0 + uTime * 0.04) * 0.015;
  bg += grain;

  // ======= VIGNETTE =======
  float vig = 1.0 - length((uv - 0.5) * 1.3);
  vig = smoothstep(0.0, 0.7, vig);
  bg *= 0.7 + 0.3 * vig;

  gl_FragColor = vec4(bg, 1.0);
}`;

export default function WaterRippleHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const rafRef = useRef<number>(0);

  const handlePointerMove = useCallback((e: PointerEvent) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    mouseRef.current.x = (e.clientX - rect.left) / rect.width;
    mouseRef.current.y = 1.0 - (e.clientY - rect.top) / rect.height;
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: false, alpha: false });
    } catch {
      return;
    }

    const dpr = Math.min(window.devicePixelRatio, 2);
    renderer.setPixelRatio(dpr);
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.domElement.style.display = 'block';
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-0.5, 0.5, 0.5, -0.5, 0.1, 10);
    camera.position.z = 1;

    const uniforms = {
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uResolution: { value: new THREE.Vector2(container.clientWidth * dpr, container.clientHeight * dpr) },
    };

    const material = new THREE.ShaderMaterial({
      vertexShader: rippleVertex,
      fragmentShader: rippleFragment,
      uniforms,
    });

    const plane = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), material);
    scene.add(plane);

    const start = performance.now();
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reducedMotion) {
      // Render a single static frame
      uniforms.uTime.value = 0;
      renderer.render(scene, camera);
    } else {
      const animate = () => {
        uniforms.uTime.value = (performance.now() - start) * 0.001;
        uniforms.uMouse.value.set(mouseRef.current.x, mouseRef.current.y);
        renderer.render(scene, camera);
        rafRef.current = requestAnimationFrame(animate);
      };
      rafRef.current = requestAnimationFrame(animate);
    }

    function onResize() {
      if (!container) return;
      const currentDpr = Math.min(window.devicePixelRatio, 2);
      renderer.setPixelRatio(currentDpr);
      const w = container.clientWidth;
      const h = container.clientHeight;
      renderer.setSize(w, h);
      uniforms.uResolution.value.set(w * currentDpr, h * currentDpr);
    }
    window.addEventListener('resize', onResize);
    container.addEventListener('pointermove', handlePointerMove);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', onResize);
      container.removeEventListener('pointermove', handlePointerMove);
      renderer.dispose();
      material.dispose();
      plane.geometry.dispose();
      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };
  }, [handlePointerMove]);

  return (
    <div ref={containerRef} className="absolute inset-0" style={{ background: '#0e0920' }} />
  );
}
