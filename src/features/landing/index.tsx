import { useState } from "react";
import { DtmiHeroSection } from "./components/HeroSection";
import { Header } from "../../shared/Header/Header";
import { Footer } from "../../shared/Footer/Footer";
import { FeaturedInsights } from "./components/FeaturedInsights";
import { SectorInsights } from "./components/SectorInsights";
import { NewsletterSignupForm } from "./components/NewsletterSignupForm";
import { DTMIPageFooter } from "../../pages/dtmi/components/DTMIPageFooter";
import { DigitalPerspectives } from "./components/DigitalPerspectives";
import { FeaturedBlogs } from "./components/FeaturedBlogs";
import { DigitalDomains } from "./components/DigitalDomains";
import { MarketplaceOfMinds } from "./components/MarketplaceOfMinds";
import { ContributorAdvertCards } from "./components/ContributorAdvertCards";
import { FeaturedContent } from "./components/FeaturedContent";
import { WeekHighlightsHomepage } from "./components/WeekHighlightsHomepage";
import ModernDQChatbot from "../../shared/ModernDQChatbot";
import { SignalsContent } from "../dtmi/content-tabs/SignalsContent";
import { InsightsContent } from "../dtmi/content-tabs/InsightsContent";
import { DeepAnalysisContent } from "../dtmi/content-tabs/DeepAnalysisContent";
import { PredictionAnalysis } from "./components/PredictionAnalysis";
import { Footer } from "../../shared/Footer/Footer";

type TabType = "default" | "signals" | "insights" | "deep-analysis";

const DtmiLandingPage = () => {
  const [activeTab, setActiveTab] = useState<TabType>("default");

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    // Scroll to top smoothly
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-white">
      <Header />

      <main className="flex-1">
        <DtmiHeroSection />

        {/* Default Homepage Content */}
        {activeTab === "default" && (
          <>
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
            {/* <DTMIPageFooter /> */}
          </>
        )}

        {/* Signals Tab Content */}
        {activeTab === "signals" && (
          <SignalsContent onBackToHome={() => handleTabChange("default")} />
        )}

        {/* Insights Tab Content */}
        {activeTab === "insights" && (
          <InsightsContent onBackToHome={() => handleTabChange("default")} />
        )}

        {/* Deep Analysis Tab Content */}
        {activeTab === "deep-analysis" && (
          <DeepAnalysisContent
            onBackToHome={() => handleTabChange("default")}
          />
        )}
      </main>
      <Footer />

      {/* DQ AI Chatbot */}
      <ModernDQChatbot />
    </div>
  );
};

export default DtmiLandingPage;
