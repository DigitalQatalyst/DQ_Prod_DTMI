import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function MarketplaceOfMinds() {
  const navigate = useNavigate();

  return (
    <section className="py-20 bg-muted">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4 text-center">
            Marketplace of Minds
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-8">
            Discover the experts and institutions driving DTMI insights and
            digital transformation knowledge.
          </p>
          <Button
            onClick={() => navigate("/contributors")}
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg hover:shadow-xl"
          >
            Explore Contributors
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
}
