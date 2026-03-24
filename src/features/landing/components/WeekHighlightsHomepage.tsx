import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { blogService, Blog } from "../../admin/shared/utils/supabase";

interface HighlightItem {
  id: number;
  title: string;
  description: string;
  image: string;
  link: string;
  category: string;
  type: string;
  date: string;
  readTime?: string;
}

export function WeekHighlightsHomepage() {
  const navigate = useNavigate();
  const [highlights, setHighlights] = useState<HighlightItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHighlights();
  }, []);

  const fetchHighlights = async () => {
    try {
      setLoading(true);
      
      // Fetch recent blogs from database
      const blogsResult = await blogService.getBlogs({ 
        limit: 4, 
        published: true 
      });
      
      const blogs = Array.isArray(blogsResult) ? blogsResult : blogsResult.data || [];
      
      const weekHighlights: HighlightItem[] = [];

      // Convert database blogs to highlight items
      blogs.slice(0, 2).forEach((blog: Blog, index: number) => {
        const shortDesc = blog.excerpt || 
          (blog.content ? blog.content.substring(0, 150) + "..." : "Key insights on digital transformation.");
        
        weekHighlights.push({
          id: blog.id,
          title: blog.title,
          description: shortDesc,
          image: blog.heroImage || `/images/Article 0${index + 1}_hero image.png`,
          link: blog.slug ? `/blog/${blog.slug}` : `/media/blog/${blog.id}`,
          category: blog.category || "Article",
          type: "Blog",
          date: new Date(blog.publishDate).toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          }),
          readTime: blog.readTime ? `${blog.readTime} min read` : "5 min read",
        });
      });

      // If we don't have enough blogs, add fallback content
      if (weekHighlights.length < 2) {
        const fallbackItems = [
          {
            id: 9001,
            title: "Expert Interview: Dr. Sarah Chen on AI Leadership",
            description:
              "An in-depth conversation with AI leadership expert Dr. Sarah Chen about navigating organizational transformation.",
            image: "/images/Article 03_hero image.png",
            link: "#",
            category: "Interview",
            type: "Frontier Watch",
            date: "March 10, 2026",
            readTime: "6 min read",
          },
          {
            id: 9002,
            title: "The Psychology of Digital Adoption in Enterprise",
            description:
              "An analytical article on understanding the human factors that drive successful digital transformation initiatives.",
            image: "/images/Article 01_hero image.png",
            link: "#",
            category: "Trend Alert",
            type: "Trends Alert",
            date: "March 8, 2026",
            readTime: "4 min read",
          },
        ];
        
        // Add fallback items to reach 2 items total
        const needed = 2 - weekHighlights.length;
        weekHighlights.push(...fallbackItems.slice(0, needed));
      }

      setHighlights(weekHighlights.slice(0, 2));
      setLoading(false);
    } catch (error) {
      console.error("Error fetching week highlights:", error);
      // Fallback data
      setHighlights([
        {
          id: 1,
          title: "At 250, sustaining America's competitive edge",
          description:
            "America's history of reinvention holds compelling lessons for the future.",
          image: "/images/Article 01_hero image.png",
          link: "/blog/americas-competitive-edge",
          category: "Report",
          type: "Blog",
          date: "March 9, 2026",
          readTime: "5 min read",
        },
        {
          id: 2,
          title:
            "Why Traditional Business Models Are Doomed in the Age of Cognitive Organizations",
          description:
            "For decades, traditional business models have served as the foundation for organizations.",
          image: "/images/Article 02_hero image.png",
          link: "/blog/traditional-business-models",
          category: "Article",
          type: "Article",
          date: "March 4, 2026",
          readTime: "8 min read",
        },
      ]);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center text-gray-600">Loading highlights...</div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            EDITOR'S PICK
          </h2>
        </div>

        {/* Two Big Cards Side by Side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {highlights.slice(0, 2).map((item) => (
            <div
              key={item.id}
              className="cursor-pointer group"
              onClick={() => navigate(item.link)}
            >
              {/* Image */}
              <div className="relative h-64 lg:h-80 rounded-lg overflow-hidden mb-6">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              {/* Content */}
              <div>
                <span className="text-sm text-gray-600 mb-3 block">
                  {item.category}
                </span>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors leading-tight">
                  {item.title}
                  <svg
                    className="inline-block ml-2 w-5 h-5 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  <em>{item.date}</em> - {item.description}
                </p>
                {item.readTime && (
                  <span className="text-sm text-gray-500">{item.readTime}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
