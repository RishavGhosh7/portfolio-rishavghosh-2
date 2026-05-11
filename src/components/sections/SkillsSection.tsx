import { skills } from '../../data/skills'
import { Reveal } from '../motion/Reveal'

type SkillDetail = {
  category: string
  icon?: 'dsa' | 'rag' | 'vector-db' | 'llm' | 'microservices'
  logo?: string
  mark: string
}

const skillDetails: Record<string, SkillDetail> = {
  'Data Structures and Algorithms': {
    category: 'Computer Science',
    icon: 'dsa',
    mark: 'DSA',
  },
  Java: {
    category: 'Language',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg',
    mark: 'JV',
  },
  JavaScript: {
    category: 'Language',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg',
    mark: 'JS',
  },
  'Spring Boot': {
    category: 'Backend',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/spring/spring-original.svg',
    mark: 'SB',
  },
  'Node.js': {
    category: 'Backend',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg',
    mark: 'ND',
  },
  'Express.js': {
    category: 'Backend',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg',
    mark: 'EX',
  },
  React: {
    category: 'Frontend',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg',
    mark: 'RC',
  },
  'REST APIs': {
    category: 'Architecture',
    mark: 'API',
  },
  MySQL: {
    category: 'Database',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg',
    mark: 'MY',
  },
  PostgreSQL: {
    category: 'Database',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg',
    mark: 'PG',
  },
  RAG: {
    category: 'AI Engineering',
    icon: 'rag',
    mark: 'RAG',
  },
  LangChain: {
    category: 'AI Engineering',
    logo: 'https://cdn.simpleicons.org/langchain/ffffff',
    mark: 'LC',
  },
  VectorDB: {
    category: 'AI Infrastructure',
    icon: 'vector-db',
    mark: 'VDB',
  },
  LLMs: {
    category: 'AI Engineering',
    icon: 'llm',
    mark: 'AI',
  },
  Docker: {
    category: 'DevOps',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg',
    mark: 'DK',
  },
  'CI/CD': {
    category: 'DevOps',
    logo: 'https://cdn.simpleicons.org/githubactions/ffffff',
    mark: 'CI',
  },
  Microservices: {
    category: 'Architecture',
    icon: 'microservices',
    mark: 'MS',
  },
  DevOps: {
    category: 'DevOps',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kubernetes/kubernetes-original.svg',
    mark: 'DO',
  },
}

function ConceptSkillIcon({ icon }: { icon: NonNullable<SkillDetail['icon']> }) {
  if (icon === 'dsa') {
    return (
      <svg viewBox="0 0 48 48" role="img">
        <path d="M24 9v9M14 25l-6 7M34 25l6 7M24 25v8" />
        <circle cx="24" cy="8" r="5" />
        <circle cx="14" cy="24" r="5" />
        <circle cx="34" cy="24" r="5" />
        <circle cx="8" cy="38" r="5" />
        <circle cx="24" cy="38" r="5" />
        <circle cx="40" cy="38" r="5" />
      </svg>
    )
  }

  if (icon === 'rag') {
    return (
      <svg viewBox="0 0 48 48" role="img">
        <path d="M13 8h16l7 7v25H13z" />
        <path d="M29 8v8h7M18 23h12M18 29h9" />
        <circle cx="32" cy="32" r="6" />
        <path d="m36.5 36.5 4.5 4.5M9 13l2-2M7 22h3M11 32l-2 2" />
      </svg>
    )
  }

  if (icon === 'vector-db') {
    return (
      <svg viewBox="0 0 48 48" role="img">
        <ellipse cx="24" cy="11" rx="13" ry="5" />
        <path d="M11 11v22c0 2.8 5.8 5 13 5s13-2.2 13-5V11" />
        <path d="M11 22c0 2.8 5.8 5 13 5s13-2.2 13-5" />
        <path d="M18 16l7 9 7-6M18 16l-4 11M32 19l3 11" />
        <circle cx="18" cy="16" r="2" />
        <circle cx="25" cy="25" r="2" />
        <circle cx="32" cy="19" r="2" />
      </svg>
    )
  }

  if (icon === 'llm') {
    return (
      <svg viewBox="0 0 48 48" role="img">
        <path d="M16 16a8 8 0 0 1 16 0 8 8 0 0 1 5 13 8 8 0 0 1-10 10 8 8 0 0 1-14-4 8 8 0 0 1-2-15 8 8 0 0 1 5-4Z" />
        <path d="M18 23h12M18 29h8M24 16v20M15 34h7M26 13v8M30 28h5" />
        <circle cx="18" cy="23" r="1.5" />
        <circle cx="30" cy="23" r="1.5" />
        <circle cx="26" cy="29" r="1.5" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 48 48" role="img">
      <rect x="7" y="8" width="12" height="12" rx="3" />
      <rect x="29" y="8" width="12" height="12" rx="3" />
      <rect x="18" y="28" width="12" height="12" rx="3" />
      <path d="M19 14h10M13 20v6l8 4M35 20v6l-8 4" />
    </svg>
  )
}

export function SkillsSection() {
  return (
    <section id="skills" className="section panel">
      <Reveal>
        <h3>Skills</h3>
        <p className="mt-2 max-w-2xl text-sm text-zinc-500">
          Tools, platforms, and engineering patterns I use to build reliable AI and
          full-stack systems.
        </p>

        <div className="skills-grid">
          {skills.map((skill) => {
            const detail = skillDetails[skill] ?? { category: 'Skill', mark: skill.slice(0, 2) }

            return (
              <article key={skill} className="skill-card">
                <div className="skill-logo" aria-hidden="true">
                  <span>{detail.mark}</span>
                  {detail.icon && <ConceptSkillIcon icon={detail.icon} />}
                  {detail.logo && (
                    <img
                      src={detail.logo}
                      alt=""
                      loading="lazy"
                      onError={(event) => {
                        event.currentTarget.style.display = 'none'
                      }}
                    />
                  )}
                </div>
                <div>
                  <h4>{skill}</h4>
                  <p>{detail.category}</p>
                </div>
              </article>
            )
          })}
        </div>
      </Reveal>
    </section>
  )
}
