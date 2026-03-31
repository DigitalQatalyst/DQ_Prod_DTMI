import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const CONTRIBUTOR_CATEGORIES = [
  {
    id: "research-leadership",
    name: "Research Leadership",
    description:
      "Strategic research direction and methodological oversight for DTMI's cognitive transformation initiatives.",
    contributorCount: 2,
    icon: "🎯",
    expertise: "Strategic Research, Cognitive Analysis, Transformation Leadership",
    link: "/dtmi/contributors?category=research-leadership",
  },
  {
    id: "human-intelligence-analysts",
    name: "Human Intelligence Analysts",
    description:
      "Expert analysts specializing in digital transformation domains and cognitive organizational frameworks.",
    contributorCount: 5,
    icon: "🧠",
    expertise: "Domain Analysis, Platform Architecture, Digital Strategy",
    link: "/dtmi/contributors?category=human-intelligence-analysts",
  },
  {
    id: "ai-research-agents",
    name: "AI Research Agents",
    description:
      "Specialized AI agents conducting autonomous research across the 6xD framework and digital transformation domains.",
    contributorCount: 7,
    icon: "🤖",
    expertise: "AI Research, Autonomous Analysis, Framework Specialization",
    link: "/dtmi/contributors?category=ai-research-agents",
  },
  {
    id: "editorial-publication-team",
    name: "Editorial Publication Team",
    description:
      "Content curation, editorial oversight, and publication management for DTMI research outputs.",
    contributorCount: 3,
    icon: "✍️",
    expertise: "Editorial Leadership, Content Strategy, Publication Management",
    link: "/dtmi/contributors?category=editorial-publication-team",
  },
];

export function ContributorAdvertCards() {
  const navigate = useNavigate();

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-sm text-gray-500 mb-1">
              Explore {CONTRIBUTOR_CATEGORIES.length} contributor categories
            </p>
          </div>
          <button
            onClick={() => navigate("/dtmi/contributors?showAll=true")}
            className="inline-flex items-center gap-2 bg-brand-coral text-white font-semibold text-sm px-5 py-2.5 rounded-lg hover:bg-opacity-90 transition-all"
          >
            View All Contributors
            <ArrowRight size={16} />
          </button>
        </div>

        {/* 2×2 Grid of category cards — identical to contributors marketplace */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {CONTRIBUTOR_CATEGORIES.map((category) => (
            <ContributorCategoryCard
              key={category.id}
              category={category}
              onClick={() => navigate(category.link)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

interface ContributorCategoryCardProps {
  category: (typeof CONTRIBUTOR_CATEGORIES)[0];
  onClick: () => void;
}

function ContributorCategoryCard({ category, onClick }: ContributorCategoryCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col gap-4 cursor-pointer group">
      {/* Header row — icon + name/org + contributor count */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-4">
          {/* Icon circle */}
          <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-2xl flex-shrink-0 border border-gray-200">
            {category.icon}
          </div>

          {/* Name + org */}
          <div>
            <h3 className="font-bold text-gray-900 text-base leading-tight group-hover:text-brand-coral transition-colors">
              {category.name}
            </h3>
            <p className="text-sm text-gray-500 mt-0.5">DigitalQatalyst</p>
          </div>
        </div>

        {/* Contributor count */}
        <div className="text-right flex-shrink-0">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400">
            Contributors
          </p>
          <p className="text-2xl font-bold text-gray-900 leading-tight">
            {category.contributorCount}
          </p>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-600 leading-relaxed">
        {category.description}
      </p>

      {/* Expertise */}
      <div className="flex gap-1.5 text-sm text-gray-600 flex-wrap">
        <span className="font-semibold text-gray-900">Expertise:</span>
        <span>{category.expertise}</span>
      </div>

      {/* Category tag */}
      <div>
        <span className="text-xs font-bold uppercase tracking-widest text-blue-600">
          Category
        </span>
      </div>

      {/* Divider + CTA */}
      <div className="border-t border-gray-100 pt-4 mt-auto">
        <button
          onClick={onClick}
          className="inline-flex items-center gap-2 text-sm font-semibold text-brand-coral hover:gap-3 transition-all duration-200"
        >
          Explore Contributors
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}
