export type ExperienceItem = {
  role: string
  company: string
  period: string
  points: string[]
}

export const experience: ExperienceItem[] = [
  {
    role: 'Lead SDE Intern',
    company: 'TechMaa',
    period: 'Jan 2026 - Mar 2026',
    points: [
      'Led intern team and architected AI Career Co-pilot with LLM + RAG.',
      'Scaled user activity from a few hundred to 10,000 users in 7 days.',
      'Led and was a part of the intern team which built an end-to-end AI Career Copilot leveraging LLMs and Retrieval-Augmented Generation (RAG) to analyze resumes, match job descriptions, and generate personalized career recommendations with improved relevance and accuracy.',
      'Designed and developed scalable backend services using Spring Boot with modular micro-services (resume parsing, job matching, recommendation engine), integrated with vector databases for semantic search and real-time processing.',
      'Implemented intelligent automation features including AI-generated cover letters, mock interview system, and job recommendation engine, enhancing user job application efficiency and providing actionable feedback.',
    ],
  },
  {
    role: 'SDE Intern',
    company: 'TechMaa',
    period: 'Nov 2025 - Dec 2025',
    points: [
      'Architected a RAG chatbot for semantic search over 1,000+ documents.',
      'Improved response generation speed by 30%.',
      'Built and deployed a RAG-based AI chatbot platform using React, Node.JS, LangChain, and ChromaDB, enabling semantic search across 12,000+ documents with less than 350ms retrieval latency, improving response generation speed by 30%.',
      'Architected a microservices-based backend with REST APIs and isolated session memory, supporting 500+ concurrent users while ensuring zero context leakage and high system reliability.',
      'Integrated local LLM inference (Ollama) and Whisper-based speech-to-text, achieving 90%+ transcription accuracy and reducing API failure rates by 25% through structured logging, validation, and fault-tolerant design.',
      'Collaborated with cross-functional teams to design scalable AI workflows and production-grade backend systems, improving system observability, debugging efficiency, and overall platform reliability.',
    ],
  },
]
