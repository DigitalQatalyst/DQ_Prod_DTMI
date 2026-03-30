import { fetchLandingContentItems } from "./contentItemsSource";

export interface PredictionItem {
  id: string;
  title: string;
  description: string;
  image: string;
  link: string;
  category: string;
}

export interface PredictionAnalysisResponse {
  predictions: PredictionItem[];
  success: boolean;
  error?: string;
}

const fallback: PredictionItem[] = [
  { id: "f1", title: "Building a Data-Driven Culture in Modern Enterprises", description: "Learn practical strategies for fostering a data-driven mindset across your organization.", image: "/images/Article 02_hero image.png", link: "/marketplace/dtmi/prediction-analysis/data-driven-culture", category: "Data Strategy" },
  { id: "f2", title: "The Future of AI in Enterprise Decision Making", description: "Explore how artificial intelligence is transforming strategic decision-making processes.", image: "/images/Article 01_hero image.png", link: "/marketplace/dtmi/prediction-analysis/ai-decision-making", category: "AI & Analytics" },
  { id: "f3", title: "Cognitive Organizations: The Next Evolution", description: "Discover how cognitive technologies are reshaping organizational structures.", image: "/images/Article 03_hero image.png", link: "/marketplace/dtmi/prediction-analysis/cognitive-organizations", category: "Digital Transformation" },
  { id: "f4", title: "Digital Platforms: Redefining Business Models", description: "Understanding how digital platforms are creating new value ecosystems.", image: "/images/Article 01_hero image.png", link: "/marketplace/dtmi/prediction-analysis/digital-platforms", category: "Business Innovation" },
];

export const fetchPredictionAnalysis = async (): Promise<PredictionAnalysisResponse> => {
  try {
    const blogs = await fetchLandingContentItems(10);
    if (blogs && blogs.length > 0) {
      const analysisBlogs = blogs.filter((b) => {
        const text = (b.title + " " + b.excerpt).toLowerCase();
        return ["analysis", "prediction", "future", "trend", "forecast", "insight", "strategy"].some((kw) => text.includes(kw));
      });
      const source = analysisBlogs.length >= 4 ? analysisBlogs : blogs;
      const mapped = source.slice(0, 4).map((blog, index): PredictionItem => ({
        id: blog.id,
        title: blog.title,
        description: blog.excerpt || "Explore this prediction analysis on digital transformation.",
        image: blog.heroImage || `/images/Article 0${(index % 3) + 1}_hero image.png`,
        link: blog.slug ? `/blog/${blog.slug}` : `/media/blog/${blog.id}`,
        category: blog.category || "Digital Transformation",
      }));
      if (mapped.length >= 4) return { predictions: mapped, success: true };
      return { predictions: [...mapped, ...fallback.slice(0, 4 - mapped.length)], success: true };
    }
    return { predictions: fallback, success: true };
  } catch (error) {
    return { predictions: fallback, success: false, error: error instanceof Error ? error.message : "Failed to fetch" };
  }
};
