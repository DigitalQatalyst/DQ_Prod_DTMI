import { Header } from "../../shared/Header/Header";
import { Footer } from "../../shared/Footer/Footer";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Search, BookOpen } from "lucide-react";
import ModernDQChatbot from "../../shared/ModernDQChatbot";

const InsightsLandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col w-full min-h-screen bg-white">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 text-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl">
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
                clarity on complex topics through structured analysis and
                thought leadership.
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

        {/* What You'll Find Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
              What You'll Find in Insights
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-xl shadow-md border-l-4 border-blue-500">
                <BookOpen className="text-blue-600 mb-4" size={40} />
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Expert Articles
                </h3>
                <p className="text-gray-600">
                  Comprehensive articles from industry experts breaking down
                  complex digital transformation concepts into actionable
                  knowledge.
                </p>
              </div>
              <div className="bg-white p-8 rounded-xl shadow-md border-l-4 border-blue-500">
                <div className="text-blue-600 mb-4 text-4xl">🎯</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Framework Analysis
                </h3>
                <p className="text-gray-600">
                  Detailed explorations of proven frameworks and methodologies
                  for navigating digital cognitive organization.
                </p>
              </div>
              <div className="bg-white p-8 rounded-xl shadow-md border-l-4 border-blue-500">
                <div className="text-blue-600 mb-4 text-4xl">💡</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Case Insights
                </h3>
                <p className="text-gray-600">
                  Real-world examples and case studies showing how organizations
                  successfully implement digital strategies.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Ready to Explore Insights?
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Dive into structured analysis and expert perspectives that clarify
              the path to digital transformation.
            </p>
            <button
              onClick={() => navigate("/marketplace/dtmi?tab=insights")}
              className="inline-flex items-center gap-3 bg-blue-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-700 transition-all shadow-lg"
            >
              <span>Browse Insights</span>
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

export default InsightsLandingPage;
