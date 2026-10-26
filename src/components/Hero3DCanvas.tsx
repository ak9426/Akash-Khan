import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { ChevronDown, ChevronUp, RotateCw, Eye, Sparkles } from 'lucide-react';

export default function Hero3DCanvas() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [webGlSupported, setWebGlSupported] = useState(true);
  const [isDockCollapsed, setIsDockCollapsed] = useState(false);
  const [rotationSpeed, setRotationSpeed] = useState<'normal' | 'slow' | 'freeze'>('normal');
  const [renderMode, setRenderMode] = useState<'solid' | 'wireframe' | 'hybrid'>('hybrid');
  const [themeGlow, setThemeGlow] = useState<'cyan' | 'cobalt' | 'violet'>('cyan');

  // Ref to share control state with the render loop without re-triggering useEffect
  const controlStateRef = useRef({
    speed: 1.0,
    renderMode: 'hybrid',
    targetRotationX: 0,
    targetRotationY: 0,
    themeGlow: 'cyan',
  });

  useEffect(() => {
    let speedVal = 1.0;
    if (rotationSpeed === 'slow') speedVal = 0.35;
    if (rotationSpeed === 'freeze') speedVal = 0.0;
    controlStateRef.current.speed = speedVal;
  }, [rotationSpeed]);

  useEffect(() => {
    controlStateRef.current.renderMode = renderMode;
  }, [renderMode]);

  useEffect(() => {
    controlStateRef.current.themeGlow = themeGlow;
  }, [themeGlow]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Check WebGL availability
    const testCanvas = document.createElement('canvas');
    const gl = testCanvas.getContext('webgl2') || testCanvas.getContext('webgl');
    if (!gl) {
      setWebGlSupported(false);
      return;
    }

    // Software WebGL probe
    const isSoftwareGl = (() => {
      const probeCanvas = document.createElement('canvas');
      const probeGl = probeCanvas.getContext('webgl2') || probeCanvas.getContext('webgl');
      if (!probeGl) return true;
      const ext = probeGl.getExtension('WEBGL_debug_renderer_info');
      const param = ext ? ext.UNMASKED_RENDERER_WEBGL : probeGl.RENDERER;
      const gpu = String(probeGl.getParameter(param));
      probeGl.getExtension('WEBGL_lose_context')?.loseContext();
      return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
    })();

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || 600;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x030712, 0.06);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0.5, 7.5);

    // 2. Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);

    // 3. RoomEnvironment reflection map
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    pmremGenerator.dispose();

    // 4. Lighting Rig
    const keyLight = new THREE.DirectionalLight(0x38bdf8, 2.5);
    keyLight.position.set(4, 5, 4);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x818cf8, 1.8);
    fillLight.position.set(-4, -2, -3);
    scene.add(fillLight);

    const hemiLight = new THREE.HemisphereLight(0x06b6d4, 0x0f172a, 1.2);
    scene.add(hemiLight);

    // 5. Composite 3D Centerpiece (Procedural Group)
    const masterGroup = new THREE.Group();
    scene.add(masterGroup);

    // Centerpiece Component A: Central Polyhedral Core (Icosahedron)
    const coreGeo = new THREE.IcosahedronGeometry(1.2, 1);
    const coreMat = new THREE.MeshPhysicalMaterial({
      color: 0x0f172a,
      metalness: 0.9,
      roughness: 0.2,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      wireframe: false,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    masterGroup.add(coreMesh);

    // Inner Glowing Crystalline Nucleus
    const innerGeo = new THREE.OctahedronGeometry(0.7, 0);
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0x06b6d4,
      wireframe: true,
      transparent: true,
      opacity: 0.85,
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    masterGroup.add(innerMesh);

    // Centerpiece Component B: Concentric Orbital Rings
    const ringMatA = new THREE.MeshStandardMaterial({
      color: 0x0284c7,
      metalness: 0.95,
      roughness: 0.25,
    });
    const ringGeoA = new THREE.TorusGeometry(2.1, 0.035, 16, 100);
    const ringA = new THREE.Mesh(ringGeoA, ringMatA);
    ringA.rotation.x = Math.PI / 3;
    masterGroup.add(ringA);

    const ringMatB = new THREE.MeshStandardMaterial({
      color: 0x6366f1,
      metalness: 0.9,
      roughness: 0.3,
    });
    const ringGeoB = new THREE.TorusGeometry(2.6, 0.025, 16, 120);
    const ringB = new THREE.Mesh(ringGeoB, ringMatB);
    ringB.rotation.y = Math.PI / 4;
    ringB.rotation.x = -Math.PI / 6;
    masterGroup.add(ringB);

    const ringMatC = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      metalness: 0.85,
      roughness: 0.35,
    });
    const ringGeoC = new THREE.TorusGeometry(3.1, 0.02, 16, 140);
    const ringC = new THREE.Mesh(ringGeoC, ringMatC);
    ringC.rotation.z = Math.PI / 5;
    masterGroup.add(ringC);

    // Centerpiece Component C: Mobile Logic Circuit Nodes (Satellite Motherboard Pins)
    const pinGroup = new THREE.Group();
    const pinGeo = new THREE.BoxGeometry(0.08, 0.08, 0.25);
    const pinMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      metalness: 0.95,
      roughness: 0.1,
    });

    const pinCount = 16;
    for (let i = 0; i < pinCount; i++) {
      const angle = (i / pinCount) * Math.PI * 2;
      const radius = 2.1;
      const pin = new THREE.Mesh(pinGeo, pinMat);
      pin.position.set(Math.cos(angle) * radius, Math.sin(angle) * radius, 0);
      pin.rotation.z = angle + Math.PI / 2;
      pinGroup.add(pin);
    }
    ringA.add(pinGroup);

    // Centerpiece Component D: Circuit Board Floor Grid
    const gridHelper = new THREE.GridHelper(10, 20, 0x0284c7, 0x1e293b);
    gridHelper.position.y = -2.4;
    scene.add(gridHelper);

    // Contact shadow soft plane
    const shadowGeo = new THREE.PlaneGeometry(6, 6);
    const shadowMat = new THREE.MeshBasicMaterial({
      color: 0x000000,
      transparent: true,
      opacity: 0.45,
    });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.y = -2.39;
    scene.add(shadowMesh);

    // Centerpiece Component E: Data Particles
    const particleCount = isSoftwareGl ? 80 : 220;
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      const radius = 1.8 + Math.random() * 2.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.5) * Math.PI;
      particlePositions[i] = radius * Math.cos(phi) * Math.cos(theta);
      particlePositions[i + 1] = radius * Math.sin(phi);
      particlePositions[i + 2] = radius * Math.cos(phi) * Math.sin(theta);
    }
    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x38bdf8,
      size: 0.045,
      transparent: true,
      opacity: 0.75,
    });
    const particlePoints = new THREE.Points(particleGeo, particleMat);
    masterGroup.add(particlePoints);

    // Pointer Parallax Handler - Confined strictly to canvas container
    let mouseX = 0;
    let mouseY = 0;
    const handlePointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouseX = x * 0.4;
      mouseY = y * 0.3;
    };

    const handlePointerLeave = () => {
      // Smoothly reset parallax target back to neutral center when leaving canvas
      mouseX = 0;
      mouseY = 0;
    };

    container.addEventListener('pointermove', handlePointerMove, { passive: true });
    container.addEventListener('pointerleave', handlePointerLeave, { passive: true });

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight;
      if (newW <= 0 || newH <= 0) return;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };
    window.addEventListener('resize', handleResize);

    // WebGL Context Lost safety listener
    const handleContextLost = (event: Event) => {
      event.preventDefault();
      cancelAnimationFrame(animId);
    };
    renderer.domElement.addEventListener('webglcontextlost', handleContextLost);

    // Animation Loop
    let animId = 0;
    const clock = new THREE.Clock();

    const tick = () => {
      const delta = clock.getDelta();
      const speed = controlStateRef.current.speed;
      const currentMode = controlStateRef.current.renderMode;
      const currentTheme = controlStateRef.current.themeGlow;

      // Adjust materials based on UI controls
      if (currentMode === 'wireframe') {
        coreMat.wireframe = true;
      } else if (currentMode === 'solid') {
        coreMat.wireframe = false;
        innerMesh.visible = false;
      } else {
        coreMat.wireframe = false;
        innerMesh.visible = true;
      }

      // Dynamic color theme update
      if (currentTheme === 'cyan') {
        keyLight.color.setHex(0x38bdf8);
        innerMat.color.setHex(0x06b6d4);
        particleMat.color.setHex(0x38bdf8);
      } else if (currentTheme === 'cobalt') {
        keyLight.color.setHex(0x2563eb);
        innerMat.color.setHex(0x3b82f6);
        particleMat.color.setHex(0x60a5fa);
      } else {
        keyLight.color.setHex(0x8b5cf6);
        innerMat.color.setHex(0xa855f7);
        particleMat.color.setHex(0xc084fc);
      }

      // Smooth kinematic rotations
      const rotDelta = delta * speed;
      masterGroup.rotation.y += rotDelta * 0.35;
      ringA.rotation.z += rotDelta * 0.55;
      ringB.rotation.x += rotDelta * 0.45;
      ringC.rotation.y -= rotDelta * 0.4;
      innerMesh.rotation.y -= rotDelta * 0.7;
      innerMesh.rotation.x += rotDelta * 0.35;
      particlePoints.rotation.y += rotDelta * 0.15;

      // Pointer Parallax with exponential damping
      masterGroup.position.x = THREE.MathUtils.damp(masterGroup.position.x, mouseX * 1.5, 4, delta);
      masterGroup.position.y = THREE.MathUtils.damp(masterGroup.position.y, mouseY * 1.2, 4, delta);

      renderer.render(scene, camera);
      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);

    // Cleanup
    return () => {
      cancelAnimationFrame(animId);
      container.removeEventListener('pointermove', handlePointerMove);
      container.removeEventListener('pointerleave', handlePointerLeave);
      window.removeEventListener('resize', handleResize);
      renderer.domElement.removeEventListener('webglcontextlost', handleContextLost);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      coreGeo.dispose();
      coreMat.dispose();
      innerGeo.dispose();
      innerMat.dispose();
      ringGeoA.dispose();
      ringMatA.dispose();
      ringGeoB.dispose();
      ringMatB.dispose();
      ringGeoC.dispose();
      ringMatC.dispose();
      pinGeo.dispose();
      pinMat.dispose();
      shadowGeo.dispose();
      shadowMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
    };
  }, []);

  if (!webGlSupported) {
    return (
      <div className="relative w-full h-[540px] flex items-center justify-center bg-slate-950/80 rounded-2xl border border-slate-800 text-center p-8">
        <div className="max-w-md">
          <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-cyan-950/40 border border-cyan-800/40 flex items-center justify-center text-cyan-400">
            <Sparkles className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">Interactive 3D Visualizer</h3>
          <p className="text-sm text-slate-400">
            WebGL acceleration is unavailable on this device. The rest of the portfolio remains fully operational with high-fidelity technical documentation and credentials.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[520px] lg:h-[620px] select-none overflow-hidden rounded-2xl border border-slate-800/60 bg-gradient-to-b from-slate-950 via-[#030712] to-slate-950">
      {/* 3D WebGL Canvas Mount Container */}
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Floating HUD Meta Tags (Top-Left & Top-Right) */}
      <div className="absolute top-4 left-4 z-10 pointer-events-none flex flex-col gap-1 text-[11px] font-mono text-slate-400">
        <span className="text-cyan-400 font-semibold tracking-wider">CORE VISUALIZER · 3D MODEL</span>
        <span>INTERSECTION: HARDWARE × SOFTWARE × VENTURE</span>
      </div>

      <div className="absolute top-4 right-4 z-10 pointer-events-none hidden sm:flex items-center gap-3 text-[11px] font-mono text-slate-400">
        <span>CANVAS PARALLAX</span>
        <span aria-hidden="true">·</span>
        <span className="text-cyan-300">PBR LIGHTING RIG</span>
      </div>

      {/* Collapsible Unified Bottom Control Dock (Strictly pinned at bottom center, zero side occlusion) */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 w-[94%] max-w-xl transition-all duration-300">
        {/* Toggle Bar */}
        <div className="flex justify-center mb-1">
          <button
            onClick={() => setIsDockCollapsed((prev) => !prev)}
            className="flex items-center gap-1.5 px-3 py-1 text-[11px] font-mono text-slate-400 hover:text-cyan-300 bg-slate-900/90 border border-slate-800 rounded-t-md transition-colors shadow-lg cursor-pointer"
            aria-label={isDockCollapsed ? 'Show 3D Viewport Controls' : 'Hide 3D Viewport Controls'}
          >
            {isDockCollapsed ? (
              <>
                <ChevronUp className="w-3.5 h-3.5 text-cyan-400" />
                <span>Show 3D Controls</span>
              </>
            ) : (
              <>
                <ChevronDown className="w-3.5 h-3.5 text-cyan-400" />
                <span>Collapse Dock</span>
              </>
            )}
          </button>
        </div>

        {/* Control Dock Panel */}
        {!isDockCollapsed && (
          <div className="bg-slate-900/90 border border-slate-800/90 rounded-xl p-3 shadow-2xl flex flex-wrap items-center justify-between gap-3 text-xs">
            {/* Speed Control */}
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
                <RotateCw className="w-3.5 h-3.5 text-cyan-400" />
                Speed:
              </span>
              <div className="flex items-center p-0.5 bg-slate-950/80 rounded-lg border border-slate-800">
                {(['normal', 'slow', 'freeze'] as const).map((spd) => (
                  <button
                    key={spd}
                    onClick={() => setRotationSpeed(spd)}
                    className={`px-2 py-1 text-[11px] font-medium rounded capitalize transition-colors cursor-pointer ${
                      rotationSpeed === spd
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {spd}
                  </button>
                ))}
              </div>
            </div>

            {/* Mode Control */}
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
                <Eye className="w-3.5 h-3.5 text-cyan-400" />
                Structure:
              </span>
              <div className="flex items-center p-0.5 bg-slate-950/80 rounded-lg border border-slate-800">
                {(['hybrid', 'wireframe', 'solid'] as const).map((m) => (
                  <button
                    key={m}
                    onClick={() => setRenderMode(m)}
                    className={`px-2 py-1 text-[11px] font-medium rounded capitalize transition-colors cursor-pointer ${
                      renderMode === m
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            {/* Spectral Lighting Theme */}
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono text-slate-400">Spectrum:</span>
              <div className="flex items-center gap-1.5">
                {(['cyan', 'cobalt', 'violet'] as const).map((thm) => (
                  <button
                    key={thm}
                    onClick={() => setThemeGlow(thm)}
                    className={`w-4 h-4 rounded-full border transition-all cursor-pointer ${
                      thm === 'cyan' ? 'bg-cyan-400' : thm === 'cobalt' ? 'bg-blue-600' : 'bg-purple-500'
                    } ${
                      themeGlow === thm
                        ? 'ring-2 ring-white scale-110 border-white'
                        : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                    title={`${thm} lighting`}
                    aria-label={`${thm} lighting`}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
