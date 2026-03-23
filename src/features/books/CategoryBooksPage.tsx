import { Header } from "../../shared/Header/Header";
import { Footer } from "../../shared/Footer/Footer";
import { useNavigate, useParams } from "react-router-dom";
import ModernDQChatbot from "../../shared/ModernDQChatbot";
import { useState, useEffect } from "react";
import { featuredBooks, bookCategories } from "../../utils/mockBookData";
import { BookCard } from "../../components/books/BookCard";
import { Book, BookCategory } from "../../types/book";
import { ArrowLeft, Search, Filter, Grid, List } from "lucide-react";

const CategoryBooksPage = () => {
  const navigate = useNavigate();
  const { categorySlug } = useParams<{ categorySlug: string }>();
  const [category, setCategory] = useState<BookCategory | null>(null);
  const [books, setBooks] = useState<Book[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<string>("title");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  useEffect(() => {
    if (categorySlug) {
      const foundCategory = bookCategories.find(
        (cat) => cat.slug === categorySlug,
      );
      if (foundCategory) {
        setCategory(foundCategory);
        const categoryBooks = featuredBooks.filter(
          (book) => book.category.id === foundCategory.id,
        );
        setBooks(categoryBooks);
        setFilteredBooks(categoryBooks);
      }
    }
  }, [categorySlug]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    filterBooks(query, sortBy);
  };

  const handleSort = (sortOption: string) => {
    setSortBy(sortOption);
    filterBooks(searchQuery, sortOption);
  };

  const filterBooks = (query: string, sort: string) => {
    let filtered = [...books];

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

  if (!category) {
    return (
      <div className="flex flex-col w-full min-h-screen bg-white">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Category not found
            </h2>
            <button
              onClick={() => navigate("/books")}
              className="text-primary-500 hover:text-primary-600 font-semibold"
            >
              Return to Books
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

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
                Back to Books
              </button>
            </div>

            <div className="text-center mb-12">
              <div className="flex items-center justify-center mb-6">
                <div
                  className={`w-16 h-16 ${category.color} rounded-2xl flex items-center justify-center text-white text-3xl`}
                >
                  {category.icon}
                </div>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                {category.name}
              </h1>

              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                {category.description}
              </p>

              <div className="flex items-center justify-center gap-8 text-sm text-gray-600">
                <span>
                  {books.length} {books.length === 1 ? "book" : "books"}{" "}
                  available
                </span>
                <span>•</span>
                <span>Expert curated collection</span>
                <span>•</span>
                <span>Updated regularly</span>
              </div>
            </div>

            {/* Search and Filters */}
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-2xl shadow-lg p-6">
                {/* Search Bar */}
                <div className="relative mb-6">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder={`Search ${category.name.toLowerCase()} books...`}
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>

                {/* Filters Row */}
                <div className="flex flex-wrap items-center justify-between gap-4">
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
                Showing {filteredBooks.length} of {books.length} books in{" "}
                {category.name}
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
                <div
                  className={`w-24 h-24 mx-auto mb-6 ${category.color} rounded-full flex items-center justify-center text-white text-4xl`}
                >
                  {category.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  No books found
                </h3>
                <p className="text-gray-600 mb-8">
                  Try adjusting your search criteria or browse other categories
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      setFilteredBooks(books);
                    }}
                    className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                  >
                    Clear Search
                  </button>
                  <button
                    onClick={() => navigate("/books")}
                    className="border border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-3 rounded-lg font-semibold transition-colors"
                  >
                    Browse All Books
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Other Categories */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
              Explore Other Categories
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {bookCategories
                .filter((cat) => cat.id !== category.id)
                .map((otherCategory) => {
                  const categoryBookCount = featuredBooks.filter(
                    (book) => book.category.id === otherCategory.id,
                  ).length;

                  return (
                    <button
                      key={otherCategory.id}
                      onClick={() =>
                        navigate(`/books/category/${otherCategory.slug}`)
                      }
                      className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300 text-left group"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div
                          className={`w-12 h-12 ${otherCategory.color} rounded-lg flex items-center justify-center text-white text-xl group-hover:scale-110 transition-transform duration-300`}
                        >
                          {otherCategory.icon}
                        </div>
                        <span className="text-sm text-gray-500">
                          {categoryBookCount}{" "}
                          {categoryBookCount === 1 ? "book" : "books"}
                        </span>
                      </div>

                      <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary-500 transition-colors">
                        {otherCategory.name}
                      </h3>

                      <p className="text-gray-600 text-sm">
                        {otherCategory.description}
                      </p>
                    </button>
                  );
                })}
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <ModernDQChatbot />
    </div>
  );
};

export default CategoryBooksPage;
