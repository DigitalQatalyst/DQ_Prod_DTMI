import React from "react";
import { useNavigate } from "react-router-dom";
import { Clock } from "lucide-react";

interface HighlightInsight {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  publishDate: string;
  readTime: number;
  heroImage: string;
  link: string;
  featured?: boolean;
  slug: string;
}

// Static data to ensure rendering
const highlightInsights: HighlightInsight[] = [
  {
    id: "1",
    title: "Building Cognitive Organizations: A Strategic Framework",
    excerpt:
      "A comprehensive article exploring how organizations can transform into cognitive entities that adapt and learn in real-time.",
    category: "Strategic Framework",
    publishDate: "December 15, 2025",
    readTime: 15,
    heroImage: "/images/Article 01_hero image.png",
    link: "/blog",
    featured: true,
    slug: "building-cognitive-organizations",
  },
  {
    id: "2",
    title: "Expert Interview: Dr. Sarah Chen on AI Leadership",
    excerpt:
      "An in-depth conversation with AI leadership expert Dr. Sarah Chen about navigating organizational transformation.",
    category: "Expert Interview",
    publishDate: "December 12, 2025",
    readTime: 20,
    heroImage: "/images/Article 02_hero image.png",
    link: "/blog",
    featured: false,
    slug: "expert-interview-sarah-chen",
  },
  {
    id: "3",
    title: "Case Insight: Microsoft's Digital Transformation Journey",
    excerpt:
      "A detailed case study examining how Microsoft successfully transformed from a software company to a cloud-first organization.",
    category: "Case Study",
    publishDate: "December 10, 2025",
    readTime: 18,
    heroImage: "/images/Article 03_hero image.png",
    link: "/blog",
    featured: false,
    slug: "microsoft-digital-transformation",
  },
  {
    id: "4",
    title: "The Psychology of Digital Adoption in Enterprise",
    excerpt:
      "An analytical article on understanding the human factors that drive successful digital transformation initiatives.",
    category: "Digital Psychology",
    publishDate: "December 8, 2025",
    readTime: 14,
    heroImage: "/images/Article 01_hero image.png",
    link: "/blog",
    featured: false,
    slug: "psychology-digital-adoption",
  },
  {
    id: "5",
    title: "Case Insight: Siemens' Industry 4.0 Implementation",
    excerpt:
      "Real-world case study showing how Siemens implemented Industry 4.0 principles across their manufacturing operations.",
    category: "Industry 4.0",
    publishDate: "December 5, 2025",
    readTime: 16,
    heroImage: "/images/Article 02_hero image.png",
    link: "/blog",
    featured: false,
    slug: "siemens-industry-4-implementation",
  },
];

export const WeekHighlightsInsights: React.FC = () => {
  const navigate = useNavigate();

  const featuredInsight =
    highlightInsights.find((insight) => insight.featured) ||
    highlightInsights[0];
  const leftInsights = highlightInsights.slice(1, 3); // 2 articles on the left
  const rightInsights = highlightInsights.slice(3, 5); // 2 articles on the right

  const handleInsightClick = (insight: HighlightInsight) => {
    navigate(insight.link);
  };

  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-1 h-8 bg-blue-600"></div>
            <h2 className="text-3xl font-bold text-gray-900">
              The Week's Highlights
            </h2>
          </div>
        </div>

        {/* 5-Card Layout: 2 Left + 1 Center + 2 Right */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Left Side - 2 Articles */}
          <div className="lg:col-span-1 space-y-6 flex flex-col">
            {leftInsights.map((insight) => (
              <div
                key={insight.id}
                className="group cursor-pointer flex-1"
                onClick={() => handleInsightClick(insight)}
              >
                <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden h-full">
                  <img
                    src={insight.heroImage}
                    alt={insight.title}
                    className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="p-4 flex flex-col justify-between h-32">
                    <div>
                      <div className="flex items-center gap-2 text-blue-600 text-xs mb-2">
                        <span className="uppercase font-semibold">
                          {insight.category}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2 leading-tight">
                        {insight.title}
                      </h4>
                    </div>
                    <div className="flex items-center gap-2 text-gray-500 text-xs">
                      <Clock size={12} />
                      <span>{insight.readTime} min</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Center - Featured Article */}
          <div className="lg:col-span-3 flex">
            <div
              className="group cursor-pointer w-full"
              onClick={() => handleInsightClick(featuredInsight)}
            >
              <div className="relative overflow-hidden rounded-lg h-full">
                <img
                  src={featuredInsight.heroImage}
                  alt={featuredInsight.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    FEATURED INSIGHT
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-black bg-opacity-60 backdrop-blur-sm rounded-lg p-4">
                    <div className="flex items-center gap-2 text-blue-400 text-sm mb-2">
                      <span className="uppercase font-semibold">
                        {featuredInsight.category}
                      </span>
                      <span>•</span>
                      <div className="flex items-center gap-1">
                        <Clock size={14} />
                        <span>{featuredInsight.readTime} min read</span>
                      </div>
                    </div>
                    <h3 className="text-white text-xl font-bold mb-2 group-hover:text-blue-300 transition-colors">
                      {featuredInsight.title}
                    </h3>
                    <p className="text-gray-200 text-sm line-clamp-2">
                      {featuredInsight.excerpt}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - 2 Articles */}
          <div className="lg:col-span-1 space-y-6 flex flex-col">
            {rightInsights.map((insight) => (
              <div
                key={insight.id}
                className="group cursor-pointer flex-1"
                onClick={() => handleInsightClick(insight)}
              >
                <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden h-full">
                  <img
                    src={insight.heroImage}
                    alt={insight.title}
                    className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="p-4 flex flex-col justify-between h-32">
                    <div>
                      <div className="flex items-center gap-2 text-blue-600 text-xs mb-2">
                        <span className="uppercase font-semibold">
                          {insight.category}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2 leading-tight">
                        {insight.title}
                      </h4>
                    </div>
                    <div className="flex items-center gap-2 text-gray-500 text-xs">
                      <Clock size={12} />
                      <span>{insight.readTime} min</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
};
