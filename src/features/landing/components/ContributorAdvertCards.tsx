import { useNavigate } from "react-router-dom";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ContributorAdvertCards() {
  const navigate = useNavigate();

  return (
    <section className="py-16 bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4 md:px-6 text-center">
        <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4 text-center">
          Become a Contributor?
        </h2>
        <p className="text-secondary-foreground/70 text-lg mb-8">
          Share your insights on digital transformation and be a part of our
          research panel.
        </p>
        <Button
          onClick={() => navigate("/research-panel")}
          variant="outline"
          className="bg-background text-foreground hover:bg-muted border-background"
        >
          <ExternalLink className="mr-2 h-4 w-4" />
          Apply now
        </Button>
      </div>
    </section>
  );
}
