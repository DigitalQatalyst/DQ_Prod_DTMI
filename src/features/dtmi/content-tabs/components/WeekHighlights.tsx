import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Clock, Loader2 } from "lucide-react";
import { mediaService } from "../../../admin/shared/utils/supabase";

interface HighlightBlog {
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

export const WeekHighlights: React.FC = () => {
  const navigate = useNavigate();
  const [highlightBlogs, setHighlightBlogs] = useState<HighlightBlog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHighlights = async () => {
      try {
        setLoading(true);
        const response = await mediaService.getMediaItems({
          type: "blog",
          limit: 5,
          featured: true,
        });

        if (response.data && response.data.length > 0) {
          const mappedBlogs: HighlightBlog[] = response.data.map(
            (blog: any, index: number) => ({
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
              readTime: blog.readTime || 5,
              heroImage:
                blog.heroImage ||
                blog.thumbnailUrl ||
                "/images/Article 01_hero image.png",
              link: blog.slug ? `/blog/${blog.slug}` : `/media/blog/${blog.id}`,
              featured: index === 0, // First item is featured
              slug: blog.slug,
            }),
          );
          setHighlightBlogs(mappedBlogs);
        }
      } catch (error) {
        console.error("Error fetching highlights:", error);
        // Keep empty array if fetch fails
      } finally {
        setLoading(false);
      }
    };

    fetchHighlights();
  }, []);

  const featuredBlog =
    highlightBlogs.find((blog) => blog.featured) || highlightBlogs[0];
  const leftBlogs = highlightBlogs.slice(1, 3); // 2 articles on the left
  const rightBlogs = highlightBlogs.slice(3, 5); // 2 articles on the right

  const handleBlogClick = (blog: HighlightBlog) => {
    navigate(blog.link);
  };

  if (loading) {
    return (
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <Loader2
                className="animate-spin text-orange-600 mx-auto mb-4"
                size={48}
              />
              <p className="text-gray-600">Loading highlights...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (highlightBlogs.length === 0) {
    return null;
  }

  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-1 h-8 bg-orange-600"></div>
            <h2 className="text-3xl font-bold text-gray-900">
              The Week's Highlights
            </h2>
          </div>
        </div>

        {/* 5-Card Layout: 2 Left + 1 Center + 2 Right */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Left Side - 2 Articles */}
          <div className="lg:col-span-1 space-y-6 flex flex-col">
            {leftBlogs.map((blog) => (
              <div
                key={blog.id}
                className="group cursor-pointer flex-1"
                onClick={() => handleBlogClick(blog)}
              >
                <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden h-full">
                  <img
                    src={blog.heroImage}
                    alt={blog.title}
                    className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="p-4 flex flex-col justify-between h-32">
                    <div>
                      <div className="flex items-center gap-2 text-orange-600 text-xs mb-2">
                        <span className="uppercase font-semibold">
                          {blog.category}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors line-clamp-2 leading-tight">
                        {blog.title}
                      </h4>
                    </div>
                    <div className="flex items-center gap-2 text-gray-500 text-xs">
                      <Clock size={12} />
                      <span>{blog.readTime} min</span>
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
              onClick={() => handleBlogClick(featuredBlog)}
            >
              <div className="relative overflow-hidden rounded-lg h-full">
                <img
                  src={featuredBlog.heroImage}
                  alt={featuredBlog.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-orange-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    FEATURED SIGNAL
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-black bg-opacity-60 backdrop-blur-sm rounded-lg p-4">
                    <div className="flex items-center gap-2 text-orange-400 text-sm mb-2">
                      <span className="uppercase font-semibold">
                        {featuredBlog.category}
                      </span>
                      <span>•</span>
                      <div className="flex items-center gap-1">
                        <Clock size={14} />
                        <span>{featuredBlog.readTime} min read</span>
                      </div>
                    </div>
                    <h3 className="text-white text-xl font-bold mb-2 group-hover:text-orange-300 transition-colors">
                      {featuredBlog.title}
                    </h3>
                    <p className="text-gray-200 text-sm line-clamp-2">
                      {featuredBlog.excerpt}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - 2 Articles */}
          <div className="lg:col-span-1 space-y-6 flex flex-col">
            {rightBlogs.map((blog) => (
              <div
                key={blog.id}
                className="group cursor-pointer flex-1"
                onClick={() => handleBlogClick(blog)}
              >
                <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden h-full">
                  <img
                    src={blog.heroImage}
                    alt={blog.title}
                    className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="p-4 flex flex-col justify-between h-32">
                    <div>
                      <div className="flex items-center gap-2 text-orange-600 text-xs mb-2">
                        <span className="uppercase font-semibold">
                          {blog.category}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors line-clamp-2 leading-tight">
                        {blog.title}
                      </h4>
                    </div>
                    <div className="flex items-center gap-2 text-gray-500 text-xs">
                      <Clock size={12} />
                      <span>{blog.readTime} min</span>
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

