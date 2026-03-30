import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  ArrowRight,
  Sparkles,
  Zap,
  Shield,
  Briefcase,
  Brain,
  Users,
  Pickaxe,
  Sprout,
  Truck,
  Factory,
  Building2,
  ShoppingBag,
  Landmark,
  Hotel,
  Heart,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const sectorGroups = [
  {
    groupTitle: "Technology & Innovation-Driven",
    description:
      "Digital experiences, AI integration, and workplace transformation",
    sectors: [
      {
        name: "Experience 4.0",
        icon: Sparkles,
        description:
          "Digital technologies creating seamless customer journeys.",
        link: "/marketplace?sector=Experience%204.0",
      },
      {
        name: "Agility 4.0",
        icon: Zap,
        description: "Adaptive strategies reshaping business operations.",
        link: "/marketplace?sector=Agility%204.0",
      },
      {
        name: "Governance 4.0",
        icon: Shield,
        description: "Digital governance and risk management frameworks.",
        link: "/marketplace?sector=Governance%204.0",
      },
      {
        name: "Backoffice 4.0",
        icon: Briefcase,
        description: "Automation transforming back-office efficiency.",
        link: "/marketplace?sector=Backoffice%204.0",
      },
      {
        name: "Intelligence 4.0",
        icon: Brain,
        description: "AI and analytics driving intelligent decisions.",
        link: "/marketplace?sector=Intelligence%204.0",
      },
      {
        name: "Workspace 4.0",
        icon: Users,
        description: "Digital workspaces and hybrid work models.",
        link: "/marketplace?sector=Workspace%204.0",
      },
    ],
  },
  {
    groupTitle: "Industry-Specific Transformation",
    description: "Automation, IoT, and AI reshaping traditional industries",
    sectors: [
      {
        name: "Mining 4.0",
        icon: Pickaxe,
        description: "IoT and automation for safety and efficiency.",
        link: "/marketplace?sector=Mining%204.0",
      },
      {
        name: "Farming 4.0",
        icon: Sprout,
        description: "Precision agriculture and sustainable production.",
        link: "/marketplace?sector=Farming%204.0",
      },
      {
        name: "Logistics 4.0",
        icon: Truck,
        description: "Smart supply chains and real-time tracking.",
        link: "/marketplace?sector=Logistics%204.0",
      },
      {
        name: "Plant 4.0",
        icon: Factory,
        description: "Smart manufacturing and predictive maintenance.",
        link: "/marketplace?sector=Plant%204.0",
      },
      {
        name: "Infrastructure 4.0",
        icon: Building2,
        description: "Smart cities and intelligent infrastructure.",
        link: "/marketplace?sector=Infrastructure%204.0",
      },
    ],
  },
  {
    groupTitle: "Service & Customer-Experience Driven",
    description: "Service transformation and customer-facing innovations",
    sectors: [
      {
        name: "Services 4.0",
        icon: Briefcase,
        description: "Digital platforms enhancing service delivery.",
        link: "/marketplace?sector=Services%204.0",
      },
      {
        name: "Government 4.0",
        icon: Landmark,
        description: "E-governance and citizen-centric transformation.",
        link: "/marketplace?sector=Government%204.0",
      },
      {
        name: "Retail 4.0",
        icon: ShoppingBag,
        description: "AI and IoT meeting modern consumer demands.",
        link: "/marketplace?sector=Retail%204.0",
      },
      {
        name: "Hospitality 4.0",
        icon: Hotel,
        description: "Smart hotels and personalized guest experiences.",
        link: "/marketplace?sector=Hospitality%204.0",
      },
      {
        name: "Wellness 4.0",
        icon: Heart,
        description: "Digital health and telemedicine innovations.",
        link: "/marketplace?sector=Wellness%204.0",
      },
    ],
  },
];

export function SectorInsights() {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section className="py-12 bg-muted">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-8">
          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-3 text-foreground text-center">
            Explore Insights Across Industries
          </h2>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            Discover how industries leverage digital transformation for superior
            experiences and advantage.
          </p>
        </div>

        <div className="space-y-6">
          {sectorGroups.map((group, gi) => (
            <div key={gi}>
              <div className="mb-3">
                <h3 className="text-base font-bold text-foreground mb-0.5">
                  {group.groupTitle}
                </h3>
                <p className="text-muted-foreground text-xs">
                  {group.description}
                </p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
                {group.sectors.map((sector) => {
                  const Icon = sector.icon;
                  return (
                    <button
                      key={sector.name}
                      className="border border-border rounded-md p-2 bg-card hover:bg-accent transition-all duration-300 flex flex-col min-h-15 shadow-sm hover:shadow-md text-left"
                      onMouseEnter={() => setHovered(sector.name)}
                      onMouseLeave={() => setHovered(null)}
                      onClick={() => navigate(sector.link)}
                    >
                      <div className="flex items-center gap-1.5 mb-1">
                        <Icon size={16} className="text-primary shrink-0" />
                        <h4 className="font-semibold text-xs text-foreground leading-tight">
                          {sector.name}
                        </h4>
                      </div>
                      <div
                        className={`transition-all duration-300 overflow-hidden`}
                      >
                        <p className="text-[10px] text-muted-foreground leading-tight">
                          {sector.description}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Button
            onClick={() =>
              navigate(
                "/marketplace?sector=experience40,agility40,farming40,plant40,infrastructure40,government40,hospitality40,retail40,service40,logistics40,wellness40",
              )
            }
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Explore Industry Insights
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
}
