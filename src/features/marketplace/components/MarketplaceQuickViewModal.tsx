import React from "react";
import { Link } from "react-router-dom";
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
  BookmarkIcon,
  ScaleIcon,
  CheckCircleIcon,
  HomeIcon,
  ChevronRightIcon,
} from "lucide-react";
import { getMarketplaceConfig } from "../../../utils/marketplaceConfig";

interface MarketplaceQuickViewModalProps {
  item: any;
  marketplaceType: string;
  onClose: () => void;
  onViewDetails: () => void;
  isBookmarked: boolean;
  onToggleBookmark: () => void;
  onAddToComparison: () => void;
}

export const MarketplaceQuickViewModal: React.FC<
  MarketplaceQuickViewModalProps
> = ({
  item,
  marketplaceType,
  onClose,
  onViewDetails,
  isBookmarked,
  onToggleBookmark,
  onAddToComparison,
}) => {
  const config = getMarketplaceConfig(marketplaceType);
  // Extract key highlights - use learningOutcomes or details depending on what's available
  const keyHighlights =
    item.learningOutcomes ||
    item.details ||
    (item.eligibility ? [`Eligibility: ${item.eligibility}`] : []);
  // Limit to 3 highlights for consistency
  const highlightItems = keyHighlights.slice(0, 3);
  // Extract tags from item - use tags if available, otherwise use category and other relevant fields
  const displayTags =
    item.tags ||
    [item.category, item.deliveryMode, item.businessStage, item.serviceType]
      .filter(Boolean)
      .slice(0, 3);
  return (
    <Modal
      opened={true}
      onClose={onClose}
      title={`${config.itemName} Preview`}
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
          <Stack gap="md">
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
                to={config.route}
                style={{ textDecoration: "none", color: "#4B5563" }}
              >
                <Text size="sm">{config.itemNamePlural}</Text>
              </Link>
              <ChevronRightIcon size={14} style={{ color: "#9CA3AF" }} />
              <Text
                size="sm"
                c="dimmed"
                lineClamp={1}
                style={{ maxWidth: "150px" }}
              >
                {item.title}
              </Text>
            </Group>

            {/* Provider Section */}
            <Group mb="md">
              <img
                src={item.provider.logoUrl}
                alt={`${item.provider.name} logo`}
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
                  {item.provider.name}
                </Text>
              </Stack>
            </Group>

            {/* Title */}
            <Text size="xl" fw={700} c="#111827" mb="sm">
              {item.title}
            </Text>

            {/* Tags */}
            <Group gap="xs" mb="md">
              {displayTags.map((tag: string, index: number) => (
                <Badge
                  key={index}
                  variant="light"
                  color={
                    index % 3 === 0
                      ? "blue"
                      : index % 3 === 1
                        ? "green"
                        : "violet"
                  }
                  styles={{
                    root: {
                      textTransform: "none",
                      fontSize: "0.875rem",
                    },
                  }}
                >
                  {tag}
                </Badge>
              ))}
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
              {config.attributes.slice(0, 4).map((attr, index) => {
                if (item[attr.key]) {
                  return (
                    <Group key={index} gap="xs" align="center">
                      {attr.icon}
                      <Text size="sm" c="#374151">
                        {attr.label && `${attr.label}: `}
                        {attr.formatter
                          ? attr.formatter(item[attr.key])
                          : item[attr.key]}
                      </Text>
                    </Group>
                  );
                }
                return null;
              })}
            </div>

            {/* Description */}
            <Stack gap="xs" mb="md">
              <Text size="lg" fw={600} c="#111827">
                Description
              </Text>
              <Text size="sm" c="#374151">
                {item.description}
              </Text>
            </Stack>

            {/* Key Highlights */}
            {highlightItems.length > 0 && (
              <Stack gap="xs" mb="lg">
                <Text size="lg" fw={600} c="#111827">
                  Key Highlights
                </Text>
                <Stack gap="xs">
                  {highlightItems.map((highlight: string, index: number) => (
                    <Group
                      key={index}
                      gap="xs"
                      align="flex-start"
                      wrap="nowrap"
                    >
                      <CheckCircleIcon
                        size={18}
                        style={{
                          color: "#10B981",
                          marginTop: "2px",
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
                {config.primaryCTA}
              </Button>
            </Group>
          </Stack>
        </ScrollArea.Autosize>
      </Stack>
    </Modal>
  );
};
