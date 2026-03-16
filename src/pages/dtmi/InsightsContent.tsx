import { useNavigate } from "react-router-dom";
import { ArrowRight, Search, ArrowLeft } from "lucide-react";
import { WeekHighlightsInsights } from "./components/WeekHighlightsInsights";
import { EditorsPickInsights } from "./components/EditorsPickInsights";
import { FilterableInsights } from "./components/FilterableInsights";

interface InsightsContentProps {
  onBackToHome: () => void;
}

export const InsightsContent: React.FC<InsightsContentProps> = ({
  onBackToHome,
}) => {
  const navigate = useNavigate();

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            {/* Back Button */}
            <button
              onClick={onBackToHome}
              className="inline-flex items-center gap-2 text-white hover:text-blue-100 mb-6 transition-colors"
            >
              <ArrowLeft size={20} />
              <span>Back to DTMI Home</span>
            </button>

            <div className="flex items-center gap-3 mb-6">
              <Search size={48} className="text-white" />
              <span className="text-sm font-bold uppercase tracking-wider">
                LAYER 02
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Insights</h1>
            <p className="text-2xl mb-8 text-blue-50">
              Structured Perspectives
            </p>
            <p className="text-xl mb-8 leading-relaxed text-blue-50">
              In-depth articles and expert perspectives explaining digital
              transformation concepts, frameworks, and emerging models. Gain
              clarity on complex topics through structured analysis and thought
              leadership.
            </p>
            <button
              onClick={() => navigate("/marketplace/dtmi?tab=insights")}
              className="inline-flex items-center gap-3 bg-white text-blue-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl"
            >
              <span>Explore All Insights</span>
              <ArrowRight size={24} />
            </button>
          </div>
        </div>
      </section>

      {/* Week's Highlights Section */}
      <WeekHighlightsInsights />

      {/* Editor's Pick Section */}
      <EditorsPickInsights />

      {/* Filterable Insights Section */}
      <FilterableInsights />

      {/* Newsletter Signup CTA */}
      <section className="py-16 bg-gradient-to-r from-blue-50 to-blue-100">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Get Latest Insights in Your Inbox
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Subscribe to receive expert perspectives, framework analysis, and
            strategic insights delivered directly to your inbox every week.
          </p>

          {/* Email Signup Form */}
          <div className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
              />
              <button
                onClick={() => navigate("/newsletter-signup")}
                className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold text-base hover:bg-blue-700 transition-all shadow-lg whitespace-nowrap"
              >
                <span>Subscribe</span>
                <ArrowRight size={20} />
              </button>
            </div>
            <p className="text-sm text-gray-500 mt-3">
              Join 5,000+ professionals gaining strategic insights on digital
              transformation
            </p>
          </div>
        </div>
      </section>
    </>
  );
};
