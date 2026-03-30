import { fetchLandingContentItems } from "./contentItemsSource";

export interface FeaturedBlog {
  id: string;
  title: string;
  description: string;
  image: string;
  link: string;
  category: string;
  readTime?: string;
  date: string;
}

export interface FeaturedBlogsResponse {
  featuredBlog: FeaturedBlog | null;
  relatedBlogs: FeaturedBlog[];
  success: boolean;
  error?: string;
}

export const fetchFeaturedBlogs = async (): Promise<FeaturedBlogsResponse> => {
  try {
    const blogs = await fetchLandingContentItems(5);
    if (blogs && blogs.length > 0) {
      const mapped = blogs.slice(0, 5).map((blog): FeaturedBlog => ({
        id: blog.id,
        title: blog.title,
        description: blog.excerpt || "Explore this blog on digital transformation.",
        image: blog.heroImage || "/images/Article 01_hero image.png",
        link: blog.slug ? `/blog/${blog.slug}` : `/media/blog/${blog.id}`,
        category: blog.category || "Digital Transformation",
        readTime: blog.readTime ? `${blog.readTime} min read` : "5 min read",
        date: blog.publishDate
          ? new Date(blog.publishDate).toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric" })
          : "Recently published",
      }));
      return { featuredBlog: mapped[0], relatedBlogs: mapped.slice(1, 5), success: true };
    }
    return { featuredBlog: null, relatedBlogs: [], success: true };
  } catch (error) {
    return { featuredBlog: null, relatedBlogs: [], success: false, error: error instanceof Error ? error.message : "Failed to fetch" };
  }
};
