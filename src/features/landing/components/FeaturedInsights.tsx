import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { blogService } from "../../admin/shared/utils/supabase";

interface Article {
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

export function FeaturedInsights() {
  const navigate = useNavigate();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [featuredIndex, setFeaturedIndex] = useState(0);

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

  useEffect(() => {
    fetchArticles();
  }, []);

  // Auto-rotate featured article every 30 seconds
  useEffect(() => {
    if (articles.length === 0) return;

    const interval = setInterval(() => {
      setFeaturedIndex((prevIndex) => (prevIndex + 1) % articles.length);
    }, 30000); // 30 seconds

    return () => clearInterval(interval);
  }, [articles.length]);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      
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
          .map((article: any, index: number) => {
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
        setArticles(mappedArticles);
      } else {
        // No articles found - set empty state
        setArticles([]);
      }
    } catch (error) {
      console.error("❌ [Latest Perspectives] Error fetching articles:", error);
      setArticles([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Latest Perspectives
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover the latest insights and perspectives from our digital transformation experts
            </p>
          </div>
          <div className="flex justify-center items-center py-20">
            <div className="flex flex-col items-center space-y-6">
              <div className="relative">
                <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-200"></div>
                <div className="absolute top-0 left-0 animate-spin rounded-full h-16 w-16 border-4 border-brand-coral border-t-transparent"></div>
              </div>
              <div className="text-center">
                <p className="text-gray-700 font-medium text-lg mb-2">Loading latest content</p>
                <p className="text-gray-500 text-sm">Fetching the most recent articles and insights...</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (articles.length === 0) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Latest Perspectives
            </h2>
            <p className="text-lg text-gray-600">No articles available at the moment.</p>
          </div>
        </div>
      </section>
    );
  }

  // Rotate articles based on featuredIndex
  const rotatedArticles = [
    ...articles.slice(featuredIndex),
    ...articles.slice(0, featuredIndex),
  ];

  const featuredArticle = rotatedArticles[0];
  const leftArticles = rotatedArticles.slice(1, 3);
  const rightArticles = rotatedArticles.slice(3, 5);

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            THE WEEK'S HIGHLIGHTS
          </h2>
          <button
            onClick={() => navigate("/marketplace/dtmi?tab=insights")}
            className="text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-2 transition-colors"
          >
            Browse All Insights
            <svg
              className="w-5 h-5"
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
          </button>
        </div>

        {/* Three-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
          {/* Left Column - Small Articles */}
          <div className="lg:col-span-3 space-y-6">
            {leftArticles.map((article) => (
              <div
                key={article.id}
                className="group bg-white rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer"
                onClick={() => navigate(article.link)}
              >
                {/* Image */}
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="text-sm font-bold text-gray-900 mb-2 group-hover:text-brand-coral transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                  <div className="text-xs text-gray-600">{article.date}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Center Column - Featured Article */}
          <div className="lg:col-span-6">
            <div
              className="group bg-white rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer h-full"
              onClick={() => navigate(featuredArticle.link)}
            >
              {/* Large Image */}
              <div className="relative h-80 overflow-hidden">
                <img
                  src={featuredArticle.image}
                  alt={featuredArticle.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {/* Trending Badge */}
                <div className="absolute bottom-4 left-4">
                  <span className="bg-red-600 text-white text-xs font-bold px-3 py-1 uppercase rounded">
                    Trending
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-brand-coral transition-colors line-clamp-2">
                  {featuredArticle.title}
                </h3>
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  {featuredArticle.description}
                </p>
                <div className="text-xs text-gray-500">
                  {featuredArticle.date}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Small Articles */}
          <div className="lg:col-span-3 space-y-6">
            {rightArticles.map((article) => (
              <div
                key={article.id}
                className="group bg-white rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer"
                onClick={() => navigate(article.link)}
              >
                {/* Image */}
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="text-sm font-bold text-gray-900 mb-2 group-hover:text-brand-coral transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                  <div className="text-xs text-gray-600">{article.date}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Row - Text-Only Headlines with Scrolling Animation */}
        <div className="relative overflow-hidden">
          <div className="animate-scroll flex gap-6 whitespace-nowrap">
            {/* First set of dynamic headlines */}
            {(articles && articles.length > 0) ? (
              articles.map((article, index) => (
                <div
                  key={`headline-${index}`}
                  className="group cursor-pointer inline-block min-w-max"
                  onClick={() => navigate(article.link)}
                >
                  <h4 className="text-sm font-semibold text-gray-900 hover:text-brand-coral transition-colors">
                    {article.title}
                  </h4>
                </div>
              ))
            ) : (
              // Fallback static headlines when no dynamic content is available
              <>
                <div
                  className="group cursor-pointer inline-block min-w-max"
                  onClick={() => navigate("/dtmi/article/ai-governance-frameworks")}
                >
                  <h4 className="text-sm font-semibold text-gray-900 hover:text-brand-coral transition-colors">
                    AI governance frameworks reshape enterprise decisions
                  </h4>
                </div>
                <div
                  className="group cursor-pointer inline-block min-w-max"
                  onClick={() =>
                    navigate("/dtmi/article/digital-transformation-roi")
                  }
                >
                  <h4 className="text-sm font-semibold text-gray-900 hover:text-brand-coral transition-colors">
                    73% of digital transformations fail to deliver ROI
                  </h4>
                </div>
                <div
                  className="group cursor-pointer inline-block min-w-max"
                  onClick={() =>
                    navigate("/dtmi/article/cognitive-automation-adoption")
                  }
                >
                  <h4 className="text-sm font-semibold text-gray-900 hover:text-brand-coral transition-colors">
                    Cognitive automation accelerates in financial services
                  </h4>
                </div>
                <div
                  className="group cursor-pointer inline-block min-w-max"
                  onClick={() =>
                    navigate("/dtmi/article/digital-workplace-evolution")
                  }
                >
                  <h4 className="text-sm font-semibold text-gray-900 hover:text-brand-coral transition-colors">
                    Hybrid models redefine productivity metrics
                  </h4>
                </div>
                <div
                  className="group cursor-pointer inline-block min-w-max"
                  onClick={() =>
                    navigate("/dtmi/article/data-sovereignty-challenges")
                  }
                >
                  <h4 className="text-sm font-semibold text-gray-900 hover:text-brand-coral transition-colors">
                    Data sovereignty emerges as top enterprise concern
                  </h4>
                </div>
              </>
            )}
            {/* Duplicate set for seamless loop */}
            {(articles && articles.length > 0) ? (
              articles.map((article, index) => (
                <div
                  key={`headline-duplicate-${index}`}
                  className="group cursor-pointer inline-block min-w-max"
                  onClick={() => navigate(article.link)}
                >
                  <h4 className="text-sm font-semibold text-gray-900 hover:text-brand-coral transition-colors">
                    {article.title}
                  </h4>
                </div>
              ))
            ) : (
              // Duplicate fallback static headlines for seamless loop
              <>
                <div
                  className="group cursor-pointer inline-block min-w-max"
                  onClick={() => navigate("/dtmi/article/ai-governance-frameworks")}
                >
                  <h4 className="text-sm font-semibold text-gray-900 hover:text-brand-coral transition-colors">
                    AI governance frameworks reshape enterprise decisions
                  </h4>
                </div>
                <div
                  className="group cursor-pointer inline-block min-w-max"
                  onClick={() =>
                    navigate("/dtmi/article/digital-transformation-roi")
                  }
                >
                  <h4 className="text-sm font-semibold text-gray-900 hover:text-brand-coral transition-colors">
                    73% of digital transformations fail to deliver ROI
                  </h4>
                </div>
                <div
                  className="group cursor-pointer inline-block min-w-max"
                  onClick={() =>
                    navigate("/dtmi/article/cognitive-automation-adoption")
                  }
                >
                  <h4 className="text-sm font-semibold text-gray-900 hover:text-brand-coral transition-colors">
                    Cognitive automation accelerates in financial services
                  </h4>
                </div>
                <div
                  className="group cursor-pointer inline-block min-w-max"
                  onClick={() =>
                    navigate("/dtmi/article/digital-workplace-evolution")
                  }
                >
                  <h4 className="text-sm font-semibold text-gray-900 hover:text-brand-coral transition-colors">
                    Hybrid models redefine productivity metrics
                  </h4>
                </div>
                <div
                  className="group cursor-pointer inline-block min-w-max"
                  onClick={() =>
                    navigate("/dtmi/article/data-sovereignty-challenges")
                  }
                >
                  <h4 className="text-sm font-semibold text-gray-900 hover:text-brand-coral transition-colors">
                    Data sovereignty emerges as top enterprise concern
                  </h4>
                </div>
              </>
            )}
          </div>
        </div>

        {/* CSS Animation */}
        <style>{`
          @keyframes scroll {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }
          .animate-scroll {
            animation: scroll 40s linear infinite;
          }
          .animate-scroll:hover {
            animation-play-state: paused;
          }
        `}</style>
      </div>
    </section>
  );
}
