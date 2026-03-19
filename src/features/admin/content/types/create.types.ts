export type ContentType =
  | "blog"
  | "article"
  | "research"
  | "whitepaper"
  | "case-study"
  | "expert-interview"
  | "podcast"
  | "prediction-analysis";

export interface InterviewData {
  introduction: string;
  insights: string[];
  sections: { question: string; answer: string }[];
  conclusion: string;
  location: string;
  interviewDate: string;
}

export interface ResearchData {
  authors: string[];
  publicationDate: string;
  journalName: string;
  pages: number;
  citations: number;
  views: number;
  abstract: string;
  keywords: string;
  introduction: string;
  literatureReview: string;
  methodology: string;
  results: string;
  discussion: string;
  conclusion: string;
  references: string;
  appendices: string;
}

export interface PodcastEpisode {
  title: string;
  episodeNumber: number;
  duration: string;
  showNotes: string;
  audioUrl: string;
  audioFile: File | null;
  thumbnailUrl: string;
  thumbnailFile: File | null;
  thumbnailPreview: string;
}

export interface PodcastData {
  showTitle: string;
  episodes: PodcastEpisode[];
  topicsCovered: string[];
  spotifyUrl: string;
  downloadUrl: string;
  isNew: boolean;
  showDescription: string;
  showColor: string;
  thumbnailUrl: string;
}

export interface PredictionStat {
  icon: string;
  value: string;
  label: string;
  trend: string;
}

export interface PredictionMetric {
  title: string;
  value: string;
  percentage: number;
  trend: "up" | "warning";
  description: string;
}

export interface PredictionTimelinePhase {
  year: string;
  title: string;
  description: string;
  milestones: string[];
  adoptionRate: number;
}

export interface PredictionScenario {
  id: string;
  name: string;
  probability: number;
  description: string;
  timeline: string;
  keyDrivers: string[];
  outcomes: { positive: string[]; negative: string[] };
}

export interface PredictionSignal {
  title: string;
  category: string;
  strength: string;
  impact: string;
  description: string;
  keyIndicators: string[];
}

export interface PredictionData {
  introduction: string;
  visualSummary: {
    title: string;
    subtitle: string;
    stats: PredictionStat[];
    keyTakeaway: string;
  };
  executiveSummary: {
    summary: string;
    keyInsights: string[];
  };
  metrics: PredictionMetric[];
  timeline: PredictionTimelinePhase[];
  scenarios: PredictionScenario[];
  signals: PredictionSignal[];
  detailedSections: { title: string; content: string }[];
}

export interface WhitepaperChapter {
  id?: string;
  title: string;
  content: string;
  heroImage: File | null;
  heroImagePreview: string;
}

export interface WhitepaperReference {
  text: string;
  url: string;
  authors: string;
  year: string;
  title: string;
  source: string;
}

export interface WhitepaperData {
  hero: {
    title: string;
    subtitle: string;
    volumeLabel: string;
    heroImage: File | null;
    heroImagePreview: string;
  };
  hookText: string;
  foreword: {
    title: string;
    content: string;
    heroImage: File | null;
    heroImagePreview: string;
    author: {
      name: string;
      title: string;
      image: File | null;
      imagePreview: string;
    };
  };
  executiveSummary: {
    title: string;
    content: string;
    heroImage: File | null;
    heroImagePreview: string;
  };
  chapters: WhitepaperChapter[];
  conclusion: {
    title: string;
    content: string;
    heroImage: File | null;
    heroImagePreview: string;
  };
  references: {
    title: string;
    heroImage: File | null;
    heroImagePreview: string;
    items: WhitepaperReference[];
  };
  footer: {
    copyright: string;
  };
}
