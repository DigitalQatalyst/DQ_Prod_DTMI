import { mediaService } from "../../admin/shared/utils/supabase";

export interface EditorPickAnalysis {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  publishDate: string;
  readTime: number;
  heroImage: string;
  link: string;
  author: string;
  editorNote: string;
  analysisType: string;
  pages?: number;
  slug: string;
}

export interface EditorsPickDeepAnalysisResponse {
  editorsPicks: EditorPickAnalysis[];
  success: boolean;
  error?: string;
}

const fallbackEditorsPicks: EditorPickAnalysis[] = [
  {
    id: "1",
    title: "The Cognitive Enterprise: A Strategic Blueprint for Digital Transformation",
    excerpt: "This comprehensive whitepaper explores how cognitive technologies are fundamentally reshaping enterprise architecture and operational models in the digital age.",
    category: "Strategic Framework",
    publishDate: "March 18, 2026",
    readTime: 55,
    heroImage: "/images/Article 01_hero image.png",
    link: "/marketplace/dtmi/deep-analysis/cognitive-enterprise-blueprint",
    author: "Dr. Sarah Chen",
    editorNote: "Essential strategic framework that redefines enterprise architecture for the cognitive age",
    analysisType: "Whitepaper",
    pages: 47,
    slug: "cognitive-enterprise-blueprint"
  },
  {
    id: "2",
    title: "Digital Transformation ROI: Comprehensive Measurement Framework",
    excerpt: "Groundbreaking research establishing new methodologies for measuring and optimizing digital transformation return on investment across enterprise initiatives.",
    category: "Research Report",
    publishDate: "March 15, 2026",
    readTime: 48,
    heroImage: "/images/Article 02_hero image.png",
    link: "/marketplace/dtmi/deep-analysis/digital-transformation-roi-framework",
    author: "Research Team",
    editorNote: "Groundbreaking research that establishes new benchmarks for digital transformation success",
    analysisType: "Research Report",
    pages: 62,
    slug: "digital-transformation-roi-framework"
  }
];

export const fetchEditorsPickDeepAnalysis = async (): Promise<EditorsPickDeepAnalysisResponse> => {
  try {
    // Fetch whitepapers and research reports
    const [whitepaperResponse, researchResponse] = await Promise.all([
      mediaService.getMediaItems({
        type: "whitepaper",
        limit: 1,
      }),
      mediaService.getMediaItems({
        type: "research",
        limit: 1,
      }),
    ]);

    const allAnalysis = [
      ...(whitepaperResponse.data || []),
      ...(researchResponse.data || []),
    ];

    if (allAnalysis.length > 0) {
      const mappedAnalysis: EditorPickAnalysis[] = allAnalysis
        .slice(0, 2)
        .map((item: any) => ({
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
          readTime: item.readTime || (item.type === "whitepaper" ? 55 : 48),
          heroImage:
            item.heroImage ||
            item.thumbnailUrl ||
            "/images/Article 01_hero image.png",
          link: item.slug ? `/blog/${item.slug}` : `/media/blog/${item.id}`,
          author: item.author?.name || "Research Team",
          editorNote:
            item.type === "whitepaper"
              ? "Essential strategic framework that redefines enterprise architecture for the cognitive age"
              : "Groundbreaking research that establishes new benchmarks for digital transformation success",
          analysisType:
            item.type === "whitepaper" ? "Whitepaper" : "Research Report",
          pages: item.type === "whitepaper" ? 47 : 62,
          slug: item.slug,
        }));

      return {
        editorsPicks: mappedAnalysis,
        success: true
      };
    } else {
      // No analysis found, use fallback
      return {
        editorsPicks: fallbackEditorsPicks,
        success: true
      };
    }
  } catch (error) {
    console.error("❌ [Editors Pick Deep Analysis API] Error fetching editor's picks:", error);
    return {
      editorsPicks: fallbackEditorsPicks,
      success: false,
      error: error instanceof Error ? error.message : "Failed to fetch editor's pick deep analysis"
    };
  }
};