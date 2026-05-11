import { useState, type CSSProperties, type MouseEvent } from 'react'
import { profile } from '../../data/profile'
import { LiquidButton } from './Button'

type TopNavProps = {
  activePath?: string
  onNavigate?: (href: string) => void
}

const navItems = [
  { href: '/projects', label: 'Projects' },
  { href: '/skills', label: 'Skills' },
  { href: '/experience', label: 'Experience' },
  { href: '/contact', label: 'Contact' },
]

function handleInternalNavigation(
  href: string,
  onNavigate?: (href: string) => void,
): (event: MouseEvent<HTMLAnchorElement>) => void {
  return (event) => {
    if (!onNavigate || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
    event.preventDefault()
    onNavigate(href)
  }
}

export function TopNav({ activePath = '/', onNavigate }: TopNavProps) {
  const activeIndex = navItems.findIndex((item) => activePath === item.href)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const sliderIndex = hoveredIndex ?? activeIndex

  return (
    <header className="top-nav">
      <a className="brand" href="/" onClick={handleInternalNavigation('/', onNavigate)}>
        {profile.name}
      </a>
      <nav
        aria-label="Primary"
        className="nav-switcher"
        style={
          {
            '--active-index': Math.max(sliderIndex, 0),
            '--nav-count': navItems.length,
          } as CSSProperties
        }
        onMouseLeave={() => setHoveredIndex(null)}
      >
        <span aria-hidden="true" className="nav-liquid-slider" data-visible={sliderIndex >= 0} />
        {navItems.map((item, index) => (
          <a
            key={item.href}
            className="nav-switcher-link"
            href={item.href}
            aria-current={activePath === item.href ? 'page' : undefined}
            onMouseEnter={() => setHoveredIndex(index)}
            onFocus={() => setHoveredIndex(index)}
            onBlur={() => setHoveredIndex(null)}
            onClick={handleInternalNavigation(item.href, onNavigate)}
          >
            {item.label}
          </a>
        ))}
      </nav>
      <LiquidButton asChild size="lg">
        <a href={profile.resumeUrl} download>
          Download Resume
        </a>
      </LiquidButton>
    </header>
  )
}
