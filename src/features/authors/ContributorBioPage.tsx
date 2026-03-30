import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  Mail,
  MapPin,
  ChevronLeft,
  Calendar,
  Clock,
  Globe,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

const LinkedinIcon = ({ className = "" }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    className={`fill-current ${className}`}
    aria-hidden="true"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { Header } from "@/shared/Header";
import { Footer } from "@/shared/Footer";
import { Skeleton } from "@/components/ui/skeleton";
import type { Author } from "./api/authors";

const XIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

interface FullAuthor extends Author {
  bioHtml?: string | null;
  linkedIn?: string | null;
  twitter?: string | null;
  website?: string | null;
  email?: string | null;
  location?: string | null;
}

interface ContentPost {
  id: string;
  slug: string | null;
  title: string;
  excerpt: string | null;
  hero_image: string | null;
  publish_date: string | null;
  read_time: number | null;
  type: string | null;
}

async function fetchContributorBySlug(
  slug: string,
): Promise<FullAuthor | null> {
  // Try slug first
  const { data: bySlug } = await supabase
    .from("authors")
    .select(
      "id, name, slug, title, bio, bio_html, avatar_url, contributor_type, expertise, affiliation, works_count, linkedin_url, twitter_url, website_url, email, location",
    )
    .eq("slug", slug)
    .maybeSingle();

  if (bySlug) return mapRawAuthor(bySlug as any);

  // Only try id lookup if it looks like a UUID
  const isUuid =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
      slug,
    );
  if (!isUuid) return null;

  const { data: byId } = await supabase
    .from("authors")
    .select(
      "id, name, slug, title, bio, bio_html, avatar_url, contributor_type, expertise, affiliation, works_count, linkedin_url, twitter_url, website_url, email, location",
    )
    .eq("id", slug)
    .maybeSingle();

  if (!byId) return null;
  return mapRawAuthor(byId as any);
}

function mapRawAuthor(r: any): FullAuthor {
  return {
    id: r.id,
    name: r.name,
    slug: r.slug,
    title: r.title,
    bio: r.bio,
    bioHtml: r.bio_html,
    avatarUrl: r.avatar_url,
    contributorType: r.contributor_type,
    expertise: r.expertise,
    affiliation: r.affiliation || "DigitalQatalyst",
    worksCount: r.works_count ?? 0,
    tags: r.tags || [],
    linkedIn: r.linkedin_url,
    twitter: r.twitter_url,
    website: r.website_url,
    email: r.email,
    location: r.location,
  };
}

async function fetchContributorPosts(authorId: string): Promise<ContentPost[]> {
  const { data } = await supabase
    .from("content_items")
    .select(
      "id, slug, title, excerpt, hero_image, publish_date, read_time, type",
    )
    .eq("author_id", authorId)
    .order("publish_date", { ascending: false })
    .limit(3);
  return (data || []) as ContentPost[];
}

async function fetchOtherContributors(
  currentId: string,
): Promise<FullAuthor[]> {
  const { data } = await supabase
    .from("authors")
    .select(
      "id, name, slug, title, avatar_url, contributor_type, expertise, affiliation, works_count, bio, tags",
    )
    .eq("is_active", true)
    .neq("id", currentId)
    .limit(10);
  return (data || []).map((r: any) => ({
    id: r.id,
    name: r.name,
    slug: r.slug,
    title: r.title,
    avatarUrl: r.avatar_url,
    contributorType: r.contributor_type,
    expertise: r.expertise,
    affiliation: r.affiliation || "DigitalQatalyst",
    worksCount: r.works_count ?? 0,
    bio: r.bio,
    tags: r.tags || [],
  }));
}

function ExpandableBio({ bioHtml }: Readonly<{ bioHtml: string }>) {
  const hasStructuredHtml =
    /<(p|br|ul|ol|li|h1|h2|h3|h4|blockquote|table)\b/i.test(bioHtml);
  const normalizedHtml = hasStructuredHtml
    ? bioHtml
    : bioHtml.replaceAll(/\r?\n/g, "<br />");
  const renderedHtml = normalizedHtml.replaceAll(/(?<!>)\r?\n(?!<)/g, "<br />");

  return (
    <div>
      <div
        className="contributor-bio-content max-w-none text-sm leading-relaxed"
        dangerouslySetInnerHTML={{ __html: renderedHtml }}
      />
    </div>
  );
}

export default function ContributorBioPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const { data: author, isLoading } = useQuery({
    queryKey: ["contributor", slug],
    queryFn: () => fetchContributorBySlug(slug!),
    enabled: !!slug,
    staleTime: 10 * 60 * 1000,
  });

  const { data: posts = [] } = useQuery({
    queryKey: ["contributor-posts", author?.id],
    queryFn: () => fetchContributorPosts(author!.id),
    enabled: !!author?.id,
  });

  const { data: others = [] } = useQuery({
    queryKey: ["other-contributors", author?.id],
    queryFn: () => fetchOtherContributors(author!.id),
    enabled: !!author?.id,
  });

  const [bioExpanded, setBioExpanded] = useState(false);

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen bg-background">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-10 max-w-4xl space-y-6">
          <Skeleton className="h-8 w-24" />
          <div className="flex gap-6">
            <Skeleton className="w-24 h-24 rounded-full" />
            <div className="space-y-2 flex-1">
              <Skeleton className="h-8 w-64" />
              <Skeleton className="h-4 w-40" />
            </div>
          </div>
          <Skeleton className="h-32 w-full" />
        </main>
        <Footer />
      </div>
    );
  }

  if (!author) {
    return (
      <div className="flex flex-col min-h-screen bg-background">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-3">
            <p className="text-muted-foreground">Contributor not found.</p>
            <button
              onClick={() => navigate("/contributors")}
              className="text-primary text-sm underline"
            >
              Back to Contributors
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const briefBio = author.bio || "";
  const BIO_LIMIT = 300;
  const bioIsLong = !author.bioHtml && briefBio.length > BIO_LIMIT;

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <div className="bg-card border-b border-border">
          <div className="container mx-auto px-4 md:px-6 py-10 max-w-4xl">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
            >
              <ChevronLeft className="h-4 w-4" /> Back
            </button>

            <div className="flex items-start gap-6">
              {/* Avatar */}
              <div className="w-24 h-24 rounded-full overflow-hidden bg-muted border-2 border-border shadow-sm shrink-0">
                {author.avatarUrl ? (
                  <img
                    src={author.avatarUrl}
                    alt={author.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground text-3xl font-bold">
                    {author.name[0]}
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="space-y-1.5">
                <h1 className="font-heading text-2xl md:text-3xl font-bold text-foreground leading-tight">
                  {author.name}
                </h1>
                {author.title && (
                  <p className="text-sm text-muted-foreground">
                    {author.title}
                  </p>
                )}
                {author.location && (
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <MapPin className="h-3 w-3" /> {author.location}
                  </div>
                )}
                {/* Social links */}
                <div className="flex items-center gap-2 pt-1">
                  {author.linkedIn && (
                    <a
                      href={
                        author.linkedIn.startsWith("http")
                          ? author.linkedIn
                          : `https://${author.linkedIn}`
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-[#0077B5] hover:border-[#0077B5] transition-colors"
                    >
                      <LinkedinIcon className="h-3.5 w-3.5" />
                    </a>
                  )}
                  {author.twitter && (
                    <a
                      href={
                        author.twitter.startsWith("http")
                          ? author.twitter
                          : `https://${author.twitter}`
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground transition-colors"
                    >
                      <XIcon />
                    </a>
                  )}
                  {author.website && (
                    <a
                      href={
                        author.website.startsWith("http")
                          ? author.website
                          : `https://${author.website}`
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground transition-colors"
                    >
                      <Globe className="h-3.5 w-3.5" />
                    </a>
                  )}
                  {author.email && (
                    <a
                      href={`mailto:${author.email}`}
                      className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground transition-colors"
                    >
                      <Mail className="h-3.5 w-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Professional Summary */}
        {(author.bioHtml || briefBio) && (
          <div className="border-b border-border">
            <div className="container mx-auto px-4 md:px-6 py-10 max-w-4xl">
              <h2 className="font-heading text-lg font-bold text-foreground mb-4">
                Professional Summary
              </h2>
              {author.bioHtml ? (
                <ExpandableBio bioHtml={author.bioHtml} />
              ) : (
                <div>
                  <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                    {bioIsLong && !bioExpanded
                      ? `${briefBio.slice(0, BIO_LIMIT).trimEnd()}…`
                      : briefBio}
                  </p>
                  {bioIsLong && (
                    <button
                      onClick={() => setBioExpanded((v) => !v)}
                      className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary hover:opacity-80 transition-opacity"
                    >
                      {bioExpanded ? (
                        <>
                          <ChevronUp className="h-3.5 w-3.5" /> Read less
                        </>
                      ) : (
                        <>
                          <ChevronDown className="h-3.5 w-3.5" /> Read more
                        </>
                      )}
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Latest Thinking */}
        <div className="border-b border-border">
          <div className="container mx-auto px-4 md:px-6 py-10 max-w-4xl">
            <h2 className="font-heading text-lg font-bold text-foreground mb-6">
              {author.name.split(" ").slice(0, 2).join(" ")}'s Latest Thinking
            </h2>
            {posts.length === 0 ? (
              <p className="text-sm text-muted-foreground italic">
                No articles available yet.
              </p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {posts.map((post) => (
                  <Link
                    key={post.id}
                    to={`/${post.type || "blog"}/${post.slug || post.id}`}
                    className="group border border-border rounded-xl overflow-hidden hover:shadow-md transition-all bg-card"
                  >
                    {post.hero_image && (
                      <div className="h-36 overflow-hidden bg-muted">
                        <img
                          src={post.hero_image}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    <div className="p-4">
                      <p className="text-sm font-semibold text-card-foreground line-clamp-2 group-hover:text-primary transition-colors">
                        {post.title}
                      </p>
                      {post.excerpt && (
                        <p className="text-xs text-muted-foreground mt-1.5 line-clamp-2">
                          {post.excerpt}
                        </p>
                      )}
                      <div className="flex items-center gap-3 mt-3 text-xs text-muted-foreground">
                        {post.publish_date && (
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {new Date(post.publish_date).toLocaleDateString()}
                          </span>
                        )}
                        {post.read_time && post.read_time > 0 && (
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {post.read_time} min
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

        {/* Discover Other Contributors */}
        {others.length > 0 && (
          <div className="border-b border-border">
            <div className="container mx-auto px-4 md:px-6 py-10 max-w-4xl">
              <h2 className="font-heading text-lg font-bold text-foreground mb-6">
                Discover Other Contributors
              </h2>
              <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {others.slice(0, 10).map((other) => (
                  <Link
                    key={other.id}
                    to={`/contributors/${other.slug || other.id}`}
                    className="group flex flex-col items-center text-center p-3 rounded-xl hover:bg-muted transition-colors"
                  >
                    <div className="w-16 h-16 rounded-full overflow-hidden bg-muted border border-border mb-2 group-hover:scale-105 transition-transform">
                      {other.avatarUrl ? (
                        <img
                          src={other.avatarUrl}
                          alt={other.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-muted-foreground font-bold text-xl">
                          {other.name[0]}
                        </div>
                      )}
                    </div>
                    <p className="text-xs font-semibold text-foreground line-clamp-2 leading-tight">
                      {other.name}
                    </p>
                    {other.title && (
                      <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2 leading-tight">
                        {other.title}
                      </p>
                    )}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Connect CTA */}
        {(author.linkedIn || author.email) && (
          <div className="bg-muted border-t border-border">
            <div className="container mx-auto px-4 md:px-6 py-12 max-w-4xl">
              <h2 className="font-heading text-lg font-bold text-foreground mb-1">
                Connect with {author.name.split(" ").slice(0, 2).join(" ")}
              </h2>
              <p className="text-sm text-muted-foreground mb-6">
                Interested in learning more or exploring collaboration
                opportunities? Get in touch.
              </p>
              <div className="flex flex-wrap gap-3">
                {author.linkedIn && (
                  <a
                    href={
                      author.linkedIn.startsWith("http")
                        ? author.linkedIn
                        : `https://${author.linkedIn}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-secondary text-secondary-foreground text-sm font-medium rounded-lg hover:bg-secondary/90 transition-colors"
                  >
                    <LinkedinIcon className="h-4 w-4" /> Connect on LinkedIn
                  </a>
                )}
                {author.email && (
                  <a
                    href={`mailto:${author.email}`}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    <Mail className="h-4 w-4" /> Send Email
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
