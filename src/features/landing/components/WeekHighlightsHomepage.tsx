import { useNavigate } from "react-router-dom";
import { Container, Title, Text, Grid, Image, Group, Loader, Center, Stack, Badge } from "@mantine/core";
import { IconArrowRight, IconClock } from "@tabler/icons-react";
import { useWeekHighlights } from "../hooks/useWeekHighlights";
import { WeekHighlightItem } from "../api/weekHighlights";

export function WeekHighlightsHomepage() {
  const navigate = useNavigate();
  const { data, isLoading, error } = useWeekHighlights();

  const highlights = data?.highlights || [];

  if (isLoading) {
    return (
      <section className="py-16 bg-white">
        <Container size="xl">
          <Center>
            <Stack align="center" gap="md">
              <Loader size="lg" />
              <Text c="dimmed">Loading highlights...</Text>
            </Stack>
          </Center>
        </Container>
      </section>
    );
  }

  if (error || highlights.length === 0) {
    return (
      <section className="py-16 bg-white">
        <Container size="xl">
          <Center>
            <Text c="dimmed">
              {error ? "Failed to load highlights" : "No highlights available"}
            </Text>
          </Center>
        </Container>
      </section>
    );
  }

  return (
    <section className="py-16 bg-white">
      <Container size="xl">
        {/* Section Header */}
        <div className="text-center mb-12">
          <Title order={2} size="h1" className="font-display text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
            EDITOR'S PICK
          </Title>
        </div>

        {/* Two Big Cards Side by Side */}
        <Grid>
          {highlights.slice(0, 2).map((item) => (
            <Grid.Col key={item.id} span={{ base: 12, lg: 6 }}>
              <HighlightCard item={item} onClick={() => navigate(item.link)} />
            </Grid.Col>
          ))}
        </Grid>
      </Container>
    </section>
  );
}

interface HighlightCardProps {
  item: WeekHighlightItem;
  onClick: () => void;
}

function HighlightCard({ item, onClick }: HighlightCardProps) {
  return (
    <div className="cursor-pointer group" onClick={onClick}>
      {/* Image */}
      <div className="relative h-64 lg:h-80 rounded-lg overflow-hidden mb-6">
        <Image
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <Stack gap="sm">
        <Badge variant="light" size="sm" className="w-fit">
          {item.category}
        </Badge>
        
        <Group gap="xs" align="flex-start">
          <Title 
            order={3} 
            size="h3" 
            className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors leading-tight flex-1"
          >
            {item.title}
          </Title>
          <IconArrowRight 
            size={20} 
            className="text-blue-600 mt-1 transition-transform group-hover:translate-x-1" 
          />
        </Group>
        
        <Text c="dimmed" className="leading-relaxed">
          <Text component="em" size="sm">{item.date}</Text> - {item.description}
        </Text>
        
        {item.readTime && (
          <Group gap="xs">
            <IconClock size={16} className="text-gray-500" />
            <Text size="sm" c="dimmed">{item.readTime}</Text>
          </Group>
        )}
      </Stack>
    </div>
  );
}
