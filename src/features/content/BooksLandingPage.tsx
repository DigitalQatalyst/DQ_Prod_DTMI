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
import { Star, ChevronDown } from "lucide-react";

const BooksLandingPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeFilter, setActiveFilter] = useState("Digital Economy");

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Filter books based on active filter for Frontier Watch - exactly 4 books per topic
  const getFilteredBooks = () => {
    switch (activeFilter) {
      case "Digital Economy":
        // Return exactly 4 books for Digital Economy
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
        // Show first 4 books from Digital Economy by default
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
        {/* 1. Hero Section - Book-focused with animated background */}
        <section
          className="relative w-full bg-gradient-to-br from-[#0A1628] via-[#1a2942] to-[#0f1f3d] overflow-hidden"
          style={{ height: "100vh" }}
        >
          {/* Animated background image with zoom effect - Pile of books */}
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

          {/* Animated Book Network Lines */}
          <div className="absolute inset-0 opacity-20">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient
                  id="bookLineGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#FF6B4D" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#F97316" stopOpacity="0.6" />
                </linearGradient>
              </defs>
              <g className="animate-pulse">
                <line
                  x1="15%"
                  y1="25%"
                  x2="35%"
                  y2="45%"
                  stroke="url(#bookLineGradient)"
                  strokeWidth="1"
                />
                <line
                  x1="35%"
                  y1="45%"
                  x2="55%"
                  y2="35%"
                  stroke="url(#bookLineGradient)"
                  strokeWidth="1"
                />
                <line
                  x1="55%"
                  y1="35%"
                  x2="75%"
                  y2="55%"
                  stroke="url(#bookLineGradient)"
                  strokeWidth="1"
                />
                <line
                  x1="75%"
                  y1="55%"
                  x2="85%"
                  y2="40%"
                  stroke="url(#bookLineGradient)"
                  strokeWidth="1"
                />
              </g>
              {/* Book-themed connection nodes */}
              <circle cx="15%" cy="25%" r="4" fill="#FF6B4D" opacity="0.8">
                <animate
                  attributeName="opacity"
                  values="0.8;1;0.8"
                  dur="3s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx="55%" cy="35%" r="4" fill="#F97316" opacity="0.8">
                <animate
                  attributeName="opacity"
                  values="0.8;1;0.8"
                  dur="3.5s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx="85%" cy="40%" r="4" fill="#FF6B4D" opacity="0.8">
                <animate
                  attributeName="opacity"
                  values="0.8;1;0.8"
                  dur="4s"
                  repeatCount="indefinite"
                />
              </circle>
            </svg>
          </div>

          <div className="container mx-auto px-4 h-full flex items-center relative z-10">
            <div className="max-w-4xl mx-auto text-center text-white">
              {/* Badge */}
              <div
                className="inline-block px-4 py-2 text-sm font-medium bg-white/10 backdrop-blur-sm text-white rounded-full mb-6 border border-white/20"
                style={{
                  opacity: isLoaded ? 1 : 0,
                  transform: isLoaded ? "translateY(0)" : "translateY(20px)",
                  transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
                }}
              >
                📚 Digital Transformation Literature Hub
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
                Seminal Books on Digital Transformation
              </h1>

              {/* Subheadline */}
              <p
                className="text-xl md:text-2xl font-body text-white/90 leading-relaxed max-w-3xl mx-auto mb-12"
                style={{
                  opacity: isLoaded ? 1 : 0,
                  transform: isLoaded ? "translateY(0)" : "translateY(30px)",
                  transition:
                    "opacity 1s ease-out 0.4s, transform 1s ease-out 0.4s",
                }}
              >
                Expert-curated reviews, strategic frameworks, and actionable
                insights from the world's leading digital transformation books
              </p>

              {/* CTA */}
              <button
                onClick={handleScrollDown}
                className="px-8 py-4 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-bold rounded-lg shadow-lg transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl text-center flex items-center justify-center mx-auto overflow-hidden group"
                style={{
                  opacity: isLoaded ? 1 : 0,
                  transform: isLoaded ? "translateY(0)" : "translateY(30px)",
                  transition:
                    "opacity 1.2s ease-out 0.6s, transform 1.2s ease-out 0.6s",
                }}
              >
                <span className="relative z-10">Explore Featured Reviews</span>
                <span className="absolute inset-0 overflow-hidden rounded-lg">
                  <span className="absolute inset-0 bg-white/20 transform scale-0 opacity-0 group-hover:scale-[2.5] group-hover:opacity-100 rounded-full transition-all duration-700 origin-center"></span>
                </span>
              </button>
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
                    The Essential Read
                  </h1>
                  <p className="text-xl mb-6">
                    A Must-Read for Strategic Innovation in the Digital Economy
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
                    "Rethink your business model by shifting from a linear value
                    chain to a dynamic value network."
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
        <section className="py-16 bg-gray-900 text-white">
          <div className="container mx-auto px-4 md:px-6 max-w-7xl">
            <div className="mb-12">
              <h2 className="text-4xl font-bold font-display mb-4">
                Trending Books
              </h2>
            </div>

            {/* Trending Books Grid */}
            <div className="grid md:grid-cols-3 gap-8">
              {frontierBooks.slice(0, 3).map((book) => (
                <div
                  key={book.id}
                  className="bg-gray-800 rounded-lg overflow-hidden hover:bg-gray-750 transition-colors cursor-pointer group"
                  onClick={() => handleBookReview(book)}
                >
                  <div className="aspect-video bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center relative">
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
                    <h3 className="text-lg font-bold text-white mb-2 line-clamp-2 group-hover:text-orange-400 transition-colors">
                      {book.title}
                    </h3>
                    <p className="text-gray-400 text-sm mb-3">{book.author}</p>
                    <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                      {book.shortDescription}
                    </p>

                    {/* Rating and Tags */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3 h-3 ${
                                i < Math.floor(book.rating)
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "text-gray-600"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-xs text-gray-400">
                          {book.rating}
                        </span>
                      </div>
                      <span className="text-xs text-orange-400 font-semibold">
                        Trending
                      </span>
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
                Frontier Watch
              </h2>
              <p className="text-xl font-body text-gray-600 mb-8">
                For business leaders navigating modern digital shifts, these
                trending and foundational books provide strategic frameworks for
                the six pillars of transformation.
              </p>

              {/* Filter Tabs */}
              <div className="flex flex-wrap gap-4 mb-8">
                {[
                  "Digital Economy",
                  "Digital Cognitive Organization",
                  "Digital Business Platforms",
                  "Digital Transformation",
                  "Digital Workers and Workspace",
                  "Digital Accelerators",
                ].map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className={`px-6 py-2 rounded-full font-medium transition-colors ${
                      activeFilter === filter
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
                  className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group"
                  onClick={() => handleBookReview(book)}
                >
                  <div className="aspect-video bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center relative">
                    <div className="w-24 h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded overflow-hidden shadow-xl">
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
                  </div>

                  <div className="p-4">
                    <h3 className="text-base font-bold text-black mb-2 line-clamp-2 group-hover:text-orange-600 transition-colors">
                      {book.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-2">{book.author}</p>
                    <p className="text-gray-700 text-sm mb-3 line-clamp-2">
                      {book.shortDescription}
                    </p>

                    {/* Rating and Tags */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3 h-3 ${
                                i < Math.floor(book.rating)
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-xs text-gray-500 ml-1">
                          {book.rating}
                        </span>
                      </div>
                      <span className="text-xs text-orange-600 font-semibold">
                        6xD
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. Top 10 Books This Week */}
        <section className="py-16 bg-black text-white">
          <div className="container mx-auto px-4 md:px-6 max-w-7xl">
            <div className="mb-12">
              <h2 className="text-4xl font-bold font-display mb-4">
                Top 10 Books This Week
              </h2>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* First show the original top books */}
              {topBooksThisWeek.slice(0, 6).map((book, index) => (
                <div
                  key={book.id}
                  className="flex gap-6 p-6 bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors cursor-pointer group"
                  onClick={() => handleBookReview(book)}
                >
                  {/* Rank */}
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-lg">
                      #{index + 1}
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
                    <h3 className="text-lg font-bold text-white mb-2 line-clamp-2 group-hover:text-orange-400 transition-colors">
                      {book.title}
                    </h3>
                    <p className="text-gray-400 text-sm mb-3">{book.author}</p>
                    <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                      {book.shortDescription}
                    </p>

                    {/* Ratings */}
                    <div className="flex items-center gap-6 text-sm">
                      <div className="flex items-center gap-2">
                        <span className="text-gray-400">
                          Transformation Impact:
                        </span>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3 h-3 ${
                                i < Math.floor(book.rating)
                                  ? "fill-orange-400 text-orange-400"
                                  : "text-gray-600"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-orange-400 font-semibold">
                          {book.rating}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-gray-400">Actionability:</span>
                        <span className="text-green-400 font-semibold">
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
                          className="bg-orange-500/20 text-orange-400 px-2 py-1 rounded text-xs font-medium"
                        >
                          {dimension}
                        </span>
                      )) || (
                        <>
                          <span className="bg-orange-500/20 text-orange-400 px-2 py-1 rounded text-xs font-medium">
                            D1: Digital Economy
                          </span>
                          <span className="bg-blue-500/20 text-blue-400 px-2 py-1 rounded text-xs font-medium">
                            D2: Platforms
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {/* Then show books from frontier that were in expert reviews */}
              {frontierBooks.slice(3, 7).map((book, index) => (
                <div
                  key={book.id}
                  className="flex gap-6 p-6 bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors cursor-pointer group"
                  onClick={() => handleBookReview(book)}
                >
                  {/* Rank */}
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-lg">
                      #{index + 7}
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
                    <h3 className="text-lg font-bold text-white mb-2 line-clamp-2 group-hover:text-orange-400 transition-colors">
                      {book.title}
                    </h3>
                    <p className="text-gray-400 text-sm mb-3">{book.author}</p>
                    <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                      {book.shortDescription}
                    </p>

                    {/* Ratings */}
                    <div className="flex items-center gap-6 text-sm">
                      <div className="flex items-center gap-2">
                        <span className="text-gray-400">
                          Transformation Impact:
                        </span>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3 h-3 ${
                                i < Math.floor(book.rating)
                                  ? "fill-orange-400 text-orange-400"
                                  : "text-gray-600"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-orange-400 font-semibold">
                          {book.rating}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-gray-400">Actionability:</span>
                        <span className="text-green-400 font-semibold">
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
                          className="bg-orange-500/20 text-orange-400 px-2 py-1 rounded text-xs font-medium"
                        >
                          {dimension}
                        </span>
                      )) || (
                        <>
                          <span className="bg-orange-500/20 text-orange-400 px-2 py-1 rounded text-xs font-medium">
                            D3: Digital & AI
                          </span>
                          <span className="bg-blue-500/20 text-blue-400 px-2 py-1 rounded text-xs font-medium">
                            D4: Operations
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

        {/* 6. Newsletter CTA Section */}
        <section className="py-20 bg-black text-white">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <div className="text-center">
              <h2 className="text-4xl font-bold font-display mb-6">
                Join the Digital Transformation Reading Community
              </h2>
              <p className="text-xl font-body mb-12 leading-relaxed text-gray-300">
                Get expert reviews and insights from digital transformation
                leaders.
              </p>

              <form
                onSubmit={handleEmailSubmit}
                className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto mb-8"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="flex-1 px-6 py-4 text-black focus:ring-2 focus:ring-orange-400 focus:outline-none text-lg rounded-lg"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 font-bold font-body text-lg transition-colors disabled:opacity-50 whitespace-nowrap rounded-lg"
                >
                  {isSubmitting ? "Signing Up..." : "Subscribe"}
                </button>
              </form>

              <p className="text-gray-400 text-sm">
                Join thousands of digital transformation leaders. No spam,
                unsubscribe anytime.
              </p>
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
