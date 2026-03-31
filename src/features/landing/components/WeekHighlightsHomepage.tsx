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
      <div className="flex flex-col flex-1 h-full">
        <Badge variant="light" size="xs" className="w-fit mb-3 uppercase tracking-wider font-bold">
          {item.category}
        </Badge>
        
        <div className="flex items-start justify-between gap-4 mb-3">
          <Title 
            order={3} 
            size="h3" 
            className="text-xl md:text-2xl font-bold text-gray-900 group-hover:text-brand-coral transition-colors leading-tight flex-1"
          >
            {item.title}
          </Title>
          <IconArrowRight 
            size={22} 
            className="text-brand-coral mt-1.5 transition-transform group-hover:translate-x-1 flex-shrink-0" 
          />
        </div>
        
        <Text c="dimmed" size="sm" className="leading-relaxed line-clamp-3 mb-6 flex-1">
          {item.description}
        </Text>
        
        <div className="mt-auto pt-4 border-t border-gray-100">
          <Group justify="space-between" align="center">
            <Group gap="xs">
              <Text size="xs" fw={700} className="text-gray-400 uppercase tracking-widest italic">
                {item.date}
              </Text>
            </Group>
            
            {item.readTime && (
              <Group gap="xs">
                <IconClock size={14} className="text-gray-400" />
                <Text size="xs" c="dimmed" fw={500}>{item.readTime}</Text>
              </Group>
            )}
          </Group>
        </div>
      </div>
    </div>
  );
}
