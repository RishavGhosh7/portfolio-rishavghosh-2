export type Project = {
  title: string
  description: string
  stack: string[]
  liveUrl?: string
  repoUrl?: string
  featured?: boolean
}

export const projects: Project[] = [
  {
    title: 'AI Resume Co-pilot',
    featured: true,
    description:
      'AI-powered resume analyzer and generator with ATS scoring, JD matching, and resume generation workflows.',
    stack: ['React', 'Tailwind CSS', 'Node', 'Express', 'OpenAI SDK', 'jsPDF'],
    liveUrl:
      'https://ai-resume-copilot-2-5hpkbexw0-risgho21-8873s-projects.vercel.app/',
  },
  {
    title: 'Core-X',
    featured: true,
    description:
      'AI-based payments, travel, dining, offers, and expenses app with receipt scanning and agentic flows.',
    stack: ['React + Vite', 'Node', 'Express', 'PostgreSQL', 'OpenRouter AI SDK'],
    liveUrl: 'https://core-x-app-1.vercel.app/',
  },
  {
    title: 'Online Banking System',
    description:
      'Production-grade banking platform featuring auth, accounts, transfers, fraud controls, and event-driven architecture.',
    stack: ['Java', 'Spring Boot', 'MySQL', 'Redis', 'Kafka', 'Docker'],
    repoUrl: 'https://github.com/RishavGhosh7/online-banking-system-',
  },
  {
    title: 'Navigation Assistant',
    description:
      'Responsive navigation app with map-based search, route guidance, and voice-guided direction support.',
    stack: ['React', 'Vite', 'Node', 'Express', 'Leaflet', 'OpenStreetMap'],
    repoUrl: 'https://github.com/RishavGhosh7/Navigation-Assistant',
  },
  {
    title: 'URL Shortener Service Web App',
    description: 'Full-stack URL shortener with service and web interface.',
    stack: ['JavaScript', 'HTML', 'CSS', 'Node'],
    repoUrl: 'https://github.com/RishavGhosh7/url-shortener-service-webapp',
  },
  {
    title: 'AI Powered Movie Recommendation App',
    description: 'AI-assisted movie recommendation app for fast discovery.',
    stack: ['React', 'Vite', 'AI APIs'],
    liveUrl: 'https://68ec17df2bc0b31cc32f1a58--cheery-mooncake-1ca16c.netlify.app/',
  },
]
