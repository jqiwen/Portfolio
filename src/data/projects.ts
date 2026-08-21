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
      'A full-stack bidding platform built by an Agile team. I owned key frontend flows, shared application state, and backend data/API work.',
    technologies: [
      'React',
      'TypeScript',
      'Zustand',
      'Python',
      'Django',
      'SQL',
      'REST API',
    ],
    highlights: [
      'Led frontend development and translated user stories into interactive React flows.',
      'Designed shared Zustand state for bidding listings and cross-page UI behavior.',
      'Created bidding data models and Django REST APIs for backend persistence.',
    ],
    repoUrl: 'https://github.com/jqiwen/Hammerly',
    // TODO: replace with actual Hammerly deployed URL
    liveUrl: 'https://hammerly.jqiwen.com/',
    // TODO: Add a verified Hammerly product screenshot when one is available.
  },
  {
    id: 'gin-rummy',
    title: 'Gin Rummy Twist',
    subtitle: 'Interactive Full-Stack Card Game',
    type: 'Full-stack web application',
    description:
      'A digital recreation of two-player Gin Rummy with a base-twelve ruleset, interactive card play, and API-backed game logic.',
    technologies: ['React', 'TypeScript', 'Redux', 'Python', 'REST API', 'Google Cloud'],
    highlights: [
      'Modeled game state for a custom 64-card dozenal deck.',
      'Built responsive card interactions and clear state updates for play.',
      'Connected the TypeScript interface to a Python API and cloud-hosted services.',
    ],
    repoUrl: 'https://github.com/jqiwen/Ginrummy',
    liveUrl: 'https://ginrummy.jqiwen.com',
    image: '/projects/gin-rummy.webp',
    imageAlt: 'Gin Rummy Twist game artwork showing a card table and custom cards',
    // TODO: Confirm whether to name the original Django backend or the repository's current Flask implementation.
  },
  {
    id: 'reddit-analysis',
    title: 'Reddit Comments Analysis',
    subtitle: 'NLP Classification Pipeline',
    type: 'Data & machine learning',
    description:
      'A text-classification workflow for annotated Reddit comments, from ground-truth adjudication through feature extraction and model evaluation.',
    technologies: ['Python', 'scikit-learn', 'NLP', 'TF-IDF'],
    highlights: [
      'Measured annotation agreement with Cohen’s kappa and produced adjudicated labels.',
      'Extracted unigram and bigram TF-IDF features from comment text.',
      'Compared random baselines with Logistic Regression and Random Forest classifiers.',
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
      'A time-series project comparing Linear Regression and LSTM models for short-term Canadian unemployment-rate forecasting.',
    technologies: ['Python', 'TensorFlow', 'scikit-learn', 'Pandas'],
    highlights: [
      'Integrated historical unemployment and macroeconomic data from Statistics Canada.',
      'Built preprocessing for aligned time-series features and seasonal signals.',
      'Evaluated an LSTM against an interpretable Linear Regression baseline.',
    ],
    repoUrl: 'https://github.com/Ericc-Hao/unemployment-rate-predict-model',
    image: '/projects/unemployment-predictions.png',
    imageAlt: 'Plot comparing actual unemployment rates with LSTM and linear regression predictions',
    imageFit: 'contain',
  },
]
