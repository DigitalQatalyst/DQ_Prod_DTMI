import * as React from "react";
import { ReactNode } from "react";
import {
  DollarSign,
  Calendar,
  Clock,
  Users,
  MapPin,
  CheckCircle,
  BarChart,
  Award,
  FileText,
  Info,
  BookOpen,
  ClipboardList,
  Building,
  FileType,
  Bookmark,
  TrendingUp,
} from "lucide-react";

// Define a Tab type for consistency across marketplace pages
export interface MarketplaceTab {
  id: string;
  label: string;
  icon?: ReactNode;
  count?: number;
}

// Define filter category configuration
export interface FilterCategoryConfig {
  id: string;
  label: string;
  icon?: ReactNode;
  count?: number;
}

// Define marketplace configuration interface
export interface MarketplaceConfig {
  title: string;
  description: string;
  tabs: MarketplaceTab[];
  filters: {
    categories: FilterCategoryConfig[];
    priceRanges: { id: string; label: string; min?: number; max?: number }[];
    durations: { id: string; label: string; min?: number; max?: number }[];
    levels: { id: string; label: string }[];
    formats: { id: string; label: string }[];
  };
  // Database query functions
  fetchItems?: (params: any) => Promise<any>;
  fetchItemDetails?: (id: string) => Promise<any>;
  mapItemResponse?: (data: any) => any;
  mapDetailResponse?: (data: any) => any;
  mapFilterResponse?: (data: any) => FilterCategoryConfig[];
}

// Simplified marketplace configurations without mock data
export const marketplaceConfigs: Record<string, MarketplaceConfig> = {
  courses: {
    title: "Course Marketplace",
    description: "Discover professional development courses",
    tabs: [
      { id: "all", label: "All Courses" },
      { id: "featured", label: "Featured" },
      { id: "popular", label: "Popular" },
    ],
    filters: {
      categories: [],
      priceRanges: [
        { id: "free", label: "Free", min: 0, max: 0 },
        { id: "under-100", label: "Under $100", min: 0, max: 100 },
        { id: "100-500", label: "$100 - $500", min: 100, max: 500 },
        { id: "over-500", label: "Over $500", min: 500 },
      ],
      durations: [
        { id: "short", label: "1-4 hours", min: 1, max: 4 },
        { id: "medium", label: "5-20 hours", min: 5, max: 20 },
        { id: "long", label: "20+ hours", min: 20 },
      ],
      levels: [
        { id: "beginner", label: "Beginner" },
        { id: "intermediate", label: "Intermediate" },
        { id: "advanced", label: "Advanced" },
      ],
      formats: [
        { id: "video", label: "Video" },
        { id: "text", label: "Text" },
        { id: "interactive", label: "Interactive" },
      ],
    },
  },
  
  financial: {
    title: "Financial Services",
    description: "Financial and banking services marketplace",
    tabs: [
      { id: "all", label: "All Services" },
      { id: "banking", label: "Banking" },
      { id: "insurance", label: "Insurance" },
    ],
    filters: {
      categories: [],
      priceRanges: [],
      durations: [],
      levels: [],
      formats: [],
    },
  },
  
  "non-financial": {
    title: "Business Services",
    description: "Professional business services marketplace",
    tabs: [
      { id: "all", label: "All Services" },
      { id: "consulting", label: "Consulting" },
      { id: "technology", label: "Technology" },
    ],
    filters: {
      categories: [],
      priceRanges: [],
      durations: [],
      levels: [],
      formats: [],
    },
  },
  
  dtmi: {
    title: "Knowledge Hub",
    description: "Digital transformation insights and resources",
    tabs: [
      { id: "all", label: "All Content" },
      { id: "signals", label: "Signals" },
      { id: "insights", label: "Insights" },
      { id: "deep-analysis", label: "Deep Analysis" },
    ],
    filters: {
      categories: [],
      priceRanges: [],
      durations: [],
      levels: [],
      formats: [],
    },
  },
};

// Helper function to get marketplace configuration
export const getMarketplaceConfig = (marketplaceType: string): MarketplaceConfig => {
  return marketplaceConfigs[marketplaceType] || marketplaceConfigs.dtmi;
};