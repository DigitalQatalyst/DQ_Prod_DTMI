import { Header } from "../components/Header/Header";
import { DTMIFooter } from "./dtmi/components/DTMIFooter";
import { useNavigate } from "react-router-dom";
import ModernDQChatbot from "../components/ModernDQChatbot";
import { useState } from "react";

const BooksLandingPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    alert(`Thank you! We'll notify you at ${email} about new book releases.`);
    setEmail("");
    setIsSubmitting(false);
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-white">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-brand-navy via-brand-navy to-blue-900 text-white py-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left side - Content */}
              <div>
                <div className="mb-6">
                  <span className="bg-primary-500 text-white text-sm font-bold px-4 py-2 rounded-full mb-4 inline-block">
                    The First Ever Comprehensive Guide to Digital Transformation
                  </span>
                </div>
                <h1 className="text-4xl md:text-6xl font-bold mb-6">
                  Introducing 6xD – The Six Digital Perspectives
                </h1>
                <p className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed">
                  Dr. Stéphane Niango's groundbreaking blueprint for building
                  Digital Cognitive Organizations in the Age of AI.
                </p>

                <div className="relative group">
                  <button
                    onClick={() => window.open("https://amazon.com", "_blank")}
                    className="bg-primary-500 hover:bg-primary-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 shadow-lg"
                  >
                    Pre-order Now
                  </button>

                  {/* Hover tooltip */}
                  <div className="absolute bottom-full left-0 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <div className="bg-gray-900 text-white px-4 py-3 rounded-lg shadow-xl border border-gray-700 whitespace-nowrap">
                      <div className="flex items-center mb-1">
                        <span className="text-lg mr-2">🚀</span>
                        <span className="font-bold text-yellow-300">
                          Limited Pre-order Offer Available!
                        </span>
                      </div>
                      <p className="text-sm text-gray-300">
                        Be one of the first to experience this revolutionary
                        guide.
                      </p>
                      {/* Arrow pointing down */}
                      <div className="absolute top-full left-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-900"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right side - Book Cover Mockup */}
              <div className="flex justify-center">
                <div className="relative">
                  {/* Book Mockup - Static Design */}
                  <div className="relative w-80 h-96 hover:scale-105 transition-all duration-300">
                    {/* Book Shadow */}
                    <div className="absolute -bottom-4 -right-4 w-80 h-96 bg-black opacity-20 rounded-lg blur-xl transform translate-x-4 translate-y-4 -z-10"></div>

                    {/* Main Book Cover */}
                    <div className="relative w-80 h-96 rounded-lg overflow-hidden shadow-2xl">
                      <img
                        src="/book cover/Untitled_design__5_-removebg-preview.png"
                        alt="6xD - The Six Digital Perspectives by Dr. Stéphane Niango"
                        className="w-full h-full object-contain bg-white"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* About the Author Section */}
        <section id="about-author" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  About the Author – Dr. Stéphane Niango
                </h2>
              </div>

              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="w-64 h-64 mx-auto rounded-full overflow-hidden shadow-lg">
                    <img
                      src="/images/SN.svg"
                      alt="Dr. Stéphane Niango"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Dr. Stéphane Niango
                  </h3>
                  <p className="text-lg text-primary-600 font-semibold mb-6">
                    Architect of the Digital Cognitive Organization
                  </p>
                  <p className="text-gray-600 mb-8 leading-relaxed">
                    Dr. Stéphane Niango is a leading authority on AI integration
                    and the creator of the 6xD framework—a definitive blueprint
                    for navigating digital disruption. With 15+ years of
                    experience, he transforms traditional enterprises into
                    agile, AI-driven powerhouses.
                  </p>

                  <div className="mb-8">
                    <h4 className="text-lg font-bold text-gray-900 mb-4">
                      Core Expertise
                    </h4>
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <svg
                          className="w-5 h-5 mr-3 text-emerald-600 mt-0.5 flex-shrink-0"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <div>
                          <span className="font-semibold text-gray-900">
                            Strategic Consulting:
                          </span>
                          <span className="text-gray-600">
                            {" "}
                            Trusted advisor to 100+ Fortune 500 leaders on AI
                            adoption and innovation.
                          </span>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <svg
                          className="w-5 h-5 mr-3 text-emerald-600 mt-0.5 flex-shrink-0"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <div>
                          <span className="font-semibold text-gray-900">
                            The 6xD Framework:
                          </span>
                          <span className="text-gray-600">
                            {" "}
                            Architect of a proven methodology that scales
                            cognitive technologies across global industries.
                          </span>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <svg
                          className="w-5 h-5 mr-3 text-emerald-600 mt-0.5 flex-shrink-0"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <div>
                          <span className="font-semibold text-gray-900">
                            Future of Work:
                          </span>
                          <span className="text-gray-600">
                            {" "}
                            A premier global keynote speaker helping
                            organizations thrive in an increasingly automated
                            economy.
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-lg border-l-4 border-primary-500">
                    <h4 className="text-lg font-bold text-gray-900 mb-2">
                      The Bottom Line
                    </h4>
                    <p className="text-gray-600">
                      Dr. Niango bridges the gap between complex AI research and
                      actionable business growth. His mission is to build
                      sustainable, "cognitive" frameworks that don't just
                      survive digital shifts—they lead them.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                What Readers Are Saying About 6xD
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-12 max-w-7xl mx-auto">
              <div className="bg-gray-50 p-8 rounded-xl">
                <div className="flex text-yellow-400 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 fill-current"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600 mb-6 italic text-lg leading-relaxed">
                  "This book transformed how we approach digital initiatives.
                  The practical frameworks are invaluable for any leader."
                </p>
                <div className="text-sm">
                  <p className="font-semibold text-gray-900 text-base">
                    Sarah Johnson
                  </p>
                  <p className="text-gray-500">CTO, Tech Innovations Inc.</p>
                </div>
              </div>

              <div className="bg-gray-50 p-8 rounded-xl">
                <div className="flex text-yellow-400 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 fill-current"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600 mb-6 italic text-lg leading-relaxed">
                  "Clear, actionable insights backed by real-world experience. A
                  must-read for digital transformation professionals."
                </p>
                <div className="text-sm">
                  <p className="font-semibold text-gray-900 text-base">
                    Michael Chen
                  </p>
                  <p className="text-gray-500">
                    VP Digital Strategy, Global Corp
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 p-8 rounded-xl">
                <div className="flex text-yellow-400 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 fill-current"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600 mb-6 italic text-lg leading-relaxed">
                  "Excellent resource for understanding the complexities of
                  modern digital transformation challenges."
                </p>
                <div className="text-sm">
                  <p className="font-semibold text-gray-900 text-base">
                    Emily Rodriguez
                  </p>
                  <p className="text-gray-500">
                    Director of Innovation, StartupXYZ
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Newsletter Signup Section */}
        <section className="py-16 bg-brand-navy text-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Stay Updated on New Releases
              </h2>
              <p className="text-xl text-blue-100 mb-8">
                Be the first to know about new books, exclusive content, and
                special offers
              </p>

              <form
                onSubmit={handleEmailSubmit}
                className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email to subscribe"
                  required
                  className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:ring-2 focus:ring-primary-500 focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-primary-500 hover:bg-primary-600 px-6 py-3 rounded-lg font-semibold transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? "Subscribing..." : "Subscribe"}
                </button>
              </form>

              <p className="text-sm text-blue-200 mt-4">
                No spam, unsubscribe at any time. We respect your privacy.
              </p>
            </div>
          </div>
        </section>

        {/* Explore More Resources Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Explore More Resources
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Insights
                </h3>
                <p className="text-gray-600 mb-6">
                  Explore expert perspectives and actionable intelligence on
                  digital transformation trends.
                </p>
                <button
                  onClick={() => navigate("/insights")}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  Explore Insights
                </button>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-4">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Research
                </h3>
                <p className="text-gray-600 mb-6">
                  Discover comprehensive research reports and strategic analysis
                  for informed decision-making.
                </p>
                <button
                  onClick={() => navigate("/research")}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  Explore Research
                </button>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 bg-teal-600 rounded-lg flex items-center justify-center mb-4">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Signals
                </h3>
                <p className="text-gray-600 mb-6">
                  Early indicators and trend alerts to help you stay ahead of
                  the curve.
                </p>
                <button
                  onClick={() => navigate("/signals")}
                  className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  Explore Signals
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* DTMI Footer */}
      </main>

      <DTMIFooter />
      <ModernDQChatbot />
    </div>
  );
};

export default BooksLandingPage;
