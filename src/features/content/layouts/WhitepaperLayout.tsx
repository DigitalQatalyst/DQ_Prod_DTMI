/**
 * WhitepaperLayout
 * For: Whitepaper, Research Report, Forecast Reports
 * Structure: hero → download CTA → abstract → body → related
 */
import { Download, FileText, Lock } from "lucide-react";
import { Header } from "@/shared/Header";
import { Footer } from "@/shared/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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

interface WhitepaperLayoutProps {
  content: ContentDetail;
}

export function WhitepaperLayout({ content }: WhitepaperLayoutProps) {
  const handleDownload = () => {
    if (!content.downloadUrl) return;
    const a = document.createElement("a");
    a.href = content.downloadUrl;
    a.target = "_blank";
    a.download = content.title;
    a.click();
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <ContentHeader content={content} />

      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

            {/* Main */}
            <div className="lg:col-span-2 space-y-8">
              {/* Download CTA */}
              <Card className="border-primary/20 bg-primary/5">
                <CardContent className="p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <div className="flex items-center gap-3 flex-1">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                      <FileText className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">Download Full Report</p>
                      <p className="text-sm text-muted-foreground">PDF · Free access</p>
                    </div>
                  </div>
                  {content.downloadUrl ? (
                    <Button onClick={handleDownload} className="bg-primary text-primary-foreground hover:bg-primary/90 shrink-0">
                      <Download className="mr-2 h-4 w-4" />
                      Download PDF
                    </Button>
                  ) : (
                    <Button variant="outline" disabled className="shrink-0">
                      <Lock className="mr-2 h-4 w-4" />
                      Coming Soon
                    </Button>
                  )}
                </CardContent>
              </Card>

              {/* Body */}
              {content.body ? (
                <div
                  className="prose prose-slate dark:prose-invert max-w-none
                    prose-headings:font-heading prose-headings:text-foreground
                    prose-p:text-foreground/80 prose-a:text-primary
                    prose-img:rounded-xl prose-blockquote:border-l-primary"
                  dangerouslySetInnerHTML={{ __html: sanitize(content.body) }}
                />
              ) : (
                <p className="text-muted-foreground italic">Abstract not available.</p>
              )}

              {content.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-4 border-t border-border">
                  {content.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">#{tag}</Badge>
                  ))}
                </div>
              )}

              {content.author && <AuthorCard author={content.author} />}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
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
