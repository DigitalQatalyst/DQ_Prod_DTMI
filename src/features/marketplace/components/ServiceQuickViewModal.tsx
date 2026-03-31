import React from "react";
import { Link } from "react-router-dom";
import { ServiceItem } from "../../../types/marketplace";
import {
  Modal,
  ActionIcon,
  Group,
  Badge,
  Stack,
  Text,
  Button,
  ScrollArea,
} from "@mantine/core";
import {
  Clock,
  Calendar,
  DollarSign,
  MapPin,
  BookmarkIcon,
  ScaleIcon,
  CheckCircleIcon,
  HomeIcon,
  ChevronRightIcon,
} from "lucide-react";

interface ServiceQuickViewModalProps {
  service: ServiceItem;
  onClose: () => void;
  onViewDetails: () => void;
  isBookmarked: boolean;
  onToggleBookmark: () => void;
  onAddToComparison: () => void;
  marketplaceType: string;
  primaryButtonText?: string;
}

export const ServiceQuickViewModal: React.FC<ServiceQuickViewModalProps> = ({
  service,
  onClose,
  onViewDetails,
  isBookmarked,
  onToggleBookmark,
  onAddToComparison,
  marketplaceType,
  primaryButtonText = "Enroll Now",
}) => {
  // Extract key highlights from details (first 3)
  const keyHighlights = service.details?.slice(0, 3) || [];
  // Get title based on marketplace type
  const getMarketplaceTitle = () => {
    switch (marketplaceType) {
      case "courses":
        return "Course Preview";
      case "financial":
        return "Financial Service Preview";
      case "non-financial":
        return "Service Preview";
      default:
        return "Item Preview";
    }
  };
  // Get breadcrumb title based on marketplace type
  const getBreadcrumbTitle = () => {
    switch (marketplaceType) {
      case "courses":
        return "Courses";
      case "financial":
        return "Financial Services";
      case "non-financial":
        return "Non-Financial Services";
      default:
        return "Marketplace";
    }
  };
  return (
    <Modal
      opened={true}
      onClose={onClose}
      title={getMarketplaceTitle()}
      size="xl"
      styles={{
        header: {
          borderBottom: "1px solid #E5E7EB",
          marginBottom: 0,
          paddingBottom: "1rem",
        },
        title: {
          fontSize: "1.25rem",
          fontWeight: 700,
          color: "#111827",
        },
        body: {
          padding: "1.5rem",
        },
        content: {
          maxHeight: "90vh",
        },
      }}
    >
      <Stack>
        {/* Action buttons - Top right corner */}
        <Group
          justify="flex-end"
          gap="xs"
          style={{ marginTop: "-3rem", marginBottom: "1rem" }}
        >
          <ActionIcon
            onClick={onToggleBookmark}
            variant={isBookmarked ? "filled" : "light"}
            color={isBookmarked ? "yellow" : "gray"}
            size="lg"
            radius="xl"
            aria-label={isBookmarked ? "Remove bookmark" : "Add bookmark"}
          >
            <BookmarkIcon size={18} />
          </ActionIcon>
          <ActionIcon
            onClick={onAddToComparison}
            variant="light"
            color="gray"
            size="lg"
            radius="xl"
            aria-label="Add to comparison"
          >
            <ScaleIcon size={18} />
          </ActionIcon>
        </Group>

        <ScrollArea.Autosize mah="calc(90vh - 150px)" offsetScrollbars>
            {/* Breadcrumbs */}
            <Group gap="xs" mb="md">
              <Link
                to="/"
                style={{
                  display: "flex",
                  alignItems: "center",
                  textDecoration: "none",
                  color: "#4B5563",
                }}
              >
                <HomeIcon size={14} style={{ marginRight: "0.25rem" }} />
                <Text size="sm">Home</Text>
              </Link>
              <ChevronRightIcon size={14} style={{ color: "#9CA3AF" }} />
              <Link
                to={`/marketplace/${marketplaceType}`}
                style={{ textDecoration: "none", color: "#4B5563" }}
              >
                <Text size="sm">{getBreadcrumbTitle()}</Text>
              </Link>
              <ChevronRightIcon size={14} style={{ color: "#9CA3AF" }} />
              <Text
                size="sm"
                c="dimmed"
                lineClamp={1}
                style={{ maxWidth: "150px" }}
              >
                {service.title}
              </Text>
            </Group>

            {/* Provider Section */}
            <Group mb="md">
              <img
                src={service.provider.logoUrl}
                alt={`${service.provider.name} logo`}
                style={{
                  height: "3rem",
                  width: "3rem",
                  objectFit: "contain",
                  borderRadius: "0.5rem",
                  backgroundColor: "#F9FAFB",
                  padding: "0.5rem",
                }}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "/mzn_logo.png";
                }}
              />
              <Stack gap={0}>
                <Text size="sm" c="dimmed">
                  Provided by
                </Text>
                <Text size="lg" fw={500} c="#111827">
                  {service.provider.name}
                </Text>
              </Stack>
            </Group>

            {/* Title */}
            <Text size="xl" fw={700} c="#111827" mb="sm">
              {service.title}
            </Text>

            {/* Tags */}
            <Group gap="xs" mb="md">
              {service.tags &&
                service.tags.map((tag, index) => {
                  const colors = [
                    { bg: "#EFF6FF", text: "#1E40AF", border: "#DBEAFE" },
                    { bg: "#F0FDF4", text: "#15803D", border: "#DCFCE7" },
                    { bg: "#FAF5FF", text: "#7E22CE", border: "#F3E8FF" },
                  ];
                  const colorSet = colors[index % 3];
                  return (
                    <Badge
                      key={index}
                      variant="light"
                      styles={{
                        root: {
                          backgroundColor: colorSet.bg,
                          color: colorSet.text,
                          border: `1px solid ${colorSet.border}`,
                          textTransform: "none",
                          fontWeight: 500,
                        },
                      }}
                    >
                      {tag}
                    </Badge>
                  );
                })}
            </Group>
            {/* Key Attributes */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: "1rem",
                marginBottom: "1.25rem",
              }}
            >
              {service.duration && (
                <Group gap="xs" align="center">
                  <Clock size={18} style={{ color: "#374151" }} />
                  <Text size="sm" c="#374151">
                    {service.duration}
                  </Text>
                </Group>
              )}
              {service.startDate && (
                <Group gap="xs" align="center">
                  <Calendar size={18} style={{ color: "#374151" }} />
                  <Text size="sm" c="#374151">
                    Starts {service.startDate}
                  </Text>
                </Group>
              )}
              {service.price && (
                <Group gap="xs" align="center">
                  <DollarSign size={18} style={{ color: "#374151" }} />
                  <Text size="sm" c="#374151">
                    {service.price}
                  </Text>
                </Group>
              )}
              {service.location && (
                <Group gap="xs" align="center">
                  <MapPin size={18} style={{ color: "#374151" }} />
                  <Text size="sm" c="#374151">
                    {service.location}
                  </Text>
                </Group>
              )}
            </div>

            {/* Description */}
            <Stack gap="xs" mb="md">
              <Text size="lg" fw={600} c="#111827">
                Description
              </Text>
              <Text size="sm" c="#374151">
                {service.description}
              </Text>
            </Stack>

            {/* Key Highlights */}
            {keyHighlights.length > 0 && (
              <Stack gap="xs" mb="md">
                <Text size="lg" fw={600} c="#111827">
                  Key Highlights
                </Text>
                <Stack gap="xs">
                  {keyHighlights.map((highlight, index) => (
                    <Group key={index} gap="xs" align="flex-start" wrap="nowrap">
                      <CheckCircleIcon
                        size={18}
                        style={{
                          color: "#10B981",
                          marginTop: "0.125rem",
                          flexShrink: 0,
                        }}
                      />
                      <Text size="sm" c="#374151">
                        {highlight}
                      </Text>
                    </Group>
                  ))}
                </Stack>
              </Stack>
            )}

            {/* Action Buttons */}
            <Group justify="flex-end" gap="sm">
              <Button
                onClick={onViewDetails}
                variant="light"
                color="blue"
                styles={{
                  root: {
                    fontSize: "0.875rem",
                  },
                }}
              >
                View Full Details
              </Button>
              <Button
                styles={{
                  root: {
                    background: "linear-gradient(to right, #2563EB, #9333EA)",
                    fontSize: "0.875rem",
                    "&:hover": {
                      background: "linear-gradient(to right, #1D4ED8, #7E22CE)",
                    },
                  },
                }}
              >
                {primaryButtonText}
              </Button>
            </Group>
          </Stack>
        </ScrollArea.Autosize>
      </Stack>
    </Modal>
  );
};
