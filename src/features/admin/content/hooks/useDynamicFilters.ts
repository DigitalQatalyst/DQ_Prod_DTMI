import { useState, useEffect } from "react";
import { categoryService } from "../../shared/utils/supabase";

export interface FilterOption {
  id: string;
  label: string;
  value: string;
}

export interface FilterGroup {
  name: string;
  label: string;
  options: FilterOption[];
  isHierarchical: boolean;
  parentOptions?: FilterOption[];
  getChildOptions?: (parentId: string) => FilterOption[];
}

export const useDynamicFilters = () => {
  const [filterGroups, setFilterGroups] = useState<FilterGroup[]>([]);
  const [loading, setLoading] = useState(true);

  const hierarchicalGroups = [
    "content-types",
    "digital-streams",
    "dbp-domains",
  ];

  const groupLabels: Record<string, string> = {
    "content-types": "Content Types",
    "digital-perspectives": "Digital Perspectives",
    "digital-streams": "Digital Streams",
    "digital-sectors": "Digital Sectors",
    "content-format": "Content Format",
    "popularity-tags": "Popularity Tags",
    "dbp-domains": "DBP Domains",
  };

  const fetchFilters = async () => {
    setLoading(true);
    try {
      const groups = await categoryService.getFilterGroups();
      const filterGroupsData: FilterGroup[] = [];

      for (const group of groups) {
        const isHierarchical = hierarchicalGroups.includes(group);

        if (isHierarchical) {
          // Fetch hierarchical data
          const hierarchicalData =
            await categoryService.getCategoriesGroupedByFilterGroup(group);

          const parentOptions: FilterOption[] = hierarchicalData.map(
            (parent) => ({
              id: parent.id,
              label: parent.name,
              value: parent.name,
            }),
          );

          const getChildOptions = (parentId: string): FilterOption[] => {
            const parent = hierarchicalData.find((p) => p.id === parentId);
            return (parent?.subcategories || []).map((sub) => ({
              id: sub.id,
              label: sub.name,
              value: sub.name,
            }));
          };

          filterGroupsData.push({
            name: group,
            label: groupLabels[group] || group,
            options: [], // Not used for hierarchical
            isHierarchical: true,
            parentOptions,
            getChildOptions,
          });
        } else {
          // Fetch flat data
          const flatData =
            await categoryService.getCategoriesByFilterGroup(group);

          const options: FilterOption[] = flatData.map((item) => ({
            id: item.id,
            label: item.name,
            value: item.name,
          }));

          filterGroupsData.push({
            name: group,
            label: groupLabels[group] || group,
            options,
            isHierarchical: false,
          });
        }
      }

      setFilterGroups(filterGroupsData);
    } catch (error) {
      console.error("Failed to load dynamic filters:", error);
      setFilterGroups([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFilters();
  }, []);

  const getFilterGroup = (name: string): FilterGroup | undefined => {
    return filterGroups.find((group) => group.name === name);
  };

  const getChildOptions = (
    groupName: string,
    parentId: string,
  ): FilterOption[] => {
    const group = getFilterGroup(groupName);
    if (group?.isHierarchical && group.getChildOptions) {
      return group.getChildOptions(parentId);
    }
    return [];
  };

  return {
    filterGroups,
    loading,
    getFilterGroup,
    getChildOptions,
    refetch: fetchFilters,
  };
};
