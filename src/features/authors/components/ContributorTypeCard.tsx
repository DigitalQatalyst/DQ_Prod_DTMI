import { ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface ContributorTypeCardProps {
  icon: string;
  label: string;
  affiliation: string;
  description: string;
  expertise: string;
  count: number;
  onClick: () => void;
}

export function ContributorTypeCard({
  icon,
  label,
  affiliation,
  description,
  expertise,
  count,
  onClick,
}: ContributorTypeCardProps) {
  return (
    <Card
      onClick={onClick}
      className="cursor-pointer hover:shadow-md transition-all duration-200 group border-border bg-card"
    >
      <CardContent className="p-6 flex flex-col h-full gap-4">
        {/* Top row: icon + name + contributor count */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-muted flex items-center justify-center text-xl shrink-0">
              {icon}
            </div>
            <div>
              <h3 className="font-heading font-bold text-card-foreground text-base leading-tight group-hover:text-primary transition-colors">
                {label}
              </h3>
              <p className="text-xs text-muted-foreground">{affiliation}</p>
            </div>
          </div>
          <div className="text-right shrink-0">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
              Contributors
            </p>
            <p className="text-2xl font-bold text-foreground leading-none">{count}</p>
          </div>
        </div>

        <Separator />

        {/* Description */}
        <p className="text-sm text-muted-foreground leading-relaxed flex-1">
          {description}
        </p>

        {/* Expertise */}
        {expertise && (
          <div className="text-sm">
            <span className="font-semibold text-foreground">Expertise: </span>
            <span className="text-muted-foreground">{expertise}</span>
          </div>
        )}

        {/* Category badge */}
        <Badge variant="outline" className="w-fit text-xs uppercase tracking-wider">
          Category
        </Badge>

        <Separator />

        {/* CTA */}
        <button className="flex items-center gap-1.5 text-sm font-semibold text-primary group-hover:gap-2.5 transition-all">
          Explore Contributors
          <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </CardContent>
    </Card>
  );
}
