import { Header } from "../../shared/Header/Header";
import { Footer } from "../../shared/Footer/Footer";
import { useNavigate } from "react-router-dom";
import ModernDQChatbot from "../../shared/ModernDQChatbot";
import { useState } from "react";
import { featuredBooks, bookCategories } from "../../utils/mockBookData";
import { BookCard } from "../../components/books/BookCard";
import { Book } from "../../types/book";
import { ArrowLeft, Sparkles, RefreshCw } from "lucide-react";

const RecommendationsPage = () => {
  const navigate = useNavigate();
  const [recommendations, setRecommendations] = useState<Book[]>(featuredBooks);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const interests = [
    "AI & Machine Learning",
    "Leadership",
    "Business Strategy",
    "Digital Innovation",
    "Data Analytics",
    "Organizational Change",
    "Technology Trends",
    "Customer Experience",
  ];

  const handleInterestToggle = (interest: string) => {
    setSelectedInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((i) => i !== interest)
        : [...prev, interest],
    );
  };

  const handleRefreshRecommendations = async () => {
    setIsRefreshing(true);

    // Simulate API call for new recommendations
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Shuffle the books for "new" recommendations
    const shuffled = [...featuredBooks].sort(() => Math.random() - 0.5);
    setRecommendations(shuffled);
    setIsRefreshing(false);
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
        <section className="bg-gradient-to-br from-purple-50 to-blue-50 py-16">
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
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Recommended for You
              </h1>

              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                Discover books tailored to your interests and professional
                development goals
              </p>

              <div className="flex items-center justify-center gap-4">
                <button
                  onClick={handleRefreshRecommendations}
                  disabled={isRefreshing}
                  className="flex items-center gap-2 bg-primary-500 hover:bg-primary-600 disabled:opacity-50 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  <RefreshCw
                    className={`w-5 h-5 ${isRefreshing ? "animate-spin" : ""}`}
                  />
                  {isRefreshing ? "Refreshing..." : "Get New Recommendations"}
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Interest Selection */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Tell us your interests
                </h2>
                <p className="text-gray-600">
                  Select topics you're interested in to get better
                  recommendations
                </p>
              </div>

              <div className="flex flex-wrap justify-center gap-3 mb-12">
                {interests.map((interest) => (
                  <button
                    key={interest}
                    onClick={() => handleInterestToggle(interest)}
                    className={`px-4 py-2 rounded-full font-medium transition-colors ${
                      selectedInterests.includes(interest)
                        ? "bg-primary-500 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {interest}
                  </button>
                ))}
              </div>

              {selectedInterests.length > 0 && (
                <div className="text-center">
                  <p className="text-sm text-gray-600">
                    Recommendations based on: {selectedInterests.join(", ")}
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Recommendation Categories */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 md:px-6">
            {/* Trending Now */}
            <div className="mb-16">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    🔥 Trending Now
                  </h2>
                  <p className="text-gray-600">
                    Popular books among digital transformation professionals
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {recommendations.slice(0, 3).map((book) => (
                  <BookCard
                    key={book.id}
                    book={book}
                    onLearnMore={handleBookLearnMore}
                    onBuyNow={handleBookBuyNow}
                  />
                ))}
              </div>
            </div>

            {/* Based on Your Interests */}
            {selectedInterests.length > 0 && (
              <div className="mb-16">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                      ✨ Based on Your Interests
                    </h2>
                    <p className="text-gray-600">
                      Curated selections matching your selected topics
                    </p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {recommendations.slice(3, 6).map((book) => (
                    <BookCard
                      key={book.id}
                      book={book}
                      onLearnMore={handleBookLearnMore}
                      onBuyNow={handleBookBuyNow}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* New Releases */}
            <div className="mb-16">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    🆕 New Releases
                  </h2>
                  <p className="text-gray-600">
                    Latest books in digital transformation
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {recommendations
                  .filter((book) => book.isNewRelease)
                  .slice(0, 3)
                  .map((book) => (
                    <BookCard
                      key={book.id}
                      book={book}
                      onLearnMore={handleBookLearnMore}
                      onBuyNow={handleBookBuyNow}
                    />
                  ))}
              </div>
            </div>

            {/* Highly Rated */}
            <div>
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    ⭐ Highly Rated
                  </h2>
                  <p className="text-gray-600">
                    Top-rated books by our community
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {recommendations
                  .sort((a, b) => b.rating - a.rating)
                  .slice(0, 3)
                  .map((book) => (
                    <BookCard
                      key={book.id}
                      book={book}
                      onLearnMore={handleBookLearnMore}
                      onBuyNow={handleBookBuyNow}
                    />
                  ))}
              </div>
            </div>
          </div>
        </section>

        {/* Explore Categories */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Explore by Category
              </h2>
              <p className="text-xl text-gray-600">
                Browse books by specific topics and areas of expertise
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {bookCategories.map((category) => {
                const categoryBookCount = featuredBooks.filter(
                  (book) => book.category.id === category.id,
                ).length;

                return (
                  <button
                    key={category.id}
                    onClick={() => navigate(`/books/category/${category.slug}`)}
                    className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300 text-left group"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className={`w-12 h-12 ${category.color} rounded-lg flex items-center justify-center text-white text-xl group-hover:scale-110 transition-transform duration-300`}
                      >
                        {category.icon}
                      </div>
                      <span className="text-sm text-gray-500">
                        {categoryBookCount}{" "}
                        {categoryBookCount === 1 ? "book" : "books"}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary-500 transition-colors">
                      {category.name}
                    </h3>

                    <p className="text-gray-600 text-sm">
                      {category.description}
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

export default RecommendationsPage;
