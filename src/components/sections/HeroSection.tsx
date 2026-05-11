import type { MouseEvent } from 'react'
import { profile } from '../../data/profile'
import { Reveal } from '../motion/Reveal'
import { LiquidButton } from '../ui/Button'

type HeroSectionProps = {
  onNavigate?: (href: string) => void
}

export function HeroSection({ onNavigate }: HeroSectionProps) {
  const handleProjectsClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (!onNavigate || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
    event.preventDefault()
    onNavigate('/projects')
  }

  return (
    <section id="hero" className="section hero-section">
      <Reveal>
        <h1>{profile.name}</h1>
        <h2>{profile.headline}</h2>
        <p className="lead">{profile.summary}</p>
        <div className="hero-cta">
          <LiquidButton asChild size="xl">
            <a href="/projects" onClick={handleProjectsClick}>
              View Projects
            </a>
          </LiquidButton>
          <LiquidButton asChild size="xl">
            <a href={profile.resumeUrl} download>
              Download Resume
            </a>
          </LiquidButton>
        </div>
      </Reveal>
    </section>
  )
}
