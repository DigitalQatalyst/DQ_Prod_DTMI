import { useNavigate } from "react-router-dom";
import { ArrowRight, Brain, ArrowLeft } from "lucide-react";
import { WeekHighlightsDeepAnalysis } from "./components/WeekHighlightsDeepAnalysis";
import { EditorsPickDeepAnalysis } from "./components/EditorsPickDeepAnalysis";
import { FilterableDeepAnalysis } from "./components/FilterableDeepAnalysis";

interface DeepAnalysisContentProps {
  onBackToHome: () => void;
}

export const DeepAnalysisContent: React.FC<DeepAnalysisContentProps> = ({
  onBackToHome,
}) => {
  const navigate = useNavigate();

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 via-purple-500 to-purple-400 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            {/* Back Button */}
            <button
              onClick={onBackToHome}
              className="inline-flex items-center gap-2 text-white hover:text-purple-100 mb-6 transition-colors"
            >
              <ArrowLeft size={20} />
              <span>Back to DTMI Home</span>
            </button>

            <div className="flex items-center gap-3 mb-6">
              <Brain size={48} className="text-white" />
              <span className="text-sm font-bold uppercase tracking-wider">
                LAYER 03
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Deep Analysis
            </h1>
            <p className="text-2xl mb-8 text-purple-50">Strategic Research</p>
            <p className="text-xl mb-8 leading-relaxed text-purple-50">
              Advanced intellectual assets including research reports,
              prediction analysis, and strategic frameworks shaping Economy 4.0.
              Comprehensive research for strategic decision-making and long-term
              planning.
            </p>
            <button
              onClick={() => navigate("/marketplace/dtmi?tab=deep-analysis")}
              className="inline-flex items-center gap-3 bg-white text-purple-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-purple-50 transition-all shadow-lg hover:shadow-xl"
            >
              <span>Explore All Deep Analysis</span>
              <ArrowRight size={24} />
            </button>
          </div>
        </div>
      </section>

      {/* Week's Highlights Section */}
      <WeekHighlightsDeepAnalysis />

      {/* Editor's Pick Section */}
      <EditorsPickDeepAnalysis />

      {/* Filterable Deep Analysis Section */}
      <FilterableDeepAnalysis />

      {/* Newsletter Signup CTA */}
      <section className="py-16 bg-gradient-to-r from-purple-50 to-purple-100">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Get Strategic Analysis in Your Inbox
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Subscribe to receive whitepapers, research reports, and prediction
            analysis for deep strategic thinking delivered directly to your
            inbox.
          </p>

          {/* Email Signup Form */}
          <div className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-base"
              />
              <button
                onClick={() => navigate("/newsletter-signup")}
                className="inline-flex items-center justify-center gap-2 bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold text-base hover:bg-purple-700 transition-all shadow-lg whitespace-nowrap"
              >
                <span>Subscribe</span>
                <ArrowRight size={20} />
              </button>
            </div>
            <p className="text-sm text-gray-500 mt-3">
              Join 5,000+ strategic leaders accessing deep analysis and research
              insights
            </p>
          </div>
        </div>
      </section>
    </>
  );
};
