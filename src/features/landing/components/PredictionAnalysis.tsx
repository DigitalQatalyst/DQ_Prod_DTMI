import { useNavigate } from "react-router-dom";
import { Container, Title, Text, Group, Button, Loader, Stack, Badge } from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import { IconArrowRight, IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { useRef } from "react";
import Autoplay from "embla-carousel-autoplay";
import { usePredictionAnalysis } from "../hooks/usePredictionAnalysis";
import { PredictionItem } from "../api/predictionAnalysis";

export function PredictionAnalysis() {
  const navigate = useNavigate();
  const { data, isLoading, error } = usePredictionAnalysis();
  const autoplay = useRef(Autoplay({ delay: 5000 }));

  const predictions = data?.predictions || [];

  if (isLoading) {
    return (
      <section className="py-20 bg-gray-50">
        <Container size="xl">
          <div className="h-[500px] flex items-center justify-center">
            <Stack align="center" gap="md">
              <Loader size="lg" />
              <Text c="dimmed">Loading prediction analysis...</Text>
            </Stack>
          </div>
        </Container>
      </section>
    );
  }

  if (error || predictions.length === 0) {
    return (
      <section className="py-20 bg-gray-50">
        <Container size="xl">
          <div className="h-[500px] flex items-center justify-center">
            <Text c="dimmed">
              {error ? "Failed to load prediction analysis" : "No prediction analysis available at the moment."}
            </Text>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gray-50">
      <Container size="xl">
        {/* Section Header */}
        <div className="text-center mb-12">
          <Title order={2} size="h1" className="font-display text-4xl md:text-5xl font-bold text-gray-900 tracking-tight mb-4">
            Featured Deep Analysis
          </Title>
          <Button
            variant="subtle"
            rightSection={<IconArrowRight size={20} />}
            onClick={() => navigate("/marketplace/dtmi?tab=deep-analysis")}
            className="text-purple-600 hover:text-purple-700 font-semibold"
          >
            Browse All Deep Analysis
          </Button>
        </div>

        {/* Carousel */}
        <Carousel
          withIndicators
          withControls
          slideSize="100%"
          slideGap={0}
          controlSize={48}
          nextControlIcon={<IconChevronRight size={24} />}
          previousControlIcon={<IconChevronLeft size={24} />}
          plugins={[autoplay.current]}
          onMouseEnter={autoplay.current.stop}
          onMouseLeave={autoplay.current.reset}
          styles={{
            control: {
              backgroundColor: 'white',
              border: 'none',
              boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
              color: '#374151',
              '&:hover': {
                backgroundColor: '#f9fafb',
              },
            },
            indicator: {
              width: 12,
              height: 12,
              borderRadius: 6,
              backgroundColor: '#d1d5db',
              '&[data-active]': {
                width: 32,
                backgroundColor: '#ff6b4d', // brand-coral color
              },
            },
            indicators: {
              gap: 12,
              marginTop: 32,
            },
          }}
        >
          {predictions.map((prediction) => (
            <Carousel.Slide key={prediction.id}>
              <PredictionCard 
                prediction={prediction} 
                onClick={() => navigate(prediction.link)} 
              />
            </Carousel.Slide>
          ))}
        </Carousel>
      </Container>
    </section>
  );
}

interface PredictionCardProps {
  prediction: PredictionItem;
  onClick: () => void;
}

function PredictionCard({ prediction, onClick }: PredictionCardProps) {
  return (
    <div
      className="bg-white min-h- rounded-2xl overflow-hidden shadow-lg cursor-pointer hover:shadow-xl transition-all duration-300"
      onClick={onClick}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 h-[500px]">
        {/* Text Content - Left */}
        <div className="p-8 md:p-12 flex flex-col justify-center order-2 lg:order-1">
          <Badge 
            variant="light" 
            color="orange" 
            size="sm" 
            className="mb-4 w-fit"
          >
            {prediction.category}
          </Badge>
          
          <Title 
            order={3} 
            size="h3" 
            className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 leading-tight line-clamp-2"
          >
            {prediction.title}
          </Title>
          
          <Text 
            c="dimmed" 
            className="mb-6 leading-relaxed flex-grow line-clamp-4"
          >
            {prediction.description}
          </Text>
          
          <Group gap="xs" className="text-gray-900 hover:text-brand-coral transition-colors font-semibold group cursor-pointer">
            <Text fw={600}>Read more</Text>
            <IconArrowRight 
              size={20} 
              className="group-hover:translate-x-1 transition-transform" 
            />
          </Group>
        </div>

        {/* Image - Right */}
        <div className="relative h-full lg:h-full order-1 lg:order-2">
          <img
            src={prediction.image}
            alt={prediction.title}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}
