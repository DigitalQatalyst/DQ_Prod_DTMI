import { useParams, useNavigate } from "react-router-dom";
import { Header } from "../../shared/Header/Header";
import { Footer } from "../../shared/Footer/Footer";
import { featuredBooks } from "../../utils/mockBookData";
import { ArrowLeft, Star, Calendar, User, BookOpen, Clock } from "lucide-react";
import { useState, useEffect } from "react";

const BookReviewPage = () => {
  const { bookId } = useParams();
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Find the book by ID
  const book = featuredBooks.find((b) => b.id === bookId);

  if (!book) {
    return (
      <div className="flex flex-col w-full min-h-screen bg-white">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Book Review Not Found
            </h1>
            <button
              onClick={() => navigate("/books")}
              className="text-orange-500 hover:text-orange-600 font-medium"
            >
              ← Back to Books
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full min-h-screen bg-white">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-gray-50 to-white py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <button
              onClick={() => navigate("/books")}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Books
            </button>

            <div className="grid lg:grid-cols-3 gap-12 items-start">
              {/* Book Cover */}
              <div className="lg:col-span-1">
                <div className="sticky top-8">
                  <div className="w-full max-w-sm mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
                    <img
                      src={book.coverImage}
                      alt={book.title}
                      className="w-full h-auto object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        const parent = target.parentElement!;
                        parent.innerHTML = `
                          <div class="w-full aspect-[3/4] flex items-center justify-center bg-gradient-to-br from-orange-100 to-red-100">
                            <div class="text-center text-gray-700">
                              <div class="w-16 h-16 mx-auto mb-4 bg-orange-500 rounded-lg flex items-center justify-center text-white text-2xl">
                                📚
                              </div>
                              <p class="text-lg font-medium">${book.title}</p>
                              <p class="text-sm mt-2">${book.author}</p>
                            </div>
                          </div>
                        `;
                      }}
                    />
                  </div>

                  {/* Book Info Card */}
                  <div className="mt-6 bg-white rounded-lg shadow-sm border p-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <User className="w-4 h-4" />
                        <span>{book.author}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <BookOpen className="w-4 h-4" />
                        <span>{book.pageCount} pages</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar className="w-4 h-4" />
                        <span>
                          {new Date(book.publishDate).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < Math.floor(book.rating)
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm font-medium">
                          {book.rating}
                        </span>
                        <span className="text-sm text-gray-500">
                          ({book.reviewCount} reviews)
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Review Content */}
              <div className="lg:col-span-2">
                <div
                  className="prose prose-lg max-w-none"
                  style={{
                    opacity: isLoaded ? 1 : 0,
                    transform: isLoaded ? "translateY(0)" : "translateY(20px)",
                    transition:
                      "opacity 0.6s ease-out, transform 0.6s ease-out",
                  }}
                >
                  {/* Review Header */}
                  <div className="not-prose mb-8">
                    <h1 className="text-4xl font-bold font-display text-gray-900 mb-4">
                      Book Review: {book.title}
                    </h1>
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-6">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>8 min read</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>March 23, 2026</span>
                      </div>
                    </div>
                  </div>

                  {/* Review Content */}
                  <p className="text-xl text-gray-700 leading-relaxed mb-8 font-medium">
                    In <em>6xD: The Six Digital Perspectives</em>, Dr. Stephane
                    Niango presents a provocative and ambitious blueprint for
                    the evolution of traditional businesses into Digital
                    Cognitive Organizations (DCOs). His thesis challenges the
                    conventional wisdom that technology is the main barrier to
                    successful digital transformation. Instead, Niango argues
                    that the real issue lies within an "architectural deficit"—a
                    failure to create the right structures to scale artificial
                    intelligence and break down data silos.
                  </p>

                  <p className="mb-6">
                    The book is grounded in a powerful central idea: digital
                    transformation is no longer about isolated projects but
                    should be viewed as a continuous, ever-adaptive discipline.
                    Niango proposes that organizations shift from reactive to
                    intelligent, self-sensing operations, positioning AI not
                    just as a tool but as the core of an organization's
                    decision-making engine. This shift, he asserts, will
                    fundamentally change how businesses interact with
                    technology, employees, and customers.
                  </p>

                  <p className="mb-6">
                    Niango's framework, The Six Digital Perspectives (6xD),
                    serves as a guiding principle for achieving this
                    transformation. While the "D" labels are proprietary to
                    Niango's volume, the strategic pillars he outlines are clear
                    and far-reaching:
                  </p>

                  <div className="bg-gray-50 rounded-lg p-6 my-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      The 6xD Framework
                    </h3>
                    <ul className="space-y-3">
                      <li>
                        <strong>
                          From Strategy to Cognitive Architecture:
                        </strong>{" "}
                        Niango critiques static roadmaps and calls for a new
                        approach—one that allows organizations to continuously
                        sense, reason, and adapt in real-time.
                      </li>
                      <li>
                        <strong>The Cognitive Gap:</strong> He highlights the
                        disconnect between digital investment and the ability to
                        leverage AI effectively, urging businesses to build
                        systems that bridge this gap.
                      </li>
                      <li>
                        <strong>Continuous Intelligence:</strong> The author
                        challenges the conventional view of transformation
                        projects as discrete phases and advocates for the
                        establishment of a continuous intelligence framework
                        across the enterprise.
                      </li>
                      <li>
                        <strong>Human-AI Synergy:</strong> Niango's vision of
                        the future is one where AI leads the way in operational
                        decision-making, with humans providing the cognitive
                        oversight necessary for complex tasks.
                      </li>
                    </ul>
                  </div>

                  <p className="mb-6">
                    Perhaps the book's most significant contribution is its
                    examination of organizational maturity. Niango outlines four
                    stages, from the reactive and aware phases to the adaptive
                    and ultimately cognitive. The cognitive stage, where
                    organizations continuously reconfigure themselves at the
                    pace of the digital economy, is the book's ultimate goal.
                    This ambition reflects the book's broader aim to not only
                    provide a roadmap for businesses but also to reshape how we
                    think about digital operations entirely.
                  </p>

                  <blockquote className="border-l-4 border-orange-500 pl-6 py-4 my-8 bg-orange-50 rounded-r-lg">
                    <p className="text-lg italic text-gray-800 mb-2">
                      "Rethink your business model by shifting from a linear
                      value chain to a dynamic value network."
                    </p>
                    <cite className="text-sm text-gray-600">
                      — Dr. Stephane Niango, 6xD: The Six Digital Perspectives
                    </cite>
                  </blockquote>

                  <p className="mb-6">
                    For all its ambition, <em>6xD</em> can at times feel dense
                    and academic. The theoretical foundations of DCOs are
                    well-explained, but the practical applications of these
                    ideas may not always be immediately apparent to readers
                    without a background in digital strategy. Nevertheless, the
                    book presents a compelling vision for the future of business
                    in the age of artificial intelligence.
                  </p>

                  <p className="mb-8">
                    Ultimately, <em>6xD</em> succeeds in reframing the
                    conversation around digital transformation. It goes beyond
                    the buzzwords and offers a nuanced, thoughtful guide for
                    organizations seeking to evolve in a world that is
                    increasingly driven by AI and continuous change. For those
                    looking to push the boundaries of what's possible in digital
                    transformation, Niango's book offers a bold,
                    thought-provoking vision that is sure to spark conversation
                    in boardrooms and tech hubs alike.
                  </p>

                  {/* Rating Section */}
                  <div className="not-prose bg-white border rounded-lg p-6 my-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Our Assessment
                    </h3>
                    <div className="grid md:grid-cols-3 gap-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-orange-600 mb-1">
                          {book.transformationImpactScore}/10
                        </div>
                        <div className="text-sm text-gray-600">
                          Transformation Impact
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600 mb-1">
                          {book.actionabilityScore}/5
                        </div>
                        <div className="text-sm text-gray-600">
                          Actionability
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600 mb-1">
                          {book.strategicDepthScore}/5
                        </div>
                        <div className="text-sm text-gray-600">
                          Strategic Depth
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 6xD Dimensions */}
                  <div className="not-prose">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      6xD Dimensions Covered
                    </h3>
                    <div className="flex flex-wrap gap-2 mb-8">
                      {book.sixDDimensions?.map((dimension) => (
                        <span
                          key={dimension}
                          className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium"
                        >
                          {dimension}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Reviewer Info */}
                  <div className="not-prose border-t pt-8 mt-12">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                        <User className="w-8 h-8 text-gray-500" />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">
                          Digital Transformation Review Team
                        </div>
                        <div className="text-sm text-gray-600">
                          Expert reviewers specializing in digital
                          transformation literature
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default BookReviewPage;
