import { Header } from "../../shared/Header/Header";
import { Footer } from "../../shared/Footer/Footer";
import { useNavigate } from "react-router-dom";
import ModernDQChatbot from "../../shared/ModernDQChatbot";
import { useState } from "react";
import {
  featuredBooks,
  bookCategories,
  authorInfo,
  testimonials,
} from "../../utils/mockBookData";
import { BookCard } from "../../components/books/BookCard";
import { Book } from "../../types/book";
import { ArrowRight, Star, Users, BookOpen, Check, Award } from "lucide-react";

const BooksLandingPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    alert(`Thank you! We'll notify you at ${email} about new book releases.`);
    setEmail("");
    setIsSubmitting(false);
  };

  const handleBookExplore = (book: Book) => {
    navigate(`/books/${book.id}`);
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-white">
      <Header />

      <main className="flex-1">
        {/* 1. Hero Section */}
        <section
          className="relative w-full bg-gradient-to-r from-brand-navy via-[#1a2942] to-[#0f1f3d] overflow-hidden"
          style={{ height: "100vh" }}
        >
          {/* Animated background image with zoom effect - Library/Books theme */}
          <div
            className="absolute inset-0 transition-transform duration-[3000ms] ease-out"
            style={{
              backgroundImage:
                "linear-gradient(rgba(3, 15, 53, 0.75), rgba(3, 15, 53, 0.75)), url('https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              transform: "scale(1)",
            }}
          ></div>

          {/* Animated gradient overlay */}
          <div
            className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-blue-500/20 mix-blend-multiply"
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
                  <stop offset="100%" stopColor="#4F9CF9" stopOpacity="0.6" />
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

              {/* Book icons as connection points */}
              <g fill="#FF6B4D" opacity="0.8">
                <rect x="13%" y="23%" width="4" height="4" rx="1">
                  <animate
                    attributeName="opacity"
                    values="0.8;1;0.8"
                    dur="3s"
                    repeatCount="indefinite"
                  />
                </rect>
                <rect x="53%" y="33%" width="4" height="4" rx="1">
                  <animate
                    attributeName="opacity"
                    values="0.8;1;0.8"
                    dur="3.5s"
                    repeatCount="indefinite"
                  />
                </rect>
                <rect x="83%" y="38%" width="4" height="4" rx="1">
                  <animate
                    attributeName="opacity"
                    values="0.8;1;0.8"
                    dur="4s"
                    repeatCount="indefinite"
                  />
                </rect>
              </g>
            </svg>
          </div>

          <div className="container mx-auto px-4 h-full flex flex-col justify-center items-center relative z-10">
            <div className="text-center max-w-5xl mx-auto mb-8">
              <div className="inline-block px-4 py-2 text-sm font-medium bg-white/10 backdrop-blur-sm text-white rounded-full mb-6 border border-white/20">
                Digital Transformation Library
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Explore Books, Insights, Research & Signals{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-orange-400">
                  for Digital Leaders
                </span>
              </h1>

              <p className="text-lg md:text-xl text-white/90 mb-10 leading-relaxed">
                Your comprehensive digital transformation knowledge library with
                curated content for strategic leadership
              </p>
            </div>

            {/* Call to Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <button
                onClick={() => navigate("/marketplace/dtmi?tab=books")}
                className="px-8 py-3 bg-primary-500 hover:bg-primary-600 text-white font-bold rounded-lg shadow-lg transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl text-center flex items-center justify-center overflow-hidden group"
              >
                <span className="relative z-10">Browse Books</span>
                <ArrowRight
                  size={18}
                  className="ml-2 relative z-10 group-hover:translate-x-1 transition-transform duration-300"
                />
                <span className="absolute inset-0 overflow-hidden rounded-lg">
                  <span className="absolute inset-0 bg-white/20 transform scale-0 opacity-0 group-hover:scale-[2.5] group-hover:opacity-100 rounded-full transition-all duration-700 origin-center"></span>
                </span>
              </button>

              <button
                onClick={() => navigate("/marketplace/dtmi?tab=insights")}
                className="border-2 border-white text-white hover:bg-white hover:text-brand-navy px-8 py-3 rounded-lg font-bold transition-all duration-300 hover:-translate-y-1"
              >
                Explore Insights
              </button>
            </div>
          </div>

          {/* Scroll indicator */}
          <div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer"
            onClick={() =>
              document
                .getElementById("featured-books")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
            </div>
            <span className="sr-only">Scroll down</span>
          </div>

          {/* Keyframes for gradient animation */}
          <style jsx>{`
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
        {/* 2. Featured Books Section */}
        <section id="featured-books" className="py-20 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-16">
              <div className="flex items-center justify-center mb-4">
                <div className="w-4 h-4 bg-primary-500 rounded-full mr-3"></div>
                <span className="text-sm font-bold text-primary-500 uppercase tracking-wider">
                  Featured Books
                </span>
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
                Foundational Knowledge for Digital Leaders
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                In-depth frameworks and playbooks from recognized experts in
                digital transformation
              </p>
            </div>

            {/* Books Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {featuredBooks.slice(0, 6).map((book) => (
                <BookCard
                  key={book.id}
                  book={book}
                  onExplore={handleBookExplore}
                />
              ))}
            </div>
          </div>
        </section>

        {/* 3. Browse by Topic */}
        <section id="categories" className="py-20 bg-gray-50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
                Browse by Topic
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Find knowledge tailored to your specific transformation
                challenges and leadership needs
              </p>
            </div>

            {/* Categories Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {bookCategories.map((category) => {
                const categoryBookCount = featuredBooks.filter(
                  (book) => book.category.id === category.id,
                ).length;
                return (
                  <div
                    key={category.id}
                    className="bg-white border border-gray-200 rounded-xl p-8 hover:shadow-lg transition-all duration-300 group cursor-pointer"
                    onClick={() =>
                      navigate(
                        `/marketplace/dtmi?tab=books&category=${category.slug}`,
                      )
                    }
                  >
                    <div
                      className={`w-16 h-16 ${category.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <span className="text-2xl">{category.icon}</span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-primary-600 transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {category.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">
                        {categoryBookCount}{" "}
                        {categoryBookCount === 1 ? "book" : "books"}
                      </span>
                      <ArrowRight className="w-5 h-5 text-primary-500 group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 4. Reading Paths */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
                Start with a Reading Path
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Curated journeys designed for different leadership roles and
                transformation challenges
              </p>
            </div>

            {/* Reading Paths Grid */}
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-8 hover:shadow-lg transition-all duration-300 group">
                <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl text-white">🚀</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  For New Digital Leaders
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Essential foundations for leaders starting their digital
                  transformation journey
                </p>
                <div className="space-y-2 mb-6">
                  <div className="text-sm text-blue-700 font-medium">
                    3 foundational books
                  </div>
                  <div className="text-sm text-blue-700 font-medium">
                    2 strategic insights
                  </div>
                  <div className="text-sm text-blue-700 font-medium">
                    Key frameworks
                  </div>
                </div>
                <button
                  onClick={() =>
                    navigate("/marketplace/dtmi?tab=books&category=leadership")
                  }
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-semibold transition-colors inline-flex items-center justify-center gap-2"
                >
                  Start Path
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-violet-50 border border-purple-200 rounded-xl p-8 hover:shadow-lg transition-all duration-300 group">
                <div className="w-16 h-16 bg-purple-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl text-white">🤖</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  For AI & Data Strategy
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Comprehensive guide to leveraging AI and data for competitive
                  advantage
                </p>
                <div className="space-y-2 mb-6">
                  <div className="text-sm text-purple-700 font-medium">
                    2 AI strategy books
                  </div>
                  <div className="text-sm text-purple-700 font-medium">
                    1 research piece
                  </div>
                  <div className="text-sm text-purple-700 font-medium">
                    2 trend signals
                  </div>
                </div>
                <button
                  onClick={() =>
                    navigate(
                      "/marketplace/dtmi?tab=books&category=ai-machine-learning",
                    )
                  }
                  className="w-full bg-purple-500 hover:bg-purple-600 text-white py-3 rounded-lg font-semibold transition-colors inline-flex items-center justify-center gap-2"
                >
                  Start Path
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="bg-gradient-to-br from-teal-50 to-cyan-50 border border-teal-200 rounded-xl p-8 hover:shadow-lg transition-all duration-300 group">
                <div className="w-16 h-16 bg-teal-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl text-white">💡</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  For Innovation Teams
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Build innovation capabilities and foster transformation
                  culture
                </p>
                <div className="space-y-2 mb-6">
                  <div className="text-sm text-teal-700 font-medium">
                    2 innovation books
                  </div>
                  <div className="text-sm text-teal-700 font-medium">
                    3 expert insights
                  </div>
                  <div className="text-sm text-teal-700 font-medium">
                    Practical frameworks
                  </div>
                </div>
                <button
                  onClick={() =>
                    navigate("/marketplace/dtmi?tab=books&category=innovation")
                  }
                  className="w-full bg-teal-500 hover:bg-teal-600 text-white py-3 rounded-lg font-semibold transition-colors inline-flex items-center justify-center gap-2"
                >
                  Start Path
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </section>
        {/* 5. Featured Authors */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
                  Featured Authors
                </h2>
                <p className="text-xl text-gray-600">
                  Learn from recognized leaders in digital transformation
                </p>
              </div>

              <div className="grid lg:grid-cols-2 gap-16 items-center">
                {/* Author Image */}
                <div className="text-center lg:text-left">
                  <div className="relative inline-block">
                    <div className="w-80 h-80 mx-auto lg:mx-0 rounded-2xl overflow-hidden shadow-2xl">
                      <img
                        src={authorInfo.avatar}
                        alt={authorInfo.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {/* Floating Stats */}
                    <div className="absolute -top-4 -right-4 bg-white rounded-xl p-4 shadow-lg">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary-500">
                          {authorInfo.bookCount}
                        </div>
                        <div className="text-sm text-gray-600">Books</div>
                      </div>
                    </div>
                    <div className="absolute -bottom-4 -left-4 bg-white rounded-xl p-4 shadow-lg">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary-500">
                          {(authorInfo.followerCount / 1000).toFixed(0)}K+
                        </div>
                        <div className="text-sm text-gray-600">Followers</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Author Info */}
                <div className="space-y-8">
                  <div>
                    <h3 className="text-3xl font-bold text-gray-900 mb-4">
                      {authorInfo.name}
                    </h3>
                    <p className="text-lg text-gray-600 leading-relaxed mb-8">
                      {authorInfo.bio}
                    </p>
                  </div>

                  {/* Credentials */}
                  <div className="space-y-4">
                    {authorInfo.credentials.map((credential, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center flex-shrink-0">
                          <Check className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-gray-700">{credential}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <div className="pt-4">
                    <button
                      onClick={() => navigate("/author/stephane-niango")}
                      className="bg-primary-500 hover:bg-primary-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 inline-flex items-center gap-2"
                    >
                      View All Books by {authorInfo.name.split(" ")[1]}
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 6. Beyond Books - Insights, Research & Signals */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
                Beyond Books
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Explore insights, research, and signals shaping the future of
                digital transformation
              </p>
            </div>

            {/* Content Types Grid */}
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="bg-white border border-gray-200 rounded-xl p-8 hover:shadow-lg transition-all duration-300 group">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                  Insights
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Practical analysis and strategic thinking on current
                  transformation challenges
                </p>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-sm text-gray-600">
                      Strategic frameworks
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-sm text-gray-600">Case studies</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-sm text-gray-600">
                      Expert perspectives
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => navigate("/insights")}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors inline-flex items-center gap-2"
                >
                  Explore Insights
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-8 hover:shadow-lg transition-all duration-300 group">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-purple-600 transition-colors">
                  Research
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Evidence-based studies and comprehensive analysis for informed
                  decision-making
                </p>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span className="text-sm text-gray-600">
                      Market studies
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span className="text-sm text-gray-600">
                      Industry reports
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span className="text-sm text-gray-600">Data analysis</span>
                  </div>
                </div>
                <button
                  onClick={() => navigate("/research")}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors inline-flex items-center gap-2"
                >
                  Explore Research
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-8 hover:shadow-lg transition-all duration-300 group">
                <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-teal-600 transition-colors">
                  Signals
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Emerging trends and strategic shifts that will shape the
                  future of business
                </p>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                    <span className="text-sm text-gray-600">
                      Trend analysis
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                    <span className="text-sm text-gray-600">
                      Future scenarios
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                    <span className="text-sm text-gray-600">
                      Strategic implications
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => navigate("/signals")}
                  className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors inline-flex items-center gap-2"
                >
                  See Signals
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </section>
        {/* 7. How to Use This Library */}
        <section className="py-20 bg-gradient-to-br from-brand-navy to-blue-900 text-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                How to Use This Library
              </h2>
              <p className="text-xl text-blue-100 max-w-3xl mx-auto">
                Three pathways to accelerate your digital transformation
                knowledge
              </p>
            </div>

            {/* Usage Pathways */}
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:border-white/40 transition-all duration-300 hover:scale-105">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <BookOpen className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Discover Books</h3>
                  <p className="text-blue-200">
                    In-depth frameworks and playbooks
                  </p>
                </div>

                <ul className="space-y-4 mb-8">
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary-400 flex-shrink-0 mt-0.5" />
                    <span className="text-blue-100">
                      Comprehensive transformation guides
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary-400 flex-shrink-0 mt-0.5" />
                    <span className="text-blue-100">
                      Strategic frameworks & methodologies
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary-400 flex-shrink-0 mt-0.5" />
                    <span className="text-blue-100">Expert perspectives</span>
                  </li>
                </ul>

                <button
                  onClick={() => navigate("/marketplace/dtmi?tab=books")}
                  className="w-full py-4 rounded-lg font-semibold text-lg transition-all duration-200 bg-white/20 hover:bg-white/30 text-white border border-white/30"
                >
                  Browse Books
                </button>
              </div>

              <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-8 border-2 border-primary-400 ring-2 ring-primary-400/50 transition-all duration-300 hover:scale-105">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-primary-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                    Most Dynamic
                  </span>
                </div>

                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-primary-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Star className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Explore Research</h3>
                  <p className="text-blue-200">
                    Evidence-backed thinking & analysis
                  </p>
                </div>

                <ul className="space-y-4 mb-8">
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary-400 flex-shrink-0 mt-0.5" />
                    <span className="text-blue-100">
                      Latest market studies & reports
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary-400 flex-shrink-0 mt-0.5" />
                    <span className="text-blue-100">
                      Data-driven insights & analysis
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary-400 flex-shrink-0 mt-0.5" />
                    <span className="text-blue-100">
                      Strategic intelligence
                    </span>
                  </li>
                </ul>

                <button
                  onClick={() =>
                    navigate("/marketplace/dtmi?tab=deep-analysis")
                  }
                  className="w-full py-4 rounded-lg font-semibold text-lg transition-all duration-200 bg-primary-500 hover:bg-primary-600 text-white shadow-lg hover:shadow-xl"
                >
                  Explore Research
                </button>
              </div>

              <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:border-white/40 transition-all duration-300 hover:scale-105">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Award className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Track Signals</h3>
                  <p className="text-blue-200">
                    Emerging trends & strategic shifts
                  </p>
                </div>

                <ul className="space-y-4 mb-8">
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary-400 flex-shrink-0 mt-0.5" />
                    <span className="text-blue-100">
                      Early trend indicators & alerts
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary-400 flex-shrink-0 mt-0.5" />
                    <span className="text-blue-100">
                      Future scenario planning
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary-400 flex-shrink-0 mt-0.5" />
                    <span className="text-blue-100">
                      Strategic implications
                    </span>
                  </li>
                </ul>

                <button
                  onClick={() => navigate("/marketplace/dtmi?tab=signals")}
                  className="w-full py-4 rounded-lg font-semibold text-lg transition-all duration-200 bg-white/20 hover:bg-white/30 text-white border border-white/30"
                >
                  See Signals
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* 8. Testimonials & What Industry Leaders Say */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
                What Industry Leaders Say
              </h2>
              <p className="text-xl text-gray-600">
                Trusted by executives and thought leaders worldwide
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  {/* Quote Icon */}
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-6">
                    <svg
                      className="w-6 h-6 text-primary-500"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                  </div>

                  {/* Rating */}
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>

                  {/* Content */}
                  <p className="text-gray-700 mb-6 italic leading-relaxed">
                    "{testimonial.content}"
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center">
                      <span className="text-sm font-semibold text-gray-600">
                        {testimonial.author
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">
                        {testimonial.author}
                      </p>
                      <p className="text-sm text-gray-600">
                        {testimonial.title}, {testimonial.company}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        {/* 9. Newsletter Signup Section */}
        <section className="py-20 bg-brand-navy text-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                Join Our Digital Transformation Community
              </h2>
              <p className="text-xl text-blue-100 mb-12">
                Stay updated with the latest insights, book releases, and
                exclusive content from digital transformation experts
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
                  className="flex-1 px-6 py-4 rounded-lg text-gray-900 focus:ring-2 focus:ring-primary-500 focus:outline-none text-lg"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-primary-500 hover:bg-primary-600 px-8 py-4 rounded-lg font-semibold text-lg transition-colors disabled:opacity-50 whitespace-nowrap"
                >
                  {isSubmitting ? "Joining..." : "Join Community"}
                </button>
              </form>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <button
                  onClick={() => navigate("/marketplace/dtmi?tab=books")}
                  className="border-2 border-white text-white hover:bg-white hover:text-brand-navy px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200"
                >
                  Start Exploring the Library
                </button>
              </div>

              <p className="text-sm text-blue-200">
                Join thousands of digital transformation leaders. No spam,
                unsubscribe anytime.
              </p>
            </div>
          </div>
        </section>

        {/* 10. Cross-promotion Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
                Explore More Resources
              </h2>
              <p className="text-xl text-gray-600">
                Expand your knowledge with our comprehensive digital
                transformation resources
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
              <div className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 group">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                  Insights
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Expert perspectives and actionable intelligence on digital
                  transformation trends and best practices
                </p>
                <button
                  onClick={() => navigate("/insights")}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors inline-flex items-center gap-2"
                >
                  Explore Insights
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 group">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-purple-600 transition-colors">
                  Research
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Comprehensive research reports and strategic analysis for
                  informed decision-making in digital transformation
                </p>
                <button
                  onClick={() => navigate("/research")}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors inline-flex items-center gap-2"
                >
                  Explore Research
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 group">
                <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-teal-600 transition-colors">
                  Signals
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Early indicators and trend alerts to help you stay ahead of
                  the curve in digital innovation
                </p>
                <button
                  onClick={() => navigate("/signals")}
                  className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors inline-flex items-center gap-2"
                >
                  Explore Signals
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 group">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-indigo-600 transition-colors">
                  DTMI Marketplace
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Browse books alongside other digital transformation resources
                  in our comprehensive marketplace
                </p>
                <button
                  onClick={() => navigate("/marketplace/dtmi?tab=books")}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors inline-flex items-center gap-2"
                >
                  Browse Marketplace
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Additional CSS for scrollbar hiding */}
        <style jsx>{`
          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
          .line-clamp-2 {
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
          .line-clamp-3 {
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
        `}</style>
      </main>

      <Footer />
      <ModernDQChatbot />
    </div>
  );
};

export default BooksLandingPage;
