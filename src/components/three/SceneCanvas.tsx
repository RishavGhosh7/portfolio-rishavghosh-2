import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { CameraRig } from './CameraRig'
import { HeroScene } from './HeroScene'
import { PostFX } from './effects/PostFX'
import { useReducedMotion } from '../../hooks/useReducedMotion'

function SceneInner() {
  const reducedMotion = useReducedMotion()

  return (
    <>
      <CameraRig reducedMotion={reducedMotion} />
      <HeroScene reducedMotion={reducedMotion} />
      <PostFX enabled={!reducedMotion} bloomIntensity={reducedMotion ? 0 : 1.15} />
    </>
  )
}

export function SceneCanvas() {
  return (
    <div className="scene-canvas pointer-events-none fixed inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 52 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          <SceneInner />
        </Suspense>
      </Canvas>
    </div>
  )
}
