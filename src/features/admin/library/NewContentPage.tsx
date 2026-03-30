import { FilePlus2 } from "lucide-react";
import { Link } from "react-router-dom";
import AdminLayout from "../shared/AdminLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const comingSoonTypes = [
  "Article",
  "Case Study",
  "Podcast",
  "Video",
  "Expert Interview",
  "Infographic",
];

export default function NewContentPage() {
  return (
    <AdminLayout title="New Content">
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Create Content Item</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Select a content type. Blog and Article editors are active now,
              and the rest are ready as tabs for the next rollout.
            </p>
          </CardContent>
        </Card>

        <Tabs defaultValue="blog" className="w-full">
          <TabsList className="flex w-full flex-wrap h-auto gap-2 justify-start bg-transparent p-0">
            <TabsTrigger value="blog">Blog</TabsTrigger>
            <TabsTrigger value="article">Article</TabsTrigger>
            <TabsTrigger value="case-study">Case Study</TabsTrigger>
            <TabsTrigger value="podcast">Podcast</TabsTrigger>
            <TabsTrigger value="video">Video</TabsTrigger>
            <TabsTrigger value="expert-interview">Expert Interview</TabsTrigger>
            <TabsTrigger value="infographic">Infographic</TabsTrigger>
          </TabsList>

          <TabsContent value="blog" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Blog Content</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Open the blog editor to create a new blog post with rich text,
                  media, and hierarchical filters.
                </p>
                <Button asChild>
                  <Link to="/admin/library/blog/new">
                    <FilePlus2 className="h-4 w-4 mr-2" />
                    New Blog
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="article" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Article Content</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Open the article editor to create a new article with rich
                  text, media, and hierarchical filters.
                </p>
                <Button asChild>
                  <Link to="/admin/library/article/new">
                    <FilePlus2 className="h-4 w-4 mr-2" />
                    New Article
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="case-study" className="mt-4">
            <ComingSoonCard type="Case Study" />
          </TabsContent>
          <TabsContent value="podcast" className="mt-4">
            <ComingSoonCard type="Podcast" />
          </TabsContent>
          <TabsContent value="video" className="mt-4">
            <ComingSoonCard type="Video" />
          </TabsContent>
          <TabsContent value="expert-interview" className="mt-4">
            <ComingSoonCard type="Expert Interview" />
          </TabsContent>
          <TabsContent value="infographic" className="mt-4">
            <ComingSoonCard type="Infographic" />
          </TabsContent>
        </Tabs>

        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm text-muted-foreground">
                Upcoming editors:
              </span>
              {comingSoonTypes.map((type) => (
                <Badge key={type} variant="secondary">
                  {type}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}

function ComingSoonCard({ type }: Readonly<{ type: string }>) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{type}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-muted-foreground">
          {type} editor is queued for implementation in the same workflow style
          as Blog.
        </p>
        <Button type="button" variant="outline" disabled>
          Coming Soon
        </Button>
      </CardContent>
    </Card>
  );
}
