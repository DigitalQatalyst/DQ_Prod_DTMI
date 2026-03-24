import { mediaService } from "../../admin/shared/utils/supabase";

export interface DeepAnalysisHighlight {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  publishDate: string;
  readTime: number;
  heroImage: string;
  link: string;
  featured?: boolean;
  analysisType: string;
  slug: string;
}

export interface DeepAnalysisHighlightsResponse {
  highlights: DeepAnalysisHighlight[];
  success: boolean;
  error?: string;
}

const fallbackHighlights: DeepAnalysisHighlight[] = [
  {
    id: "1",
    title: "The Future of Cognitive Organizations: A Strategic Framework",
    excerpt: "Comprehensive analysis of how cognitive technologies are reshaping organizational structures and decision-making processes in the digital age.",
    category: "Strategic Analysis",
    publishDate: "March 15, 2026",
    readTime: 45,
    heroImage: "/images/Article 01_hero image.png",
    link: "/marketplace/dtmi/deep-analysis/cognitive-organizations-framework",
    featured: true,
    analysisType: "Whitepaper",
    slug: "cognitive-organizations-framework"
  },
  {
    id: "2",
    title: "Digital Transformation ROI: Measurement Strategies",
    excerpt: "Research-backed methodologies for measuring and optimizing digital transformation return on investment.",
    category: "Research Report",
    publishDate: "March 12, 2026",
    readTime: 35,
    heroImage: "/images/Article 02_hero image.png",
    link: "/marketplace/dtmi/deep-analysis/digital-transformation-roi",
    analysisType: "Research Report",
    slug: "digital-transformation-roi"
  },
  {
    id: "3",
    title: "AI Governance Frameworks for Enterprise",
    excerpt: "Predictive analysis on emerging AI governance models and their impact on enterprise decision-making.",
    category: "Prediction Analysis",
    publishDate: "March 10, 2026",
    readTime: 40,
    heroImage: "/images/Article 03_hero image.png",
    link: "/marketplace/dtmi/deep-analysis/ai-governance-frameworks",
    analysisType: "Prediction Analysis",
    slug: "ai-governance-frameworks"
  },
  {
    id: "4",
    title: "Data Sovereignty in the Global Economy",
    excerpt: "Strategic whitepaper examining data sovereignty challenges and opportunities in international business.",
    category: "Strategic Analysis",
    publishDate: "March 8, 2026",
    readTime: 50,
    heroImage: "/images/Article 01_hero image.png",
    link: "/marketplace/dtmi/deep-analysis/data-sovereignty-global",
    analysisType: "Whitepaper",
    slug: "data-sovereignty-global"
  },
  {
    id: "5",
    title: "Platform Economics: Business Model Evolution",
    excerpt: "Research report on how platform-based business models are transforming traditional industry structures.",
    category: "Business Innovation",
    publishDate: "March 5, 2026",
    readTime: 38,
    heroImage: "/images/Article 02_hero image.png",
    link: "/marketplace/dtmi/deep-analysis/platform-economics-evolution",
    analysisType: "Research Report",
    slug: "platform-economics-evolution"
  }
];

export const fetchDeepAnalysisHighlights = async (): Promise<DeepAnalysisHighlightsResponse> => {
  try {
    // Fetch whitepapers, research reports, and prediction analysis
    const [whitepaperResponse, researchResponse, blogResponse] = await Promise.all([
      mediaService.getMediaItems({
        type: "whitepaper",
        limit: 2,
      }),
      mediaService.getMediaItems({
        type: "research",
        limit: 2,
      }),
      mediaService.getMediaItems({
        type: "blog",
        limit: 1,
        // Look for prediction analysis in categories or tags
      }),
    ]);

    const allAnalysis = [
      ...(whitepaperResponse.data || []),
      ...(researchResponse.data || []),
      ...(blogResponse.data || []),
    ];

    if (allAnalysis.length > 0) {
      const mappedAnalysis: DeepAnalysisHighlight[] = allAnalysis
        .slice(0, 5)
        .map((item: any, index: number) => ({
          id: item.id,
          title: item.title,
          excerpt:
            item.excerpt ||
            item.summary ||
            item.body?.substring(0, 200) + "...",
          category:
            item.category || item.categoryName || "Strategic Analysis",
          publishDate: new Date(
            item.publishDate || item.publishedAt,
          ).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
          readTime:
            item.readTime ||
            (item.type === "whitepaper"
              ? 45
              : item.type === "research"
                ? 35
                : 40),
          heroImage:
            item.heroImage ||
            item.thumbnailUrl ||
            "/images/Article 01_hero image.png",
          link: item.slug ? `/blog/${item.slug}` : `/media/blog/${item.id}`,
          featured: index === 0,
          analysisType:
            item.type === "whitepaper"
              ? "Whitepaper"
              : item.type === "research"
                ? "Research Report"
                : "Prediction Analysis",
          slug: item.slug,
        }));

      return {
        highlights: mappedAnalysis,
        success: true
      };
    } else {
      // No analysis found, use fallback
      return {
        highlights: fallbackHighlights,
        success: true
      };
    }
  } catch (error) {
    console.error("❌ [Deep Analysis Highlights API] Error fetching highlights:", error);
    return {
      highlights: fallbackHighlights,
      success: false,
      error: error instanceof Error ? error.message : "Failed to fetch deep analysis highlights"
    };
  }
};