import { useNavigate } from "react-router-dom";
import { ExternalLink } from "lucide-react";

export function ContributorAdvertCards() {
  const navigate = useNavigate();

  return (
    <section className="py-16 bg-brand-navy">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center">
          {/* Main Heading */}
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Become a Contributor?
          </h2>

          {/* Subheading */}
          <p className="text-gray-300 text-lg mb-8">
            Share your insights on digital transformation and be a part of our
            research panel.
          </p>

          {/* CTA Button */}
          <button
            onClick={() => navigate("/research-panel")}
            className="bg-white hover:bg-gray-100 text-brand-navy font-semibold py-3 px-8 rounded-lg transition-colors inline-flex items-center gap-2"
          >
            <ExternalLink size={16} />
            Apply now
          </button>
        </div>
      </div>
    </section>
  );
}
