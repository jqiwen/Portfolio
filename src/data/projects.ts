export interface Project {
  id: string
  title: string
  subtitle: string
  type: string
  date: string
  classification: 'Personal Project' | 'Academic Project'
  description: string
  technologies: string[]
  highlights: string[]
  repoUrl?: string
  liveUrl?: string
  image?: string
  imageAlt?: string
  imageFit?: 'cover' | 'contain'
}

export const projects: Project[] = [
  {
    id: 'hammerly',
    title: 'Hammerly',
    subtitle: 'Online Bidding Platform with AI customer support',
    type: 'AI-powered full-stack platform',
    date: 'Jan 2026 — Aug 2026',
    classification: 'Personal Project',
    description:
      'An AI-powered full-stack bidding platform built with React and Spring Boot, featuring RAG-based customer support, Kafka-driven async processing, Redis caching, and Kubernetes deployment on GCP.',    
    technologies: [
      'React',
      'TypeScript',
      'Zustand',
      'Java',
      'Spring Boot',
      'Spring AI',
      'PostgreSQL',
      'Redis',
      'Kafka',
      'Docker',
      'Kubernetes',
      'GCP',
    ],
    highlights: [
      'Led development of a full-stack online bidding platform with 5+ core workflows and 15+ RESTful APIs, using React, Spring Boot, Spring Security, JWT authentication, PostgreSQL, and Redis for auction, bidding, account, and session data.',
      'Built a RAG-based AI customer support microservice integrating LLM APIs, embeddings, and vector retrieval, and introduced Kafka-based asynchronous processing to decouple user-facing APIs from latency-intensive AI workloads and absorb burst traffic.',
      'Containerized and deployed services on Kubernetes in GCP with horizontal scaling; conducted k6 load testing for 1,000+ concurrent users and monitored throughput, P95 latency, error rates, JVM metrics, Kafka lag, and service health with Prometheus to identify and optimize performance bottlenecks.'
    ],
    repoUrl: 'https://github.com/jqiwen/Hammerly',
    liveUrl: 'https://hammerly.jqiwen.com/',
    image: '/projects/hammerly.png',
    imageAlt: 'Hammerly Poster',
  },
  {
    id: 'gin-rummy',
    title: 'Gin Rummy Dozenal',
    subtitle: 'Real-Time Multiplayer Card Game',
    type: 'Full-stack web application',
    date: 'Sep 2024 - Apr 2025 ',
    classification: 'Personal Project',
    description:
      'A full-stack real-time multiplayer card game using Next.js, Socket.IO/WebSocket, and a server-authoritative backend for synchronized gameplay, rule validation, and private rooms.',    
    technologies: ['React', 'Next.js', 'TypeScript', 'Socket.IO', 'WebSocket', 'Google Cloud'],
    highlights: [
      'Built and deployed a full-stack real-time multiplayer card game supporting 2-player private rooms and synchronized game state through Socket.IO/WebSocket, with a server-authoritative backend for validating player actions and game rules.',
      'Implemented 8+ core game features, including room creation/joining, card dealing, draw/discard actions, turn management, knock validation, scoring, and multi-round progression for a custom 64-card base-12 Gin Rummy rule set.',
      'Deployed the static Next.js frontend through GitHub Pages and the socket game service on Google Cloud Run, configuring 0–1 instance autoscaling, and GitHub Actions CI/CD for automated builds and deployments.'
    ],
    repoUrl: 'https://github.com/jqiwen/Ginrummy',
    liveUrl: 'https://ginrummy.jqiwen.com',
    image: '/projects/gin-rummy.webp',
    imageAlt: 'Gin Rummy Poster',
    // TODO: Confirm whether to name the original Django backend or the repository's current Flask implementation.
  },
  // {
  //   id: 'reddit-analysis',
  //   title: 'Reddit Comments Analysis',
  //   subtitle: 'NLP Classification Pipeline',
  //   type: 'Data & machine learning',
  //   date: 'Jan 2025 - Apr 2025',
  //   classification: 'Academic Project',
  //   description:
  //     'An NLP classification pipeline for annotated Reddit comments, covering label adjudication, TF-IDF features, and comparative model evaluation.',
  //   technologies: ['Python', 'scikit-learn', 'NLP', 'TF-IDF'],
  //   highlights: [
  //     'Measured annotation agreement and produced adjudicated ground-truth labels.',
  //     'Compared TF-IDF Logistic Regression and Random Forest classifiers against a random baseline.',
  //   ],
  //   repoUrl: 'https://github.com/jqiwen/reddit-comments-analysis-model',
  //   image: '/projects/reddit-labels.png',
  //   imageAlt: 'Ground-truth label distribution chart from the Reddit comments analysis',
  //   imageFit: 'contain',
  // },
  // {
  //   id: 'unemployment-prediction',
  //   title: 'Unemployment Rate Prediction',
  //   subtitle: 'Canadian Economic Forecasting',
  //   type: 'Machine learning',
  //   date: 'Sep 2024 - Dec 2024',
  //   classification: 'Academic Project',
  //   description:
  //     'A time-series forecasting project comparing Linear Regression and LSTM models for Canadian unemployment rates.',
  //   technologies: ['Python', 'TensorFlow', 'scikit-learn', 'Pandas'],
  //   highlights: [
  //     'Aligned Statistics Canada unemployment and macroeconomic time-series data.',
  //     'Evaluated an LSTM against an interpretable Linear Regression baseline.',
  //   ],
  //   repoUrl: 'https://github.com/Ericc-Hao/unemployment-rate-predict-model',
  //   image: '/projects/unemployment-predictions.png',
  //   imageAlt: 'Plot comparing actual unemployment rates with LSTM and linear regression predictions',
  //   imageFit: 'contain',
  // },
]
