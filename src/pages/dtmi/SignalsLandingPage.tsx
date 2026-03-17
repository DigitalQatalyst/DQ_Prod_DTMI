import { Header } from "../../shared/Header/Header";
import { Footer } from "../../shared/Footer/Footer";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  TrendingUp,
  Zap,
  Clock,
  Target,
  Lightbulb,
} from "lucide-react";
import ModernDQChatbot from "../../shared/ModernDQChatbot";
import { WeekHighlights } from "./components/WeekHighlights";
import { EditorsPick } from "./components/EditorsPick";
import { FilterableSignals } from "../../features/dtmi/content-tabs/components/FilterableSignals";
import { ContributorAdvertCards } from "../../features/landing/components/ContributorAdvertCards";
import { DTMIFooter } from "../../features/landing/components/DTMIFooter";

const SignalsLandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col w-full min-h-screen bg-white">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-orange-600 via-orange-500 to-orange-400 text-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl">
              <div className="flex items-center gap-3 mb-6">
                <Zap size={48} className="text-white" />
                <span className="text-sm font-bold uppercase tracking-wider">
                  LAYER 01
                </span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6">Signals</h1>
              <p className="text-2xl mb-8 text-orange-50">
                Early Digital Signals
              </p>
              <p className="text-xl mb-8 leading-relaxed text-orange-50">
                Short-form intellectual assets highlighting emerging trends,
                market shifts, and early digital patterns shaping the future
                economy. Stay ahead with real-time insights into the digital
                transformation landscape.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => navigate("/marketplace/dtmi?tab=signals")}
                  className="inline-flex items-center gap-3 bg-white text-orange-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-orange-50 transition-all shadow-lg hover:shadow-xl"
                >
                  <span>Explore All Signals</span>
                  <ArrowRight size={24} />
                </button>
                <button
                  onClick={() => navigate("/dtmi/research-panel")}
                  className="inline-flex items-center gap-3 bg-orange-700 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-orange-800 transition-all border-2 border-white/20"
                >
                  <Lightbulb size={20} />
                  <span>Join Research Panel</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Week's Highlights */}
        <WeekHighlights />

        {/* What You'll Find Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                What You'll Find in Signals
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Discover early indicators and emerging patterns that shape the
                future of digital transformation
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-xl shadow-md border-l-4 border-orange-500 hover:shadow-lg transition-shadow">
                <TrendingUp className="text-orange-600 mb-4" size={40} />
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Trend Alerts
                </h3>
                <p className="text-gray-600">
                  Real-time analysis of emerging market patterns, technology
                  shifts, and industry movements that signal transformative
                  change.
                </p>
              </div>
              <div className="bg-white p-8 rounded-xl shadow-md border-l-4 border-orange-500 hover:shadow-lg transition-shadow">
                <Clock className="text-orange-600 mb-4" size={40} />
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Frontier Watch
                </h3>
                <p className="text-gray-600">
                  Bite-sized commentary and perspectives on breaking
                  developments in digital transformation and Economy 4.0.
                </p>
              </div>
              <div className="bg-white p-8 rounded-xl shadow-md border-l-4 border-orange-500 hover:shadow-lg transition-shadow">
                <Target className="text-orange-600 mb-4" size={40} />
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Early Indicators
                </h3>
                <p className="text-gray-600">
                  Spot weak signals and early indicators that help you
                  anticipate future disruptions before they become mainstream.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Editor's Pick */}
        <EditorsPick />

        {/* Filterable Signals */}
        <FilterableSignals />

        {/* Intelligence Layers Cross-Promotion */}
        <section className="py-16 bg-orange-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Explore Other Intelligence Layers
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Dive deeper into our comprehensive digital transformation
                intelligence ecosystem
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Insights */}
              <div className="bg-white rounded-lg p-8 shadow-md hover:shadow-lg transition-all duration-300">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                    <TrendingUp className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Insights</h3>
                </div>
                <p className="text-gray-600 mb-6">
                  Structured analysis and expert commentary on digital
                  transformation patterns, providing deeper context to emerging
                  signals.
                </p>
                <button
                  onClick={() => navigate("/dtmi/insights")}
                  className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Explore Insights
                  <ArrowRight size={16} />
                </button>
              </div>

              {/* Deep Analysis */}
              <div className="bg-white rounded-lg p-8 shadow-md hover:shadow-lg transition-all duration-300">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                    <Target className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    Deep Analysis
                  </h3>
                </div>
                <p className="text-gray-600 mb-6">
                  Comprehensive research and in-depth analysis of digital
                  transformation patterns, providing strategic insights for
                  decision makers.
                </p>
                <button
                  onClick={() => navigate("/dtmi/deep-analysis")}
                  className="inline-flex items-center gap-2 bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
                >
                  Explore Analysis
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Contributor CTA */}
        <ContributorAdvertCards />

        {/* Final CTA Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Ready to Explore Signals?
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Access our curated collection of early digital signals and stay
              ahead of the transformation curve.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate("/marketplace/dtmi?tab=signals")}
                className="inline-flex items-center gap-3 bg-orange-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-orange-700 transition-all shadow-lg"
              >
                <span>Browse All Signals</span>
                <ArrowRight size={24} />
              </button>
              <button
                onClick={() => navigate("/newsletter-signup")}
                className="inline-flex items-center gap-3 bg-white text-orange-600 border-2 border-orange-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-orange-50 transition-all"
              >
                <span>Get Signal Alerts</span>
              </button>
            </div>
          </div>
        </section>
      </main>

      <DTMIFooter />
      <ModernDQChatbot />
    </div>
  );
};

export default SignalsLandingPage;
