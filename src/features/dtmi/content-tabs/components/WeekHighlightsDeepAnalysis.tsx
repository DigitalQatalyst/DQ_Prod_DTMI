import React from "react";
import { useNavigate } from "react-router-dom";
import { Container, Title, Text, Grid, Card, Image, Group, Loader, Center, Stack, Badge } from "@mantine/core";
import { IconClock } from "@tabler/icons-react";
import { useDeepAnalysisHighlights } from "../../../landing/hooks/useDeepAnalysisHighlights";
import { DeepAnalysisHighlight } from "../../../landing/api/deepAnalysisHighlights";

export const WeekHighlightsDeepAnalysis: React.FC = () => {
  const navigate = useNavigate();
  const { data, isLoading, error } = useDeepAnalysisHighlights();

  const highlightAnalysis = data?.highlights || [];

  const featuredAnalysis = highlightAnalysis.find((analysis) => analysis.featured) || highlightAnalysis[0];
  const leftAnalysis = highlightAnalysis.slice(1, 3); // 2 items on the left
  const rightAnalysis = highlightAnalysis.slice(3, 5); // 2 items on the right

  const handleAnalysisClick = (analysis: DeepAnalysisHighlight) => {
    navigate(analysis.link);
  };

  if (isLoading) {
    return (
      <section className="bg-white py-16">
        <Container size="xl">
          <Center className="py-20">
            <Stack align="center" gap="md">
              <Loader size="lg" color="violet" />
              <Text c="dimmed">Loading deep analysis...</Text>
            </Stack>
          </Center>
        </Container>
      </section>
    );
  }

  if (error || highlightAnalysis.length === 0) {
    return null;
  }

  if (!featuredAnalysis) {
    return null;
  }

  return (
    <section className="bg-white py-16">
      <Container size="xl">
        {/* Section Header */}
        <div className="mb-12">
          <Group gap="sm" className="mb-4">
            <div className="w-1 h-8 bg-purple-600"></div>
            <Title order={2} size="h2" className="text-3xl font-bold text-gray-900">
              The Week's Highlights
            </Title>
          </Group>
        </div>

        {/* 5-Card Layout: 2 Left + 1 Center + 2 Right */}
        <Grid>
          {/* Left Side - 2 Items */}
          <Grid.Col span={{ base: 12, lg: 2 }}>
            <Stack gap="md" className="h-full">
              {leftAnalysis.map((analysis) => (
                <AnalysisCard 
                  key={analysis.id} 
                  analysis={analysis} 
                  size="small"
                  onClick={() => handleAnalysisClick(analysis)} 
                />
              ))}
            </Stack>
          </Grid.Col>

          {/* Center - Featured Analysis */}
          <Grid.Col span={{ base: 12, lg: 8 }}>
            <FeaturedAnalysisCard 
              analysis={featuredAnalysis} 
              onClick={() => handleAnalysisClick(featuredAnalysis)} 
            />
          </Grid.Col>

          {/* Right Side - 2 Items */}
          <Grid.Col span={{ base: 12, lg: 2 }}>
            <Stack gap="md" className="h-full">
              {rightAnalysis.map((analysis) => (
                <AnalysisCard 
                  key={analysis.id} 
                  analysis={analysis} 
                  size="small"
                  onClick={() => handleAnalysisClick(analysis)} 
                />
              ))}
            </Stack>
          </Grid.Col>
        </Grid>
      </Container>
    </section>
  );
};

interface AnalysisCardProps {
  analysis: DeepAnalysisHighlight;
  size: 'small' | 'large';
  onClick: () => void;
}

function AnalysisCard({ analysis, size, onClick }: AnalysisCardProps) {
  const isSmall = size === 'small';
  
  return (
    <Card
      className="group cursor-pointer bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden h-full"
      onClick={onClick}
    >
      <div className="relative">
        <Image
          src={analysis.heroImage}
          alt={analysis.title}
          className={`w-full object-cover group-hover:scale-105 transition-transform duration-300 ${isSmall ? 'h-32' : 'h-48'}`}
        />
      </div>
      
      <div className={`p-4 flex flex-col justify-between ${isSmall ? 'h-32' : 'h-40'}`}>
        <div>
          <Badge 
            variant="light" 
            color="violet" 
            size="xs" 
            className="mb-2"
          >
            {analysis.analysisType}
          </Badge>
          
          <Title 
            order={4} 
            size={isSmall ? "sm" : "md"}
            fw={700}
            className="text-gray-900 mb-2 group-hover:text-purple-600 transition-colors line-clamp-2 leading-tight"
          >
            {analysis.title}
          </Title>
        </div>
        
        <Group gap="xs" className="text-gray-500">
          <IconClock size={12} />
          <Text size="xs">{analysis.readTime} min</Text>
        </Group>
      </div>
    </Card>
  );
}

interface FeaturedAnalysisCardProps {
  analysis: DeepAnalysisHighlight;
  onClick: () => void;
}

function FeaturedAnalysisCard({ analysis, onClick }: FeaturedAnalysisCardProps) {
  return (
    <div
      className="group cursor-pointer w-full h-full"
      onClick={onClick}
    >
      <div className="relative overflow-hidden rounded-lg h-full min-h-[400px]">
        <Image
          src={analysis.heroImage}
          alt={analysis.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        <div className="absolute top-4 left-4">
          <Badge 
            color="violet" 
            size="sm" 
            className="font-semibold"
          >
            FEATURED ANALYSIS
          </Badge>
        </div>
        
        <div className="absolute bottom-4 left-4 right-4">
          <div className="bg-black bg-opacity-60 backdrop-blur-sm rounded-lg p-4">
            <Group gap="xs" className="text-purple-400 text-sm mb-2">
              <Text size="sm" fw={600} className="uppercase">
                {analysis.analysisType}
              </Text>
              <Text size="sm">•</Text>
              <Group gap="xs">
                <IconClock size={14} />
                <Text size="sm">{analysis.readTime} min read</Text>
              </Group>
            </Group>
            
            <Title 
              order={3} 
              size="h4" 
              className="text-white mb-2 group-hover:text-purple-300 transition-colors"
            >
              {analysis.title}
            </Title>
            
            <Text size="sm" className="text-gray-200 line-clamp-2">
              {analysis.excerpt}
            </Text>
          </div>
        </div>
      </div>
    </div>
  );
}

