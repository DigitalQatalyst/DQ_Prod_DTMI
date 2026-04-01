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
