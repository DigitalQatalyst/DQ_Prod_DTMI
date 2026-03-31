import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Title, Text, Grid, Card, Image, Button, Loader, Center, Stack } from "@mantine/core";
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
      setFeaturedIndex((prevIndex) => (prevIndex + 1) % articles.length);
    }, 30000); // 30 seconds

    return () => clearInterval(interval);
  }, [articles.length]);

  if (isLoading) {
    return (
      <section className="py-20 bg-gray-50">
        <Container size="xl">
          <Stack align="center" gap="xl">
            <div className="text-center mb-12">
              <Title order={2} size="h1" className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Latest Perspectives
              </Title>
              <Text size="lg" c="dimmed" className="max-w-2xl mx-auto">
                Discover the latest insights and perspectives from our digital transformation experts
              </Text>
            </div>
            <Center className="py-20">
              <Stack align="center" gap="xl">
                <div className="relative">
                  <Loader size="xl" />
                </div>
                <div className="text-center">
                  <Text fw={500} size="lg" className="mb-2">Loading latest content</Text>
                  <Text size="sm" c="dimmed">Fetching the most recent articles and insights...</Text>
                </div>
              </Stack>
            </Center>
          </Stack>
        </Container>
      </section>
    );
  }

  if (error || articles.length === 0) {
    return (
      <section className="py-20 bg-gray-50">
        <Container size="xl">
          <div className="text-center">
            <Title order={2} size="h1" className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Latest Perspectives
            </Title>
            <Text size="lg" c="dimmed">
              {error ? "Failed to load articles" : "No articles available at the moment."}
            </Text>
          </div>
        </Container>
      </section>
    );
  }

  // Rotate articles based on featuredIndex
  const rotatedArticles = [
    ...articles.slice(featuredIndex),
    ...articles.slice(0, featuredIndex),
  ];

  const featuredArticle = rotatedArticles[0];
  const leftArticles = rotatedArticles.slice(1, 3);
  const rightArticles = rotatedArticles.slice(3, 5);

  return (
    <section className="py-20 bg-gray-50">
      <Container size="xl">
        {/* Section Header */}
        <div className="text-center mb-12">
          <Title order={2} size="h1" className="font-display text-4xl md:text-5xl font-bold text-gray-900 tracking-tight mb-4">
            THE WEEK'S HIGHLIGHTS
          </Title>
          <Button
            variant="subtle"
            rightSection={<IconArrowRight size={20} />}
            onClick={() => navigate("/marketplace/dtmi?tab=insights")}
            className="text-blue-600 hover:text-blue-700 font-semibold"
          >
            Browse All Insights
          </Button>
        </div>

        {/* Three-Column Layout */}
        <Grid className="mb-8">
          {/* Left Column - Small Articles */}
          <Grid.Col span={{ base: 12, lg: 3 }}>
            <Stack gap="md">
              {leftArticles.map((article) => (
                <ArticleCard key={article.id} article={article} size="small" onClick={() => navigate(article.link)} />
              ))}
            </Stack>
          </Grid.Col>

          {/* Center Column - Featured Article */}
          <Grid.Col span={{ base: 12, lg: 6 }}>
            {featuredArticle && (
              <ArticleCard 
                article={featuredArticle} 
                size="large" 
                featured 
                onClick={() => navigate(featuredArticle.link)} 
              />
            )}
          </Grid.Col>

          {/* Right Column - Small Articles */}
          <Grid.Col span={{ base: 12, lg: 3 }}>
            <Stack gap="md">
              {rightArticles.map((article) => (
                <ArticleCard key={article.id} article={article} size="small" onClick={() => navigate(article.link)} />
              ))}
            </Stack>
          </Grid.Col>
        </Grid>

        {/* Bottom Row - Text-Only Headlines with Scrolling Animation */}
        <div className="relative overflow-hidden">
          <div className="animate-scroll flex gap-6 whitespace-nowrap">
            {/* First set of dynamic headlines */}
            {articles.map((article, index) => (
              <div
                key={`headline-${index}`}
                className="group cursor-pointer inline-block min-w-max"
                onClick={() => navigate(article.link)}
              >
                <Text size="sm" fw={600} className="text-gray-900 hover:text-brand-coral transition-colors">
                  {article.title}
                </Text>
              </div>
            ))}
            {/* Duplicate set for seamless loop */}
            {articles.map((article, index) => (
              <div
                key={`headline-duplicate-${index}`}
                className="group cursor-pointer inline-block min-w-max"
                onClick={() => navigate(article.link)}
              >
                <Text size="sm" fw={600} className="text-gray-900 hover:text-brand-coral transition-colors">
                  {article.title}
                </Text>
              </div>
            ))}
          </div>
        </div>

        {/* CSS Animation */}
        <style>{`
          @keyframes scroll {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }
          .animate-scroll {
            animation: scroll 40s linear infinite;
          }
          .animate-scroll:hover {
            animation-play-state: paused;
          }
        `}</style>
      </Container>
    </section>
  );
}

interface ArticleCardProps {
  article: FeaturedArticle;
  size: 'small' | 'large';
  featured?: boolean;
  onClick: () => void;
}

function ArticleCard({ article, size, featured = false, onClick }: ArticleCardProps) {
  const isLarge = size === 'large';
  
  return (
    <Card
      className={`group bg-white rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer ${isLarge ? 'h-full' : ''}`}
      onClick={onClick}
    >
      {/* Image */}
      <div className={`relative overflow-hidden ${isLarge ? 'h-80' : 'h-40'}`}>
        <Image
          src={article.image}
          alt={article.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {/* Trending Badge for featured */}
        {featured && (
          <div className="absolute bottom-4 left-4">
            <span className="bg-red-600 text-white text-xs font-bold px-3 py-1 uppercase rounded">
              Trending
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className={isLarge ? "p-6" : "p-4"}>
        <Title 
          order={3} 
          size={isLarge ? "h3" : "sm"} 
          fw={700}
          className={`text-gray-900 mb-2 group-hover:text-brand-coral transition-colors line-clamp-2 ${isLarge ? 'mb-3' : ''}`}
        >
          {article.title}
        </Title>
        {isLarge && (
          <Text size="sm" c="dimmed" className="mb-4 line-clamp-2">
            {article.description}
          </Text>
        )}
        <Text size="xs" c="dimmed">
          {article.date}
        </Text>
      </div>
    </Card>
  );
}


