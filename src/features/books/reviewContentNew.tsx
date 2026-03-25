import React from "react";

interface ReviewContent {
  title: string;
  content: React.ReactNode;
}

export const getReviewContent = (bookId: string): ReviewContent => {
  if (bookId === "digital-transformation-playbook") {
    return {
      title: "The Ghost in the Machine",
      content: (
        <div className="space-y-6">
          <p className="text-lg leading-relaxed text-gray-700">
            For the modern CEO, "digital transformation" has become a haunting—a
            spectral promise of agility that remains stubbornly out of reach
            despite billions in spent capital. We have the tools; we have the
            data; yet, the 70 percent failure rate of these initiatives suggests
            a systemic rot that no amount of cloud computing can cure. Enter
            David L. Rogers, whose The Digital Transformation Roadmap arrives
            not as a cheerleader for the new, but as a forensic investigator of
            why the old refuses to die.
          </p>

          <p className="text-lg leading-relaxed text-gray-700">
            Rogers, a fixture at Columbia Business School, has produced a work
            of startling clarity. He moves past the superficiality of
            tech-adoption to address the true bottleneck: organizational debt.
            It is the "gray flannel suit" of the 21st century—a collection of
            legacy hierarchies, risk-averse budgeting, and siloed thinking that
            acts as a biological rejection of digital innovation.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">
            The Five-Pillar Strategy
          </h3>

          <p className="text-lg leading-relaxed text-gray-700">
            While his previous work, The Digital Transformation Playbook,
            focused on the "what" of strategy, this Roadmap is a visceral manual
            on the "how" of execution. He dissects the anatomy of change through
            five rigorous steps:
          </p>

          <p className="text-lg leading-relaxed text-gray-700">
            The Shared Vision: Replacing vague "mission statements" with a
            concrete "North Star" that provides the psychological safety for
            teams to pivot.
          </p>

          <p className="text-lg leading-relaxed text-gray-700">
            The Prioritization of Problems: A ruthless call to ignore "shiny
            object" technologies (the AI-du-jour) in favor of solving the
            frictions that actually impede customer value.
          </p>

          <p className="text-lg leading-relaxed text-gray-700">
            The Validation Engine: Perhaps the book's most vital section, Rogers
            argues for a shift from "planning" to "learning," utilizing
            iterative experimentation to kill bad ideas before they become
            expensive disasters.
          </p>

          <p className="text-lg leading-relaxed text-gray-700">
            Governance as an Accelerator: He reimagines the "C-Suite" not as a
            command center, but as a platform that provides the resources and
            talent necessary for bottom-up innovation.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">
            The Critical Tension
          </h3>

          <p className="text-lg leading-relaxed text-gray-700">
            The brilliance of Rogers's prose is its pragmatism, yet a
            sophisticated reader will feel the underlying tension. To follow
            this roadmap is to ask those at the top to relinquish the very
            control that put them there. Rogers argues that the leader's job is
            no longer to have the answer, but to design the system that finds
            it. It is a profound, and perhaps terrifying, shift in the
            definition of power.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">
            The Verdict
          </h3>

          <p className="text-lg leading-relaxed text-gray-700">
            The Digital Transformation Roadmap is a luminous, essential text. It
            is the rare business book that understands that technology is easy,
            but people are hard. If your organization feels like it is running
            through waist-deep water while your competitors are on hydrofoils,
            this is the blueprint for your liberation.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">
            By the Book: The Executive Coda
          </h3>

          <p className="text-lg leading-relaxed text-gray-700">
            The Core Conflict: The battle between the "certainty" of the
            industrial age and the "agility" of the digital age.
          </p>

          <p className="text-lg leading-relaxed text-gray-700">
            The "Aha" Moment: Realizing that "digital" is a way of thinking, not
            a department.
          </p>

          <p className="text-lg leading-relaxed text-gray-700">
            Pair it with: The Innovator's Dilemma by Clayton Christensen, to
            understand the gravity you are fighting against.
          </p>
        </div>
      ),
    };
  }

  return {
    title: "Review Not Available",
    content: (
      <div className="space-y-6">
        <p className="text-lg leading-relaxed text-gray-700">
          This book review is currently being prepared by our editorial team.
          Please check back soon for our comprehensive analysis.
        </p>
      </div>
    ),
  };
};
