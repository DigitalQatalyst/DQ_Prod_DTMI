import { useNavigate } from "react-router-dom";
import { ArrowRight, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useFeaturedBlogs } from "../hooks/useFeaturedBlogs";
import type { FeaturedBlog } from "../api/featuredBlogs";

export function FeaturedBlogs() {
  const navigate = useNavigate();
  const { data, isLoading, error } = useFeaturedBlogs();
  const featuredBlog = data?.featuredBlog;
  const relatedBlogs = data?.relatedBlogs || [];

  if (isLoading) {
    return (
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <Skeleton className="h-10 w-64 mb-12" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Skeleton className="h-96 w-full rounded-lg" />
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-24 w-full rounded-lg" />
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error || !featuredBlog) {
    return (
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground">
            {error
              ? "Failed to load blogs"
              : "No blogs available at the moment."}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground text-center mb-4">
            Latest Signals
          </h2>
          <Button
            variant="ghost"
            onClick={() => navigate("/marketplace?tab=signals")}
            className="text-primary hover:text-primary/80 font-semibold"
          >
            Browse All Signals
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Featured Blog */}
          <FeaturedBlogCard
            blog={featuredBlog}
            onClick={() => navigate(featuredBlog.link)}
          />

          {/* Related Blogs */}
          <div className="space-y-4">
            <h3 className="font-heading text-xl font-bold text-foreground">
              Related Blogs
            </h3>
            <div className="space-y-4">
              {relatedBlogs.map((blog) => (
                <RelatedBlogCard
                  key={blog.id}
                  blog={blog}
                  onClick={() => navigate(blog.link)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FeaturedBlogCard({
  blog,
  onClick,
}: {
  blog: FeaturedBlog;
  onClick: () => void;
}) {
  return (
    <div className="group cursor-pointer" onClick={onClick}>
      <div className="relative h-64 rounded-lg overflow-hidden mb-4">
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="space-y-3">
        <Badge variant="secondary" className="w-fit">
          {blog.category}
        </Badge>
        <h3 className="font-heading text-2xl md:text-3xl font-bold text-foreground group-hover:text-primary transition-colors leading-tight">
          {blog.title}
        </h3>
        <p className="text-muted-foreground text-sm leading-relaxed">
          {blog.description}
        </p>
        <div className="flex items-center gap-2 text-muted-foreground text-sm">
          {blog.readTime && (
            <>
              <Clock className="h-4 w-4" />
              <span>{blog.readTime}</span>
              <span>•</span>
            </>
          )}
          <span>{blog.date}</span>
        </div>
      </div>
    </div>
  );
}

function RelatedBlogCard({
  blog,
  onClick,
}: {
  blog: FeaturedBlog;
  onClick: () => void;
}) {
  return (
    <div
      className="group cursor-pointer flex gap-4 pb-5 border-b border-border last:border-b-0"
      onClick={onClick}
    >
      <div className="relative w-20 h-20 shrink-0 rounded overflow-hidden">
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="flex-1 space-y-1">
        <h4 className="font-heading text-sm font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-snug">
          {blog.title}
        </h4>
        <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
          {blog.description}
        </p>
        <p className="text-xs text-muted-foreground">{blog.date}</p>
      </div>
    </div>
  );
}
