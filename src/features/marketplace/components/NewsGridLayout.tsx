import { useNavigate } from "react-router-dom";

interface ContentItem {
  id: string;
  title: string;
  excerpt?: string;
  description?: string;
  thumbnail_url?: string;
  published_at?: string;
  content_type?: string;
  dimension?: string;
  tags?: string[];
  slug?: string;
}

interface NewsGridLayoutProps {
  items: ContentItem[];
}

export function NewsGridLayout({ items }: NewsGridLayoutProps) {
  const navigate = useNavigate();

  if (!items || items.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No content available</p>
      </div>
    );
  }

  const handleItemClick = (item: ContentItem) => {
    if (item.slug) {
      navigate(`/media/${item.slug}`);
    }
  };

  // CNN-style layout sections
  const heroItem = items[0];
  const topStories = items.slice(1, 5); // 4 items
  const gridItems = items.slice(5);

  return (
    <div className="max-w-[1400px] mx-auto space-y-6">
      {/* Hero + Top Stories Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Large Hero Article - Takes 2 columns */}
        <div
          onClick={() => handleItemClick(heroItem)}
          className="lg:col-span-2 relative group cursor-pointer overflow-hidden bg-black"
        >
          {heroItem.thumbnail_url && (
            <img
              src={heroItem.thumbnail_url}
              alt={heroItem.title}
              className="w-full h-[400px] lg:h-[500px] object-cover group-hover:opacity-90 transition-opacity"
            />
          )}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/70 to-transparent p-6">
            <h2 className="text-white text-2xl lg:text-3xl font-bold leading-tight group-hover:underline">
              {heroItem.title}
            </h2>
          </div>
        </div>

        {/* Top Stories Column - 4 smaller items stacked */}
        <div className="space-y-4">
          {topStories.map((item) => (
            <div
              key={item.id}
              onClick={() => handleItemClick(item)}
              className="group cursor-pointer flex gap-3 pb-4 border-b border-gray-200 last:border-0"
            >
              {item.thumbnail_url && (
                <img
                  src={item.thumbnail_url}
                  alt={item.title}
                  className="w-24 h-20 object-cover flex-shrink-0"
                />
              )}
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-bold text-gray-900 line-clamp-3 group-hover:underline">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Grid Section - Multiple rows */}
      <div className="space-y-6">
        {/* Process items in groups of 4 for each row */}
        {Array.from({ length: Math.ceil(gridItems.length / 4) }).map(
          (_, rowIndex) => {
            const rowItems = gridItems.slice(rowIndex * 4, (rowIndex + 1) * 4);

            return (
              <div
                key={rowIndex}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
              >
                {rowItems.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => handleItemClick(item)}
                    className="group cursor-pointer"
                  >
                    {item.thumbnail_url && (
                      <div className="relative overflow-hidden mb-2">
                        <img
                          src={item.thumbnail_url}
                          alt={item.title}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    <h3 className="text-base font-bold text-gray-900 line-clamp-3 group-hover:underline leading-tight">
                      {item.title}
                    </h3>
                  </div>
                ))}
              </div>
            );
          },
        )}
      </div>
    </div>
  );
}
