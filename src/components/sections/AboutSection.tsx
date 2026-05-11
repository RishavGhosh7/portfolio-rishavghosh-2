import { education } from '../../data/education'
import { profile } from '../../data/profile'
import { skills } from '../../data/skills'
import { Reveal } from '../motion/Reveal'

export function AboutSection() {
  return (
    <section id="about" className="section panel">
      <Reveal>
        <h3>About</h3>
        <p className="mt-0 max-w-3xl text-base leading-relaxed text-zinc-400">
          I build intelligent software across AI, backend systems, and full-stack applications —
          shipping reliable systems with measurable impact.
        </p>
        <div className="meta">
          <span>{profile.location}</span>
          <a href={`mailto:${profile.email}`}>{profile.email}</a>
        </div>

        <h4 className="mt-8 font-display text-sm font-semibold uppercase tracking-wider text-zinc-500">
          Education
        </h4>
        <ul className="mt-3 space-y-4 text-sm text-zinc-400">
          {education.map((item) => (
            <li key={item.institution}>
              <p className="font-medium text-zinc-200">{item.institution}</p>
              <p className="text-zinc-500">
                {item.degree} · {item.location} · {item.period}
              </p>
            </li>
          ))}
        </ul>

        <h4 className="mt-8 font-display text-sm font-semibold uppercase tracking-wider text-zinc-500">
          Skills
        </h4>
        <div className="chip-grid">
          {skills.map((skill) => (
            <span key={skill} className="chip">
              {skill}
            </span>
          ))}
        </div>
      </Reveal>
    </section>
  )
}
