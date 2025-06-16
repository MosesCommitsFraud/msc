"use client";

import { useRef, useState, useEffect } from "react";
import { Canvas, useFrame, useThree, ThreeEvent } from "@react-three/fiber";
import { EffectComposer, wrapEffect } from "@react-three/postprocessing";
import { Effect } from "postprocessing";
import * as THREE from "three";

const waveVertexShader = `
precision highp float;
varying vec2 vUv;
void main() {
  vUv = uv;
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);
  vec4 viewPosition = viewMatrix * modelPosition;
  gl_Position = projectionMatrix * viewPosition;
}
`;

const waveFragmentShader = `
precision highp float;
uniform vec2 resolution;
uniform float time;
uniform float waveSpeed;
uniform float waveFrequency;
uniform float waveAmplitude;
uniform vec3 waveColor;
uniform vec2 mousePos;
uniform int enableMouseInteraction;
uniform float mouseRadius;

vec4 mod289(vec4 x) { return x - floor(x * (1.0/289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
vec2 fade(vec2 t) { return t*t*t*(t*(t*6.0-15.0)+10.0); }

float cnoise(vec2 P) {
  vec4 Pi = floor(P.xyxy) + vec4(0.0,0.0,1.0,1.0);
  vec4 Pf = fract(P.xyxy) - vec4(0.0,0.0,1.0,1.0);
  Pi = mod289(Pi);
  vec4 ix = Pi.xzxz;
  vec4 iy = Pi.yyww;
  vec4 fx = Pf.xzxz;
  vec4 fy = Pf.yyww;
  vec4 i = permute(permute(ix) + iy);
  vec4 gx = fract(i * (1.0/41.0)) * 2.0 - 1.0;
  vec4 gy = abs(gx) - 0.5;
  vec4 tx = floor(gx + 0.5);
  gx = gx - tx;
  vec2 g00 = vec2(gx.x, gy.x);
  vec2 g10 = vec2(gx.y, gy.y);
  vec2 g01 = vec2(gx.z, gy.z);
  vec2 g11 = vec2(gx.w, gy.w);
  vec4 norm = taylorInvSqrt(vec4(dot(g00,g00), dot(g01,g01), dot(g10,g10), dot(g11,g11)));
  g00 *= norm.x; g01 *= norm.y; g10 *= norm.z; g11 *= norm.w;
  float n00 = dot(g00, vec2(fx.x, fy.x));
  float n10 = dot(g10, vec2(fx.y, fy.y));
  float n01 = dot(g01, vec2(fx.z, fy.z));
  float n11 = dot(g11, vec2(fx.w, fy.w));
  vec2 fade_xy = fade(Pf.xy);
  vec2 n_x = mix(vec2(n00, n01), vec2(n10, n11), fade_xy.x);
  return 2.3 * mix(n_x.x, n_x.y, fade_xy.y);
}

const int OCTAVES = 8;
float fbm(vec2 p) {
  float value = 0.0;
  float amp = 1.0;
  float freq = waveFrequency;
  for (int i = 0; i < OCTAVES; i++) {
    value += amp * abs(cnoise(p));
    p *= freq;
    amp *= waveAmplitude;
  }
  return value;
}

float pattern(vec2 p) {
  vec2 p2 = p - time * waveSpeed;
  return fbm(p - fbm(p + fbm(p2)));
}

// Rounded rectangle distance function
float roundedRectSDF(vec2 p, vec2 center, vec2 size, float radius) {
  vec2 d = abs(p - center) - size + radius;
  return length(max(d, 0.0)) + min(max(d.x, d.y), 0.0) - radius;
}

void main() {
  vec2 uv = gl_FragCoord.xy / resolution.xy;
  vec2 centeredUv = uv - 0.5;
  centeredUv.x *= resolution.x / resolution.y;
  
  float f = pattern(centeredUv);
  
  if (enableMouseInteraction == 1) {
    vec2 mouseNDC = (mousePos / resolution - 0.5) * vec2(1.0, -1.0);
    mouseNDC.x *= resolution.x / resolution.y;
    float dist = length(centeredUv - mouseNDC);
    float effect = 1.0 - smoothstep(0.0, mouseRadius, dist);
    f -= 0.5 * effect;
  }
  

  
  // Use #1a1a1a background color (26/255 ≈ 0.102) instead of pure black
  vec3 backgroundColor = vec3(0.102);
  vec3 col = mix(backgroundColor, waveColor, f);
  
  // Force grayscale output to prevent color profile artifacts
  float gray = dot(col, vec3(0.299, 0.587, 0.114)); // Standard luminance calculation
  gl_FragColor = vec4(vec3(gray), 1.0);
}
`;

const ditherFragmentShader = `
precision highp float;
uniform float colorNum;
uniform float pixelSize;
const float bayerMatrix8x8[64] = float[64](
  0.0/64.0, 48.0/64.0, 12.0/64.0, 60.0/64.0,  3.0/64.0, 51.0/64.0, 15.0/64.0, 63.0/64.0,
  32.0/64.0,16.0/64.0, 44.0/64.0, 28.0/64.0, 35.0/64.0,19.0/64.0, 47.0/64.0, 31.0/64.0,
  8.0/64.0, 56.0/64.0,  4.0/64.0, 52.0/64.0, 11.0/64.0,59.0/64.0,  7.0/64.0, 55.0/64.0,
  40.0/64.0,24.0/64.0, 36.0/64.0, 20.0/64.0, 43.0/64.0,27.0/64.0, 39.0/64.0, 23.0/64.0,
  2.0/64.0, 50.0/64.0, 14.0/64.0, 62.0/64.0,  1.0/64.0,49.0/64.0, 13.0/64.0, 61.0/64.0,
  34.0/64.0,18.0/64.0, 46.0/64.0, 30.0/64.0, 33.0/64.0,17.0/64.0, 45.0/64.0, 29.0/64.0,
  10.0/64.0,58.0/64.0,  6.0/64.0, 54.0/64.0,  9.0/64.0,57.0/64.0,  5.0/64.0, 53.0/64.0,
  42.0/64.0,26.0/64.0, 38.0/64.0, 22.0/64.0, 41.0/64.0,25.0/64.0, 37.0/64.0, 21.0/64.0
);

vec3 dither(vec2 uv, vec3 color) {
  vec2 scaledCoord = floor(uv * resolution / pixelSize);
  int x = int(mod(scaledCoord.x, 8.0));
  int y = int(mod(scaledCoord.y, 8.0));
  float threshold = bayerMatrix8x8[y * 8 + x] - 0.25;
  float step = 1.0 / (colorNum - 1.0);
  color += threshold * step;
  float bias = 0.2;
  color = clamp(color - bias, 0.0, 1.0);
  return floor(color * (colorNum - 1.0) + 0.5) / (colorNum - 1.0);
}

void mainImage(in vec4 inputColor, in vec2 uv, out vec4 outputColor) {
  vec2 normalizedPixelSize = pixelSize / resolution;
  vec2 uvPixel = normalizedPixelSize * floor(uv / normalizedPixelSize);
  vec4 color = texture2D(inputBuffer, uvPixel);
  color.rgb = dither(uv, color.rgb);
  outputColor = color;
}
`;

class RetroEffectImpl extends Effect {
  public uniforms: Map<string, THREE.Uniform<any>>;
  constructor() {
    const uniforms = new Map<string, THREE.Uniform<any>>([
      ["colorNum", new THREE.Uniform(4.0)],
      ["pixelSize", new THREE.Uniform(2.0)],
    ]);
    super("RetroEffect", ditherFragmentShader, { uniforms });
    this.uniforms = uniforms;
  }
  set colorNum(value: number) {
    this.uniforms.get("colorNum")!.value = value;
  }
  get colorNum(): number {
    return this.uniforms.get("colorNum")!.value;
  }
  set pixelSize(value: number) {
    this.uniforms.get("pixelSize")!.value = value;
  }
  get pixelSize(): number {
    return this.uniforms.get("pixelSize")!.value;
  }
}

import { forwardRef } from "react";

const RetroEffect = forwardRef<
  RetroEffectImpl,
  { colorNum: number; pixelSize: number }
>((props, ref) => {
  const { colorNum, pixelSize } = props;
  const WrappedRetroEffect = wrapEffect(RetroEffectImpl);
  return (
    <WrappedRetroEffect ref={ref} colorNum={colorNum} pixelSize={pixelSize} />
  );
});

RetroEffect.displayName = "RetroEffect";

interface WaveUniforms {
  [key: string]: THREE.Uniform<any>;
  time: THREE.Uniform<number>;
  resolution: THREE.Uniform<THREE.Vector2>;
  waveSpeed: THREE.Uniform<number>;
  waveFrequency: THREE.Uniform<number>;
  waveAmplitude: THREE.Uniform<number>;
  waveColor: THREE.Uniform<THREE.Color>;
  mousePos: THREE.Uniform<THREE.Vector2>;
  enableMouseInteraction: THREE.Uniform<number>;
  mouseRadius: THREE.Uniform<number>;
}

interface DitheredWavesProps {
  waveSpeed: number;
  waveFrequency: number;
  waveAmplitude: number;
  waveColor: [number, number, number];
  colorNum: number;
  pixelSize: number;
  disableAnimation: boolean;
  enableMouseInteraction: boolean;
  mouseRadius: number;
}

function DitheredWaves({
  waveSpeed,
  waveFrequency,
  waveAmplitude,
  waveColor,
  colorNum,
  pixelSize,
  disableAnimation,
  enableMouseInteraction,
  mouseRadius,
}: DitheredWavesProps) {
  const mesh = useRef<THREE.Mesh>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const { viewport, size, gl } = useThree();

  const waveUniformsRef = useRef<WaveUniforms>({
    time: new THREE.Uniform(0),
    resolution: new THREE.Uniform(new THREE.Vector2(0, 0)),
    waveSpeed: new THREE.Uniform(waveSpeed),
    waveFrequency: new THREE.Uniform(waveFrequency),
    waveAmplitude: new THREE.Uniform(waveAmplitude),
    waveColor: new THREE.Uniform(new THREE.Color(...waveColor)),
    mousePos: new THREE.Uniform(new THREE.Vector2(0, 0)),
    enableMouseInteraction: new THREE.Uniform(enableMouseInteraction ? 1 : 0),
    mouseRadius: new THREE.Uniform(mouseRadius),
  });

  useEffect(() => {
    const dpr = gl.getPixelRatio();
    const newWidth = Math.floor(size.width * dpr);
    const newHeight = Math.floor(size.height * dpr);
    const currentRes = waveUniformsRef.current.resolution.value;
    if (currentRes.x !== newWidth || currentRes.y !== newHeight) {
      currentRes.set(newWidth, newHeight);
    }
  }, [size, gl]);

  useFrame(({ clock }) => {
    if (!disableAnimation) {
      waveUniformsRef.current.time.value = clock.getElapsedTime();
    }
    waveUniformsRef.current.waveSpeed.value = waveSpeed;
    waveUniformsRef.current.waveFrequency.value = waveFrequency;
    waveUniformsRef.current.waveAmplitude.value = waveAmplitude;
    waveUniformsRef.current.waveColor.value.set(...waveColor);
    waveUniformsRef.current.enableMouseInteraction.value =
      enableMouseInteraction ? 1 : 0;
    waveUniformsRef.current.mouseRadius.value = mouseRadius;
    if (enableMouseInteraction) {
      waveUniformsRef.current.mousePos.value.set(mousePos.x, mousePos.y);
    }
  });

  const handlePointerMove = (e: ThreeEvent<PointerEvent>) => {
    if (!enableMouseInteraction) return;
    const rect = gl.domElement.getBoundingClientRect();
    const dpr = gl.getPixelRatio();
    const x = (e.clientX - rect.left) * dpr;
    const y = (e.clientY - rect.top) * dpr;
    setMousePos({ x, y });
  };

  return (
    <>
      <mesh ref={mesh} scale={[viewport.width, viewport.height, 1]}>
        <planeGeometry args={[1, 1]} />
        <shaderMaterial
          vertexShader={waveVertexShader}
          fragmentShader={waveFragmentShader}
          uniforms={waveUniformsRef.current}
        />
      </mesh>

      <EffectComposer>
        <RetroEffect colorNum={colorNum} pixelSize={pixelSize} />
      </EffectComposer>

      <mesh
        onPointerMove={handlePointerMove}
        position={[0, 0, 0.01]}
        scale={[viewport.width, viewport.height, 1]}
        visible={false}
      >
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>
    </>
  );
}

interface DitherProps {
  waveSpeed?: number;
  waveFrequency?: number;
  waveAmplitude?: number;
  waveColor?: [number, number, number];
  colorNum?: number;
  pixelSize?: number;
  disableAnimation?: boolean;
  enableMouseInteraction?: boolean;
  mouseRadius?: number;
}

function Dither({
  waveSpeed = 0.05,
  waveFrequency = 3,
  waveAmplitude = 0.3,
  waveColor = [0.5, 0.5, 0.5],
  colorNum = 4,
  pixelSize = 2,
  disableAnimation = false,
  enableMouseInteraction = true,
  mouseRadius = 1,
}: DitherProps) {
  return (
    <Canvas
      className="w-full h-full relative"
      camera={{ position: [0, 0, 6] }}
      dpr={typeof window !== 'undefined' ? window.devicePixelRatio : 1}
      gl={{ antialias: true, preserveDrawingBuffer: true }}
    >
      <DitheredWaves
        waveSpeed={waveSpeed}
        waveFrequency={waveFrequency}
        waveAmplitude={waveAmplitude}
        waveColor={waveColor}
        colorNum={colorNum}
        pixelSize={pixelSize}
        disableAnimation={disableAnimation}
        enableMouseInteraction={enableMouseInteraction}
        mouseRadius={mouseRadius}
      />
    </Canvas>
  );
}

export default function Home() {
  const [showDither, setShowDither] = useState(true);
  const [ditherFadingOut, setDitherFadingOut] = useState(false);
  const [showContent, setShowContent] = useState(false);

  const handleClick = () => {
    if (showDither && !ditherFadingOut) {
      setDitherFadingOut(true);
      // Hide the dither after animation completes
      setTimeout(() => {
        setShowDither(false);
        setShowContent(true);
      }, 500);
    }
  };

  return (
    <>
      <style jsx global>{`
        ::selection {
          background-color: rgba(107, 70, 193, 0.3);
          color: white;
        }
        ::-moz-selection {
          background-color: rgba(107, 70, 193, 0.3);
          color: white;
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes fadeOut {
          from {
            opacity: 1;
          }
          to {
            opacity: 0;
          }
        }

        @keyframes fadeToBackground {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        .animate-fade-in-up {
          animation: fadeInUp 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }
        
        .animate-fade-in {
          animation: fadeIn 0.4s ease-out forwards;
          opacity: 0;
        }

        .animate-fade-out {
          animation: fadeOut 0.5s ease-out forwards;
        }

        .animate-fade-to-background {
          animation: fadeToBackground 0.5s ease-out forwards;
          opacity: 0;
        }
        
        .delay-150 { animation-delay: 0.15s; }
        .delay-250 { animation-delay: 0.25s; }
        .delay-350 { animation-delay: 0.35s; }
        .delay-450 { animation-delay: 0.45s; }
        .delay-550 { animation-delay: 0.55s; }
        .delay-650 { animation-delay: 0.65s; }
        .delay-750 { animation-delay: 0.75s; }
        .delay-850 { animation-delay: 0.85s; }
      `}</style>

      {/* Dither Background */}
      {showDither && (
        <>
          <div 
            className={`fixed inset-0 z-50 ${ditherFadingOut ? 'animate-fade-out' : ''}`}
          >
            <Dither 
              enableMouseInteraction={false}
              waveColor={[0.3, 0.3, 0.3]}
              colorNum={8}
              pixelSize={1}
            />
            {/* Logo */}
            <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 -translate-y-36">
              <img 
                src="/logo.svg"
                alt="Logo"
                className="w-52 h-52 mx-auto"
                style={{
                  filter: 'brightness(0) invert(1)',
                  imageRendering: 'auto',
                  transform: 'translateZ(0)',
                  backfaceVisibility: 'hidden',
                  WebkitFontSmoothing: 'antialiased',
                  MozOsxFontSmoothing: 'grayscale'
                }}
              />
            </div>
            {/* Enter Button */}
            <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 translate-y-16">
              <button
                onClick={handleClick}
                className="px-12 py-3 bg-white border border-[#e8e8d0] rounded-lg text-[#2a2a2a] text-sm font-medium hover:bg-[#f0f0f0] hover:border-[#d4d0b0] hover:text-[#1a1a1a] hover:shadow-2xl hover:-translate-y-0.5 active:translate-y-0.5 active:scale-100 active:shadow-sm transition-all duration-150 ease-out shadow-lg transform"
                style={{
                  fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
                }}
              >
                Enter
              </button>
            </div>
            {/* Signature overlay */}
            <div className="absolute bottom-[-16] right-4 w-32 h-32 pointer-events-none">
              <img 
                src="/Signature.svg"
                alt="Signature"
                className="w-full h-full"
                style={{
                  filter: 'brightness(0) invert(1)',
                  imageRendering: 'auto',
                  transform: 'translateZ(0)',
                  backfaceVisibility: 'hidden',
                  WebkitFontSmoothing: 'antialiased',
                  MozOsxFontSmoothing: 'grayscale'
                }}
              />
            </div>
          </div>
          {/* Background overlay that fades in as dither fades out */}
          {ditherFadingOut && (
            <div 
              className="fixed inset-0 z-40 bg-[#1a1a1a] animate-fade-to-background"
              style={{ opacity: 0 }}
            />
          )}
        </>
      )}

      {/* Main Content */}
      {showContent && (
        <div className="min-h-screen bg-[#1a1a1a] text-[#e5e5e5]" style={{ fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
          {/* Top fade overlay */}
          <div className="fixed left-0 right-0 h-14 bg-gradient-to-b from-[#1a1a1a] via-[#1a1a1a] via-[#1a1a1a] to-transparent z-10 pointer-events-none"></div>
          
          <div className="max-w-2xl mx-auto px-6 py-32">
            {/* Header */}
            <header className="mb-24 animate-fade-in-up delay-150" style={{ opacity: 0, transform: 'translateY(30px)' }}>
              <h1 className="text-lg font-medium mb-4 text-[#e5e5e5]">Moritz Schäfer</h1>
              <p className="text-[#888] mb-6 text-base">
                <em>I like to try new stuff</em>. Experimenting with new AI stuff and current tech trends. I like to build nice looking interfaces.
              </p>
              <div className="animate-fade-in delay-250" style={{ opacity: 0 }}>
                <p className="text-[#888] text-base">
                  Currently employed at PHOENIX group as a dual study student.
                </p>
              </div>
            </header>

            {/* Three Column Layout: Building, Projects, Writing */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-16">
              {/* Building Section */}
              <section className="animate-fade-in-up delay-350" style={{ opacity: 0, transform: 'translateY(30px)' }}>
                <h2 className="text-base font-medium mb-8 text-[#888]">Building</h2>
                <div className="space-y-4">
                  <div>
                    <a href="#" className="block group">
                      <h3 className="text-[#e5e5e5] font-medium mb-1 text-base flex items-center gap-2">
                        <span className="border-b border-[#333] group-hover:border-[#666] transition-colors">
                          Craft
                        </span>
                        <svg className="w-4 h-4 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </h3>
                      <p className="text-[#888] text-base">Implementing interfaces and interactions.</p>
                    </a>
                  </div>
                </div>
              </section>

              {/* Projects Section */}
              <section className="animate-fade-in-up delay-350" style={{ opacity: 0, transform: 'translateY(30px)' }}>
                <h2 className="text-base font-medium mb-8 text-[#888]">Projects</h2>
                <div className="space-y-6">
                  <div>
                    <a href="#" className="block group">
                      <h3 className="text-[#e5e5e5] font-medium mb-1 text-base flex items-center gap-2">
                        <span className="border-b border-[#333] group-hover:border-[#666] transition-colors">
                          ⌘K
                        </span>
                        <svg className="w-4 h-4 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </h3>
                      <p className="text-[#888] text-base">Composable command menu React component.</p>
                    </a>
                  </div>
                  <div className="animate-fade-in delay-450" style={{ opacity: 0 }}>
                    <a href="#" className="block group">
                      <h3 className="text-[#e5e5e5] font-medium mb-1 text-base flex items-center gap-2">
                        <span className="border-b border-[#333] group-hover:border-[#666] transition-colors">
                          Writer
                        </span>
                        <svg className="w-4 h-4 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </h3>
                      <p className="text-[#888] text-base">Plain text editor with a focus on performance.</p>
                    </a>
                  </div>
                  <div className="animate-fade-in delay-550" style={{ opacity: 0 }}>
                    <a href="#" className="block group">
                      <h3 className="text-[#e5e5e5] font-medium mb-1 text-base flex items-center gap-2">
                        <span className="border-b border-[#333] group-hover:border-[#666] transition-colors">
                          Next Themes
                        </span>
                        <svg className="w-4 h-4 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </h3>
                      <p className="text-[#888] text-base">Perfect dark mode in Next.js apps.</p>
                    </a>
                  </div>
                </div>
              </section>

              {/* Writing Section */}
              <section className="animate-fade-in-up delay-350" style={{ opacity: 0, transform: 'translateY(30px)' }}>
                <h2 className="text-base font-medium mb-8 text-[#888]">Writing</h2>
                <div className="space-y-6">
                  <div>
                    <a href="#" className="block group">
                      <h3 className="text-[#e5e5e5] font-medium mb-1 text-base flex items-center gap-2">
                        <span className="border-b border-[#333] group-hover:border-[#666] transition-colors">
                          React Hook Getter Pattern
                        </span>
                        <svg className="w-4 h-4 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </h3>
                      <p className="text-[#888] text-base">Simple, efficient React state hook in 50 lines.</p>
                    </a>
                  </div>
                  <div className="animate-fade-in delay-450" style={{ opacity: 0 }}>
                    <a href="#" className="block group">
                      <h3 className="text-[#e5e5e5] font-medium mb-1 text-base flex items-center gap-2">
                        <span className="border-b border-[#333] group-hover:border-[#666] transition-colors">
                          Redesign 2021
                        </span>
                        <svg className="w-4 h-4 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </h3>
                      <p className="text-[#888] text-base">Return to simplicity.</p>
                    </a>
                  </div>
                  <div className="animate-fade-in delay-550" style={{ opacity: 0 }}>
                    <a href="#" className="block group">
                      <h3 className="text-[#e5e5e5] font-medium mb-1 text-base flex items-center gap-2">
                        <span className="border-b border-[#333] group-hover:border-[#666] transition-colors">
                          All writing
                        </span>
                        <svg className="w-4 h-4 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </h3>
                      <p className="text-[#888] text-base">Infrequent thoughts on design and code.</p>
                    </a>
                  </div>
                </div>
              </section>
            </div>

            {/* Now Section */}
            <section className="mb-16 animate-fade-in-up delay-650" style={{ opacity: 0, transform: 'translateY(30px)' }}>
              <h2 className="text-lg font-medium mb-8 text-[#e5e5e5]">Now</h2>
              <div className="space-y-4 text-[#e5e5e5] text-base leading-relaxed">
                <p>
                  Developing skill through doing, guiltlessly exploring passion and interests, imbuing quality. 
                  Mindful that <em>everything around me is someone's life work.</em>
                </p>
                <div className="animate-fade-in delay-750" style={{ opacity: 0 }}>
                  <p>
                    All I want to do is build websites. Typography, motion design, copywriting, performance—
                    the web is an endless medium of opportunity and creativity of which I've only scratched 
                    the surface.
                  </p>
                </div>
                <div className="animate-fade-in delay-850" style={{ opacity: 0 }}>
                  <p>
                    Enjoying deep, dark, boring dance music: songs that set the pace in the first ten seconds 
                    and maintain it for the next ten minutes. Deep is a curation of my favorites. Soothed by the 
                    inherent energy of drum and bass—Drum has my favorites.
                  </p>
                </div>
              </div>
            </section>

            {/* Connect Section */}
            <section className="animate-fade-in-up delay-750" style={{ opacity: 0, transform: 'translateY(30px)' }}>
              <h2 className="text-lg font-medium mb-8 text-[#e5e5e5]">Connect</h2>
              <p className="text-[#e5e5e5] text-base">
                Reach me at <span className="text-[#e5e5e5]">@msc</span> or <span className="text-[#e5e5e5]">ms@msc.dev</span>.
              </p>
            </section>
          </div>
        </div>
      )}
    </>
  );
}
