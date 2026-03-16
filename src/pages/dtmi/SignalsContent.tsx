import { useNavigate } from "react-router-dom";
import { ArrowRight, TrendingUp, Zap, ArrowLeft } from "lucide-react";
import { WeekHighlights } from "./components/WeekHighlights";
import { EditorsPick } from "./components/EditorsPick";
import { FilterableSignals } from "./components/FilterableSignals";

interface SignalsContentProps {
  onBackToHome: () => void;
}

export const SignalsContent: React.FC<SignalsContentProps> = ({
  onBackToHome,
}) => {
  const navigate = useNavigate();

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-600 via-orange-500 to-orange-400 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            {/* Back Button */}
            <button
              onClick={onBackToHome}
              className="inline-flex items-center gap-2 text-white hover:text-orange-100 mb-6 transition-colors"
            >
              <ArrowLeft size={20} />
              <span>Back to DTMI Home</span>
            </button>

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
            <button
              onClick={() => navigate("/marketplace/dtmi?tab=signals")}
              className="inline-flex items-center gap-3 bg-white text-orange-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-orange-50 transition-all shadow-lg hover:shadow-xl"
            >
              <span>Explore All Signals</span>
              <ArrowRight size={24} />
            </button>
          </div>
        </div>
      </section>

      {/* Week's Highlights Section */}
      <WeekHighlights />

      {/* Editor's Pick Section */}
      <EditorsPick />

      {/* Filterable Signals Section */}
      <FilterableSignals />

      {/* Newsletter Signup CTA */}
      <section className="py-16 bg-gradient-to-r from-orange-50 to-orange-100">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Get Latest Signals in Your Inbox
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Subscribe to receive curated digital signals, emerging trends, and
            early indicators delivered directly to your inbox every week.
          </p>

          {/* Email Signup Form */}
          <div className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-base"
              />
              <button
                onClick={() => navigate("/newsletter-signup")}
                className="inline-flex items-center justify-center gap-2 bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold text-base hover:bg-orange-700 transition-all shadow-lg whitespace-nowrap"
              >
                <span>Subscribe</span>
                <ArrowRight size={20} />
              </button>
            </div>
            <p className="text-sm text-gray-500 mt-3">
              Join 5,000+ professionals staying ahead of digital transformation
              trends
            </p>
          </div>
        </div>
      </section>
    </>
  );
};
