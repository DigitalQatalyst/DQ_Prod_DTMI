import { useState, useEffect } from "react";
import { Header } from "../../shared/Header/Header";
import { Footer } from "../../shared/Footer/Footer";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Linkedin, Twitter, Mail, MapPin, ChevronLeft, Calendar, Clock, Globe } from "lucide-react";
import { blogService, authorService, Author, Blog } from "../admin/shared/utils/supabase";

function authorSlugFromName(name: string) {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function AuthorBioPage() {
  const { slug: authorSlug } = useParams();
  const navigate = useNavigate();
  const [author, setAuthor] = useState<Author | null>(null);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [otherAuthors, setOtherAuthors] = useState<Author[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!authorSlug) return;
    setLoading(true);
    setNotFound(false);

    (async () => {
      try {
        const allAuthors = await authorService.getAuthors();
        const found = allAuthors.find(
          (a) => a.slug === authorSlug || authorSlugFromName(a.name) === authorSlug,
        );

        if (!found) { setNotFound(true); return; }

        setAuthor(found);
        setOtherAuthors(allAuthors.filter((a) => a.id !== found.id));

        try {
          const allBlogs = await blogService.getBlogs();
          setBlogs(Array.isArray(allBlogs) ? allBlogs.filter((b) => b.authorId === found.id) : []);
        } catch { setBlogs([]); }
      } catch (err) {
        console.error("Failed to load author", err);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    })();
  }, [authorSlug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#030F35]" />
      </div>
    );
  }

  if (notFound || !author) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-gray-500 text-sm">Author not found.</p>
        <button onClick={() => navigate(-1)} className="text-sm text-[#030F35] underline">Go back</button>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full min-h-screen bg-white">
      <Header />
      <main className="flex-1">

        {/* Hero */}
        <div className="bg-gray-50 border-b border-gray-100">
          <div className="container mx-auto px-4 md:px-6 py-12 max-w-5xl">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 mb-8 transition-colors"
            >
              <ChevronLeft size={16} /> Back
            </button>

            <div className="flex flex-col md:flex-row gap-8 items-start">
              {author.avatar ? (
                <img src={author.avatar} alt={author.name}
                  className="w-40 h-40 rounded-2xl object-cover border border-gray-200 shadow-sm shrink-0" />
              ) : (
                <div className="w-40 h-40 rounded-2xl bg-gray-100 flex items-center justify-center text-gray-300 text-5xl font-bold border border-gray-200 shrink-0">
                  {author.name[0]}
                </div>
              )}

              <div className="flex-1 space-y-4">
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold text-gray-900">{author.name}</h1>
                  {author.title && <p className="text-base text-gray-500 mt-1">{author.title}</p>}
                </div>

                {author.location && (
                  <div className="flex items-center gap-1.5 text-sm text-gray-500">
                    <MapPin size={14} /> {author.location}
                  </div>
                )}

                {author.bio && (
                  <p className="text-sm text-gray-600 leading-relaxed max-w-xl">{author.bio}</p>
                )}

                <div className="flex items-center gap-2 pt-1">
                  {author.linkedIn && (
                    <a href={author.linkedIn.startsWith("http") ? author.linkedIn : `https://${author.linkedIn}`}
                      target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
                      className="w-9 h-9 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-500 hover:text-[#030F35] hover:border-[#030F35] transition-colors">
                      <Linkedin size={16} />
                    </a>
                  )}
                  {author.twitter && (
                    <a href={author.twitter.startsWith("http") ? author.twitter : `https://${author.twitter}`}
                      target="_blank" rel="noopener noreferrer" aria-label="X / Twitter"
                      className="w-9 h-9 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-500 hover:text-[#030F35] hover:border-[#030F35] transition-colors">
                      <Twitter size={16} />
                    </a>
                  )}
                  {author.website && (
                    <a href={author.website.startsWith("http") ? author.website : `https://${author.website}`}
                      target="_blank" rel="noopener noreferrer" aria-label="Website"
                      className="w-9 h-9 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-500 hover:text-[#030F35] hover:border-[#030F35] transition-colors">
                      <Globe size={16} />
                    </a>
                  )}
                  {author.email && (
                    <a href={`mailto:${author.email}`} aria-label="Email"
                      className="w-9 h-9 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-500 hover:text-[#030F35] hover:border-[#030F35] transition-colors">
                      <Mail size={16} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed bio */}
        {author.bioHtml && (
          <div className="bg-white border-b border-gray-100">
            <div className="container mx-auto px-4 md:px-6 py-14 max-w-5xl">
              <h2 className="text-xl font-bold text-gray-900 mb-6">About {author.name}</h2>
              <div
                className="prose prose-gray max-w-none text-sm leading-relaxed"
                dangerouslySetInnerHTML={{ __html: author.bioHtml }}
              />
            </div>
          </div>
        )}

        {/* Published work */}
        <div className="bg-white border-b border-gray-100">
          <div className="container mx-auto px-4 md:px-6 py-14 max-w-5xl">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              {author.name.split(" ")[0]}'s Published Work
            </h2>
            {blogs.length === 0 ? (
              <p className="text-sm text-gray-400 italic">No published content yet.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {blogs.slice(0, 6).map((blog) => (
                  <Link key={blog.id} to={`/blog/${blog.slug}`}
                    className="group border border-gray-100 rounded-xl overflow-hidden hover:shadow-md transition-all">
                    {blog.heroImage && (
                      <div className="h-40 overflow-hidden bg-gray-100">
                        <img src={blog.heroImage} alt={blog.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      </div>
                    )}
                    <div className="p-4">
                      <p className="text-sm font-semibold text-gray-900 line-clamp-2 group-hover:text-[#030F35]">
                        {blog.title}
                      </p>
                      <p className="text-xs text-gray-500 mt-1.5 line-clamp-2">{blog.excerpt}</p>
                      <div className="flex items-center gap-3 mt-3 text-xs text-gray-400">
                        <span className="flex items-center gap-1">
                          <Calendar size={11} />
                          {new Date(blog.publishDate).toLocaleDateString()}
                        </span>
                        {blog.readTime > 0 && (
                          <span className="flex items-center gap-1">
                            <Clock size={11} /> {blog.readTime} min
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Other contributors */}
        {otherAuthors.length > 0 && (
          <div className="bg-gray-50 border-t border-gray-100">
            <div className="container mx-auto px-4 md:px-6 py-14 max-w-5xl">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Other Contributors</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {otherAuthors.slice(0, 8).map((other) => {
                  const slug = other.slug || authorSlugFromName(other.name);
                  return (
                    <Link key={other.id} to={`/authors/${slug}`}
                      className="group bg-white border border-gray-100 rounded-xl p-4 flex flex-col items-center text-center hover:shadow-md hover:border-gray-200 transition-all">
                      {other.avatar ? (
                        <img src={other.avatar} alt={other.name}
                          className="w-16 h-16 rounded-full object-cover mb-3 group-hover:scale-105 transition-transform" />
                      ) : (
                        <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 font-bold text-xl mb-3">
                          {other.name[0]}
                        </div>
                      )}
                      <p className="text-sm font-semibold text-gray-900 line-clamp-1">{other.name}</p>
                      <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">{other.title}</p>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        )}

      </main>
      <Footer />
    </div>
  );
}
