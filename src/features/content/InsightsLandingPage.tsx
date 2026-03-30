import { Header } from "../../shared/Header/Header";
import { useNavigate } from "react-router-dom";
import { ContributorAdvertCards } from "../landing/components/ContributorAdvertCards";
import { NewsletterSignupForm } from "../landing/components/NewsletterSignupForm";
import { Footer } from "../../shared/Footer/Footer";
import ModernDQChatbot from "../../shared/ModernDQChatbot";
import { useState } from "react";

const InsightsLandingPage = () => {
  const navigate = useNavigate();
  const [imageErrors, setImageErrors] = useState<{ [key: string]: boolean }>(
    {},
  );

  const handleImageError = (imageKey: string) => {
    setImageErrors((prev) => ({ ...prev, [imageKey]: true }));
  };

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

            {/* Grid layout with marketplace-style cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300 group">
                {/* Article Image */}
                <div className="relative mb-6">
                  <div className="h-64 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg overflow-hidden">
                    <img
                      src="/images/Article 01_hero image.png"
                      alt="Traditional Business Models"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        const parent = target.parentElement!;
                        parent.innerHTML = `
                          <div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-100">
                            <div class="text-center text-gray-600">
                              <div class="w-12 h-12 mx-auto mb-2 bg-blue-500 rounded-lg flex items-center justify-center text-white text-xl">
                                📊
                              </div>
                              <p class="text-sm font-medium">Strategic Article</p>
                            </div>
                          </div>
                        `;
                      }}
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full">
                        STRATEGIC
                      </span>
                    </div>
                  </div>
                </div>

                {/* Article Info */}
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                      Why Traditional Business Models Are Doomed in the Age of
                      Cognitive Organizations
                    </h3>
                    <p className="text-sm text-gray-500 mb-3">
                      December 10, 2025 • 8 min read
                    </p>
                    <p className="text-gray-600 text-sm line-clamp-3">
                      Explore why traditional business models are becoming
                      obsolete and how Digital Cognitive Organizations (DCOs)
                      are revolutionizing the way businesses operate in the
                      digital economy.
                    </p>
                  </div>

                  {/* Impact Rating */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">
                        Impact: Strategic
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <span>Business Transformation</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300 group">
                {/* Article Image */}
                <div className="relative mb-6">
                  <div className="h-64 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg overflow-hidden">
                    <img
                      src="/images/Article 02_hero image.png"
                      alt="Digital Transformation"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        const parent = target.parentElement!;
                        parent.innerHTML = `
                          <div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-green-100 to-emerald-100">
                            <div class="text-center text-gray-600">
                              <div class="w-12 h-12 mx-auto mb-2 bg-green-500 rounded-lg flex items-center justify-center text-white text-xl">
                                🚀
                              </div>
                              <p class="text-sm font-medium">Innovation Article</p>
                            </div>
                          </div>
                        `;
                      }}
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full">
                        INNOVATION
                      </span>
                    </div>
                  </div>
                </div>

                {/* Article Info */}
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-green-600 transition-colors">
                      Traditional Digital Transformation is Dead: Meet the
                      Future of Business
                    </h3>
                    <p className="text-sm text-gray-500 mb-3">
                      December 10, 2025 • 10 min read
                    </p>
                    <p className="text-gray-600 text-sm line-clamp-3">
                      Discover why traditional digital transformation strategies
                      are no longer enough and how Digital Cognitive
                      Organizations represent the future of business in Economy
                      4.0.
                    </p>
                  </div>

                  {/* Impact Rating */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">
                        Impact: Revolutionary
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <span>AI Strategy</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300 group">
                {/* Article Image */}
                <div className="relative mb-6">
                  <div className="h-64 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg overflow-hidden">
                    <img
                      src="/images/Article 03_hero image.png"
                      alt="Organizational Structure"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        const parent = target.parentElement!;
                        parent.innerHTML = `
                          <div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-100 to-violet-100">
                            <div class="text-center text-gray-600">
                              <div class="w-12 h-12 mx-auto mb-2 bg-purple-500 rounded-lg flex items-center justify-center text-white text-xl">
                                🏢
                              </div>
                              <p class="text-sm font-medium">Organizational Article</p>
                            </div>
                          </div>
                        `;
                      }}
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-purple-100 text-purple-700 text-xs font-bold px-3 py-1 rounded-full">
                        ORGANIZATIONAL
                      </span>
                    </div>
                  </div>
                </div>

                {/* Article Info */}
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-purple-600 transition-colors">
                      Why Traditional Organizations Are Obsolete in Today's
                      Digital Economy
                    </h3>
                    <p className="text-sm text-gray-500 mb-3">
                      December 10, 2025 • 7 min read
                    </p>
                    <p className="text-gray-600 text-sm line-clamp-3">
                      Learn why traditional organizational structures are
                      becoming obsolete and how businesses can transform into
                      adaptive, intelligent Digital Cognitive Organizations.
                    </p>
                  </div>

                  {/* Impact Rating */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">
                        Impact: Transformational
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <span>Strategy & Growth</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Expert Interviews Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex items-center justify-between mb-12">
              <div>
                <div className="flex items-center mb-4">
                  <div className="w-4 h-4 bg-green-600 rounded-full mr-3"></div>
                  <span className="text-sm font-bold text-green-600 uppercase tracking-wider">
                    Expert Interviews
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Sector-Specific Intelligence
                </h2>
              </div>
              <button
                onClick={() =>
                  navigate(
                    "/marketplace/dtmi?tab=insights&filter=expert-interviews",
                  )
                }
                className="hidden md:flex items-center text-primary-600 hover:text-primary-700 font-semibold"
              >
                View All Expert Interviews
              </button>
            </div>

            {/* Grid layout with marketplace-style cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300 group">
                {/* Expert Interview Image */}
                <div className="relative mb-6">
                  <div className="h-64 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg overflow-hidden">
                    <img
                      src="/images/interview1_thumbnail.png"
                      alt="Digital Transformation Strategies"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        const parent = target.parentElement!;
                        parent.innerHTML = `
                          <div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-green-100 to-emerald-100">
                            <div class="text-center text-gray-600">
                              <div class="w-12 h-12 mx-auto mb-2 bg-green-500 rounded-lg flex items-center justify-center text-white text-xl">
                                🎤
                              </div>
                              <p class="text-sm font-medium">Expert Interview</p>
                            </div>
                          </div>
                        `;
                      }}
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full">
                        EXPERT INTERVIEW
                      </span>
                    </div>
                  </div>
                </div>

                {/* Interview Info */}
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-green-600 transition-colors">
                      Digital Transformation Strategies for Modern Businesses
                    </h3>
                    <p className="text-sm text-gray-500 mb-3">
                      January 5, 2025 • 15 min read
                    </p>
                    <p className="text-gray-600 text-sm line-clamp-3">
                      An in-depth conversation with industry leaders about the
                      latest trends and strategies in digital transformation for
                      businesses in the digital economy.
                    </p>
                  </div>

                  {/* Impact Rating */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">
                        Impact: Strategic
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <span>Business Strategy</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300 group">
                {/* Prediction Analysis Image */}
                <div className="relative mb-6">
                  <div className="h-64 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg overflow-hidden">
                    <img
                      src="/images/prediction1-thumbnail.png"
                      alt="Digital Cognitive Organizations"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        const parent = target.parentElement!;
                        parent.innerHTML = `
                          <div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-100">
                            <div class="text-center text-gray-600">
                              <div class="w-12 h-12 mx-auto mb-2 bg-blue-500 rounded-lg flex items-center justify-center text-white text-xl">
                                🔮
                              </div>
                              <p class="text-sm font-medium">Prediction Analysis</p>
                            </div>
                          </div>
                        `;
                      }}
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full">
                        PREDICTION
                      </span>
                    </div>
                  </div>
                </div>

                {/* Analysis Info */}
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                      The Rise of Digital Cognitive Organizations: 2025-2030
                      Outlook
                    </h3>
                    <p className="text-sm text-gray-500 mb-3">
                      January 15, 2025 • 12 min read
                    </p>
                    <p className="text-gray-600 text-sm line-clamp-3">
                      An in-depth prediction analysis of how AI-driven cognitive
                      architectures will reshape enterprise operations and
                      decision-making frameworks over the next five years.
                    </p>
                  </div>

                  {/* Impact Rating */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">
                        Impact: Revolutionary
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <span>AI & Innovation</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300 group">
                {/* Prediction Analysis Image */}
                <div className="relative mb-6">
                  <div className="h-64 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                      alt="AI Decision Making"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        const parent = target.parentElement!;
                        parent.innerHTML = `
                          <div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-100 to-violet-100">
                            <div class="text-center text-gray-600">
                              <div class="w-12 h-12 mx-auto mb-2 bg-purple-500 rounded-lg flex items-center justify-center text-white text-xl">
                                🧠
                              </div>
                              <p class="text-sm font-medium">AI Strategy</p>
                            </div>
                          </div>
                        `;
                      }}
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-purple-100 text-purple-700 text-xs font-bold px-3 py-1 rounded-full">
                        FUTURE VISION
                      </span>
                    </div>
                  </div>
                </div>

                {/* Analysis Info */}
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-purple-600 transition-colors">
                      How AI-Driven Decision Making Will Shape Corporate
                      Strategy by 2030
                    </h3>
                    <p className="text-sm text-gray-500 mb-3">
                      January 15, 2026 • 18 min read
                    </p>
                    <p className="text-gray-600 text-sm line-clamp-3">
                      By 2030, AI-driven decision-making will redefine how
                      corporations make strategic decisions, manage risks, and
                      enforce governance with predictive analytics and AI
                      insights.
                    </p>
                  </div>

                  {/* Impact Rating */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">
                        Impact: Transformational
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <span>Corporate Strategy</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Framework Explainers Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex items-center justify-between mb-12">
              <div>
                <div className="flex items-center mb-4">
                  <div className="w-4 h-4 bg-blue-600 rounded-full mr-3"></div>
                  <span className="text-sm font-bold text-blue-600 uppercase tracking-wider">
                    Framework Explainers
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Framework Explainers
                </h2>
              </div>
              <button
                onClick={() =>
                  navigate("/marketplace/dtmi?tab=insights&filter=frameworks")
                }
                className="hidden md:flex items-center text-primary-600 hover:text-primary-700 font-semibold"
              >
                View All Frameworks
              </button>
            </div>

            {/* Grid layout with marketplace-style cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300 group">
                {/* Framework Image */}
                <div className="relative mb-6">
                  <div className="h-64 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg overflow-hidden">
                    {!imageErrors["framework1"] ? (
                      <img
                        src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                        alt="Digital Transformation Framework"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={() => handleImageError("framework1")}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-100">
                        <div className="text-center text-gray-600">
                          <div className="w-12 h-12 mx-auto mb-2 bg-blue-500 rounded-lg flex items-center justify-center text-white text-xl">
                            📊
                          </div>
                          <p className="text-sm font-medium">Framework Guide</p>
                        </div>
                      </div>
                    )}
                    <div className="absolute top-4 left-4">
                      <span className="bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full">
                        FRAMEWORK
                      </span>
                    </div>
                  </div>
                </div>

                {/* Framework Info */}
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                      Digital Transformation Maturity Framework
                    </h3>
                    <p className="text-sm text-gray-500 mb-3">
                      January 10, 2025 • 12 min read
                    </p>
                    <p className="text-gray-600 text-sm line-clamp-3">
                      A comprehensive framework for assessing and advancing your
                      organization's digital transformation maturity across key
                      dimensions.
                    </p>
                  </div>

                  {/* Impact Rating */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">
                        Impact: Strategic
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <span>Transformation</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300 group">
                {/* Framework Image */}
                <div className="relative mb-6">
                  <div className="h-64 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg overflow-hidden">
                    {!imageErrors["framework2"] ? (
                      <img
                        src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                        alt="Cognitive Organization Architecture"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={() => handleImageError("framework2")}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-green-100 to-emerald-100">
                        <div className="text-center text-gray-600">
                          <div className="w-12 h-12 mx-auto mb-2 bg-green-500 rounded-lg flex items-center justify-center text-white text-xl">
                            🏗️
                          </div>
                          <p className="text-sm font-medium">
                            Architecture Guide
                          </p>
                        </div>
                      </div>
                    )}
                    <div className="absolute top-4 left-4">
                      <span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full">
                        ARCHITECTURE
                      </span>
                    </div>
                  </div>
                </div>

                {/* Framework Info */}
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-green-600 transition-colors">
                      Cognitive Organization Architecture Framework
                    </h3>
                    <p className="text-sm text-gray-500 mb-3">
                      January 15, 2025 • 15 min read
                    </p>
                    <p className="text-gray-600 text-sm line-clamp-3">
                      Learn how to architect intelligent organizations that
                      leverage AI and cognitive technologies for adaptive
                      decision-making.
                    </p>
                  </div>

                  {/* Impact Rating */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">
                        Impact: Transformational
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <span>AI & Architecture</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300 group">
                {/* Framework Image */}
                <div className="relative mb-6">
                  <div className="h-64 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg overflow-hidden">
                    {!imageErrors["framework3"] ? (
                      <img
                        src="https://images.unsplash.com/photo-1553484771-371a605b060b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                        alt="Platform Business Model Strategy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={() => handleImageError("framework3")}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-100 to-violet-100">
                        <div className="text-center text-gray-600">
                          <div className="w-12 h-12 mx-auto mb-2 bg-purple-500 rounded-lg flex items-center justify-center text-white text-xl">
                            🎯
                          </div>
                          <p className="text-sm font-medium">
                            Strategy Framework
                          </p>
                        </div>
                      </div>
                    )}
                    <div className="absolute top-4 left-4">
                      <span className="bg-purple-100 text-purple-700 text-xs font-bold px-3 py-1 rounded-full">
                        STRATEGY
                      </span>
                    </div>
                  </div>
                </div>

                {/* Framework Info */}
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-purple-600 transition-colors">
                      Platform Business Model Framework
                    </h3>
                    <p className="text-sm text-gray-500 mb-3">
                      January 20, 2025 • 10 min read
                    </p>
                    <p className="text-gray-600 text-sm line-clamp-3">
                      A strategic framework for building and scaling
                      platform-based business models in the digital economy.
                    </p>
                  </div>

                  {/* Impact Rating */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">
                        Impact: Strategic
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <span>Business Strategy</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Sector-Specific Intelligence Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex items-center justify-between mb-12">
              <div>
                <div className="flex items-center mb-4">
                  <div className="w-4 h-4 bg-green-600 rounded-full mr-3"></div>
                  <span className="text-sm font-bold text-green-600 uppercase tracking-wider">
                    Sector-Specific Intelligence
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Sector-Specific Intelligence
                </h2>
              </div>
              <button
                onClick={() =>
                  navigate("/marketplace/dtmi?tab=insights&filter=industry")
                }
                className="hidden md:flex items-center text-primary-600 hover:text-primary-700 font-semibold"
              >
                View All Industry Analysis
              </button>
            </div>

            {/* Grid layout with marketplace-style cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300 group">
                {/* Industry Image */}
                <div className="relative mb-6">
                  <div className="h-64 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg overflow-hidden">
                    {!imageErrors["industry1"] ? (
                      <img
                        src="https://images.unsplash.com/photo-1565514020179-026b92b84bb6?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                        alt="Digital Manufacturing Industry 4.0"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={() => handleImageError("industry1")}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-green-100 to-emerald-100">
                        <div className="text-center text-gray-600">
                          <div className="w-12 h-12 mx-auto mb-2 bg-green-500 rounded-lg flex items-center justify-center text-white text-xl">
                            🏭
                          </div>
                          <p className="text-sm font-medium">
                            Manufacturing Analysis
                          </p>
                        </div>
                      </div>
                    )}
                    <div className="absolute top-4 left-4">
                      <span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full">
                        MANUFACTURING
                      </span>
                    </div>
                  </div>
                </div>

                {/* Industry Info */}
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-green-600 transition-colors">
                      Digital Manufacturing: Industry 4.0 Transformation
                    </h3>
                    <p className="text-sm text-gray-500 mb-3">
                      February 1, 2025 • 14 min read
                    </p>
                    <p className="text-gray-600 text-sm line-clamp-3">
                      Comprehensive analysis of how smart factories and IoT are
                      revolutionizing manufacturing operations and supply
                      chains.
                    </p>
                  </div>

                  {/* Impact Rating */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">
                        Impact: Transformational
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <span>Manufacturing</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300 group">
                {/* Industry Image */}
                <div className="relative mb-6">
                  <div className="h-64 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg overflow-hidden">
                    {!imageErrors["industry2"] ? (
                      <img
                        src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                        alt="AI-Powered Healthcare Digital Patient Experience"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={() => handleImageError("industry2")}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-100">
                        <div className="text-center text-gray-600">
                          <div className="w-12 h-12 mx-auto mb-2 bg-blue-500 rounded-lg flex items-center justify-center text-white text-xl">
                            🏥
                          </div>
                          <p className="text-sm font-medium">
                            Healthcare Analysis
                          </p>
                        </div>
                      </div>
                    )}
                    <div className="absolute top-4 left-4">
                      <span className="bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full">
                        HEALTHCARE
                      </span>
                    </div>
                  </div>
                </div>

                {/* Industry Info */}
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                      AI-Powered Healthcare: Digital Patient Experience
                    </h3>
                    <p className="text-sm text-gray-500 mb-3">
                      February 5, 2025 • 16 min read
                    </p>
                    <p className="text-gray-600 text-sm line-clamp-3">
                      Exploring how AI and digital technologies are transforming
                      patient care, diagnostics, and healthcare delivery
                      systems.
                    </p>
                  </div>

                  {/* Impact Rating */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">
                        Impact: Revolutionary
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <span>Healthcare</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300 group">
                {/* Industry Image */}
                <div className="relative mb-6">
                  <div className="h-64 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg overflow-hidden">
                    {!imageErrors["industry3"] ? (
                      <img
                        src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                        alt="Fintech Revolution Digital Banking"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={() => handleImageError("industry3")}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-100 to-violet-100">
                        <div className="text-center text-gray-600">
                          <div className="w-12 h-12 mx-auto mb-2 bg-purple-500 rounded-lg flex items-center justify-center text-white text-xl">
                            🏦
                          </div>
                          <p className="text-sm font-medium">
                            Financial Analysis
                          </p>
                        </div>
                      </div>
                    )}
                    <div className="absolute top-4 left-4">
                      <span className="bg-purple-100 text-purple-700 text-xs font-bold px-3 py-1 rounded-full">
                        FINANCIAL
                      </span>
                    </div>
                  </div>
                </div>

                {/* Industry Info */}
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-purple-600 transition-colors">
                      Fintech Revolution: Digital Banking Transformation
                    </h3>
                    <p className="text-sm text-gray-500 mb-3">
                      February 10, 2025 • 12 min read
                    </p>
                    <p className="text-gray-600 text-sm line-clamp-3">
                      Analysis of how digital-first banks and fintech
                      innovations are reshaping the financial services
                      landscape.
                    </p>
                  </div>

                  {/* Impact Rating */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">
                        Impact: Strategic
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <span>Financial Services</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Thought Leadership Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex items-center justify-between mb-12">
              <div>
                <div className="flex items-center mb-4">
                  <div className="w-4 h-4 bg-purple-600 rounded-full mr-3"></div>
                  <span className="text-sm font-bold text-purple-600 uppercase tracking-wider">
                    Thought Leadership
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Thought Leadership
                </h2>
              </div>
              <button
                onClick={() =>
                  navigate("/marketplace/dtmi?tab=insights&filter=expert")
                }
                className="hidden md:flex items-center text-primary-600 hover:text-primary-700 font-semibold"
              >
                View All Expert Commentary
              </button>
            </div>

            {/* Grid layout with marketplace-style cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300 group">
                {/* Commentary Image */}
                <div className="relative mb-6">
                  <div className="h-64 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg overflow-hidden">
                    {!imageErrors["thought1"] ? (
                      <img
                        src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                        alt="Future of Work Human-AI Collaboration"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={() => handleImageError("thought1")}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-100 to-violet-100">
                        <div className="text-center text-gray-600">
                          <div className="w-12 h-12 mx-auto mb-2 bg-purple-500 rounded-lg flex items-center justify-center text-white text-xl">
                            💡
                          </div>
                          <p className="text-sm font-medium">
                            Expert Commentary
                          </p>
                        </div>
                      </div>
                    )}
                    <div className="absolute top-4 left-4">
                      <span className="bg-purple-100 text-purple-700 text-xs font-bold px-3 py-1 rounded-full">
                        EXPERT VIEW
                      </span>
                    </div>
                  </div>
                </div>

                {/* Commentary Info */}
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-purple-600 transition-colors">
                      The Future of Work: Human-AI Collaboration
                    </h3>
                    <p className="text-sm text-gray-500 mb-3">
                      February 15, 2025 • 8 min read
                    </p>
                    <p className="text-gray-600 text-sm line-clamp-3">
                      Expert insights on how organizations can create effective
                      human-AI partnerships that enhance productivity and
                      innovation.
                    </p>
                  </div>

                  {/* Impact Rating */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">
                        Impact: Strategic
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <span>Future of Work</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300 group">
                {/* Commentary Image */}
                <div className="relative mb-6">
                  <div className="h-64 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg overflow-hidden">
                    {!imageErrors["thought2"] ? (
                      <img
                        src="https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                        alt="Cognitive Organizations Future Vision"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={() => handleImageError("thought2")}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-indigo-100 to-blue-100">
                        <div className="text-center text-gray-600">
                          <div className="w-12 h-12 mx-auto mb-2 bg-indigo-500 rounded-lg flex items-center justify-center text-white text-xl">
                            🔮
                          </div>
                          <p className="text-sm font-medium">Future Vision</p>
                        </div>
                      </div>
                    )}
                    <div className="absolute top-4 left-4">
                      <span className="bg-indigo-100 text-indigo-700 text-xs font-bold px-3 py-1 rounded-full">
                        COGNITIVE
                      </span>
                    </div>
                  </div>
                </div>

                {/* Commentary Info */}
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-indigo-600 transition-colors">
                      Cognitive Organizations: The Next Evolution
                    </h3>
                    <p className="text-sm text-gray-500 mb-3">
                      February 20, 2025 • 10 min read
                    </p>
                    <p className="text-gray-600 text-sm line-clamp-3">
                      Thought leadership on how cognitive technologies will
                      reshape organizational structures and decision-making
                      processes.
                    </p>
                  </div>

                  {/* Impact Rating */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">
                        Impact: Revolutionary
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <span>Organizational Design</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300 group">
                {/* Commentary Image */}
                <div className="relative mb-6">
                  <div className="h-64 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg overflow-hidden">
                    {!imageErrors["thought3"] ? (
                      <img
                        src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                        alt="Building Sustainable Digital Ecosystems"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={() => handleImageError("thought3")}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-teal-100 to-cyan-100">
                        <div className="text-center text-gray-600">
                          <div className="w-12 h-12 mx-auto mb-2 bg-teal-500 rounded-lg flex items-center justify-center text-white text-xl">
                            🌐
                          </div>
                          <p className="text-sm font-medium">
                            Platform Strategy
                          </p>
                        </div>
                      </div>
                    )}
                    <div className="absolute top-4 left-4">
                      <span className="bg-teal-100 text-teal-700 text-xs font-bold px-3 py-1 rounded-full">
                        ECOSYSTEM
                      </span>
                    </div>
                  </div>
                </div>

                {/* Commentary Info */}
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-teal-600 transition-colors">
                      Building Sustainable Digital Ecosystems
                    </h3>
                    <p className="text-sm text-gray-500 mb-3">
                      February 25, 2025 • 12 min read
                    </p>
                    <p className="text-gray-600 text-sm line-clamp-3">
                      Strategic insights on creating and maintaining digital
                      ecosystems that drive long-term value and competitive
                      advantage.
                    </p>
                  </div>

                  {/* Impact Rating */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">
                        Impact: Transformational
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <span>Platform Strategy</span>
                    </div>
                  </div>
                </div>
              </div>
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
        <Footer />
      </main>

      <ModernDQChatbot />
    </div>
  );
};

export default InsightsLandingPage;
