import { frameworkData } from "./data/frameworkData";
import HeroSection from "./components/HeroSection";
import TableOfContents from "./components/TableOfContents";
import UseCasesSection from "./components/UseCasesSection";
import CoreComponentsSection from "./components/CoreComponentsSection";
import HowItWorksSection from "./components/HowItWorksSection";
import PrinciplesSection from "./components/PrinciplesSection";
import CodeExampleSection from "./components/CodeExampleSection";
import RealWorldSection from "./components/RealWorldSection";
import AdvantagesChallengesSection from "./components/AdvantagesChallengesSection";
import ComparisonSection from "./components/ComparisonSection";
import ResourcesSection from "./components/ResourcesSection";
import ConclusionSection from "./components/ConclusionSection";

const Divider = () => <div className="section-divider mx-auto max-w-5xl" />;

const FrameworkExplainer = () => {
  const d = frameworkData;

  return (
    <div className="min-h-screen bg-background">
      <HeroSection
        title={d.title}
        subtitle={d.subtitle}
        description={d.description}
        targetAudience={d.targetAudience}
      />

      <TableOfContents />

      <div id="use-cases"><UseCasesSection useCases={d.useCases} /></div>
      <Divider />
      <div id="core-concepts"><CoreComponentsSection components={d.coreComponents} /></div>
      <Divider />
      <div id="how-it-works"><HowItWorksSection steps={d.howItWorks.steps} bestPractices={d.howItWorks.bestPractices} /></div>
      <Divider />
      <div id="principles"><PrinciplesSection principles={d.principles} /></div>
      <Divider />
      <div id="code-example"><CodeExampleSection {...d.codeExample} /></div>
      <Divider />
      <div id="real-world"><RealWorldSection examples={d.realWorldExamples} /></div>
      <Divider />
      <div id="evaluation"><AdvantagesChallengesSection advantages={d.advantages} challenges={d.challenges} /></div>
      <Divider />
      <div id="comparison"><ComparisonSection comparisons={d.comparison} /></div>
      <Divider />
      <div id="resources"><ResourcesSection resources={d.resources} /></div>
      <Divider />
      <ConclusionSection title={d.title} />
    </div>
  );
};

export default FrameworkExplainer;
