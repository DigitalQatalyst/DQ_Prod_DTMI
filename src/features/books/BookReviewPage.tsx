import { useParams, useNavigate } from "react-router-dom";
import { Header } from "../../shared/Header/Header";
import { Footer } from "../../shared/Footer/Footer";
import { featuredBooks, frontierBooks } from "../../utils/mockBookData";
import { ArrowLeft, Star, Calendar, User, BookOpen, Clock } from "lucide-react";
import { getReviewContent } from "./reviewContentNew";

const BookReviewPage = () => {
  const { bookId } = useParams();
  const navigate = useNavigate();

  // Find the book by ID from both featured and frontier books
  const book = [...featuredBooks, ...frontierBooks].find(
    (b) => b.id === bookId,
  );

  if (!book) {
    return (
      <div className="flex flex-col min-h-screen bg-white">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Book Not Found
            </h1>
            <p className="text-gray-600 mb-8">
              The book you're looking for doesn't exist.
            </p>
            <button
              onClick={() => navigate("/books")}
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Back to Books
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const reviewContent = getReviewContent(bookId || "");

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-16">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <button
              onClick={() => navigate("/books")}
              className="flex items-center gap-2 text-gray-300 hover:text-white mb-8 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Books
            </button>

            <div className="flex flex-col lg:flex-row gap-8 items-start">
              {/* Book Cover */}
              <div className="flex-shrink-0">
                <div className="w-64 h-80 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg overflow-hidden shadow-2xl">
                  <img
                    src={book.coverImage}
                    alt={book.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      const parent = target.parentElement!;
                      parent.innerHTML = `
                        <div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-100">
                          <div class="text-center text-gray-600">
                            <div class="w-16 h-16 mx-auto mb-4 bg-orange-500 rounded-lg flex items-center justify-center text-white text-2xl">
                              📚
                            </div>
                            <p class="text-lg font-medium">Book Cover</p>
                          </div>
                        </div>
                      `;
                    }}
                  />
                </div>
              </div>

              {/* Book Info */}
              <div className="flex-1">
                <h1 className="text-4xl font-bold font-display mb-4">
                  {book.title}
                </h1>
                <p className="text-xl text-gray-300 mb-6">by {book.author}</p>

                {/* Book Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(book.rating)
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-600"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-sm text-gray-300">
                      {book.rating} ({book.reviewCount} reviews)
                    </p>
                  </div>

                  <div className="text-center">
                    <BookOpen className="w-6 h-6 mx-auto mb-2 text-orange-400" />
                    <p className="text-sm text-gray-300">
                      {book.pageCount} pages
                    </p>
                  </div>

                  <div className="text-center">
                    <Calendar className="w-6 h-6 mx-auto mb-2 text-orange-400" />
                    <p className="text-sm text-gray-300">
                      {new Date(book.publishDate).getFullYear()}
                    </p>
                  </div>

                  <div className="text-center">
                    <Clock className="w-6 h-6 mx-auto mb-2 text-orange-400" />
                    <p className="text-sm text-gray-300">
                      {Math.ceil(book.pageCount / 250)} hr read
                    </p>
                  </div>
                </div>

                {/* 6xD Dimensions */}
                {book.sixDDimensions && (
                  <div className="mb-6">
                    <h3 className="text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wide">
                      6xD Dimensions
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {book.sixDDimensions.map((dimension) => (
                        <span
                          key={dimension}
                          className="bg-orange-500/20 text-orange-300 px-3 py-1 rounded-full text-sm font-medium"
                        >
                          {dimension}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Review Content */}
        <section className="py-16">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <article className="prose prose-lg max-w-none">
              <header className="mb-12">
                <h1 className="text-4xl font-bold font-display text-gray-900 mb-4">
                  {reviewContent.title}
                </h1>
                <div className="flex items-center gap-4 text-gray-600">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span>Digital Transformation Review</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>March 2026</span>
                  </div>
                </div>
              </header>

              <div className="review-content">{reviewContent.content}</div>
            </article>

            {/* Related Books */}
            <section className="mt-16 pt-16 border-t border-gray-200">
              <h2 className="text-2xl font-bold font-display text-gray-900 mb-8">
                Related Books
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                {[...featuredBooks, ...frontierBooks]
                  .filter((b) => b.id !== bookId)
                  .slice(0, 3)
                  .map((relatedBook) => (
                    <div
                      key={relatedBook.id}
                      className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group"
                      onClick={() =>
                        navigate(`/books/${relatedBook.id}/review`)
                      }
                    >
                      <div className="aspect-video bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
                        <div className="w-20 h-28 bg-gradient-to-br from-gray-100 to-gray-200 rounded overflow-hidden shadow-lg">
                          <img
                            src={relatedBook.coverImage}
                            alt={relatedBook.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-orange-600 transition-colors">
                          {relatedBook.title}
                        </h3>
                        <p className="text-gray-600 text-sm mb-2">
                          {relatedBook.author}
                        </p>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3 h-3 ${
                                i < Math.floor(relatedBook.rating)
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                          <span className="text-xs text-gray-500 ml-1">
                            {relatedBook.rating}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </section>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default BookReviewPage;
