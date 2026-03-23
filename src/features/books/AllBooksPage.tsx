import { Header } from "../../shared/Header/Header";
import { Footer } from "../../shared/Footer/Footer";
import { useNavigate } from "react-router-dom";
import ModernDQChatbot from "../../shared/ModernDQChatbot";
import { useState } from "react";
import { featuredBooks, bookCategories } from "../../utils/mockBookData";
import { BookCard } from "../../components/books/BookCard";
import { Book, BookCategory } from "../../types/book";
import { Search, Filter, Grid, List, ArrowLeft } from "lucide-react";

const AllBooksPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("title");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [filteredBooks, setFilteredBooks] = useState<Book[]>(featuredBooks);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    filterBooks(query, selectedCategory, sortBy);
  };

  const handleCategoryFilter = (categoryId: string) => {
    setSelectedCategory(categoryId);
    filterBooks(searchQuery, categoryId, sortBy);
  };

  const handleSort = (sortOption: string) => {
    setSortBy(sortOption);
    filterBooks(searchQuery, selectedCategory, sortOption);
  };

  const filterBooks = (query: string, category: string, sort: string) => {
    let filtered = [...featuredBooks];

    // Filter by search query
    if (query) {
      filtered = filtered.filter(
        (book) =>
          book.title.toLowerCase().includes(query.toLowerCase()) ||
          book.author.toLowerCase().includes(query.toLowerCase()) ||
          book.tags.some((tag) =>
            tag.toLowerCase().includes(query.toLowerCase()),
          ),
      );
    }

    // Filter by category
    if (category !== "all") {
      filtered = filtered.filter((book) => book.category.id === category);
    }

    // Sort books
    switch (sort) {
      case "title":
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "author":
        filtered.sort((a, b) => a.author.localeCompare(b.author));
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "price":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "newest":
        filtered.sort(
          (a, b) =>
            new Date(b.publishDate).getTime() -
            new Date(a.publishDate).getTime(),
        );
        break;
      default:
        break;
    }

    setFilteredBooks(filtered);
  };

  const handleBookLearnMore = (book: Book) => {
    navigate(`/books/${book.id}`);
  };

  const handleBookBuyNow = (book: Book) => {
    window.open(book.amazonUrl, "_blank");
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-white">
      <Header />

      <main className="flex-1">
        {/* Header Section */}
        <section className="bg-gradient-to-r from-gray-50 to-blue-50 py-16">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex items-center gap-4 mb-8">
              <button
                onClick={() => navigate("/books")}
                className="flex items-center gap-2 text-gray-600 hover:text-primary-500 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                Back to Books Home
              </button>
            </div>

            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                All Books
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Explore our complete collection of digital transformation books
              </p>
            </div>

            {/* Search and Filters */}
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
                {/* Search Bar */}
                <div className="relative mb-6">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search books, authors, or topics..."
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>

                {/* Filters Row */}
                <div className="flex flex-wrap items-center justify-between gap-4">
                  {/* Category Filter */}
                  <div className="flex items-center gap-2">
                    <Filter className="w-5 h-5 text-gray-500" />
                    <select
                      value={selectedCategory}
                      onChange={(e) => handleCategoryFilter(e.target.value)}
                      className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      <option value="all">All Categories</option>
                      {bookCategories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Sort Options */}
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">Sort by:</span>
                    <select
                      value={sortBy}
                      onChange={(e) => handleSort(e.target.value)}
                      className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      <option value="title">Title</option>
                      <option value="author">Author</option>
                      <option value="rating">Rating</option>
                      <option value="price">Price</option>
                      <option value="newest">Newest</option>
                    </select>
                  </div>

                  {/* View Mode Toggle */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setViewMode("grid")}
                      className={`p-2 rounded-lg transition-colors ${
                        viewMode === "grid"
                          ? "bg-primary-500 text-white"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      <Grid className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setViewMode("list")}
                      className={`p-2 rounded-lg transition-colors ${
                        viewMode === "list"
                          ? "bg-primary-500 text-white"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      <List className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Books Grid/List */}
        <section className="py-16">
          <div className="container mx-auto px-4 md:px-6">
            {/* Results Count */}
            <div className="mb-8">
              <p className="text-gray-600">
                Showing {filteredBooks.length} of {featuredBooks.length} books
                {selectedCategory !== "all" && (
                  <span className="ml-2">
                    in{" "}
                    <span className="font-semibold">
                      {
                        bookCategories.find(
                          (cat) => cat.id === selectedCategory,
                        )?.name
                      }
                    </span>
                  </span>
                )}
              </p>
            </div>

            {/* Books Display */}
            {filteredBooks.length > 0 ? (
              <div
                className={
                  viewMode === "grid"
                    ? "grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
                    : "space-y-6"
                }
              >
                {filteredBooks.map((book) => (
                  <div
                    key={book.id}
                    className={viewMode === "list" ? "max-w-4xl mx-auto" : ""}
                  >
                    <BookCard
                      book={book}
                      onLearnMore={handleBookLearnMore}
                      onBuyNow={handleBookBuyNow}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                  <Search className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  No books found
                </h3>
                <p className="text-gray-600 mb-8">
                  Try adjusting your search criteria or browse all categories
                </p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("all");
                    setFilteredBooks(featuredBooks);
                  }}
                  className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
      <ModernDQChatbot />
    </div>
  );
};

export default AllBooksPage;
