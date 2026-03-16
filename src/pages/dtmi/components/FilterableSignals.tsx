import React, { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Filter, Clock, TrendingUp, Loader2 } from "lucide-react";
import { mediaService } from "../../../admin-ui/utils/supabase";

interface Signal {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  signalType: string;
  publishDate: string;
  year: number;
  readTime: number;
  heroImage: string;
  link: string;
  tags: string[];
  slug: string;
}

export const FilterableSignals: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedYears, setSelectedYears] = useState<number[]>([]);
  const [signals, setSignals] = useState<Signal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [topicsExpanded, setTopicsExpanded] = useState(false);
  const [yearsExpanded, setYearsExpanded] = useState(false);
  const [typesExpanded, setTypesExpanded] = useState(false);

  // Fetch signals data on component mount
  useEffect(() => {
    const fetchSignals = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await mediaService.getMediaItems({
          type: "blog",
          limit: 30,
        });

        if (response.data) {
          const mappedSignals: Signal[] = response.data.map(
            (blog: any, index: number) => {
              const publishDate = new Date(
                blog.publishDate || blog.publishedAt,
              );
              const year = publishDate.getFullYear();

              // Determine signal type based on category, tags, or content characteristics
              const signalTypes = [
                "Front Watch",
                "Executive Briefs",
                "Trends Alert",
                "Rapid Insights",
                "Microblogs",
              ];
              const typeIndex = index % 5;
              let signalType = signalTypes[typeIndex]; // Ensures all 5 types are distributed

              // Override based on content characteristics if available
              if (
                blog.category?.toLowerCase().includes("front") ||
                blog.category?.toLowerCase().includes("watch") ||
                blog.tags?.some(
                  (tag: string) =>
                    tag.toLowerCase().includes("front") ||
                    tag.toLowerCase().includes("watch"),
                )
              ) {
                signalType = "Front Watch";
              } else if (
                blog.category?.toLowerCase().includes("executive") ||
                blog.category?.toLowerCase().includes("brief") ||
                blog.tags?.some(
                  (tag: string) =>
                    tag.toLowerCase().includes("executive") ||
                    tag.toLowerCase().includes("brief"),
                )
              ) {
                signalType = "Executive Briefs";
              } else if (
                blog.category?.toLowerCase().includes("trend") ||
                blog.category?.toLowerCase().includes("alert") ||
                blog.tags?.some(
                  (tag: string) =>
                    tag.toLowerCase().includes("trend") ||
                    tag.toLowerCase().includes("alert"),
                )
              ) {
                signalType = "Trends Alert";
              } else if (
                blog.category?.toLowerCase().includes("micro") ||
                blog.category?.toLowerCase().includes("blog") ||
                blog.tags?.some(
                  (tag: string) =>
                    tag.toLowerCase().includes("micro") ||
                    tag.toLowerCase().includes("blog"),
                ) ||
                blog.readTime <= 3
              ) {
                signalType = "Microblogs";
              }

              return {
                id: blog.id,
                title: blog.title,
                excerpt:
                  blog.excerpt ||
                  blog.summary ||
                  blog.body?.substring(0, 200) + "...",
                category: blog.category || blog.categoryName || "General",
                signalType,
                publishDate: publishDate.toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                }),
                year,
                readTime: blog.readTime || 5,
                heroImage:
                  blog.heroImage ||
                  blog.thumbnailUrl ||
                  "/images/Article 01_hero image.png",
                link: `/blog/${blog.slug}`,
                tags: blog.tags || [],
                slug: blog.slug,
              };
            },
          );

          setSignals(mappedSignals);
        }
      } catch (err) {
        console.error("Error fetching signals:", err);
        setError("Failed to load signals. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchSignals();
  }, []);

  // Get unique years, types, and categories for filters
  const availableYears = useMemo(() => {
    const years = [...new Set(signals.map((signal) => signal.year))].sort(
      (a, b) => b - a,
    );
    return years;
  }, [signals]);

  const availableTypes = useMemo(() => {
    const types = [...new Set(signals.map((signal) => signal.signalType))];
    return types;
  }, [signals]);

  const availableCategories = useMemo(() => {
    const categories = [...new Set(signals.map((signal) => signal.category))];
    return categories;
  }, [signals]);

  // Filter signals based on all criteria
  const filteredSignals = useMemo(() => {
    return signals.filter((signal) => {
      const matchesSearch =
        searchTerm === "" ||
        signal.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        signal.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        signal.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        signal.tags.some((tag) =>
          tag.toLowerCase().includes(searchTerm.toLowerCase()),
        );

      const matchesYear =
        selectedYears.length === 0 || selectedYears.includes(signal.year);
      const matchesType =
        selectedTypes.length === 0 || selectedTypes.includes(signal.signalType);
      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes(signal.category);

      return matchesSearch && matchesYear && matchesType && matchesCategory;
    });
  }, [signals, searchTerm, selectedYears, selectedTypes, selectedCategories]);

  const handleSignalClick = (signal: Signal) => {
    navigate(signal.link);
  };

  const handleTypeToggle = (type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type],
    );
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
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <Loader2
                className="animate-spin text-orange-600 mx-auto mb-4"
                size={48}
              />
              <p className="text-gray-600">Loading signals...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center py-20">
            <div className="text-red-500 mb-4">
              <TrendingUp size={48} className="mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              Error Loading Signals
            </h3>
            <p className="text-gray-500 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700 transition-colors"
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
          <h2 className="text-2xl font-bold text-gray-900">All Signals</h2>
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
                            className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
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
                            className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
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
                            className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
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
                  className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Signals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSignals.map((signal) => (
            <div
              key={signal.id}
              className="group cursor-pointer"
              onClick={() => handleSignalClick(signal)}
            >
              <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden">
                <img
                  src={signal.heroImage}
                  alt={signal.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="p-5">
                  {/* Signal Type Badge */}
                  <div className="flex items-center gap-2 mb-3">
                    <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-xs font-semibold">
                      {signal.signalType}
                    </span>
                    <TrendingUp size={14} className="text-orange-600" />
                  </div>

                  {/* Category */}
                  <div className="text-orange-600 text-sm font-semibold mb-2 uppercase">
                    {signal.category}
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors line-clamp-2">
                    {signal.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {signal.excerpt}
                  </p>

                  {/* Meta Info */}
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <Clock size={12} />
                      <span>{signal.readTime} min read</span>
                    </div>
                    <span>{signal.publishDate}</span>
                  </div>

                  {/* Tags */}
                  <div className="mt-3 flex flex-wrap gap-1">
                    {signal.tags.slice(0, 3).map((tag, index) => (
                      <span
                        key={index}
                        className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                    {signal.tags.length > 3 && (
                      <span className="text-gray-400 text-xs">
                        +{signal.tags.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredSignals.length === 0 && !loading && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search size={48} className="mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              No signals found
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
      `}</style>
    </section>
  );
};
