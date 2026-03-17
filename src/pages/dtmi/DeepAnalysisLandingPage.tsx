import { Header } from "../../shared/Header/Header";
import { Footer } from "../../shared/Footer/Footer";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Brain, FileText } from "lucide-react";
import ModernDQChatbot from "../../shared/ModernDQChatbot";

const DeepAnalysisLandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col w-full min-h-screen bg-white">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-purple-600 via-purple-500 to-purple-400 text-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl">
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
                prediction analysis, and strategic frameworks shaping Economy
                4.0. Comprehensive research for strategic decision-making and
                long-term planning.
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

        {/* What You'll Find Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
              What You'll Find in Deep Analysis
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-xl shadow-md border-l-4 border-purple-500">
                <FileText className="text-purple-600 mb-4" size={40} />
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Research Reports
                </h3>
                <p className="text-gray-600">
                  Comprehensive research papers exploring digital transformation
                  trends, technologies, and strategic implications for
                  organizations.
                </p>
              </div>
              <div className="bg-white p-8 rounded-xl shadow-md border-l-4 border-purple-500">
                <div className="text-purple-600 mb-4 text-4xl">🔮</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Prediction Analysis
                </h3>
                <p className="text-gray-600">
                  Forward-looking analysis predicting future trends, scenarios,
                  and strategic opportunities in the digital economy.
                </p>
              </div>
              <div className="bg-white p-8 rounded-xl shadow-md border-l-4 border-purple-500">
                <div className="text-purple-600 mb-4 text-4xl">📚</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Strategic Frameworks
                </h3>
                <p className="text-gray-600">
                  Detailed frameworks and methodologies for implementing
                  large-scale digital transformation initiatives.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Ready to Explore Deep Analysis?
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Access comprehensive research and strategic frameworks that inform
              critical business decisions.
            </p>
            <button
              onClick={() => navigate("/marketplace/dtmi?tab=deep-analysis")}
              className="inline-flex items-center gap-3 bg-purple-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-purple-700 transition-all shadow-lg"
            >
              <span>Browse Deep Analysis</span>
              <ArrowRight size={24} />
            </button>
          </div>
        </section>
      </main>

      <Footer />
      <ModernDQChatbot />
    </div>
  );
};

export default DeepAnalysisLandingPage;
