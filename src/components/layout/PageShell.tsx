import { lazy, Suspense, type PropsWithChildren } from 'react'

const SceneCanvas = lazy(async () => {
  const mod = await import('../three/SceneCanvas')
  return { default: mod.SceneCanvas }
})

const WebGLShader = lazy(async () => {
  const mod = await import('../three/WebGLShader')
  return { default: mod.WebGLShader }
})

export function PageShell({ children }: PropsWithChildren) {
  return (
    <div className="page-shell">
      <Suspense fallback={null}>
        <WebGLShader />
        <SceneCanvas />
      </Suspense>
      <main className="content-layer">{children}</main>
    </div>
  )
}
