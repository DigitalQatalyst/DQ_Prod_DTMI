import { Header } from "../components/Header/Header";
import { useNavigate } from "react-router-dom";
import { ContributorAdvertCards } from "./dtmi/components/ContributorAdvertCards";
import { NewsletterSignupForm } from "./dtmi/components/NewsletterSignupForm";
import { DTMIFooter } from "./dtmi/components/DTMIFooter";
import ModernDQChatbot from "../components/ModernDQChatbot";

const InsightsLandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col w-full min-h-screen bg-white">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-brand-navy via-brand-navy to-blue-900 text-white py-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Digital Transformation Insights
              </h1>
              <p className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed">
                Actionable intelligence and expert perspectives that drive
                successful digital transformation initiatives across industries
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => navigate("/marketplace/dtmi?tab=insights")}
                  className="bg-primary-500 hover:bg-primary-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 shadow-lg"
                >
                  Explore Latest Insights
                </button>
                <button
                  onClick={() => navigate("/insights-updates-signup")}
                  className="border-2 border-white text-white hover:bg-white hover:text-brand-navy px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200"
                >
                  Subscribe to Updates
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Strategic Insights Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex items-center justify-between mb-12">
              <div>
                <div className="flex items-center mb-4">
                  <div className="w-4 h-4 bg-blue-600 rounded-full mr-3"></div>
                  <span className="text-sm font-bold text-blue-600 uppercase tracking-wider">
                    Strategic Insights
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Executive Intelligence
                </h2>
              </div>
              <button
                onClick={() =>
                  navigate("/marketplace/dtmi?tab=insights&filter=strategic")
                }
                className="hidden md:flex items-center text-primary-600 hover:text-primary-700 font-semibold"
              >
                View All Insights
                <svg
                  className="w-4 h-4 ml-2"
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
              </button>
            </div>

            {/* Horizontal scrolling cards */}
            <div className="flex gap-6 overflow-x-auto pb-4">
              <div className="flex-shrink-0 w-80 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6 relative overflow-hidden">
                {/* Digital transformation visual placeholder */}
                <div className="absolute top-4 right-4 opacity-10">
                  <svg width="50" height="40" viewBox="0 0 50 40" fill="none">
                    <rect
                      x="5"
                      y="15"
                      width="15"
                      height="20"
                      rx="2"
                      fill="currentColor"
                    />
                    <rect
                      x="25"
                      y="10"
                      width="15"
                      height="25"
                      rx="2"
                      fill="currentColor"
                    />
                    <circle cx="12" cy="8" r="3" fill="currentColor" />
                    <circle cx="32" cy="5" r="3" fill="currentColor" />
                    <path
                      d="M12 11 L12 15"
                      stroke="currentColor"
                      strokeWidth="1"
                    />
                    <path
                      d="M32 8 L32 10"
                      stroke="currentColor"
                      strokeWidth="1"
                    />
                    <path
                      d="M20 25 L25 25"
                      stroke="currentColor"
                      strokeWidth="1"
                    />
                  </svg>
                </div>
                <div className="flex items-center justify-between mb-4">
                  <span className="bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full">
                    STRATEGIC
                  </span>
                  <span className="text-sm text-gray-500">1 week ago</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Building Intelligent Organizations: The DCO Framework
                </h3>
                <p className="text-gray-600 mb-4 text-sm">
                  Digital Cognitive Organizations represent the evolution of
                  business intelligence. This comprehensive guide explores the
                  architectural principles, technological foundations, and
                  organizational changes required to build truly cognitive
                  enterprises.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">8 min read</span>
                  <button className="text-blue-600 hover:text-blue-700 text-sm font-semibold">
                    Read Article →
                  </button>
                </div>
              </div>

              <div className="flex-shrink-0 w-80 bg-gradient-to-br from-purple-50 to-violet-50 border border-purple-200 rounded-xl p-6 relative overflow-hidden">
                {/* Platform economics visual placeholder */}
                <div className="absolute top-4 right-4 opacity-10">
                  <svg width="50" height="40" viewBox="0 0 50 40" fill="none">
                    <circle
                      cx="25"
                      cy="20"
                      r="8"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1"
                    />
                    <circle
                      cx="10"
                      cy="10"
                      r="4"
                      fill="currentColor"
                      opacity="0.5"
                    />
                    <circle
                      cx="40"
                      cy="10"
                      r="4"
                      fill="currentColor"
                      opacity="0.5"
                    />
                    <circle
                      cx="10"
                      cy="30"
                      r="4"
                      fill="currentColor"
                      opacity="0.5"
                    />
                    <circle
                      cx="40"
                      cy="30"
                      r="4"
                      fill="currentColor"
                      opacity="0.5"
                    />
                    <line
                      x1="17"
                      y1="20"
                      x2="14"
                      y2="14"
                      stroke="currentColor"
                      strokeWidth="1"
                    />
                    <line
                      x1="33"
                      y1="20"
                      x2="36"
                      y2="14"
                      stroke="currentColor"
                      strokeWidth="1"
                    />
                    <line
                      x1="17"
                      y1="20"
                      x2="14"
                      y2="26"
                      stroke="currentColor"
                      strokeWidth="1"
                    />
                    <line
                      x1="33"
                      y1="20"
                      x2="36"
                      y2="26"
                      stroke="currentColor"
                      strokeWidth="1"
                    />
                  </svg>
                </div>
                <div className="flex items-center justify-between mb-4">
                  <span className="bg-purple-100 text-purple-700 text-xs font-bold px-3 py-1 rounded-full">
                    PLATFORM
                  </span>
                  <span className="text-sm text-gray-500">3 days ago</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  The Rise of Platform Economics in Digital Economy 4.0
                </h3>
                <p className="text-gray-600 mb-4 text-sm">
                  Platform economics represents a fundamental shift in how
                  businesses create and capture value in the digital age. This
                  article explores the mechanisms behind successful digital
                  platforms and their impact on traditional industries.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">6 min read</span>
                  <button className="text-purple-600 hover:text-purple-700 text-sm font-semibold">
                    Read Article →
                  </button>
                </div>
              </div>

              <div className="flex-shrink-0 w-80 bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6 relative overflow-hidden">
                {/* AI transformation visual placeholder */}
                <div className="absolute top-4 right-4 opacity-10">
                  <svg width="50" height="40" viewBox="0 0 50 40" fill="none">
                    <circle cx="15" cy="20" r="6" fill="currentColor" />
                    <circle cx="30" cy="12" r="4" fill="currentColor" />
                    <circle cx="30" cy="28" r="4" fill="currentColor" />
                    <circle cx="45" cy="8" r="3" fill="currentColor" />
                    <circle cx="45" cy="20" r="3" fill="currentColor" />
                    <circle cx="45" cy="32" r="3" fill="currentColor" />
                    <line
                      x1="21"
                      y1="20"
                      x2="26"
                      y2="14"
                      stroke="currentColor"
                      strokeWidth="1"
                    />
                    <line
                      x1="21"
                      y1="20"
                      x2="26"
                      y2="26"
                      stroke="currentColor"
                      strokeWidth="1"
                    />
                    <line
                      x1="34"
                      y1="12"
                      x2="42"
                      y2="10"
                      stroke="currentColor"
                      strokeWidth="1"
                    />
                    <line
                      x1="34"
                      y1="28"
                      x2="42"
                      y2="30"
                      stroke="currentColor"
                      strokeWidth="1"
                    />
                    <line
                      x1="34"
                      y1="20"
                      x2="42"
                      y2="20"
                      stroke="currentColor"
                      strokeWidth="1"
                    />
                  </svg>
                </div>
                <div className="flex items-center justify-between mb-4">
                  <span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full">
                    TRANSFORMATION
                  </span>
                  <span className="text-sm text-gray-500">5 days ago</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Beyond Digitization: The Evolution to Transformation 2.0
                </h3>
                <p className="text-gray-600 mb-4 text-sm">
                  Digital Transformation 2.0 represents a paradigm shift from
                  digitizing existing processes to reimagining entire business
                  models. This article explores the key differences and provides
                  a roadmap for organizations ready to make the leap.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">7 min read</span>
                  <button className="text-green-600 hover:text-green-700 text-sm font-semibold">
                    Read Article →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Industry Analysis Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center mb-4">
                <div className="w-4 h-4 bg-green-600 rounded-full mr-3"></div>
                <span className="text-sm font-bold text-green-600 uppercase tracking-wider">
                  Industry Analysis
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Sector-Specific Intelligence
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {/* Insight 1 */}
              <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow relative overflow-hidden">
                {/* Digital transformation visual placeholder */}
                <div className="absolute top-4 right-4 opacity-10">
                  <svg width="50" height="40" viewBox="0 0 50 40" fill="none">
                    <rect
                      x="5"
                      y="15"
                      width="15"
                      height="20"
                      rx="2"
                      fill="currentColor"
                    />
                    <rect
                      x="25"
                      y="10"
                      width="15"
                      height="25"
                      rx="2"
                      fill="currentColor"
                    />
                    <circle cx="12" cy="8" r="3" fill="currentColor" />
                    <circle cx="32" cy="5" r="3" fill="currentColor" />
                    <path
                      d="M12 11 L12 15"
                      stroke="currentColor"
                      strokeWidth="1"
                    />
                    <path
                      d="M32 8 L32 10"
                      stroke="currentColor"
                      strokeWidth="1"
                    />
                    <path
                      d="M20 25 L25 25"
                      stroke="currentColor"
                      strokeWidth="1"
                    />
                  </svg>
                </div>
                <div className="flex items-center mb-4">
                  <div className="w-3 h-3 bg-blue-600 rounded-full mr-3"></div>
                  <span className="text-sm font-semibold text-blue-600 uppercase tracking-wider">
                    Strategic Insight
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  The Rise of Digital Cognitive Organizations
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  How leading enterprises are transforming into adaptive,
                  intelligent organizations that leverage AI and data to drive
                  continuous innovation and competitive advantage.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">1 week ago</span>
                  <span className="text-sm text-primary-600 font-medium">
                    8 min read
                  </span>
                </div>
              </div>

              {/* Insight 2 */}
              <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow relative overflow-hidden">
                {/* Manufacturing 4.0 visual placeholder */}
                <div className="absolute top-4 right-4 opacity-10">
                  <svg width="50" height="40" viewBox="0 0 50 40" fill="none">
                    <rect
                      x="5"
                      y="20"
                      width="12"
                      height="15"
                      rx="1"
                      fill="currentColor"
                    />
                    <rect
                      x="20"
                      y="18"
                      width="12"
                      height="17"
                      rx="1"
                      fill="currentColor"
                    />
                    <rect
                      x="35"
                      y="22"
                      width="10"
                      height="13"
                      rx="1"
                      fill="currentColor"
                    />
                    <circle cx="11" cy="15" r="2" fill="currentColor" />
                    <circle cx="26" cy="13" r="2" fill="currentColor" />
                    <circle cx="40" cy="17" r="2" fill="currentColor" />
                    <path
                      d="M13 15 L24 13"
                      stroke="currentColor"
                      strokeWidth="1"
                      strokeDasharray="1,1"
                    />
                    <path
                      d="M28 13 L38 17"
                      stroke="currentColor"
                      strokeWidth="1"
                      strokeDasharray="1,1"
                    />
                  </svg>
                </div>
                <div className="flex items-center mb-4">
                  <div className="w-3 h-3 bg-green-600 rounded-full mr-3"></div>
                  <span className="text-sm font-semibold text-green-600 uppercase tracking-wider">
                    Industry Analysis
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Manufacturing 4.0: Beyond Automation
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  Expert analysis on how smart manufacturing is evolving beyond
                  traditional automation to create fully integrated, data-driven
                  production ecosystems.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">3 days ago</span>
                  <span className="text-sm text-primary-600 font-medium">
                    6 min read
                  </span>
                </div>
              </div>

              {/* Insight 3 */}
              <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow relative overflow-hidden">
                {/* Data privacy visual placeholder */}
                <div className="absolute top-4 right-4 opacity-10">
                  <svg width="50" height="40" viewBox="0 0 50 40" fill="none">
                    <rect
                      x="15"
                      y="15"
                      width="20"
                      height="20"
                      rx="2"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1"
                    />
                    <path
                      d="M20 15 L20 12 C20 9 22 7 25 7 C28 7 30 9 30 12 L30 15"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1"
                    />
                    <circle cx="25" cy="25" r="3" fill="currentColor" />
                    <path
                      d="M25 28 L25 30"
                      stroke="currentColor"
                      strokeWidth="1"
                    />
                    <circle
                      cx="8"
                      cy="10"
                      r="2"
                      fill="currentColor"
                      opacity="0.5"
                    />
                    <circle
                      cx="42"
                      cy="12"
                      r="2"
                      fill="currentColor"
                      opacity="0.5"
                    />
                    <circle
                      cx="10"
                      cy="30"
                      r="2"
                      fill="currentColor"
                      opacity="0.5"
                    />
                    <circle
                      cx="40"
                      cy="32"
                      r="2"
                      fill="currentColor"
                      opacity="0.5"
                    />
                  </svg>
                </div>
                <div className="flex items-center mb-4">
                  <div className="w-3 h-3 bg-purple-600 rounded-full mr-3"></div>
                  <span className="text-sm font-semibold text-purple-600 uppercase tracking-wider">
                    Expert Commentary
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Navigating the Data Privacy Paradox in AI
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  Industry experts discuss the challenges and opportunities of
                  balancing AI innovation with data privacy requirements in the
                  post-GDPR era.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">5 days ago</span>
                  <span className="text-sm text-primary-600 font-medium">
                    7 min read
                  </span>
                </div>
              </div>
            </div>

            {/* CTA to Marketplace */}
            <div className="text-center mt-12">
              <button
                onClick={() => navigate("/marketplace/dtmi?tab=insights")}
                className="bg-primary-500 hover:bg-primary-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Explore All Insights in Marketplace
              </button>
              <p className="text-gray-500 mt-4">
                Access expert commentary, strategic analysis, and industry
                insights
              </p>
            </div>
          </div>
        </section>

        {/* Strategic Insights Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex items-center justify-between mb-12">
              <div>
                <div className="flex items-center mb-4">
                  <div className="w-4 h-4 bg-blue-600 rounded-full mr-3"></div>
                  <span className="text-sm font-bold text-blue-600 uppercase tracking-wider">
                    Strategic Insights
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Executive Intelligence
                </h2>
              </div>
              <button
                onClick={() =>
                  navigate("/marketplace/dtmi?tab=insights&filter=strategic")
                }
                className="hidden md:flex items-center text-primary-600 hover:text-primary-700 font-semibold"
              >
                View All Insights
                <svg
                  className="w-4 h-4 ml-2"
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
              </button>
            </div>

            {/* Horizontal scrolling cards */}
            <div className="flex gap-6 overflow-x-auto pb-4">
              <div className="flex-shrink-0 w-80 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6 relative overflow-hidden">
                {/* Digital transformation visual placeholder */}
                <div className="absolute top-4 right-4 opacity-10">
                  <svg width="50" height="40" viewBox="0 0 50 40" fill="none">
                    <rect
                      x="5"
                      y="15"
                      width="15"
                      height="20"
                      rx="2"
                      fill="currentColor"
                    />
                    <rect
                      x="25"
                      y="10"
                      width="15"
                      height="25"
                      rx="2"
                      fill="currentColor"
                    />
                    <circle cx="12" cy="8" r="3" fill="currentColor" />
                    <circle cx="32" cy="5" r="3" fill="currentColor" />
                    <path
                      d="M12 11 L12 15"
                      stroke="currentColor"
                      strokeWidth="1"
                    />
                    <path
                      d="M32 8 L32 10"
                      stroke="currentColor"
                      strokeWidth="1"
                    />
                    <path
                      d="M20 25 L25 25"
                      stroke="currentColor"
                      strokeWidth="1"
                    />
                  </svg>
                </div>
                <div className="flex items-center justify-between mb-4">
                  <span className="bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full">
                    STRATEGIC
                  </span>
                  <span className="text-sm text-gray-500">1 week ago</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Building Intelligent Organizations: The DCO Framework
                </h3>
                <p className="text-gray-600 mb-4 text-sm">
                  Learn how Digital Cognitive Organizations leverage AI and
                  machine learning to create self-learning, adaptive enterprises
                  that predict and respond to market changes.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">8 min read</span>
                  <button className="text-blue-600 hover:text-blue-700 text-sm font-semibold">
                    Read Article →
                  </button>
                </div>
              </div>

              <div className="flex-shrink-0 w-80 bg-gradient-to-br from-purple-50 to-violet-50 border border-purple-200 rounded-xl p-6 relative overflow-hidden">
                {/* Platform economics visual placeholder */}
                <div className="absolute top-4 right-4 opacity-10">
                  <svg width="50" height="40" viewBox="0 0 50 40" fill="none">
                    <circle
                      cx="25"
                      cy="20"
                      r="8"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1"
                    />
                    <circle
                      cx="10"
                      cy="10"
                      r="4"
                      fill="currentColor"
                      opacity="0.5"
                    />
                    <circle
                      cx="40"
                      cy="10"
                      r="4"
                      fill="currentColor"
                      opacity="0.5"
                    />
                    <circle
                      cx="10"
                      cy="30"
                      r="4"
                      fill="currentColor"
                      opacity="0.5"
                    />
                    <circle
                      cx="40"
                      cy="30"
                      r="4"
                      fill="currentColor"
                      opacity="0.5"
                    />
                    <line
                      x1="17"
                      y1="20"
                      x2="14"
                      y2="14"
                      stroke="currentColor"
                      strokeWidth="1"
                    />
                    <line
                      x1="33"
                      y1="20"
                      x2="36"
                      y2="14"
                      stroke="currentColor"
                      strokeWidth="1"
                    />
                    <line
                      x1="17"
                      y1="20"
                      x2="14"
                      y2="26"
                      stroke="currentColor"
                      strokeWidth="1"
                    />
                    <line
                      x1="33"
                      y1="20"
                      x2="36"
                      y2="26"
                      stroke="currentColor"
                      strokeWidth="1"
                    />
                  </svg>
                </div>
                <div className="flex items-center justify-between mb-4">
                  <span className="bg-purple-100 text-purple-700 text-xs font-bold px-3 py-1 rounded-full">
                    PLATFORM
                  </span>
                  <span className="text-sm text-gray-500">3 days ago</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  The Rise of Platform Economics in Digital Economy 4.0
                </h3>
                <p className="text-gray-600 mb-4 text-sm">
                  Discover how platform-based business models are reshaping the
                  global economy and creating unprecedented value through
                  network effects and ecosystem strategies.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">6 min read</span>
                  <button className="text-purple-600 hover:text-purple-700 text-sm font-semibold">
                    Read Article →
                  </button>
                </div>
              </div>

              <div className="flex-shrink-0 w-80 bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6 relative overflow-hidden">
                {/* AI transformation visual placeholder */}
                <div className="absolute top-4 right-4 opacity-10">
                  <svg width="50" height="40" viewBox="0 0 50 40" fill="none">
                    <circle cx="15" cy="20" r="6" fill="currentColor" />
                    <circle cx="30" cy="12" r="4" fill="currentColor" />
                    <circle cx="30" cy="28" r="4" fill="currentColor" />
                    <circle cx="45" cy="8" r="3" fill="currentColor" />
                    <circle cx="45" cy="20" r="3" fill="currentColor" />
                    <circle cx="45" cy="32" r="3" fill="currentColor" />
                    <line
                      x1="21"
                      y1="20"
                      x2="26"
                      y2="14"
                      stroke="currentColor"
                      strokeWidth="1"
                    />
                    <line
                      x1="21"
                      y1="20"
                      x2="26"
                      y2="26"
                      stroke="currentColor"
                      strokeWidth="1"
                    />
                    <line
                      x1="34"
                      y1="12"
                      x2="42"
                      y2="10"
                      stroke="currentColor"
                      strokeWidth="1"
                    />
                    <line
                      x1="34"
                      y1="28"
                      x2="42"
                      y2="30"
                      stroke="currentColor"
                      strokeWidth="1"
                    />
                    <line
                      x1="34"
                      y1="20"
                      x2="42"
                      y2="20"
                      stroke="currentColor"
                      strokeWidth="1"
                    />
                  </svg>
                </div>
                <div className="flex items-center justify-between mb-4">
                  <span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full">
                    AI-DRIVEN
                  </span>
                  <span className="text-sm text-gray-500">5 days ago</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  AI-Driven Transformation: From Automation to Augmentation
                </h3>
                <p className="text-gray-600 mb-4 text-sm">
                  Discover how AI is evolving from automating tasks to
                  augmenting human capabilities, creating new possibilities for
                  innovation and decision-making.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">7 min read</span>
                  <button className="text-green-600 hover:text-green-700 text-sm font-semibold">
                    Read Article →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Industry Analysis Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center mb-4">
                <div className="w-4 h-4 bg-green-600 rounded-full mr-3"></div>
                <span className="text-sm font-bold text-green-600 uppercase tracking-wider">
                  Industry Analysis
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Sector-Specific Intelligence
              </h2>
            </div>

            {/* Grid layout with featured card */}
            <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {/* Featured large card */}
              <div className="lg:col-span-2 bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="h-48 bg-gradient-to-r from-green-600 to-teal-600 relative">
                  <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                  {/* Manufacturing visual placeholder */}
                  <div className="absolute inset-0 opacity-10">
                    <svg
                      className="w-full h-full"
                      viewBox="0 0 400 200"
                      fill="none"
                    >
                      <rect
                        x="50"
                        y="120"
                        width="60"
                        height="60"
                        rx="4"
                        fill="white"
                      />
                      <rect
                        x="150"
                        y="110"
                        width="60"
                        height="70"
                        rx="4"
                        fill="white"
                      />
                      <rect
                        x="250"
                        y="125"
                        width="50"
                        height="55"
                        rx="4"
                        fill="white"
                      />
                      <circle cx="80" cy="100" r="8" fill="white" />
                      <circle cx="180" cy="90" r="8" fill="white" />
                      <circle cx="275" cy="105" r="8" fill="white" />
                      <path
                        d="M88 100 L172 90"
                        stroke="white"
                        strokeWidth="2"
                        strokeDasharray="4,4"
                      />
                      <path
                        d="M188 90 L267 105"
                        stroke="white"
                        strokeWidth="2"
                        strokeDasharray="4,4"
                      />
                    </svg>
                  </div>
                  <div className="absolute bottom-4 left-6 text-white">
                    <span className="bg-white bg-opacity-20 text-xs font-bold px-3 py-1 rounded-full mb-2 inline-block">
                      MANUFACTURING
                    </span>
                    <h3 className="text-2xl font-bold mb-2">
                      Architecting Scalable Digital Business Platforms
                    </h3>
                    <p className="text-sm opacity-90">
                      Master the principles of building digital platforms that
                      scale seamlessly from startup to enterprise
                    </p>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 mb-4">
                    Digital Business Platforms are the foundation of modern
                    digital enterprises. This comprehensive guide covers
                    platform architecture, microservices, APIs, and ecosystem
                    design patterns that enable scalable growth.
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      Published 1 week ago
                    </span>
                    <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-semibold">
                      Read Full Article
                    </button>
                  </div>
                </div>
              </div>

              {/* Side cards */}
              <div className="space-y-6">
                <div className="bg-white rounded-xl p-6 shadow-md relative overflow-hidden">
                  {/* Digital workspace visual placeholder */}
                  <div className="absolute top-2 right-2 opacity-10">
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                      <rect
                        x="5"
                        y="10"
                        width="30"
                        height="20"
                        rx="2"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1"
                      />
                      <rect
                        x="10"
                        y="15"
                        width="8"
                        height="5"
                        fill="currentColor"
                        opacity="0.5"
                      />
                      <rect
                        x="22"
                        y="15"
                        width="8"
                        height="5"
                        fill="currentColor"
                        opacity="0.5"
                      />
                      <rect
                        x="10"
                        y="22"
                        width="20"
                        height="2"
                        fill="currentColor"
                        opacity="0.3"
                      />
                      <circle cx="8" cy="8" r="2" fill="currentColor" />
                      <circle cx="32" cy="8" r="2" fill="currentColor" />
                      <circle cx="8" cy="32" r="2" fill="currentColor" />
                      <circle cx="32" cy="32" r="2" fill="currentColor" />
                    </svg>
                  </div>
                  <span className="bg-teal-100 text-teal-700 text-xs font-bold px-3 py-1 rounded-full mb-3 inline-block">
                    WORKFORCE
                  </span>
                  <h4 className="text-lg font-bold text-gray-900 mb-2">
                    The Hybrid Workforce Revolution
                  </h4>
                  <p className="text-gray-600 text-sm mb-3">
                    Learn how to create digital workspaces that empower
                    distributed teams
                  </p>
                  <button className="text-primary-600 hover:text-primary-700 text-sm font-semibold">
                    Learn More →
                  </button>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-md relative overflow-hidden">
                  {/* Digital tools visual placeholder */}
                  <div className="absolute top-2 right-2 opacity-10">
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                      <rect
                        x="8"
                        y="8"
                        width="24"
                        height="16"
                        rx="2"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1"
                      />
                      <rect
                        x="12"
                        y="12"
                        width="4"
                        height="8"
                        fill="currentColor"
                        opacity="0.5"
                      />
                      <rect
                        x="18"
                        y="14"
                        width="4"
                        height="6"
                        fill="currentColor"
                        opacity="0.5"
                      />
                      <rect
                        x="24"
                        y="10"
                        width="4"
                        height="10"
                        fill="currentColor"
                        opacity="0.5"
                      />
                      <circle
                        cx="20"
                        cy="30"
                        r="6"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1"
                      />
                      <path
                        d="M20 26 L20 34 M16 30 L24 30"
                        stroke="currentColor"
                        strokeWidth="1"
                      />
                    </svg>
                  </div>
                  <span className="bg-orange-100 text-orange-700 text-xs font-bold px-3 py-1 rounded-full mb-3 inline-block">
                    TOOLS
                  </span>
                  <h4 className="text-lg font-bold text-gray-900 mb-2">
                    Essential Digital Tools for Enterprise
                  </h4>
                  <p className="text-gray-600 text-sm mb-3">
                    A comprehensive guide to digital accelerators and
                    transformation tools
                  </p>
                  <button className="text-primary-600 hover:text-primary-700 text-sm font-semibold">
                    Learn More →
                  </button>
                </div>
              </div>
            </div>

            <div className="text-center mt-12">
              <button
                onClick={() =>
                  navigate("/marketplace/dtmi?tab=insights&filter=industry")
                }
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200"
              >
                Explore All Industry Analysis
              </button>
            </div>
          </div>
        </section>

        {/* Expert Commentary Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex items-center justify-between mb-12">
              <div>
                <div className="flex items-center mb-4">
                  <div className="w-4 h-4 bg-purple-600 rounded-full mr-3"></div>
                  <span className="text-sm font-bold text-purple-600 uppercase tracking-wider">
                    Expert Commentary
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Thought Leadership
                </h2>
              </div>
            </div>

            {/* List-style layout */}
            <div className="max-w-4xl mx-auto space-y-6">
              <div className="bg-gradient-to-r from-purple-50 to-violet-50 border-l-4 border-purple-600 rounded-lg p-6 hover:shadow-md transition-shadow relative overflow-hidden">
                {/* Data monetization visual placeholder */}
                <div className="absolute top-4 right-4 opacity-10">
                  <svg width="60" height="40" viewBox="0 0 60 40" fill="none">
                    <circle
                      cx="20"
                      cy="20"
                      r="12"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1"
                    />
                    <circle
                      cx="20"
                      cy="20"
                      r="6"
                      fill="currentColor"
                      opacity="0.3"
                    />
                    <rect
                      x="35"
                      y="15"
                      width="20"
                      height="10"
                      rx="2"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1"
                    />
                    <path
                      d="M32 20 L35 20"
                      stroke="currentColor"
                      strokeWidth="1"
                    />
                    <circle cx="42" cy="20" r="2" fill="currentColor" />
                    <path
                      d="M45 18 L45 22 M47 20 L49 20"
                      stroke="currentColor"
                      strokeWidth="1"
                    />
                  </svg>
                </div>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <span className="bg-purple-100 text-purple-700 text-xs font-bold px-2 py-1 rounded mr-3">
                        EXPERT VIEW
                      </span>
                      <span className="text-sm text-gray-500">
                        Commentary • 6 min read
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      Data as Currency: Monetizing Information in the Digital
                      Economy
                    </h3>
                    <p className="text-gray-600 mb-3">
                      Explore how organizations are transforming data into their
                      most valuable asset and revenue stream, including ethical
                      considerations and infrastructure requirements.
                    </p>
                    <div className="flex items-center text-sm text-gray-500">
                      <span>
                        Key Topics: Data Monetization, Ethics, Infrastructure
                      </span>
                    </div>
                  </div>
                  <button className="ml-6 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-semibold">
                    Read Commentary
                  </button>
                </div>
              </div>

              <div className="bg-gradient-to-r from-indigo-50 to-blue-50 border-l-4 border-indigo-600 rounded-lg p-6 hover:shadow-md transition-shadow relative overflow-hidden">
                {/* Predictive systems visual placeholder */}
                <div className="absolute top-4 right-4 opacity-10">
                  <svg width="60" height="40" viewBox="0 0 60 40" fill="none">
                    <path
                      d="M5 30 Q15 20 25 25 T45 15"
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="none"
                    />
                    <circle cx="15" cy="25" r="2" fill="currentColor" />
                    <circle cx="25" cy="25" r="2" fill="currentColor" />
                    <circle cx="35" cy="20" r="2" fill="currentColor" />
                    <circle cx="45" cy="15" r="2" fill="currentColor" />
                    <path
                      d="M50 10 L55 15 L50 20"
                      stroke="currentColor"
                      strokeWidth="1"
                      fill="none"
                    />
                  </svg>
                </div>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <span className="bg-indigo-100 text-indigo-700 text-xs font-bold px-2 py-1 rounded mr-3">
                        COGNITIVE
                      </span>
                      <span className="text-sm text-gray-500">
                        Deep Dive • 8 min read
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      From Reactive to Predictive: Cognitive Decision-Making
                      Systems
                    </h3>
                    <p className="text-gray-600 mb-3">
                      Discover how cognitive systems are transforming
                      organizational decision-making from reactive responses to
                      predictive intelligence and proactive strategies.
                    </p>
                    <div className="flex items-center text-sm text-gray-500">
                      <span>
                        Key Topics: Predictive Analytics, Decision Systems, AI
                      </span>
                    </div>
                  </div>
                  <button className="ml-6 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-semibold">
                    Read Commentary
                  </button>
                </div>
              </div>

              <div className="bg-gradient-to-r from-teal-50 to-cyan-50 border-l-4 border-teal-600 rounded-lg p-6 hover:shadow-md transition-shadow relative overflow-hidden">
                {/* Platform ecosystem visual placeholder */}
                <div className="absolute top-4 right-4 opacity-10">
                  <svg width="60" height="40" viewBox="0 0 60 40" fill="none">
                    <circle
                      cx="30"
                      cy="20"
                      r="8"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1"
                    />
                    <circle
                      cx="15"
                      cy="10"
                      r="4"
                      fill="currentColor"
                      opacity="0.5"
                    />
                    <circle
                      cx="45"
                      cy="10"
                      r="4"
                      fill="currentColor"
                      opacity="0.5"
                    />
                    <circle
                      cx="15"
                      cy="30"
                      r="4"
                      fill="currentColor"
                      opacity="0.5"
                    />
                    <circle
                      cx="45"
                      cy="30"
                      r="4"
                      fill="currentColor"
                      opacity="0.5"
                    />
                    <line
                      x1="22"
                      y1="20"
                      x2="19"
                      y2="14"
                      stroke="currentColor"
                      strokeWidth="1"
                    />
                    <line
                      x1="38"
                      y1="20"
                      x2="41"
                      y2="14"
                      stroke="currentColor"
                      strokeWidth="1"
                    />
                    <line
                      x1="22"
                      y1="20"
                      x2="19"
                      y2="26"
                      stroke="currentColor"
                      strokeWidth="1"
                    />
                    <line
                      x1="38"
                      y1="20"
                      x2="41"
                      y2="26"
                      stroke="currentColor"
                      strokeWidth="1"
                    />
                  </svg>
                </div>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <span className="bg-teal-100 text-teal-700 text-xs font-bold px-2 py-1 rounded mr-3">
                        ECOSYSTEM
                      </span>
                      <span className="text-sm text-gray-500">
                        Strategy Guide • 7 min read
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      Platform Ecosystems: Creating Network Effects at Scale
                    </h3>
                    <p className="text-gray-600 mb-3">
                      Understand how to design and nurture platform ecosystems
                      that generate exponential value through network effects
                      and strategic partner management.
                    </p>
                    <div className="flex items-center text-sm text-gray-500">
                      <span>
                        Key Topics: Network Effects, Ecosystems, Platform
                        Strategy
                      </span>
                    </div>
                  </div>
                  <button className="ml-6 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg text-sm font-semibold">
                    Read Commentary
                  </button>
                </div>
              </div>
            </div>

            <div className="text-center mt-12">
              <button
                onClick={() =>
                  navigate("/marketplace/dtmi?tab=insights&filter=expert")
                }
                className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200"
              >
                Access All Expert Commentary
              </button>
            </div>
          </div>
        </section>

        {/* Cross-layer Promotion */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Explore Other Intelligence Layers
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Access our complete digital transformation intelligence
                ecosystem
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Signals
                </h3>
                <p className="text-gray-600 mb-6">
                  Early indicators and trend alerts that help you stay ahead of
                  the curve
                </p>
                <button
                  onClick={() => navigate("/signals")}
                  className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200"
                >
                  Explore Signals
                </button>
              </div>
              <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Deep Analysis
                </h3>
                <p className="text-gray-600 mb-6">
                  Comprehensive research reports and strategic insights for
                  informed decision-making
                </p>
                <button
                  onClick={() => navigate("/research")}
                  className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200"
                >
                  Explore Deep Analysis
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Contributor Cards */}
        <ContributorAdvertCards />

        {/* Newsletter Signup */}
        <NewsletterSignupForm />

        {/* DTMI Footer */}
        <DTMIFooter />
      </main>

      <ModernDQChatbot />
    </div>
  );
};

export default InsightsLandingPage;
