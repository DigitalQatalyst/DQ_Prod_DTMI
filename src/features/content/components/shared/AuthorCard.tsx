import { Link } from "react-router-dom";
import { Calendar, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { Author, ContentDetail } from "../../api/types";

const LinkedinIcon = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current text-[#0077B5]" aria-hidden="true">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const XIcon = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

interface AuthorCardProps {
  author: Author;
  relatedPosts?: ContentDetail[];
}

export function AuthorCard({ author, relatedPosts = [] }: AuthorCardProps) {
  return (
    <div className="mt-8 pt-8 border-t border-border">
        <Card className="border-border bg-linear-to-br from-muted/50 to-card">
        <CardContent className="p-8">
          <div className="flex flex-col md:flex-row gap-6">
            {author.avatar && (
              <img
                src={author.avatar}
                alt={author.name}
                className="w-20 h-20 rounded-full object-cover border-4 border-background shadow-md shrink-0"
              />
            )}
            <div className="flex-1">
              <h3 className="font-heading text-xl font-bold text-card-foreground mb-1">{author.name}</h3>
              {author.title && <p className="text-primary font-medium text-sm mb-3">{author.title}</p>}
              {author.bio && <p className="text-muted-foreground text-sm leading-relaxed mb-4">{author.bio}</p>}
              <div className="flex gap-2">
                {author.linkedIn && (
                  <a href={author.linkedIn} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3 py-1.5 border border-border rounded-lg text-xs font-medium text-muted-foreground hover:text-[#0077B5] hover:border-[#0077B5] transition-colors">
                    <LinkedinIcon /> LinkedIn
                  </a>
                )}
                {author.twitter && (
                  <a href={author.twitter} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3 py-1.5 border border-border rounded-lg text-xs font-medium text-muted-foreground hover:text-foreground hover:border-foreground transition-colors">
                    <XIcon /> X
                  </a>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* More from this author */}
      {relatedPosts.length > 0 && (
        <div className="mt-8">
          <h4 className="font-heading text-lg font-semibold text-foreground mb-4">More from {author.name}</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {relatedPosts.map((post) => (
              <Link key={post.id} to={post.link}
                className="group flex flex-col bg-card border border-border rounded-xl overflow-hidden hover:shadow-md transition-shadow">
                <img src={post.heroImage} alt={post.title} className="w-full h-32 object-cover group-hover:opacity-90 transition-opacity" />
                <div className="p-4 flex flex-col flex-1">
                  <p className="text-sm font-medium text-card-foreground line-clamp-2 mb-2 group-hover:text-primary transition-colors">
                    {post.title}
                  </p>
                  <div className="mt-auto flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{post.publishDate}</span>
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{post.readTime} min</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
