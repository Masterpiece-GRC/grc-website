"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

const VERT = `
attribute vec2 a_pos;
void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }
`;

// Kinetic purple structure, fine lines and slow depth: intelligence and assurance.
const FRAG = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif
uniform vec2 u_res;
uniform float u_time;
uniform float u_intensity;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
             mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 5; i++) {
    v += a * noise(p);
    p *= 2.02;
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_res.xy;
  vec2 p = (gl_FragCoord.xy - 0.5 * u_res.xy) / u_res.y;

  float t = u_time * 0.045;

  // Brand base: true black opening into deep signature purple.
  vec3 purple = vec3(0.216, 0.0, 0.459);
  vec3 ink = vec3(0.0);
  vec3 col = mix(ink, purple * 0.46, smoothstep(-0.65, 0.8, p.y + 0.18));

  // Slow purple depth field.
  float field = fbm(p * 1.7 + vec2(t, -t * 0.7));
  float field2 = fbm(p * 3.1 - vec2(t * 0.6, t * 0.35));
  vec3 violet = vec3(0.384, 0.0, 0.592);
  vec3 violetGlow = vec3(0.58, 0.08, 0.82);
  col += violet * pow(field, 2.0) * 0.86 * u_intensity;
  col += violetGlow * pow(field2, 3.4) * 0.48 * u_intensity;

  // Structured line lattice: assurance / control motif.
  float warp = fbm(p * 1.2 + t * 0.8) * 0.35;
  float lines = abs(sin((p.x * 9.0 + warp * 6.0) + t * 1.4));
  lines = pow(1.0 - lines, 34.0);
  float rows = abs(sin((p.y * 16.0 - warp * 4.0) - t * 0.9));
  rows = pow(1.0 - rows, 60.0);
  col += violetGlow * lines * 0.32 * u_intensity;
  col += vec3(0.992, 0.73, 0.192) * rows * 0.08 * u_intensity;

  // Champagne gold: a single restrained diagonal light sweep.
  float sweep = smoothstep(0.985, 1.0, sin((p.x * 0.7 - p.y * 1.5) + t * 1.1));
  col += vec3(0.992, 0.73, 0.192) * sweep * 0.44 * u_intensity;

  // Corner luminance for depth, then vignette to hold text contrast.
  float glow = exp(-length(p - vec2(0.55, 0.42)) * 1.9);
  col += violetGlow * glow * 0.24 * u_intensity;
  float vig = smoothstep(1.5, 0.25, length(p * vec2(0.85, 1.15)));
  col *= mix(0.82, 1.06, vig);

  // Fine grain to avoid banding on large dark fields.
  col += (hash(gl_FragCoord.xy + u_time) - 0.5) * 0.012;

  // Fade the effect out at the bottom edge so content sections meet cleanly.
  float edge = smoothstep(0.0, 0.18, uv.y);
  col = mix(ink, col, mix(0.55, 1.0, edge));

  gl_FragColor = vec4(col, 1.0);
}
`;

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const sh = gl.createShader(type);
  if (!sh) return null;
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    gl.deleteShader(sh);
    return null;
  }
  return sh;
}

type Props = {
  /** 0–1: how present the shader detail is. Hero sections use 1. */
  intensity?: number;
  className?: string;
};

/**
 * Lightweight WebGL backdrop (no external 3D library).
 * Pauses when offscreen and draws a single static frame when the visitor
 * prefers reduced motion.
 */
export function WebGLBackdrop({ intensity = 1, className }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const intensityRef = useRef(intensity);

  // Keep the latest intensity without re-initialising WebGL.
  useEffect(() => {
    intensityRef.current = intensity;
  }, [intensity]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl =
      (canvas.getContext("webgl", {
        antialias: false,
        alpha: false,
        powerPreference: "low-power",
      }) as WebGLRenderingContext | null) ??
      (canvas.getContext("experimental-webgl") as WebGLRenderingContext | null);
    if (!gl) {
      canvas.dataset.fallback = "true";
      return;
    }

    const vs = compile(gl, gl.VERTEX_SHADER, VERT);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
    const program = gl.createProgram();
    if (!vs || !fs || !program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      canvas.dataset.fallback = "true";
      return;
    }
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW,
    );
    const loc = gl.getAttribLocation(program, "a_pos");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(program, "u_res");
    const uTime = gl.getUniformLocation(program, "u_time");
    const uIntensity = gl.getUniformLocation(program, "u_intensity");

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let raf = 0;
    let visible = true;
    const start = performance.now();

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const w = Math.max(1, Math.floor(canvas.clientWidth * dpr));
      const h = Math.max(1, Math.floor(canvas.clientHeight * dpr));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
      gl.uniform2f(uRes, canvas.width, canvas.height);
    };

    const draw = (time: number) => {
      resize();
      gl.uniform1f(uIntensity, intensityRef.current);
      gl.uniform1f(uTime, time);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    const loop = () => {
      if (!visible) return;
      draw((performance.now() - start) / 1000);
      raf = requestAnimationFrame(loop);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        // Destructuring `([entry]) => ...` types `entry` as
        // `IntersectionObserverEntry | undefined` — TypeScript has no way to
        // know from the array type alone that this callback always receives
        // at least one entry, even though in practice it does. Indexing and
        // guarding explicitly says what's actually true instead of asserting
        // past the type error.
        visible = entries[0]?.isIntersecting ?? false;
        cancelAnimationFrame(raf);
        if (visible && !reduced) raf = requestAnimationFrame(loop);
      },
      { threshold: 0 },
    );
    observer.observe(canvas);

    const onResize = () =>
      draw(reduced ? 12 : (performance.now() - start) / 1000);
    window.addEventListener("resize", onResize);

    const onContextLost = (e: Event) => {
      e.preventDefault();
      cancelAnimationFrame(raf);
    };
    canvas.addEventListener("webglcontextlost", onContextLost);

    if (reduced) draw(12);
    else raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      window.removeEventListener("resize", onResize);
      canvas.removeEventListener("webglcontextlost", onContextLost);

      // Free GPU resources without killing the context, so React Strict Mode's
      // second effect run (dev) can still get a working context.
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={cn("absolute inset-0 h-full w-full", className)}
    />
  );
}