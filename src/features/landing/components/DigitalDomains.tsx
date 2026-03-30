import { useNavigate } from "react-router-dom";
import {
  Smartphone,
  Sparkles,
  Megaphone,
  Bell,
  Users,
  Settings,
  Shield,
  Building2,
  Link2,
  Lock,
  Brain,
  Monitor,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const domains = [
  {
    id: "front-end",
    title: "Digital Front-End",
    streams: [
      {
        id: "channels",
        name: "Digital Channels",
        description: "Where brands and users connect.",
        icon: Smartphone,
      },
      {
        id: "experience",
        name: "Digital Experience",
        description: "Enhancing engagement and satisfaction.",
        icon: Sparkles,
      },
      {
        id: "marketing",
        name: "Digital Marketing",
        description: "Effective digital brand presence strategies.",
        icon: Megaphone,
      },
      {
        id: "services",
        name: "Digital Services",
        description: "Customer-facing and backend digital offerings.",
        icon: Bell,
      },
    ],
  },
  {
    id: "core",
    title: "Digital Core",
    streams: [
      {
        id: "workspace",
        name: "Digital Workspace",
        description: "Collaboration and remote productivity.",
        icon: Users,
      },
      {
        id: "core-systems",
        name: "Digital Core",
        description: "Business backbone with all IT systems.",
        icon: Settings,
      },
      {
        id: "gprc",
        name: "Digital GPRC",
        description: "Governance, risk, and compliance.",
        icon: Shield,
      },
      {
        id: "back-office",
        name: "Digital Back-Office",
        description: "Supporting internal operations digitally.",
        icon: Building2,
      },
    ],
  },
  {
    id: "enablers",
    title: "Digital Enablers",
    streams: [
      {
        id: "interops",
        name: "Digital InterOps",
        description: "Seamless operations across platforms.",
        icon: Link2,
      },
      {
        id: "security",
        name: "Digital Security",
        description: "Safeguarding assets and customer data.",
        icon: Lock,
      },
      {
        id: "intelligence",
        name: "Digital Intelligence",
        description: "AI and analytics driving decisions.",
        icon: Brain,
      },
      {
        id: "it",
        name: "Digital IT",
        description: "Infrastructure powering business processes.",
        icon: Monitor,
      },
    ],
  },
];

export function DigitalDomains() {
  const navigate = useNavigate();

  return (
    <section className="py-12 bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-8">
          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-3 text-center">
            Digital Domains and Functional Streams
          </h2>
          <p className="text-secondary-foreground/70 max-w-4xl mx-auto">
            Foundational digital domains and functional streams driving
            transformation and digital maturity across industries.
          </p>
        </div>

        <div className="space-y-6">
          {domains.map((domain) => (
            <div key={domain.id}>
              <div className="mb-3">
                <h3 className="text-base font-bold">{domain.title}</h3>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {domain.streams.map((stream) => {
                  const Icon = stream.icon;
                  return (
                    <div
                      key={stream.id}
                      className="border border-secondary-foreground/20 rounded-md p-2 bg-secondary-foreground/5 flex flex-col min-h-[60px]"
                    >
                      <div className="flex items-center gap-1.5 mb-1">
                        <Icon size={16} className="text-primary shrink-0" />
                        <h4 className="font-semibold text-xs leading-tight">
                          {stream.name}
                        </h4>
                      </div>
                      <p className="text-[10px] text-secondary-foreground/60 leading-tight">
                        {stream.description}
                      </p>
                    </div>
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
                "/marketplace?domain=channels,experience,services,marketing,workspace,core-systems,gprc,back-office,interops,security,intelligence,it",
              )
            }
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Explore Domains & Streams Insights
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
}
