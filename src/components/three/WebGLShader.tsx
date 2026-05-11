import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { useReducedMotion } from '../../hooks/useReducedMotion'

const vertexShader = `
  attribute vec3 position;

  void main() {
    gl_Position = vec4(position, 1.0);
  }
`

const fragmentShader = `
  precision highp float;

  uniform vec2 resolution;
  uniform float time;
  uniform float xScale;
  uniform float yScale;
  uniform float distortion;

  void main() {
    vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);

    float d = length(p) * distortion;

    float rx = p.x * (1.0 + d);
    float gx = p.x;
    float bx = p.x * (1.0 - d);

    float r = 0.05 / abs(p.y + sin((rx + time) * xScale) * yScale);
    float g = 0.05 / abs(p.y + sin((gx + time) * xScale) * yScale);
    float b = 0.05 / abs(p.y + sin((bx + time) * xScale) * yScale);

    gl_FragColor = vec4(r, g, b, 1.0);
  }
`

type ShaderUniforms = {
  resolution: THREE.IUniform<THREE.Vector2>
  time: THREE.IUniform<number>
  xScale: THREE.IUniform<number>
  yScale: THREE.IUniform<number>
  distortion: THREE.IUniform<number>
}

type WebGLShaderProps = {
  className?: string
}

export function WebGLShader({
  className = 'pointer-events-none fixed inset-0 z-0 block h-full w-full',
}: WebGLShaderProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const scene = new THREE.Scene()
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: false,
      powerPreference: 'high-performance',
    })

    renderer.setClearColor(new THREE.Color(0x000000))

    const uniforms: ShaderUniforms = {
      resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
      time: { value: 0 },
      xScale: { value: 1 },
      yScale: { value: 0.5 },
      distortion: { value: 0.05 },
    }

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(
        [
          -1, -1, 0, 1, -1, 0, -1, 1, 0,
          1, -1, 0, -1, 1, 0, 1, 1, 0,
        ],
        3,
      ),
    )

    const material = new THREE.RawShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
      side: THREE.DoubleSide,
    })

    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)

    const render = () => renderer.render(scene, camera)
    const handleResize = () => {
      const width = window.innerWidth
      const height = window.innerHeight

      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      renderer.setSize(width, height, false)
      uniforms.resolution.value.set(width, height)
      render()
    }

    let animationId: number | null = null
    const animate = () => {
      uniforms.time.value += 0.01
      render()
      animationId = requestAnimationFrame(animate)
    }

    handleResize()

    if (reducedMotion) {
      render()
    } else {
      animate()
    }

    window.addEventListener('resize', handleResize)

    return () => {
      if (animationId !== null) cancelAnimationFrame(animationId)
      window.removeEventListener('resize', handleResize)
      scene.remove(mesh)
      geometry.dispose()
      material.dispose()
      renderer.dispose()
    }
  }, [reducedMotion])

  return <canvas ref={canvasRef} aria-hidden="true" className={className} />
}
