import { Bloom, EffectComposer } from '@react-three/postprocessing'

type PostFXProps = {
  enabled?: boolean
  bloomIntensity?: number
}

export function PostFX({ enabled = true, bloomIntensity = 1.15 }: PostFXProps) {
  if (!enabled) return null
  return (
    <EffectComposer>
      <Bloom luminanceThreshold={0.1} intensity={bloomIntensity} />
    </EffectComposer>
  )
}
