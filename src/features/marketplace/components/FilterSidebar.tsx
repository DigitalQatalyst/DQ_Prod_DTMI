import React, { useState, useMemo, useEffect } from "react";
import { Accordion, Checkbox, Stack, Button } from "@mantine/core";

export interface FilterOption {
  id: string;
  name: string;
  children?: FilterOption[]; // Support for nested options
}

export interface FilterConfig {
  id: string;
  title: string;
  options: FilterOption[];
  isNested?: boolean; // Flag to indicate if this category has nested structure
}

export interface FilterSidebarProps {
  filters: Record<string, string[]>;
  filterConfig: FilterConfig[];
  onFilterChange: (filterType: string, value: string) => void;
  onResetFilters: () => void;
  isResponsive?: boolean;
  openSections?: Record<string, boolean>; // External control of open sections
  onToggleSection?: (section: string) => void; // External toggle handler
}

// Mapping of Media Types to their relevant Format options (uses filter labels)
const MEDIA_TYPE_FORMAT_MAPPING: Record<string, string[]> = {
  News: ["Quick Reads"],
  Reports: ["In-Depth Reports", "Downloadable Templates"],
  "Toolkits & Templates": ["Interactive Tools", "Downloadable Templates"],
  Guides: ["Quick Reads", "In-Depth Reports"],
  Events: ["Live Events"],
  Videos: ["Recorded Media"],
  Podcasts: ["Recorded Media"],
};

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  filters,
  filterConfig,
  onFilterChange,
  onResetFilters,
  isResponsive = false,
  openSections: externalOpenSections,
  onToggleSection: externalToggleSection,
}) => {
  // Determine which sections should be open by default
  const getDefaultOpenSections = () => {
    const defaults = filterConfig
      .filter((config) => config.id !== "economicSector")
      .map((config) => config.id);
    return defaults;
  };

  const [internalOpenSections, setInternalOpenSections] = useState<string[]>(
    getDefaultOpenSections(),
  );

  // Auto-open sections that have active filters
  useEffect(() => {
    if (externalOpenSections) return;

    const sectionsWithFilters = filterConfig
      .filter((config) => filters[config.id] && filters[config.id].length > 0)
      .map((config) => config.id);

    if (sectionsWithFilters.length > 0) {
      setInternalOpenSections((prev) => {
        const combined = [...new Set([...prev, ...sectionsWithFilters])];
        return combined;
      });
    }
  }, [filters, filterConfig, externalOpenSections]);

  // Filter the format options based on selected media types
  const filteredFilterConfig = useMemo(() => {
    const selectedMediaTypes = filters["mediaType"] || [];

    return filterConfig.map((config) => {
      if (config.id === "format" && selectedMediaTypes.length > 0) {
        const allowedFormats = selectedMediaTypes
          .flatMap((mediaType) => MEDIA_TYPE_FORMAT_MAPPING[mediaType] || [])
          .filter((value, index, self) => self.indexOf(value) === index);
        return {
          ...config,
          options: config.options.filter((option) =>
            allowedFormats.includes(option.name),
          ),
        };
      }
      return config;
    });
  }, [filterConfig, filters]);

  const handleAccordionChange = (value: string[]) => {
    if (externalToggleSection) {
      const changedSection =
        value.find((v) => !internalOpenSections.includes(v)) ||
        internalOpenSections.find((v) => !value.includes(v));
      if (changedSection) externalToggleSection(changedSection);
    } else {
      setInternalOpenSections(value);
    }
  };

  const activeValue = externalOpenSections
    ? Object.keys(externalOpenSections).filter(
        (key) => externalOpenSections[key],
      )
    : internalOpenSections;

  const fontSize = isResponsive ? "0.75rem" : "0.875rem";

  return (
    <Stack gap="xs">
      <Accordion
        multiple
        value={activeValue}
        onChange={handleAccordionChange}
        styles={{
          item: {
            borderBottom: "1px solid #E5E7EB",
            "&[data-active]": {
              borderBottom: "1px solid #E5E7EB",
            },
          },
          control: {
            padding: "12px 0",
            "&:hover": {
              backgroundColor: "transparent",
            },
          },
          label: {
            fontSize: "0.875rem",
            fontWeight: 500,
            color: "#111827",
          },
          chevron: {
            color: "#6B7280",
          },
          content: {
            padding: "0 0 12px 0",
          },
        }}
      >
        {filteredFilterConfig.map((config) => (
          <Accordion.Item key={config.id} value={config.id}>
            <Accordion.Control>{config.title}</Accordion.Control>
            <Accordion.Panel>
              <Stack gap={isResponsive ? "0.5rem" : "0.625rem"}>
                {config.options.map((option) => (
                  <Checkbox
                    key={option.id}
                    label={option.name}
                    checked={(filters[config.id] || []).includes(option.id)}
                    onChange={() => onFilterChange(config.id, option.id)}
                    styles={{
                      root: {
                        "&:hover": {
                          backgroundColor: "#F9FAFB",
                        },
                      },
                      label: {
                        fontSize: fontSize,
                        color: "#374151",
                        cursor: "pointer",
                        paddingLeft: "0.5rem",
                      },
                      input: {
                        cursor: "pointer",
                        "&:checked": {
                          backgroundColor: "#2563EB",
                          borderColor: "#2563EB",
                        },
                        "&:focus": {
                          outline: "none",
                          borderColor: "#3B82F6",
                        },
                      },
                    }}
                  />
                ))}
              </Stack>
            </Accordion.Panel>
          </Accordion.Item>
        ))}
      </Accordion>

      {/* Reset filters button */}
      <Button
        onClick={onResetFilters}
        variant="subtle"
        color="red"
        fullWidth
        mt="md"
        styles={{
          root: {
            fontSize: "0.875rem",
            "&:hover": {
              backgroundColor: "#FEF2F2",
            },
          },
        }}
      >
        Reset All Filters
      </Button>
    </Stack>
  );
};
