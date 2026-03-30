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
import { mockCourses, providers } from "./mockData";
import {
  mockFinancialServices,
  mockNonFinancialServices,
  mockKnowledgeHubItems,
  mockKnowledgeHubFilterOptions,
} from "./mockMarketplaceData";
// Define a Tab type for consistency across marketplace pages
export interface MarketplaceTab {
  id: string;
  label: string;
  icon?: any;
  iconBgColor?: string;
  iconColor?: string;
  renderContent?: (item: any, marketplaceType: string) => React.ReactNode;
}
// Configuration type definitions
export interface AttributeConfig {
  key: string;
  label: string;
  icon: ReactNode;
  formatter?: (value: any) => string;
}
export interface TabConfig {
  id: string;
  label: string;
  icon?: any;
  iconBgColor?: string;
  iconColor?: string;
  renderContent?: (item: any, marketplaceType: string) => React.ReactNode;
}
export interface FilterCategoryConfig {
  id: string;
  title: string;
  isNested?: boolean;
  options: {
    id: string;
    name: string;
    children?: {
      id: string;
      name: string;
      children?: {
        id: string;
        name: string;
      }[];
    }[];
  }[];
}
export interface MarketplaceConfig {
  id: string;
  title: string;
  description: string;
  route: string;
  primaryCTA: string;
  secondaryCTA: string;
  itemName: string;
  itemNamePlural: string;
  attributes: AttributeConfig[];
  detailSections: string[];
  tabs: TabConfig[];
  summarySticky?: boolean;
  filterCategories: FilterCategoryConfig[];
  // Knowledge Hub specific filter categories
  writtenFilterCategories?: FilterCategoryConfig[];
  multimediaFilterCategories?: FilterCategoryConfig[];
  booksFilterCategories?: FilterCategoryConfig[];
  // New fields for GraphQL integration
  mapListResponse?: (data: any[]) => any[];
  mapDetailResponse?: (data: any) => any;
  mapFilterResponse?: (data: any) => FilterCategoryConfig[];
  // Mock data for fallback and schema reference
  mockData?: {
    items: any[];
    filterOptions: any;
    providers: any[];
  };
}
// Mock data for financial services
export const mockFinancialServicesData = {
  items: mockFinancialServices,
  filterOptions: {
    categories: [
      {
        id: "loans",
        name: "Loans",
      },
      {
        id: "financing",
        name: "Financing",
      },
      {
        id: "insurance",
        name: "Insurance",
      },
      {
        id: "creditcard",
        name: "Credit Card",
      },
    ],
    serviceTypes: [
      {
        id: "financing",
        name: "Financing",
      },
      {
        id: "credit",
        name: "Credit",
      },
      {
        id: "riskmanagement",
        name: "Risk Management",
      },
    ],
  },
  providers: providers,
};
// Mock data for non-financial services
export const mockNonFinancialServicesData = {
  items: mockNonFinancialServices,
  filterOptions: {
    categories: [
      {
        id: "consultancy",
        name: "Consultancy",
      },
      {
        id: "technology",
        name: "Technology",
      },
      {
        id: "research",
        name: "Research",
      },
      {
        id: "export",
        name: "Export",
      },
    ],
    serviceTypes: [
      {
        id: "advisory",
        name: "Advisory",
      },
      {
        id: "implementation",
        name: "Implementation",
      },
      {
        id: "information",
        name: "Information",
      },
      {
        id: "program",
        name: "Program",
      },
    ],
    deliveryModes: [
      {
        id: "online",
        name: "Online",
      },
      {
        id: "inperson",
        name: "In-person",
      },
      {
        id: "hybrid",
        name: "Hybrid",
      },
    ],
  },
  providers: providers,
};
// Mock data for courses
export const mockCoursesData = {
  items: mockCourses,
  filterOptions: {
    categories: [
      {
        id: "entrepreneurship",
        name: "Entrepreneurship",
      },
      {
        id: "finance",
        name: "Finance",
      },
      {
        id: "marketing",
        name: "Marketing",
      },
      {
        id: "technology",
        name: "Technology",
      },
      {
        id: "operations",
        name: "Operations",
      },
    ],
    deliveryModes: [
      {
        id: "online",
        name: "Online",
      },
      {
        id: "inperson",
        name: "In-person",
      },
      {
        id: "hybrid",
        name: "Hybrid",
      },
    ],
    businessStages: [
      {
        id: "conception",
        name: "Conception",
      },
      {
        id: "growth",
        name: "Growth",
      },
      {
        id: "maturity",
        name: "Maturity",
      },
      {
        id: "restructuring",
        name: "Restructuring",
      },
    ],
  },
  providers: providers,
};
// Mock data for Knowledge Hub
export const mockKnowledgeHubData = {
  items: mockKnowledgeHubItems,
  filterOptions: mockKnowledgeHubFilterOptions,
  providers: providers,
};
// Define marketplace configurations
export const marketplaceConfig: Record<string, MarketplaceConfig> = {
  courses: {
    id: "courses",
    title: "Learning & Development",
    description:
      "Discover and enroll in courses tailored for SMEs to help grow your business",
    route: "/marketplace/courses",
    primaryCTA: "Enroll Now",
    secondaryCTA: "View Details",
    itemName: "Course",
    itemNamePlural: "Courses",
    attributes: [
      {
        key: "duration",
        label: "Duration",
        icon: React.createElement(Clock, { size: 18, className: "mr-2" }),
      },
      {
        key: "startDate",
        label: "Starts",
        icon: React.createElement(Calendar, { size: 18, className: "mr-2" }),
      },
      {
        key: "price",
        label: "Cost",
        icon: React.createElement(DollarSign, { size: 18, className: "mr-2" }),
      },
      {
        key: "location",
        label: "Location",
        icon: React.createElement(MapPin, { size: 18, className: "mr-2" }),
      },
    ],
    detailSections: [
      "description",
      "learningOutcomes",
      "schedule",
      "provider",
      "related",
    ],
    tabs: [
      {
        id: "about",
        label: "About This Service",
        icon: Info,
        iconBgColor: "bg-blue-50",
        iconColor: "text-blue-600",
      },
      {
        id: "schedule",
        label: "Schedule",
        icon: Calendar,
        iconBgColor: "bg-green-50",
        iconColor: "text-green-600",
      },
      {
        id: "learning_outcomes",
        label: "Learning Outcomes",
        icon: BookOpen,
        iconBgColor: "bg-purple-50",
        iconColor: "text-purple-600",
      },
      {
        id: "provider",
        label: "About Provider",
        icon: Building,
        iconBgColor: "bg-blue-50",
        iconColor: "text-blue-600",
      },
    ],
    summarySticky: true,
    filterCategories: [
      {
        id: "category",
        title: "Course Category",
        options: [
          {
            id: "entrepreneurship",
            name: "Entrepreneurship",
          },
          {
            id: "finance",
            name: "Finance",
          },
          {
            id: "marketing",
            name: "Marketing",
          },
          {
            id: "technology",
            name: "Technology",
          },
          {
            id: "operations",
            name: "Operations",
          },
        ],
      },
      {
        id: "deliveryMode",
        title: "Delivery Mode",
        options: [
          {
            id: "online",
            name: "Online",
          },
          {
            id: "inperson",
            name: "In-person",
          },
          {
            id: "hybrid",
            name: "Hybrid",
          },
        ],
      },
      {
        id: "duration",
        title: "Duration",
        options: [
          {
            id: "short",
            name: "Short (<1 week)",
          },
          {
            id: "medium",
            name: "Medium (1-4 weeks)",
          },
          {
            id: "long",
            name: "Long (1+ month)",
          },
        ],
      },
      {
        id: "businessStage",
        title: "Business Stage",
        options: [
          {
            id: "conception",
            name: "Conception",
          },
          {
            id: "growth",
            name: "Growth",
          },
          {
            id: "maturity",
            name: "Maturity",
          },
          {
            id: "restructuring",
            name: "Restructuring",
          },
        ],
      },
    ],
    // Data mapping functions
    mapListResponse: (data) => {
      return data.map((item: any) => ({
        ...item,
        // Transform any fields if needed
        tags: item.tags || [item.category, item.deliveryMode].filter(Boolean),
      }));
    },
    mapDetailResponse: (data) => {
      return {
        ...data,
        // Transform any fields if needed
        highlights: data.highlights || data.learningOutcomes || [],
      };
    },
    mapFilterResponse: (data) => {
      return [
        {
          id: "category",
          title: "Course Category",
          options: data.categories || [],
        },
        {
          id: "deliveryMode",
          title: "Delivery Mode",
          options: data.deliveryModes || [],
        },
        {
          id: "duration",
          title: "Duration",
          options: [
            {
              id: "short",
              name: "Short (<1 week)",
            },
            {
              id: "medium",
              name: "Medium (1-4 weeks)",
            },
            {
              id: "long",
              name: "Long (1+ month)",
            },
          ],
        },
        {
          id: "businessStage",
          title: "Business Stage",
          options: data.businessStages || [],
        },
      ];
    },
    // Mock data for fallback and schema reference
    mockData: mockCoursesData,
  },
  financial: {
    id: "financial",
    title: "Financial Services ",
    description:
      "Access financial products and services to support your business growth",
    route: "/marketplace/financial",
    primaryCTA: "Apply Now",
    secondaryCTA: "View Details",
    itemName: "Financial Service",
    itemNamePlural: "Financial Services",
    attributes: [
      {
        key: "amount",
        label: "Amount",
        icon: React.createElement(DollarSign, { size: 18, className: "mr-2" }),
      },
      {
        key: "duration",
        label: "Repayment Term",
        icon: React.createElement(Calendar, { size: 18, className: "mr-2" }),
      },
      {
        key: "eligibility",
        label: "Eligibility",
        icon: React.createElement(CheckCircle, { size: 18, className: "mr-2" }),
      },
      {
        key: "interestRate",
        label: "Interest Rate",
        icon: React.createElement(BarChart, { size: 18, className: "mr-2" }),
      },
    ],
    detailSections: [
      "description",
      "eligibility",
      "terms",
      "provider",
      "related",
    ],
    tabs: [
      {
        id: "about",
        label: "About This Service",
        icon: Info,
        iconBgColor: "bg-blue-50",
        iconColor: "text-blue-600",
      },
      {
        id: "eligibility_terms",
        label: "Eligibility & Terms",
        icon: CheckCircle,
        iconBgColor: "bg-green-50",
        iconColor: "text-green-600",
      },
      {
        id: "application_process",
        label: "Application Process",
        icon: ClipboardList,
        iconBgColor: "bg-orange-50",
        iconColor: "text-orange-600",
      },
      {
        id: "required_documents",
        label: "Required Documents",
        icon: FileText,
        iconBgColor: "bg-amber-50",
        iconColor: "text-amber-600",
      },
      {
        id: "provider",
        label: "About Provider",
        icon: Building,
        iconBgColor: "bg-blue-50",
        iconColor: "text-blue-600",
      },
    ],
    summarySticky: true,
    filterCategories: [
      {
        id: "category",
        title: "Service Category",
        options: [
          {
            id: "loans",
            name: "Loans",
          },
          {
            id: "financing",
            name: "Financing",
          },
          {
            id: "insurance",
            name: "Insurance",
          },
          {
            id: "creditcard",
            name: "Credit Card",
          },
        ],
      },
      {
        id: "serviceType",
        title: "Service Type",
        options: [
          {
            id: "financing",
            name: "Financing",
          },
          {
            id: "credit",
            name: "Credit",
          },
          {
            id: "riskmanagement",
            name: "Risk Management",
          },
        ],
      },
    ],
    // Data mapping functions
    mapListResponse: (data) => {
      return data.map((item: any) => ({
        ...item,
        // Transform any fields if needed
        tags: item.tags || [item.category, item.serviceType].filter(Boolean),
      }));
    },
    mapDetailResponse: (data) => {
      return {
        ...data,
        // Transform any fields if needed
        highlights: data.highlights || data.details || [],
      };
    },
    mapFilterResponse: (data) => {
      return [
        {
          id: "category",
          title: "Service Category",
          options: data.categories || [],
        },
        {
          id: "serviceType",
          title: "Service Type",
          options: data.serviceTypes || [],
        },
      ];
    },
    // Mock data for fallback and schema reference
    mockData: mockFinancialServicesData,
  },
  "non-financial": {
    id: "non-financial",
    title: "Design & Deploy Services",
    description:
      "Discover DigitalQatalyst's comprehensive digital transformation services",
    route: "/marketplace/services",
    primaryCTA: "Request Service",
    secondaryCTA: "View Details",
    itemName: "Service",
    itemNamePlural: "Services",
    attributes: [
      {
        key: "category",
        label: "Service Type",
        icon: React.createElement(Award, { size: 18, className: "mr-2" }),
      },
      {
        key: "serviceCategory",
        label: "Category",
        icon: React.createElement(Users, { size: 18, className: "mr-2" }),
      },
      {
        key: "serviceAvailability",
        label: "Availability",
        icon: React.createElement(CheckCircle, { size: 18, className: "mr-2" }),
      },
      {
        key: "serviceReadiness",
        label: "Readiness",
        icon: React.createElement(Clock, { size: 18, className: "mr-2" }),
      },
    ],
    detailSections: ["description", "deliveryDetails", "provider", "related"],
    tabs: [
      {
        id: "design-services",
        label: "Design Services",
        icon: Info,
        iconBgColor: "bg-blue-50",
        iconColor: "text-blue-600",
      },
      {
        id: "deploy-services-saas",
        label: "Deploy Services (SaaS)",
        icon: CheckCircle,
        iconBgColor: "bg-green-50",
        iconColor: "text-green-600",
      },
      {
        id: "deploy-services-onprem",
        label: "Deploy Services (On-Prem)",
        icon: Building,
        iconBgColor: "bg-purple-50",
        iconColor: "text-purple-600",
      },
    ],
    summarySticky: true,
    filterCategories: [
      {
        id: "serviceCategory",
        title: "Service Category",
        options: [
          {
            id: "strategy-architecture",
            name: "Strategy & Architecture",
          },
          {
            id: "user-experience",
            name: "User Experience",
          },
          {
            id: "data-analytics",
            name: "Data & Analytics",
          },
          {
            id: "devops-automation",
            name: "DevOps & Automation",
          },
          {
            id: "system-integration",
            name: "System Integration",
          },
          {
            id: "infrastructure",
            name: "Infrastructure",
          },
        ],
      },
      {
        id: "serviceAvailability",
        title: "Service Availability",
        options: [
          {
            id: "available",
            name: "Available",
          },
          {
            id: "limited",
            name: "Limited",
          },
          {
            id: "coming-soon",
            name: "Coming Soon",
          },
        ],
      },
      {
        id: "serviceReadiness",
        title: "Service Readiness",
        options: [
          {
            id: "ready",
            name: "Ready",
          },
          {
            id: "in-development",
            name: "In Development",
          },
          {
            id: "planning",
            name: "Planning",
          },
        ],
      },
      {
        id: "economicSector",
        title: "Economic Sector",
        options: [
          {
            id: "cross-sector",
            name: "Cross-Sector",
          },
          {
            id: "primary",
            name: "Primary",
          },
          {
            id: "secondary",
            name: "Secondary",
          },
          {
            id: "tertiary",
            name: "Tertiary",
          },
          {
            id: "quaternary",
            name: "Quaternary",
          },
        ],
      },
    ],
    // Data mapping functions
    mapListResponse: (data) => {
      return data.map((item: any) => ({
        ...item,
        // Transform any fields if needed
        tags:
          item.tags ||
          [
            item.category,
            item.serviceCategory,
            item.serviceAvailability,
          ].filter(Boolean),
      }));
    },
    mapDetailResponse: (data) => {
      return {
        ...data,
        // Transform any fields if needed
        highlights: data.highlights || data.details || [],
      };
    },
    mapFilterResponse: (data) => {
      return [
        {
          id: "serviceCategory",
          title: "Service Category",
          options: data.serviceCategories || [],
        },
        {
          id: "serviceAvailability",
          title: "Service Availability",
          options: data.serviceAvailability || [],
        },
        {
          id: "serviceReadiness",
          title: "Service Readiness",
          options: data.serviceReadiness || [],
        },
        {
          id: "economicSector",
          title: "Economic Sector",
          options: data.economicSectors || [],
        },
      ];
    },
    // Mock data for fallback and schema reference
    mockData: {
      items: [],
      filterOptions: {
        serviceCategories: [
          {
            id: "strategy-architecture",
            name: "Strategy & Architecture",
          },
          {
            id: "user-experience",
            name: "User Experience",
          },
          {
            id: "data-analytics",
            name: "Data & Analytics",
          },
          {
            id: "devops-automation",
            name: "DevOps & Automation",
          },
          {
            id: "system-integration",
            name: "System Integration",
          },
          {
            id: "infrastructure",
            name: "Infrastructure",
          },
        ],
        serviceAvailability: [
          {
            id: "available",
            name: "Available",
          },
          {
            id: "limited",
            name: "Limited",
          },
          {
            id: "coming-soon",
            name: "Coming Soon",
          },
        ],
        serviceReadiness: [
          {
            id: "ready",
            name: "Ready",
          },
          {
            id: "in-development",
            name: "In Development",
          },
          {
            id: "planning",
            name: "Planning",
          },
        ],
        economicSectors: [
          {
            id: "cross-sector",
            name: "Cross-Sector",
          },
          {
            id: "primary",
            name: "Primary",
          },
          {
            id: "secondary",
            name: "Secondary",
          },
          {
            id: "tertiary",
            name: "Tertiary",
          },
          {
            id: "quaternary",
            name: "Quaternary",
          },
        ],
      },
      providers: [],
    },
  },
  dtmi: {
    id: "dtmi",
    title: "Explore Insights",
    description:
      "Discover valuable perspectives and expert-driven content to guide your digital transformation journey.",
    route: "/marketplace/dtmi",
    primaryCTA: "Access Now",
    secondaryCTA: "View Details",
    itemName: "Knowledge Hub",
    itemNamePlural: "Knowledge Hub",
    attributes: [
      {
        key: "mediaType",
        label: "Type",
        icon: React.createElement(FileType, { size: 18, className: "mr-2" }),
      },
      {
        key: "domain",
        label: "Domain",
        icon: React.createElement(Bookmark, { size: 18, className: "mr-2" }),
      },
      {
        key: "businessStage",
        label: "Business Stage",
        icon: React.createElement(TrendingUp, { size: 18, className: "mr-2" }),
      },
      {
        key: "date",
        label: "Published",
        icon: React.createElement(Calendar, { size: 18, className: "mr-2" }),
      },
    ],
    detailSections: ["description", "content", "provider", "related"],
    tabs: [
      {
        id: "about",
        label: "About This Resource",
        icon: Info,
        iconBgColor: "bg-blue-50",
        iconColor: "text-blue-600",
      },
      {
        id: "content",
        label: "Content",
        icon: FileText,
        iconBgColor: "bg-green-50",
        iconColor: "text-green-600",
      },
      {
        id: "provider",
        label: "About Provider",
        icon: Building,
        iconBgColor: "bg-blue-50",
        iconColor: "text-blue-600",
      },
    ],
    summarySticky: true,
    // Written content filters (WEF-style comprehensive filter system)
    writtenFilterCategories: [
      {
        id: "contentType",
        title: "Content Type",
        isNested: true,
        options: [
          {
            id: "signals",
            name: "Signals",
            children: [
              {
                id: "frontier-watch",
                name: "Frontier Watch",
              },
              {
                id: "executive-briefs",
                name: "Executive Briefs",
              },
              {
                id: "trends-alert",
                name: "Trends Alert",
              },
              {
                id: "rapid-insights",
                name: "Rapid Insights",
              },
            ],
          },
          {
            id: "insights",
            name: "Insights",
            children: [
              {
                id: "articles",
                name: "Articles",
              },
              {
                id: "framework-explainers",
                name: "Framework Explainers",
              },
              {
                id: "expert-perspectives",
                name: "Expert Perspectives",
              },
              {
                id: "concept-introduction",
                name: "Concept Introduction",
              },
              {
                id: "blogs",
                name: "Blogs",
              },
              {
                id: "infographics",
                name: "Infographics",
              },
            ],
          },
          {
            id: "deep-analysis",
            name: "Deep Analysis",
            children: [
              {
                id: "whitepapers",
                name: "Whitepapers",
              },
              {
                id: "forecast-reports",
                name: "Forecast Reports",
              },
              {
                id: "research-notes",
                name: "Research Notes",
              },
              {
                id: "strategic-essays",
                name: "Strategic Essays",
              },
              {
                id: "industry-briefs",
                name: "Industry Briefs",
              },
              {
                id: "sector-specifics",
                name: "Sector Specifics",
              },
              {
                id: "prediction-analysis",
                name: "Prediction Analysis",
              },
            ],
          },
        ],
      },
      {
        id: "contentFormat",
        title: "Content Format",
        options: [
          {
            id: "written",
            name: "Written",
          },
          {
            id: "videos",
            name: "Videos",
          },
          {
            id: "audios",
            name: "Audios",
          },
        ],
      },
      {
        id: "perspective6xd",
        title: "Perspectives",
        options: [
          {
            id: "digital-economy",
            name: "Digital Economy (Economy 4.0)",
          },
          {
            id: "digital-cognitive-organizations",
            name: "Digital Cognitive Organizations (DCO)",
          },
          {
            id: "digital-business-platforms",
            name: "Digital Business Platforms (DBP)",
          },
          {
            id: "digital-transformation-20",
            name: "Digital Transformation 2.0 (DT2.0)",
          },
          {
            id: "digital-worker-workspace",
            name: "Digital Worker & Workspace (DWW)",
          },
          {
            id: "digital-accelerators-tools",
            name: "Digital Accelerators Tools (DAT)",
          },
        ],
      },
      {
        id: "sector",
        title: "Sectors",
        options: [
          {
            id: "cross-economy-40",
            name: "Cross (Economy 4.0)",
          },
          {
            id: "cross-experience-40",
            name: "Cross (Experience 4.0)",
          },
          {
            id: "cross-agility-40",
            name: "Cross (Agility 4.0)",
          },
          {
            id: "cross-intelligence-40",
            name: "Cross (Intelligence 4.0)",
          },
          {
            id: "cross-workspace-40",
            name: "Cross (Workspace 4.0)",
          },
          {
            id: "primary-mining-40",
            name: "Primary (Mining 4.0)",
          },
          {
            id: "primary-farming-40",
            name: "Primary (Farming 4.0)",
          },
          {
            id: "secondary-plant-40",
            name: "Secondary (Plant 4.0)",
          },
          {
            id: "secondary-logistics-40",
            name: "Secondary (Logistics 4.0)",
          },
          {
            id: "secondary-infrastructure-40",
            name: "Secondary (Infrastructure 4.0)",
          },
          {
            id: "tertiary-government-40",
            name: "Tertiary (Government 4.0)",
          },
          {
            id: "tertiary-services-40",
            name: "Tertiary (Services 4.0)",
          },
          {
            id: "tertiary-retail-40",
            name: "Tertiary (Retail 4.0)",
          },
          {
            id: "quaternary-hospitality-40",
            name: "Quaternary (Hospitality 4.0)",
          },
          {
            id: "quaternary-wellness-40",
            name: "Quaternary (Wellness 4.0)",
          },
        ],
      },
      {
        id: "platform",
        title: "Platform",
        isNested: true,
        options: [
          {
            id: "dxp",
            name: "DXP (Digital Experience Platform)",
            children: [
              {
                id: "dxp-channels",
                name: "DXP (Digital Channels)",
              },
              {
                id: "dxp-experience",
                name: "DXP (Digital Experience)",
              },
              {
                id: "dxp-services",
                name: "DXP (Digital Services)",
              },
              {
                id: "dxp-marcom",
                name: "DXP (Digital MarCom)",
              },
            ],
          },
          {
            id: "dws",
            name: "DWS (Digital Workspace)",
            children: [
              {
                id: "dws-workspace",
                name: "DWS (Digital Workspace)",
              },
              {
                id: "dws-core",
                name: "DWS (Digital Core)",
              },
              {
                id: "dws-gprc",
                name: "DWS (Digital GPRC)",
              },
              {
                id: "dws-backoffice",
                name: "DWS (Digital Backoffice)",
              },
            ],
          },
          {
            id: "dia",
            name: "DIA (Digital Intelligence & Analytics)",
            children: [
              {
                id: "dia-analytics",
                name: "DIA (Digital Analytics)",
              },
              {
                id: "dia-intelligence",
                name: "DIA (Digital Intelligence)",
              },
            ],
          },
          {
            id: "sdo",
            name: "SDO (Secure Digital Operations)",
            children: [
              {
                id: "sdo-it",
                name: "SDO (Digital IT)",
              },
              {
                id: "sdo-interoperability",
                name: "SDO (Digital Interoperability)",
              },
              {
                id: "sdo-security",
                name: "SDO (Digital Security)",
              },
            ],
          },
        ],
      },
      {
        id: "category",
        title: "Domains",
        isNested: true,
        options: [
          {
            id: "perspectives",
            name: "Digital Perspectives",
            children: [
              {
                id: "d1-e40",
                name: "D1 - Digital Economy 4.0 (E4.0)",
              },
              {
                id: "d2-dco",
                name: "D2 - Digital Cognitive Organisation (DCO)",
              },
              {
                id: "d3-dbp",
                name: "D3 - Digital Business Platform (DBP)",
              },
              {
                id: "d4-dt20",
                name: "D4 - Digital Transformation 2.0 (DT2.0)",
              },
              {
                id: "d5-worker",
                name: "D5 - Digital Worker & Digital Workspace",
              },
              {
                id: "d6-accelerators",
                name: "D6 - Digital Accelerators (Tools)",
              },
            ],
          },
          {
            id: "functional",
            name: "Digital Functional Streams & Domains",
            children: [
              {
                id: "frontend",
                name: "Digital Front-end",
                children: [
                  {
                    id: "channels",
                    name: "Digital Channels",
                  },
                  {
                    id: "experience",
                    name: "Digital Experience",
                  },
                  {
                    id: "services",
                    name: "Digital Services",
                  },
                  {
                    id: "marketing",
                    name: "Digital Marketing",
                  },
                ],
              },
              {
                id: "core",
                name: "Digital Core",
                children: [
                  {
                    id: "workspace",
                    name: "Digital Workspace",
                  },
                  {
                    id: "core-systems",
                    name: "Digital Core",
                  },
                  {
                    id: "gprc",
                    name: "Digital GPRC",
                  },
                  {
                    id: "backoffice",
                    name: "Digital Back-Office",
                  },
                ],
              },
              {
                id: "enablers",
                name: "Digital Enablers",
                children: [
                  {
                    id: "interops",
                    name: "Digital InterOps",
                  },
                  {
                    id: "security",
                    name: "Digital Security",
                  },
                  {
                    id: "intelligence",
                    name: "Digital Intelligence",
                  },
                  {
                    id: "it",
                    name: "Digital IT",
                  },
                ],
              },
            ],
          },
          {
            id: "sectors",
            name: "Digital Sectors",
            children: [
              {
                id: "experience40",
                name: "Cross-Sector Domain (Experience4.0)",
              },
              {
                id: "agility40",
                name: "Cross-Sector Domain (Agility4.0)",
              },
              {
                id: "farming40",
                name: "Primary Sector (Farming4.0)",
              },
              {
                id: "plant40",
                name: "Secondary Sector (Plant4.0)",
              },
              {
                id: "infrastructure40",
                name: "Secondary Sector (Infrastructure4.0)",
              },
              {
                id: "government40",
                name: "Tertiary Sector (Government4.0)",
              },
              {
                id: "hospitality40",
                name: "Tertiary Sector (Hospitality4.0)",
              },
              {
                id: "retail40",
                name: "Tertiary Sector (Retail4.0)",
              },
              {
                id: "service40",
                name: "Quaternary Sector (Service4.0)",
              },
              {
                id: "logistics40",
                name: "Quaternary Sector (Logistics4.0)",
              },
              {
                id: "wellness40",
                name: "Quinary Sector (Wellness4.0)",
              },
            ],
          },
        ],
      },
      {
        id: "books",
        title: "Books",
        isNested: true,
        options: [
          {
            id: "topic",
            name: "Topic",
            children: [
              {
                id: "digital-economy",
                name: "Digital Economy",
              },
              {
                id: "digital-transformation",
                name: "Digital Transformation",
              },
              {
                id: "artificial-intelligence",
                name: "Artificial Intelligence",
              },
              {
                id: "digital-business-platforms",
                name: "Digital Business Platforms",
              },
              {
                id: "digital-cognitive-organizations",
                name: "Digital Cognitive Organizations",
              },
              {
                id: "future-of-work",
                name: "Future of Work",
              },
              {
                id: "platform-strategy",
                name: "Platform Strategy",
              },
              {
                id: "innovation-organizational-change",
                name: "Innovation and Organizational Change",
              },
            ],
          },
          {
            id: "theme",
            name: "Theme",
            children: [
              {
                id: "d1-digital-economy",
                name: "D1: Digital Economy",
              },
              {
                id: "d2-digital-cognitive-organization",
                name: "D2: Digital Cognitive Organization",
              },
              {
                id: "d3-digital-business-platforms",
                name: "D3: Digital Business Platforms",
              },
              {
                id: "d4-digital-transformation",
                name: "D4: Digital Transformation",
              },
              {
                id: "d5-digital-workers-workspace",
                name: "D5: Digital Workers & Workspace",
              },
              {
                id: "d6-digital-accelerators",
                name: "D6: Digital Accelerators",
              },
            ],
          },
          {
            id: "author",
            name: "Author",
            children: [
              {
                id: "david-rogers",
                name: "David Rogers",
              },
              {
                id: "sunil-gupta",
                name: "Sunil Gupta",
              },
              {
                id: "stephane-niango",
                name: "Dr. Stéphane Niango",
              },
              {
                id: "bill-schmarzo",
                name: "Bill Schmarzo",
              },
              {
                id: "thomas-siebel",
                name: "Thomas Siebel",
              },
              {
                id: "geoffrey-parker",
                name: "Geoffrey Parker",
              },
              {
                id: "marshall-van-alstyne",
                name: "Marshall Van Alstyne",
              },
              {
                id: "sangeet-choudary",
                name: "Sangeet Paul Choudary",
              },
            ],
          },
          {
            id: "year",
            name: "Year",
            children: [
              {
                id: "2025",
                name: "2025",
              },
              {
                id: "2024",
                name: "2024",
              },
              {
                id: "2023",
                name: "2023",
              },
              {
                id: "2022",
                name: "2022",
              },
              {
                id: "2021",
                name: "2021",
              },
              {
                id: "2020",
                name: "2020",
              },
              {
                id: "2019",
                name: "2019",
              },
              {
                id: "2018",
                name: "2018",
              },
              {
                id: "2017",
                name: "2017",
              },
              {
                id: "before-2017",
                name: "Before 2017",
              },
            ],
          },
          {
            id: "reading-level",
            name: "Reading Level",
            children: [
              {
                id: "foundational",
                name: "Foundational",
              },
              {
                id: "intermediate",
                name: "Intermediate",
              },
              {
                id: "advanced",
                name: "Advanced",
              },
              {
                id: "expert",
                name: "Expert",
              },
            ],
          },
          {
            id: "book-type",
            name: "Book Type",
            children: [
              {
                id: "strategy",
                name: "Strategy",
              },
              {
                id: "theory",
                name: "Theory",
              },
              {
                id: "technology",
                name: "Technology",
              },
              {
                id: "leadership",
                name: "Leadership",
              },
              {
                id: "organizational-change",
                name: "Organizational Change",
              },
              {
                id: "ai",
                name: "AI",
              },
              {
                id: "economics",
                name: "Economics",
              },
              {
                id: "policy-governance",
                name: "Policy / Governance",
              },
            ],
          },
          {
            id: "role-relevance",
            name: "Role Relevance",
            children: [
              {
                id: "executive",
                name: "Executive",
              },
              {
                id: "strategist",
                name: "Strategist",
              },
              {
                id: "product-leader",
                name: "Product Leader",
              },
              {
                id: "architect",
                name: "Architect",
              },
              {
                id: "transformation-lead",
                name: "Transformation Lead",
              },
              {
                id: "researcher",
                name: "Researcher",
              },
              {
                id: "student",
                name: "Student",
              },
            ],
          },
        ],
      },
      {
        id: "format",
        title: "Format",
        options: [
          {
            id: "written",
            name: "Written",
          },
          {
            id: "video",
            name: "Video",
          },
          {
            id: "audio",
            name: "Audio",
          },
        ],
      },
      {
        id: "popularity",
        title: "Popularity",
        options: [
          {
            id: "latest",
            name: "Latest",
          },
          {
            id: "trending",
            name: "Trending",
          },
          {
            id: "downloaded",
            name: "Most Downloaded",
          },
          {
            id: "editors",
            name: "Editor's Pick",
          },
        ],
      },
    ],
    // Book-specific filters for DTMI Books Intelligence
    booksFilterCategories: [
      {
        id: "topic",
        title: "Topic",
        options: [
          {
            id: "digital-economy",
            name: "Digital Economy",
          },
          {
            id: "digital-transformation",
            name: "Digital Transformation",
          },
          {
            id: "artificial-intelligence",
            name: "Artificial Intelligence",
          },
          {
            id: "digital-business-platforms",
            name: "Digital Business Platforms",
          },
          {
            id: "digital-cognitive-organizations",
            name: "Digital Cognitive Organizations",
          },
          {
            id: "future-of-work",
            name: "Future of Work",
          },
          {
            id: "platform-strategy",
            name: "Platform Strategy",
          },
          {
            id: "innovation-organizational-change",
            name: "Innovation and Organizational Change",
          },
        ],
      },
      {
        id: "theme",
        title: "Theme",
        options: [
          {
            id: "d1-digital-economy",
            name: "D1: Digital Economy",
          },
          {
            id: "d2-digital-cognitive-organization",
            name: "D2: Digital Cognitive Organization",
          },
          {
            id: "d3-digital-business-platforms",
            name: "D3: Digital Business Platforms",
          },
          {
            id: "d4-digital-transformation",
            name: "D4: Digital Transformation",
          },
          {
            id: "d5-digital-workers-workspace",
            name: "D5: Digital Workers & Workspace",
          },
          {
            id: "d6-digital-accelerators",
            name: "D6: Digital Accelerators",
          },
        ],
      },
      {
        id: "author",
        title: "Author",
        options: [
          {
            id: "david-rogers",
            name: "David Rogers",
          },
          {
            id: "sunil-gupta",
            name: "Sunil Gupta",
          },
          {
            id: "stephane-niango",
            name: "Dr. Stéphane Niango",
          },
          {
            id: "bill-schmarzo",
            name: "Bill Schmarzo",
          },
          {
            id: "thomas-siebel",
            name: "Thomas Siebel",
          },
          {
            id: "geoffrey-parker",
            name: "Geoffrey Parker",
          },
          {
            id: "marshall-van-alstyne",
            name: "Marshall Van Alstyne",
          },
          {
            id: "sangeet-choudary",
            name: "Sangeet Paul Choudary",
          },
        ],
      },
      {
        id: "year",
        title: "Year",
        options: [
          {
            id: "2025",
            name: "2025",
          },
          {
            id: "2024",
            name: "2024",
          },
          {
            id: "2023",
            name: "2023",
          },
          {
            id: "2022",
            name: "2022",
          },
          {
            id: "2021",
            name: "2021",
          },
          {
            id: "2020",
            name: "2020",
          },
          {
            id: "2019",
            name: "2019",
          },
          {
            id: "2018",
            name: "2018",
          },
          {
            id: "2017",
            name: "2017",
          },
          {
            id: "before-2017",
            name: "Before 2017",
          },
        ],
      },
      {
        id: "reading-level",
        title: "Reading Level",
        options: [
          {
            id: "foundational",
            name: "Foundational",
          },
          {
            id: "intermediate",
            name: "Intermediate",
          },
          {
            id: "advanced",
            name: "Advanced",
          },
          {
            id: "expert",
            name: "Expert",
          },
        ],
      },
      {
        id: "book-type",
        title: "Book Type",
        options: [
          {
            id: "strategy",
            name: "Strategy",
          },
          {
            id: "theory",
            name: "Theory",
          },
          {
            id: "technology",
            name: "Technology",
          },
          {
            id: "leadership",
            name: "Leadership",
          },
          {
            id: "organizational-change",
            name: "Organizational Change",
          },
          {
            id: "ai",
            name: "AI",
          },
          {
            id: "economics",
            name: "Economics",
          },
          {
            id: "policy-governance",
            name: "Policy / Governance",
          },
        ],
      },
      {
        id: "role-relevance",
        title: "Role Relevance",
        options: [
          {
            id: "executive",
            name: "Executive",
          },
          {
            id: "strategist",
            name: "Strategist",
          },
          {
            id: "product-leader",
            name: "Product Leader",
          },
          {
            id: "architect",
            name: "Architect",
          },
          {
            id: "transformation-lead",
            name: "Transformation Lead",
          },
          {
            id: "researcher",
            name: "Researcher",
          },
          {
            id: "student",
            name: "Student",
          },
        ],
      },
    ],
    // Multimedia content filters
    multimediaFilterCategories: [
      {
        id: "contentType",
        title: "Content Type",
        options: [
          {
            id: "video",
            name: "Videos",
          },
          {
            id: "podcast",
            name: "Podcasts",
          },
        ],
      },
      {
        id: "format",
        title: "Format",
        options: [
          {
            id: "interactive",
            name: "Interactive Tools",
          },
          {
            id: "recorded",
            name: "Recorded Media",
          },
          {
            id: "live",
            name: "Live Events",
          },
        ],
      },
      {
        id: "category",
        title: "Category",
        isNested: true,
        options: [
          {
            id: "perspectives",
            name: "Digital Perspectives",
            children: [
              {
                id: "d1-e40",
                name: "D1 - Digital Economy 4.0 (E4.0)",
              },
              {
                id: "d2-dco",
                name: "D2 - Digital Cognitive Organisation (DCO)",
              },
              {
                id: "d3-dbp",
                name: "D3 - Digital Business Platform (DBP)",
              },
              {
                id: "d4-dt20",
                name: "D4 - Digital Transformation 2.0 (DT2.0)",
              },
              {
                id: "d5-worker",
                name: "D5 - Digital Worker & Digital Workspace",
              },
              {
                id: "d6-accelerators",
                name: "D6 - Digital Accelerators (Tools)",
              },
            ],
          },
          {
            id: "functional",
            name: "Digital Functional Streams & Domains",
            children: [
              {
                id: "frontend",
                name: "Digital Front-end",
                children: [
                  {
                    id: "channels",
                    name: "Digital Channels",
                  },
                  {
                    id: "experience",
                    name: "Digital Experience",
                  },
                  {
                    id: "services",
                    name: "Digital Services",
                  },
                  {
                    id: "marketing",
                    name: "Digital Marketing",
                  },
                ],
              },
              {
                id: "core",
                name: "Digital Core",
                children: [
                  {
                    id: "workspace",
                    name: "Digital Workspace",
                  },
                  {
                    id: "core-systems",
                    name: "Digital Core",
                  },
                  {
                    id: "gprc",
                    name: "Digital GPRC",
                  },
                  {
                    id: "backoffice",
                    name: "Digital Back-Office",
                  },
                ],
              },
              {
                id: "enablers",
                name: "Digital Enablers",
                children: [
                  {
                    id: "interops",
                    name: "Digital InterOps",
                  },
                  {
                    id: "security",
                    name: "Digital Security",
                  },
                  {
                    id: "intelligence",
                    name: "Digital Intelligence",
                  },
                  {
                    id: "it",
                    name: "Digital IT",
                  },
                ],
              },
            ],
          },
          {
            id: "sectors",
            name: "Digital Sectors",
            children: [
              {
                id: "experience40",
                name: "Cross-Sector Domain (Experience4.0)",
              },
              {
                id: "agility40",
                name: "Cross-Sector Domain (Agility4.0)",
              },
              {
                id: "farming40",
                name: "Primary Sector (Farming4.0)",
              },
              {
                id: "plant40",
                name: "Secondary Sector (Plant4.0)",
              },
              {
                id: "infrastructure40",
                name: "Secondary Sector (Infrastructure4.0)",
              },
              {
                id: "government40",
                name: "Tertiary Sector (Government4.0)",
              },
              {
                id: "hospitality40",
                name: "Tertiary Sector (Hospitality4.0)",
              },
              {
                id: "retail40",
                name: "Tertiary Sector (Retail4.0)",
              },
              {
                id: "service40",
                name: "Quaternary Sector (Service4.0)",
              },
              {
                id: "logistics40",
                name: "Quaternary Sector (Logistics4.0)",
              },
              {
                id: "wellness40",
                name: "Quinary Sector (Wellness4.0)",
              },
            ],
          },
        ],
      },
      {
        id: "popularity",
        title: "Popularity",
        options: [
          {
            id: "latest",
            name: "Latest",
          },
          {
            id: "trending",
            name: "Trending",
          },
          {
            id: "downloaded",
            name: "Most Downloaded",
          },
          {
            id: "editors",
            name: "Editor's Pick",
          },
        ],
      },
    ],
    // Legacy filterCategories for backward compatibility
    filterCategories: [
      {
        id: "mediaType",
        title: "Content Type",
        options: [
          // Signals content types
          {
            id: "front-watch",
            name: "Front Watch",
          },
          {
            id: "executive-briefs",
            name: "Executive Briefs",
          },
          {
            id: "trends-alert",
            name: "Trends Alert",
          },
          {
            id: "rapid-insights",
            name: "Rapid Insights",
          },
          {
            id: "microblogs",
            name: "Microblogs",
          },
          // Insights content types
          {
            id: "articles",
            name: "Articles",
          },
          {
            id: "framework-explainers",
            name: "Framework Explainers",
          },
          {
            id: "expert-perspective",
            name: "Expert Perspective",
          },
          {
            id: "concept-introduction",
            name: "Concept Introduction",
          },
          {
            id: "blogs",
            name: "Blogs",
          },
          {
            id: "infographics",
            name: "Infographics",
          },
          // Deep Analysis content types
          {
            id: "whitepapers",
            name: "Whitepapers",
          },
          {
            id: "forecast-reports",
            name: "Forecast Reports",
          },
          {
            id: "research-notes",
            name: "Research Notes",
          },
          {
            id: "industry-briefs",
            name: "Industry Briefs",
          },
          {
            id: "sector-specifics",
            name: "Sector Specifics",
          },
          {
            id: "prediction-analysis",
            name: "Prediction Analysis",
          },
        ],
      },
      {
        id: "category",
        title: "Category",
        isNested: true,
        options: [
          {
            id: "perspectives",
            name: "Digital Perspectives",
            children: [
              {
                id: "d1-e40",
                name: "D1 - Digital Economy 4.0 (E4.0)",
              },
              {
                id: "d2-dco",
                name: "D2 - Digital Cognitive Organisation (DCO)",
              },
              {
                id: "d3-dbp",
                name: "D3 - Digital Business Platform (DBP)",
              },
              {
                id: "d4-dt20",
                name: "D4 - Digital Transformation 2.0 (DT2.0)",
              },
              {
                id: "d5-worker",
                name: "D5 - Digital Worker & Digital Workspace",
              },
              {
                id: "d6-accelerators",
                name: "D6 - Digital Accelerators (Tools)",
              },
            ],
          },
          {
            id: "functional",
            name: "Digital Functional Streams & Domains",
            children: [
              {
                id: "frontend",
                name: "Digital Front-end",
                children: [
                  {
                    id: "channels",
                    name: "Digital Channels",
                  },
                  {
                    id: "experience",
                    name: "Digital Experience",
                  },
                  {
                    id: "services",
                    name: "Digital Services",
                  },
                  {
                    id: "marketing",
                    name: "Digital Marketing",
                  },
                ],
              },
              {
                id: "core",
                name: "Digital Core",
                children: [
                  {
                    id: "workspace",
                    name: "Digital Workspace",
                  },
                  {
                    id: "core-systems",
                    name: "Digital Core",
                  },
                  {
                    id: "gprc",
                    name: "Digital GPRC",
                  },
                  {
                    id: "backoffice",
                    name: "Digital Back-Office",
                  },
                ],
              },
              {
                id: "enablers",
                name: "Digital Enablers",
                children: [
                  {
                    id: "interops",
                    name: "Digital InterOps",
                  },
                  {
                    id: "security",
                    name: "Digital Security",
                  },
                  {
                    id: "intelligence",
                    name: "Digital Intelligence",
                  },
                  {
                    id: "it",
                    name: "Digital IT",
                  },
                ],
              },
            ],
          },
          {
            id: "sectors",
            name: "Digital Sectors",
            children: [
              {
                id: "experience40",
                name: "Cross-Sector Domain (Experience4.0)",
              },
              {
                id: "agility40",
                name: "Cross-Sector Domain (Agility4.0)",
              },
              {
                id: "farming40",
                name: "Primary Sector (Farming4.0)",
              },
              {
                id: "plant40",
                name: "Secondary Sector (Plant4.0)",
              },
              {
                id: "infrastructure40",
                name: "Secondary Sector (Infrastructure4.0)",
              },
              {
                id: "government40",
                name: "Tertiary Sector (Government4.0)",
              },
              {
                id: "hospitality40",
                name: "Tertiary Sector (Hospitality4.0)",
              },
              {
                id: "retail40",
                name: "Tertiary Sector (Retail4.0)",
              },
              {
                id: "service40",
                name: "Quaternary Sector (Service4.0)",
              },
              {
                id: "logistics40",
                name: "Quaternary Sector (Logistics4.0)",
              },
              {
                id: "wellness40",
                name: "Quinary Sector (Wellness4.0)",
              },
            ],
          },
        ],
      },
      {
        id: "format",
        title: "Format",
        options: [
          {
            id: "quickreads",
            name: "Quick Reads",
          },
          {
            id: "indepth",
            name: "In-Depth Reports",
          },
          {
            id: "interactive",
            name: "Interactive Tools",
          },
          {
            id: "templates",
            name: "Downloadable Templates",
          },
          {
            id: "recorded",
            name: "Recorded Media",
          },
          {
            id: "live",
            name: "Live Events",
          },
        ],
      },
      {
        id: "popularity",
        title: "Popularity",
        options: [
          {
            id: "latest",
            name: "Latest",
          },
          {
            id: "trending",
            name: "Trending",
          },
          {
            id: "downloaded",
            name: "Most Downloaded",
          },
          {
            id: "editors",
            name: "Editor's Pick",
          },
        ],
      },
    ],
    // Data mapping functions
    mapListResponse: (data) => {
      return data.map((item: any) => ({
        ...item,
        // Transform any fields if needed
        tags: item.tags || [item.mediaType, item.domain].filter(Boolean),
      }));
    },
    mapDetailResponse: (data) => {
      return {
        ...data,
        // Transform any fields if needed
        highlights: data.highlights || [],
      };
    },
    mapFilterResponse: (data) => {
      return [
        {
          id: "mediaType",
          title: "Media Type",
          options: data.mediaTypes || [],
        },
        {
          id: "businessStage",
          title: "Business Stage",
          options: data.businessStages || [],
        },
        {
          id: "domain",
          title: "Domain",
          options: data.domains || [],
        },
        {
          id: "format",
          title: "Format",
          options: data.formats || [],
        },
        {
          id: "popularity",
          title: "Popularity",
          options: data.popularity || [],
        },
      ];
    },
    // Mock data for fallback and schema reference
    mockData: mockKnowledgeHubData,
  },
};
// Helper to get config by marketplace type
export const getMarketplaceConfig = (type: string): MarketplaceConfig => {
  const config = marketplaceConfig[type];
  if (!config) {
    throw new Error(`No configuration found for marketplace type: ${type}`);
  }
  return config;
};

/**
 * Get dynamic content type filters based on knowledge depth
 * CRITICAL FIX: Content types must change based on selected depth
 * Based on DTMI Intelligence Platform Architecture Audit
 */
// Temporarily commented out - will be reimplemented with audit fixes
// import {
//   getContentTypesForDepth,
//   KnowledgeDepth,
// } from "./knowledgeDepthTaxonomy";

// export const getDynamicContentTypeFilters = (
//   knowledgeDepth: KnowledgeDepth,
// ) => {
//   const contentTypes = getContentTypesForDepth(knowledgeDepth);

//   return {
//     id: "contentType",
//     title: "Content Type",
//     options: contentTypes.map((ct) => ({
//       id: ct.id,
//       name: ct.name,
//     })),
//   };
// };

/**
 * Get format filters (media types only)
 * CRITICAL FIX: Format should represent media type, not content structure
 */
export const getFormatFilters = () => {
  return {
    id: "format",
    title: "Format",
    options: [
      { id: "written", name: "Written" },
      { id: "video", name: "Video" },
      { id: "audio", name: "Audio" },
    ],
  };
};
