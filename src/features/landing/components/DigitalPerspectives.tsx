import { useNavigate } from "react-router-dom";
import {
  DollarSign,
  Brain,
  Layers,
  Zap,
  Users,
  Rocket,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const insights = [
  {
    id: 1,
    title: "Digital Economy 4.0",
    description: "Data-driven decisions unlocking revenue streams.",
    link: "/marketplace?dimension=Digital%20Economy%204.0",
    icon: DollarSign,
  },
  {
    id: 2,
    title: "Digital Cognitive Org.",
    description: "AI and automation driving smarter decisions.",
    link: "/marketplace?dimension=Digital%20Cognitive%20Organisation",
    icon: Brain,
  },
  {
    id: 3,
    title: "Digital Business Platform",
    description: "Unified platform integrating key functions.",
    link: "/marketplace?dimension=Digital%20Business%20Platform",
    icon: Layers,
  },
  {
    id: 4,
    title: "Digital Transformation 2.0",
    description: "Strategic technologies meeting customer needs.",
    link: "/marketplace?dimension=Digital%20Transformation%202.0",
    icon: Zap,
  },
  {
    id: 5,
    title: "Digital Worker & Space",
    description: "Smart tools for productivity and collaboration.",
    link: "/marketplace?dimension=Digital%20Worker%20%26%20Workspace",
    icon: Users,
  },
  {
    id: 6,
    title: "Digital Accelerators",
    description: "Ready-to-use solutions driving growth.",
    link: "/marketplace?dimension=Digital%20Accelerators",
    icon: Rocket,
  },
];

export function DigitalPerspectives() {
  const navigate = useNavigate();

  return (
    <section className="py-12 bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-8">
          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-3 text-center">
            Driving Digital Transformation with 6xD
          </h2>
          <p className="text-secondary-foreground/70 max-w-4xl mx-auto">
            Six foundational dimensions guiding your organization toward digital
            maturity and continuous growth.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 mb-8">
          {insights.map(({ id, title, description, icon: Icon }) => (
            <div
              key={id}
              className="border border-secondary-foreground/20 rounded-md p-2 bg-secondary-foreground/5 flex flex-col min-h-[60px]"
            >
              <div className="flex items-center gap-1.5 mb-1">
                <div className="w-6 h-6 flex items-center justify-center shrink-0">
                  <Icon size={16} className="text-primary" />
                </div>
                <h4 className="font-semibold text-xs leading-tight">{title}</h4>
              </div>
              <p className="text-[10px] text-secondary-foreground/60 leading-tight">
                {description}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Button
            onClick={() =>
              navigate(
                "/marketplace?category=d1-e40,d2-dco,d3-dbp,d4-dt20,d5-worker,d6-accelerators",
              )
            }
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Browse 6xD Insights
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
}
