import { Link } from "react-router-dom";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useRelatedContent } from "../../hooks/useContentDetail";

interface RelatedContentProps {
  currentId: string;
  category: string;
}

export function RelatedContent({ currentId, category }: RelatedContentProps) {
  const { data: posts = [], isLoading } = useRelatedContent(currentId, category);

  if (isLoading) {
    return (
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <Skeleton className="h-8 w-48 mb-8" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => <Skeleton key={i} className="h-64 rounded-xl" />)}
          </div>
        </div>
      </section>
    );
  }

  if (posts.length === 0) return null;

  return (
    <section className="py-16 bg-muted">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-heading text-2xl font-bold text-foreground">Related Content</h2>
          <Link to="/marketplace" className="inline-flex items-center gap-1.5 text-primary hover:text-primary/80 text-sm font-medium transition-colors">
            View All <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Link key={post.id} to={post.link}
              className="group bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col">
              <div className="relative overflow-hidden aspect-video">
                <img src={post.heroImage} alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 bg-primary/90 text-primary-foreground text-xs font-medium rounded-md">
                    {post.category}
                  </span>
                </div>
              </div>
              <div className="p-5 flex flex-col flex-1">
                <h3 className="font-heading text-base font-bold text-card-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                  {post.title}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-4 flex-1">{post.excerpt}</p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground mt-auto">
                  <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{post.publishDate}</span>
                  <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{post.readTime} min read</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
