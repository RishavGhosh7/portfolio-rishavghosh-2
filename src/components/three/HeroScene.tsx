import { Stars } from '@react-three/drei'

type HeroSceneProps = {
  reducedMotion?: boolean
}

export function HeroScene({ reducedMotion = false }: HeroSceneProps) {
  const starCount = reducedMotion ? 400 : 1800

  return (
    <>
      <fog attach="fog" args={['#05050b', reducedMotion ? 12 : 8, reducedMotion ? 22 : 18]} />
      <Stars
        radius={80}
        depth={45}
        count={starCount}
        factor={4}
        fade
        speed={reducedMotion ? 0.2 : 0.6}
      />
    </>
  )
}
