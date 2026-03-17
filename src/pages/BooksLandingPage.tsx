import { Header } from "../components/Header/Header";
import { DTMIFooter } from "../features/landing/components/DTMIFooter";
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
                <h1 className="text-4xl md:text-6xl font-bold mb-6">
                  6xD - The Six Digital Perspectives
                </h1>
                <p className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed">
                  A comprehensive framework for understanding and navigating
                  digital transformation through six critical perspectives
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={() => window.open("https://amazon.com", "_blank")}
                    className="bg-primary-500 hover:bg-primary-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 shadow-lg"
                  >
                    Buy on Amazon
                  </button>
                  <button
                    onClick={() =>
                      document
                        .getElementById("featured-books")
                        ?.scrollIntoView({ behavior: "smooth" })
                    }
                    className="border-2 border-white text-white hover:bg-white hover:text-brand-navy px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200"
                  >
                    Explore Books
                  </button>
                </div>
              </div>

              {/* Right side - Book Cover Mockup */}
              <div className="flex justify-center">
                <div className="relative" style={{ perspective: "1000px" }}>
                  {/* Book Mockup with Realistic 3D Effect and Rotation */}
                  <div
                    className="relative w-80 h-96 transform hover:scale-105 transition-all duration-300 animate-pulse"
                    style={{
                      transformStyle: "preserve-3d",
                      transform: "rotateY(-10deg) rotateX(5deg)",
                      animation: "bookRotate 8s ease-in-out infinite",
                    }}
                  >
                    {/* Book Shadow */}
                    <div className="absolute -bottom-8 -right-8 w-80 h-96 bg-black opacity-20 rounded-lg blur-2xl transform translate-x-8 translate-y-8 -z-10"></div>

                    {/* Book Spine with Hero Gradient */}
                    <div
                      className="absolute -right-3 top-0 w-6 h-96 bg-gradient-to-br from-brand-navy via-brand-navy to-blue-900 rounded-r-lg"
                      style={{ transform: "rotateY(90deg) translateZ(3px)" }}
                    ></div>

                    {/* Main Book Cover with Hero Gradient Background */}
                    <div className="relative w-80 h-96 rounded-lg overflow-hidden shadow-2xl bg-gradient-to-br from-brand-navy via-brand-navy to-blue-900">
                      <img
                        src="/book cover/Untitled design (5).png"
                        alt="6xD - The Six Digital Perspectives by Dr. Stéphane Niango"
                        className="w-full h-full object-cover"
                      />

                      {/* Realistic book shine/reflection */}
                      <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/5 pointer-events-none"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* CSS Animation for Book Rotation */}
              <style jsx>{`
                @keyframes bookRotate {
                  0%,
                  100% {
                    transform: rotateY(-10deg) rotateX(5deg);
                  }
                  25% {
                    transform: rotateY(-5deg) rotateX(3deg);
                  }
                  50% {
                    transform: rotateY(-15deg) rotateX(7deg);
                  }
                  75% {
                    transform: rotateY(-8deg) rotateX(4deg);
                  }
                }
              `}</style>
            </div>
          </div>
        </section>
        {/* Featured Books Section */}
        <section id="featured-books" className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex items-center justify-between mb-12">
              <div>
                <div className="flex items-center mb-4">
                  <div className="w-4 h-4 bg-emerald-600 rounded-full mr-3"></div>
                  <span className="text-sm font-bold text-emerald-600 uppercase tracking-wider">
                    Featured Books
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Essential Reading
                </h2>
              </div>
            </div>

            {/* Books Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Book 1 */}
              <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                <div className="h-64 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-lg mb-6 flex items-center justify-center">
                  <div className="text-center text-gray-600">
                    <div className="w-12 h-12 mx-auto mb-2 bg-blue-600 rounded-lg flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <p className="text-sm font-medium">Book Cover</p>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Digital Transformation Playbook
                </h3>
                <p className="text-gray-600 mb-4 text-sm">
                  A comprehensive guide to leading successful digital
                  transformation initiatives in modern organizations.
                </p>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-gray-500">Available Now</span>
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-4 h-4 fill-current"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
                <button
                  onClick={() => window.open("https://amazon.com", "_blank")}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-lg font-semibold transition-colors"
                >
                  Buy on Amazon
                </button>
              </div>

              {/* Book 2 */}
              <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                <div className="h-64 bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg mb-6 flex items-center justify-center">
                  <div className="text-center text-gray-600">
                    <div className="w-12 h-12 mx-auto mb-2 bg-purple-600 rounded-lg flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <p className="text-sm font-medium">Book Cover</p>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  AI Leadership in the Digital Age
                </h3>
                <p className="text-gray-600 mb-4 text-sm">
                  Strategic insights on leveraging artificial intelligence for
                  competitive advantage and organizational growth.
                </p>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-gray-500">Pre-order</span>
                  <span className="text-sm text-purple-600 font-medium">
                    Coming Soon
                  </span>
                </div>
                <button
                  onClick={() => window.open("https://amazon.com", "_blank")}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-semibold transition-colors"
                >
                  Pre-order on Amazon
                </button>
              </div>

              {/* Book 3 */}
              <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                <div className="h-64 bg-gradient-to-br from-orange-100 to-red-100 rounded-lg mb-6 flex items-center justify-center">
                  <div className="text-center text-gray-600">
                    <div className="w-12 h-12 mx-auto mb-2 bg-orange-600 rounded-lg flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <p className="text-sm font-medium">Book Cover</p>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  The Future of Work
                </h3>
                <p className="text-gray-600 mb-4 text-sm">
                  Exploring how digital transformation is reshaping workplace
                  dynamics and employee experiences.
                </p>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-gray-500">Available Now</span>
                  <div className="flex text-yellow-400">
                    {[...Array(4)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-4 h-4 fill-current"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                    <svg
                      className="w-4 h-4 text-gray-300 fill-current"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                </div>
                <button
                  onClick={() => window.open("https://amazon.com", "_blank")}
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-lg font-semibold transition-colors"
                >
                  Buy on Amazon
                </button>
              </div>
            </div>
          </div>
        </section>
        {/* About the Author Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  About the Author
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
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Dr. Stéphane Niango
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    With over 15 years of experience in digital transformation
                    consulting, Dr. Stéphane Niango has helped Fortune 500
                    companies navigate complex technological changes and achieve
                    sustainable growth. A recognized thought leader in the
                    industry, he has spoken at major conferences worldwide and
                    contributed to numerous publications on digital innovation.
                  </p>

                  <div className="space-y-3">
                    <div className="flex items-center text-gray-600">
                      <svg
                        className="w-5 h-5 mr-3 text-emerald-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      15+ years in digital transformation
                    </div>
                    <div className="flex items-center text-gray-600">
                      <svg
                        className="w-5 h-5 mr-3 text-emerald-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Consulted for 100+ Fortune 500 companies
                    </div>
                    <div className="flex items-center text-gray-600">
                      <svg
                        className="w-5 h-5 mr-3 text-emerald-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      International keynote speaker
                    </div>
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
                What Readers Say
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <div className="bg-gray-50 p-6 rounded-xl">
                <div className="flex text-yellow-400 mb-4">
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
                <p className="text-gray-600 mb-4 italic">
                  "This book transformed how we approach digital initiatives.
                  The practical frameworks are invaluable for any leader."
                </p>
                <div className="text-sm">
                  <p className="font-semibold text-gray-900">Sarah Johnson</p>
                  <p className="text-gray-500">CTO, Tech Innovations Inc.</p>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-xl">
                <div className="flex text-yellow-400 mb-4">
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
                <p className="text-gray-600 mb-4 italic">
                  "Clear, actionable insights backed by real-world experience. A
                  must-read for digital transformation professionals."
                </p>
                <div className="text-sm">
                  <p className="font-semibold text-gray-900">Michael Chen</p>
                  <p className="text-gray-500">
                    VP Digital Strategy, Global Corp
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-xl">
                <div className="flex text-yellow-400 mb-4">
                  {[...Array(4)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 fill-current"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <svg
                    className="w-5 h-5 text-gray-300 fill-current"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
                <p className="text-gray-600 mb-4 italic">
                  "Excellent resource for understanding the complexities of
                  modern digital transformation challenges."
                </p>
                <div className="text-sm">
                  <p className="font-semibold text-gray-900">Emily Rodriguez</p>
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
                  placeholder="Enter your email address"
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

        {/* Cross-promotion Section */}
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
                  Expert perspectives and actionable intelligence on digital
                  transformation trends
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
                  Comprehensive research reports and strategic analysis for
                  informed decision-making
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
                  the curve
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
