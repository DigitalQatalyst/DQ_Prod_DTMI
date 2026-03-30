import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Header } from "@/shared/Header";
import { Footer } from "@/shared/Footer";
import { ContributorTypeCard } from "./components/ContributorTypeCard";
import { useAuthors } from "./hooks/useAuthors";
import { CONTRIBUTOR_TYPES } from "./api/authors";

export default function AuthorsPage() {
  const navigate = useNavigate();
  const { data: allAuthors = [], isLoading } = useAuthors();

  const countByType = (type: string) =>
    allAuthors.filter((a) => a.contributorType === type).length;

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-10">
        {/* Page header */}
        <div className="mb-8">
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-2">
            Explore DTMI Contributors
          </h1>
          <p className="text-muted-foreground max-w-2xl">
            Browse the collective intelligence powering DTMI, filter by contributor type, discover topical tags, and dive into their biographies, areas of expertise, and portfolio of published works.
          </p>
        </div>

        {/* Sub-header row */}
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <p className="text-sm text-muted-foreground">
            Explore {CONTRIBUTOR_TYPES.length} contributor categories
          </p>
          <Button
            onClick={() => navigate("/contributors/all")}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            View All Contributors
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        {/* 2×2 grid of contributor type cards */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((i) => <Skeleton key={i} className="h-72 rounded-xl" />)}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {CONTRIBUTOR_TYPES.map((type) => (
              <ContributorTypeCard
                key={type.id}
                icon={type.icon}
                label={type.label}
                affiliation="DigitalQatalyst"
                description={type.description}
                expertise={type.expertise}
                count={countByType(type.id)}
                onClick={() => navigate(`/contributors/all?type=${encodeURIComponent(type.id)}`)}
              />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
