/**
 * ArticleBlogLayout
 * Shared layout for: Blog, Article, Case Study, Infographic
 * Structure: full-width header → 2/3 body + 1/3 sticky sidebar → related content
 */
import { useRef, useState, useEffect } from "react";
import { Header } from "@/shared/Header";
import { Footer } from "@/shared/Footer";
import { ContentHeader } from "../components/shared/ContentHeader";
import { AuthorCard } from "../components/shared/AuthorCard";
import { ShareSidebar } from "../components/shared/ShareSidebar";
import { RelatedContent } from "../components/shared/RelatedContent";
import type { ContentDetail } from "../api/types";

interface ArticleBlogLayoutProps {
  content: ContentDetail;
}

function sanitize(html: string): string {
  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    doc.querySelectorAll("script,style,iframe,object,embed").forEach((n) => n.remove());
    doc.querySelectorAll("*").forEach((el) => {
      Array.from(el.attributes).forEach((attr) => {
        if (attr.name.startsWith("on") || (["href", "src"].includes(attr.name) && /javascript:/i.test(attr.value))) {
          el.removeAttribute(attr.name);
        }
      });
    });
    return doc.body.innerHTML;
  } catch {
    return "";
  }
}

export function ArticleBlogLayout({ content }: ArticleBlogLayoutProps) {
  const bodyRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const [sidebarStyle, setSidebarStyle] = useState<React.CSSProperties>({ position: "sticky", top: "96px" });

  // Sticky sidebar that stops before related content
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerWidth < 1024 || !bodyRef.current || !sidebarRef.current) {
        setSidebarStyle({});
        return;
      }
      setSidebarStyle({ position: "sticky", top: "96px" });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />

      <ContentHeader content={content} />

      {/* Main content area */}
      <div ref={bodyRef} className="container mx-auto px-4 md:px-6 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

            {/* Body — 2/3 */}
            <div className="lg:col-span-2">
              {content.body ? (
                <div
                  className="prose prose-slate dark:prose-invert max-w-none
                    prose-headings:font-heading prose-headings:text-foreground
                    prose-p:text-foreground/80 prose-p:leading-relaxed
                    prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                    prose-img:rounded-xl prose-img:shadow-md
                    prose-blockquote:border-l-primary prose-blockquote:text-muted-foreground
                    prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
                    prose-pre:bg-muted prose-pre:border prose-pre:border-border"
                  dangerouslySetInnerHTML={{ __html: sanitize(content.body) }}
                />
              ) : (
                <p className="text-muted-foreground italic">No content available.</p>
              )}

              {/* Tags */}
              {content.tags.length > 0 && (
                <div className="mt-8 pt-6 border-t border-border flex flex-wrap gap-2">
                  {content.tags.map((tag) => (
                    <span key={tag} className="px-3 py-1 bg-muted text-muted-foreground text-xs rounded-full border border-border">
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Author card */}
              {content.author && <AuthorCard author={content.author} />}
            </div>

            {/* Sidebar — 1/3 */}
            <div className="lg:col-span-1">
              <div ref={sidebarRef} style={sidebarStyle} className="space-y-6">
                <ShareSidebar title={content.title} slug={content.slug} contentType={content.type} />
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Related content */}
      <RelatedContent currentId={content.id} category={content.category} />

      <Footer />
    </div>
  );
}
