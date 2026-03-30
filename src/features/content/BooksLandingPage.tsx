import { Header } from "../../shared/Header/Header";
import { Footer } from "../../shared/Footer/Footer";
import { useNavigate } from "react-router-dom";
import ModernDQChatbot from "../../shared/ModernDQChatbot";
import { useState, useEffect } from "react";
import { frontierBooks } from "../../utils/mockBookData";
import { Star, Search, BookOpen, Brain, CheckCircle } from "lucide-react";

const BooksLandingPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeFilter, setActiveFilter] = useState("D1: Digital Economy");

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Filter books based on active filter - exactly 4 books per topic
  const getFilteredBooks = () => {
    return frontierBooks
      .filter((book) => book.sixDDimensions?.includes(activeFilter))
      .slice(0, 4);
  };

  const filteredBooks = getFilteredBooks();

  // Featured books for section 3
  const featuredBooksData = [
    {
      title: "Platform Revolution",
      author: "Geoffrey G. Parker",
      summary:
        "A practical guide to understanding how platform-based businesses are transforming industries.",
      coverImage:
        "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      rating: 4.5,
    },
    {
      title: "The Second Machine Age",
      author: "Erik Brynjolfsson & Andrew McAfee",
      summary:
        "Explains how digital technologies are reshaping work, productivity, and the economy.",
      coverImage:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      rating: 4.3,
    },
    {
      title: "AI Superpowers",
      author: "Kai-Fu Lee",
      summary:
        "A comparison of global AI development and its impact on economies and innovation.",
      coverImage:
        "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      rating: 4.7,
    },
    {
      title: "Leading Digital",
      author: "George Westerman",
      summary:
        "Insights on how organizations can successfully navigate digital transformation.",
      coverImage:
        "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      rating: 4.4,
    },
  ];
  // Reviews for section 6
  const reviews = [
    {
      rating: 4.5,
      text: "A must-read for anyone leading digital transformation initiatives. Clear, insightful, and highly relevant.",
    },
    {
      rating: 4.0,
      text: "Breaks down complex ideas into practical concepts that can be applied in real organizations.",
    },
    {
      rating: 5.0,
      text: "An essential resource for understanding AI and its impact on business strategy.",
    },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(
      `/marketplace/dtmi?tab=books&search=${encodeURIComponent(searchQuery)}`,
    );
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-white">
      <Header />

      <main className="flex-1">
        {/* 1. HERO SECTION */}
        <section className="relative w-full bg-gradient-to-br from-[#0A1628] via-[#1a2942] to-[#0f1f3d] overflow-hidden py-20">
          <div
            className="absolute inset-0 transition-transform duration-[3000ms] ease-out"
            style={{
              backgroundImage:
                "linear-gradient(rgba(10, 22, 40, 0.75), rgba(10, 22, 40, 0.75)), url('https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              transform: isLoaded ? "scale(1)" : "scale(1.1)",
            }}
          />

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center text-white">
              <h1
                className="text-5xl md:text-6xl font-bold font-display mb-6"
                style={{
                  opacity: isLoaded ? 1 : 0,
                  transform: isLoaded ? "translateY(0)" : "translateY(30px)",
                  transition:
                    "opacity 0.8s ease-out 0.2s, transform 0.8s ease-out 0.2s",
                }}
              >
                DTMI Books
              </h1>

              <p
                className="text-xl md:text-2xl font-body text-white/90 leading-relaxed mb-8"
                style={{
                  opacity: isLoaded ? 1 : 0,
                  transform: isLoaded ? "translateY(0)" : "translateY(30px)",
                  transition:
                    "opacity 1s ease-out 0.4s, transform 1s ease-out 0.4s",
                }}
              >
                Discover, review, and shortlist the most relevant books on
                Digital Transformation, AI, and the Digital Economy.
              </p>

              {/* Search Bar */}
              <form
                onSubmit={handleSearch}
                className="max-w-2xl mx-auto mb-8"
                style={{
                  opacity: isLoaded ? 1 : 0,
                  transform: isLoaded ? "translateY(0)" : "translateY(30px)",
                  transition:
                    "opacity 1.2s ease-out 0.6s, transform 1.2s ease-out 0.6s",
                }}
              >
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search books, authors, or topics…"
                    className="w-full pl-12 pr-4 py-4 text-gray-900 bg-white/95 backdrop-blur-sm rounded-lg border border-white/20 focus:ring-2 focus:ring-orange-400 focus:outline-none focus:border-orange-400 transition-all duration-300"
                  />
                </div>
              </form>

              {/* Buttons */}
              <div
                className="flex flex-col sm:flex-row gap-4 justify-center"
                style={{
                  opacity: isLoaded ? 1 : 0,
                  transform: isLoaded ? "translateY(0)" : "translateY(30px)",
                  transition:
                    "opacity 1.4s ease-out 0.8s, transform 1.4s ease-out 0.8s",
                }}
              >
                <button
                  onClick={() => navigate("/marketplace/dtmi?tab=books")}
                  className="px-8 py-4 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-bold text-lg rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  Explore Books
                </button>
                <button
                  onClick={() =>
                    navigate("/marketplace/dtmi?tab=books&view=collections")
                  }
                  className="px-8 py-4 border-2 border-white text-white font-bold text-lg rounded-lg hover:bg-white hover:text-gray-900 transition-all duration-300"
                >
                  Browse Collections
                </button>
              </div>
            </div>
          </div>
        </section>
        {/* 2. PURPOSE / INTRO */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold font-display mb-6 text-gray-900">
              Why DTMI Books?
            </h2>
            <p className="text-xl text-gray-700 leading-relaxed">
              Finding the right books can be overwhelming. DTMI Books simplifies
              this by curating, reviewing, and organizing the most relevant
              reads for understanding digital transformation, artificial
              intelligence, and the digital economy. Whether you are a leader,
              practitioner, or learner, this is your guide to the books that
              truly matter.
            </p>
          </div>
        </section>

        {/* 3. FEATURED BOOKS */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-7xl">
            <h2 className="text-3xl md:text-4xl font-bold font-display mb-12 text-gray-900 text-center">
              Featured Books
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredBooksData.map((book, index) => (
                <div
                  key={index}
                  className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl hover:border-orange-200 transition-all duration-300 group"
                >
                  <div className="aspect-[3/4] bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                    <img
                      src={book.coverImage}
                      alt={book.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src =
                          "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjI2NyIgdmlld0JveD0iMCAwIDIwMCAyNjciIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjY3IiBmaWxsPSIjRjM5NTAwIi8+Cjx0ZXh0IHg9IjEwMCIgeT0iMTMzIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iNDAiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIj7wn5OyPC90ZXh0Pgo8L3N2Zz4K";
                      }}
                    />
                  </div>

                  <div className="p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
                      {book.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3">{book.author}</p>
                    <p className="text-gray-700 text-sm mb-4 line-clamp-3">
                      {book.summary}
                    </p>

                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(book.rating)
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                        <span className="text-sm text-gray-600 ml-1">
                          {book.rating}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() =>
                        navigate(
                          `/marketplace/dtmi?tab=books&book=${book.title.toLowerCase().replace(/\s+/g, "-")}`,
                        )
                      }
                      className="w-full px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg transition-colors"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        {/* 4. BROWSE BY CATEGORY - 6xD Books Grid with Filter Tabs */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 md:px-6 max-w-7xl">
            <div className="mb-12">
              <h2 className="text-4xl font-bold font-display mb-4 text-gray-900">
                Browse by Category
              </h2>

              {/* Filter Tabs */}
              <div className="flex flex-wrap gap-4 mb-8">
                {[
                  "Digital Economy",
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
                        filter === "Digital Economy"
                          ? "D1: Digital Economy"
                          : filter === "Cognitive Organization"
                            ? "D2: Digital Cognitive Organization"
                            : filter === "Business Platforms"
                              ? "D3: Digital Business Platforms"
                              : filter === "Future of Work"
                                ? "D5: Digital Workers and Workspace"
                                : filter === "Accelerators"
                                  ? "D6: Digital Accelerators"
                                  : `D4: Digital ${filter}`,
                      )
                    }
                    className={`px-6 py-2 rounded-full font-medium transition-colors ${
                      (activeFilter === "D1: Digital Economy" &&
                        filter === "Digital Economy") ||
                      (activeFilter === "D2: Digital Cognitive Organization" &&
                        filter === "Cognitive Organization") ||
                      (activeFilter === "D3: Digital Business Platforms" &&
                        filter === "Business Platforms") ||
                      (activeFilter === "D5: Digital Workers and Workspace" &&
                        filter === "Future of Work") ||
                      (activeFilter === "D6: Digital Accelerators" &&
                        filter === "Accelerators") ||
                      activeFilter === `D4: Digital ${filter}`
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
                  onClick={() =>
                    navigate(
                      `/marketplace/dtmi?tab=books&book=${book.title.toLowerCase().replace(/\s+/g, "-")}`,
                    )
                  }
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
                        View Details
                      </div>
                    </div>
                  </div>

                  <div className="p-4 relative z-20">
                    <h3 className="text-base font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-orange-600 transition-colors duration-300">
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
                          View Details →
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        {/* 5. TOP AI BOOKS FOR LEADERS */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-7xl">
            <h2 className="text-3xl md:text-4xl font-bold font-display mb-12 text-gray-900 text-center">
              Top AI Books for Leaders
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  title: "Co-Intelligence: Living and Working with AI",
                  author: "Ethan Mollick",
                  year: "2024",
                  summary:
                    "Widely recommended as the best starting point for leaders, focusing on practical, daily collaboration with AI, promoting the 'human in the loop' approach and treating AI as an 'alien expert'.",
                  coverImage:
                    "https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
                  rating: 4.8,
                },
                {
                  title: "The AI-Driven Leader",
                  author: "Geoff Woods",
                  year: "2025/2026",
                  summary:
                    "An essential guide for executives, focusing on translating AI into tangible business impact and using it as a strategic partner to overcome operational challenges.",
                  coverImage:
                    "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
                  rating: 4.7,
                },
                {
                  title: "Human + Machine: Reimagining Work in the Age of AI",
                  author: "Paul R. Daugherty & H. James Wilson",
                  year: "2018",
                  summary:
                    "A classic for understanding how AI augments, rather than replaces, human capabilities, offering a framework for redesigning business processes.",
                  coverImage:
                    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
                  rating: 4.6,
                },
                {
                  title:
                    "The Coming Wave: Technology, Power, and the Twenty-First Century's Greatest Dilemma",
                  author: "Mustafa Suleyman",
                  year: "2023",
                  summary:
                    "Highly recommended by leaders like Bill Gates, this book offers a strategic view of the societal and geopolitical impacts of AI.",
                  coverImage:
                    "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
                  rating: 4.9,
                },
              ].map((book, index) => (
                <div
                  key={index}
                  className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl hover:border-orange-200 transition-all duration-300 group"
                >
                  <div className="aspect-[3/4] bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                    <img
                      src={book.coverImage}
                      alt={book.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src =
                          "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjI2NyIgdmlld0JveD0iMCAwIDIwMCAyNjciIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjY3IiBmaWxsPSIjRjM5NTAwIi8+Cjx0ZXh0IHg9IjEwMCIgeT0iMTMzIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iNDAiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIj7wn5OyPC90ZXh0Pgo8L3N2Zz4K";
                      }}
                    />
                  </div>

                  <div className="p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
                      {book.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-1">{book.author}</p>
                    <p className="text-gray-500 text-xs mb-3">{book.year}</p>
                    <p className="text-gray-700 text-sm mb-4 line-clamp-3">
                      {book.summary}
                    </p>

                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(book.rating)
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                        <span className="text-sm text-gray-600 ml-1">
                          {book.rating}
                        </span>
                      </div>
                      <span className="text-xs text-blue-600 font-semibold bg-blue-50 px-2 py-1 rounded-full">
                        AI Leadership
                      </span>
                    </div>

                    <button
                      onClick={() =>
                        navigate(
                          `/marketplace/dtmi?tab=books&book=${book.title.toLowerCase().replace(/\s+/g, "-")}`,
                        )
                      }
                      className="w-full px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg transition-colors"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 6. MUST-READ DIGITAL TRANSFORMATION BOOKS */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 max-w-7xl">
            <h2 className="text-3xl md:text-4xl font-bold font-display mb-12 text-gray-900 text-center">
              Must-Read Digital Transformation Books
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  title: "Designed for Digital",
                  author: "Jeanne Ross et al.",
                  publisher: "MIT",
                  summary:
                    "Focuses on the 'architectural' side—how to organize your people and data so you can actually execute on a digital strategy rather than just talking about it.",
                  coverImage:
                    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
                  rating: 4.6,
                },
                {
                  title: "Leading Digital",
                  author: "George Westerman et al.",
                  year: "2014",
                  summary:
                    "Highlights 'Digital Masters'—companies that excel in both digital capability and leadership capability, providing a roadmap for transformation success.",
                  coverImage:
                    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
                  rating: 4.5,
                },
                {
                  title: "The Innovator's Dilemma",
                  author: "Clayton Christensen",
                  year: "1997",
                  summary:
                    "Though written in 1997, it remains the foundational text on why successful companies fail when faced with disruptive technologies.",
                  coverImage:
                    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
                  rating: 4.7,
                },
                {
                  title: "The Phoenix Project",
                  author: "Gene Kim et al.",
                  year: "2013",
                  summary:
                    "A novel (business fable) that is surprisingly effective at showing how IT bottlenecks kill businesses and how to fix them using 'The Three Ways.'",
                  coverImage:
                    "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
                  rating: 4.8,
                },
              ].map((book, index) => (
                <div
                  key={index}
                  className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl hover:border-green-200 transition-all duration-300 group"
                >
                  <div className="aspect-[3/4] bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                    <img
                      src={book.coverImage}
                      alt={book.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src =
                          "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjI2NyIgdmlld0JveD0iMCAwIDIwMCAyNjciIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjY3IiBmaWxsPSIjMTA5OTZFIi8+Cjx0ZXh0IHg9IjEwMCIgeT0iMTMzIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iNDAiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIj7wn5OyPC90ZXh0Pgo8L3N2Zz4K";
                      }}
                    />
                  </div>

                  <div className="p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                      {book.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-1">{book.author}</p>
                    {book.publisher && (
                      <p className="text-gray-500 text-xs mb-1">
                        {book.publisher}
                      </p>
                    )}
                    {book.year && (
                      <p className="text-gray-500 text-xs mb-3">{book.year}</p>
                    )}
                    <p className="text-gray-700 text-sm mb-4 line-clamp-3">
                      {book.summary}
                    </p>

                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(book.rating)
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                        <span className="text-sm text-gray-600 ml-1">
                          {book.rating}
                        </span>
                      </div>
                      <span className="text-xs text-green-600 font-semibold bg-green-50 px-2 py-1 rounded-full">
                        Digital Transformation
                      </span>
                    </div>

                    <button
                      onClick={() =>
                        navigate(
                          `/marketplace/dtmi?tab=books&book=${book.title.toLowerCase().replace(/\s+/g, "-")}`,
                        )
                      }
                      className="w-full px-4 py-2 bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg transition-colors"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 7. REVIEWS HIGHLIGHT */}
        <section className="py-16 bg-gray-900 text-white">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-3xl md:text-4xl font-bold font-display mb-12 text-center">
              What Readers Are Saying
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              {reviews.map((review, index) => (
                <div
                  key={index}
                  className="bg-gray-800 p-6 rounded-xl border border-gray-700"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(review.rating)
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-600"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-yellow-400 font-semibold">
                      {review.rating} / 5
                    </span>
                  </div>
                  <p className="text-gray-300 italic">"{review.text}"</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 8. HOW IT WORKS */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold font-display mb-4 text-gray-900">
                How It Works
              </h2>
            </div>

            <div className="grid md:grid-cols-4 gap-8">
              {[
                {
                  step: "1",
                  title: "Discover",
                  description:
                    "Discover curated books across key digital topics",
                  icon: Search,
                },
                {
                  step: "2",
                  title: "Read & Review",
                  description:
                    "Read summaries, insights, and structured reviews",
                  icon: BookOpen,
                },
                {
                  step: "3",
                  title: "Save",
                  description: "Save books to your personal reading list",
                  icon: BookOpen,
                },
                {
                  step: "4",
                  title: "Learn & Apply",
                  description: "Build your knowledge and apply what you learn",
                  icon: Brain,
                },
              ].map((step) => (
                <div key={step.step} className="text-center">
                  <div className="relative mb-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
                      {step.step}
                    </div>
                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto">
                      <step.icon className="w-6 h-6 text-orange-600" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        {/* 9. PERSONAL READING LIST */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold font-display mb-6 text-gray-900">
                  Your Reading List
                </h2>
                <p className="text-xl text-gray-600 mb-8">
                  Create and manage your personal shortlist of books. Save what
                  you want to read, track your progress, and build your own
                  learning journey.
                </p>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-6 h-6 text-green-500" />
                    <span className="text-gray-700">
                      Track your reading progress
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-6 h-6 text-green-500" />
                    <span className="text-gray-700">
                      Get personalized recommendations
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-6 h-6 text-green-500" />
                    <span className="text-gray-700">
                      Share lists with your team
                    </span>
                  </div>
                </div>

                <button
                  onClick={() =>
                    navigate("/marketplace/dtmi?tab=books&action=create-list")
                  }
                  className="px-8 py-4 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-bold rounded-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  Create Your Reading List
                </button>
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  Sample Reading List
                </h3>
                <div className="space-y-4">
                  {featuredBooksData.slice(0, 3).map((book, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-4 p-3 bg-white rounded-lg"
                    >
                      <div className="w-10 h-12 bg-gradient-to-br from-orange-100 to-orange-200 rounded flex items-center justify-center text-sm">
                        📚
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 truncate">
                          {book.title}
                        </p>
                        <p className="text-sm text-gray-500">{book.author}</p>
                      </div>
                      <div className="text-xs text-gray-400">
                        {index === 0
                          ? "Reading"
                          : index === 1
                            ? "Next"
                            : "Saved"}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 10. CONNECT TO DTMI CONTENT */}
        <section className="py-16 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
          <div className="container mx-auto px-4 max-w-6xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold font-display mb-6">
              Go Beyond Books
            </h2>
            <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
              Explore related articles, insights, and whitepapers that connect
              key ideas from the books to real-world digital transformation and
              AI use cases.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate("/marketplace/dtmi?tab=articles")}
                className="px-8 py-4 bg-white text-gray-900 font-bold rounded-lg hover:bg-gray-100 transition-colors"
              >
                View Articles
              </button>
              <button
                onClick={() => navigate("/marketplace/dtmi?tab=insights")}
                className="px-8 py-4 border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-gray-900 transition-colors"
              >
                Explore Insights
              </button>
            </div>
          </div>
        </section>

        {/* 11. FINAL CTA */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold font-display mb-6 text-gray-900">
              Ready to Start Reading?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Discover the books that will shape your understanding of the
              digital economy, AI, and transformation.
            </p>

            <button
              onClick={() => navigate("/marketplace/dtmi?tab=books")}
              className="px-10 py-4 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-bold text-lg rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              Explore DTMI Books
            </button>
          </div>
        </section>
      </main>

      <Footer />
      <ModernDQChatbot />
    </div>
  );
};

export default BooksLandingPage;
