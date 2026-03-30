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

const formatDate = (dateString: string | Date) => {
  if (!dateString) return "Recently published";
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return "Recently published";
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
};

export const fetchFeaturedInsights = async (): Promise<FeaturedInsightsResponse> => {
  try {
    const blogs = await fetchLandingContentItems(5);
    if (blogs && blogs.length > 0) {
      const articles = blogs.slice(0, 5).map((article, index): FeaturedArticle => ({
        id: article.id,
        title: article.title || "Untitled Blog",
        description: article.excerpt || article.content?.substring(0, 150) + "..." || "Explore this featured blog.",
        author: article.authorName || "DTMI Team",
        category: article.category || "Digital Transformation",
        date: formatDate(article.publishDate),
        link: article.slug ? `/blog/${article.slug}` : `/media/blog/${article.id}`,
        image: article.heroImage || `/images/Article 0${(index % 3) + 1}_hero image.png`,
        featured: index === 0,
      }));
      return { articles, success: true };
    }
    return { articles: [], success: true };
  } catch (error) {
    return { articles: [], success: false, error: error instanceof Error ? error.message : "Failed to fetch" };
  }
};
