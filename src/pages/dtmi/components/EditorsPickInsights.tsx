import React from "react";
import { useNavigate } from "react-router-dom";
import { Clock, Star } from "lucide-react";

interface EditorPickInsight {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  publishDate: string;
  readTime: number;
  heroImage: string;
  link: string;
  author: string;
  editorNote: string;
  slug: string;
}

// Static data to ensure rendering
const editorPickInsights: EditorPickInsight[] = [
  {
    id: "1",
    title: "Expert Interview: The Future of Cognitive Organizations",
    excerpt:
      "An exclusive conversation with Dr. Stéphane Niango exploring how organizations can evolve beyond traditional digital transformation.",
    category: "Expert Interview",
    publishDate: "December 14, 2025",
    readTime: 25,
    heroImage: "/images/Article 01_hero image.png",
    link: "/blog",
    author: "Dr. Stéphane Niango",
    editorNote:
      "A groundbreaking interview that redefines our understanding of organizational intelligence and adaptive capacity",
    slug: "expert-interview-future-cognitive-organizations",
  },
  {
    id: "2",
    title: "Case Insight: Netflix's Data-Driven Transformation",
    excerpt:
      "A comprehensive case study examining how Netflix leveraged data analytics to transform from DVD rental to streaming giant.",
    category: "Case Study",
    publishDate: "December 11, 2025",
    readTime: 22,
    heroImage: "/images/Article 02_hero image.png",
    link: "/blog",
    author: "Kaylynn Océanne",
    editorNote:
      "Essential case study demonstrating the power of data-driven decision making in digital transformation",
    slug: "netflix-data-driven-transformation",
  },
];

export const EditorsPickInsights: React.FC = () => {
  const navigate = useNavigate();

  const handleInsightClick = (insight: EditorPickInsight) => {
    navigate(insight.link);
  };

  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <Star className="text-blue-600" size={24} />
            <h2 className="text-3xl font-bold text-gray-900">Editor's Pick</h2>
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {editorPickInsights.map((insight) => (
            <div
              key={insight.id}
              className="group cursor-pointer"
              onClick={() => handleInsightClick(insight)}
            >
              <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden">
                {/* Hero Image */}
                <div className="relative">
                  <img
                    src={insight.heroImage}
                    alt={insight.title}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />

                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                      <Star size={14} />
                      EDITOR'S PICK
                    </span>
                  </div>

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                {/* Article Content */}
                <div className="p-5">
                  {/* Category and Meta */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2 text-blue-600 text-sm">
                      <span className="uppercase font-semibold">
                        {insight.category}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-500 text-sm">
                      <Clock size={14} />
                      <span>{insight.readTime} min</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {insight.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {insight.excerpt}
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-semibold text-sm">
                        {insight.author
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {insight.author}
                      </p>
                      <p className="text-xs text-gray-500">
                        {insight.publishDate}
                      </p>
                    </div>
                  </div>

                  {/* Editor's Note */}
                  <div className="bg-blue-50 border-l-4 border-blue-600 p-3 rounded-r">
                    <p className="text-xs text-blue-800 font-medium mb-1">
                      Editor's Note
                    </p>
                    <p className="text-sm text-blue-700 italic">
                      "{insight.editorNote}"
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
};
