import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Search, Menu } from "lucide-react";
import { Footer } from "../../../shared/Footer";
import { getKnowledgeHubItems } from "../../../utils/mockMarketplaceData";

interface ContentItem {
  id: number;
  title: string;
  summary: string;
  imageUrl: string;
  slug: string;
  publishedAt: string;
  dimension?: string;
  type?: string;
}

const categories = [
  { name: "Latest Insights", path: "/marketplace/dtmi" },
  { name: "6XD", path: "/6xd" },
  { name: "Digital Streams", path: "/marketplace/dtmi?tab=streams" },
  { name: "Digital Domains", path: "/marketplace/dtmi?tab=domains" },
  { name: "Digital Sectors", path: "/marketplace/dtmi?tab=sectors" },
  { name: "Multimedia", path: "/marketplace/dtmi?tab=multimedia" },
];

export function SixDimensionsPage() {
  const navigate = useNavigate();
  const [items, setItems] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const allItems = await getKnowledgeHubItems();
      setItems(allItems);
    } catch (error) {
      console.error("Error fetching content:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleItemClick = (slug: string) => {
    navigate(`/media/${slug}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  // Filter items by dimension
  const getItemsByDimension = (dimension: string) => {
    return items.filter(
      (item) =>
        item.dimension?.includes(dimension) ||
        item.type?.includes(dimension) ||
        item.summary?.includes(dimension),
    );
  };

  // Organize content by 6 dimensions
  const d1Items = getItemsByDimension("Digital Economy 4.0").slice(0, 6);
  const d2Items = getItemsByDimension("Digital Cognitive Organisation").slice(
    0,
    6,
  );
  const d3Items = getItemsByDimension("Digital Business Platform").slice(0, 6);
  const d4Items = getItemsByDimension("Digital Transformation 2.0").slice(0, 6);
  const d5Items = getItemsByDimension("Digital Worker").slice(0, 6);
  const d6Items = getItemsByDimension("Digital Accelerators").slice(0, 6);

  // Fallback: if no dimension-specific items, use general items
  const fallbackItems = items.slice(0, 36);
  const sections = [
    {
      id: "d1",
      title: "D1 - Digital Economy 4.0 (E4.0)",
      items: d1Items.length > 0 ? d1Items : fallbackItems.slice(0, 6),
      color: "bg-blue-600",
    },
    {
      id: "d2",
      title: "D2 - Digital Cognitive Organisation (DCO)",
      items: d2Items.length > 0 ? d2Items : fallbackItems.slice(6, 12),
      color: "bg-purple-600",
    },
    {
      id: "d3",
      title: "D3 - Digital Business Platform (DBP)",
      items: d3Items.length > 0 ? d3Items : fallbackItems.slice(12, 18),
      color: "bg-green-600",
    },
    {
      id: "d4",
      title: "D4 - Digital Transformation 2.0 (DT2.0)",
      items: d4Items.length > 0 ? d4Items : fallbackItems.slice(18, 24),
      color: "bg-orange-600",
    },
    {
      id: "d5",
      title: "D5 - Digital Worker & Digital Workspace",
      items: d5Items.length > 0 ? d5Items : fallbackItems.slice(24, 30),
      color: "bg-pink-600",
    },
    {
      id: "d6",
      title: "D6 - Digital Accelerators (Tools)",
      items: d6Items.length > 0 ? d6Items : fallbackItems.slice(30, 36),
      color: "bg-teal-600",
    },
  ];

  // Render dimension section
  const renderDimensionSection = (
    section: {
      id: string;
      title: string;
      items: ContentItem[];
      color: string;
    },
    index: number,
  ) => {
    const bgColor = index % 2 === 0 ? "bg-gray-50" : "bg-white";

    // D3 uses a grid layout with 5 articles: 2 left + 1 large center + 2 right
    if (section.id === "d3") {
      const leftItems = section.items.slice(0, 2);
      const featuredItem = section.items[2];
      const rightItems = section.items.slice(3, 5);
      const tickerItems = section.items.slice(5, 10);

      return (
        <section key={section.id} className={`py-16 ${bgColor}`}>
          <div className="container mx-auto px-4">
            {/* Section Header */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <div className={`w-2 h-12 ${section.color} rounded`}></div>
                <h2 className="text-3xl font-bold text-gray-900">
                  {section.title}
                </h2>
              </div>
              <button
                onClick={() =>
                  navigate(
                    `/marketplace/dtmi?dimension=${encodeURIComponent(section.title)}`,
                  )
                }
                className="text-brand-coral hover:text-brand-coral/80 transition-colors font-semibold flex items-center gap-2"
              >
                View all
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

            {section.items.length > 0 ? (
              <>
                {/* Grid Layout: 2 Left + 1 Large Center + 2 Right */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
                  {/* Left Column - 2 Articles Stacked */}
                  <div className="lg:col-span-3 space-y-6">
                    {leftItems.map((item) => (
                      <div
                        key={item.id}
                        className="group cursor-pointer bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all"
                        onClick={() => handleItemClick(item.slug)}
                      >
                        <div className="relative h-48 overflow-hidden">
                          <img
                            src={item.imageUrl}
                            alt={item.title}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        </div>
                        <div className="p-4">
                          <h3 className="text-base font-bold text-gray-900 mb-2 group-hover:text-brand-coral transition-colors line-clamp-2 leading-tight">
                            {item.title}
                          </h3>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Center Column - Large Featured Article */}
                  <div className="lg:col-span-6">
                    {featuredItem && (
                      <div
                        className="group cursor-pointer bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all h-full"
                        onClick={() => handleItemClick(featuredItem.slug)}
                      >
                        <div className="relative h-96 overflow-hidden">
                          <img
                            src={featuredItem.imageUrl}
                            alt={featuredItem.title}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                          <div className="absolute top-4 left-4">
                            <span className="bg-red-600 text-white text-xs font-bold px-3 py-1 uppercase rounded">
                              TRENDING
                            </span>
                          </div>
                        </div>
                        <div className="p-6">
                          <h2 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-brand-coral transition-colors leading-tight">
                            {featuredItem.title}
                          </h2>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Right Column - 2 Articles Stacked */}
                  <div className="lg:col-span-3 space-y-6">
                    {rightItems.map((item) => (
                      <div
                        key={item.id}
                        className="group cursor-pointer bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all"
                        onClick={() => handleItemClick(item.slug)}
                      >
                        <div className="relative h-48 overflow-hidden">
                          <img
                            src={item.imageUrl}
                            alt={item.title}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        </div>
                        <div className="p-4">
                          <h3 className="text-base font-bold text-gray-900 mb-2 group-hover:text-brand-coral transition-colors line-clamp-2 leading-tight">
                            {item.title}
                          </h3>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Scrolling Ticker */}
                {tickerItems.length > 0 && (
                  <div className="relative overflow-hidden py-4 border-t border-gray-300">
                    <div className="animate-scroll flex gap-8 whitespace-nowrap">
                      {tickerItems.map((item) => (
                        <div
                          key={item.id}
                          className="group cursor-pointer inline-block"
                          onClick={() => handleItemClick(item.slug)}
                        >
                          <span className="text-sm font-semibold text-gray-900 hover:text-brand-coral transition-colors">
                            {item.title}
                          </span>
                        </div>
                      ))}
                      {tickerItems.map((item) => (
                        <div
                          key={`dup-${item.id}`}
                          className="group cursor-pointer inline-block"
                          onClick={() => handleItemClick(item.slug)}
                        >
                          <span className="text-sm font-semibold text-gray-900 hover:text-brand-coral transition-colors">
                            {item.title}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-12 text-gray-500">
                <p>No content available for this dimension yet.</p>
              </div>
            )}
          </div>
        </section>
      );
    }

    // D2 uses a different layout: large featured + sidebar
    if (section.id === "d2") {
      const featuredItem = section.items[0];
      const sidebarItems = section.items.slice(1, 5);
      const tickerItems = section.items.slice(5, 10);

      return (
        <section key={section.id} className={`py-16 ${bgColor}`}>
          <div className="container mx-auto px-4">
            {/* Section Header */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <div className={`w-2 h-12 ${section.color} rounded`}></div>
                <h2 className="text-3xl font-bold text-gray-900">
                  {section.title}
                </h2>
              </div>
              <button
                onClick={() =>
                  navigate(
                    `/marketplace/dtmi?dimension=${encodeURIComponent(section.title)}`,
                  )
                }
                className="text-brand-coral hover:text-brand-coral/80 transition-colors font-semibold flex items-center gap-2"
              >
                View all
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

            {section.items.length > 0 ? (
              <>
                {/* Two Column Layout: Featured + Sidebar */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                  {/* Left: Large Featured Article */}
                  <div className="lg:col-span-2">
                    {featuredItem && (
                      <div
                        className="group cursor-pointer bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all"
                        onClick={() => handleItemClick(featuredItem.slug)}
                      >
                        <div className="relative h-96 overflow-hidden">
                          <img
                            src={featuredItem.imageUrl}
                            alt={featuredItem.title}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                          <div className="absolute top-4 left-4">
                            <span className="bg-gray-700 text-white text-xs font-semibold px-3 py-1 rounded">
                              Digital Transformation
                            </span>
                          </div>
                        </div>
                        <div className="p-8">
                          <h2 className="text-3xl font-bold text-gray-900 mb-4 group-hover:text-brand-coral transition-colors leading-tight">
                            {featuredItem.title}
                          </h2>
                          <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                            {featuredItem.summary}
                          </p>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span>• 5 min read</span>
                            <span>• Recently published</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Right: Related Blogs Sidebar */}
                  <div className="lg:col-span-1">
                    <div className="bg-white rounded-lg shadow-md p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-6">
                        Related Blogs
                      </h3>
                      <div className="space-y-6">
                        {sidebarItems.map((item) => (
                          <div
                            key={item.id}
                            className="group cursor-pointer flex gap-4"
                            onClick={() => handleItemClick(item.slug)}
                          >
                            <div className="flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden">
                              <img
                                src={item.imageUrl}
                                alt={item.title}
                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                              />
                            </div>
                            <div className="flex-1">
                              <h4 className="text-sm font-bold text-gray-900 mb-2 group-hover:text-brand-coral transition-colors line-clamp-2 leading-tight">
                                {item.title}
                              </h4>
                              <p className="text-xs text-gray-500">
                                Recently published
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Scrolling Ticker */}
                {tickerItems.length > 0 && (
                  <div className="relative overflow-hidden py-4 border-t border-gray-300">
                    <div className="animate-scroll flex gap-8 whitespace-nowrap">
                      {tickerItems.map((item) => (
                        <div
                          key={item.id}
                          className="group cursor-pointer inline-block"
                          onClick={() => handleItemClick(item.slug)}
                        >
                          <span className="text-sm font-semibold text-gray-900 hover:text-brand-coral transition-colors">
                            {item.title}
                          </span>
                        </div>
                      ))}
                      {tickerItems.map((item) => (
                        <div
                          key={`dup-${item.id}`}
                          className="group cursor-pointer inline-block"
                          onClick={() => handleItemClick(item.slug)}
                        >
                          <span className="text-sm font-semibold text-gray-900 hover:text-brand-coral transition-colors">
                            {item.title}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-12 text-gray-500">
                <p>No content available for this dimension yet.</p>
              </div>
            )}
          </div>
        </section>
      );
    }

    // Default layout for other sections (D1, D3-D6)
    const featuredItem = section.items[2]; // Center featured
    const leftItems = section.items.slice(0, 2);
    const rightItems = section.items.slice(3, 5);
    const tickerItems = section.items.slice(5, 10);

    return (
      <section key={section.id} className={`py-16 ${bgColor}`}>
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className={`w-2 h-12 ${section.color} rounded`}></div>
              <h2 className="text-3xl font-bold text-gray-900">
                {section.title}
              </h2>
            </div>
            <button
              onClick={() =>
                navigate(
                  `/marketplace/dtmi?dimension=${encodeURIComponent(section.title)}`,
                )
              }
              className="text-brand-coral hover:text-brand-coral/80 transition-colors font-semibold flex items-center gap-2"
            >
              View all
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

          {section.items.length > 0 ? (
            <>
              {/* Main Grid Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
                {/* Left Column - 2 Small Articles */}
                <div className="lg:col-span-3 space-y-6">
                  {leftItems.map((item) => (
                    <div
                      key={item.id}
                      className="group cursor-pointer bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all"
                      onClick={() => handleItemClick(item.slug)}
                    >
                      <div className="relative h-40 overflow-hidden">
                        <img
                          src={item.imageUrl}
                          alt={item.title}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="text-sm font-bold text-gray-900 mb-2 group-hover:text-brand-coral transition-colors line-clamp-3 leading-tight">
                          {item.title}
                        </h3>
                        <p className="text-xs text-gray-500">
                          {item.publishedAt &&
                            new Date(item.publishedAt).toLocaleDateString(
                              "en-US",
                              {
                                month: "long",
                                day: "numeric",
                                year: "numeric",
                              },
                            )}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Center Column - Large Featured Article */}
                <div className="lg:col-span-6">
                  {featuredItem && (
                    <div
                      className="group cursor-pointer bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all h-full"
                      onClick={() => handleItemClick(featuredItem.slug)}
                    >
                      <div className="relative h-80 overflow-hidden">
                        <img
                          src={featuredItem.imageUrl}
                          alt={featuredItem.title}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute top-4 left-4">
                          <span className="bg-red-600 text-white text-xs font-bold px-3 py-1 uppercase rounded">
                            TRENDING
                          </span>
                        </div>
                      </div>
                      <div className="p-6">
                        <h2 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-brand-coral transition-colors line-clamp-2 leading-tight">
                          {featuredItem.title}
                        </h2>
                        <p className="text-gray-600 mb-4 line-clamp-3">
                          {featuredItem.summary}
                        </p>
                        <p className="text-sm text-gray-500">
                          {featuredItem.publishedAt &&
                            new Date(
                              featuredItem.publishedAt,
                            ).toLocaleDateString("en-US", {
                              month: "long",
                              day: "numeric",
                              year: "numeric",
                            })}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Right Column - 2 Small Articles */}
                <div className="lg:col-span-3 space-y-6">
                  {rightItems.map((item) => (
                    <div
                      key={item.id}
                      className="group cursor-pointer bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all"
                      onClick={() => handleItemClick(item.slug)}
                    >
                      <div className="relative h-40 overflow-hidden">
                        <img
                          src={item.imageUrl}
                          alt={item.title}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="text-sm font-bold text-gray-900 mb-2 group-hover:text-brand-coral transition-colors line-clamp-3 leading-tight">
                          {item.title}
                        </h3>
                        <p className="text-xs text-gray-500">
                          {item.publishedAt &&
                            new Date(item.publishedAt).toLocaleDateString(
                              "en-US",
                              {
                                month: "long",
                                day: "numeric",
                                year: "numeric",
                              },
                            )}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Scrolling Ticker */}
              {tickerItems.length > 0 && (
                <div className="relative overflow-hidden py-4 border-t border-gray-300">
                  <div className="animate-scroll flex gap-8 whitespace-nowrap">
                    {tickerItems.map((item) => (
                      <div
                        key={item.id}
                        className="group cursor-pointer inline-block"
                        onClick={() => handleItemClick(item.slug)}
                      >
                        <span className="text-sm font-semibold text-gray-900 hover:text-brand-coral transition-colors">
                          {item.title}
                        </span>
                      </div>
                    ))}
                    {/* Duplicate for seamless loop */}
                    {tickerItems.map((item) => (
                      <div
                        key={`dup-${item.id}`}
                        className="group cursor-pointer inline-block"
                        onClick={() => handleItemClick(item.slug)}
                      >
                        <span className="text-sm font-semibold text-gray-900 hover:text-brand-coral transition-colors">
                          {item.title}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12 text-gray-500">
              <p>No content available for this dimension yet.</p>
            </div>
          )}
        </div>
      </section>
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Custom CNN-Style Header */}
      <header className="sticky top-0 z-50 bg-black text-white shadow-lg">
        {/* Top Bar with Logo, Navigation, and Actions */}
        <div className="border-b border-gray-800">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              {/* Left: Menu + Logo */}
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="text-white hover:text-brand-coral transition-colors"
                >
                  <Menu size={24} />
                </button>
                <Link to="/" className="flex items-center">
                  <img
                    src="/images/DQ Logo White.svg"
                    alt="DigitalQatalyst"
                    className="h-10"
                  />
                </Link>
              </div>

              {/* Right: CTA Button */}
              <Link
                to="/consultation"
                className="bg-brand-coral text-white px-6 py-2 rounded-lg font-semibold text-sm hover:bg-opacity-90 transition-all"
              >
                Get In Touch
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-gray-900 border-t border-gray-800">
            <div className="container mx-auto px-4 py-4">
              {/* Mobile Categories */}
              <div className="space-y-2 mb-4">
                {categories.map((category) => (
                  <Link
                    key={category.name}
                    to={category.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block text-white hover:text-brand-coral py-2 transition-colors"
                  >
                    {category.name}
                  </Link>
                ))}
              </div>

              {/* Mobile Actions */}
              <div className="space-y-2 pt-4 border-t border-gray-800">
                <button
                  onClick={() => {
                    navigate("/marketplace/dtmi?contentType=video");
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-2 text-white hover:text-brand-coral py-2 transition-colors w-full"
                >
                  <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                  <span>Watch</span>
                </button>
                <button
                  onClick={() => {
                    navigate("/marketplace/dtmi?contentType=podcast");
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-2 text-white hover:text-brand-coral py-2 transition-colors w-full"
                >
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z" />
                  </svg>
                  <span>Listen</span>
                </button>
              </div>

              {/* Mobile CTA */}
              <Link
                to="/consultation"
                className="block mt-4 bg-brand-coral text-white text-center px-6 py-2 rounded-lg font-semibold"
                onClick={() => setMobileMenuOpen(false)}
              >
                Get In Touch
              </Link>
            </div>
          </div>
        )}
      </header>

      <main className="flex-grow">
        {/* Hero Banner Section - CNN Style with Data Streams */}
        <section className="relative bg-gradient-to-r from-gray-900 via-gray-800 to-black text-white overflow-hidden">
          {/* Animated Background - Data Streams */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0 bg-gradient-to-br from-brand-coral/10 to-transparent"></div>
            {/* Binary Code Animation */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="binary-rain">
                {[...Array(20)].map((_, i) => (
                  <div
                    key={i}
                    className="binary-column"
                    style={{
                      left: `${i * 5}%`,
                      animationDelay: `${i * 0.2}s`,
                      animationDuration: `${3 + Math.random() * 2}s`,
                    }}
                  >
                    {[...Array(15)].map((_, j) => (
                      <span key={j} className="binary-digit">
                        {Math.random() > 0.5 ? "1" : "0"}
                      </span>
                    ))}
                  </div>
                ))}
              </div>
            </div>
            {/* Data Matrix Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,107,77,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,107,77,0.03)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
          </div>

          <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              {/* Left Side - Text Content */}
              <div className="z-10">
                <div className="flex items-center gap-3 mb-6">
                  <img
                    src="/images/DQ Logo White.svg"
                    alt="DigitalQatalyst"
                    className="h-8"
                  />
                  <span className="text-brand-coral text-2xl font-bold glitch-text">
                    6 Dimensions
                  </span>
                </div>
                <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                  A journey of{" "}
                  <span className="text-brand-coral glitch-text">
                    digital transformation
                  </span>{" "}
                  begins with a single click
                </h1>
                <p className="text-xl md:text-2xl text-gray-300 mb-8">
                  Explore the six foundational dimensions driving organizational
                  excellence in the digital age
                </p>
                <button
                  onClick={() => navigate("/marketplace/dtmi")}
                  className="bg-brand-coral text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-opacity-90 transition-all shadow-lg hover:shadow-xl hover:scale-105 transform duration-300"
                >
                  START YOUR JOURNEY
                </button>
              </div>

              {/* Right Side - Visual Element with Data Streams */}
              <div className="relative h-64 md:h-96 lg:h-full min-h-[400px]">
                {/* Hexagonal Data Matrix */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-full h-full">
                    {/* Central Hexagon */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 hexagon-shape bg-gradient-to-br from-brand-coral/30 to-transparent border-2 border-brand-coral animate-pulse-slow">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-6xl font-bold text-brand-coral">
                          6XD
                        </span>
                      </div>
                    </div>

                    {/* Orbiting Data Points */}
                    {[...Array(6)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute top-1/2 left-1/2 w-16 h-16 -ml-8 -mt-8"
                        style={{
                          animation: `orbit ${10 + i}s linear infinite`,
                          animationDelay: `${i * 0.5}s`,
                        }}
                      >
                        <div className="w-full h-full rounded-full bg-brand-coral/50 border-2 border-brand-coral flex items-center justify-center text-xs font-bold">
                          D{i + 1}
                        </div>
                      </div>
                    ))}

                    {/* Flowing Data Streams */}
                    <svg
                      className="absolute inset-0 w-full h-full"
                      style={{ filter: "blur(1px)" }}
                    >
                      {[...Array(8)].map((_, i) => (
                        <path
                          key={i}
                          d={`M ${50 + i * 50} 0 Q ${100 + i * 30} ${200 + i * 20} ${50 + i * 50} 400`}
                          stroke="rgba(255, 107, 77, 0.3)"
                          strokeWidth="2"
                          fill="none"
                          className="data-stream"
                          style={{ animationDelay: `${i * 0.3}s` }}
                        />
                      ))}
                    </svg>
                  </div>
                </div>

                {/* Glitch Effect Overlay */}
                <div className="absolute inset-0 glitch-overlay pointer-events-none"></div>
              </div>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-1/3 h-full bg-brand-coral opacity-5 transform skew-x-12"></div>

          {/* Particle Effect */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(30)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-brand-coral rounded-full animate-float"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 5}s`,
                  animationDuration: `${5 + Math.random() * 10}s`,
                }}
              ></div>
            ))}
          </div>
        </section>

        {/* Navigation Bar - Below Hero */}
        <section className="sticky top-16 z-40 bg-black border-b border-gray-800">
          <div className="container mx-auto px-4">
            <nav className="flex items-center justify-between py-4">
              {/* Left: Category Links */}
              <div className="flex items-center space-x-8">
                {categories.map((category) => (
                  <Link
                    key={category.name}
                    to={category.path}
                    className="text-sm font-semibold text-white hover:text-brand-coral transition-colors whitespace-nowrap"
                  >
                    {category.name}
                  </Link>
                ))}
              </div>

              {/* Right: Watch, Listen, Search */}
              <div className="flex items-center gap-6">
                <button
                  onClick={() =>
                    navigate("/marketplace/dtmi?contentType=video")
                  }
                  className="flex items-center gap-2 text-white hover:text-brand-coral transition-colors"
                >
                  <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                  <span className="text-sm font-semibold">Watch</span>
                </button>
                <button
                  onClick={() =>
                    navigate("/marketplace/dtmi?contentType=podcast")
                  }
                  className="flex items-center gap-2 text-white hover:text-brand-coral transition-colors"
                >
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z" />
                  </svg>
                  <span className="text-sm font-semibold">Listen</span>
                </button>
                <button
                  onClick={() => navigate("/marketplace/dtmi")}
                  className="text-white hover:text-brand-coral transition-colors"
                >
                  <Search size={20} />
                </button>
              </div>
            </nav>
          </div>
        </section>

        {/* 6 Dimension Sections */}
        {sections.map((section, index) =>
          renderDimensionSection(section, index),
        )}

        {/* CSS for scrolling animation */}
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

          /* Binary Rain Animation */
          .binary-rain {
            position: absolute;
            width: 100%;
            height: 100%;
            overflow: hidden;
          }
          .binary-column {
            position: absolute;
            top: -100%;
            font-family: 'Courier New', monospace;
            font-size: 14px;
            color: rgba(255, 107, 77, 0.6);
            animation: fall linear infinite;
          }
          .binary-digit {
            display: block;
            line-height: 1.5;
          }
          @keyframes fall {
            0% {
              transform: translateY(-100%);
              opacity: 0;
            }
            10% {
              opacity: 1;
            }
            90% {
              opacity: 1;
            }
            100% {
              transform: translateY(100vh);
              opacity: 0;
            }
          }

          /* Glitch Text Effect */
          .glitch-text {
            position: relative;
            animation: glitch 3s infinite;
          }
          @keyframes glitch {
            0%, 90%, 100% {
              transform: translate(0);
            }
            92% {
              transform: translate(-2px, 2px);
            }
            94% {
              transform: translate(2px, -2px);
            }
            96% {
              transform: translate(-2px, -2px);
            }
            98% {
              transform: translate(2px, 2px);
            }
          }

          /* Hexagon Shape */
          .hexagon-shape {
            clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
          }

          /* Orbit Animation */
          @keyframes orbit {
            0% {
              transform: rotate(0deg) translateX(150px) rotate(0deg);
            }
            100% {
              transform: rotate(360deg) translateX(150px) rotate(-360deg);
            }
          }

          /* Pulse Slow */
          .animate-pulse-slow {
            animation: pulse-slow 3s ease-in-out infinite;
          }
          @keyframes pulse-slow {
            0%, 100% {
              opacity: 1;
              transform: scale(1);
            }
            50% {
              opacity: 0.7;
              transform: scale(1.05);
            }
          }

          /* Data Stream Animation */
          .data-stream {
            stroke-dasharray: 1000;
            stroke-dashoffset: 1000;
            animation: stream 4s linear infinite;
          }
          @keyframes stream {
            to {
              stroke-dashoffset: 0;
            }
          }

          /* Glitch Overlay */
          .glitch-overlay {
            animation: glitch-overlay 5s infinite;
          }
          @keyframes glitch-overlay {
            0%, 95%, 100% {
              opacity: 0;
            }
            96% {
              opacity: 0.1;
              background: linear-gradient(90deg, transparent 0%, rgba(255, 107, 77, 0.3) 50%, transparent 100%);
            }
            97% {
              opacity: 0;
            }
            98% {
              opacity: 0.15;
              background: linear-gradient(90deg, transparent 0%, rgba(3, 15, 53, 0.3) 50%, transparent 100%);
            }
          }

          /* Float Animation */
          @keyframes float {
            0%, 100% {
              transform: translateY(0) translateX(0);
              opacity: 0;
            }
            10% {
              opacity: 1;
            }
            90% {
              opacity: 1;
            }
            100% {
              transform: translateY(-100vh) translateX(50px);
              opacity: 0;
            }
          }
          .animate-float {
            animation: float linear infinite;
          }
        `}</style>
      </main>

      <Footer isLoggedIn={false} />
    </div>
  );
}
