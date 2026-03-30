/**
 * ContentDetailPage
 * Each content type has its own explicit route:
 *   /blog/:slugOrId
 *   /article/:slugOrId
 *   /whitepaper/:slugOrId
 *   /research-report/:slugOrId
 *   /podcast/:slugOrId
 *   /expert-interview/:slugOrId
 *   /video/:slugOrId
 *   /case-study/:slugOrId
 *   /infographic/:slugOrId
 *
 * The type is inferred from the URL pathname, not a route param.
 * Each layout is isolated — ready for its own CMS section later.
 */
import { useParams, useLocation, Navigate } from "react-router-dom";
import { Spinner } from "@/components/ui/spinner";
import { useContentDetail } from "./hooks/useContentDetail";
import { ArticleBlogLayout } from "./layouts/ArticleBlogLayout";
import { WhitepaperLayout } from "./layouts/WhitepaperLayout";
import { PodcastLayout } from "./layouts/PodcastLayout";
import { VideoLayout } from "./layouts/VideoLayout";
import type { ContentDetail, ContentDetailType } from "./api/types";

const LAYOUT_MAP: Record<ContentDetailType, React.ComponentType<{ content: ContentDetail }>> = {
  blog: ArticleBlogLayout,
  article: ArticleBlogLayout,
  "future-insight": ArticleBlogLayout,
  "case-study": ArticleBlogLayout,
  infographic: ArticleBlogLayout,
  whitepaper: WhitepaperLayout,
  "research-report": WhitepaperLayout,
  podcast: PodcastLayout,
  "expert-interview": PodcastLayout,
  video: VideoLayout,
};

/** Derive content type from the first path segment, e.g. /blog/my-slug → "blog" */
function typeFromPath(pathname: string): ContentDetailType | null {
  const segment = pathname.split("/")[1] as ContentDetailType;
  return segment in LAYOUT_MAP ? segment : null;
}

export default function ContentDetailPage() {
  const { slugOrId } = useParams<{ slugOrId: string }>();
  const { pathname } = useLocation();

  const contentType = typeFromPath(pathname);

  const { data: content, isLoading, error } = useContentDetail(slugOrId ?? "");

  if (!slugOrId || !contentType) return <Navigate to="/marketplace" replace />;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-3">
          <Spinner className="h-10 w-10 mx-auto text-primary" />
          <p className="text-muted-foreground text-sm">Loading content...</p>
        </div>
      </div>
    );
  }

  if (error || !content) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-3 max-w-sm">
          <h1 className="font-heading text-2xl font-bold text-foreground">Content not found</h1>
          <p className="text-muted-foreground text-sm">
            {error instanceof Error ? error.message : "The content you're looking for doesn't exist."}
          </p>
          <a href="/marketplace" className="text-primary hover:underline text-sm">
            ← Back to Marketplace
          </a>
        </div>
      </div>
    );
  }

  const Layout = LAYOUT_MAP[contentType];

  return <Layout content={content} />;
}
