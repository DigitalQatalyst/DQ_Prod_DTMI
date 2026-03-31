import { fetchLandingContentItems } from "./contentItemsSource";

export interface FeaturedArticle {
  id: string;
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

  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) {
    return "Recently published";
  }

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

export const fetchFeaturedInsights =
  async (): Promise<FeaturedInsightsResponse> => {
    try {
      const blogs = await fetchLandingContentItems(5);

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
              author: article.authorName || "DTMI Team",
              category: article.category || "Digital Transformation",
              date: formatDate(article.publishDate) || "Recently published",
              link: article.slug
                ? `/blog/${article.slug}`
                : `/media/blog/${article.id}`,
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
          success: true,
        };
      } else {
        // No articles found
        return {
          articles: [],
          success: true,
        };
      }
    } catch (error) {
      console.error(
        "❌ [Featured Insights API] Error fetching articles:",
        error,
      );
      return {
        articles: [],
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to fetch featured insights",
      };
    }
  };
