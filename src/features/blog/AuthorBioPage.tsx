import { useState, useEffect } from "react";
import { Header } from "../../shared/Header/Header";
import { Footer } from "../../shared/Footer/Footer";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Linkedin, Mail, MapPin, ChevronLeft, Calendar, Clock, Globe, ChevronDown, ChevronUp } from "lucide-react";
import { blogService, authorService, Author, Blog } from "../admin/shared/utils/supabase";

const XIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

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
  const [bioExpanded, setBioExpanded] = useState(false);

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

  const detailedBio = author.bioHtml || author.bio || "";
  const briefBio = author.bio || "";
  // For plain text bio, collapse after ~300 chars
  const BIO_LIMIT = 300;
  const bioIsLong = !author.bioHtml && briefBio.length > BIO_LIMIT;

  return (
    <div className="flex flex-col w-full min-h-screen bg-white">
      <Header />
      <main className="flex-1">

        {/* ── Hero ── */}
        <div className="bg-white border-b border-gray-100">
          <div className="container mx-auto px-4 md:px-6 py-10 max-w-4xl">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-900 mb-8 transition-colors"
            >
              <ChevronLeft size={15} /> Back
            </button>

            <div className="flex items-start gap-6">
              {/* Avatar */}
              {author.avatar ? (
                <img
                  src={author.avatar}
                  alt={author.name}
                  className="w-24 h-24 rounded-full object-cover border-2 border-gray-100 shadow-sm shrink-0"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-gray-400 text-3xl font-bold shrink-0">
                  {author.name[0]}
                </div>
              )}

              {/* Info */}
              <div className="space-y-1.5">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight">
                  {author.name}
                </h1>
                {author.title && (
                  <p className="text-sm text-gray-500">{author.title}</p>
                )}
                {author.location && (
                  <div className="flex items-center gap-1 text-xs text-gray-400">
                    <MapPin size={12} /> {author.location}
                  </div>
                )}
                {/* Social icons */}
                <div className="flex items-center gap-2 pt-1">
                  {author.linkedIn && (
                    <a
                      href={author.linkedIn.startsWith("http") ? author.linkedIn : `https://${author.linkedIn}`}
                      target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
                      className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:text-[#0077B5] hover:border-[#0077B5] transition-colors"
                    >
                      <Linkedin size={14} />
                    </a>
                  )}
                  {author.twitter && (
                    <a
                      href={author.twitter.startsWith("http") ? author.twitter : `https://${author.twitter}`}
                      target="_blank" rel="noopener noreferrer" aria-label="X / Twitter"
                      className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:text-black hover:border-black transition-colors"
                    >
                      <XIcon />
                    </a>
                  )}
                  {author.website && (
                    <a
                      href={author.website.startsWith("http") ? author.website : `https://${author.website}`}
                      target="_blank" rel="noopener noreferrer" aria-label="Website"
                      className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:text-[#030F35] hover:border-[#030F35] transition-colors"
                    >
                      <Globe size={14} />
                    </a>
                  )}
                  {author.email && (
                    <a
                      href={`mailto:${author.email}`} aria-label="Email"
                      className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:text-[#030F35] hover:border-[#030F35] transition-colors"
                    >
                      <Mail size={14} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Professional Summary ── */}
        {detailedBio && (
          <div className="border-b border-gray-100">
            <div className="container mx-auto px-4 md:px-6 py-10 max-w-4xl">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Professional Summary</h2>

              {author.bioHtml ? (
                // Rich HTML bio with show more
                <ExpandableBio bioHtml={author.bioHtml} />
              ) : (
                // Plain text bio
                <div>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {bioIsLong && !bioExpanded
                      ? `${briefBio.slice(0, BIO_LIMIT).trimEnd()}…`
                      : briefBio}
                  </p>
                  {bioIsLong && (
                    <button
                      onClick={() => setBioExpanded(v => !v)}
                      className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-brand-coral hover:opacity-80 transition-opacity"
                    >
                      {bioExpanded ? (
                        <><ChevronUp size={14} /> Read less</>
                      ) : (
                        <><ChevronDown size={14} /> Read more</>
                      )}
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── Latest Thinking ── */}
        <div className="border-b border-gray-100">
          <div className="container mx-auto px-4 md:px-6 py-10 max-w-4xl">
            <h2 className="text-lg font-bold text-gray-900 mb-6">
              {author.name.split(" ").slice(0, 2).join(" ")}'s Latest Thinking
            </h2>
            {blogs.length === 0 ? (
              <p className="text-sm text-gray-400 italic">No articles available yet.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {blogs.slice(0, 6).map((blog) => (
                  <Link
                    key={blog.id}
                    to={`/blog/${blog.slug}`}
                    className="group border border-gray-100 rounded-xl overflow-hidden hover:shadow-md transition-all"
                  >
                    {blog.heroImage && (
                      <div className="h-36 overflow-hidden bg-gray-100">
                        <img
                          src={blog.heroImage} alt={blog.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
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

        {/* ── Discover Other Contributors ── */}
        {otherAuthors.length > 0 && (
          <div className="border-b border-gray-100">
            <div className="container mx-auto px-4 md:px-6 py-10 max-w-4xl">
              <h2 className="text-lg font-bold text-gray-900 mb-6">Discover Other Contributors</h2>
              <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {otherAuthors.slice(0, 10).map((other) => {
                  const slug = other.slug || authorSlugFromName(other.name);
                  return (
                    <Link
                      key={other.id}
                      to={`/contributors/${slug}`}
                      className="group flex flex-col items-center text-center p-3 rounded-xl hover:bg-gray-50 transition-colors"
                    >
                      {other.avatar ? (
                        <img
                          src={other.avatar} alt={other.name}
                          className="w-16 h-16 rounded-full object-cover mb-2 border border-gray-100 group-hover:scale-105 transition-transform"
                        />
                      ) : (
                        <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-gray-400 font-bold text-xl mb-2">
                          {other.name[0]}
                        </div>
                      )}
                      <p className="text-xs font-semibold text-gray-900 line-clamp-2 leading-tight">
                        {other.name}
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5 line-clamp-2 leading-tight">
                        {other.title}
                      </p>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ── Connect CTA ── */}
        {(author.linkedIn || author.email) && (
          <div className="bg-gray-50 border-t border-gray-100">
            <div className="container mx-auto px-4 md:px-6 py-12 max-w-4xl">
              <h2 className="text-lg font-bold text-gray-900 mb-1">
                Connect with {author.name.split(" ")[0]} {author.name.split(" ")[1] ?? ""}
              </h2>
              <p className="text-sm text-gray-500 mb-6">
                Interested in learning more about Digital Cognitive Organizations or exploring collaboration opportunities? Get in touch.
              </p>
              <div className="flex flex-wrap gap-3">
                {author.linkedIn && (
                  <a
                    href={author.linkedIn.startsWith("http") ? author.linkedIn : `https://${author.linkedIn}`}
                    target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#030F35] text-white text-sm font-medium rounded-lg hover:bg-[#0a1f5c] transition-colors"
                  >
                    <Linkedin size={15} /> Connect on LinkedIn
                  </a>
                )}
                {author.email && (
                  <a
                    href={`mailto:${author.email}`}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-coral text-white text-sm font-medium rounded-lg hover:opacity-90 transition-opacity"
                  >
                    <Mail size={15} /> Send Email
                  </a>
                )}
              </div>
            </div>
          </div>
        )}

      </main>
      <Footer />
    </div>
  );
}

function ExpandableBio({ bioHtml }: { bioHtml: string }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div>
      <div className="relative">
        <div
          style={{ maxHeight: expanded ? "none" : "6rem" }}
          className="overflow-hidden transition-all duration-300"
        >
          <div
            className="prose prose-sm prose-gray max-w-none text-sm leading-relaxed"
            dangerouslySetInnerHTML={{ __html: bioHtml }}
          />
        </div>
        {!expanded && (
          <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white to-transparent pointer-events-none" />
        )}
      </div>
      <button
        onClick={() => setExpanded(v => !v)}
        className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-brand-coral hover:opacity-80 transition-opacity"
      >
        {expanded ? (
          <><ChevronUp size={14} /> Read less</>
        ) : (
          <><ChevronDown size={14} /> Read more</>
        )}
      </button>
    </div>
  );
}
