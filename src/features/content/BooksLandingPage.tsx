import { Header } from "../../shared/Header/Header";
import { Footer } from "../../shared/Footer/Footer";
import { useNavigate } from "react-router-dom";
import ModernDQChatbot from "../../shared/ModernDQChatbot";
import { useState, useEffect } from "react";
import {
  Star,
  Search,
  CheckCircle,
  FileText,
  Target,
  Bookmark,
  Heart,
  TrendingUp,
  Award,
  Filter,
  X,
  Sliders,
  GitCompare,
  Compass,
  ClipboardCheck,
  Lightbulb,
  ArrowRight,
  User,
  BookmarkPlus,
  BarChart3,
  Tags,
  Zap,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Clock,
  Quote,
  Users,
} from "lucide-react";

const BooksLandingPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);

  // Smart Discovery filters state
  const [selectedTopic, setSelectedTopic] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [aiRelevance, setAiRelevance] = useState(5);
  const [strategicDepth, setStrategicDepth] = useState(5);
  const [practicalApplicability, setPracticalApplicability] = useState(5);
  const [discoverySearchQuery, setDiscoverySearchQuery] = useState("");
  const [selectedBooks, setSelectedBooks] = useState<string[]>([]);

  // Testimonials carousel state
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  // Testimonials data
  const testimonials = [
    {
      id: 1,
      quote:
        "DTMI Books helped me identify the most relevant AI strategy books for our leadership team — no more sifting through endless recommendations.",
      name: "Alex Mwangi",
      role: "Head of Digital Transformation",
      initials: "AM",
      color: "from-blue-500 to-blue-600",
      badge: "Verified Professional",
      badgeIcon: "verified",
    },
    {
      id: 2,
      quote:
        "The multi-dimensional reviews and insights are unmatched. It's like having a research team curate your reading list.",
      name: "Priya Sharma",
      role: "Innovation Strategist",
      initials: "PS",
      color: "from-green-500 to-green-600",
      badge: "Top 5 books saved this month",
      badgeIcon: "award",
    },
    {
      id: 3,
      quote:
        "The personalized recommendations align perfectly with my role and learning goals. I've saved over 20 books already.",
      name: "Michael Kimani",
      role: "Product Manager",
      initials: "MK",
      color: "from-purple-500 to-purple-600",
      badge: "20+ books shortlisted",
      badgeIcon: "bookmark",
    },
    {
      id: 4,
      quote:
        "Finally, a platform that understands the nuance between different digital transformation approaches. The DTMI scores are incredibly helpful.",
      name: "Sarah Chen",
      role: "Chief Technology Officer",
      initials: "SC",
      color: "from-indigo-500 to-indigo-600",
      badge: "5-star platform rating",
      badgeIcon: "star",
    },
    {
      id: 5,
      quote:
        "The AI-powered recommendations have introduced me to books I never would have discovered. My team's transformation knowledge has accelerated significantly.",
      name: "Robert Johnson",
      role: "VP of Digital Strategy",
      initials: "RJ",
      color: "from-teal-500 to-teal-600",
      badge: "Team leader • 15+ members",
      badgeIcon: "users",
    },
    {
      id: 6,
      quote:
        "As a researcher, I appreciate the structured approach to book evaluation. The insights go far beyond typical book reviews.",
      name: "Dr. Lisa Wang",
      role: "Digital Economy Researcher",
      initials: "LW",
      color: "from-rose-500 to-rose-600",
      badge: "Academic • Published researcher",
      badgeIcon: "file",
    },
  ];

  // Auto-advance carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length,
    );
  };

  // Smart search suggestions
  const smartSuggestions = [
    "AI for business leaders",
    "Platform strategy",
    "Digital transformation case studies",
    "Organizational change",
  ];

  // Handle keyboard navigation for suggestions
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedSuggestionIndex((prev) =>
          prev < smartSuggestions.length - 1 ? prev + 1 : prev,
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedSuggestionIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;
      case "Enter":
        if (selectedSuggestionIndex >= 0) {
          e.preventDefault();
          const suggestion = smartSuggestions[selectedSuggestionIndex];
          setSearchQuery(suggestion);
          setShowSuggestions(false);
          navigate(
            `/marketplace/dtmi?tab=books&search=${encodeURIComponent(suggestion)}`,
          );
        }
        break;
      case "Escape":
        setShowSuggestions(false);
        setSelectedSuggestionIndex(-1);
        break;
    }
  };

  useEffect(() => {
    setIsLoaded(true);
  }, []);

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
    <div className="flex flex-col w-full min-h-screen bg-gray-50">
      <style jsx>{`
        .slider-orange::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #f97316;
          cursor: pointer;
          border: 2px solid #fff;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }
        .slider-orange::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #f97316;
          cursor: pointer;
          border: 2px solid #fff;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }
      `}</style>
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
                className="text-4xl md:text-5xl lg:text-6xl font-bold font-display mb-6 leading-tight"
                style={{
                  opacity: isLoaded ? 1 : 0,
                  transform: isLoaded ? "translateY(0)" : "translateY(30px)",
                  transition:
                    "opacity 0.8s ease-out 0.2s, transform 0.8s ease-out 0.2s",
                }}
              >
                Discover the Books That Define the Digital Economy, AI, and
                Transformation
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
                A curated intelligence layer to help you find, evaluate, and
                shortlist the most relevant books for strategy, learning, and
                real-world transformation.
              </p>

              {/* Smart Search Bar */}
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
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 z-10" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => {
                      setShowSuggestions(true);
                      setSelectedSuggestionIndex(-1);
                    }}
                    onBlur={() =>
                      setTimeout(() => setShowSuggestions(false), 200)
                    }
                    onKeyDown={handleKeyDown}
                    placeholder="Search books, authors, topics, or themes (e.g., AI strategy, platform business, digital transformation)"
                    className="w-full pl-12 pr-4 py-4 text-gray-900 bg-white/95 backdrop-blur-sm rounded-lg border border-white/20 focus:ring-2 focus:ring-orange-400 focus:outline-none focus:border-orange-400 transition-all duration-300"
                  />

                  {/* Smart Suggestions Dropdown */}
                  {showSuggestions && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white/95 backdrop-blur-sm border border-white/20 rounded-lg shadow-xl z-20">
                      <div className="p-2">
                        <div className="text-xs text-gray-500 px-3 py-2 font-medium">
                          Popular searches:
                        </div>
                        {smartSuggestions.map((suggestion, index) => (
                          <button
                            key={index}
                            type="button"
                            onClick={() => {
                              setSearchQuery(suggestion);
                              setShowSuggestions(false);
                              navigate(
                                `/marketplace/dtmi?tab=books&search=${encodeURIComponent(suggestion)}`,
                              );
                            }}
                            className="w-full text-left px-3 py-2 text-gray-700 hover:bg-orange-50 hover:text-orange-600 rounded-md transition-colors duration-200 flex items-center gap-2"
                          >
                            <Search className="w-4 h-4 text-gray-400" />
                            {suggestion}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
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
                  Browse Books
                </button>
                <button
                  onClick={() => navigate("/books/shortlist")}
                  className="px-8 py-4 border-2 border-white text-white font-bold text-lg rounded-lg hover:bg-white hover:text-gray-900 transition-all duration-300"
                >
                  View My Shortlist
                </button>
              </div>
            </div>
          </div>
        </section>
        {/* D1 | DIGITAL ECONOMY ESSENTIALS */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold font-display mb-6 text-gray-900">
                Why DTMI Books?
              </h2>
              <p className="text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto">
                A curated intelligence layer that saves time and adds
                decision-making value
              </p>
            </div>

            {/* 4 Value Pillars Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Pillar 1: Curated, Not Crowdsourced */}
              <div className="group bg-white rounded-xl p-8 text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-gray-100">
                <div className="w-16 h-16 mx-auto mb-6 bg-blue-50 rounded-full flex items-center justify-center group-hover:bg-blue-100 transition-colors duration-300">
                  <CheckCircle className="w-8 h-8 text-blue-600 group-hover:scale-110 transition-transform duration-300" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Curated, Not Crowdsourced
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Every book is carefully selected for its relevance to the
                  digital economy, AI, and transformation — no noise, no
                  clutter.
                </p>
              </div>

              {/* Pillar 2: Structured, Insightful Reviews */}
              <div className="group bg-white rounded-xl p-8 text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-gray-100">
                <div className="w-16 h-16 mx-auto mb-6 bg-green-50 rounded-full flex items-center justify-center group-hover:bg-green-100 transition-colors duration-300">
                  <FileText className="w-8 h-8 text-green-600 group-hover:scale-110 transition-transform duration-300" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Structured Reviews That Matter
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Go beyond star ratings with multi-dimensional reviews covering
                  strategy, practicality, and real-world relevance.
                </p>
              </div>

              {/* Pillar 3: Built for Strategic Relevance */}
              <div className="group bg-white rounded-xl p-8 text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-gray-100">
                <div className="w-16 h-16 mx-auto mb-6 bg-orange-50 rounded-full flex items-center justify-center group-hover:bg-orange-100 transition-colors duration-300">
                  <Target className="w-8 h-8 text-orange-600 group-hover:scale-110 transition-transform duration-300" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Designed for Real-World Application
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Understand not just what a book says, but why it matters for
                  your role, decisions, and transformation priorities.
                </p>
              </div>

              {/* Pillar 4: Shortlist with Purpose */}
              <div className="group bg-white rounded-xl p-8 text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-gray-100">
                <div className="w-16 h-16 mx-auto mb-6 bg-purple-50 rounded-full flex items-center justify-center group-hover:bg-purple-100 transition-colors duration-300">
                  <Bookmark className="w-8 h-8 text-purple-600 group-hover:scale-110 transition-transform duration-300" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Shortlist with Purpose
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Save, organize, and prioritize books based on your goals,
                  themes, and learning journey.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 3. FEATURED COLLECTIONS - GUIDED DISCOVERY */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold font-display mb-4 text-gray-900">
                Explore Curated Reading Collections
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
                Start with expertly curated book groups designed around key
                themes in digital economy, AI, and transformation.
              </p>
            </div>

            {/* Collections Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Collection 1: Digital Economy Essentials */}
              <div className="group bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-blue-100">
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    Digital Economy Essentials
                  </h3>
                  <p className="text-gray-600 text-sm mb-3">
                    Foundational books that explain how digital markets,
                    platforms, and ecosystems operate.
                  </p>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-blue-600 font-medium">
                      12 books
                    </span>
                    <div className="flex items-center gap-1">
                      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                        Digital Economy
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() =>
                    navigate(
                      "/marketplace/dtmi?tab=books&collection=digital-economy",
                    )
                  }
                  className="w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors group-hover:shadow-md"
                >
                  Explore Collection
                </button>
              </div>

              {/* Collection 2: AI for Leaders */}
              <div className="group bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-orange-100">
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
                    AI for Leaders
                  </h3>
                  <p className="text-gray-600 text-sm mb-3">
                    Strategic and practical books to help leaders understand and
                    leverage artificial intelligence.
                  </p>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-orange-600 font-medium">
                      10 books
                    </span>
                    <div className="flex items-center gap-1">
                      <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full">
                        AI Leadership
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() =>
                    navigate(
                      "/marketplace/dtmi?tab=books&collection=ai-leaders",
                    )
                  }
                  className="w-full px-4 py-3 bg-orange-600 hover:bg-orange-700 text-white font-medium rounded-lg transition-colors group-hover:shadow-md"
                >
                  Explore Collection
                </button>
              </div>

              {/* Collection 3: Platform Business Strategy */}
              <div className="group bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-green-100">
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                    Platform Business Strategy
                  </h3>
                  <p className="text-gray-600 text-sm mb-3">
                    Books focused on platform models, network effects, and
                    ecosystem-driven growth.
                  </p>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-green-600 font-medium">
                      8 books
                    </span>
                    <div className="flex items-center gap-1">
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                        Platforms
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() =>
                    navigate(
                      "/marketplace/dtmi?tab=books&collection=platform-strategy",
                    )
                  }
                  className="w-full px-4 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors group-hover:shadow-md"
                >
                  Explore Collection
                </button>
              </div>

              {/* Collection 4: Digital Transformation Foundations */}
              <div className="group bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-purple-100">
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                    Digital Transformation Foundations
                  </h3>
                  <p className="text-gray-600 text-sm mb-3">
                    Core reads for understanding how organizations evolve in the
                    digital age.
                  </p>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-purple-600 font-medium">
                      15 books
                    </span>
                    <div className="flex items-center gap-1">
                      <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
                        Transformation
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() =>
                    navigate(
                      "/marketplace/dtmi?tab=books&collection=digital-transformation",
                    )
                  }
                  className="w-full px-4 py-3 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-colors group-hover:shadow-md"
                >
                  Explore Collection
                </button>
              </div>

              {/* Collection 5: Organizational Change & Leadership */}
              <div className="group bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-teal-100">
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-teal-600 transition-colors">
                    Organizational Change & Leadership
                  </h3>
                  <p className="text-gray-600 text-sm mb-3">
                    Books that address culture, leadership, and change
                    management in transformation journeys.
                  </p>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-teal-600 font-medium">
                      9 books
                    </span>
                    <div className="flex items-center gap-1">
                      <span className="text-xs bg-teal-100 text-teal-700 px-2 py-1 rounded-full">
                        Leadership
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() =>
                    navigate(
                      "/marketplace/dtmi?tab=books&collection=organizational-change",
                    )
                  }
                  className="w-full px-4 py-3 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-lg transition-colors group-hover:shadow-md"
                >
                  Explore Collection
                </button>
              </div>

              {/* Collection 6: Building Digital Cognitive Organizations */}
              <div className="group bg-gradient-to-br from-rose-50 to-pink-50 rounded-xl p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-rose-100">
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-rose-600 transition-colors">
                    Building Digital Cognitive Organizations
                  </h3>
                  <p className="text-gray-600 text-sm mb-3">
                    Advanced thinking on integrating AI, data, and human
                    intelligence within organizations.
                  </p>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-rose-600 font-medium">
                      7 books
                    </span>
                    <div className="flex items-center gap-1">
                      <span className="text-xs bg-rose-100 text-rose-700 px-2 py-1 rounded-full">
                        DCO
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() =>
                    navigate(
                      "/marketplace/dtmi?tab=books&collection=digital-cognitive",
                    )
                  }
                  className="w-full px-4 py-3 bg-rose-600 hover:bg-rose-700 text-white font-medium rounded-lg transition-colors group-hover:shadow-md"
                >
                  Explore Collection
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* 4. FEATURED BOOKS & EDITORIAL PICKS */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold font-display mb-4 text-gray-900">
                Featured Books & Editorial Picks
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
                A curated selection of high-impact books, evaluated for their
                relevance to digital economy, AI, and transformation.
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex justify-center mb-8">
              <div className="flex bg-white rounded-lg p-1 shadow-sm border border-gray-200">
                <button className="px-6 py-2 bg-orange-500 text-white rounded-md font-medium text-sm transition-colors">
                  Editor's Picks
                </button>
                <button className="px-6 py-2 text-gray-600 hover:text-gray-900 rounded-md font-medium text-sm transition-colors">
                  Trending
                </button>
                <button className="px-6 py-2 text-gray-600 hover:text-gray-900 rounded-md font-medium text-sm transition-colors">
                  Most Shortlisted
                </button>
                <button className="px-6 py-2 text-gray-600 hover:text-gray-900 rounded-md font-medium text-sm transition-colors">
                  New Additions
                </button>
              </div>
            </div>

            {/* Featured Books Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Book 1: Platform Revolution */}
              <div className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-100">
                <div className="aspect-[3/4] bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden rounded-t-xl">
                  <img
                    src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                    alt="Platform Revolution"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src =
                        "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjI2NyIgdmlld0JveD0iMCAwIDIwMCAyNjciIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjY3IiBmaWxsPSIjMTA5OTZFIi8+Cjx0ZXh0IHg9IjEwMCIgeT0iMTMzIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iNDAiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIj7wn5OyPC90ZXh0Pgo8L3N2Zz4K";
                    }}
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-orange-600 transition-colors">
                    Platform Revolution
                  </h3>
                  <p className="text-gray-600 text-sm mb-3">
                    Parker, Van Alstyne & Choudary
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mb-3">
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                      Platforms
                    </span>
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                      Strategy
                    </span>
                    <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
                      Digital Economy
                    </span>
                  </div>

                  {/* DTMI Score */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-700">
                        DTMI Score:
                      </span>
                      <span className="text-lg font-bold text-orange-600">
                        8.9
                      </span>
                      <span className="text-sm text-gray-500">/ 10</span>
                    </div>
                    <Award className="w-4 h-4 text-orange-500" />
                  </div>

                  {/* Insight Snippet */}
                  <p className="text-sm text-gray-700 mb-4 line-clamp-2 group-hover:line-clamp-none transition-all duration-300">
                    Explains how platform-based business models reshape
                    industries through network effects and ecosystem design.
                  </p>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <button className="flex-1 px-3 py-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium rounded-lg transition-colors">
                      View Details
                    </button>
                    <button className="p-2 border border-gray-200 hover:border-orange-300 hover:bg-orange-50 rounded-lg transition-colors group/save">
                      <Heart className="w-4 h-4 text-gray-400 group-hover/save:text-orange-500 transition-colors" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Book 2: Competing in the Age of AI */}
              <div className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-100">
                <div className="aspect-[3/4] bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden rounded-t-xl">
                  <img
                    src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                    alt="Competing in the Age of AI"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src =
                        "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjI2NyIgdmlld0JveD0iMCAwIDIwMCAyNjciIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjY3IiBmaWxsPSIjRjM5NTAwIi8+Cjx0ZXh0IHg9IjEwMCIgeT0iMTMzIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iNDAiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIj7wn5OyPC90ZXh0Pgo8L3N2Zz4K";
                    }}
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-orange-600 transition-colors">
                    Competing in the Age of AI
                  </h3>
                  <p className="text-gray-600 text-sm mb-3">
                    Marco Iansiti & Karim Lakhani
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mb-3">
                    <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full">
                      AI
                    </span>
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                      Strategy
                    </span>
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                      Organizations
                    </span>
                  </div>

                  {/* DTMI Score */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-700">
                        DTMI Score:
                      </span>
                      <span className="text-lg font-bold text-orange-600">
                        9.1
                      </span>
                      <span className="text-sm text-gray-500">/ 10</span>
                    </div>
                    <TrendingUp className="w-4 h-4 text-green-500" />
                  </div>

                  {/* Insight Snippet */}
                  <p className="text-sm text-gray-700 mb-4 line-clamp-2 group-hover:line-clamp-none transition-all duration-300">
                    Demonstrates how AI transforms operating models,
                    decision-making, and organizational structures.
                  </p>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <button className="flex-1 px-3 py-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium rounded-lg transition-colors">
                      View Details
                    </button>
                    <button className="p-2 border border-gray-200 hover:border-orange-300 hover:bg-orange-50 rounded-lg transition-colors group/save">
                      <Heart className="w-4 h-4 text-gray-400 group-hover/save:text-orange-500 transition-colors" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Book 3: The Digital Transformation Playbook */}
              <div className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-100">
                <div className="aspect-[3/4] bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden rounded-t-xl">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                    alt="The Digital Transformation Playbook"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src =
                        "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjI2NyIgdmlld0JveD0iMCAwIDIwMCAyNjciIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjY3IiBmaWxsPSIjMTA5OTZFIi8+Cjx0ZXh0IHg9IjEwMCIgeT0iMTMzIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iNDAiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIj7wn5OyPC90ZXh0Pgo8L3N2Zz4K";
                    }}
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-orange-600 transition-colors">
                    The Digital Transformation Playbook
                  </h3>
                  <p className="text-gray-600 text-sm mb-3">David L. Rogers</p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mb-3">
                    <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
                      Transformation
                    </span>
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                      Strategy
                    </span>
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                      Leadership
                    </span>
                  </div>

                  {/* DTMI Score */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-700">
                        DTMI Score:
                      </span>
                      <span className="text-lg font-bold text-orange-600">
                        8.5
                      </span>
                      <span className="text-sm text-gray-500">/ 10</span>
                    </div>
                    <Award className="w-4 h-4 text-blue-500" />
                  </div>

                  {/* Insight Snippet */}
                  <p className="text-sm text-gray-700 mb-4 line-clamp-2 group-hover:line-clamp-none transition-all duration-300">
                    Provides a structured framework for rethinking business
                    models in a digital-first world.
                  </p>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <button className="flex-1 px-3 py-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium rounded-lg transition-colors">
                      View Details
                    </button>
                    <button className="p-2 border border-gray-200 hover:border-orange-300 hover:bg-orange-50 rounded-lg transition-colors group/save">
                      <Heart className="w-4 h-4 text-gray-400 group-hover/save:text-orange-500 transition-colors" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Book 4: Prediction Machines */}
              <div className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-100">
                <div className="aspect-[3/4] bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden rounded-t-xl">
                  <img
                    src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                    alt="Prediction Machines"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src =
                        "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjI2NyIgdmlld0JveD0iMCAwIDIwMCAyNjciIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjY3IiBmaWxsPSIjRjM5NTAwIi8+Cjx0ZXh0IHg9IjEwMCIgeT0iMTMzIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iNDAiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIj7wn5OyPC90ZXh0Pgo8L3N2Zz4K";
                    }}
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-orange-600 transition-colors">
                    Prediction Machines
                  </h3>
                  <p className="text-gray-600 text-sm mb-3">
                    Ajay Agrawal, Joshua Gans & Avi Goldfarb
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mb-3">
                    <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full">
                      AI
                    </span>
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                      Economics
                    </span>
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                      Decision-Making
                    </span>
                  </div>

                  {/* DTMI Score */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-700">
                        DTMI Score:
                      </span>
                      <span className="text-lg font-bold text-orange-600">
                        8.8
                      </span>
                      <span className="text-sm text-gray-500">/ 10</span>
                    </div>
                    <TrendingUp className="w-4 h-4 text-orange-500" />
                  </div>

                  {/* Insight Snippet */}
                  <p className="text-sm text-gray-700 mb-4 line-clamp-2 group-hover:line-clamp-none transition-all duration-300">
                    Breaks down AI as a prediction tool and its impact on
                    business decisions and value chains.
                  </p>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <button className="flex-1 px-3 py-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium rounded-lg transition-colors">
                      View Details
                    </button>
                    <button className="p-2 border border-gray-200 hover:border-orange-300 hover:bg-orange-50 rounded-lg transition-colors group/save">
                      <Heart className="w-4 h-4 text-gray-400 group-hover/save:text-orange-500 transition-colors" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* View More Button */}
            <div className="text-center mt-8">
              <button
                onClick={() => navigate("/marketplace/dtmi?tab=books")}
                className="px-8 py-3 border-2 border-orange-500 text-orange-600 hover:bg-orange-500 hover:text-white font-medium rounded-lg transition-colors"
              >
                View All Featured Books
              </button>
            </div>
          </div>
        </section>

        {/* 5. SMART DISCOVERY - FILTERS + INTENT-BASED NAVIGATION */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold font-display mb-4 text-gray-900">
                Find Books That Match Your Needs
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
                Filter, explore, and discover books based on your role, goals,
                and areas of interest.
              </p>
            </div>

            {/* Quick Intent Buttons */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
                Start With a Goal
              </h3>
              <div className="flex flex-wrap justify-center gap-3">
                {[
                  {
                    label: "Understand AI Strategy",
                    topic: "Artificial Intelligence",
                    role: "Executive / Leader",
                  },
                  {
                    label: "Lead Digital Transformation",
                    topic: "Digital Transformation",
                    role: "Transformation Lead",
                  },
                  {
                    label: "Learn Platform Business Models",
                    topic: "Platform Business",
                    role: "Product Manager",
                  },
                  {
                    label: "Improve Organizational Design",
                    topic: "Organizational Design",
                    role: "Executive / Leader",
                  },
                  {
                    label: "Explore Future of Work",
                    topic: "Future of Work",
                    role: "Executive / Leader",
                  },
                ].map((intent, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setSelectedTopic(intent.topic);
                      setSelectedRole(intent.role);
                    }}
                    className="px-4 py-2 bg-gray-100 hover:bg-orange-100 hover:text-orange-700 text-gray-700 rounded-full text-sm font-medium transition-colors border hover:border-orange-200"
                  >
                    {intent.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Search + Filter Combination */}
            <div className="mb-8">
              <div className="max-w-2xl mx-auto relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={discoverySearchQuery}
                  onChange={(e) => setDiscoverySearchQuery(e.target.value)}
                  placeholder="Search books, authors, or topics..."
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-colors"
                />
              </div>
            </div>

            {/* Two-Part Layout: Filters + Results */}
            <div className="grid lg:grid-cols-4 gap-8">
              {/* Left Side - Filters Panel */}
              <div className="lg:col-span-1">
                <div className="bg-gray-50 rounded-xl p-6 sticky top-4">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                      <Filter className="w-5 h-5" />
                      Filters
                    </h3>
                    <button
                      onClick={() => {
                        setSelectedTopic("");
                        setSelectedRole("");
                        setSelectedLevel("");
                        setSelectedType("");
                        setAiRelevance(5);
                        setStrategicDepth(5);
                        setPracticalApplicability(5);
                        setDiscoverySearchQuery("");
                      }}
                      className="text-sm text-orange-600 hover:text-orange-700 font-medium"
                    >
                      Clear All
                    </button>
                  </div>

                  {/* Active Filters Tags */}
                  {(selectedTopic ||
                    selectedRole ||
                    selectedLevel ||
                    selectedType ||
                    discoverySearchQuery) && (
                    <div className="mb-6">
                      <div className="flex flex-wrap gap-2">
                        {selectedTopic && (
                          <span className="inline-flex items-center gap-1 px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm">
                            {selectedTopic}
                            <X
                              className="w-3 h-3 cursor-pointer"
                              onClick={() => setSelectedTopic("")}
                            />
                          </span>
                        )}
                        {selectedRole && (
                          <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                            {selectedRole}
                            <X
                              className="w-3 h-3 cursor-pointer"
                              onClick={() => setSelectedRole("")}
                            />
                          </span>
                        )}
                        {selectedLevel && (
                          <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                            {selectedLevel}
                            <X
                              className="w-3 h-3 cursor-pointer"
                              onClick={() => setSelectedLevel("")}
                            />
                          </span>
                        )}
                        {selectedType && (
                          <span className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
                            {selectedType}
                            <X
                              className="w-3 h-3 cursor-pointer"
                              onClick={() => setSelectedType("")}
                            />
                          </span>
                        )}
                        {discoverySearchQuery && (
                          <span className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                            "{discoverySearchQuery}"
                            <X
                              className="w-3 h-3 cursor-pointer"
                              onClick={() => setDiscoverySearchQuery("")}
                            />
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Topic Filter */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Topic / Theme
                    </label>
                    <select
                      value={selectedTopic}
                      onChange={(e) => setSelectedTopic(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
                    >
                      <option value="">All Topics</option>
                      <option value="Digital Economy">Digital Economy</option>
                      <option value="Artificial Intelligence">
                        Artificial Intelligence
                      </option>
                      <option value="Platform Business">
                        Platform Business
                      </option>
                      <option value="Digital Transformation">
                        Digital Transformation
                      </option>
                      <option value="Organizational Design">
                        Organizational Design
                      </option>
                      <option value="Future of Work">Future of Work</option>
                    </select>
                  </div>

                  {/* Role Filter */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Role-Based Filter
                    </label>
                    <select
                      value={selectedRole}
                      onChange={(e) => setSelectedRole(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
                    >
                      <option value="">All Roles</option>
                      <option value="Executive / Leader">
                        Executive / Leader
                      </option>
                      <option value="Product Manager">Product Manager</option>
                      <option value="Architect / Engineer">
                        Architect / Engineer
                      </option>
                      <option value="Transformation Lead">
                        Transformation Lead
                      </option>
                      <option value="Researcher">Researcher</option>
                      <option value="Student">Student</option>
                    </select>
                  </div>

                  {/* Reading Level */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Reading Level
                    </label>
                    <select
                      value={selectedLevel}
                      onChange={(e) => setSelectedLevel(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
                    >
                      <option value="">All Levels</option>
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                    </select>
                  </div>

                  {/* Book Type */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Book Type
                    </label>
                    <select
                      value={selectedType}
                      onChange={(e) => setSelectedType(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
                    >
                      <option value="">All Types</option>
                      <option value="Strategy">Strategy</option>
                      <option value="Practical / Implementation">
                        Practical / Implementation
                      </option>
                      <option value="Technical">Technical</option>
                      <option value="Leadership">Leadership</option>
                      <option value="Economics">Economics</option>
                      <option value="Policy / Governance">
                        Policy / Governance
                      </option>
                    </select>
                  </div>

                  {/* Relevance Sliders */}
                  <div className="border-t border-gray-200 pt-6">
                    <h4 className="text-sm font-medium text-gray-700 mb-4 flex items-center gap-2">
                      <Sliders className="w-4 h-4" />
                      Relevance Priorities
                    </h4>

                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <label className="text-sm text-gray-600">
                            AI Relevance
                          </label>
                          <span className="text-sm font-medium text-gray-900">
                            {aiRelevance}/10
                          </span>
                        </div>
                        <input
                          type="range"
                          min="1"
                          max="10"
                          value={aiRelevance}
                          onChange={(e) =>
                            setAiRelevance(parseInt(e.target.value))
                          }
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-orange"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <label className="text-sm text-gray-600">
                            Strategic Depth
                          </label>
                          <span className="text-sm font-medium text-gray-900">
                            {strategicDepth}/10
                          </span>
                        </div>
                        <input
                          type="range"
                          min="1"
                          max="10"
                          value={strategicDepth}
                          onChange={(e) =>
                            setStrategicDepth(parseInt(e.target.value))
                          }
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-orange"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <label className="text-sm text-gray-600">
                            Practical Applicability
                          </label>
                          <span className="text-sm font-medium text-gray-900">
                            {practicalApplicability}/10
                          </span>
                        </div>
                        <input
                          type="range"
                          min="1"
                          max="10"
                          value={practicalApplicability}
                          onChange={(e) =>
                            setPracticalApplicability(parseInt(e.target.value))
                          }
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-orange"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side - Dynamic Results */}
              <div className="lg:col-span-3">
                {/* Results Header */}
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Recommended Books
                      <span className="text-sm font-normal text-gray-500 ml-2">
                        (8 results)
                      </span>
                    </h3>
                  </div>
                  <div className="flex items-center gap-3">
                    {selectedBooks.length > 0 && (
                      <button className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-sm font-medium transition-colors">
                        <GitCompare className="w-4 h-4" />
                        Compare ({selectedBooks.length})
                      </button>
                    )}
                    <select className="p-2 border border-gray-300 rounded-lg text-sm">
                      <option>Sort by DTMI Score</option>
                      <option>Sort by Relevance</option>
                      <option>Sort by Publication Date</option>
                    </select>
                  </div>
                </div>

                {/* Dynamic Book Results Grid */}
                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {/* Sample filtered results - these would be dynamically generated */}
                  {[
                    {
                      title: "Platform Revolution",
                      author: "Parker, Van Alstyne & Choudary",
                      tags: ["Platforms", "Strategy", "Digital Economy"],
                      score: 8.9,
                      insight:
                        "Explains how platform-based business models reshape industries through network effects.",
                      image:
                        "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
                      id: "platform-revolution",
                    },
                    {
                      title: "Competing in the Age of AI",
                      author: "Marco Iansiti & Karim Lakhani",
                      tags: ["AI", "Strategy", "Organizations"],
                      score: 9.1,
                      insight:
                        "Demonstrates how AI transforms operating models and organizational structures.",
                      image:
                        "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
                      id: "competing-ai",
                    },
                    {
                      title: "The Digital Transformation Playbook",
                      author: "David L. Rogers",
                      tags: ["Transformation", "Strategy", "Leadership"],
                      score: 8.5,
                      insight:
                        "Provides a structured framework for rethinking business models in digital-first world.",
                      image:
                        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
                      id: "digital-playbook",
                    },
                    {
                      title: "Prediction Machines",
                      author: "Ajay Agrawal, Joshua Gans & Avi Goldfarb",
                      tags: ["AI", "Economics", "Decision-Making"],
                      score: 8.8,
                      insight:
                        "Breaks down AI as a prediction tool and its impact on business decisions.",
                      image:
                        "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
                      id: "prediction-machines",
                    },
                    {
                      title: "The Network Society",
                      author: "Jan van Dijk",
                      tags: ["Networks", "Society", "Digital Economy"],
                      score: 8.3,
                      insight:
                        "Explores how network structures reshape social and economic relationships.",
                      image:
                        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
                      id: "network-society",
                    },
                    {
                      title: "Leading Digital",
                      author: "George Westerman",
                      tags: ["Leadership", "Transformation", "Strategy"],
                      score: 8.6,
                      insight:
                        "Highlights Digital Masters and provides roadmap for transformation success.",
                      image:
                        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
                      id: "leading-digital",
                    },
                  ].map((book, index) => (
                    <div
                      key={index}
                      className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-100"
                    >
                      <div className="aspect-[4/3] bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden rounded-t-xl relative">
                        <img
                          src={book.image}
                          alt={book.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src =
                              "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDIwMCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMTUwIiBmaWxsPSIjRjM5NTAwIi8+Cjx0ZXh0IHg9IjEwMCIgeT0iNzUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIzMCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGRvbWluYW50LWJhc2VsaW5lPSJtaWRkbGUiPvCfk7I8L3RleHQ+Cjwvc3ZnPgo=";
                          }}
                        />
                        {/* Compare checkbox */}
                        <div className="absolute top-3 right-3">
                          <input
                            type="checkbox"
                            checked={selectedBooks.includes(book.id)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedBooks([...selectedBooks, book.id]);
                              } else {
                                setSelectedBooks(
                                  selectedBooks.filter((id) => id !== book.id),
                                );
                              }
                            }}
                            className="w-4 h-4 text-orange-600 bg-white border-gray-300 rounded focus:ring-orange-500"
                          />
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="text-base font-bold text-gray-900 mb-1 group-hover:text-orange-600 transition-colors line-clamp-2">
                          {book.title}
                        </h3>
                        <p className="text-gray-600 text-sm mb-3">
                          {book.author}
                        </p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-1 mb-3">
                          {book.tags.map((tag, tagIndex) => (
                            <span
                              key={tagIndex}
                              className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        {/* DTMI Score */}
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-gray-700">
                              DTMI:
                            </span>
                            <span className="text-lg font-bold text-orange-600">
                              {book.score}
                            </span>
                            <span className="text-sm text-gray-500">/10</span>
                          </div>
                          <Award className="w-4 h-4 text-orange-500" />
                        </div>

                        {/* Insight */}
                        <p className="text-sm text-gray-700 mb-4 line-clamp-2">
                          {book.insight}
                        </p>

                        {/* Actions */}
                        <div className="flex items-center gap-2">
                          <button className="flex-1 px-3 py-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium rounded-lg transition-colors">
                            View Details
                          </button>
                          <button className="p-2 border border-gray-200 hover:border-orange-300 hover:bg-orange-50 rounded-lg transition-colors group/save">
                            <Heart className="w-4 h-4 text-gray-400 group-hover/save:text-orange-500 transition-colors" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Load More */}
                <div className="text-center mt-8">
                  <button className="px-6 py-3 border-2 border-gray-300 hover:border-orange-500 hover:text-orange-600 text-gray-700 font-medium rounded-lg transition-colors">
                    Load More Results
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 6. HOW IT WORKS - PROCESS CLARITY */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold font-display mb-4 text-gray-900">
                How DTMI Books Works
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
                A simple, structured approach to discovering, evaluating, and
                organizing the books that matter most.
              </p>
            </div>

            {/* 4-Step Horizontal Flow */}
            <div className="relative">
              {/* Connecting Line */}
              <div className="hidden md:block absolute top-16 left-1/2 transform -translate-x-1/2 w-3/4 h-0.5 bg-gradient-to-r from-orange-200 via-orange-300 to-orange-200"></div>

              <div className="grid md:grid-cols-4 gap-8 relative">
                {/* Step 1 - Discover */}
                <div className="group text-center hover:transform hover:-translate-y-2 transition-all duration-300">
                  <div className="relative mb-6">
                    {/* Step Number Circle */}
                    <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4 shadow-lg group-hover:shadow-xl transition-shadow">
                      1
                    </div>
                    {/* Icon Container */}
                    <div className="w-12 h-12 bg-white border-2 border-orange-100 rounded-lg flex items-center justify-center mx-auto group-hover:border-orange-300 group-hover:bg-orange-50 transition-colors">
                      <Compass className="w-6 h-6 text-orange-600 group-hover:scale-110 transition-transform" />
                    </div>
                    {/* Arrow (hidden on mobile) */}
                    <div className="hidden md:block absolute -right-8 top-8">
                      <ArrowRight className="w-6 h-6 text-orange-300" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors">
                    Discover
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Browse curated collections or explore books by topic, role,
                    or theme.
                  </p>
                </div>

                {/* Step 2 - Evaluate */}
                <div className="group text-center hover:transform hover:-translate-y-2 transition-all duration-300">
                  <div className="relative mb-6">
                    {/* Step Number Circle */}
                    <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4 shadow-lg group-hover:shadow-xl transition-shadow">
                      2
                    </div>
                    {/* Icon Container */}
                    <div className="w-12 h-12 bg-white border-2 border-orange-100 rounded-lg flex items-center justify-center mx-auto group-hover:border-orange-300 group-hover:bg-orange-50 transition-colors">
                      <ClipboardCheck className="w-6 h-6 text-orange-600 group-hover:scale-110 transition-transform" />
                    </div>
                    {/* Arrow (hidden on mobile) */}
                    <div className="hidden md:block absolute -right-8 top-8">
                      <ArrowRight className="w-6 h-6 text-orange-300" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors">
                    Evaluate
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Read structured reviews, scores, and insights to understand
                    why each book matters.
                  </p>
                </div>

                {/* Step 3 - Shortlist */}
                <div className="group text-center hover:transform hover:-translate-y-2 transition-all duration-300">
                  <div className="relative mb-6">
                    {/* Step Number Circle */}
                    <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4 shadow-lg group-hover:shadow-xl transition-shadow">
                      3
                    </div>
                    {/* Icon Container */}
                    <div className="w-12 h-12 bg-white border-2 border-orange-100 rounded-lg flex items-center justify-center mx-auto group-hover:border-orange-300 group-hover:bg-orange-50 transition-colors">
                      <Bookmark className="w-6 h-6 text-orange-600 group-hover:scale-110 transition-transform" />
                    </div>
                    {/* Arrow (hidden on mobile) */}
                    <div className="hidden md:block absolute -right-8 top-8">
                      <ArrowRight className="w-6 h-6 text-orange-300" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors">
                    Shortlist
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Save books into personalized lists based on your goals and
                    priorities.
                  </p>
                </div>

                {/* Step 4 - Learn & Apply */}
                <div className="group text-center hover:transform hover:-translate-y-2 transition-all duration-300">
                  <div className="relative mb-6">
                    {/* Step Number Circle */}
                    <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4 shadow-lg group-hover:shadow-xl transition-shadow">
                      4
                    </div>
                    {/* Icon Container */}
                    <div className="w-12 h-12 bg-white border-2 border-orange-100 rounded-lg flex items-center justify-center mx-auto group-hover:border-orange-300 group-hover:bg-orange-50 transition-colors">
                      <Lightbulb className="w-6 h-6 text-orange-600 group-hover:scale-110 transition-transform" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors">
                    Learn & Apply
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Use insights from books to inform strategy, decision-making,
                    and transformation initiatives.
                  </p>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="text-center mt-12">
              <button
                onClick={() => navigate("/marketplace/dtmi?tab=books")}
                className="px-8 py-3 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                Start Discovering Books
              </button>
            </div>
          </div>
        </section>

        {/* 7. PERSONALIZATION - CREATE YOUR PERSONAL READING INTELLIGENCE */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Side - Copy + CTA */}
              <div>
                <h2 className="text-3xl md:text-4xl font-bold font-display mb-6 text-gray-900">
                  Create Your Personal Reading Intelligence
                </h2>
                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                  Shortlist, organize, and track the books that matter most to
                  you. Let DTMI guide your learning journey.
                </p>

                {/* Features/Benefits */}
                <div className="space-y-6 mb-8">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <BookmarkPlus className="w-6 h-6 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        Personalized Shortlists
                      </h3>
                      <p className="text-gray-600">
                        Save books according to your role, goals, or topics.
                        Build reading lists that align with your transformation
                        priorities.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <BarChart3 className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        Track Your Progress
                      </h3>
                      <p className="text-gray-600">
                        Keep track of what you've read, want to read, or plan to
                        review. Monitor your learning journey over time.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Zap className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        Tailored Recommendations
                      </h3>
                      <p className="text-gray-600">
                        Get book suggestions based on your interests, reading
                        history, and transformation goals.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Tags className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        Organize by Themes
                      </h3>
                      <p className="text-gray-600">
                        Group books into collections like AI, Digital
                        Transformation, Leadership, or Strategy for easy access.
                      </p>
                    </div>
                  </div>
                </div>

                {/* CTAs */}
                <div className="space-y-4">
                  <button
                    onClick={() =>
                      navigate("/auth/signup?redirect=/books/shortlist")
                    }
                    className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-bold text-lg rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                  >
                    Create My Shortlist
                  </button>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() =>
                        navigate("/auth/signin?redirect=/books/shortlist")
                      }
                      className="text-gray-600 hover:text-orange-600 font-medium transition-colors"
                    >
                      Already have an account? Sign In
                    </button>
                  </div>
                  <p className="text-sm text-gray-500">
                    It's free, personalized, and takes less than a minute to set
                    up.
                  </p>
                </div>
              </div>

              {/* Right Side - Visual Demo */}
              <div className="relative">
                {/* Main Shortlist Interface Preview */}
                <div className="bg-gray-50 rounded-xl p-6 shadow-lg border border-gray-200">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                      <User className="w-5 h-5 text-orange-600" />
                      My Reading Lists
                    </h3>
                    <span className="text-sm text-gray-500">
                      3 lists • 12 books
                    </span>
                  </div>

                  {/* Sample Lists */}
                  <div className="space-y-4">
                    {/* AI Strategy List */}
                    <div className="bg-white rounded-lg p-4 border border-gray-100 hover:border-orange-200 transition-colors group">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                            <Zap className="w-4 h-4 text-orange-600" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900 group-hover:text-orange-600 transition-colors">
                              AI Strategy
                            </h4>
                            <p className="text-sm text-gray-500">5 books</p>
                          </div>
                        </div>
                        <div className="flex -space-x-2">
                          {[1, 2, 3].map((i) => (
                            <div
                              key={i}
                              className="w-8 h-10 bg-gradient-to-br from-blue-100 to-blue-200 rounded border-2 border-white shadow-sm"
                            ></div>
                          ))}
                          <div className="w-8 h-10 bg-gray-200 rounded border-2 border-white shadow-sm flex items-center justify-center">
                            <span className="text-xs font-medium text-gray-600">
                              +2
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full">
                          AI
                        </span>
                        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                          Strategy
                        </span>
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                          Leadership
                        </span>
                      </div>
                    </div>

                    {/* Digital Transformation List */}
                    <div className="bg-white rounded-lg p-4 border border-gray-100 hover:border-green-200 transition-colors group">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                            <Target className="w-4 h-4 text-green-600" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900 group-hover:text-green-600 transition-colors">
                              Digital Transformation
                            </h4>
                            <p className="text-sm text-gray-500">4 books</p>
                          </div>
                        </div>
                        <div className="flex -space-x-2">
                          {[1, 2, 3, 4].map((i) => (
                            <div
                              key={i}
                              className="w-8 h-10 bg-gradient-to-br from-green-100 to-green-200 rounded border-2 border-white shadow-sm"
                            ></div>
                          ))}
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                          Transformation
                        </span>
                        <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
                          Change
                        </span>
                      </div>
                    </div>

                    {/* Platform Strategy List */}
                    <div className="bg-white rounded-lg p-4 border border-gray-100 hover:border-blue-200 transition-colors group">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                            <FileText className="w-4 h-4 text-blue-600" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                              Platform Strategy
                            </h4>
                            <p className="text-sm text-gray-500">3 books</p>
                          </div>
                        </div>
                        <div className="flex -space-x-2">
                          {[1, 2, 3].map((i) => (
                            <div
                              key={i}
                              className="w-8 h-10 bg-gradient-to-br from-blue-100 to-blue-200 rounded border-2 border-white shadow-sm"
                            ></div>
                          ))}
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                          Platforms
                        </span>
                        <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full">
                          Business Models
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Add New List Button */}
                  <button className="w-full mt-4 py-3 border-2 border-dashed border-gray-300 hover:border-orange-300 hover:bg-orange-50 rounded-lg text-gray-600 hover:text-orange-600 font-medium transition-colors flex items-center justify-center gap-2">
                    <BookmarkPlus className="w-4 h-4" />
                    Create New List
                  </button>
                </div>

                {/* Floating Recommendation Card */}
                <div className="absolute -bottom-4 -right-4 bg-white rounded-lg shadow-xl border border-gray-200 p-4 max-w-xs">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="w-4 h-4 text-orange-500" />
                    <span className="text-sm font-semibold text-gray-900">
                      Recommended for you
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-10 bg-gradient-to-br from-orange-100 to-orange-200 rounded shadow-sm"></div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        Platform Revolution
                      </p>
                      <p className="text-xs text-gray-500">
                        Based on your AI Strategy list
                      </p>
                    </div>
                  </div>
                  <button className="w-full mt-3 py-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium rounded transition-colors">
                    Add to List
                  </button>
                </div>

                {/* Progress Indicator */}
                <div className="absolute -top-4 -left-4 bg-white rounded-lg shadow-lg border border-gray-200 p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <BarChart3 className="w-4 h-4 text-green-500" />
                    <span className="text-sm font-semibold text-gray-900">
                      Reading Progress
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-600">This Month</span>
                      <span className="font-medium text-gray-900">
                        3 of 5 books
                      </span>
                    </div>
                    <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="w-3/5 h-full bg-gradient-to-r from-green-400 to-green-500 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 8. SMART RECOMMENDATIONS - AI-POWERED INSIGHTS */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold font-display mb-4 text-gray-900">
                Your AI-Powered Reading Recommendations
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
                DTMI uses advanced analysis to suggest books that align with
                your role, interests, and goals.
              </p>
            </div>

            {/* Personalization Filters */}
            <div className="flex justify-center mb-8">
              <div className="flex bg-white rounded-lg p-1 shadow-sm border border-gray-200">
                <button className="px-4 py-2 bg-orange-500 text-white rounded-md font-medium text-sm transition-colors flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  For My Role
                </button>
                <button className="px-4 py-2 text-gray-600 hover:text-gray-900 rounded-md font-medium text-sm transition-colors flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  Trending
                </button>
                <button className="px-4 py-2 text-gray-600 hover:text-gray-900 rounded-md font-medium text-sm transition-colors flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  New Additions
                </button>
              </div>
            </div>

            {/* Recommendations Grid */}
            <div className="relative">
              {/* Navigation Arrows */}
              <button className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 z-10 w-10 h-10 bg-white hover:bg-gray-50 border border-gray-200 rounded-full flex items-center justify-center shadow-lg transition-colors">
                <ChevronLeft className="w-5 h-5 text-gray-600" />
              </button>
              <button className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 z-10 w-10 h-10 bg-white hover:bg-gray-50 border border-gray-200 rounded-full flex items-center justify-center shadow-lg transition-colors">
                <ChevronRight className="w-5 h-5 text-gray-600" />
              </button>

              {/* Recommendation Cards */}
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Recommendation 1: AI Strategy for Executives */}
                <div className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-100 relative overflow-hidden">
                  {/* AI Recommendation Badge */}
                  <div className="absolute top-3 right-3 z-10">
                    <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      AI Pick
                    </div>
                  </div>

                  <div className="aspect-[3/4] bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                      alt="Competing in the Age of AI"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src =
                          "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjI2NyIgdmlld0JveD0iMCAwIDIwMCAyNjciIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjY3IiBmaWxsPSIjRjM5NTAwIi8+Cjx0ZXh0IHg9IjEwMCIgeT0iMTMzIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iNDAiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIj7wn5OyPC90ZXh0Pgo8L3N2Zz4K";
                      }}
                    />
                  </div>

                  <div className="p-5">
                    <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-orange-600 transition-colors">
                      Competing in the Age of AI
                    </h3>
                    <p className="text-gray-600 text-sm mb-3">
                      Marco Iansiti & Karim Lakhani
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mb-3">
                      <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full">
                        AI
                      </span>
                      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                        Strategy
                      </span>
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                        Leadership
                      </span>
                    </div>

                    {/* DTMI Score */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-700">
                          DTMI Score:
                        </span>
                        <span className="text-lg font-bold text-orange-600">
                          9.1
                        </span>
                        <span className="text-sm text-gray-500">/ 10</span>
                      </div>
                      <Award className="w-4 h-4 text-orange-500" />
                    </div>

                    {/* Recommendation Note */}
                    <div className="bg-orange-50 border border-orange-100 rounded-lg p-3 mb-4">
                      <p className="text-sm text-orange-800 font-medium mb-1">
                        Why this book?
                      </p>
                      <p className="text-xs text-orange-700">
                        Recommended for executives focused on AI strategy and
                        digital transformation.
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                      <button className="flex-1 px-3 py-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium rounded-lg transition-colors">
                        View Details
                      </button>
                      <button className="p-2 border border-gray-200 hover:border-orange-300 hover:bg-orange-50 rounded-lg transition-colors group/save">
                        <Heart className="w-4 h-4 text-gray-400 group-hover/save:text-orange-500 transition-colors" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Recommendation 2: Platform Strategy */}
                <div className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-100 relative overflow-hidden">
                  {/* Trending Badge */}
                  <div className="absolute top-3 right-3 z-10">
                    <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      Trending
                    </div>
                  </div>

                  <div className="aspect-[3/4] bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                      alt="Platform Revolution"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src =
                          "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjI2NyIgdmlld0JveD0iMCAwIDIwMCAyNjciIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjY3IiBmaWxsPSIjMTA5OTZFIi8+Cjx0ZXh0IHg9IjEwMCIgeT0iMTMzIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iNDAiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIj7wn5OyPC90ZXh0Pgo8L3N2Zz4K";
                      }}
                    />
                  </div>

                  <div className="p-5">
                    <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-green-600 transition-colors">
                      Platform Revolution
                    </h3>
                    <p className="text-gray-600 text-sm mb-3">
                      Parker, Van Alstyne & Choudary
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mb-3">
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                        Platforms
                      </span>
                      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                        Strategy
                      </span>
                      <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
                        Business Models
                      </span>
                    </div>

                    {/* DTMI Score */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-700">
                          DTMI Score:
                        </span>
                        <span className="text-lg font-bold text-green-600">
                          8.9
                        </span>
                        <span className="text-sm text-gray-500">/ 10</span>
                      </div>
                      <TrendingUp className="w-4 h-4 text-green-500" />
                    </div>

                    {/* Recommendation Note */}
                    <div className="bg-green-50 border border-green-100 rounded-lg p-3 mb-4">
                      <p className="text-sm text-green-800 font-medium mb-1">
                        Why this book?
                      </p>
                      <p className="text-xs text-green-700">
                        Perfect for product managers exploring platform business
                        models and network effects.
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                      <button className="flex-1 px-3 py-2 bg-green-500 hover:bg-green-600 text-white text-sm font-medium rounded-lg transition-colors">
                        View Details
                      </button>
                      <button className="p-2 border border-gray-200 hover:border-green-300 hover:bg-green-50 rounded-lg transition-colors group/save">
                        <Heart className="w-4 h-4 text-gray-400 group-hover/save:text-green-500 transition-colors" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Recommendation 3: Digital Transformation */}
                <div className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-100 relative overflow-hidden">
                  {/* New Addition Badge */}
                  <div className="absolute top-3 right-3 z-10">
                    <div className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      New
                    </div>
                  </div>

                  <div className="aspect-[3/4] bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                      alt="Leading Digital"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src =
                          "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjI2NyIgdmlld0JveD0iMCAwIDIwMCAyNjciIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjY3IiBmaWxsPSIjMzMzNUZGIi8+Cjx0ZXh0IHg9IjEwMCIgeT0iMTMzIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iNDAiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIj7wn5OyPC90ZXh0Pgo8L3N2Zz4K";
                      }}
                    />
                  </div>

                  <div className="p-5">
                    <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                      Leading Digital
                    </h3>
                    <p className="text-gray-600 text-sm mb-3">
                      George Westerman et al.
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mb-3">
                      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                        Transformation
                      </span>
                      <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full">
                        Leadership
                      </span>
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                        Strategy
                      </span>
                    </div>

                    {/* DTMI Score */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-700">
                          DTMI Score:
                        </span>
                        <span className="text-lg font-bold text-blue-600">
                          8.6
                        </span>
                        <span className="text-sm text-gray-500">/ 10</span>
                      </div>
                      <Clock className="w-4 h-4 text-blue-500" />
                    </div>

                    {/* Recommendation Note */}
                    <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 mb-4">
                      <p className="text-sm text-blue-800 font-medium mb-1">
                        Why this book?
                      </p>
                      <p className="text-xs text-blue-700">
                        Essential for transformation leads building digital
                        capabilities and leadership skills.
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                      <button className="flex-1 px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-lg transition-colors">
                        View Details
                      </button>
                      <button className="p-2 border border-gray-200 hover:border-blue-300 hover:bg-blue-50 rounded-lg transition-colors group/save">
                        <Heart className="w-4 h-4 text-gray-400 group-hover/save:text-blue-500 transition-colors" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Recommendation 4: Future of Work */}
                <div className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-100 relative overflow-hidden">
                  {/* Personalized Badge */}
                  <div className="absolute top-3 right-3 z-10">
                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                      <User className="w-3 h-3" />
                      For You
                    </div>
                  </div>

                  <div className="aspect-[3/4] bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                      alt="The Future of Work"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src =
                          "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjI2NyIgdmlld0JveD0iMCAwIDIwMCAyNjciIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjY3IiBmaWxsPSIjQTg1NUY3Ii8+Cjx0ZXh0IHg9IjEwMCIgeT0iMTMzIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iNDAiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIj7wn5OyPC90ZXh0Pgo8L3N2Zz4K";
                      }}
                    />
                  </div>

                  <div className="p-5">
                    <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-purple-600 transition-colors">
                      The Future of Work
                    </h3>
                    <p className="text-gray-600 text-sm mb-3">Jacob Morgan</p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mb-3">
                      <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
                        Future Work
                      </span>
                      <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full">
                        Leadership
                      </span>
                      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                        Organizations
                      </span>
                    </div>

                    {/* DTMI Score */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-700">
                          DTMI Score:
                        </span>
                        <span className="text-lg font-bold text-purple-600">
                          8.4
                        </span>
                        <span className="text-sm text-gray-500">/ 10</span>
                      </div>
                      <User className="w-4 h-4 text-purple-500" />
                    </div>

                    {/* Recommendation Note */}
                    <div className="bg-purple-50 border border-purple-100 rounded-lg p-3 mb-4">
                      <p className="text-sm text-purple-800 font-medium mb-1">
                        Why this book?
                      </p>
                      <p className="text-xs text-purple-700">
                        Matches your interest in organizational design and
                        workforce transformation.
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                      <button className="flex-1 px-3 py-2 bg-purple-500 hover:bg-purple-600 text-white text-sm font-medium rounded-lg transition-colors">
                        View Details
                      </button>
                      <button className="p-2 border border-gray-200 hover:border-purple-300 hover:bg-purple-50 rounded-lg transition-colors group/save">
                        <Heart className="w-4 h-4 text-gray-400 group-hover/save:text-purple-500 transition-colors" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* View More Recommendations */}
            <div className="text-center mt-8">
              <button
                onClick={() =>
                  navigate("/marketplace/dtmi?tab=books&view=recommendations")
                }
                className="px-8 py-3 border-2 border-orange-500 text-orange-600 hover:bg-orange-500 hover:text-white font-medium rounded-lg transition-colors"
              >
                View All Recommendations
              </button>
            </div>
          </div>
        </section>

        {/* 10. TESTIMONIALS & SOCIAL PROOF */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold font-display mb-4 text-gray-900">
                Trusted by Leaders and Learners in the Digital Economy
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
                Hear from professionals, executives, and enthusiasts who rely on
                DTMI Books to navigate the digital transformation landscape.
              </p>
            </div>

            {/* Testimonials Carousel */}
            <div className="relative max-w-4xl mx-auto mb-12">
              {/* Carousel Container */}
              <div className="overflow-hidden rounded-2xl">
                <div
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{
                    transform: `translateX(-${currentTestimonial * 100}%)`,
                  }}
                >
                  {testimonials.map((testimonial, index) => (
                    <div key={testimonial.id} className="w-full flex-shrink-0">
                      <div className="bg-gray-50 p-12 text-center border border-gray-100">
                        {/* Large Quote */}
                        <div className="mb-8">
                          <Quote className="w-16 h-16 text-orange-200 mx-auto mb-6" />
                          <p className="text-2xl md:text-3xl text-gray-700 leading-relaxed italic font-light max-w-3xl mx-auto">
                            "{testimonial.quote}"
                          </p>
                        </div>

                        {/* Author Info */}
                        <div className="flex items-center justify-center gap-4">
                          <div
                            className={`w-16 h-16 bg-gradient-to-br ${testimonial.color} rounded-full flex items-center justify-center text-white font-bold text-xl`}
                          >
                            {testimonial.initials}
                          </div>
                          <div className="text-left">
                            <p className="font-bold text-xl text-gray-900">
                              {testimonial.name}
                            </p>
                            <p className="text-gray-600 text-lg">
                              {testimonial.role}
                            </p>
                            <div className="flex items-center gap-2 mt-2">
                              {testimonial.badgeIcon === "verified" && (
                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                              )}
                              {testimonial.badgeIcon === "award" && (
                                <Award className="w-4 h-4 text-orange-500" />
                              )}
                              {testimonial.badgeIcon === "bookmark" && (
                                <BookmarkPlus className="w-4 h-4 text-purple-500" />
                              )}
                              {testimonial.badgeIcon === "star" && (
                                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                              )}
                              {testimonial.badgeIcon === "users" && (
                                <Users className="w-4 h-4 text-teal-500" />
                              )}
                              {testimonial.badgeIcon === "file" && (
                                <FileText className="w-4 h-4 text-rose-500" />
                              )}
                              <span className="text-sm text-gray-500">
                                {testimonial.badge}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation Arrows */}
              <button
                onClick={prevTestimonial}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white hover:bg-gray-50 rounded-full shadow-lg border border-gray-200 flex items-center justify-center transition-all duration-200 hover:scale-105"
              >
                <ChevronLeft className="w-6 h-6 text-gray-600" />
              </button>

              <button
                onClick={nextTestimonial}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white hover:bg-gray-50 rounded-full shadow-lg border border-gray-200 flex items-center justify-center transition-all duration-200 hover:scale-105"
              >
                <ChevronRight className="w-6 h-6 text-gray-600" />
              </button>

              {/* Indicators */}
              <div className="flex justify-center gap-2 mt-8">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-200 ${
                      index === currentTestimonial
                        ? "bg-orange-500 scale-110"
                        : "bg-gray-300 hover:bg-gray-400"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 11. FINAL CTA - PERSONAL READING INTELLIGENCE */}
        <section className="relative py-20 overflow-hidden bg-gradient-to-br from-[#0A1628] via-[#1a2942] to-[#0f1f3d]">
          {/* Subtle background pattern */}
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient
                  id="ctaLineGrad"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#f97316" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#ef4444" stopOpacity="0.8" />
                </linearGradient>
              </defs>
              <g>
                <line
                  x1="0%"
                  y1="30%"
                  x2="20%"
                  y2="50%"
                  stroke="url(#ctaLineGrad)"
                  strokeWidth="1"
                />
                <line
                  x1="20%"
                  y1="50%"
                  x2="50%"
                  y2="20%"
                  stroke="url(#ctaLineGrad)"
                  strokeWidth="1"
                />
                <line
                  x1="50%"
                  y1="20%"
                  x2="80%"
                  y2="60%"
                  stroke="url(#ctaLineGrad)"
                  strokeWidth="1"
                />
                <line
                  x1="80%"
                  y1="60%"
                  x2="100%"
                  y2="30%"
                  stroke="url(#ctaLineGrad)"
                  strokeWidth="1"
                />
              </g>
              <circle cx="20%" cy="50%" r="3" fill="#f97316" opacity="0.8">
                <animate
                  attributeName="opacity"
                  values="0.8;1;0.8"
                  dur="3s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx="50%" cy="20%" r="3" fill="#ef4444" opacity="0.8">
                <animate
                  attributeName="opacity"
                  values="0.8;1;0.8"
                  dur="4s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx="80%" cy="60%" r="3" fill="#f97316" opacity="0.8">
                <animate
                  attributeName="opacity"
                  values="0.8;1;0.8"
                  dur="3.5s"
                  repeatCount="indefinite"
                />
              </circle>
            </svg>
          </div>

          <div className="container mx-auto px-4 max-w-3xl text-center relative z-10">
            {/* Icon */}
            <div className="w-16 h-16 mx-auto mb-6 bg-orange-500/20 rounded-full flex items-center justify-center border border-orange-500/30">
              <BookmarkPlus className="w-8 h-8 text-orange-400" />
            </div>

            {/* Headline */}
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
              Start Building Your Personal Reading Intelligence Today
            </h2>

            {/* Subtext */}
            <p className="text-lg text-white/80 mb-10 leading-relaxed max-w-2xl mx-auto">
              Sign up for free and begin curating, shortlisting, and tracking
              the books that matter most to your role and goals.
            </p>

            {/* Primary CTA */}
            <div className="mb-4">
              <button
                onClick={() => navigate("/signup")}
                className="group inline-flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-bold text-lg rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
              >
                <Bookmark className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                Create My Shortlist
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </div>

            {/* Microcopy */}
            <p className="text-sm text-white/50 mb-10">
              It's free, quick, and personalized to your learning goals.
            </p>

            {/* Secondary Actions */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => navigate("/signin")}
                className="px-6 py-3 border border-white/30 text-white/80 hover:border-white hover:text-white rounded-lg font-medium transition-all duration-200 text-sm"
              >
                Sign In
              </button>
              <button
                onClick={() =>
                  navigate("/marketplace/dtmi?tab=books&view=collections")
                }
                className="px-6 py-3 border border-white/30 text-white/80 hover:border-white hover:text-white rounded-lg font-medium transition-all duration-200 text-sm"
              >
                Browse Featured Collections
              </button>
            </div>
          </div>
        </section>

        {/* 12. CONNECT TO DTMI CONTENT */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 max-w-6xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold font-display mb-6 text-gray-900">
              Go Beyond Books
            </h2>
            <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
              Explore related articles, insights, and whitepapers that connect
              key ideas from the books to real-world digital transformation and
              AI use cases.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate("/marketplace/dtmi?tab=articles")}
                className="px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-lg transition-colors"
              >
                View Articles
              </button>
              <button
                onClick={() => navigate("/marketplace/dtmi?tab=insights")}
                className="px-8 py-4 border-2 border-orange-500 text-orange-600 font-bold rounded-lg hover:bg-orange-500 hover:text-white transition-colors"
              >
                Explore Insights
              </button>
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
