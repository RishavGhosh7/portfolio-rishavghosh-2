import gsap from 'gsap'
import { useLayoutEffect, useRef, type PropsWithChildren } from 'react'
import { useReducedMotion } from '../../hooks/useReducedMotion'

type RevealProps = PropsWithChildren<{
  className?: string
}>

export function Reveal({ children, className }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const prefersReduced = useReducedMotion()

  useLayoutEffect(() => {
    const el = ref.current
    if (!el || prefersReduced) return

    gsap.fromTo(
      el,
      { opacity: 0, y: 28 },
      {
        opacity: 1,
        y: 0,
        duration: 0.75,
        ease: 'power3.out',
      },
    )

    return () => {
      gsap.killTweensOf(el)
    }
  }, [prefersReduced])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
