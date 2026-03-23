import { categoryService, Category } from "./supabase";

// Helper functions to get categories for specific filter groups
export const filterHelpers = {
  // Get content types (hierarchical)
  async getContentTypes(): Promise<Category[]> {
    return categoryService.getCategoriesGroupedByFilterGroup('content-types');
  },

  // Get digital perspectives (flat)
  async getDigitalPerspectives(): Promise<Category[]> {
    return categoryService.getCategoriesByFilterGroup('digital-perspectives');
  },

  // Get digital streams (hierarchical)
  async getDigitalStreams(): Promise<Category[]> {
    return categoryService.getCategoriesGroupedByFilterGroup('digital-streams');
  },

  // Get digital sectors (flat)
  async getDigitalSectors(): Promise<Category[]> {
    return categoryService.getCategoriesByFilterGroup('digital-sectors');
  },

  // Get content formats (flat)
  async getContentFormats(): Promise<Category[]> {
    return categoryService.getCategoriesByFilterGroup('content-format');
  },

  // Get popularity tags (flat)
  async getPopularityTags(): Promise<Category[]> {
    return categoryService.getCategoriesByFilterGroup('popularity-tags');
  },

  // Get all filter groups
  async getAllFilterGroups(): Promise<Record<string, Category[]>> {
    const [contentTypes, perspectives, streams, sectors, formats, popularity] = await Promise.all([
      filterHelpers.getContentTypes(),
      filterHelpers.getDigitalPerspectives(),
      filterHelpers.getDigitalStreams(),
      filterHelpers.getDigitalSectors(),
      filterHelpers.getContentFormats(),
      filterHelpers.getPopularityTags(),
    ]);

    return {
      'content-types': contentTypes,
      'digital-perspectives': perspectives,
      'digital-streams': streams,
      'digital-sectors': sectors,
      'content-format': formats,
      'popularity-tags': popularity,
    };
  },

  // Helper to get domains for a specific stream (for conditional dropdowns)
  getDomainsForStream(streamId: string, allStreams: Category[]): Category[] {
    const stream = allStreams.find(s => s.id === streamId);
    return stream?.subcategories || [];
  },
};