import { useNavigate } from "react-router-dom";
import { ArrowRight, User } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { Author } from "../api/authors";

interface AuthorCardProps {
  author: Author;
}

export function AuthorCard({ author }: Readonly<AuthorCardProps>) {
  const navigate = useNavigate();
  const slug = author.slug || author.id;

  return (
    <Card
      onClick={() => navigate(`/contributors/${slug}`)}
      className="cursor-pointer hover:shadow-md transition-all duration-200 group border-border bg-card"
    >
      <CardContent className="p-6 flex flex-col gap-4">
        {/* Top row: avatar + name + works count */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-full overflow-hidden bg-muted border border-border shrink-0">
              {author.avatarUrl ? (
                <img
                  src={author.avatarUrl}
                  alt={author.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <User className="h-6 w-6 text-muted-foreground" />
                </div>
              )}
            </div>
            <div>
              <h3 className="font-heading font-bold text-card-foreground text-lg leading-tight group-hover:text-primary transition-colors">
                {author.name}
              </h3>
              <p className="text-sm text-muted-foreground">
                {author.affiliation || "DigitalQatalyst"}
              </p>
            </div>
          </div>
          <div className="text-right shrink-0">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
              Works
            </p>
            <p className="text-2xl font-bold text-foreground leading-none">
              {author.worksCount}
            </p>
          </div>
        </div>

        {/* Bio */}
        {author.bio && (
          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
            {author.bio}
          </p>
        )}

        {/* Expertise */}
        {author.expertise && (
          <p className="text-sm">
            <span className="font-semibold text-foreground">Expertise: </span>
            <span className="text-muted-foreground">{author.expertise}</span>
          </p>
        )}

        {/* Badges */}
        <div className="flex flex-wrap gap-2">
          {author.contributorType && (
            <span className="px-2.5 py-0.5 bg-blue-50 text-blue-700 border border-blue-200 rounded-full text-xs font-semibold uppercase tracking-wide">
              {author.contributorType.replace(/s$/, "")}
            </span>
          )}
          {author.title && (
            <span className="px-2.5 py-0.5 bg-green-50 text-green-700 border border-green-200 rounded-full text-xs font-semibold">
              {author.title.length > 30
                ? author.title.substring(0, 30) + "…"
                : author.title}
            </span>
          )}
        </div>

        <Separator />

        {/* CTA */}
        <button className="flex items-center gap-1.5 text-sm font-semibold text-primary group-hover:gap-2.5 transition-all">
          Read Contributor Bio
          <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </CardContent>
    </Card>
  );
}
