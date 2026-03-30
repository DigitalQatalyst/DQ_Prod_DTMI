import { ArrowLeft, Calendar, Clock, Tag } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import type { ContentDetail } from "../../api/types";

interface ContentHeaderProps {
  content: ContentDetail;
  backLabel?: string;
  backPath?: string;
}

export function ContentHeader({ content, backLabel = "Back to Marketplace", backPath = "/marketplace" }: ContentHeaderProps) {
  const navigate = useNavigate();

  return (
    <div className="relative bg-background">
      {/* Hero Image */}
      <div className="relative h-[380px] md:h-[480px] overflow-hidden">
        <img
          src={content.heroImage}
          alt={content.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/15" />
        <div className="absolute inset-0 bg-linear-to-t from-black/65 via-black/20 to-transparent" />

        {/* Back button */}
        <div className="absolute top-6 left-4 md:left-6 z-20">
          <button
            onClick={() => navigate(backPath)}
            className="inline-flex items-center gap-2 text-white bg-black/25 hover:bg-white hover:text-foreground backdrop-blur-sm rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200"
          >
            <ArrowLeft className="h-4 w-4" />
            {backLabel}
          </button>
        </div>
      </div>

      {/* Card overlay */}
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto -mt-28 relative z-10">
          <div className="bg-card rounded-2xl shadow-2xl p-8 md:p-12 border border-border">
            {/* Category */}
            <div className="flex items-center gap-2 mb-5">
              <Tag className="h-4 w-4 text-primary" />
              <Badge variant="secondary" className="text-xs font-semibold uppercase tracking-wide">
                {content.category}
              </Badge>
            </div>

            {/* Title */}
            <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-card-foreground mb-5 leading-tight">
              {content.title}
            </h1>

            {/* Excerpt */}
            {content.excerpt && (
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                {content.excerpt}
              </p>
            )}

            {/* Meta */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-border">
              {/* Author */}
              {content.author && (
                <div className="flex items-center gap-3">
                  {content.author.avatar && (
                    <img
                      src={content.author.avatar}
                      alt={content.author.name}
                      className="w-11 h-11 rounded-full object-cover border-2 border-border"
                    />
                  )}
                  <div>
                    <p className="font-semibold text-card-foreground text-sm">{content.author.name}</p>
                    {content.author.title && (
                      <p className="text-xs text-muted-foreground">{content.author.title}</p>
                    )}
                  </div>
                </div>
              )}

              {/* Date + read time */}
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4" />
                  <span>{content.publishDate}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4" />
                  <span>{content.readTime} min read</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
