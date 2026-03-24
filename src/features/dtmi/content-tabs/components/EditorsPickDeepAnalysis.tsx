import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Clock, Star, FileText, Download, Loader2 } from "lucide-react";
import { mediaService } from "../../../admin/shared/utils/supabase";

interface EditorPickAnalysis {
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
  analysisType: string;
  pages?: number;
  slug: string;
}

export const EditorsPickDeepAnalysis: React.FC = () => {
  const navigate = useNavigate();
  const [editorPickAnalysis, setEditorPickAnalysis] = useState<
    EditorPickAnalysis[]
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEditorsPick = async () => {
      try {
        setLoading(true);
        // Fetch whitepapers and research reports
        const [whitepaperResponse, researchResponse] = await Promise.all([
          mediaService.getMediaItems({
            type: "whitepaper",
            limit: 1,
          }),
          mediaService.getMediaItems({
            type: "research",
            limit: 1,
          }),
        ]);

        const allAnalysis = [
          ...(whitepaperResponse.data || []),
          ...(researchResponse.data || []),
        ];

        if (allAnalysis.length > 0) {
          const mappedAnalysis: EditorPickAnalysis[] = allAnalysis
            .slice(0, 2)
            .map((item: any) => ({
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
              readTime: item.readTime || (item.type === "whitepaper" ? 55 : 48),
              heroImage:
                item.heroImage ||
                item.thumbnailUrl ||
                "/images/Article 01_hero image.png",
              link: item.slug ? `/blog/${item.slug}` : `/media/blog/${item.id}`,
              author: item.author?.name || "Research Team",
              editorNote:
                item.type === "whitepaper"
                  ? "Essential strategic framework that redefines enterprise architecture for the cognitive age"
                  : "Groundbreaking research that establishes new benchmarks for digital transformation success",
              analysisType:
                item.type === "whitepaper" ? "Whitepaper" : "Research Report",
              pages: item.type === "whitepaper" ? 47 : 62,
              slug: item.slug,
            }));
          setEditorPickAnalysis(mappedAnalysis);
        }
      } catch (error) {
        console.error("Error fetching editor's pick analysis:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEditorsPick();
  }, []);

  const handleAnalysisClick = (analysis: EditorPickAnalysis) => {
    navigate(analysis.link);
  };

  if (loading) {
    return (
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <Loader2
                className="animate-spin text-purple-600 mx-auto mb-4"
                size={48}
              />
              <p className="text-gray-600">Loading editor's picks...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (editorPickAnalysis.length === 0) {
    return null;
  }

  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <Star className="text-purple-600" size={24} />
            <h2 className="text-3xl font-bold text-gray-900">Editor's Pick</h2>
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {editorPickAnalysis.map((analysis) => (
            <div
              key={analysis.id}
              className="group cursor-pointer"
              onClick={() => handleAnalysisClick(analysis)}
            >
              <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden">
                {/* Hero Image */}
                <div className="relative">
                  <img
                    src={analysis.heroImage}
                    alt={analysis.title}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />

                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                      <Star size={14} />
                      EDITOR'S PICK
                    </span>
                  </div>

                  {/* Analysis Type Badge */}
                  <div className="absolute top-4 right-4">
                    <span className="bg-white bg-opacity-90 text-purple-600 px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                      <FileText size={14} />
                      {analysis.analysisType}
                    </span>
                  </div>

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                {/* Content */}
                <div className="p-5">
                  {/* Category and Meta */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2 text-purple-600 text-sm">
                      <span className="uppercase font-semibold">
                        {analysis.category}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-500 text-sm">
                      {analysis.pages && (
                        <span className="flex items-center gap-1">
                          <FileText size={14} />
                          {analysis.pages} pages
                        </span>
                      )}
                      <div className="flex items-center gap-1">
                        <Clock size={14} />
                        <span>{analysis.readTime} min</span>
                      </div>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors line-clamp-2">
                    {analysis.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {analysis.excerpt}
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                      <span className="text-purple-600 font-semibold text-sm">
                        {analysis.author
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {analysis.author}
                      </p>
                      <p className="text-xs text-gray-500">
                        {analysis.publishDate}
                      </p>
                    </div>
                  </div>

                  {/* Editor's Note */}
                  <div className="bg-purple-50 border-l-4 border-purple-600 p-3 rounded-r mb-4">
                    <p className="text-xs text-purple-800 font-medium mb-1">
                      Editor's Note
                    </p>
                    <p className="text-sm text-purple-700 italic">
                      "{analysis.editorNote}"
                    </p>
                  </div>

                  {/* Download CTA */}
                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <span className="text-sm text-gray-600">
                      Strategic {analysis.analysisType.toLowerCase()}
                    </span>
                    <div className="flex items-center gap-1 text-purple-600 text-sm font-medium">
                      <Download size={14} />
                      <span>Access Full Report</span>
                    </div>
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

