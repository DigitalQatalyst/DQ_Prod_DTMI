import { blogService } from "../../admin/shared/utils/supabase";

export interface FeaturedArticle {
  id: number;
  title: string;
  description: string;
  author: string;
  category: string;
  date: string;
  link: string;
  image: string;
  featured?: boolean;
}

export interface FeaturedInsightsResponse {
  articles: FeaturedArticle[];
  success: boolean;
  error?: string;
}

// Helper function to format dates
const formatDate = (dateString: string | Date) => {
  if (!dateString) return "Recently published";
  
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "Recently published";
    
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  } catch (error) {
    return "Recently published";
  }
};

export const fetchFeaturedInsights = async (): Promise<FeaturedInsightsResponse> => {
  try {
    // Fetch blogs from database
    const result = await blogService.getBlogs({ 
      limit: 5, 
      published: true 
    });
    
    const blogs = Array.isArray(result) ? result : result.data || [];

    if (blogs && blogs.length > 0) {
      // Map database blogs to component format
      const mappedArticles = blogs
        .slice(0, 5)
        .map((article: any, index: number): FeaturedArticle => {
          return {
            id: article.id,
            title: article.title || "Untitled Blog",
            description:
              article.excerpt ||
              article.summary ||
              article.description ||
              article.content?.substring(0, 150) + "..." ||
              "Explore this featured blog on digital transformation.",
            author: 
              article.author?.name || 
              article.authorName ||
              "DTMI Team",
            category:
              article.category || 
              "Digital Transformation",
            date: formatDate(article.publishDate) || "Recently published",
            link: article.slug ? `/blog/${article.slug}` : `/media/blog/${article.id}`,
            image:
              article.heroImage ||
              article.thumbnailUrl ||
              article.image ||
              `/images/Article 0${(index % 3) + 1}_hero image.png`,
            featured: index === 0,
          };
        });

      return {
        articles: mappedArticles,
        success: true
      };
    } else {
      // No articles found
      return {
        articles: [],
        success: true
      };
    }
  } catch (error) {
    console.error("❌ [Featured Insights API] Error fetching articles:", error);
    return {
      articles: [],
      success: false,
      error: error instanceof Error ? error.message : "Failed to fetch featured insights"
    };
  }
};