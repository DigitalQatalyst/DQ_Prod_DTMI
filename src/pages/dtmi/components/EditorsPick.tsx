import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Clock, Star, Loader2, ArrowRight } from "lucide-react";
import { mediaService } from "../../../admin-ui/utils/supabase";

interface EditorPickArticle {
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

export const EditorsPick: React.FC = () => {
  const navigate = useNavigate();
  const [editorPickArticles, setEditorPickArticles] = useState<
    EditorPickArticle[]
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEditorsPick = async () => {
      try {
        setLoading(true);
        const response = await mediaService.getMediaItems({
          type: "blog",
          limit: 2,
          featured: true,
        });

        if (response.data && response.data.length > 0) {
          const mappedArticles: EditorPickArticle[] = response.data.map(
            (blog: any) => ({
              id: blog.id,
              title: blog.title,
              excerpt:
                blog.excerpt ||
                blog.summary ||
                blog.body?.substring(0, 200) + "...",
              category: blog.category || blog.categoryName || "General",
              publishDate: new Date(
                blog.publishDate || blog.publishedAt,
              ).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              }),
              readTime: blog.readTime || 8,
              heroImage:
                blog.heroImage ||
                blog.thumbnailUrl ||
                "/images/Article 01_hero image.png",
              link: `/blog/${blog.slug}`,
              author: blog.author?.name || "Editorial Team",
              editorNote:
                "Essential reading for understanding digital transformation trends",
              slug: blog.slug,
            }),
          );
          setEditorPickArticles(mappedArticles);
        }
      } catch (error) {
        console.error("Error fetching editor's pick:", error);
        // Keep empty array if fetch fails
      } finally {
        setLoading(false);
      }
    };

    fetchEditorsPick();
  }, []);

  if (loading) {
    return (
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <Loader2
                className="animate-spin text-orange-600 mx-auto mb-4"
                size={48}
              />
              <p className="text-gray-600">Loading editor's picks...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (editorPickArticles.length === 0) {
    return null;
  }

  const handleArticleClick = (article: EditorPickArticle) => {
    navigate(article.link);
  };

  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <Star className="text-orange-600" size={24} />
            <h2 className="text-3xl font-bold text-gray-900">Editor's Pick</h2>
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {editorPickArticles.map((article) => (
            <div
              key={article.id}
              className="group cursor-pointer"
              onClick={() => handleArticleClick(article)}
            >
              <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">
                {/* Article Image */}
                <div className="relative overflow-hidden">
                  <img
                    src={article.heroImage}
                    alt={article.title}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />

                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="bg-orange-600 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                      <Star size={14} />
                      EDITOR'S PICK
                    </span>
                  </div>

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                {/* Article Content */}
                <div className="p-6">
                  {/* Category and Meta */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2 text-orange-600 text-sm">
                      <span className="uppercase font-semibold">
                        {article.category}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-500 text-sm">
                      <Clock size={14} />
                      <span>{article.readTime} min read</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors leading-tight">
                    {article.title}
                  </h3>

                  {/* Editor's Note */}
                  <div className="bg-orange-50 border-l-4 border-orange-600 p-3 mb-4">
                    <p className="text-sm text-orange-800 italic">
                      <span className="font-semibold">Editor's Note:</span>{" "}
                      {article.editorNote}
                    </p>
                  </div>

                  {/* Excerpt */}
                  <p className="text-gray-600 mb-4 leading-relaxed line-clamp-3">
                    {article.excerpt}
                  </p>

                  {/* Author and Date */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                        <span className="text-orange-600 font-semibold text-sm">
                          {article.author
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {article.author}
                        </p>
                        <p className="text-xs text-gray-500">
                          {article.publishDate}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-orange-600 font-semibold group-hover:gap-3 transition-all">
                      <span className="text-sm">Read More</span>
                      <ArrowRight size={16} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
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
