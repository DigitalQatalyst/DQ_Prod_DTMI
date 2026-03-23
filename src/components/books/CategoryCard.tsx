import { BookCategory } from "../../types/book";
import { ArrowRight } from "lucide-react";

interface CategoryCardProps {
  category: BookCategory;
  bookCount?: number;
  onViewAll?: (category: BookCategory) => void;
}

export function CategoryCard({
  category,
  bookCount = 0,
  onViewAll,
}: CategoryCardProps) {
  const handleViewAll = () => {
    if (onViewAll) {
      onViewAll(category);
    }
  };

  return (
    <div
      className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300 group cursor-pointer"
      onClick={handleViewAll}
    >
      <div className="flex items-start justify-between mb-4">
        <div
          className={`w-12 h-12 ${category.color} rounded-lg flex items-center justify-center text-white text-2xl group-hover:scale-110 transition-transform duration-300`}
        >
          {category.icon}
        </div>
        <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-primary-500 group-hover:translate-x-1 transition-all duration-300" />
      </div>

      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-500 transition-colors">
        {category.name}
      </h3>

      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
        {category.description}
      </p>

      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-500">
          {bookCount} {bookCount === 1 ? "book" : "books"}
        </span>
        <span className="text-sm font-semibold text-primary-500 group-hover:underline">
          View All
        </span>
      </div>
    </div>
  );
}
