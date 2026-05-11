import { useReducedMotion } from '../../hooks/useReducedMotion'
import { GooeyText } from '../ui/GooeyText'

const loadingTexts = ['Rishav Ghosh', 'Software Engineer', 'AI Builder', 'Backend Systems']

export function LoadingPage() {
  const reducedMotion = useReducedMotion()

  return (
    <section className="loading-page" aria-label="Loading portfolio">
      <p className="loading-kicker">Preparing portfolio</p>
      {reducedMotion ? (
        <h1 className="loading-static-text">Rishav Ghosh</h1>
      ) : (
        <GooeyText
          texts={loadingTexts}
          morphTime={0.9}
          cooldownTime={0.25}
          className="loading-gooey"
          textClassName="loading-gooey-text"
        />
      )}
    </section>
  )
}
