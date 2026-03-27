import { ThumbsUp, AlertTriangle } from "lucide-react";
import SectionHeading from "./SectionHeading";

interface Props {
  advantages: string[];
  challenges: string[];
}

const AdvantagesChallengesSection = ({ advantages, challenges }: Props) => (
  <section className="container max-w-5xl mx-auto px-6 py-20">
    <SectionHeading
      label="07 · Evaluation"
      title="Advantages & Challenges"
    />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="glass-card rounded-xl p-8">
        <div className="flex items-center gap-2 mb-6">
          <ThumbsUp className="w-5 h-5 text-primary" />
          <h3 className="text-foreground font-semibold text-lg">Advantages</h3>
        </div>
        <ul className="space-y-3">
          {advantages.map((a) => (
            <li key={a} className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
              <span className="text-muted-foreground text-sm leading-relaxed">{a}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="glass-card rounded-xl p-8">
        <div className="flex items-center gap-2 mb-6">
          <AlertTriangle className="w-5 h-5 text-destructive" />
          <h3 className="text-foreground font-semibold text-lg">Challenges</h3>
        </div>
        <ul className="space-y-3">
          {challenges.map((c) => (
            <li key={c} className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-destructive mt-2 flex-shrink-0" />
              <span className="text-muted-foreground text-sm leading-relaxed">{c}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </section>
);

export default AdvantagesChallengesSection;
