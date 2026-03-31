import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Title, Text, Button, Loader, Center, Stack } from "@mantine/core";
import { IconArrowRight } from "@tabler/icons-react";
import { useFeaturedInsights } from "../hooks/useFeaturedInsights";
import { FeaturedArticle } from "../api/featuredInsights";

export function FeaturedInsights() {
  const navigate = useNavigate();
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const { data, isLoading, error } = useFeaturedInsights();

  const articles = data?.articles || [];

  // Auto-rotate featured article every 30 seconds
  useEffect(() => {
    if (articles.length === 0) return;
    const interval = setInterval(() => {
      setFeaturedIndex((prev) => (prev + 1) % articles.length);
    }, 30000);
    return () => clearInterval(interval);
  }, [articles.length]);

  if (isLoading) {
    return (
      <section className="py-16 bg-gray-50">
        <Container size="xl">
          <Center className="py-20">
            <Stack align="center" gap="md">
              <Loader size="lg" />
              <Text c="dimmed">Loading latest content...</Text>
            </Stack>
          </Center>
        </Container>
      </section>
    );
  }

  if (error || articles.length === 0) {
    return (
      <section className="py-16 bg-gray-50">
        <Container size="xl">
          <Center>
            <Text c="dimmed">
              {error ? "Failed to load articles" : "No articles available at the moment."}
            </Text>
          </Center>
        </Container>
      </section>
    );
  }

  const rotatedArticles = [
    ...articles.slice(featuredIndex),
    ...articles.slice(0, featuredIndex),
  ];

  const featuredArticle = rotatedArticles[0];
  const leftArticles = rotatedArticles.slice(1, 3);   // 2 cards on the left
  const rightArticles = rotatedArticles.slice(3, 5);  // 2 cards on the right

  return (
    <section className="py-14 bg-gray-50">
      <Container size="xl">
        {/* Section Header */}
        <div className="text-center mb-10">
          <Title order={2} size="h1" className="font-display text-4xl md:text-5xl font-bold text-gray-900 tracking-tight mb-3">
            THE WEEK'S HIGHLIGHTS
          </Title>
          <Button
            variant="subtle"
            rightSection={<IconArrowRight size={18} />}
            onClick={() => navigate("/marketplace/dtmi?tab=insights")}
            className="text-blue-600 hover:text-blue-700 font-semibold"
            size="sm"
          >
            Browse All Insights
          </Button>
        </div>

        {/* Three-Column Layout — all columns same height */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr_1fr] gap-5 items-stretch">

          {/* Left Column — vertical cards, image on top */}
          <div className="flex flex-col gap-4 h-full">
            {leftArticles.map((article) => (
              <SideArticleCard
                key={article.id}
                article={article}
                onClick={() => navigate(article.link)}
              />
            ))}
          </div>

          {/* Center Column — Featured Article */}
          {featuredArticle && (
            <div
              className="group cursor-pointer bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 flex flex-col"
              onClick={() => navigate(featuredArticle.link)}
            >
              {/* Image — takes bulk of the card height */}
              <div className="relative h-64 flex-shrink-0 overflow-hidden">
                <img
                  src={featuredArticle.image}
                  alt={featuredArticle.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <span className="absolute bottom-4 left-4 bg-brand-coral text-white text-[10px] font-bold px-3 py-1 uppercase rounded tracking-wider">
                  Trending
                </span>
              </div>

              {/* Content */}
              <div className="flex flex-col flex-1 p-5">
                <Title
                  order={3}
                  className="text-xl font-bold text-gray-900 group-hover:text-brand-coral transition-colors leading-snug line-clamp-2 mb-2"
                >
                  {featuredArticle.title}
                </Title>
                <Text size="sm" c="dimmed" className="line-clamp-3 leading-relaxed flex-1">
                  {featuredArticle.description}
                </Text>
                <Text size="xs" c="dimmed" className="mt-3 font-medium">
                  {featuredArticle.date}
                </Text>
              </div>
            </div>
          )}

          {/* Right Column — vertical cards, image on top */}
          <div className="flex flex-col gap-4 h-full">
            {rightArticles.map((article) => (
              <SideArticleCard
                key={article.id}
                article={article}
                onClick={() => navigate(article.link)}
              />
            ))}
          </div>
        </div>

        {/* Bottom Ticker — scrolling headlines */}
        <div className="relative overflow-hidden mt-8 pt-6 border-t border-gray-200">
          <div className="animate-scroll-ticker flex gap-8 whitespace-nowrap">
            {[...articles, ...articles].map((article, index) => (
              <span
                key={`ticker-${index}`}
                className="inline-flex items-center gap-3 cursor-pointer group"
                onClick={() => navigate(article.link)}
              >
                <span className="text-brand-coral text-xs font-bold">●</span>
                <Text size="sm" fw={600} className="text-gray-700 group-hover:text-brand-coral transition-colors">
                  {article.title}
                </Text>
              </span>
            ))}
          </div>
        </div>

        {/* CSS Animation */}
        <style>{`
          @keyframes scroll-ticker {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-scroll-ticker {
            animation: scroll-ticker 50s linear infinite;
          }
          .animate-scroll-ticker:hover {
            animation-play-state: paused;
          }
        `}</style>
      </Container>
    </section>
  );
}

interface SideArticleCardProps {
  article: FeaturedArticle;
  onClick: () => void;
}

function SideArticleCard({ article, onClick }: SideArticleCardProps) {
  return (
    <div
      className="group cursor-pointer bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 flex flex-col flex-1"
      onClick={onClick}
    >
      {/* Image — same style as center card */}
      <div className="relative h-36 flex-shrink-0 overflow-hidden">
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
      </div>

      {/* Content — flex-col so date aligns to bottom */}
      <div className="flex flex-col flex-1 p-4">
        <p className="text-sm font-bold text-gray-900 group-hover:text-brand-coral transition-colors line-clamp-2 leading-snug mb-2">
          {article.title}
        </p>
        {/* Description pushes date to the bottom */}
        <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed flex-1">
          {article.description}
        </p>
        <p className="text-xs text-gray-400 mt-3 font-medium pt-3 border-t border-gray-50">
          {article.date}
        </p>
      </div>
    </div>
  );
}
