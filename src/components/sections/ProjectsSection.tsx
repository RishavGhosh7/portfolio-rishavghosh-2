import { projects } from '../../data/projects'
import { Reveal } from '../motion/Reveal'
import { LiquidButton } from '../ui/Button'

export function ProjectsSection() {
  return (
    <section id="projects" className="section panel">
      <Reveal>
        <h3>Projects</h3>
        <p className="mt-2 max-w-2xl text-sm text-zinc-500">
          Selected work — AI products, platforms, and full-stack builds.
        </p>
        <div className="project-grid">
          {projects.map((project) => (
            <article
              key={project.title}
              className={`project-card ${project.featured ? 'featured' : ''}`}
            >
              {project.featured && (
                <p className="mb-2 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-violet-400">
                  Featured
                </p>
              )}
              <h4>{project.title}</h4>
              <p>{project.description}</p>
              <div className="chip-grid">
                {project.stack.map((tech) => (
                  <span key={tech} className="chip">
                    {tech}
                  </span>
                ))}
              </div>
              <div className="links">
                {project.liveUrl && (
                  <LiquidButton asChild size="sm">
                    <a href={project.liveUrl} target="_blank" rel="noreferrer">
                      Live
                    </a>
                  </LiquidButton>
                )}
                {project.repoUrl && (
                  <LiquidButton asChild size="sm">
                    <a href={project.repoUrl} target="_blank" rel="noreferrer">
                      Repo
                    </a>
                  </LiquidButton>
                )}
              </div>
            </article>
          ))}
        </div>
      </Reveal>
    </section>
  )
}
