export interface Project {
  id: string
  title: string
  subtitle: string
  type: string
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
    subtitle: 'Full-Stack Online Bidding Platform',
    type: 'Full-stack web application',
    description:
      'A full-stack bidding platform with React state management, Django APIs, and SQL-backed bidding data.',
    technologies: [
      'React',
      'TypeScript',
      'Zustand',
      'Python',
      'Django',
      'SQL',
    ],
    highlights: [
      'Led React frontend development and shared Zustand state architecture.',
      'Built Django REST APIs and SQL-backed bidding data models.',
    ],
    repoUrl: 'https://github.com/jqiwen/Hammerly',
    liveUrl: 'https://hammerly.jqiwen.com/',
    // TODO: Add a verified Hammerly product screenshot when one is available.
  },
  {
    id: 'gin-rummy',
    title: 'Gin Rummy Dozenal',
    subtitle: 'Real-Time Multiplayer Card Game',
    type: 'Full-stack web application',
    description:
      'A two-player Gin Rummy recreation with base-twelve rules, interactive card play, and API-backed game logic.',
    technologies: ['React', 'Next.js', 'TypeScript', 'Socket.IO', 'WebSocket', 'Google Cloud'],
    highlights: [
      'Built and deployed a full-stack real-time multiplayer card game supporting 2-player private rooms and synchronized game state through Socket.IO/WebSocket, with a server-authoritative backend for validating player actions and game rules.',
      'Implemented 8+ core game features, including room creation/joining, card dealing, draw/discard actions, turn management, knock validation, scoring, and multi-round progression for a custom 64-card base-12 Gin Rummy rule set.',
      'Deployed the static Next.js frontend through GitHub Pages and the Node.js/TypeScript game service on Google Cloud Run, configuring 0–1 instance autoscaling, HTTPS/custom domains, and GitHub Actions CI/CD for automated frontend builds and deployments.'
    ],
    repoUrl: 'https://github.com/jqiwen/Ginrummy',
    liveUrl: 'https://ginrummy.jqiwen.com',
    image: '/projects/gin-rummy.webp',
    imageAlt: 'Gin Rummy Poster',
    // TODO: Confirm whether to name the original Django backend or the repository's current Flask implementation.
  },
  {
    id: 'reddit-analysis',
    title: 'Reddit Comments Analysis',
    subtitle: 'NLP Classification Pipeline',
    type: 'Data & machine learning',
    description:
      'An NLP classification pipeline for annotated Reddit comments, covering label adjudication, TF-IDF features, and comparative model evaluation.',
    technologies: ['Python', 'scikit-learn', 'NLP', 'TF-IDF'],
    highlights: [
      'Measured annotation agreement and produced adjudicated ground-truth labels.',
      'Compared TF-IDF Logistic Regression and Random Forest classifiers against a random baseline.',
    ],
    repoUrl: 'https://github.com/jqiwen/reddit-comments-analysis-model',
    image: '/projects/reddit-labels.png',
    imageAlt: 'Ground-truth label distribution chart from the Reddit comments analysis',
    imageFit: 'contain',
  },
  {
    id: 'unemployment-prediction',
    title: 'Unemployment Rate Prediction',
    subtitle: 'Canadian Economic Forecasting',
    type: 'Machine learning',
    description:
      'A time-series forecasting project comparing Linear Regression and LSTM models for Canadian unemployment rates.',
    technologies: ['Python', 'TensorFlow', 'scikit-learn', 'Pandas'],
    highlights: [
      'Aligned Statistics Canada unemployment and macroeconomic time-series data.',
      'Evaluated an LSTM against an interpretable Linear Regression baseline.',
    ],
    repoUrl: 'https://github.com/Ericc-Hao/unemployment-rate-predict-model',
    image: '/projects/unemployment-predictions.png',
    imageAlt: 'Plot comparing actual unemployment rates with LSTM and linear regression predictions',
    imageFit: 'contain',
  },
]
