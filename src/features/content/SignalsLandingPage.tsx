import { Header } from "../../shared/Header/Header";
import { useNavigate } from "react-router-dom";
import { ContributorAdvertCards } from "../landing/components/ContributorAdvertCards";
import { NewsletterSignupForm } from "../landing/components/NewsletterSignupForm";
import { Footer } from "../../shared/Footer/Footer";
import ModernDQChatbot from "../../shared/ModernDQChatbot";

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
              </button>
            </div>

            {/* Grid layout with marketplace-style cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300 group">
                {/* Alert Image */}
                <div className="relative mb-6">
                  <div className="h-64 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                      alt="AI Financial Services"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        const parent = target.parentElement!;
                        parent.innerHTML = `
                          <div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-red-100 to-orange-100">
                            <div class="text-center text-gray-600">
                              <div class="w-12 h-12 mx-auto mb-2 bg-red-500 rounded-lg flex items-center justify-center text-white text-xl">
                                🚨
                              </div>
                              <p class="text-sm font-medium">Urgent Alert</p>
                            </div>
                          </div>
                        `;
                      }}
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-red-100 text-red-700 text-xs font-bold px-3 py-1 rounded-full">
                        URGENT
                      </span>
                    </div>
                  </div>
                </div>

                {/* Alert Info */}
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-red-600 transition-colors">
                      AI Adoption Accelerates 340% in Financial Services
                    </h3>
                    <p className="text-sm text-gray-500 mb-3">2 hours ago</p>
                    <p className="text-gray-600 text-sm line-clamp-3">
                      Major banks are rapidly deploying AI-powered customer
                      service solutions, with implementation rates surging
                      across Fortune 500 financial institutions.
                    </p>
                  </div>

                  {/* Impact Rating */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">
                        Impact: High
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <span>Financial Services</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300 group">
                {/* Alert Image */}
                <div className="relative mb-6">
                  <div className="h-64 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                      alt="Edge Computing Manufacturing"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        const parent = target.parentElement!;
                        parent.innerHTML = `
                          <div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-yellow-100 to-amber-100">
                            <div class="text-center text-gray-600">
                              <div class="w-12 h-12 mx-auto mb-2 bg-yellow-500 rounded-lg flex items-center justify-center text-white text-xl">
                                📈
                              </div>
                              <p class="text-sm font-medium">Trending Alert</p>
                            </div>
                          </div>
                        `;
                      }}
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-yellow-100 text-yellow-700 text-xs font-bold px-3 py-1 rounded-full">
                        TRENDING
                      </span>
                    </div>
                  </div>
                </div>

                {/* Alert Info */}
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-yellow-600 transition-colors">
                      Edge Computing Investment Triples in Manufacturing
                    </h3>
                    <p className="text-sm text-gray-500 mb-3">6 hours ago</p>
                    <p className="text-gray-600 text-sm line-clamp-3">
                      Manufacturing companies are investing heavily in edge
                      computing infrastructure to enable real-time decision
                      making and reduce latency.
                    </p>
                  </div>

                  {/* Impact Rating */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">
                        Impact: Medium
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <span>Manufacturing</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300 group">
                {/* Alert Image */}
                <div className="relative mb-6">
                  <div className="h-64 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                      alt="Quantum Cryptography"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        const parent = target.parentElement!;
                        parent.innerHTML = `
                          <div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-100">
                            <div class="text-center text-gray-600">
                              <div class="w-12 h-12 mx-auto mb-2 bg-blue-500 rounded-lg flex items-center justify-center text-white text-xl">
                                💡
                              </div>
                              <p class="text-sm font-medium">Emerging Tech</p>
                            </div>
                          </div>
                        `;
                      }}
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full">
                        EMERGING
                      </span>
                    </div>
                  </div>
                </div>

                {/* Alert Info */}
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                      Quantum-Safe Cryptography Adoption Begins
                    </h3>
                    <p className="text-sm text-gray-500 mb-3">1 day ago</p>
                    <p className="text-gray-600 text-sm line-clamp-3">
                      Early adopters are beginning to implement
                      quantum-resistant encryption methods ahead of potential
                      quantum computing threats.
                    </p>
                  </div>

                  {/* Impact Rating */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">
                        Impact: Future
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <span>Cybersecurity</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Frontier Watch Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex items-center justify-between mb-12">
              <div>
                <div className="flex items-center mb-4">
                  <div className="w-4 h-4 bg-primary-500 rounded-full mr-3"></div>
                  <span className="text-sm font-bold text-primary-500 uppercase tracking-wider">
                    Frontier Watch
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Breakthrough Technologies
                </h2>
              </div>
              <button
                onClick={() =>
                  navigate(
                    "/marketplace/dtmi?tab=signals&filter=frontier-watch",
                  )
                }
                className="hidden md:flex items-center text-primary-600 hover:text-primary-700 font-semibold"
              >
                Explore All Frontier Technologies
              </button>
            </div>

            {/* Grid layout with prominent featured card */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
              {/* Featured large card - spans 2 columns, more prominent */}
              <div className="lg:col-span-2 bg-white border border-gray-200 rounded-xl p-8 hover:shadow-lg transition-all duration-300 group">
                {/* Technology Image - Larger and more prominent */}
                <div className="relative mb-8">
                  <div className="h-80 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                      alt="Quantum Computing Technology"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        const parent = target.parentElement!;
                        parent.innerHTML = `
                          <div class="w-full h-full flex items-center justify-center bg-gradient-to-r from-purple-600 to-blue-600 relative">
                            <div class="absolute inset-0 bg-black bg-opacity-20"></div>
                            <div class="text-center text-white relative z-10">
                              <div class="w-20 h-20 mx-auto mb-4 bg-white bg-opacity-20 rounded-lg flex items-center justify-center text-5xl">
                                ⚛️
                              </div>
                              <p class="text-lg font-medium">Quantum Computing</p>
                            </div>
                          </div>
                        `;
                      }}
                    />
                    <div className="absolute bottom-6 left-6 text-white">
                      <span className="bg-white bg-opacity-20 text-sm font-bold px-4 py-2 rounded-full mb-2 inline-block">
                        BREAKTHROUGH
                      </span>
                    </div>
                  </div>
                </div>

                {/* Technology Info */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-3xl font-bold text-gray-900 mb-4 group-hover:text-purple-600 transition-colors">
                      Quantum Computing Achieves Commercial Viability
                    </h3>
                    <p className="text-base text-gray-500 mb-4">
                      Published 3 days ago
                    </p>
                    <p className="text-gray-600 text-base leading-relaxed">
                      IBM and Google announce significant advances in quantum
                      error correction, bringing quantum computing closer to
                      solving real-world business problems in optimization,
                      cryptography, and drug discovery. Major breakthrough in
                      quantum error correction enables practical applications.
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
                      <span>Quantum Technology</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Side cards */}
              <div className="space-y-6">
                <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300 group">
                  {/* Technology Image */}
                  <div className="relative mb-6">
                    <div className="h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg overflow-hidden">
                      <img
                        src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                        alt="Neural Interface Technology"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          const parent = target.parentElement!;
                          parent.innerHTML = `
                            <div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-green-100 to-emerald-100">
                              <div class="text-center text-gray-600">
                                <div class="w-12 h-12 mx-auto mb-2 bg-green-500 rounded-lg flex items-center justify-center text-white text-xl">
                                  🧠
                                </div>
                                <p class="text-sm font-medium">Neural Interface</p>
                              </div>
                            </div>
                          `;
                        }}
                      />
                      <div className="absolute top-2 right-2">
                        <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded-full">
                          INNOVATION
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Technology Info */}
                  <div className="space-y-3">
                    <h4 className="text-lg font-bold text-gray-900 group-hover:text-green-600 transition-colors">
                      Neural Interface Technology Advances
                    </h4>
                    <p className="text-gray-600 text-sm line-clamp-2">
                      Brain-computer interfaces show promise for enterprise
                      applications
                    </p>
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600">
                          Impact: Emerging
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <span>Neurotechnology</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300 group">
                  {/* Technology Image */}
                  <div className="relative mb-6">
                    <div className="h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg overflow-hidden">
                      <img
                        src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                        alt="6G Network Technology"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          const parent = target.parentElement!;
                          parent.innerHTML = `
                            <div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-100 to-violet-100">
                              <div class="text-center text-gray-600">
                                <div class="w-12 h-12 mx-auto mb-2 bg-purple-500 rounded-lg flex items-center justify-center text-white text-xl">
                                  📡
                                </div>
                                <p class="text-sm font-medium">6G Network</p>
                              </div>
                            </div>
                          `;
                        }}
                      />
                      <div className="absolute top-2 right-2">
                        <span className="bg-purple-100 text-purple-700 text-xs font-bold px-2 py-1 rounded-full">
                          RESEARCH
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Technology Info */}
                  <div className="space-y-3">
                    <h4 className="text-lg font-bold text-gray-900 group-hover:text-purple-600 transition-colors">
                      6G Network Architecture Unveiled
                    </h4>
                    <p className="text-gray-600 text-sm line-clamp-2">
                      Next-generation wireless technology promises unprecedented
                      speeds
                    </p>
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600">
                          Impact: Future
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <span>Telecommunications</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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
              <button
                onClick={() =>
                  navigate(
                    "/marketplace/dtmi?tab=signals&filter=executive-brief",
                  )
                }
                className="hidden md:flex items-center text-primary-600 hover:text-primary-700 font-semibold"
              >
                View All Briefs
              </button>
            </div>

            {/* Grid layout with marketplace-style cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
              <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300 group">
                {/* Brief Image */}
                <div className="relative mb-6">
                  <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                      alt="Digital Transformation ROI"
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
                              <p class="text-sm font-medium">Strategic Brief</p>
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

                {/* Brief Info */}
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                      Digital Transformation ROI: What C-Suite Leaders Need to
                      Know
                    </h3>
                    <p className="text-sm text-gray-500 mb-3">
                      Executive Summary • 5 min read
                    </p>
                    <p className="text-gray-600 text-sm line-clamp-3">
                      Analysis of digital transformation investments across 200+
                      enterprises reveals key success factors and common
                      pitfalls that impact ROI.
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
                      <span>Budget Planning</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300 group">
                {/* Brief Image */}
                <div className="relative mb-6">
                  <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                      alt="AI Implementation"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        const parent = target.parentElement!;
                        parent.innerHTML = `
                          <div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-green-100 to-emerald-100">
                            <div class="text-center text-gray-600">
                              <div class="w-12 h-12 mx-auto mb-2 bg-green-500 rounded-lg flex items-center justify-center text-white text-xl">
                                ⚡
                              </div>
                              <p class="text-sm font-medium">Operational Brief</p>
                            </div>
                          </div>
                        `;
                      }}
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full">
                        OPERATIONAL
                      </span>
                    </div>
                  </div>
                </div>

                {/* Brief Info */}
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-green-600 transition-colors">
                      AI Implementation: Scaling Beyond Pilot Programs
                    </h3>
                    <p className="text-sm text-gray-500 mb-3">
                      Market Analysis • 4 min read
                    </p>
                    <p className="text-gray-600 text-sm line-clamp-3">
                      How leading organizations are moving from AI
                      experimentation to enterprise-wide deployment and
                      measurable business impact.
                    </p>
                  </div>

                  {/* Impact Rating */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">
                        Impact: Operational
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <span>Scaling Strategy</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300 group">
                {/* Brief Image */}
                <div className="relative mb-6">
                  <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                      alt="Cloud Strategy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        const parent = target.parentElement!;
                        parent.innerHTML = `
                          <div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-100 to-violet-100">
                            <div class="text-center text-gray-600">
                              <div class="w-12 h-12 mx-auto mb-2 bg-purple-500 rounded-lg flex items-center justify-center text-white text-xl">
                                ☁️
                              </div>
                              <p class="text-sm font-medium">Competitive Brief</p>
                            </div>
                          </div>
                        `;
                      }}
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-purple-100 text-purple-700 text-xs font-bold px-3 py-1 rounded-full">
                        COMPETITIVE
                      </span>
                    </div>
                  </div>
                </div>

                {/* Brief Info */}
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-purple-600 transition-colors">
                      Cloud-First Strategy: Lessons from Market Leaders
                    </h3>
                    <p className="text-sm text-gray-500 mb-3">
                      Industry Report • 6 min read
                    </p>
                    <p className="text-gray-600 text-sm line-clamp-3">
                      Comparative analysis of cloud adoption strategies from
                      top-performing companies and their impact on operational
                      efficiency and innovation.
                    </p>
                  </div>

                  {/* Impact Rating */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">
                        Impact: Competitive
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <span>Migration Strategy</span>
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

            {/* Card grid layout matching screenshot */}
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Signals
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Early indicators and trend alerts that help you stay ahead of
                  the curve
                </p>
                <button
                  onClick={() => navigate("/signals")}
                  className="bg-brand-coral hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  Explore Signals
                </button>
              </div>

              <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Deep Analysis
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Comprehensive research reports and strategic insights for
                  informed decision-making
                </p>
                <button
                  onClick={() => navigate("/research")}
                  className="bg-brand-coral hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
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

export default SignalsLandingPage;
