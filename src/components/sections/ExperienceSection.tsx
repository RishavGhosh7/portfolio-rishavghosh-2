import { experience } from '../../data/experience'
import { Reveal } from '../motion/Reveal'

export function ExperienceSection() {
  return (
    <section id="experience" className="section panel">
      <Reveal>
        <h3>Experience</h3>
        <div className="experience-list">
          {experience.map((item) => (
            <article key={`${item.company}-${item.role}`} className="experience-card">
              <header>
                <h4>{item.role}</h4>
                <p>
                  {item.company} · {item.period}
                </p>
              </header>
              <ul>
                {item.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </Reveal>
    </section>
  )
}
