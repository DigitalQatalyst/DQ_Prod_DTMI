import { Header } from "../../shared/Header/Header";
import { Footer } from "../../shared/Footer/Footer";
import { useNavigate, useParams } from "react-router-dom";
import ModernDQChatbot from "../../shared/ModernDQChatbot";
import { useState, useEffect } from "react";
import { featuredBooks, authorInfo } from "../../utils/mockBookData";
import { BookCard } from "../../components/books/BookCard";
import { Book, Author } from "../../types/book";
import {
  ArrowLeft,
  MapPin,
  Calendar,
  Users,
  BookOpen,
  Award,
  ExternalLink,
  Linkedin,
  Twitter,
  Globe,
} from "lucide-react";

const AuthorPage = () => {
  const navigate = useNavigate();
  const { authorSlug } = useParams<{ authorSlug: string }>();
  const [author, setAuthor] = useState<Author | null>(null);
  const [authorBooks, setAuthorBooks] = useState<Book[]>([]);

  useEffect(() => {
    // For now, we only have one author in our mock data
    if (authorSlug === "stephane-niango") {
      setAuthor(authorInfo);
      const books = featuredBooks.filter(
        (book) => book.author === authorInfo.name,
      );
      setAuthorBooks(books);
    }
  }, [authorSlug]);

  const handleBookLearnMore = (book: Book) => {
    navigate(`/books/${book.id}`);
  };

  const handleBookBuyNow = (book: Book) => {
    window.open(book.amazonUrl, "_blank");
  };

  if (!author) {
    return (
      <div className="flex flex-col w-full min-h-screen bg-white">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Author not found
            </h2>
            <button
              onClick={() => navigate("/books")}
              className="text-primary-500 hover:text-primary-600 font-semibold"
            >
              Return to Books
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
        <section className="bg-gradient-to-br from-brand-navy to-blue-900 text-white py-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex items-center gap-4 mb-8">
              <button
                onClick={() => navigate("/books")}
                className="flex items-center gap-2 text-blue-200 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                Back to Books
              </button>
            </div>

            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Author Image */}
              <div className="text-center lg:text-left">
                <div className="relative inline-block">
                  <div className="w-80 h-80 mx-auto lg:mx-0 rounded-2xl overflow-hidden shadow-2xl">
                    <img
                      src={author.avatar}
                      alt={author.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Floating Stats */}
                  <div className="absolute -top-4 -right-4 bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white">
                        {author.bookCount}
                      </div>
                      <div className="text-sm text-blue-200">Books</div>
                    </div>
                  </div>

                  <div className="absolute -bottom-4 -left-4 bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white">
                        {(author.followerCount / 1000).toFixed(0)}K+
                      </div>
                      <div className="text-sm text-blue-200">Followers</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Author Info */}
              <div className="space-y-8">
                <div>
                  <h1 className="text-4xl md:text-5xl font-bold mb-4">
                    {author.name}
                  </h1>
                  <p className="text-xl text-blue-100 mb-6">
                    Digital Transformation Expert & Author
                  </p>
                  <p className="text-lg text-blue-100 leading-relaxed">
                    {author.bio}
                  </p>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <BookOpen className="w-8 h-8 text-primary-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white">
                      {author.bookCount}
                    </div>
                    <div className="text-sm text-blue-200">Books</div>
                  </div>

                  <div className="text-center">
                    <Users className="w-8 h-8 text-primary-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white">
                      {(author.followerCount / 1000).toFixed(0)}K+
                    </div>
                    <div className="text-sm text-blue-200">Followers</div>
                  </div>

                  <div className="text-center">
                    <Award className="w-8 h-8 text-primary-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white">15+</div>
                    <div className="text-sm text-blue-200">Years Exp.</div>
                  </div>

                  <div className="text-center">
                    <Calendar className="w-8 h-8 text-primary-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white">100+</div>
                    <div className="text-sm text-blue-200">Companies</div>
                  </div>
                </div>

                {/* Social Links */}
                <div className="flex gap-4">
                  {author.socialLinks.linkedin && (
                    <a
                      href={author.socialLinks.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                      <Linkedin className="w-5 h-5" />
                      LinkedIn
                    </a>
                  )}

                  {author.socialLinks.twitter && (
                    <a
                      href={author.socialLinks.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                      <Twitter className="w-5 h-5" />
                      Twitter
                    </a>
                  )}

                  {author.socialLinks.website && (
                    <a
                      href={author.socialLinks.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                      <Globe className="w-5 h-5" />
                      Website
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Credentials Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
                Credentials & Achievements
              </h2>

              <div className="grid md:grid-cols-2 gap-8">
                {author.credentials.map((credential, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 bg-white rounded-xl p-6 shadow-sm"
                  >
                    <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <Award className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-lg font-medium text-gray-900">
                        {credential}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Author's Books */}
        <section className="py-16">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Books by {author.name}
              </h2>
              <p className="text-xl text-gray-600">
                Explore the complete collection of digital transformation
                insights
              </p>
            </div>

            {authorBooks.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {authorBooks.map((book) => (
                  <BookCard
                    key={book.id}
                    book={book}
                    onLearnMore={handleBookLearnMore}
                    onBuyNow={handleBookBuyNow}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  No books available
                </h3>
                <p className="text-gray-600">
                  Check back soon for new releases from this author
                </p>
              </div>
            )}
          </div>
        </section>

        {/* About Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                About {author.name}
              </h2>

              <div className="bg-white rounded-2xl p-8 shadow-sm">
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed mb-6">
                    {author.bio}
                  </p>

                  <p className="text-gray-700 leading-relaxed mb-6">
                    As a recognized thought leader in digital transformation,
                    Dr. Niango has dedicated his career to helping organizations
                    navigate the complexities of technological change. His
                    expertise spans across multiple industries, from healthcare
                    and finance to manufacturing and retail.
                  </p>

                  <p className="text-gray-700 leading-relaxed">
                    Through his books, speaking engagements, and consulting
                    work, he continues to shape the conversation around digital
                    innovation and organizational transformation. His practical
                    approach combines academic rigor with real-world experience,
                    making complex concepts accessible to leaders at all levels.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact/Follow Section */}
        <section className="py-16">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Stay Connected
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Follow {author.name} for the latest insights on digital
                transformation
              </p>

              <div className="flex flex-wrap justify-center gap-4">
                {author.socialLinks.linkedin && (
                  <a
                    href={author.socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                  >
                    <Linkedin className="w-5 h-5" />
                    Follow on LinkedIn
                  </a>
                )}

                {author.socialLinks.twitter && (
                  <a
                    href={author.socialLinks.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-sky-500 hover:bg-sky-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                  >
                    <Twitter className="w-5 h-5" />
                    Follow on Twitter
                  </a>
                )}

                {author.socialLinks.website && (
                  <a
                    href={author.socialLinks.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-gray-800 hover:bg-gray-900 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                  >
                    <Globe className="w-5 h-5" />
                    Visit Website
                  </a>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <ModernDQChatbot />
    </div>
  );
};

export default AuthorPage;
