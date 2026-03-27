import React, { useState, useMemo, useEffect } from "react";
import { BookCard } from "../../../components/books/BookCard";
import { featuredBooks, bookCategories } from "../../../utils/mockBookData";
import { getKnowledgeHubItems } from "../../../utils/mockMarketplaceData";
import { Book } from "../../../types/book";
import { useNavigate } from "react-router-dom";

interface BooksMarketplaceProps {
  searchQuery?: string;
  activeFilters?: string[];
}

export const BooksMarketplace: React.FC<BooksMarketplaceProps> = ({
  searchQuery = "",
  activeFilters = [],
}) => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"title" | "rating" | "date">("rating");
  const [marketplaceBooks, setMarketplaceBooks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch books from marketplace data
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const items = await getKnowledgeHubItems();
        // Filter only book items
        const bookItems = items.filter(
          (item) => item.mediaType === "Book" || item.filterType === "Books",
        );
        setMarketplaceBooks(bookItems);
      } catch (error) {
        console.error("Error fetching marketplace books:", error);
        // Fallback to featured books if marketplace fetch fails
        setMarketplaceBooks([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  // Convert marketplace book items to Book format for compatibility
  const convertedBooks = useMemo(() => {
    return marketplaceBooks.map(
      (item): Book => ({
        id: item.id.replace("book-", ""), // Remove 'book-' prefix if present
        title: item.title,
        author: item.author?.name || "Unknown Author",
        description: item.description,
        shortDescription: item.description.substring(0, 100) + "...",
        perspectiveOn: item.category || "Digital Transformation",
        coverImage: item.imageUrl,
        rating: 4.5, // Default rating since marketplace items don't have ratings
        reviewCount: Math.floor(Math.random() * 300) + 50, // Random review count
        category:
          bookCategories.find((cat) =>
            cat.name.toLowerCase().includes(item.category?.toLowerCase() || ""),
          ) || bookCategories[0],
        tags: item.tags || [],
        isbn: `978-${Math.random().toString().substring(2, 12)}`, // Generate random ISBN
        publishDate: item.date || new Date().toISOString(),
        pageCount: parseInt(item.readTime?.replace(/\D/g, "") || "300"),
        format: ["hardcover", "ebook"],
        availability: "available" as const,
        keyFocusArea: item.category || "Digital Transformation",
        reviewSummary: item.description.substring(0, 80) + "...",
        transformationImpactScore: Math.random() * 2 + 7, // Random score between 7-9
        actionabilityScore: Math.random() * 1 + 4, // Random score between 4-5
        strategicDepthScore: Math.random() * 1 + 4, // Random score between 4-5
        sixDDimensions: item.digital_perspective
          ? [item.digital_perspective]
          : [],
      }),
    );
  }, [marketplaceBooks]);

  // Combine marketplace books with featured books, avoiding duplicates
  const allBooks = useMemo(() => {
    const marketplaceBookIds = new Set(convertedBooks.map((book) => book.id));
    const uniqueFeaturedBooks = featuredBooks.filter(
      (book) => !marketplaceBookIds.has(book.id),
    );
    return [...convertedBooks, ...uniqueFeaturedBooks];
  }, [convertedBooks]);

  // Filter and sort books
  const filteredBooks = useMemo(() => {
    let filtered = allBooks;

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (book) =>
          book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
          book.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          book.tags.some((tag) =>
            tag.toLowerCase().includes(searchQuery.toLowerCase()),
          ),
      );
    }

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (book) => book.category.id === selectedCategory,
      );
    }

    // Filter by active filters (tags)
    if (activeFilters.length > 0) {
      filtered = filtered.filter((book) =>
        activeFilters.some(
          (filter) =>
            book.tags.some((tag) =>
              tag.toLowerCase().includes(filter.toLowerCase()),
            ) ||
            book.category.name.toLowerCase().includes(filter.toLowerCase()) ||
            book.perspectiveOn.toLowerCase().includes(filter.toLowerCase()),
        ),
      );
    }

    // Sort books
    return filtered.sort((a, b) => {
      switch (sortBy) {
        case "title":
          return a.title.localeCompare(b.title);
        case "rating":
          return b.rating - a.rating;
        case "date":
          return (
            new Date(b.publishDate).getTime() -
            new Date(a.publishDate).getTime()
          );
        default:
          return 0;
      }
    });
  }, [searchQuery, selectedCategory, activeFilters, sortBy, allBooks]);

  const handleBookExplore = (book: Book) => {
    navigate(`/books/${book.id}`);
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-center items-center py-16">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading books...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Filters and Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex flex-wrap gap-3">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Categories</option>
            {bookCategories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>

          <select
            value={sortBy}
            onChange={(e) =>
              setSortBy(e.target.value as "title" | "rating" | "date")
            }
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="rating">Sort by Rating</option>
            <option value="title">Sort by Title</option>
            <option value="date">Sort by Date</option>
          </select>
        </div>

        <div className="text-sm text-gray-600">
          Showing {filteredBooks.length} of {allBooks.length} books
        </div>
      </div>

      {/* Books Grid */}
      {filteredBooks.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBooks.map((book) => (
            <BookCard key={book.id} book={book} onExplore={handleBookExplore} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="bg-gray-50 rounded-xl p-12 max-w-lg mx-auto">
            <div className="text-6xl mb-6">📚</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              No books found
            </h3>
            <p className="text-gray-600 mb-6">
              {searchQuery || activeFilters.length > 0
                ? "Try adjusting your search or filters to find more books."
                : "Our digital transformation library is being updated."}
            </p>
            <button
              onClick={() => {
                setSelectedCategory("all");
                // Clear search would need to be handled by parent component
              }}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              View All Books
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
