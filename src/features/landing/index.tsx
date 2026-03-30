import { HeroSection } from "./components/HeroSection";
import { FeaturedInsights } from "./components/FeaturedInsights";
import { WeekHighlightsHomepage } from "./components/WeekHighlightsHomepage";
import { FeaturedBlogs } from "./components/FeaturedBlogs";
import { PredictionAnalysis } from "./components/PredictionAnalysis";
import { DigitalPerspectives } from "./components/DigitalPerspectives";
import { SectorInsights } from "./components/SectorInsights";
import { DigitalDomains } from "./components/DigitalDomains";
import { MarketplaceOfMinds } from "./components/MarketplaceOfMinds";
import { ContributorAdvertCards } from "./components/ContributorAdvertCards";
import { FeaturedContent } from "./components/FeaturedContent";
import { NewsletterSignupForm } from "./components/NewsletterSignupForm";
import { Header } from "@/shared/Header";
import { Footer } from "@/shared/Footer";

export function LandingPage() {
  return (
    <div className="flex flex-col w-full min-h-screen bg-background">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <FeaturedInsights />
        <WeekHighlightsHomepage />
        <FeaturedBlogs />
        <PredictionAnalysis />
        <DigitalPerspectives />
        <SectorInsights />
        <DigitalDomains />
        <MarketplaceOfMinds />
        <ContributorAdvertCards />
        <FeaturedContent />
        <NewsletterSignupForm />
      </main>
      <Footer />
    </div>
  );
}

export default LandingPage;
