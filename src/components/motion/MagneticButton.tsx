import gsap from 'gsap'
import {
  useCallback,
  useEffect,
  useRef,
  type AnchorHTMLAttributes,
  type PropsWithChildren,
} from 'react'
import { useReducedMotion } from '../../hooks/useReducedMotion'

type MagneticButtonProps = PropsWithChildren<
  AnchorHTMLAttributes<HTMLAnchorElement> & { strength?: number }
>

export function MagneticButton({
  children,
  className,
  strength = 0.35,
  ...props
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null)
  const prefersReduced = useReducedMotion()

  const move = useCallback(
    (e: MouseEvent) => {
      const el = ref.current
      if (!el || prefersReduced) return
      const rect = el.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2
      gsap.to(el, {
        x: x * strength,
        y: y * strength,
        duration: 0.35,
        ease: 'power2.out',
      })
    },
    [prefersReduced, strength],
  )

  const leave = useCallback(() => {
    const el = ref.current
    if (!el || prefersReduced) return
    gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.6)' })
  }, [prefersReduced])

  useEffect(() => {
    const el = ref.current
    if (!el || prefersReduced) return
    el.addEventListener('mousemove', move)
    el.addEventListener('mouseleave', leave)
    return () => {
      el.removeEventListener('mousemove', move)
      el.removeEventListener('mouseleave', leave)
    }
  }, [leave, move, prefersReduced])

  return (
    <a ref={ref} className={className} {...props}>
      {children}
    </a>
  )
}
