import { Header } from "../../shared/Header/Header";
import { Footer } from "../../shared/Footer/Footer";
import { useNavigate } from "react-router-dom";
import ModernDQChatbot from "../../shared/ModernDQChatbot";
import { useState, useEffect } from "react";
import {
  featuredBooks,
  frontierBooks,
  topBooksThisWeek,
} from "../../utils/mockBookData";
import { Book } from "../../types/book";
import {
  Star,
  ChevronDown,
  BookOpen,
  Users,
  Target,
  Brain,
  Search,
  Filter,
  Heart,
  Eye,
} from "lucide-react";

const BooksLandingPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeFilter, setActiveFilter] = useState("Digital Economy");
  const [activeCollection, setActiveCollection] = useState("featured");

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Thematic Collections as per specification
  const thematicCollections = [
    {
      id: "featured",
      title: "Editor's Choice",
      description: "Curated by DTMI editorial team for strategic relevance",
      books: featuredBooks.slice(0, 4),
      icon: "⭐",
    },
    {
      id: "digital-economy",
      title: "Digital Economy Essentials",
      description: "Foundational books for understanding Economy 4.0",
      books: frontierBooks
        .filter((book) => book.sixDDimensions?.includes("D1: Digital Economy"))
        .slice(0, 4),
      icon: "💰",
    },
    {
      id: "ai-leaders",
      title: "AI Books for Leaders",
      description: "Strategic AI insights for executives and decision makers",
      books: frontierBooks
        .filter(
          (book) =>
            book.tags.some((tag) => tag.toLowerCase().includes("ai")) ||
            book.sixDDimensions?.includes("D2: Digital Cognitive Organization"),
        )
        .slice(0, 4),
      icon: "🤖",
    },
    {
      id: "transformation-classics",
      title: "Digital Transformation Classics",
      description: "Timeless frameworks for organizational change",
      books: topBooksThisWeek.slice(0, 4),
      icon: "📚",
    },
    {
      id: "cdo-reads",
      title: "Top Reads for Chief Digital Officers",
      description: "Executive-level strategic insights and frameworks",
      books: frontierBooks.slice(0, 4),
      icon: "👔",
    },
  ];

  // Filter books based on active filter for Frontier Watch - exactly 4 books per topic
  const getFilteredBooks = () => {
    switch (activeFilter) {
      case "Digital Economy":
        // Return exactly 4 books for Digital Economy (now called Economy 4.0)
        return frontierBooks
          .filter((book) =>
            book.sixDDimensions?.includes("D1: Digital Economy"),
          )
          .slice(0, 4);
      case "Digital Cognitive Organization":
        // Return exactly 4 books for Digital Cognitive Organization
        return frontierBooks
          .filter((book) =>
            book.sixDDimensions?.includes("D2: Digital Cognitive Organization"),
          )
          .slice(0, 4);
      case "Digital Business Platforms":
        // Return exactly 4 books for Digital Business Platforms
        return frontierBooks
          .filter((book) =>
            book.sixDDimensions?.includes("D3: Digital Business Platforms"),
          )
          .slice(0, 4);
      case "Digital Transformation":
        // Return exactly 4 books for Digital Transformation
        return frontierBooks
          .filter((book) =>
            book.sixDDimensions?.includes("D4: Digital Transformation"),
          )
          .slice(0, 4);
      case "Digital Workers and Workspace":
        // Return exactly 4 books for Digital Workers and Workspace
        return frontierBooks
          .filter((book) =>
            book.sixDDimensions?.includes("D5: Digital Workers and Workspace"),
          )
          .slice(0, 4);
      case "Digital Accelerators":
        // Return exactly 4 books for Digital Accelerators
        return frontierBooks
          .filter((book) =>
            book.sixDDimensions?.includes("D6: Digital Accelerators"),
          )
          .slice(0, 4);
      default:
        // Show first 4 books from Digital Economy by default (Economy 4.0)
        return frontierBooks
          .filter((book) =>
            book.sixDDimensions?.includes("D1: Digital Economy"),
          )
          .slice(0, 4);
    }
  };

  const filteredBooks = getFilteredBooks();

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    alert(`Thank you! We'll send you the latest expert reviews at ${email}.`);
    setEmail("");
    setIsSubmitting(false);
  };

  const handleBookReview = (book: Book) => {
    navigate(`/books/${book.id}/review`);
  };

  const handleScrollDown = () => {
    const nextSection = document.getElementById("essential-read");
    nextSection?.scrollIntoView({ behavior: "smooth" });
  };

  const handleScrollToFrontier = () => {
    const nextSection = document.getElementById("frontier-watch");
    nextSection?.scrollIntoView({ behavior: "smooth" });
  };

  const featuredBook = featuredBooks[0]; // Main featured book for hero section

  return (
    <div className="flex flex-col w-full min-h-screen bg-white">
      <Header />

      <main className="flex-1">
        {/* 1. Hero Section - DTMI Books Purpose & Value Proposition */}
        <section
          className="relative w-full bg-gradient-to-br from-[#0A1628] via-[#1a2942] to-[#0f1f3d] overflow-hidden"
          style={{ height: "100vh" }}
        >
          {/* Animated background image with zoom effect */}
          <div
            className="absolute inset-0 transition-transform duration-[3000ms] ease-out"
            style={{
              backgroundImage:
                "linear-gradient(rgba(10, 22, 40, 0.75), rgba(10, 22, 40, 0.75)), url('https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              transform: isLoaded ? "scale(1)" : "scale(1.1)",
            }}
          ></div>

          {/* Animated gradient overlay */}
          <div
            className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-red-500/20 mix-blend-multiply"
            style={{
              animation: "pulse-gradient 8s ease-in-out infinite alternate",
            }}
          ></div>

          <div className="container mx-auto px-4 h-full flex items-center relative z-10">
            <div className="max-w-5xl mx-auto text-center text-white">
              {/* Badge */}
              <div
                className="inline-block px-6 py-3 text-sm font-medium bg-white/10 backdrop-blur-sm text-white rounded-full mb-8 border border-white/20"
                style={{
                  opacity: isLoaded ? 1 : 0,
                  transform: isLoaded ? "translateY(0)" : "translateY(20px)",
                  transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
                }}
              >
                📚 DTMI Books - Curated Knowledge Intelligence
              </div>

              {/* Headline */}
              <h1
                className="text-5xl md:text-7xl font-bold font-display mb-6 text-white"
                style={{
                  opacity: isLoaded ? 1 : 0,
                  transform: isLoaded ? "translateY(0)" : "translateY(30px)",
                  transition:
                    "opacity 0.8s ease-out 0.2s, transform 0.8s ease-out 0.2s",
                }}
              >
                Discover Books That Transform Organizations
              </h1>

              {/* Value Proposition */}
              <p
                className="text-xl md:text-2xl font-body text-white/90 leading-relaxed max-w-4xl mx-auto mb-8"
                style={{
                  opacity: isLoaded ? 1 : 0,
                  transform: isLoaded ? "translateY(0)" : "translateY(30px)",
                  transition:
                    "opacity 1s ease-out 0.4s, transform 1s ease-out 0.4s",
                }}
              >
                A curated intelligence layer for digital leaders, researchers,
                and transformation practitioners
              </p>

              {/* Four Layers of Value */}
              <div
                className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-12"
                style={{
                  opacity: isLoaded ? 1 : 0,
                  transform: isLoaded ? "translateY(0)" : "translateY(30px)",
                  transition:
                    "opacity 1s ease-out 0.5s, transform 1s ease-out 0.5s",
                }}
              >
                <div className="text-center">
                  <Search className="w-8 h-8 mx-auto mb-3 text-orange-400" />
                  <h3 className="font-semibold mb-2">Curated Discovery</h3>
                  <p className="text-sm text-white/80">
                    High-value books instead of blind searching
                  </p>
                </div>
                <div className="text-center">
                  <Heart className="w-8 h-8 mx-auto mb-3 text-orange-400" />
                  <h3 className="font-semibold mb-2">
                    Intelligent Shortlisting
                  </h3>
                  <p className="text-sm text-white/80">
                    Personal reading lists by theme and priority
                  </p>
                </div>
                <div className="text-center">
                  <Eye className="w-8 h-8 mx-auto mb-3 text-orange-400" />
                  <h3 className="font-semibold mb-2">Structured Reviews</h3>
                  <p className="text-sm text-white/80">
                    Expert analysis beyond generic ratings
                  </p>
                </div>
                <div className="text-center">
                  <Target className="w-8 h-8 mx-auto mb-3 text-orange-400" />
                  <h3 className="font-semibold mb-2">Strategic Relevance</h3>
                  <p className="text-sm text-white/80">
                    Context for digital transformation realities
                  </p>
                </div>
              </div>

              {/* Enhanced CTA */}
              <div
                className="flex flex-col items-center space-y-4"
                style={{
                  opacity: isLoaded ? 1 : 0,
                  transform: isLoaded ? "translateY(0)" : "translateY(30px)",
                  transition:
                    "opacity 1.2s ease-out 0.6s, transform 1.2s ease-out 0.6s",
                }}
              >
                <button
                  onClick={() => navigate("/marketplace/dtmi?tab=books")}
                  className="px-10 py-5 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-bold text-lg rounded-lg shadow-2xl transform transition-all duration-300 hover:-translate-y-2 hover:shadow-3xl text-center flex items-center justify-center mx-auto overflow-hidden group border-2 border-white/20"
                >
                  <span className="relative z-10 flex items-center space-x-2">
                    <span>Explore Curated Book Intelligence</span>
                    <BookOpen className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                  <span className="absolute inset-0 overflow-hidden rounded-lg">
                    <span className="absolute inset-0 bg-white/20 transform scale-0 opacity-0 group-hover:scale-[2.5] group-hover:opacity-100 rounded-full transition-all duration-700 origin-center"></span>
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Scroll indicator */}
          <div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer"
            onClick={handleScrollDown}
          >
            <ChevronDown size={32} className="text-orange-500" />
          </div>

          {/* Keyframes for animations */}
          <style>{`
            @keyframes pulse-gradient {
              0% {
                opacity: 0.4;
              }
              50% {
                opacity: 0.6;
              }
              100% {
                opacity: 0.4;
              }
            }
          `}</style>
        </section>
        {/* 2. Featured Section - "The Essential Read" */}
        <section
          id="essential-read"
          className="relative w-full bg-white overflow-hidden py-20"
        >
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Side - Content */}
              <div className="text-black">
                <div
                  className="mb-6"
                  style={{
                    opacity: isLoaded ? 1 : 0,
                    transform: isLoaded ? "translateY(0)" : "translateY(20px)",
                    transition:
                      "opacity 0.6s ease-out, transform 0.6s ease-out",
                  }}
                >
                  <h1 className="text-4xl md:text-5xl font-bold font-display mb-4">
                    Essential Books for Digital Leaders
                  </h1>
                  <p className="text-xl mb-6">
                    Curated intelligence for strategic transformation and
                    organizational change
                  </p>
                </div>

                {/* Quote */}
                <div
                  className="mb-8 p-4 border-l-4 border-orange-400"
                  style={{
                    opacity: isLoaded ? 1 : 0,
                    transform: isLoaded ? "translateY(0)" : "translateY(20px)",
                    transition:
                      "opacity 0.8s ease-out 0.2s, transform 0.8s ease-out 0.2s",
                  }}
                >
                  <p className="text-lg italic">
                    "Transformation is not a linear event, but a dimensional
                    synchronization. To master one without the others is to
                    build a high-performance engine without a chassis."
                  </p>
                </div>

                {/* Tags and CTA */}
                <div
                  style={{
                    opacity: isLoaded ? 1 : 0,
                    transform: isLoaded ? "translateY(0)" : "translateY(20px)",
                    transition:
                      "opacity 1s ease-out 0.4s, transform 1s ease-out 0.4s",
                  }}
                >
                  <div>
                    <button
                      onClick={() => handleBookReview(featuredBook)}
                      className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-bold font-body transition-colors flex items-center gap-2"
                    >
                      READ REVIEW
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Side - Book Cover and Impact Score */}
              <div className="flex items-center justify-center">
                <div className="relative">
                  {/* Book Cover */}
                  <div
                    className="w-80 h-96 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg overflow-hidden shadow-2xl cursor-pointer group"
                    onClick={() => handleBookReview(featuredBook)}
                  >
                    <img
                      src={featuredBook.coverImage}
                      alt={featuredBook.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        const parent = target.parentElement!;
                        parent.innerHTML = `
                          <div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-100">
                            <div class="text-center text-gray-600">
                              <div class="w-20 h-20 mx-auto mb-4 bg-orange-500 rounded-lg flex items-center justify-center text-white text-3xl">
                                📚
                              </div>
                              <p class="text-xl font-medium">Digital Transformation</p>
                              <p class="text-xl font-medium">Playbook</p>
                              <p class="text-lg mt-2">David Rogers</p>
                            </div>
                          </div>
                        `;
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Scroll indicator */}
          <div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer"
            onClick={handleScrollToFrontier}
          >
            <ChevronDown size={24} className="text-orange-500" />
          </div>
        </section>
        {/* 3. Trending Books Section */}
        <section className="py-16 bg-white text-gray-900">
          <div className="container mx-auto px-4 md:px-6 max-w-7xl">
            <div className="mb-12">
              <h2 className="text-4xl font-bold font-display mb-4">
                Top Reads for Chief Digital Officers
              </h2>
            </div>

            {/* Trending Books Grid */}
            <div className="grid md:grid-cols-3 gap-8">
              {frontierBooks.slice(0, 3).map((book, index) => (
                <div
                  key={book.id}
                  className="bg-gray-50 border border-gray-200 rounded-lg overflow-hidden hover:bg-gray-100 transition-all duration-300 cursor-pointer group hover:shadow-2xl hover:-translate-y-2 relative"
                  onClick={() => handleBookReview(book)}
                >
                  <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center relative">
                    <div className="w-32 h-40 bg-gradient-to-br from-gray-100 to-gray-200 rounded overflow-hidden shadow-xl">
                      <img
                        src={book.coverImage}
                        alt={book.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          const parent = target.parentElement!;
                          parent.innerHTML = `
                            <div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-100">
                              <div class="text-center text-gray-600">
                                <div class="w-12 h-12 mx-auto mb-2 bg-orange-500 rounded flex items-center justify-center text-white text-xl">
                                  📚
                                </div>
                                <p class="text-sm font-medium">Trending Book</p>
                              </div>
                            </div>
                          `;
                        }}
                      />
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-orange-600 transition-colors">
                      {book.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3">{book.author}</p>
                    <p className="text-gray-700 text-sm mb-4 line-clamp-3">
                      {book.shortDescription}
                    </p>

                    {/* Enhanced Rating and Social Proof */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < Math.floor(book.rating)
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "text-gray-400"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-gray-700 font-medium">
                            {book.rating}
                          </span>
                          <span className="text-xs text-gray-500">
                            ({book.reviewCount} reviews)
                          </span>
                        </div>
                      </div>

                      {/* Reading stats */}
                      <div className="flex items-center justify-between text-xs text-gray-600">
                        <span>
                          📖 {Math.floor(Math.random() * 500 + 100)}+ reading
                        </span>
                        <span>
                          ⚡ {Math.floor(Math.random() * 50 + 10)} this week
                        </span>
                      </div>

                      {/* CTA */}
                      <div className="pt-2">
                        <div className="text-orange-600 font-semibold text-sm group-hover:text-orange-700 transition-colors flex items-center">
                          Read Expert Review
                          <svg
                            className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform duration-300"
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
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. Frontier Watch - 6xD Books Grid */}
        <section id="frontier-watch" className="py-16 bg-white text-black">
          <div className="container mx-auto px-4 md:px-6 max-w-7xl">
            <div className="mb-12">
              <h2 className="text-4xl font-bold font-display mb-4">
                Books to Build Your Digital Future
              </h2>

              {/* Filter Tabs */}
              <div className="flex flex-wrap gap-4 mb-8">
                {[
                  "Economy 4.0",
                  "Cognitive Organization",
                  "Business Platforms",
                  "Transformation",
                  "Future of Work",
                  "Accelerators",
                ].map((filter) => (
                  <button
                    key={filter}
                    onClick={() =>
                      setActiveFilter(
                        filter === "Economy 4.0"
                          ? "Digital Economy"
                          : filter === "Future of Work"
                            ? "Digital Workers and Workspace"
                            : `Digital ${filter}`,
                      )
                    }
                    className={`px-6 py-2 rounded-full font-medium transition-colors ${
                      (activeFilter === "Digital Economy" &&
                        filter === "Economy 4.0") ||
                      (activeFilter === "Digital Workers and Workspace" &&
                        filter === "Future of Work") ||
                      activeFilter === `Digital ${filter}`
                        ? "bg-orange-500 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>

            {/* 4 Cards Grid Layout */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredBooks.map((book) => (
                <div
                  key={book.id}
                  className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-2xl hover:border-orange-200 transition-all duration-300 cursor-pointer group hover:-translate-y-2 relative"
                  onClick={() => handleBookReview(book)}
                >
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>

                  <div className="aspect-video bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center relative">
                    <div className="w-24 h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded overflow-hidden shadow-xl group-hover:shadow-2xl transition-shadow duration-300">
                      <img
                        src={book.coverImage}
                        alt={book.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          const parent = target.parentElement!;
                          parent.innerHTML = `
                            <div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-100">
                              <div class="text-center text-gray-600">
                                <div class="w-8 h-8 mx-auto mb-2 bg-orange-500 rounded flex items-center justify-center text-white text-sm">
                                  📚
                                </div>
                                <p class="text-xs font-medium">6xD Book</p>
                              </div>
                            </div>
                          `;
                        }}
                      />
                    </div>

                    {/* Quick action overlay */}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold text-gray-900 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        Read Review
                      </div>
                    </div>
                  </div>

                  <div className="p-4 relative z-20">
                    <h3 className="text-base font-bold text-black mb-2 line-clamp-2 group-hover:text-orange-600 transition-colors duration-300">
                      {book.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-2 group-hover:text-gray-700 transition-colors duration-300">
                      {book.author}
                    </p>
                    <p className="text-gray-700 text-sm mb-3 line-clamp-2 group-hover:text-gray-800 transition-colors duration-300">
                      {book.shortDescription}
                    </p>

                    {/* Enhanced Rating and Tags */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3 h-3 transition-colors duration-300 ${
                                i < Math.floor(book.rating)
                                  ? "fill-yellow-400 text-yellow-400 group-hover:fill-yellow-500 group-hover:text-yellow-500"
                                  : "text-gray-300 group-hover:text-gray-400"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-xs text-gray-500 ml-1 group-hover:text-gray-600 transition-colors duration-300">
                          {book.rating}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-orange-600 font-semibold bg-orange-50 px-2 py-1 rounded-full group-hover:bg-orange-100 transition-colors duration-300">
                          6xD
                        </span>
                      </div>
                    </div>

                    {/* Reading indicator */}
                    <div className="mt-3 pt-3 border-t border-gray-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>
                          📖 {Math.floor(Math.random() * 200 + 50)}+ readers
                        </span>
                        <span className="text-orange-600 font-medium">
                          View Review →
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. Thematic Collections - DTMI Editorial Curation */}
        <section className="py-16 bg-gray-50 text-gray-900">
          <div className="container mx-auto px-4 md:px-6 max-w-7xl">
            <div className="mb-12">
              <h2 className="text-4xl font-bold font-display mb-4">
                Curated Collections
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Thematic book collections curated by DTMI editorial team for
                strategic relevance
              </p>

              {/* Collection Tabs */}
              <div className="flex flex-wrap gap-4 mb-8">
                {thematicCollections.map((collection) => (
                  <button
                    key={collection.id}
                    onClick={() => setActiveCollection(collection.id)}
                    className={`px-6 py-3 rounded-full font-medium transition-all duration-300 flex items-center gap-2 ${
                      activeCollection === collection.id
                        ? "bg-orange-500 text-white shadow-lg"
                        : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                    }`}
                  >
                    <span>{collection.icon}</span>
                    <span>{collection.title}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Active Collection Display */}
            {thematicCollections.map((collection) => (
              <div
                key={collection.id}
                className={`${activeCollection === collection.id ? "block" : "hidden"}`}
              >
                <div className="mb-8">
                  <h3 className="text-2xl font-bold mb-2">
                    {collection.title}
                  </h3>
                  <p className="text-gray-600">{collection.description}</p>
                </div>

                {/* Collection Books Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {collection.books.map((book) => (
                    <div
                      key={book.id}
                      className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-2xl hover:border-orange-200 transition-all duration-300 cursor-pointer group hover:-translate-y-2 relative"
                      onClick={() => handleBookReview(book)}
                    >
                      {/* DTMI Editorial Badge */}
                      <div className="absolute top-3 left-3 z-20">
                        <span className="bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                          DTMI Curated
                        </span>
                      </div>

                      <div className="aspect-video bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center relative">
                        <div className="w-28 h-36 bg-gradient-to-br from-gray-100 to-gray-200 rounded overflow-hidden shadow-xl group-hover:shadow-2xl transition-shadow duration-300">
                          <img
                            src={book.coverImage}
                            alt={book.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              const parent = target.parentElement!;
                              parent.innerHTML = `
                                <div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-100">
                                  <div class="text-center text-gray-600">
                                    <div class="w-8 h-8 mx-auto mb-2 bg-orange-500 rounded flex items-center justify-center text-white text-sm">
                                      ${collection.icon}
                                    </div>
                                    <p class="text-xs font-medium">Curated</p>
                                  </div>
                                </div>
                              `;
                            }}
                          />
                        </div>
                      </div>

                      <div className="p-5 relative z-20">
                        <h4 className="text-base font-bold text-black mb-2 line-clamp-2 group-hover:text-orange-600 transition-colors duration-300">
                          {book.title}
                        </h4>
                        <p className="text-gray-600 text-sm mb-3 group-hover:text-gray-700 transition-colors duration-300">
                          {book.author}
                        </p>

                        {/* DTMI Review Dimensions */}
                        <div className="space-y-3 mb-4">
                          <div className="grid grid-cols-2 gap-2 text-xs">
                            <div className="flex items-center justify-between">
                              <span className="text-gray-600">Strategic:</span>
                              <span className="font-semibold text-orange-600">
                                {book.strategicDepthScore ||
                                  (Math.random() * 2 + 3).toFixed(1)}
                              </span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-gray-600">Practical:</span>
                              <span className="font-semibold text-green-600">
                                {book.actionabilityScore ||
                                  (Math.random() * 2 + 3).toFixed(1)}
                              </span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-gray-600">Impact:</span>
                              <span className="font-semibold text-blue-600">
                                {(book.transformationImpactScore / 2).toFixed(
                                  1,
                                ) || (Math.random() * 2 + 3).toFixed(1)}
                              </span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-gray-600">DCO:</span>
                              <span className="font-semibold text-purple-600">
                                {(Math.random() * 2 + 3).toFixed(1)}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* DTMI Tags */}
                        <div className="flex flex-wrap gap-1 mb-3">
                          {book.sixDDimensions?.slice(0, 1).map((dimension) => (
                            <span
                              key={dimension}
                              className="bg-orange-100 text-orange-700 px-2 py-1 rounded text-xs font-medium"
                            >
                              {dimension
                                .replace("D1: ", "")
                                .replace("D2: ", "")
                                .replace("D3: ", "")
                                .replace("D4: ", "")
                                .replace("D5: ", "")
                                .replace("D6: ", "")}
                            </span>
                          )) || (
                            <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded text-xs font-medium">
                              Strategic
                            </span>
                          )}
                        </div>

                        {/* CTA */}
                        <div className="text-orange-600 font-semibold text-sm group-hover:text-orange-700 transition-colors flex items-center">
                          Read DTMI Review
                          <svg
                            className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform duration-300"
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
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 6. DTMI Book Intelligence Features */}
        <section className="py-16 bg-white text-gray-900">
          <div className="container mx-auto px-4 md:px-6 max-w-7xl">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold font-display mb-4">
                DTMI Book Intelligence
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Beyond generic bookstore experience - structured intelligence
                for digital transformation practitioners
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Structured Reviews */}
              <div className="bg-gradient-to-br from-orange-50 to-red-50 p-8 rounded-xl border border-orange-100">
                <div className="w-12 h-12 bg-orange-500 text-white rounded-lg flex items-center justify-center mb-6">
                  <Eye className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-4">Structured Reviews</h3>
                <p className="text-gray-700 mb-6">
                  Multi-dimensional analysis beyond star ratings: Strategic
                  Insight, Practical Utility, DCO Relevance, and Transformation
                  Impact.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Strategic Insight:</span>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 ${i < 4 ? "fill-orange-400 text-orange-400" : "text-gray-300"}`}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Practical Utility:</span>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 ${i < 3 ? "fill-green-400 text-green-400" : "text-gray-300"}`}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">DCO Relevance:</span>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 ${i < 5 ? "fill-purple-400 text-purple-400" : "text-gray-300"}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Intelligent Shortlisting */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-xl border border-blue-100">
                <div className="w-12 h-12 bg-blue-500 text-white rounded-lg flex items-center justify-center mb-6">
                  <Heart className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-4">
                  Intelligent Shortlisting
                </h3>
                <p className="text-gray-700 mb-6">
                  Create thematic reading lists by role, transformation
                  priority, or strategic focus. Track reading progress and build
                  knowledge paths.
                </p>
                <div className="space-y-2">
                  <div className="bg-white p-3 rounded-lg border border-blue-100">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">
                        AI Governance Reads
                      </span>
                      <span className="text-xs text-blue-600">7 books</span>
                    </div>
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-blue-100">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">
                        Executive Reading List
                      </span>
                      <span className="text-xs text-blue-600">12 books</span>
                    </div>
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-blue-100">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">
                        DCO Foundation
                      </span>
                      <span className="text-xs text-blue-600">5 books</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Strategic Context */}
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-xl border border-purple-100">
                <div className="w-12 h-12 bg-purple-500 text-white rounded-lg flex items-center justify-center mb-6">
                  <Target className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-4">Strategic Context</h3>
                <p className="text-gray-700 mb-6">
                  Every book positioned within digital transformation realities.
                  Understand what it explains, why it matters, and how it
                  connects to DTMI frameworks.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                    <span className="text-sm text-gray-700">
                      6xD Framework Alignment
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                    <span className="text-sm text-gray-700">
                      DCO Transformation Relevance
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                    <span className="text-sm text-gray-700">
                      Digital Economy Context
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                    <span className="text-sm text-gray-700">
                      Role-Based Recommendations
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA to Marketplace */}
            <div className="text-center mt-12">
              <button
                onClick={() => navigate("/marketplace/dtmi?tab=books")}
                className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                Explore Full DTMI Book Intelligence
              </button>
            </div>
          </div>
        </section>
        <section id="more-books" className="py-16 bg-white text-gray-900">
          <div className="container mx-auto px-4 md:px-6 max-w-7xl">
            <div className="mb-12">
              <h2 className="text-4xl font-bold font-display mb-4">
                Digital Transformation Classics
              </h2>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Show remaining 2 books from topBooksThisWeek */}
              {topBooksThisWeek.slice(4, 6).map((book, index) => (
                <div
                  key={book.id}
                  className="flex gap-6 p-6 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer group"
                  onClick={() => handleBookReview(book)}
                >
                  {/* Book icon - consistent with frontier books */}
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-lg">
                      📚
                    </div>
                  </div>

                  {/* Book Cover */}
                  <div className="flex-shrink-0">
                    <div className="w-20 h-28 bg-gradient-to-br from-gray-100 to-gray-200 rounded overflow-hidden shadow-lg">
                      <img
                        src={book.coverImage}
                        alt={book.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          const parent = target.parentElement!;
                          parent.innerHTML = `
                            <div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-100">
                              <div class="text-center text-gray-600">
                                <div class="w-8 h-8 mx-auto bg-orange-500 rounded flex items-center justify-center text-white text-sm">
                                  📚
                                </div>
                              </div>
                            </div>
                          `;
                        }}
                      />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-orange-600 transition-colors">
                      {book.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3">{book.author}</p>
                    <p className="text-gray-700 text-sm mb-4 line-clamp-2">
                      {book.shortDescription}
                    </p>

                    {/* Ratings */}
                    <div className="flex items-center gap-6 text-sm">
                      <div className="flex items-center gap-2">
                        <span className="text-gray-600">
                          Transformation Impact:
                        </span>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3 h-3 ${
                                i < Math.floor(book.rating)
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "text-gray-400"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-gray-700 font-semibold">
                          {book.rating}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-gray-600">Actionability:</span>
                        <span className="text-green-600 font-semibold">
                          {book.actionabilityScore ||
                            (Math.random() * 2 + 3).toFixed(1)}
                          /5
                        </span>
                      </div>
                    </div>

                    {/* 6xD Dimensions */}
                    <div className="flex flex-wrap gap-2 mt-3">
                      {book.sixDDimensions?.slice(0, 2).map((dimension) => (
                        <span
                          key={dimension}
                          className="bg-orange-100 text-orange-700 px-2 py-1 rounded text-xs font-medium"
                        >
                          {dimension}
                        </span>
                      )) || (
                        <>
                          <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded text-xs font-medium">
                            Digital Economy
                          </span>
                          <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded text-xs font-medium">
                            AI & Innovation
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {/* Then show 4 books from frontier */}
              {frontierBooks.slice(3, 7).map((book, index) => (
                <div
                  key={book.id}
                  className="flex gap-6 p-6 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer group"
                  onClick={() => handleBookReview(book)}
                >
                  {/* Book icon - consistent across all cards */}
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-lg">
                      📚
                    </div>
                  </div>

                  {/* Book Cover */}
                  <div className="flex-shrink-0">
                    <div className="w-20 h-28 bg-gradient-to-br from-gray-100 to-gray-200 rounded overflow-hidden shadow-lg">
                      <img
                        src={book.coverImage}
                        alt={book.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          const parent = target.parentElement!;
                          parent.innerHTML = `
                            <div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-100">
                              <div class="text-center text-gray-600">
                                <div class="w-8 h-8 mx-auto bg-orange-500 rounded flex items-center justify-center text-white text-sm">
                                  📚
                                </div>
                              </div>
                            </div>
                          `;
                        }}
                      />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-orange-600 transition-colors">
                      {book.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3">{book.author}</p>
                    <p className="text-gray-700 text-sm mb-4 line-clamp-2">
                      {book.shortDescription}
                    </p>

                    {/* Ratings */}
                    <div className="flex items-center gap-6 text-sm">
                      <div className="flex items-center gap-2">
                        <span className="text-gray-600">
                          Transformation Impact:
                        </span>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3 h-3 ${
                                i < Math.floor(book.rating)
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "text-gray-400"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-gray-700 font-semibold">
                          {book.rating}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-gray-600">Actionability:</span>
                        <span className="text-green-600 font-semibold">
                          {book.actionabilityScore ||
                            (Math.random() * 2 + 3).toFixed(1)}
                          /5
                        </span>
                      </div>
                    </div>

                    {/* 6xD Dimensions */}
                    <div className="flex flex-wrap gap-2 mt-3">
                      {book.sixDDimensions?.slice(0, 2).map((dimension) => (
                        <span
                          key={dimension}
                          className="bg-orange-100 text-orange-700 px-2 py-1 rounded text-xs font-medium"
                        >
                          {dimension}
                        </span>
                      )) || (
                        <>
                          <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded text-xs font-medium">
                            Digital & AI
                          </span>
                          <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded text-xs font-medium">
                            Operations
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 8. Newsletter CTA Section - DTMI Branding */}
        <section className="py-16 bg-gray-900 text-white">
          <div className="container mx-auto px-4 md:px-6 max-w-7xl">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left side - Title and Value Proposition */}
              <div>
                <h2 className="text-3xl md:text-4xl font-bold font-display text-white mb-6">
                  Stay Ahead with DTMI Book Intelligence
                </h2>
                <div className="space-y-4 text-gray-300">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p>
                      Weekly curated book recommendations aligned with digital
                      transformation priorities
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p>
                      Exclusive DTMI editorial reviews and strategic insights
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p>
                      Early access to new book intelligence and thematic
                      collections
                    </p>
                  </div>
                </div>
              </div>

              {/* Right side - Form and Additional Info */}
              <div>
                <div className="bg-gray-800 p-8 rounded-xl border border-gray-700">
                  <h3 className="text-xl font-semibold mb-4">
                    Get Book Intelligence Updates
                  </h3>
                  <p className="text-gray-300 mb-6">
                    Join 10,000+ digital leaders who rely on DTMI for strategic
                    book recommendations.
                  </p>

                  <form onSubmit={handleEmailSubmit} className="space-y-4">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      required
                      className="w-full px-4 py-3 text-white bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-400 focus:outline-none focus:border-orange-400 transition-all duration-300"
                    />
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white px-6 py-3 font-semibold rounded-lg transition-all duration-300 disabled:opacity-50"
                    >
                      {isSubmitting
                        ? "Subscribing..."
                        : "Subscribe to Book Intelligence"}
                    </button>
                  </form>

                  <p className="text-xs text-gray-400 mt-4">
                    Part of the <em>Digital Qatalyst</em> ecosystem.
                    <a
                      href="#"
                      className="text-orange-400 hover:text-orange-300 ml-1"
                    >
                      View all newsletter options →
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <ModernDQChatbot />
    </div>
  );
};

export default BooksLandingPage;
