import { blogService } from "../../admin/shared/utils/supabase";

export interface FeaturedBlog {
  id: number;
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
    // Fetch blogs from database
    const result = await blogService.getBlogs({ 
      limit: 5, 
      published: true 
    });
    
    const blogs = Array.isArray(result) ? result : result.data || [];

    if (blogs && blogs.length > 0) {
      // Map database blogs to component format
      const mappedBlogs = blogs.slice(0, 5).map((blog: any): FeaturedBlog => {
        return {
          id: blog.id,
          title: blog.title,
          description:
            blog.excerpt ||
            blog.summary ||
            blog.description ||
            "Explore this blog on digital transformation.",
          image: blog.heroImage || "/images/Article 01_hero image.png",
          link: blog.slug ? `/blog/${blog.slug}` : `/media/blog/${blog.id}`,
          category: blog.category || "Digital Transformation",
          readTime: blog.readTime ? `${blog.readTime} min read` : "5 min read",
          date: blog.publishDate
            ? new Date(blog.publishDate).toLocaleDateString("en-US", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })
            : "Recently published",
        };
      });

      return {
        featuredBlog: mappedBlogs[0],
        relatedBlogs: mappedBlogs.slice(1, 5),
        success: true
      };
    } else {
      // No blogs found
      return {
        featuredBlog: null,
        relatedBlogs: [],
        success: true
      };
    }
  } catch (error) {
    console.error("❌ [Featured Blogs API] Error fetching blogs:", error);
    return {
      featuredBlog: null,
      relatedBlogs: [],
      success: false,
      error: error instanceof Error ? error.message : "Failed to fetch featured blogs"
    };
  }
};