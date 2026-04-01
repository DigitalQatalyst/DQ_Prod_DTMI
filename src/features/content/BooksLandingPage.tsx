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

        {/* DOMAIN SECTIONS */}
        {domains.map((domain) => (
          <section key={domain.id} className={`py-16 ${domain.bg}`}>
            <div className="container mx-auto px-4 md:px-6">
              <div className="flex items-center justify-between mb-12">
                <div>
                  <div className="flex items-center mb-4">
                    <div className={`w-4 h-4 ${domain.dotColor} rounded-full mr-3`}></div>
                    <span className={`text-sm font-bold ${domain.accentColor} uppercase tracking-wider`}>{domain.id}</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{domain.label}</h2>
                  <p className="text-gray-500 text-sm">Showcasing 3 of 6 highly-regarded books including foundational texts and 2024-2025 releases</p>
                </div>
                <button onClick={() => navigate("/marketplace/dtmi?tab=books")} className={`hidden md:flex items-center ${domain.accentColor} hover:opacity-80 font-semibold transition-opacity`}>
                  View All Books <ArrowRight className="w-4 h-4 ml-1" />
                </button>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {domain.books.map((book) => (
                  <div key={book.title} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300 group">
                    <div className="relative mb-6">
                      <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg overflow-hidden">
                        <img src={book.img} alt={book.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <h3 className="text-lg font-bold text-gray-900 line-clamp-2 group-hover:text-orange-600 transition-colors">{book.title}</h3>
                      <p className="text-sm text-gray-500 italic">{book.author}</p>
                      <div className="flex flex-wrap gap-1">
                        {book.tags.map((tag) => (
                          <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">{tag}</span>
                        ))}
                      </div>
                      <p className="text-gray-600 text-sm line-clamp-2">{book.description}</p>
                      <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                        <div className="flex items-center gap-1">
                          <span className="text-xs text-gray-500">DTMI Score:</span>
                          <span className={`font-bold text-sm ${domain.accentColor}`}>{book.score}</span>
                          <span className="text-xs text-gray-400">/ 10</span>
                        </div>
                        <button onClick={() => navigate("/marketplace/dtmi?tab=books")} className={`text-xs ${domain.accentColor} hover:opacity-80 font-medium`}>View Details</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        ))}

        {/* TESTIMONIALS CAROUSEL */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Trusted by Leaders and Learners in the Digital Economy</h2>
              <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">Hear from professionals, executives, and enthusiasts who rely on DTMI Books.</p>
            </div>
            <div className="relative max-w-4xl mx-auto mb-12">
              <div className="overflow-hidden rounded-2xl">
                <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}>
                  {testimonials.map((t) => (
                    <div key={t.id} className="w-full flex-shrink-0">
                      <div className="bg-gray-50 p-12 text-center border border-gray-100">
                        <Quote className="w-16 h-16 text-orange-200 mx-auto mb-6" />
                        <p className="text-2xl md:text-3xl text-gray-700 leading-relaxed italic font-light max-w-3xl mx-auto mb-8">"{t.quote}"</p>
                        <div className="flex items-center justify-center gap-4">
                          <div className={`w-16 h-16 bg-gradient-to-br ${t.color} rounded-full flex items-center justify-center text-white font-bold text-xl`}>{t.initials}</div>
                          <div className="text-left">
                            <p className="font-bold text-xl text-gray-900">{t.name}</p>
                            <p className="text-gray-600 text-lg">{t.role}</p>
                            <div className="flex items-center gap-2 mt-1">
                              {t.badgeIcon === "verified" && <div className="w-2 h-2 bg-green-500 rounded-full"></div>}
                              {t.badgeIcon === "award" && <Award className="w-4 h-4 text-orange-500" />}
                              {t.badgeIcon === "bookmark" && <BookmarkPlus className="w-4 h-4 text-purple-500" />}
                              {t.badgeIcon === "star" && <Star className="w-4 h-4 text-yellow-500 fill-current" />}
                              {t.badgeIcon === "users" && <Users className="w-4 h-4 text-teal-500" />}
                              {t.badgeIcon === "file" && <FileText className="w-4 h-4 text-rose-500" />}
                              <span className="text-sm text-gray-500">{t.badge}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <button onClick={prevTestimonial} className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white hover:bg-gray-50 rounded-full shadow-lg border border-gray-200 flex items-center justify-center transition-all hover:scale-105"><ChevronLeft className="w-6 h-6 text-gray-600" /></button>
              <button onClick={nextTestimonial} className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white hover:bg-gray-50 rounded-full shadow-lg border border-gray-200 flex items-center justify-center transition-all hover:scale-105"><ChevronRight className="w-6 h-6 text-gray-600" /></button>
              <div className="flex justify-center gap-2 mt-8">
                {testimonials.map((_, i) => (
                  <button key={i} onClick={() => setCurrentTestimonial(i)} className={`w-3 h-3 rounded-full transition-all duration-200 ${i === currentTestimonial ? "bg-orange-500 scale-110" : "bg-gray-300 hover:bg-gray-400"}`} />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="relative py-20 overflow-hidden bg-gradient-to-br from-[#0A1628] via-[#1a2942] to-[#0f1f3d]">
          <div className="container mx-auto px-4 max-w-3xl text-center relative z-10">
            <div className="w-16 h-16 mx-auto mb-6 bg-orange-500/20 rounded-full flex items-center justify-center border border-orange-500/30">
              <BookmarkPlus className="w-8 h-8 text-orange-400" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">Start Building Your Personal Reading Intelligence Today</h2>
            <p className="text-lg text-white/80 mb-10 leading-relaxed max-w-2xl mx-auto">Sign up for free and begin curating, shortlisting, and tracking the books that matter most to your role and goals.</p>
            <div className="mb-4">
              <button onClick={() => navigate("/signup")} className="group inline-flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-bold text-lg rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                <Bookmark className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                Create My Shortlist
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </div>
            <p className="text-sm text-white/50 mb-10">It is free, quick, and personalized to your learning goals.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button onClick={() => navigate("/signin")} className="px-6 py-3 border border-white/30 text-white/80 hover:border-white hover:text-white rounded-lg font-medium transition-all text-sm">Sign In</button>
              <button onClick={() => navigate("/marketplace/dtmi?tab=books")} className="px-6 py-3 border border-white/30 text-white/80 hover:border-white hover:text-white rounded-lg font-medium transition-all text-sm">Browse Featured Collections</button>
            </div>
          </div>
        </section>

        {/* CROSS-LAYER PROMOTION */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Explore Other Intelligence Layers</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">Access our complete digital transformation intelligence ecosystem</p>
            </div>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Signals</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">Early indicators and trend alerts that help you stay ahead of the curve</p>
                <button onClick={() => navigate("/signals")} className="bg-brand-coral hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors">Explore Signals</button>
              </div>
              <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Deep Analysis</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">Comprehensive research reports and strategic insights for informed decision-making</p>
                <button onClick={() => navigate("/research")} className="bg-brand-coral hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors">Explore Deep Analysis</button>
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
