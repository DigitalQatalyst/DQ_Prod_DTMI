import { fetchLandingContentItems, type LandingContentItem } from "./contentItemsSource";

export interface WeekHighlightItem {
  id: string;
  title: string;
  description: string;
  image: string;
  link: string;
  category: string;
  type: string;
  date: string;
  readTime?: string;
}

export interface WeekHighlightsResponse {
  highlights: WeekHighlightItem[];
  success: boolean;
  error?: string;
}

const fallback: WeekHighlightItem[] = [
  {
    id: "9001",
    title: "Expert Interview: Dr. Sarah Chen on AI Leadership",
    description: "An in-depth conversation with AI leadership expert Dr. Sarah Chen about navigating organizational transformation.",
    image: "/images/Article 03_hero image.png",
    link: "#",
    category: "Interview",
    type: "Frontier Watch",
    date: "March 10, 2026",
    readTime: "6 min read",
  },
  {
    id: "9002",
    title: "The Psychology of Digital Adoption in Enterprise",
    description: "An analytical article on understanding the human factors that drive successful digital transformation initiatives.",
    image: "/images/Article 01_hero image.png",
    link: "#",
    category: "Trend Alert",
    type: "Trends Alert",
    date: "March 8, 2026",
    readTime: "4 min read",
  },
];

export const fetchWeekHighlights = async (): Promise<WeekHighlightsResponse> => {
  try {
    const blogs = await fetchLandingContentItems(4);
    const highlights: WeekHighlightItem[] = blogs.slice(0, 2).map((blog: LandingContentItem, index: number) => ({
      id: blog.id,
      title: blog.title,
      description: blog.excerpt || (blog.content ? blog.content.substring(0, 150) + "..." : "Key insights on digital transformation."),
      image: blog.heroImage || `/images/Article 0${index + 1}_hero image.png`,
      link: blog.slug ? `/blog/${blog.slug}` : `/media/blog/${blog.id}`,
      category: blog.category || "Article",
      type: "Blog",
      date: new Date(blog.publishDate).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
      readTime: blog.readTime ? `${blog.readTime} min read` : "5 min read",
    }));

    if (highlights.length < 2) highlights.push(...fallback.slice(0, 2 - highlights.length));
    return { highlights: highlights.slice(0, 2), success: true };
  } catch (error) {
    return { highlights: fallback.slice(0, 2), success: false, error: error instanceof Error ? error.message : "Failed to fetch" };
  }
};
