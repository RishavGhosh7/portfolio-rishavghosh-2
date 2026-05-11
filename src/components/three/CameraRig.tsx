/* eslint-disable react-hooks/immutability -- Three.js camera is updated inside useFrame (standard R3F) */
import { useFrame, useThree } from '@react-three/fiber'
import { useEffect, useRef } from 'react'
import type { PerspectiveCamera } from 'three'
import { Vector3 } from 'three'

type CameraRigProps = {
  reducedMotion?: boolean
}

export function CameraRig({ reducedMotion = false }: CameraRigProps) {
  const { camera } = useThree()
  const scrollRef = useRef(0)
  const lookTarget = useRef(new Vector3())

  useEffect(() => {
    const onScroll = () => {
      scrollRef.current =
        window.scrollY / Math.max(document.body.scrollHeight - window.innerHeight, 1)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useFrame((state) => {
    const cam = camera as PerspectiveCamera
    const t = state.clock.getElapsedTime()
    const scroll = scrollRef.current

    if (reducedMotion) {
      cam.position.z = 5
      cam.position.y = 0
      cam.position.x = 0
      cam.lookAt(lookTarget.current.set(0, 0, 0))
      return
    }

    cam.position.x = Math.sin(t * 0.15) * 0.35 + scroll * 0.4
    cam.position.y = Math.cos(t * 0.12) * 0.15 - scroll * 0.25
    cam.position.z = 5 - scroll * 0.6
    cam.lookAt(lookTarget.current.set(0, scroll * 0.2, 0))
  })

  return null
}
