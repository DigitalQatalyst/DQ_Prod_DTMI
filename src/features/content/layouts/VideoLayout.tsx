/**
 * VideoLayout
 * For: Video content
 * Structure: hero → video player → description → related
 */
import { Header } from "@/shared/Header";
import { Footer } from "@/shared/Footer";
import { Badge } from "@/components/ui/badge";
import { ContentHeader } from "../components/shared/ContentHeader";
import { AuthorCard } from "../components/shared/AuthorCard";
import { ShareSidebar } from "../components/shared/ShareSidebar";
import { RelatedContent } from "../components/shared/RelatedContent";
import type { ContentDetail } from "../api/types";

function sanitize(html: string): string {
  try {
    const doc = new DOMParser().parseFromString(html, "text/html");
    doc.querySelectorAll("script,style,iframe,object,embed").forEach((n) => n.remove());
    return doc.body.innerHTML;
  } catch { return ""; }
}

interface VideoLayoutProps {
  content: ContentDetail;
}

export function VideoLayout({ content }: VideoLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <ContentHeader content={content} />

      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

            <div className="lg:col-span-2 space-y-8">
              {/* Video player */}
              {content.videoUrl ? (
                <div className="rounded-xl overflow-hidden bg-black aspect-video shadow-lg">
                  <video
                    src={content.videoUrl}
                    poster={content.heroImage}
                    controls
                    className="w-full h-full"
                    preload="metadata"
                  />
                </div>
              ) : (
                <div className="rounded-xl overflow-hidden bg-muted aspect-video flex items-center justify-center">
                  <p className="text-muted-foreground">Video not available yet.</p>
                </div>
              )}

              {/* Description */}
              {content.body && (
                <div
                  className="prose prose-slate dark:prose-invert max-w-none prose-headings:font-heading prose-a:text-primary"
                  dangerouslySetInnerHTML={{ __html: sanitize(content.body) }}
                />
              )}

              {content.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-4 border-t border-border">
                  {content.tags.map((tag) => <Badge key={tag} variant="secondary">#{tag}</Badge>)}
                </div>
              )}

              {content.author && <AuthorCard author={content.author} />}
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                <ShareSidebar title={content.title} slug={content.slug} contentType={content.type} />
              </div>
            </div>

          </div>
        </div>
      </div>

      <RelatedContent currentId={content.id} category={content.category} />
      <Footer />
    </div>
  );
}
