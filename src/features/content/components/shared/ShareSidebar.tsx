import { useState } from "react";
import { Share2, Link as LinkIcon, Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const XIcon = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const LinkedinIcon = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current text-[#0077B5]" aria-hidden="true">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

interface ShareSidebarProps {
  title: string;
  slug?: string | null;
  contentType?: string;
}

export function ShareSidebar({ title, slug, contentType = "blog" }: ShareSidebarProps) {
  const [copied, setCopied] = useState(false);

  const url = `${window.location.origin}/content/${contentType}/${slug || ""}`;

  const share = (platform: "x" | "linkedin" | "copy") => {
    if (platform === "x") {
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(`${title} ${url}`)}`, "_blank");
    } else if (platform === "linkedin") {
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, "_blank");
    } else {
      navigator.clipboard.writeText(url).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  };

  return (
    <Card className="border-border">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-semibold flex items-center gap-2">
          <Share2 className="h-4 w-4 text-primary" />
          Share This Post
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <Button variant="outline" size="sm" className="w-full justify-start gap-3" onClick={() => share("x")}>
          <XIcon />
          Share on X
        </Button>
        <Button variant="outline" size="sm" className="w-full justify-start gap-3" onClick={() => share("linkedin")}>
          <LinkedinIcon />
          Share on LinkedIn
        </Button>
        <Separator />
        <Button
          variant="outline"
          size="sm"
          className={`w-full justify-start gap-3 transition-colors ${copied ? "border-green-500 text-green-600" : ""}`}
          onClick={() => share("copy")}
        >
          {copied ? <Check className="h-4 w-4 text-green-600" /> : <LinkIcon className="h-4 w-4" />}
          {copied ? "Copied!" : "Copy Link"}
        </Button>
      </CardContent>
    </Card>
  );
}
