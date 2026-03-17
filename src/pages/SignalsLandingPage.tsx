import { Header } from "../components/Header/Header";
import { useNavigate } from "react-router-dom";
import { ContributorAdvertCards } from "../features/landing/components/ContributorAdvertCards";
import { NewsletterSignupForm } from "../features/landing/components/NewsletterSignupForm";
import { DTMIFooter } from "../features/landing/components/DTMIFooter";
import ModernDQChatbot from "../components/ModernDQChatbot";

const SignalsLandingPage = () => {
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
                Digital Transformation Signals
              </h1>
              <p className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed">
                Stay ahead with early indicators, trend alerts, and frontier
                watch insights that shape the future of digital transformation
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => navigate("/marketplace/dtmi?tab=signals")}
                  className="bg-primary-500 hover:bg-primary-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 shadow-lg"
                >
                  Explore Latest Signals
                </button>
                <button
                  onClick={() => navigate("/signals-alerts-signup")}
                  className="border-2 border-white text-white hover:bg-white hover:text-brand-navy px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200"
                >
                  Subscribe to Alerts
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Trend Alerts Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex items-center justify-between mb-12">
              <div>
                <div className="flex items-center mb-4">
                  <div className="w-4 h-4 bg-brand-coral rounded-full mr-3"></div>
                  <span className="text-sm font-bold text-brand-coral uppercase tracking-wider">
                    Trend Alerts
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Latest Market Movements
                </h2>
              </div>
              <button
                onClick={() =>
                  navigate("/marketplace/dtmi?tab=signals&filter=trend-alerts")
                }
                className="hidden md:flex items-center text-primary-600 hover:text-primary-700 font-semibold"
              >
                View All Alerts
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
              <div className="flex-shrink-0 w-80 bg-gradient-to-br from-red-50 to-orange-50 border border-red-200 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="bg-red-100 text-red-700 text-xs font-bold px-3 py-1 rounded-full">
                    URGENT
                  </span>
                  <span className="text-sm text-gray-500">2 hours ago</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  AI Adoption Accelerates 340% in Financial Services
                </h3>
                <p className="text-gray-600 mb-4 text-sm">
                  Major banks are rapidly deploying AI-powered customer service
                  solutions, with implementation rates surging across Fortune
                  500 financial institutions.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">Impact: High</span>
                  <button className="text-brand-coral hover:text-brand-coral/80 text-sm font-semibold">
                    Read Alert →
                  </button>
                </div>
              </div>

              <div className="flex-shrink-0 w-80 bg-gradient-to-br from-yellow-50 to-amber-50 border border-yellow-200 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="bg-yellow-100 text-yellow-700 text-xs font-bold px-3 py-1 rounded-full">
                    TRENDING
                  </span>
                  <span className="text-sm text-gray-500">6 hours ago</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Edge Computing Investment Triples in Manufacturing
                </h3>
                <p className="text-gray-600 mb-4 text-sm">
                  Manufacturing companies are investing heavily in edge
                  computing infrastructure to enable real-time decision making
                  and reduce latency.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">Impact: Medium</span>
                  <button className="text-brand-coral hover:text-brand-coral/80 text-sm font-semibold">
                    Read Alert →
                  </button>
                </div>
              </div>

              <div className="flex-shrink-0 w-80 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full">
                    EMERGING
                  </span>
                  <span className="text-sm text-gray-500">1 day ago</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Quantum-Safe Cryptography Adoption Begins
                </h3>
                <p className="text-gray-600 mb-4 text-sm">
                  Early adopters are beginning to implement quantum-resistant
                  encryption methods ahead of potential quantum computing
                  threats.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">Impact: Future</span>
                  <button className="text-brand-coral hover:text-brand-coral/80 text-sm font-semibold">
                    Read Alert →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Frontier Watch Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center mb-4">
                <div className="w-4 h-4 bg-primary-500 rounded-full mr-3"></div>
                <span className="text-sm font-bold text-primary-500 uppercase tracking-wider">
                  Frontier Watch
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Breakthrough Technologies
              </h2>
            </div>

            {/* Grid layout with featured card */}
            <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {/* Featured large card */}
              <div className="lg:col-span-2 bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="h-48 bg-gradient-to-r from-purple-600 to-blue-600 relative">
                  <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                  {/* Visual placeholder - quantum circuit pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <svg
                      className="w-full h-full"
                      viewBox="0 0 400 200"
                      fill="none"
                    >
                      <circle cx="50" cy="100" r="8" fill="white" />
                      <circle cx="150" cy="100" r="8" fill="white" />
                      <circle cx="250" cy="100" r="8" fill="white" />
                      <circle cx="350" cy="100" r="8" fill="white" />
                      <line
                        x1="58"
                        y1="100"
                        x2="142"
                        y2="100"
                        stroke="white"
                        strokeWidth="2"
                      />
                      <line
                        x1="158"
                        y1="100"
                        x2="242"
                        y2="100"
                        stroke="white"
                        strokeWidth="2"
                      />
                      <line
                        x1="258"
                        y1="100"
                        x2="342"
                        y2="100"
                        stroke="white"
                        strokeWidth="2"
                      />
                      <rect
                        x="140"
                        y="90"
                        width="20"
                        height="20"
                        fill="none"
                        stroke="white"
                        strokeWidth="2"
                      />
                      <rect
                        x="240"
                        y="90"
                        width="20"
                        height="20"
                        fill="none"
                        stroke="white"
                        strokeWidth="2"
                      />
                    </svg>
                  </div>
                  <div className="absolute bottom-4 left-6 text-white">
                    <span className="bg-white bg-opacity-20 text-xs font-bold px-3 py-1 rounded-full mb-2 inline-block">
                      BREAKTHROUGH
                    </span>
                    <h3 className="text-2xl font-bold mb-2">
                      Quantum Computing Achieves Commercial Viability
                    </h3>
                    <p className="text-sm opacity-90">
                      Major breakthrough in quantum error correction enables
                      practical applications
                    </p>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 mb-4">
                    IBM and Google announce significant advances in quantum
                    error correction, bringing quantum computing closer to
                    solving real-world business problems in optimization,
                    cryptography, and drug discovery.
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      Published 3 days ago
                    </span>
                    <button className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-semibold">
                      Read Full Report
                    </button>
                  </div>
                </div>
              </div>

              {/* Side cards */}
              <div className="space-y-6">
                <div className="bg-white rounded-xl p-6 shadow-md relative overflow-hidden">
                  {/* Neural network visual placeholder */}
                  <div className="absolute top-2 right-2 opacity-10">
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                      <circle cx="8" cy="12" r="3" fill="currentColor" />
                      <circle cx="20" cy="8" r="3" fill="currentColor" />
                      <circle cx="20" cy="20" r="3" fill="currentColor" />
                      <circle cx="32" cy="12" r="3" fill="currentColor" />
                      <line
                        x1="11"
                        y1="12"
                        x2="17"
                        y2="10"
                        stroke="currentColor"
                        strokeWidth="1"
                      />
                      <line
                        x1="11"
                        y1="12"
                        x2="17"
                        y2="18"
                        stroke="currentColor"
                        strokeWidth="1"
                      />
                      <line
                        x1="23"
                        y1="10"
                        x2="29"
                        y2="12"
                        stroke="currentColor"
                        strokeWidth="1"
                      />
                      <line
                        x1="23"
                        y1="18"
                        x2="29"
                        y2="12"
                        stroke="currentColor"
                        strokeWidth="1"
                      />
                    </svg>
                  </div>
                  <span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full mb-3 inline-block">
                    INNOVATION
                  </span>
                  <h4 className="text-lg font-bold text-gray-900 mb-2">
                    Neural Interface Technology Advances
                  </h4>
                  <p className="text-gray-600 text-sm mb-3">
                    Brain-computer interfaces show promise for enterprise
                    applications
                  </p>
                  <button className="text-primary-600 hover:text-primary-700 text-sm font-semibold">
                    Learn More →
                  </button>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-md relative overflow-hidden">
                  {/* 6G network visual placeholder */}
                  <div className="absolute top-2 right-2 opacity-10">
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                      <circle
                        cx="20"
                        cy="20"
                        r="15"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1"
                      />
                      <circle
                        cx="20"
                        cy="20"
                        r="10"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1"
                      />
                      <circle
                        cx="20"
                        cy="20"
                        r="5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1"
                      />
                      <circle cx="20" cy="20" r="2" fill="currentColor" />
                      <path
                        d="M20 5 L25 10 L20 15 L15 10 Z"
                        fill="currentColor"
                        opacity="0.5"
                      />
                      <path
                        d="M35 20 L30 25 L25 20 L30 15 Z"
                        fill="currentColor"
                        opacity="0.5"
                      />
                      <path
                        d="M20 35 L15 30 L20 25 L25 30 Z"
                        fill="currentColor"
                        opacity="0.5"
                      />
                      <path
                        d="M5 20 L10 15 L15 20 L10 25 Z"
                        fill="currentColor"
                        opacity="0.5"
                      />
                    </svg>
                  </div>
                  <span className="bg-purple-100 text-purple-700 text-xs font-bold px-3 py-1 rounded-full mb-3 inline-block">
                    RESEARCH
                  </span>
                  <h4 className="text-lg font-bold text-gray-900 mb-2">
                    6G Network Architecture Unveiled
                  </h4>
                  <p className="text-gray-600 text-sm mb-3">
                    Next-generation wireless technology promises unprecedented
                    speeds
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
                  navigate(
                    "/marketplace/dtmi?tab=signals&filter=frontier-watch",
                  )
                }
                className="bg-primary-500 hover:bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200"
              >
                Explore All Frontier Technologies
              </button>
            </div>
          </div>
        </section>

        {/* Executive Brief Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex items-center justify-between mb-12">
              <div>
                <div className="flex items-center mb-4">
                  <div className="w-4 h-4 bg-blue-600 rounded-full mr-3"></div>
                  <span className="text-sm font-bold text-blue-600 uppercase tracking-wider">
                    Executive Brief
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Strategic Intelligence
                </h2>
              </div>
            </div>

            {/* List-style layout */}
            <div className="max-w-4xl mx-auto space-y-6">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-600 rounded-lg p-6 hover:shadow-md transition-shadow relative overflow-hidden">
                {/* ROI chart visual placeholder */}
                <div className="absolute top-4 right-4 opacity-10">
                  <svg width="60" height="40" viewBox="0 0 60 40" fill="none">
                    <rect
                      x="5"
                      y="30"
                      width="8"
                      height="8"
                      fill="currentColor"
                    />
                    <rect
                      x="18"
                      y="25"
                      width="8"
                      height="13"
                      fill="currentColor"
                    />
                    <rect
                      x="31"
                      y="15"
                      width="8"
                      height="23"
                      fill="currentColor"
                    />
                    <rect
                      x="44"
                      y="8"
                      width="8"
                      height="30"
                      fill="currentColor"
                    />
                    <path
                      d="M9 30 L22 25 L35 15 L48 8"
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="none"
                    />
                  </svg>
                </div>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-1 rounded mr-3">
                        STRATEGIC
                      </span>
                      <span className="text-sm text-gray-500">
                        Executive Summary • 5 min read
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      Digital Transformation ROI: What C-Suite Leaders Need to
                      Know
                    </h3>
                    <p className="text-gray-600 mb-3">
                      Analysis of digital transformation investments across 200+
                      enterprises reveals key success factors and common
                      pitfalls that impact ROI.
                    </p>
                    <div className="flex items-center text-sm text-gray-500">
                      <span>
                        Key Insights: Budget Planning, Technology Stack, Change
                        Management
                      </span>
                    </div>
                  </div>
                  <button className="ml-6 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold">
                    Read Brief
                  </button>
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-600 rounded-lg p-6 hover:shadow-md transition-shadow relative overflow-hidden">
                {/* AI scaling visual placeholder */}
                <div className="absolute top-4 right-4 opacity-10">
                  <svg width="60" height="40" viewBox="0 0 60 40" fill="none">
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
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded mr-3">
                        OPERATIONAL
                      </span>
                      <span className="text-sm text-gray-500">
                        Market Analysis • 4 min read
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      AI Implementation: Scaling Beyond Pilot Programs
                    </h3>
                    <p className="text-gray-600 mb-3">
                      How leading organizations are moving from AI
                      experimentation to enterprise-wide deployment and
                      measurable business impact.
                    </p>
                    <div className="flex items-center text-sm text-gray-500">
                      <span>
                        Key Insights: Scaling Strategy, Infrastructure,
                        Governance
                      </span>
                    </div>
                  </div>
                  <button className="ml-6 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-semibold">
                    Read Brief
                  </button>
                </div>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-violet-50 border-l-4 border-purple-600 rounded-lg p-6 hover:shadow-md transition-shadow relative overflow-hidden">
                {/* Cloud architecture visual placeholder */}
                <div className="absolute top-4 right-4 opacity-10">
                  <svg width="60" height="40" viewBox="0 0 60 40" fill="none">
                    <path
                      d="M15 25 C10 25 8 20 12 18 C12 15 15 12 20 12 C25 12 28 15 28 18 C32 20 30 25 25 25 Z"
                      fill="currentColor"
                    />
                    <path
                      d="M35 30 C32 30 30 27 33 25 C33 23 35 21 38 21 C41 21 43 23 43 25 C46 27 45 30 42 30 Z"
                      fill="currentColor"
                    />
                    <path
                      d="M25 35 C22 35 20 32 23 30 C23 28 25 26 28 26 C31 26 33 28 33 30 C36 32 35 35 32 35 Z"
                      fill="currentColor"
                    />
                    <line
                      x1="20"
                      y1="25"
                      x2="35"
                      y2="25"
                      stroke="currentColor"
                      strokeWidth="1"
                      strokeDasharray="2,2"
                    />
                    <line
                      x1="28"
                      y1="30"
                      x2="38"
                      y2="25"
                      stroke="currentColor"
                      strokeWidth="1"
                      strokeDasharray="2,2"
                    />
                  </svg>
                </div>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <span className="bg-purple-100 text-purple-700 text-xs font-bold px-2 py-1 rounded mr-3">
                        COMPETITIVE
                      </span>
                      <span className="text-sm text-gray-500">
                        Industry Report • 6 min read
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      Cloud-First Strategy: Lessons from Market Leaders
                    </h3>
                    <p className="text-gray-600 mb-3">
                      Comparative analysis of cloud adoption strategies from
                      top-performing companies and their impact on operational
                      efficiency and innovation.
                    </p>
                    <div className="flex items-center text-sm text-gray-500">
                      <span>
                        Key Insights: Migration Strategy, Cost Optimization,
                        Security
                      </span>
                    </div>
                  </div>
                  <button className="ml-6 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-semibold">
                    Read Brief
                  </button>
                </div>
              </div>
            </div>

            <div className="text-center mt-12">
              <button
                onClick={() =>
                  navigate(
                    "/marketplace/dtmi?tab=signals&filter=executive-brief",
                  )
                }
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200"
              >
                Access All Executive Briefs
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
                Dive deeper into our comprehensive digital transformation
                intelligence ecosystem
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Insights
                </h3>
                <p className="text-gray-600 mb-6">
                  Actionable intelligence and expert perspectives on digital
                  transformation trends
                </p>
                <button
                  onClick={() => navigate("/insights")}
                  className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200"
                >
                  Explore Insights
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

export default SignalsLandingPage;
