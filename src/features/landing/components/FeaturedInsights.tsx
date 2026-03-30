import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useFeaturedInsights } from "../hooks/useFeaturedInsights";
import type { FeaturedArticle } from "../api/featuredInsights";

export function FeaturedInsights() {
  const navigate = useNavigate();
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const { data, isLoading, error } = useFeaturedInsights();
  const articles = data?.articles || [];

  useEffect(() => {
    if (articles.length === 0) return;
    const interval = setInterval(() => {
      setFeaturedIndex((prev) => (prev + 1) % articles.length);
    }, 30000);
    return () => clearInterval(interval);
  }, [articles.length]);

  if (isLoading) {
    return (
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <Skeleton className="h-10 w-80 mb-4" />
            <Skeleton className="h-5 w-96" />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-3 space-y-4">
              <Skeleton className="h-40 w-full rounded-lg" />
              <Skeleton className="h-40 w-full rounded-lg" />
            </div>
            <div className="lg:col-span-6">
              <Skeleton className="h-[420px] w-full rounded-lg" />
            </div>
            <div className="lg:col-span-3 space-y-4">
              <Skeleton className="h-40 w-full rounded-lg" />
              <Skeleton className="h-40 w-full rounded-lg" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error || articles.length === 0) {
    return (
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4 text-center">
            Latest Perspectives
          </h2>
          <p className="text-muted-foreground">
            {error
              ? "Failed to load articles"
              : "No articles available at the moment."}
          </p>
        </div>
      </section>
    );
  }

  const rotated = [
    ...articles.slice(featuredIndex),
    ...articles.slice(0, featuredIndex),
  ];
  const featured = rotated[0];
  const left = rotated.slice(1, 3);
  const right = rotated.slice(3, 5);

  return (
    <section className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-12 text-center">
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground text-center mb-4">
            THE WEEK'S HIGHLIGHTS
          </h2>
          <Button
            variant="ghost"
            onClick={() => navigate("/marketplace?tab=insights")}
            className="text-primary hover:text-primary/80 font-semibold"
          >
            Browse All Insights
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>

        {/* Three-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
          <div className="lg:col-span-3 space-y-4">
            {left.map((a) => (
              <ArticleCard
                key={a.id}
                article={a}
                size="small"
                onClick={() => navigate(a.link)}
              />
            ))}
          </div>
          <div className="lg:col-span-6">
            {featured && (
              <ArticleCard
                article={featured}
                size="large"
                featured
                onClick={() => navigate(featured.link)}
              />
            )}
          </div>
          <div className="lg:col-span-3 space-y-4">
            {right.map((a) => (
              <ArticleCard
                key={a.id}
                article={a}
                size="small"
                onClick={() => navigate(a.link)}
              />
            ))}
          </div>
        </div>

        {/* Scrolling Headlines */}
        <div className="relative overflow-hidden">
          <div className="animate-scroll flex gap-6 whitespace-nowrap">
            {[...articles, ...articles].map((article, index) => (
              <div
                key={`headline-${index}`}
                className="cursor-pointer inline-block min-w-max"
                onClick={() => navigate(article.link)}
              >
                <span className="text-sm font-semibold text-foreground hover:text-primary transition-colors">
                  {article.title}
                </span>
              </div>
            ))}
          </div>
        </div>

        <style>{`
          @keyframes scroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
          .animate-scroll { animation: scroll 40s linear infinite; }
          .animate-scroll:hover { animation-play-state: paused; }
        `}</style>
      </div>
    </section>
  );
}

interface ArticleCardProps {
  article: FeaturedArticle;
  size: "small" | "large";
  featured?: boolean;
  onClick: () => void;
}

function ArticleCard({
  article,
  size,
  featured = false,
  onClick,
}: Readonly<ArticleCardProps>) {
  const isLarge = size === "large";
  return (
    <Card
      className={`group overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer border-border p-0 bg-card flex flex-col`}
      onClick={onClick}
    >
      <div className={`relative overflow-hidden ${isLarge ? "h-80" : "h-40"}`}>
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {featured && (
          <div className="absolute bottom-4 left-4">
            <span className="bg-destructive text-destructive-foreground text-xs font-bold px-3 py-1 uppercase rounded">
              Trending
            </span>
          </div>
        )}
      </div>
      <div className={`flex flex-col justify-between flex-1 ${isLarge ? "p-6" : "p-4"}`}>
        <div>
          <h3
            className={`font-heading font-bold text-card-foreground group-hover:text-primary transition-colors line-clamp-2 mb-2 ${isLarge ? "text-xl" : "text-sm"}`}
          >
            {article.title}
          </h3>
          {isLarge && (
            <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
              {article.description}
            </p>
          )}
        </div>
        <p className="text-xs text-muted-foreground">{article.date}</p>
      </div>
    </Card>
  );
}
