import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Filter, ChevronDown, ChevronUp, X } from "lucide-react";
import { getMarketplaceConfig } from "../../../utils/marketplaceConfig";

interface FilterSection {
  id: string;
  title: string;
  expanded: boolean;
  options: Array<{
    id: string;
    name: string;
    children?: Array<{
      id: string;
      name: string;
    }>;
  }>;
}

// Sample publication data for display
const samplePublications = [
  {
    id: 1,
    title: "Digital Transformation Roadmap for SMEs",
    type: "Whitepaper",
    category: "Digital Economy (Economy 4.0)",
    sector: "Cross (Economy 4.0)",
    date: "2024-03-10",
    readTime: "25 min read",
    description:
      "A comprehensive guide to digital transformation strategies for small and medium enterprises.",
    image: "/api/placeholder/300/200",
  },
  {
    id: 2,
    title: "AI Implementation Framework",
    type: "Framework Explainer",
    category: "Digital Cognitive Organizations (DCO)",
    sector: "Cross (Intelligence 4.0)",
    date: "2024-03-08",
    readTime: "15 min read",
    description:
      "Step-by-step framework for implementing AI solutions in business operations.",
    image: "/api/placeholder/300/200",
  },
  {
    id: 3,
    title: "Future of Digital Workspaces",
    type: "Expert Perspective",
    category: "Digital Worker & Workspace (DWW)",
    sector: "Cross (Workspace 4.0)",
    date: "2024-03-05",
    readTime: "12 min read",
    description:
      "Expert insights on the evolution of digital workplace technologies.",
    image: "/api/placeholder/300/200",
  },
  {
    id: 4,
    title: "Platform Economy Trends 2024",
    type: "Forecast Report",
    category: "Digital Business Platforms (DBP)",
    sector: "Tertiary (Services 4.0)",
    date: "2024-03-03",
    readTime: "35 min read",
    description:
      "Analysis of emerging trends in the platform economy landscape.",
    image: "/api/placeholder/300/200",
  },
  {
    id: 5,
    title: "Cybersecurity Best Practices",
    type: "Industry Brief",
    category: "Digital Accelerators Tools (DAT)",
    sector: "Cross (Economy 4.0)",
    date: "2024-03-01",
    readTime: "18 min read",
    description:
      "Essential cybersecurity practices for digital transformation initiatives.",
    image: "/api/placeholder/300/200",
  },
  {
    id: 6,
    title: "Sustainable Digital Innovation",
    type: "Research Note",
    category: "Digital Transformation 2.0 (DT2.0)",
    sector: "Cross (Agility 4.0)",
    date: "2024-02-28",
    readTime: "22 min read",
    description:
      "Research on sustainable approaches to digital innovation and transformation.",
    image: "/api/placeholder/300/200",
  },
];

export const ExploreInsightsFilter: React.FC = () => {
  const navigate = useNavigate();
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [showFilterModal, setShowFilterModal] = useState(false);

  // Get the DTMI marketplace configuration
  const config = getMarketplaceConfig("dtmi");
  const filterCategories =
    config.writtenFilterCategories || config.filterCategories;

  // Initialize filter sections with expanded state
  const [filterSections, setFilterSections] = useState<FilterSection[]>(() => {
    return filterCategories.map((category) => ({
      id: category.id,
      title: category.title,
      expanded: false,
      options: category.options || [],
    }));
  });

  const toggleSection = useCallback((sectionId: string) => {
    setFilterSections((prev) =>
      prev.map((section) =>
        section.id === sectionId
          ? { ...section, expanded: !section.expanded }
          : section,
      ),
    );
  }, []);

  const handleFilterChange = useCallback((filterName: string) => {
    setActiveFilters((prev) => {
      if (prev.includes(filterName)) {
        return prev.filter((f) => f !== filterName);
      } else {
        return [...prev, filterName];
      }
    });
  }, []);

  const clearAllFilters = useCallback(() => {
    setActiveFilters([]);
  }, []);

  const handleExploreAll = useCallback(() => {
    // Navigate to marketplace with current filters
    const params = new URLSearchParams();
    if (activeFilters.length > 0) {
      params.set("contentType", activeFilters.join(","));
    }
    navigate(`/marketplace/dtmi?${params.toString()}`);
  }, [navigate, activeFilters]);

  // Filter publications based on active filters
  const filteredPublications = samplePublications.filter((pub) => {
    if (activeFilters.length === 0) return true;
    return activeFilters.some(
      (filter) =>
        pub.type.includes(filter) ||
        pub.category.includes(filter) ||
        pub.sector.includes(filter),
    );
  });

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header with Filter Button aligned to the right */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Explore Insights
            </h2>
            <p className="text-gray-600">
              Discover valuable perspectives and expert-driven content to guide
              your digital transformation journey.
            </p>
          </div>
          <button
            onClick={() => setShowFilterModal(true)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Filter size={20} />
            Filter
            {activeFilters.length > 0 && (
              <span className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs">
                {activeFilters.length}
              </span>
            )}
          </button>
        </div>

        {/* Active Filters Display */}
        {activeFilters.length > 0 && (
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-sm font-medium text-gray-700">
                Active filters:
              </span>
              <button
                onClick={clearAllFilters}
                className="text-sm text-blue-600 hover:text-blue-800 font-medium"
              >
                Clear all
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {activeFilters.map((filter) => (
                <span
                  key={filter}
                  className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                >
                  {filter}
                  <button
                    onClick={() => handleFilterChange(filter)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Publications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredPublications.map((publication) => (
            <div
              key={publication.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => navigate(`/blog/${publication.id}`)}
            >
              <div className="h-48 bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
                <div className="text-center p-4">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Filter className="text-blue-600" size={24} />
                  </div>
                  <div className="text-sm font-medium text-gray-600">
                    {publication.type}
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                    {publication.type}
                  </span>
                  <span className="text-xs text-gray-500">
                    {publication.readTime}
                  </span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                  {publication.title}
                </h3>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {publication.description}
                </p>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>{publication.category}</span>
                  <span>{new Date(publication.date).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mb-8">
          <button
            onClick={handleExploreAll}
            className="inline-flex items-center gap-2 px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            View All Publications
          </button>
        </div>

        {/* Filter Modal */}
        {showFilterModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900">
                  Filter Publications
                </h3>
                <button
                  onClick={() => setShowFilterModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
                {/* Filter Sections */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {filterSections.map((section) => (
                    <div
                      key={section.id}
                      className="border border-gray-200 rounded-lg"
                    >
                      <button
                        onClick={() => toggleSection(section.id)}
                        className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
                      >
                        <h4 className="font-medium text-gray-900">
                          {section.title}
                        </h4>
                        {section.expanded ? (
                          <ChevronUp size={20} className="text-gray-500" />
                        ) : (
                          <ChevronDown size={20} className="text-gray-500" />
                        )}
                      </button>

                      {section.expanded && (
                        <div className="border-t border-gray-200 p-4 max-h-64 overflow-y-auto">
                          <div className="space-y-3">
                            {section.options.map((option) => (
                              <div key={option.id}>
                                {/* Main category */}
                                {option.children ? (
                                  <div>
                                    <div className="font-medium text-sm text-gray-800 mb-2 border-b border-gray-100 pb-1">
                                      {option.name}
                                    </div>
                                    <div className="ml-4 space-y-2">
                                      {option.children.map((child) => (
                                        <label
                                          key={child.id}
                                          className="flex items-center gap-3 cursor-pointer text-sm"
                                        >
                                          <input
                                            type="checkbox"
                                            checked={activeFilters.includes(
                                              child.name,
                                            )}
                                            onChange={() =>
                                              handleFilterChange(child.name)
                                            }
                                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                          />
                                          <span className="text-gray-700">
                                            {child.name}
                                          </span>
                                        </label>
                                      ))}
                                    </div>
                                  </div>
                                ) : (
                                  <label className="flex items-center gap-3 cursor-pointer text-sm">
                                    <input
                                      type="checkbox"
                                      checked={activeFilters.includes(
                                        option.name,
                                      )}
                                      onChange={() =>
                                        handleFilterChange(option.name)
                                      }
                                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                    />
                                    <span className="text-gray-700">
                                      {option.name}
                                    </span>
                                  </label>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between p-6 border-t border-gray-200">
                <button
                  onClick={clearAllFilters}
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  Clear all filters
                </button>
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowFilterModal(false)}
                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => setShowFilterModal(false)}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Apply Filters
                    {activeFilters.length > 0 && (
                      <span className="ml-2 bg-blue-500 text-white px-2 py-1 rounded-full text-xs">
                        {activeFilters.length}
                      </span>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
