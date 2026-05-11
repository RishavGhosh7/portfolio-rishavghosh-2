import { lazy, Suspense, useCallback, useEffect, useState } from 'react'
import { LoadingPage } from './components/layout/LoadingPage'
import { OfflinePage } from './components/layout/OfflinePage'
import { PageShell } from './components/layout/PageShell'

const TopNav = lazy(async () => {
  const mod = await import('./components/ui/TopNav')
  return { default: mod.TopNav }
})

const HeroSection = lazy(async () => {
  const mod = await import('./components/sections/HeroSection')
  return { default: mod.HeroSection }
})

const AboutSection = lazy(async () => {
  const mod = await import('./components/sections/AboutSection')
  return { default: mod.AboutSection }
})

const ExperienceSection = lazy(async () => {
  const mod = await import('./components/sections/ExperienceSection')
  return { default: mod.ExperienceSection }
})

const SkillsSection = lazy(async () => {
  const mod = await import('./components/sections/SkillsSection')
  return { default: mod.SkillsSection }
})

const ProjectsSection = lazy(async () => {
  const mod = await import('./components/sections/ProjectsSection')
  return { default: mod.ProjectsSection }
})

const ContactSection = lazy(async () => {
  const mod = await import('./components/sections/ContactSection')
  return { default: mod.ContactSection }
})

type Route = '/' | '/projects' | '/skills' | '/experience' | '/contact'

const routes = new Set<Route>(['/', '/projects', '/skills', '/experience', '/contact'])

function getRoute(): Route {
  const pathname = window.location.pathname as Route
  return routes.has(pathname) ? pathname : '/'
}

function scrollToHash(hash: string) {
  const id = hash.replace('#', '')
  const target = document.getElementById(id)
  target?.scrollIntoView({ block: 'start' })
}

function HomePage({ onNavigate }: { onNavigate: (href: string) => void }) {
  return (
    <>
      <HeroSection onNavigate={onNavigate} />
      <AboutSection />
    </>
  )
}

function CurrentPage({ route, onNavigate }: { route: Route; onNavigate: (href: string) => void }) {
  if (route === '/projects') return <ProjectsSection />
  if (route === '/skills') return <SkillsSection />
  if (route === '/experience') return <ExperienceSection />
  if (route === '/contact') return <ContactSection />
  return <HomePage onNavigate={onNavigate} />
}

function App() {
  const [route, setRoute] = useState<Route>(getRoute)
  const [isLoading, setIsLoading] = useState(true)
  const [isOnline, setIsOnline] = useState(() => navigator.onLine)

  useEffect(() => {
    const loadingTimer = window.setTimeout(() => setIsLoading(false), 1800)
    return () => window.clearTimeout(loadingTimer)
  }, [])

  useEffect(() => {
    const updateOnlineStatus = () => setIsOnline(navigator.onLine)

    window.addEventListener('online', updateOnlineStatus)
    window.addEventListener('offline', updateOnlineStatus)
    return () => {
      window.removeEventListener('online', updateOnlineStatus)
      window.removeEventListener('offline', updateOnlineStatus)
    }
  }, [])

  useEffect(() => {
    const updateRoute = () => setRoute(getRoute())

    window.addEventListener('popstate', updateRoute)
    window.addEventListener('portfolio:navigate', updateRoute)
    return () => {
      window.removeEventListener('popstate', updateRoute)
      window.removeEventListener('portfolio:navigate', updateRoute)
    }
  }, [])

  useEffect(() => {
    if (!window.location.hash) {
      window.scrollTo({ top: 0 })
    }
  }, [route])

  const navigate = useCallback((href: string) => {
    const nextUrl = new URL(href, window.location.origin)
    const nextPath = `${nextUrl.pathname}${nextUrl.hash}`
    const currentPath = `${window.location.pathname}${window.location.hash}`

    if (nextPath !== currentPath) {
      window.history.pushState(null, '', nextPath)
    }

    window.dispatchEvent(new Event('portfolio:navigate'))
    window.setTimeout(() => {
      if (nextUrl.hash) {
        scrollToHash(nextUrl.hash)
        return
      }
      window.scrollTo({ top: 0 })
    })
  }, [])

  return (
    <PageShell>
      <Suspense fallback={<LoadingPage />}>
        {!isOnline ? (
          <OfflinePage />
        ) : isLoading ? (
          <LoadingPage />
        ) : (
          <>
            <TopNav activePath={route} onNavigate={navigate} />
            <CurrentPage route={route} onNavigate={navigate} />
          </>
        )}
      </Suspense>
    </PageShell>
  )
}

export default App
