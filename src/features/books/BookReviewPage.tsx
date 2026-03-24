import { useParams, useNavigate } from "react-router-dom";
import { Header } from "../../shared/Header/Header";
import { Footer } from "../../shared/Footer/Footer";
import { featuredBooks, frontierBooks } from "../../utils/mockBookData";
import { ArrowLeft, Star, Calendar, User, BookOpen, Clock } from "lucide-react";
import { useState, useEffect } from "react";
// Removed import - using inline content instead

// Review content function
const getReviewContent = (bookId: string) => {
  switch (bookId) {
    case "6xd-six-digital-perspectives":
      return {
        title: "Book Review: 6xD: The Six Digital Perspectives",
        content: (
          <div>
            <p className="text-xl text-gray-700 leading-relaxed mb-8 font-medium">
              In <em>6xD: The Six Digital Perspectives</em>, Dr. Stephane Niango
              presents a provocative and ambitious blueprint for the evolution
              of traditional businesses into Digital Cognitive Organizations
              (DCOs). His thesis challenges the conventional wisdom that
              technology is the main barrier to successful digital
              transformation.
            </p>

            <p className="mb-6">
              The book is grounded in a powerful central idea: digital
              transformation is no longer about isolated projects but should be
              viewed as a continuous, ever-adaptive discipline. Niango proposes
              that organizations shift from reactive to intelligent,
              self-sensing operations, positioning AI not just as a tool but as
              the core of an organization's decision-making engine.
            </p>

            <div className="bg-gray-50 rounded-lg p-6 my-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                The 6xD Framework
              </h3>
              <ul className="space-y-3">
                <li>
                  <strong>From Strategy to Cognitive Architecture:</strong>{" "}
                  Niango critiques static roadmaps and calls for a new
                  approach—one that allows organizations to continuously sense,
                  reason, and adapt in real-time.
                </li>
                <li>
                  <strong>The Cognitive Gap:</strong> He highlights the
                  disconnect between digital investment and the ability to
                  leverage AI effectively, urging businesses to build systems
                  that bridge this gap.
                </li>
                <li>
                  <strong>Continuous Intelligence:</strong> The author
                  challenges the conventional view of transformation projects as
                  discrete phases and advocates for the establishment of a
                  continuous intelligence framework across the enterprise.
                </li>
                <li>
                  <strong>Human-AI Synergy:</strong> Niango's vision of the
                  future is one where AI leads the way in operational
                  decision-making, with humans providing the cognitive oversight
                  necessary for complex tasks.
                </li>
              </ul>
            </div>

            <blockquote className="border-l-4 border-orange-500 pl-6 py-4 my-8 bg-orange-50 rounded-r-lg">
              <p className="text-lg italic text-gray-800 mb-2">
                "Rethink your business model by shifting from a linear value
                chain to a dynamic value network."
              </p>
              <cite className="text-sm text-gray-600">
                — Dr. Stephane Niango, 6xD: The Six Digital Perspectives
              </cite>
            </blockquote>

            <p className="mb-8">
              Ultimately, <em>6xD</em> succeeds in reframing the conversation
              around digital transformation. It goes beyond the buzzwords and
              offers a nuanced, thoughtful guide for organizations seeking to
              evolve in a world that is increasingly driven by AI and continuous
              change.
            </p>
          </div>
        ),
      };

    case "transform-14-behaviours":
      return {
        title:
          "Book Review: Transform! The 14 Behaviours Driving Successful Digital Transformation in the Age of Gen AI",
        content: (
          <div>
            <p className="text-xl text-gray-700 leading-relaxed mb-8 font-medium">
              In an era where artificial intelligence dominates headlines and
              boardroom discussions,{" "}
              <em>
                Transform! The 14 Behaviours Driving Successful Digital
                Transformation in the Age of Gen AI
              </em>{" "}
              by Ian Murrin, Rajesh Jethwam, and Mike Wright offers a
              refreshingly human-centric perspective.
            </p>

            <p className="mb-6">
              The book's central thesis is both simple and profound: successful
              digital transformation requires fundamental changes in how people
              think, act, and collaborate within organizations. Rather than
              focusing on the latest AI tools or platforms, the authors identify
              14 core behaviors that distinguish thriving digital organizations
              from those that struggle with change.
            </p>

            <div className="bg-gray-50 rounded-lg p-6 my-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                The 14 Core Behaviors
              </h3>
              <p className="text-gray-700 mb-4">
                The authors organize their behavioral framework around four key
                pillars:
              </p>
              <ul className="space-y-2 text-gray-700">
                <li>
                  <strong>Mindset Behaviors:</strong> Embracing uncertainty,
                  continuous learning, and customer obsession
                </li>
                <li>
                  <strong>Leadership Behaviors:</strong> Empowering teams,
                  fostering psychological safety, and leading by example
                </li>
                <li>
                  <strong>Collaboration Behaviors:</strong> Breaking down silos,
                  sharing knowledge, and co-creating solutions
                </li>
                <li>
                  <strong>Innovation Behaviors:</strong> Experimenting rapidly,
                  failing fast, and scaling successes
                </li>
              </ul>
            </div>

            <blockquote className="border-l-4 border-orange-500 pl-6 py-4 my-8 bg-orange-50 rounded-r-lg">
              <p className="text-lg italic text-gray-800 mb-2">
                "In the age of Gen AI, the organizations that will thrive are
                not those with the best technology, but those with the most
                adaptive behaviors."
              </p>
              <cite className="text-sm text-gray-600">
                — Transform! The 14 Behaviours
              </cite>
            </blockquote>

            <p className="mb-8">
              <em>Transform!</em> succeeds in making the complex topic of
              organizational change accessible and actionable. For leaders
              navigating the challenges of digital transformation in an
              AI-driven world, this book offers a practical roadmap for creating
              lasting organizational change.
            </p>
          </div>
        ),
      };

    case "hbr-10-must-reads-digital":
      return {
        title:
          "Book Review: HBR's 10 Must Reads on Leading Digital Transformation (Updated and Expanded)",
        content: (
          <div>
            <p className="text-xl text-gray-700 leading-relaxed mb-8 font-medium">
              Harvard Business Review's updated collection on digital
              transformation arrives at a critical juncture. As organizations
              grapple with the implications of generative AI and accelerating
              technological change, this expanded edition provides a curated
              selection of the most influential thinking on digital leadership
              from the past decade.
            </p>

            <div className="bg-gray-50 rounded-lg p-6 my-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Key Strategic Frameworks
              </h3>
              <ul className="space-y-3">
                <li>
                  <strong>Discovery-Driven Transformation:</strong> A
                  methodology for navigating uncertainty in digital initiatives
                  by treating transformation as a series of strategic
                  experiments.
                </li>
                <li>
                  <strong>The Digital Matrix:</strong> A framework for
                  understanding how digital technologies create value through
                  network effects, data insights, and platform dynamics.
                </li>
                <li>
                  <strong>AI Readiness Assessment:</strong> Tools for evaluating
                  organizational capability to adopt and scale artificial
                  intelligence initiatives.
                </li>
              </ul>
            </div>

            <blockquote className="border-l-4 border-orange-500 pl-6 py-4 my-8 bg-orange-50 rounded-r-lg">
              <p className="text-lg italic text-gray-800 mb-2">
                "Digital transformation is not about technology—it's about
                strategy. And strategy in the digital age requires a
                fundamentally different approach to creating and capturing
                value."
              </p>
              <cite className="text-sm text-gray-600">
                — HBR's 10 Must Reads on Leading Digital Transformation
              </cite>
            </blockquote>

            <p className="mb-8">
              For executives seeking a comprehensive foundation in digital
              transformation strategy, this updated collection remains an
              essential resource. The new material on AI and reskilling makes it
              particularly relevant for leaders navigating the current wave of
              technological disruption.
            </p>
          </div>
        ),
      };

    case "governing-the-machine":
      return {
        title:
          "Book Review: Governing the Machine: How to Navigate the Risks of AI and Unlock Its True Potential",
        content: (
          <div>
            <p className="text-xl text-gray-700 leading-relaxed mb-8 font-medium">
              As artificial intelligence becomes increasingly integrated into
              business operations and societal infrastructure,{" "}
              <em>Governing the Machine</em> by Ray Eitel-Porter, Dr. Paul
              Dongha, and Miriam Vogel arrives as a timely and essential guide.
            </p>

            <div className="bg-gray-50 rounded-lg p-6 my-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                The AI Governance Framework
              </h3>
              <ul className="space-y-3">
                <li>
                  <strong>Risk Assessment and Mitigation:</strong> Systematic
                  approaches to identifying and addressing AI-related risks
                  across different use cases and industries.
                </li>
                <li>
                  <strong>Regulatory Compliance:</strong> Practical guidance for
                  navigating emerging regulations like the EU AI Act, with
                  frameworks adaptable to different jurisdictions.
                </li>
                <li>
                  <strong>Ethical AI Implementation:</strong> Tools for
                  embedding ethical considerations into AI development and
                  deployment processes.
                </li>
              </ul>
            </div>

            <blockquote className="border-l-4 border-orange-500 pl-6 py-4 my-8 bg-orange-50 rounded-r-lg">
              <p className="text-lg italic text-gray-800 mb-2">
                "The question is not whether AI will transform our world, but
                whether we will govern that transformation wisely."
              </p>
              <cite className="text-sm text-gray-600">
                — Governing the Machine
              </cite>
            </blockquote>

            <p className="mb-8">
              <em>Governing the Machine</em> succeeds in making the complex
              topic of AI governance accessible to business leaders,
              policymakers, and technologists alike. For organizations serious
              about unlocking AI's potential while managing its risks, this book
              is an indispensable resource.
            </p>
          </div>
        ),
      };

    case "digital-transformation-roadmap-rogers":
      return {
        title:
          "Book Review: The Digital Transformation Roadmap: Rebuild Your Organization for Continuous Change",
        content: (
          <div>
            <p className="text-xl text-gray-700 leading-relaxed mb-8 font-medium">
              David L. Rogers returns with a follow-up to his influential{" "}
              <em>Digital Transformation Playbook</em>, and{" "}
              <em>The Digital Transformation Roadmap</em> represents a
              significant evolution in his thinking about building organizations
              capable of continuous adaptation.
            </p>

            <div className="bg-gray-50 rounded-lg p-6 my-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                The Continuous Transformation Model
              </h3>
              <ul className="space-y-3">
                <li>
                  <strong>Sensing Systems:</strong> Organizational capabilities
                  for detecting weak signals of change in technology, customer
                  behavior, and competitive landscapes.
                </li>
                <li>
                  <strong>Adaptive Structures:</strong> Flexible organizational
                  designs that can rapidly reconfigure in response to new
                  opportunities and threats.
                </li>
                <li>
                  <strong>Learning Loops:</strong> Systematic approaches to
                  experimentation, learning, and scaling that accelerate
                  organizational adaptation.
                </li>
              </ul>
            </div>

            <blockquote className="border-l-4 border-orange-500 pl-6 py-4 my-8 bg-orange-50 rounded-r-lg">
              <p className="text-lg italic text-gray-800 mb-2">
                "The goal is not to complete your digital transformation, but to
                build an organization that can transform continuously."
              </p>
              <cite className="text-sm text-gray-600">
                — David L. Rogers, The Digital Transformation Roadmap
              </cite>
            </blockquote>

            <p className="mb-8">
              <em>The Digital Transformation Roadmap</em> represents a mature
              and sophisticated approach to organizational change in the digital
              age. For leaders who recognize that digital transformation is not
              a destination but a journey, this book provides an essential
              roadmap.
            </p>
          </div>
        ),
      };

    case "digital-resilience-cybersecurity":
      return {
        title:
          "Book Review: Digital Resilience, Cybersecurity and Supply Chains",
        content: (
          <div>
            <p className="text-xl text-gray-700 leading-relaxed mb-8 font-medium">
              In an interconnected world where supply chain disruptions can
              cascade across global markets within hours, Tarnveer Singh's{" "}
              <em>Digital Resilience, Cybersecurity and Supply Chains</em>{" "}
              addresses one of the most critical challenges facing modern
              organizations.
            </p>

            <div className="bg-gray-50 rounded-lg p-6 my-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                The Digital Resilience Framework
              </h3>
              <ul className="space-y-3">
                <li>
                  <strong>Threat Landscape Analysis:</strong> Comprehensive
                  assessment of cyber threats specific to digitally transformed
                  supply chains.
                </li>
                <li>
                  <strong>Resilience Architecture:</strong> Design principles
                  for building systems that can maintain operations under attack
                  or disruption.
                </li>
                <li>
                  <strong>Supply Chain Security:</strong> Strategies for
                  securing complex, multi-tier supply networks in digital
                  environments.
                </li>
              </ul>
            </div>

            <blockquote className="border-l-4 border-orange-500 pl-6 py-4 my-8 bg-orange-50 rounded-r-lg">
              <p className="text-lg italic text-gray-800 mb-2">
                "In the digital age, supply chain resilience is not just about
                having backup suppliers—it's about building adaptive systems
                that can sense, respond, and recover from disruptions in
                real-time."
              </p>
              <cite className="text-sm text-gray-600">
                — Tarnveer Singh, Digital Resilience, Cybersecurity and Supply
                Chains
              </cite>
            </blockquote>

            <p className="mb-8">
              <em>Digital Resilience, Cybersecurity and Supply Chains</em> fills
              an important gap in the digital transformation literature by
              addressing the critical intersection of security and operational
              resilience.
            </p>
          </div>
        ),
      };

    case "designed-for-digital":
      return {
        title:
          "Book Review: Designed for Digital: How to Architect Your Business for Sustained Success",
        content: (
          <div>
            <p className="text-xl text-gray-700 leading-relaxed mb-8 font-medium">
              <em>Designed for Digital</em> by Jeanne W. Ross, Martin Mocker,
              and Cynthia Beath stands as one of the most rigorous and
              research-backed guides to digital transformation available today.
            </p>

            <div className="bg-gray-50 rounded-lg p-6 my-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                The Digital Business Architecture
              </h3>
              <ul className="space-y-3">
                <li>
                  <strong>Operational Backbone:</strong> Standardized,
                  integrated systems that enable efficient, reliable operations
                  at scale.
                </li>
                <li>
                  <strong>Digital Platform:</strong> Shared technology services
                  and data that enable rapid development and deployment of new
                  digital offerings.
                </li>
                <li>
                  <strong>External Platform:</strong> Ecosystem connections that
                  extend the organization's capabilities through partnerships
                  and third-party integrations.
                </li>
              </ul>
            </div>

            <blockquote className="border-l-4 border-orange-500 pl-6 py-4 my-8 bg-orange-50 rounded-r-lg">
              <p className="text-lg italic text-gray-800 mb-2">
                "Companies that are designed for digital don't just use
                technology better—they are architected differently."
              </p>
              <cite className="text-sm text-gray-600">
                — Designed for Digital
              </cite>
            </blockquote>

            <p className="mb-8">
              <em>Designed for Digital</em> represents the gold standard for
              digital transformation guidance. Its combination of rigorous
              research, practical frameworks, and real-world case studies makes
              it an indispensable resource for leaders serious about building
              digitally native organizations.
            </p>
          </div>
        ),
      };

    default:
      return {
        title: `Book Review: ${bookId}`,
        content: (
          <div>
            <p className="text-xl text-gray-700 leading-relaxed mb-8 font-medium">
              This book review is currently being developed. Please check back
              soon for our comprehensive NYT-style analysis of this important
              digital transformation resource.
            </p>
          </div>
        ),
      };
  }
};

const BookReviewPage = () => {
  const { bookId } = useParams();
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Find the book by ID from both featured and frontier books
  const book = [...featuredBooks, ...frontierBooks].find(
    (b) => b.id === bookId,
  );

  // Get the review content for this book
  const reviewContent = book ? getReviewContent(book.id) : null;

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
                      {reviewContent?.title || `Book Review: ${book.title}`}
                    </h1>
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-6">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>8 min read</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>March 24, 2026</span>
                      </div>
                    </div>
                  </div>

                  {/* Review Content */}
                  {reviewContent?.content || (
                    <p className="text-xl text-gray-700 leading-relaxed mb-8 font-medium">
                      This book review is currently being developed. Please
                      check back soon for our comprehensive NYT-style analysis
                      of this important digital transformation resource.
                    </p>
                  )}

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
