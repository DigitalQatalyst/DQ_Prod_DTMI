import { Book } from "../../types/book";
import { Star, BookOpen, User } from "lucide-react";
import React from "react";

interface BookCardProps {
  book: Book;
  onExplore?: (book: Book) => void;
}

export function BookCard({ book, onExplore }: BookCardProps) {
  const renderStars = (rating: number) => {
    const stars: React.JSX.Element[] = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />,
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Star
          key="half"
          className="w-4 h-4 fill-yellow-400/50 text-yellow-400"
        />,
      );
    }

    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />);
    }

    return stars;
  };

  const handleExplore = () => {
    if (onExplore) {
      onExplore(book);
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300 group">
      {/* Book Cover */}
      <div className="relative mb-6">
        <div className="h-64 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg overflow-hidden">
          <img
            src={book.coverImage}
            alt={book.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              // Fallback to placeholder if image fails to load
              const target = e.target as HTMLImageElement;
              const parent = target.parentElement!;
              parent.innerHTML = `
                <div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-100">
                  <div class="text-center text-gray-600">
                    <div class="w-12 h-12 mx-auto mb-2 ${book.category.color} rounded-lg flex items-center justify-center text-white text-xl">
                      ${book.category.icon}
                    </div>
                    <p class="text-sm font-medium">Book Cover</p>
                  </div>
                </div>
              `;
            }}
          />
        </div>
      </div>

      {/* Book Info */}
      <div className="space-y-4">
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
            {book.title}
          </h3>
          <div className="flex items-center gap-2 mb-3">
            <User className="w-4 h-4 text-gray-500" />
            <p className="text-sm text-gray-600">by {book.author}</p>
          </div>
          <div className="mb-3">
            <span className="text-xs font-medium text-primary-600 bg-primary-50 px-2 py-1 rounded-full">
              {book.perspectiveOn}
            </span>
          </div>
          <p className="text-gray-600 text-sm line-clamp-3">
            {book.shortDescription}
          </p>
        </div>

        {/* Rating and Pages */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex">{renderStars(book.rating)}</div>
            <span className="text-sm text-gray-600">
              ({book.reviewCount} reviews)
            </span>
          </div>
          <div className="flex items-center gap-1 text-sm text-gray-500">
            <BookOpen className="w-4 h-4" />
            <span>{book.pageCount} pages</span>
          </div>
        </div>

        {/* Explore Button */}
        <div className="pt-2">
          <button
            onClick={handleExplore}
            className="w-full flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-800 py-3 rounded-lg font-semibold transition-colors border border-gray-200 hover:border-gray-300"
          >
            <BookOpen className="w-4 h-4" />
            View Book
          </button>
        </div>
      </div>
    </div>
  );
}
