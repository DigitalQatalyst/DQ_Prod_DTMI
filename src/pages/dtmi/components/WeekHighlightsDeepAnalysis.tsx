import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Clock, Loader2 } from "lucide-react";
import { mediaService } from "../../../admin-ui/utils/supabase";

interface HighlightAnalysis {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  publishDate: string;
  readTime: number;
  heroImage: string;
  link: string;
  featured?: boolean;
  analysisType: string;
  slug: string;
}

export const WeekHighlightsDeepAnalysis: React.FC = () => {
  const navigate = useNavigate();
  const [highlightAnalysis, setHighlightAnalysis] = useState<
    HighlightAnalysis[]
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDeepAnalysis = async () => {
      try {
        setLoading(true);
        // Fetch whitepapers, research reports, and prediction analysis
        const [whitepaperResponse, researchResponse, blogResponse] =
          await Promise.all([
            mediaService.getMediaItems({
              type: "whitepaper",
              limit: 2,
            }),
            mediaService.getMediaItems({
              type: "research",
              limit: 2,
            }),
            mediaService.getMediaItems({
              type: "blog",
              limit: 1,
              // Look for prediction analysis in categories or tags
            }),
          ]);

        const allAnalysis = [
          ...(whitepaperResponse.data || []),
          ...(researchResponse.data || []),
          ...(blogResponse.data || []),
        ];

        if (allAnalysis.length > 0) {
          const mappedAnalysis: HighlightAnalysis[] = allAnalysis
            .slice(0, 5)
            .map((item: any, index: number) => ({
              id: item.id,
              title: item.title,
              excerpt:
                item.excerpt ||
                item.summary ||
                item.body?.substring(0, 200) + "...",
              category:
                item.category || item.categoryName || "Strategic Analysis",
              publishDate: new Date(
                item.publishDate || item.publishedAt,
              ).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              }),
              readTime:
                item.readTime ||
                (item.type === "whitepaper"
                  ? 45
                  : item.type === "research"
                    ? 35
                    : 40),
              heroImage:
                item.heroImage ||
                item.thumbnailUrl ||
                "/images/Article 01_hero image.png",
              link: `/blog/${item.slug}`,
              featured: index === 0,
              analysisType:
                item.type === "whitepaper"
                  ? "Whitepaper"
                  : item.type === "research"
                    ? "Research Report"
                    : "Prediction Analysis",
              slug: item.slug,
            }));
          setHighlightAnalysis(mappedAnalysis);
        }
      } catch (error) {
        console.error("Error fetching deep analysis:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDeepAnalysis();
  }, []);

  const featuredAnalysis =
    highlightAnalysis.find((analysis) => analysis.featured) ||
    highlightAnalysis[0];
  const leftAnalysis = highlightAnalysis.slice(1, 3); // 2 items on the left
  const rightAnalysis = highlightAnalysis.slice(3, 5); // 2 items on the right

  const handleAnalysisClick = (analysis: HighlightAnalysis) => {
    navigate(analysis.link);
  };

  if (loading) {
    return (
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <Loader2
                className="animate-spin text-purple-600 mx-auto mb-4"
                size={48}
              />
              <p className="text-gray-600">Loading deep analysis...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (highlightAnalysis.length === 0) {
    return null;
  }

  if (!featuredAnalysis) {
    return null;
  }

  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-1 h-8 bg-purple-600"></div>
            <h2 className="text-3xl font-bold text-gray-900">
              The Week's Highlights
            </h2>
          </div>
        </div>

        {/* 5-Card Layout: 2 Left + 1 Center + 2 Right */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Left Side - 2 Items */}
          <div className="lg:col-span-1 space-y-6 flex flex-col">
            {leftAnalysis.map((analysis) => (
              <div
                key={analysis.id}
                className="group cursor-pointer flex-1"
                onClick={() => handleAnalysisClick(analysis)}
              >
                <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden h-full">
                  <img
                    src={analysis.heroImage}
                    alt={analysis.title}
                    className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="p-4 flex flex-col justify-between h-32">
                    <div>
                      <div className="flex items-center gap-2 text-purple-600 text-xs mb-2">
                        <span className="uppercase font-semibold">
                          {analysis.analysisType}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors line-clamp-2 leading-tight">
                        {analysis.title}
                      </h4>
                    </div>
                    <div className="flex items-center gap-2 text-gray-500 text-xs">
                      <Clock size={12} />
                      <span>{analysis.readTime} min</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Center - Featured Analysis */}
          <div className="lg:col-span-3 flex">
            <div
              className="group cursor-pointer w-full"
              onClick={() => handleAnalysisClick(featuredAnalysis)}
            >
              <div className="relative overflow-hidden rounded-lg h-full">
                <img
                  src={featuredAnalysis.heroImage}
                  alt={featuredAnalysis.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    FEATURED ANALYSIS
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-black bg-opacity-60 backdrop-blur-sm rounded-lg p-4">
                    <div className="flex items-center gap-2 text-purple-400 text-sm mb-2">
                      <span className="uppercase font-semibold">
                        {featuredAnalysis.analysisType}
                      </span>
                      <span>•</span>
                      <div className="flex items-center gap-1">
                        <Clock size={14} />
                        <span>{featuredAnalysis.readTime} min read</span>
                      </div>
                    </div>
                    <h3 className="text-white text-xl font-bold mb-2 group-hover:text-purple-300 transition-colors">
                      {featuredAnalysis.title}
                    </h3>
                    <p className="text-gray-200 text-sm line-clamp-2">
                      {featuredAnalysis.excerpt}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - 2 Items */}
          <div className="lg:col-span-1 space-y-6 flex flex-col">
            {rightAnalysis.map((analysis) => (
              <div
                key={analysis.id}
                className="group cursor-pointer flex-1"
                onClick={() => handleAnalysisClick(analysis)}
              >
                <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden h-full">
                  <img
                    src={analysis.heroImage}
                    alt={analysis.title}
                    className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="p-4 flex flex-col justify-between h-32">
                    <div>
                      <div className="flex items-center gap-2 text-purple-600 text-xs mb-2">
                        <span className="uppercase font-semibold">
                          {analysis.analysisType}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors line-clamp-2 leading-tight">
                        {analysis.title}
                      </h4>
                    </div>
                    <div className="flex items-center gap-2 text-gray-500 text-xs">
                      <Clock size={12} />
                      <span>{analysis.readTime} min</span>
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
