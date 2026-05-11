import * as React from 'react'
import { cn } from '../../lib/utils'

type GooeyTextProps = {
  texts: string[]
  morphTime?: number
  cooldownTime?: number
  className?: string
  textClassName?: string
}

export function GooeyText({
  texts,
  morphTime = 1,
  cooldownTime = 0.25,
  className,
  textClassName,
}: GooeyTextProps) {
  const filterId = React.useId()
  const text1Ref = React.useRef<HTMLSpanElement>(null)
  const text2Ref = React.useRef<HTMLSpanElement>(null)

  React.useEffect(() => {
    if (texts.length === 0) return

    let animationId = 0
    let textIndex = texts.length - 1
    let time = performance.now()
    let morph = 0
    let cooldown = cooldownTime

    const setMorph = (fraction: number) => {
      if (!text1Ref.current || !text2Ref.current) return

      const nextFraction = Math.max(fraction, 0.001)
      text2Ref.current.style.filter = `blur(${Math.min(8 / nextFraction - 8, 100)}px)`
      text2Ref.current.style.opacity = `${Math.pow(nextFraction, 0.4) * 100}%`

      const previousFraction = Math.max(1 - fraction, 0.001)
      text1Ref.current.style.filter = `blur(${Math.min(8 / previousFraction - 8, 100)}px)`
      text1Ref.current.style.opacity = `${Math.pow(previousFraction, 0.4) * 100}%`
    }

    const doCooldown = () => {
      morph = 0
      if (!text1Ref.current || !text2Ref.current) return

      text2Ref.current.style.filter = ''
      text2Ref.current.style.opacity = '100%'
      text1Ref.current.style.filter = ''
      text1Ref.current.style.opacity = '0%'
    }

    const doMorph = () => {
      morph -= cooldown
      cooldown = 0

      let fraction = morph / morphTime
      if (fraction > 1) {
        cooldown = cooldownTime
        fraction = 1
      }

      setMorph(fraction)
    }

    const animate = () => {
      animationId = requestAnimationFrame(animate)

      const newTime = performance.now()
      const shouldIncrementIndex = cooldown > 0
      const dt = (newTime - time) / 1000
      time = newTime
      cooldown -= dt

      if (cooldown <= 0) {
        if (shouldIncrementIndex) {
          textIndex = (textIndex + 1) % texts.length
          if (text1Ref.current && text2Ref.current) {
            text1Ref.current.textContent = texts[textIndex % texts.length]
            text2Ref.current.textContent = texts[(textIndex + 1) % texts.length]
          }
        }
        doMorph()
      } else {
        doCooldown()
      }
    }

    if (text1Ref.current && text2Ref.current) {
      text1Ref.current.textContent = texts[textIndex]
      text2Ref.current.textContent = texts[0]
    }

    animate()

    return () => cancelAnimationFrame(animationId)
  }, [texts, morphTime, cooldownTime])

  if (texts.length === 0) return null

  return (
    <div className={cn('relative', className)}>
      <svg className="absolute h-0 w-0" aria-hidden="true" focusable="false">
        <defs>
          <filter id={filterId}>
            <feColorMatrix
              in="SourceGraphic"
              type="matrix"
              values="1 0 0 0 0
                      0 1 0 0 0
                      0 0 1 0 0
                      0 0 0 255 -140"
            />
          </filter>
        </defs>
      </svg>

      <div className="flex items-center justify-center" style={{ filter: `url(#${filterId})` }}>
        <span
          ref={text1Ref}
          className={cn(
            'absolute inline-block select-none text-center text-6xl text-white md:text-[60pt]',
            textClassName,
          )}
        />
        <span
          ref={text2Ref}
          className={cn(
            'absolute inline-block select-none text-center text-6xl text-white md:text-[60pt]',
            textClassName,
          )}
        />
      </div>
    </div>
  )
}
