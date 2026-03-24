import { blogService } from "../../admin/shared/utils/supabase";

export interface PredictionItem {
  id: number;
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

const fallbackPredictions: PredictionItem[] = [
  {
    id: 1,
    title: "Building a Data-Driven Culture in Modern Enterprises",
    description:
      "Learn practical strategies for fostering a data-driven mindset across your organization and empowering teams with insights.",
    image: "/images/Article 02_hero image.png",
    link: "/marketplace/dtmi/prediction-analysis/data-driven-culture",
    category: "Data Strategy",
  },
  {
    id: 2,
    title: "The Future of AI in Enterprise Decision Making",
    description:
      "Explore how artificial intelligence is transforming strategic decision-making processes in modern organizations.",
    image: "/images/Article 01_hero image.png",
    link: "/marketplace/dtmi/prediction-analysis/ai-decision-making",
    category: "AI & Analytics",
  },
  {
    id: 3,
    title: "Cognitive Organizations: The Next Evolution",
    description:
      "Discover how cognitive technologies are reshaping organizational structures and business operations.",
    image: "/images/Article 03_hero image.png",
    link: "/marketplace/dtmi/prediction-analysis/cognitive-organizations",
    category: "Digital Transformation",
  },
  {
    id: 4,
    title: "Digital Platforms: Redefining Business Models",
    description:
      "Understanding how digital platforms are creating new value ecosystems and competitive advantages.",
    image: "/images/Article 01_hero image.png",
    link: "/marketplace/dtmi/prediction-analysis/digital-platforms",
    category: "Business Innovation",
  },
];

export const fetchPredictionAnalysis = async (): Promise<PredictionAnalysisResponse> => {
  try {
    // Fetch blogs that could serve as prediction analysis content
    const result = await blogService.getBlogs({ 
      limit: 10, 
      published: true 
    });
    
    const blogs = Array.isArray(result) ? result : result.data || [];

    if (blogs && blogs.length > 0) {
      // Filter for blogs that might be analysis-type content
      // Look for keywords that suggest analytical content
      const analysisBlogs = blogs.filter((blog: any) => {
        const content = (blog.title + " " + (blog.excerpt || blog.description || "")).toLowerCase();
        return content.includes("analysis") || 
               content.includes("prediction") || 
               content.includes("future") || 
               content.includes("trend") || 
               content.includes("forecast") ||
               content.includes("insight") ||
               content.includes("strategy");
      });

      const blogsToUse = analysisBlogs.length >= 4 ? analysisBlogs : blogs;

      // Map database blogs to prediction format
      const mappedPredictions = blogsToUse
        .slice(0, 4)
        .map((blog: any, index: number): PredictionItem => {
          return {
            id: blog.id,
            title: blog.title,
            description:
              blog.excerpt ||
              blog.summary ||
              blog.description ||
              "Explore this prediction analysis on digital transformation.",
            image: blog.heroImage || `/images/Article 0${(index % 3) + 1}_hero image.png`,
            link: blog.slug ? `/blog/${blog.slug}` : `/media/blog/${blog.id}`,
            category: blog.category || "Digital Transformation",
          };
        });

      // If we have enough mapped predictions, use them; otherwise supplement with fallback
      if (mappedPredictions.length >= 4) {
        return {
          predictions: mappedPredictions,
          success: true
        };
      } else {
        // Combine real data with fallback to ensure we have 4 items
        const combined = [...mappedPredictions];
        const needed = 4 - mappedPredictions.length;
        combined.push(...fallbackPredictions.slice(0, needed));
        
        return {
          predictions: combined,
          success: true
        };
      }
    } else {
      // No blogs found, use fallback
      return {
        predictions: fallbackPredictions,
        success: true
      };
    }
  } catch (error) {
    console.error("❌ [Prediction Analysis API] Error fetching predictions:", error);
    return {
      predictions: fallbackPredictions,
      success: false,
      error: error instanceof Error ? error.message : "Failed to fetch prediction analysis"
    };
  }
};