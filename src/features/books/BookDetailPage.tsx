import { Header } from "../../shared/Header/Header";
import { Footer } from "../../shared/Footer/Footer";
import { useNavigate, useParams } from "react-router-dom";
import ModernDQChatbot from "../../shared/ModernDQChatbot";
import { useState, useEffect } from "react";
import { featuredBooks } from "../../utils/mockBookData";
import { BookCard } from "../../components/books/BookCard";
import { Book } from "../../types/book";
import {
  Star,
  Heart,
  Share2,
  BookOpen,
  Calendar,
  Tag,
  User,
  Award,
  Eye,
} from "lucide-react";

const BookDetailPage = () => {
  const navigate = useNavigate();
  const { bookId } = useParams<{ bookId: string }>();
  const [book, setBook] = useState<Book | null>(null);
  const [relatedBooks, setRelatedBooks] = useState<Book[]>([]);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [selectedFormat, setSelectedFormat] = useState<string>("");

  useEffect(() => {
    if (bookId) {
      const foundBook = featuredBooks.find((b) => b.id === bookId);
      if (foundBook) {
        setBook(foundBook);
        setSelectedFormat(foundBook.format[0]);

        // Get related books from same category
        const related = featuredBooks
          .filter(
            (b) => b.id !== bookId && b.category.id === foundBook.category.id,
          )
          .slice(0, 3);
        setRelatedBooks(related);
      }
    }
  }, [bookId]);

  if (!book) {
    return (
      <div className="flex flex-col w-full min-h-screen bg-white">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Book not found
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

  const handleExploreMore = () => {
    // Navigate to related content or author page
    navigate(`/author/${book.author.toLowerCase().replace(/\s+/g, "-")}`);
  };

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: book.title,
        text: book.shortDescription,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  const renderStars = (rating: number): React.JSX.Element[] => {
    const stars: React.JSX.Element[] = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />,
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Star
          key="half"
          className="w-5 h-5 fill-yellow-400/50 text-yellow-400"
        />,
      );
    }

    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="w-5 h-5 text-gray-300" />);
    }

    return stars;
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-white">
      <Header />

      <main className="flex-1">
        {/* Breadcrumb */}
        <section className="bg-gray-50 py-4">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex items-center gap-2 text-sm">
              <button
                onClick={() => navigate("/books")}
                className="text-gray-600 hover:text-primary-500 transition-colors"
              >
                Books
              </button>
              <span className="text-gray-400">/</span>
              <button
                onClick={() =>
                  navigate(`/books/category/${book.category.slug}`)
                }
                className="text-gray-600 hover:text-primary-500 transition-colors"
              >
                {book.category.name}
              </button>
              <span className="text-gray-400">/</span>
              <span className="text-gray-900 font-medium">{book.title}</span>
            </div>
          </div>
        </section>

        {/* Book Details */}
        <section className="py-16">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              {/* Book Cover */}
              <div className="space-y-6">
                <div className="relative">
                  <div className="w-full max-w-md mx-auto">
                    <div className="aspect-[3/4] bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl overflow-hidden shadow-2xl">
                      <img
                        src={book.coverImage}
                        alt={book.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          // Fallback to placeholder if image fails to load
                          const target = e.target as HTMLImageElement;
                          const parent = target.parentElement!;
                          parent.innerHTML = `
                            <div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-100">
                              <div class="text-center text-gray-600">
                                <div class="w-16 h-16 mx-auto mb-4 ${book.category.color} rounded-2xl flex items-center justify-center text-white text-2xl">
                                  ${book.category.icon}
                                </div>
                                <p class="text-lg font-medium">Book Cover</p>
                              </div>
                            </div>
                          `;
                        }}
                      />
                    </div>
                  </div>

                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span
                      className={`${book.category.color} text-white text-sm px-3 py-1 rounded-full font-semibold`}
                    >
                      {book.category.name}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 max-w-md mx-auto">
                  <button
                    onClick={handleWishlist}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg font-semibold transition-colors ${
                      isWishlisted
                        ? "bg-red-100 text-red-600 border border-red-200"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    <Heart
                      className={`w-5 h-5 ${isWishlisted ? "fill-current" : ""}`}
                    />
                    {isWishlisted ? "Wishlisted" : "Add to Wishlist"}
                  </button>
                  <button
                    onClick={handleShare}
                    className="px-4 py-3 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-lg transition-colors"
                  >
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Book Information */}
              <div className="space-y-8">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <span
                      className={`px-3 py-1 ${book.category.color} text-white text-sm rounded-full font-medium`}
                    >
                      {book.category.name}
                    </span>
                  </div>

                  <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                    {book.title}
                  </h1>

                  <div className="flex items-center gap-2 mb-6">
                    <User className="w-5 h-5 text-gray-500" />
                    <span className="text-lg text-gray-700">
                      by {book.author}
                    </span>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="flex items-center gap-2">
                      <div className="flex">{renderStars(book.rating)}</div>
                      <span className="text-lg font-semibold text-gray-900">
                        {book.rating}
                      </span>
                    </div>
                    <span className="text-gray-600">
                      ({book.reviewCount} reviews)
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-lg text-gray-700 leading-relaxed mb-8">
                    {book.description}
                  </p>
                </div>

                {/* Book Details */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-gray-500" />
                      <div>
                        <span className="text-sm text-gray-500">Published</span>
                        <p className="font-medium">
                          {new Date(book.publishDate).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            },
                          )}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <BookOpen className="w-5 h-5 text-gray-500" />
                      <div>
                        <span className="text-sm text-gray-500">Pages</span>
                        <p className="font-medium">{book.pageCount} pages</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Tag className="w-5 h-5 text-gray-500" />
                      <div>
                        <span className="text-sm text-gray-500">ISBN</span>
                        <p className="font-medium">{book.isbn}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Award className="w-5 h-5 text-gray-500" />
                      <div>
                        <span className="text-sm text-gray-500">Status</span>
                        <p className="font-medium capitalize">
                          {book.availability}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tags */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Topics
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {book.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Format Selection */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Available Formats
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {book.format.map((format) => (
                      <button
                        key={format}
                        onClick={() => setSelectedFormat(format)}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors capitalize ${
                          selectedFormat === format
                            ? "bg-primary-500 text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        {format}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Explore Actions */}
                <div className="bg-gray-50 rounded-2xl p-6">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      Explore This Book
                    </h3>
                    <p className="text-gray-600">
                      Dive deeper into {book.title} and discover related
                      insights
                    </p>
                  </div>

                  <div className="space-y-4">
                    <button
                      onClick={handleExploreMore}
                      className="w-full flex items-center justify-center gap-3 py-4 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-semibold text-lg transition-colors"
                    >
                      <Eye className="w-6 h-6" />
                      Explore More by {book.author.split(" ")[1]}
                    </button>

                    <button
                      onClick={() => navigate("/books")}
                      className="w-full flex items-center justify-center gap-3 py-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-semibold text-lg transition-colors"
                    >
                      <BookOpen className="w-6 h-6" />
                      Browse All Books
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related Books */}
        {relatedBooks.length > 0 && (
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4 md:px-6">
              <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
                More Books in {book.category.name}
              </h2>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {relatedBooks.map((relatedBook) => (
                  <BookCard
                    key={relatedBook.id}
                    book={relatedBook}
                    onExplore={(book) => navigate(`/books/${book.id}`)}
                  />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
      <ModernDQChatbot />
    </div>
  );
};

export default BookDetailPage;
