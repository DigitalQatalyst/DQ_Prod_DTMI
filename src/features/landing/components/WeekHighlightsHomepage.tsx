import { useNavigate } from "react-router-dom";
import { ArrowRight, Clock, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useWeekHighlights } from "../hooks/useWeekHighlights";
import type { WeekHighlightItem } from "../api/weekHighlights";

export function WeekHighlightsHomepage() {
  const navigate = useNavigate();
  const { data, isLoading, error } = useWeekHighlights();
  const highlights = data?.highlights || [];

  if (isLoading) {
    return (
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <Skeleton className="h-10 w-64 mb-12" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Skeleton className="h-96 w-full rounded-lg" />
            <Skeleton className="h-96 w-full rounded-lg" />
          </div>
        </div>
      </section>
    );
  }

  if (error || highlights.length === 0) {
    return (
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground">
            {error ? "Failed to load highlights" : "No highlights available"}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground text-center">
            EDITOR'S PICK
          </h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {highlights.slice(0, 2).map((item) => (
            <HighlightCard
              key={item.id}
              item={item}
              onClick={() => navigate(item.link)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function HighlightCard({
  item,
  onClick,
}: Readonly<{
  item: WeekHighlightItem;
  onClick: () => void;
}>) {
  return (
    <div className="cursor-pointer group" onClick={onClick}>
      <div className="relative h-64 lg:h-80 rounded-lg overflow-hidden mb-6">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="space-y-3">
        <Badge variant="secondary" className="w-fit">
          {item.category}
        </Badge>
        <div className="flex items-start gap-3">
          <h3 className="font-heading text-2xl font-bold text-foreground group-hover:text-primary transition-colors leading-tight flex-1 line-clamp-1">
            {item.title}
          </h3>
          <ArrowRight className="h-5 w-5 text-primary mt-1 transition-transform group-hover:translate-x-1 shrink-0" />
        </div>
        <p className="text-muted-foreground text-sm leading-relaxed overflow-hidden [display:-webkit-box] [-webkit-line-clamp:2] [-webkit-box-orient:vertical]">
          {item.description}
        </p>

        <div className="flex justify-between">
          {item.readTime && (
            <div className="flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                {item.readTime}
              </span>
            </div>
          )}

          {item.date && (
            <div className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">{item.date}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
