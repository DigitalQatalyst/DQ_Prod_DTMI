import React from "react";
import { useNavigate } from "react-router-dom";
import { Container, Title, Text, Grid, Card, Image, Group, Loader, Center, Stack, Badge, Avatar } from "@mantine/core";
import { IconClock, IconStar, IconFileText, IconDownload } from "@tabler/icons-react";
import { useEditorsPickDeepAnalysis } from "../../../landing/hooks/useEditorsPickDeepAnalysis";
import { EditorPickAnalysis } from "../../../landing/api/editorsPickDeepAnalysis";

export const EditorsPickDeepAnalysis: React.FC = () => {
  const navigate = useNavigate();
  const { data, isLoading, error } = useEditorsPickDeepAnalysis();

  const editorPickAnalysis = data?.editorsPicks || [];

  const handleAnalysisClick = (analysis: EditorPickAnalysis) => {
    navigate(analysis.link);
  };

  if (isLoading) {
    return (
      <section className="bg-gray-50 py-16">
        <Container size="xl">
          <Center className="py-20">
            <Stack align="center" gap="md">
              <Loader size="lg" color="violet" />
              <Text c="dimmed">Loading editor's picks...</Text>
            </Stack>
          </Center>
        </Container>
      </section>
    );
  }

  if (error || editorPickAnalysis.length === 0) {
    return null;
  }

  return (
    <section className="bg-gray-50 py-16">
      <Container size="xl">
        {/* Section Header */}
        <div className="mb-12">
          <Group gap="sm" className="mb-4">
            <IconStar className="text-purple-600" size={24} />
            <Title order={2} size="h2" className="text-3xl font-bold text-gray-900">
              Editor's Pick
            </Title>
          </Group>
        </div>

        {/* Two Column Layout */}
        <Grid>
          {editorPickAnalysis.map((analysis) => (
            <Grid.Col key={analysis.id} span={{ base: 12, lg: 6 }}>
              <EditorPickCard 
                analysis={analysis} 
                onClick={() => handleAnalysisClick(analysis)} 
              />
            </Grid.Col>
          ))}
        </Grid>
      </Container>
    </section>
  );
};

interface EditorPickCardProps {
  analysis: EditorPickAnalysis;
  onClick: () => void;
}

function EditorPickCard({ analysis, onClick }: EditorPickCardProps) {
  return (
    <Card
      className="group cursor-pointer bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden"
      onClick={onClick}
    >
      {/* Hero Image */}
      <div className="relative">
        <Image
          src={analysis.heroImage}
          alt={analysis.title}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Badges */}
        <div className="absolute top-4 left-4 flex gap-2">
          <Badge 
            color="violet" 
            size="sm" 
            leftSection={<IconStar size={14} />}
            className="font-semibold"
          >
            EDITOR'S PICK
          </Badge>
        </div>

        {/* Analysis Type Badge */}
        <div className="absolute top-4 right-4">
          <Badge 
            variant="light" 
            color="violet" 
            size="sm" 
            leftSection={<IconFileText size={14} />}
            className="bg-white bg-opacity-90"
          >
            {analysis.analysisType}
          </Badge>
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Category and Meta */}
        <Group justify="space-between" className="mb-3">
          <Badge variant="light" color="violet" size="sm">
            {analysis.category}
          </Badge>
          
          <Group gap="sm">
            {analysis.pages && (
              <Group gap="xs">
                <IconFileText size={14} className="text-gray-500" />
                <Text size="sm" c="dimmed">{analysis.pages} pages</Text>
              </Group>
            )}
            <Group gap="xs">
              <IconClock size={14} className="text-gray-500" />
              <Text size="sm" c="dimmed">{analysis.readTime} min</Text>
            </Group>
          </Group>
        </Group>

        {/* Title */}
        <Title 
          order={3} 
          size="h4" 
          className="text-xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors line-clamp-2"
        >
          {analysis.title}
        </Title>

        {/* Excerpt */}
        <Text size="sm" c="dimmed" className="mb-4 line-clamp-3">
          {analysis.excerpt}
        </Text>

        {/* Author */}
        <Group gap="sm" className="mb-4">
          <Avatar 
            size="sm" 
            color="violet" 
            className="bg-purple-100"
          >
            {analysis.author.split(" ").map((n) => n[0]).join("")}
          </Avatar>
          <div>
            <Text size="sm" fw={500} className="text-gray-900">
              {analysis.author}
            </Text>
            <Text size="xs" c="dimmed">
              {analysis.publishDate}
            </Text>
          </div>
        </Group>

        {/* Editor's Note */}
        <div className="bg-purple-50 border-l-4 border-purple-600 p-3 rounded-r mb-4">
          <Text size="xs" fw={500} className="text-purple-800 mb-1">
            Editor's Note
          </Text>
          <Text size="sm" className="text-purple-700 italic">
            "{analysis.editorNote}"
          </Text>
        </div>

        {/* Download CTA */}
        <Group justify="space-between" className="pt-3 border-t border-gray-100">
          <Text size="sm" c="dimmed">
            Strategic {analysis.analysisType.toLowerCase()}
          </Text>
          <Group gap="xs" className="text-purple-600">
            <IconDownload size={14} />
            <Text size="sm" fw={500}>Access Full Report</Text>
          </Group>
        </Group>
      </div>
    </Card>
  );
}

