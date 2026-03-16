import React from "react";
import { useNavigate } from "react-router-dom";

interface IntelligenceLayer {
  id: string;
  title: string;
  tab: "signals" | "insights" | "deep-analysis";
}

const intelligenceLayers: IntelligenceLayer[] = [
  {
    id: "signals",
    title: "Signals",
    tab: "signals",
  },
  {
    id: "insights",
    title: "Insights",
    tab: "insights",
  },
  {
    id: "deep-analysis",
    title: "Deep Analysis",
    tab: "deep-analysis",
  },
];

interface IntelligenceLayersSectionProps {
  onTabChange?: (tab: "signals" | "insights" | "deep-analysis") => void;
}

export const IntelligenceLayersSection: React.FC<
  IntelligenceLayersSectionProps
> = ({ onTabChange }) => {
  const navigate = useNavigate();

  const handleLayerClick = (layer: IntelligenceLayer) => {
    if (onTabChange) {
      // If onTabChange is provided, use tabbed interface
      onTabChange(layer.tab);
    } else {
      // Otherwise, navigate to marketplace with tab parameter
      navigate(`/marketplace/dtmi?tab=${layer.tab}`);
    }
  };

  return (
    <section className="bg-white py-12">
      <div className="container mx-auto px-4">
        {/* Simple Navigation Tabs */}
        <div className="flex justify-center items-center gap-16">
          {intelligenceLayers.map((layer) => (
            <button
              key={layer.id}
              onClick={() => handleLayerClick(layer)}
              className="text-2xl font-medium text-gray-600 hover:text-gray-900 transition-colors duration-200 cursor-pointer"
            >
              {layer.title}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
