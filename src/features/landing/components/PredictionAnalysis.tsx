import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { usePredictionAnalysis } from "../hooks/usePredictionAnalysis";
import type { PredictionItem } from "../api/predictionAnalysis";

export function PredictionAnalysis() {
  const navigate = useNavigate();
  const { data, isLoading, error } = usePredictionAnalysis();
  const predictions = data?.predictions || [];

  if (isLoading) {
    return (
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <Skeleton className="h-10 w-80 mb-12" />
          <Skeleton className="h-125 w-full rounded-2xl" />
        </div>
      </section>
    );
  }

  if (error || predictions.length === 0) {
    return (
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground">
            {error
              ? "Failed to load prediction analysis"
              : "No prediction analysis available."}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground text-center mb-4">
            Featured Deep Analysis
          </h2>
          <Button
            variant="ghost"
            onClick={() => navigate("/marketplace?tab=deep-analysis")}
            className="text-primary hover:text-primary/80 font-semibold"
          >
            Browse All Deep Analysis
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>

        <Carousel opts={{ loop: true }} className="w-full relative group">
          <CarouselContent>
            {predictions.map((prediction) => (
              <CarouselItem key={prediction.id}>
                <PredictionCard
                  prediction={prediction}
                  onClick={() => navigate(prediction.link)}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex left-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-primary/90 hover:bg-primary border-0 text-background opacity-90 hover:opacity-100 transition-all" />
          <CarouselNext className="hidden md:flex right-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-primary/90 hover:bg-primary border-0 text-background opacity-90 hover:opacity-100 transition-all" />
        </Carousel>
      </div>
    </section>
  );
}

function PredictionCard({
  prediction,
  onClick,
}: Readonly<{
  prediction: PredictionItem;
  onClick: () => void;
}>) {
  return (
    <button
      type="button"
      className="bg-card rounded-2xl overflow-hidden shadow-lg cursor-pointer hover:shadow-xl transition-all duration-300"
      onClick={onClick}
    >
      <div className="grid grid-cols-1 lg:grid-cols-[58%_42%] h-80 text-left">
        {/* Text Content */}
        <div className="p-8 md:p-12 flex h-full flex-col justify-between order-2 lg:order-1">
          <div>
            <Badge variant="secondary" className="mb-4 w-fit">
              {prediction.category}
            </Badge>
            <h3 className="font-heading text-2xl md:text-3xl font-bold text-card-foreground mb-4 leading-tight line-clamp-3 ">
              {prediction.title}
            </h3>
            <p className="text-muted-foreground mb-4 leading-relaxed line-clamp-3">
              {prediction.description}
            </p>
          </div>
          <div className="flex items-center gap-2 text-foreground hover:text-primary transition-colors font-semibold group cursor-pointer">
            <span className="font-semibold">Read more</span>
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
        {/* Image */}
        <div className="relative h-full order-1 lg:order-2">
          <img
            src={prediction.image}
            alt={prediction.title}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </button>
  );
}
