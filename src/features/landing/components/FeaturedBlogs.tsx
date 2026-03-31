import { useNavigate } from "react-router-dom";
import { Container, Title, Text, Grid, Image, Button, Group, Loader, Center, Stack, Badge } from "@mantine/core";
import { IconArrowRight, IconClock } from "@tabler/icons-react";
import { useFeaturedBlogs } from "../hooks/useFeaturedBlogs";
import { FeaturedBlog } from "../api/featuredBlogs";

export function FeaturedBlogs() {
  const navigate = useNavigate();
  const { data, isLoading, error } = useFeaturedBlogs();

  const featuredBlog = data?.featuredBlog;
  const relatedBlogs = data?.relatedBlogs || [];

  if (isLoading) {
    return (
      <section className="py-20 bg-white">
        <Container size="xl">
          <Center>
            <Stack align="center" gap="md">
              <Loader size="lg" />
              <Text c="dimmed">Loading blogs...</Text>
            </Stack>
          </Center>
        </Container>
      </section>
    );
  }

  if (error || !featuredBlog) {
    return (
      <section className="py-20 bg-white">
        <Container size="xl">
          <Center>
            <Text c="dimmed">
              {error ? "Failed to load blogs" : "No blogs available at the moment."}
            </Text>
          </Center>
        </Container>
      </section>
    );
  }

  return (
    <section className="py-20 bg-white">
      <Container size="xl">
        {/* Section Header */}
        <div className="text-center mb-12">
          <Title order={2} size="h1" className="font-display text-4xl md:text-5xl font-bold text-gray-900 tracking-tight mb-4">
            Latest Signals
          </Title>
          <Button
            variant="subtle"
            rightSection={<IconArrowRight size={20} />}
            onClick={() => navigate("/marketplace/dtmi?tab=signals")}
            className="text-brand-coral hover:text-orange-700 font-semibold"
          >
            Browse All Signals
          </Button>
        </div>

        {/* Two-Column Layout */}
        <Grid align="stretch">
          {/* Left Column - Featured Blog */}
          <Grid.Col span={{ base: 12, lg: 6 }} className="flex">
            <FeaturedBlogCard blog={featuredBlog} onClick={() => navigate(featuredBlog.link)} />
          </Grid.Col>

          {/* Right Column - Related Blogs */}
          <Grid.Col span={{ base: 12, lg: 6 }}>
            <Stack gap="md" className="h-full">
              <Title order={3} size="h4" className="text-xl font-bold text-gray-900">
                Related Blogs
              </Title>
              <Stack gap={0} className="flex-1 divide-y divide-gray-200">
                {relatedBlogs.map((blog) => (
                  <RelatedBlogCard 
                    key={blog.id} 
                    blog={blog} 
                    onClick={() => navigate(blog.link)} 
                  />
                ))}
              </Stack>
            </Stack>
          </Grid.Col>
        </Grid>
      </Container>
    </section>
  );
}

interface FeaturedBlogCardProps {
  blog: FeaturedBlog;
  onClick: () => void;
}

function FeaturedBlogCard({ blog, onClick }: FeaturedBlogCardProps) {
  return (
    <div className="group cursor-pointer h-full flex flex-col" onClick={onClick}>
      {/* Image — grows to fill available vertical space */}
      <div className="relative rounded-lg overflow-hidden mb-4 flex-1 min-h-[200px]">
        <Image
          src={blog.image}
          alt={blog.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          style={{ position: 'absolute', inset: 0 }}
        />
      </div>

      <Stack gap="sm">
        {/* Category Badge */}
        <Badge variant="light" size="sm" className="w-fit">
          {blog.category}
        </Badge>

        {/* Title */}
        <Title 
          order={3} 
          size="h3" 
          className="text-2xl md:text-3xl font-bold text-gray-900 group-hover:text-brand-coral transition-colors leading-tight line-clamp-2"
        >
          {blog.title}
        </Title>

        {/* Description — capped to 3 lines to balance with right column */}
        <Text c="dimmed" size="sm" className="leading-relaxed line-clamp-3">
          {blog.description}
        </Text>

        {/* Meta Info */}
        <Group gap="xs">
          {blog.readTime && (
            <>
              <IconClock size={16} className="text-gray-500" />
              <Text size="sm" c="dimmed">{blog.readTime}</Text>
              <Text size="sm" c="dimmed">•</Text>
            </>
          )}
          <Text size="sm" c="dimmed">{blog.date}</Text>
        </Group>
      </Stack>
    </div>
  );
}

interface RelatedBlogCardProps {
  blog: FeaturedBlog;
  onClick: () => void;
}

function RelatedBlogCard({ blog, onClick }: RelatedBlogCardProps) {
  return (
    <Group 
      gap="md" 
      className="group cursor-pointer py-4 last:pb-0" 
      onClick={onClick}
      align="flex-start"
    >
      {/* Thumbnail */}
      <div className="relative w-20 h-20 flex-shrink-0 rounded overflow-hidden">
        <Image
          src={blog.image}
          alt={blog.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <Stack gap={4} className="flex-1">
        <Title 
          order={4} 
          size="sm" 
          fw={700}
          className="text-gray-900 group-hover:text-brand-coral transition-colors line-clamp-2 leading-snug"
        >
          {blog.title}
        </Title>
        {/* Description — capped to 2 lines */}
        <Text size="xs" c="dimmed" className="line-clamp-2 leading-relaxed">
          {blog.description}
        </Text>
        <Text size="xs" c="dimmed" className="mt-1">{blog.date}</Text>
      </Stack>
    </Group>
  );
}
