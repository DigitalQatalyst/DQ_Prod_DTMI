import React, { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Filter, Clock, BookOpen, Loader2 } from "lucide-react";
import { mediaService } from "../../../admin/shared/utils/supabase";

interface Insight {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  insightType: string;
  publishDate: string;
  year: number;
  readTime: number;
  heroImage: string;
  link: string;
  tags: string[];
  slug: string;
}

export const FilterableInsights: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedYears, setSelectedYears] = useState<number[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]); // Changed to array for multiple selection
  const [insights, setInsights] = useState<Insight[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [topicsExpanded, setTopicsExpanded] = useState(false);
  const [yearsExpanded, setYearsExpanded] = useState(false);
  const [typesExpanded, setTypesExpanded] = useState(false);

  // Fetch insights data on component mount
  useEffect(() => {
    const fetchInsights = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch articles, expert interviews, and case insights
        const [articlesResponse, interviewsResponse] = await Promise.all([
          mediaService.getMediaItems({
            type: "blog",
            limit: 30,
          }),
          mediaService.getMediaItems({
            type: "expert-interview",
            limit: 20,
          }),
        ]);

        const allContent = [
          ...(articlesResponse.data || []),
          ...(interviewsResponse.data || []),
        ];

        if (allContent.length > 0) {
          // Map the content data to insight format
          const mappedInsights: Insight[] = allContent.map(
            (item: any, index: number) => {
              const publishDate = new Date(
                item.publishDate || item.publishedAt,
              );
              const year = publishDate.getFullYear();

              // Determine insight type based on category, tags, or content type
              const insightTypes = [
                "Articles",
                "Framework Explainers",
                "Expert Perspective",
                "Concept Introduction",
                "Blogs",
                "Infographics",
              ];
              const typeIndex = index % 6;
              let insightType = insightTypes[typeIndex]; // Ensures all 6 types are distributed

              // Override based on content characteristics if available
              if (item.type === "expert-interview") {
                insightType = "Expert Perspective";
              } else if (item.type === "blog") {
                // Only override the index-based distribution for very specific matches
                if (
                  item.category?.toLowerCase().includes("framework") ||
                  item.tags?.some((tag: string) =>
                    tag.toLowerCase().includes("framework"),
                  ) ||
                  item.title.toLowerCase().includes("framework")
                ) {
                  insightType = "Framework Explainers";
                } else if (
                  item.category?.toLowerCase().includes("concept") ||
                  item.tags?.some((tag: string) =>
                    tag.toLowerCase().includes("concept"),
                  ) ||
                  item.title.toLowerCase().includes("concept")
                ) {
                  insightType = "Concept Introduction";
                } else if (
                  item.category?.toLowerCase().includes("infographic") ||
                  item.tags?.some((tag: string) =>
                    tag.toLowerCase().includes("infographic"),
                  ) ||
                  item.title.toLowerCase().includes("infographic")
                ) {
                  insightType = "Infographics";
                } else if (
                  item.category?.toLowerCase().includes("interview") ||
                  item.tags?.some((tag: string) =>
                    tag.toLowerCase().includes("interview"),
                  )
                ) {
                  insightType = "Expert Perspective";
                }
                // For regular blog posts without specific keywords, keep the index-based distribution
                // This ensures all 6 types are represented
              }
              return {
                id: item.id,
                title: item.title,
                excerpt:
                  item.excerpt ||
                  item.summary ||
                  item.body?.substring(0, 200) + "...",
                category: item.category || item.categoryName || "General",
                insightType,
                publishDate: publishDate.toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                }),
                year,
                readTime: item.readTime || 8,
                heroImage:
                  item.heroImage ||
                  item.thumbnailUrl ||
                  "/images/Article 01_hero image.png",
                link: `/blog/${item.slug}`,
                tags: item.tags || [],
                slug: item.slug,
              };
            },
          );

          setInsights(mappedInsights);
        }
      } catch (err) {
        console.error("Error fetching insights:", err);
        setError("Failed to load insights. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchInsights();
  }, []);
  // Get unique years, insight types, and categories for filters
  const availableYears = useMemo(() => {
    const years = [...new Set(insights.map((insight) => insight.year))].sort(
      (a, b) => b - a,
    );
    return years;
  }, [insights]);

  const availableTypes = useMemo(() => {
    const types = [...new Set(insights.map((insight) => insight.insightType))];
    return types;
  }, [insights]);

  const availableCategories = useMemo(() => {
    const categories = [
      ...new Set(insights.map((insight) => insight.category)),
    ];
    return categories;
  }, [insights]);

  // Filter insights based on search term, year, and types
  const filteredInsights = useMemo(() => {
    const filtered = insights.filter((insight) => {
      const matchesSearch =
        searchTerm === "" ||
        insight.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        insight.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        insight.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        insight.tags.some((tag) =>
          tag.toLowerCase().includes(searchTerm.toLowerCase()),
        );

      const matchesYear =
        selectedYears.length === 0 || selectedYears.includes(insight.year);
      const matchesType =
        selectedTypes.length === 0 ||
        selectedTypes.includes(insight.insightType);
      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes(insight.category);

      return matchesSearch && matchesYear && matchesType && matchesCategory;
    });
    return filtered;
  }, [insights, searchTerm, selectedYears, selectedTypes, selectedCategories]);

  const handleInsightClick = (insight: Insight) => {
    navigate(insight.link);
  };

  const handleTypeToggle = (type: string) => {
    setSelectedTypes((prev) => {
      const newSelection = prev.includes(type)
        ? prev.filter((t) => t !== type)
        : [...prev, type];
      return newSelection;
    });
  };

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category],
    );
  };

  const handleYearToggle = (year: number) => {
    setSelectedYears((prev) =>
      prev.includes(year) ? prev.filter((y) => y !== year) : [...prev, year],
    );
  };

  const clearAllFilters = () => {
    setSelectedTypes([]);
    setSelectedCategories([]);
    setSelectedYears([]);
    setSearchTerm("");
  };

  if (loading) {
    return (
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <Loader2
                className="animate-spin text-blue-600 mx-auto mb-4"
                size={48}
              />
              <p className="text-gray-600">Loading insights...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center py-20">
            <div className="text-red-500 mb-4">
              <BookOpen size={48} className="mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              Error Loading Insights
            </h3>
            <p className="text-gray-500 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }
  return (
    <section className="py-8 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header with Filter Button */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">All Insights</h2>
          <button
            onClick={() => setShowFilters(true)}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <Filter size={16} />
            <span>Filter</span>
          </button>
        </div>

        {/* Filter Modal */}
        {showFilters && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg w-full max-w-md max-h-[80vh] overflow-y-auto">
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b">
                <h3 className="text-xl font-semibold text-gray-900">Filter</h3>
                <button
                  onClick={() => setShowFilters(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* Filter Content */}
              <div className="p-6 space-y-6">
                {/* Topics Section */}
                <div className="border-b border-gray-200 pb-6">
                  <button
                    onClick={() => setTopicsExpanded(!topicsExpanded)}
                    className="flex items-center justify-between w-full text-left"
                  >
                    <h4 className="text-lg font-medium text-gray-900">
                      Topics
                    </h4>
                    <svg
                      className={`w-5 h-5 transition-transform ${topicsExpanded ? "rotate-45" : ""}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                  </button>
                  {topicsExpanded && (
                    <div className="mt-4 space-y-2">
                      {availableCategories.map((category) => (
                        <label
                          key={category}
                          className="flex items-center gap-3 cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            checked={selectedCategories.includes(category)}
                            onChange={() => handleCategoryToggle(category)}
                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                          />
                          <span className="text-sm text-gray-700">
                            {category}
                          </span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>

                {/* Years Section */}
                <div className="border-b border-gray-200 pb-6">
                  <button
                    onClick={() => setYearsExpanded(!yearsExpanded)}
                    className="flex items-center justify-between w-full text-left"
                  >
                    <h4 className="text-lg font-medium text-gray-900">Years</h4>
                    <svg
                      className={`w-5 h-5 transition-transform ${yearsExpanded ? "rotate-45" : ""}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                  </button>
                  {yearsExpanded && (
                    <div className="mt-4 space-y-2">
                      {availableYears.map((year) => (
                        <label
                          key={year}
                          className="flex items-center gap-3 cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            checked={selectedYears.includes(year)}
                            onChange={() => handleYearToggle(year)}
                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                          />
                          <span className="text-sm text-gray-700">{year}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>

                {/* Types Section */}
                <div>
                  <button
                    onClick={() => setTypesExpanded(!typesExpanded)}
                    className="flex items-center justify-between w-full text-left"
                  >
                    <h4 className="text-lg font-medium text-gray-900">Types</h4>
                    <svg
                      className={`w-5 h-5 transition-transform ${typesExpanded ? "rotate-45" : ""}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                  </button>
                  {typesExpanded && (
                    <div className="mt-4 space-y-2">
                      {availableTypes.map((type) => (
                        <label
                          key={type}
                          className="flex items-center gap-3 cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            checked={selectedTypes.includes(type)}
                            onChange={() => handleTypeToggle(type)}
                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                          />
                          <span className="text-sm text-gray-700">{type}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Modal Footer */}
              <div className="flex items-center justify-between p-6 border-t bg-gray-50">
                <button
                  onClick={clearAllFilters}
                  className="text-sm text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Clear all
                </button>
                <button
                  onClick={() => setShowFilters(false)}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        )}
        {/* Insights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredInsights.map((insight) => (
            <div
              key={insight.id}
              className="group cursor-pointer"
              onClick={() => handleInsightClick(insight)}
            >
              <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden">
                <img
                  src={insight.heroImage}
                  alt={insight.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="p-5">
                  {/* Insight Type Badge */}
                  <div className="flex items-center gap-2 mb-3">
                    <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs font-semibold">
                      {insight.insightType}
                    </span>
                    <BookOpen size={14} className="text-blue-600" />
                  </div>

                  {/* Category */}
                  <div className="text-blue-600 text-sm font-semibold mb-2 uppercase">
                    {insight.category}
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {insight.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {insight.excerpt}
                  </p>

                  {/* Meta Info */}
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <Clock size={12} />
                      <span>{insight.readTime} min read</span>
                    </div>
                    <span>{insight.publishDate}</span>
                  </div>

                  {/* Tags */}
                  <div className="mt-3 flex flex-wrap gap-1">
                    {insight.tags.slice(0, 3).map((tag, index) => (
                      <span
                        key={index}
                        className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                    {insight.tags.length > 3 && (
                      <span className="text-gray-400 text-xs">
                        +{insight.tags.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredInsights.length === 0 && !loading && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search size={48} className="mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              No insights found
            </h3>
            <p className="text-gray-500">
              Try adjusting your search terms or filters
            </p>
          </div>
        )}
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
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-in-out;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
};

