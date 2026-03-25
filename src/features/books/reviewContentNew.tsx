import React from "react";

interface ReviewContent {
  title: string;
  content: React.ReactNode;
}

export const getReviewContent = (bookId: string): ReviewContent => {
  if (bookId === "6xd-six-digital-perspectives") {
    return {
      title:
        "The Unified Field Theory of the Cognitive Enterprise: A Radical Anatomy of the 6xD Framework",
      content: (
        <div className="space-y-6">
          <p className="text-lg leading-relaxed text-gray-700">
            <em>
              A Definitive Critique of 6xD: The Six Digital Perspectives by Dr.
              Stéphane Niango
            </em>
          </p>

          <p className="text-lg leading-relaxed text-gray-700">
            <em>By Carimi Medah</em>
          </p>

          <p className="text-lg leading-relaxed text-gray-700">
            In the quiet boardrooms of the Fortune 500, a comfortable delusion
            has taken root: "Digital Myopia." This is the lethal tendency to
            treat transformation as a series of disconnected tactical projects -
            a cloud migration here, an AI pilot there - while the organization's
            core remains tethered to a linear, pre-digital past.
          </p>

          <p className="text-lg leading-relaxed text-gray-700">
            Dr. Stéphane Niango, in his seminal 385-page work, 6xD: The Six
            Digital Perspectives, argues that this fragmented approach is
            corporate malpractice. Niango provides what the industry has lacked
            for a decade: a 360-degree cognitive architecture for the
            AI-sovereign era. He doesn't just offer a checklist; he provides the
            "Physics of Transition" for building a Digital Cognitive
            Organization that doesn't just use AI, but thinks through it.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">
            The 6xD Hexagon: The Architecture of Sovereignty
          </h3>

          <p className="text-lg leading-relaxed text-gray-700">
            Niango dismantles the traditional business model and reconstructs it
            across six uncompromising dimensions, moving beyond "disruption"
            buzzwords to provide a masterclass in Strategic Execution.
          </p>

          <h4 className="text-lg font-semibold text-gray-900 mt-6 mb-3">
            I. The Economic Playing Field (D1: Economy & D2: Platforms)
          </h4>

          <p className="text-lg leading-relaxed text-gray-700">
            <strong>The Law:</strong> You are no longer selling products; you
            are managing Value Flows in a networked ecosystem.
          </p>

          <p className="text-lg leading-relaxed text-gray-700">
            <strong>The Mandate:</strong> If you aren't the orchestrator of your
            platform, you are merely a tenant in someone else's. Niango proves
            that the "Platform" is the only sustainable moat in an economy that
            has shifted from "Asset Ownership" to Network Orchestration.
          </p>

          <h4 className="text-lg font-semibold text-gray-900 mt-6 mb-3">
            II. The Intelligent Engine (D3: Digital & AI & D4: Operations)
          </h4>

          <p className="text-lg leading-relaxed text-gray-700">
            <strong>The Law:</strong> AI is the Central Nervous System;
            Operations is the Musculature.
          </p>

          <p className="text-lg leading-relaxed text-gray-700">
            <strong>The Mandate:</strong> Strategy is a hallucination without
            Algorithmic Agility. Niango bridges the "Strategy-Execution Gap" by
            showing how AI must be baked into the operational DNA, turning raw
            data into autonomous, high-velocity decisions.
          </p>

          <h4 className="text-lg font-semibold text-gray-900 mt-6 mb-3">
            III. The Momentum of Change (D5: People & D6: Acceleration)
          </h4>

          <p className="text-lg leading-relaxed text-gray-700">
            <strong>The Law:</strong> Technology is the "How," but People and
            Speed are the "Why."
          </p>

          <p className="text-lg leading-relaxed text-gray-700">
            <strong>The Mandate:</strong> These are the Force Multipliers.
            Niango provides the psychological framework to shift a workforce
            from "Fear of AI" to "Cognitive Empowerment," creating a
            self-accelerating innovation loop that moves at the pace of the
            market, not the pace of the hierarchy.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">
            The Executive Cheat Sheet: 6 Dimensions of Dominance
          </h3>

          <p className="text-lg leading-relaxed text-gray-700">
            To be socialized as the core framework for your 2026-2028 Strategy:
          </p>

          <div className="bg-gray-50 p-6 rounded-lg mt-6">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-300">
                  <th className="text-left py-2 font-semibold">Dimension</th>
                  <th className="text-left py-2 font-semibold">
                    The Strategic Pivot
                  </th>
                </tr>
              </thead>
              <tbody className="space-y-2">
                <tr className="border-b border-gray-200">
                  <td className="py-2 font-medium">D1: Digital Economy</td>
                  <td className="py-2">
                    From "Linear Value Pipes" to Global Value Networks.
                  </td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-2 font-medium">D2: Platforms</td>
                  <td className="py-2">
                    From "Product Vendor" to Ecosystem Orchestrator.
                  </td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-2 font-medium">D3: Digital & AI</td>
                  <td className="py-2">
                    From "Human-Plus-Tool" to Hybrid Cognitive Intelligence.
                  </td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-2 font-medium">D4: Operations</td>
                  <td className="py-2">
                    From "Slow-Motion Hierarchy" to Algorithmic Agility.
                  </td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-2 font-medium">D5: People & Culture</td>
                  <td className="py-2">
                    From "Digital Literacy" to Digital Intuition.
                  </td>
                </tr>
                <tr>
                  <td className="py-2 font-medium">D6: Acceleration</td>
                  <td className="py-2">
                    From "Reactive Growth" to Innovation Velocity.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">
            The Verdict: The "War Manual" for the Fortune 500
          </h3>

          <p className="text-lg leading-relaxed text-gray-700">
            6xD is a rare masterpiece of synthesis. It possesses the academic
            rigor of a doctorate and the battle-scarred pragmatism of a field
            manual. It is an intellectually demanding read - this is not a
            "plane ride" book; it is a "Strategy Offsite" book. It requires the
            C-Suite to engage with all six dimensions simultaneously, which is a
            significant but necessary cognitive lift.
          </p>

          <p className="text-lg leading-relaxed text-gray-700">
            <strong>The Final Thought:</strong> In the AI-driven economy, there
            will be two types of organizations: The Cognitive and The Obsolete.
            Dr. Stéphane Niango has provided the border crossing. Reading this
            book is the difference between leading a resurrection and managing a
            funeral.
          </p>
        </div>
      ),
    };
  }

  if (bookId === "driving-digital-strategy") {
    return {
      title:
        "The Great Inversion: Why the Legacy Tanker Must Become Its Own Iceberg",
      content: (
        <div className="space-y-6">
          <p className="text-lg leading-relaxed text-gray-700">
            <em>
              A Critical Review of Driving Digital Strategy by Sunil Gupta
            </em>
          </p>

          <p className="text-lg leading-relaxed text-gray-700">
            <em>By Carimi Medah</em>
          </p>

          <p className="text-lg leading-relaxed text-gray-700">
            In the quiet boardrooms of the Fortune 500, a comfortable delusion
            has taken root. It is the myth of the "Digital Speedboat." The logic
            is seductive: leave the multibillion-dollar legacy "tanker" on its
            steady, traditional course while launching a fleet of agile, sleek
            innovation hubs to scout the future. It feels like progress. It
            looks like innovation.
          </p>

          <p className="text-lg leading-relaxed text-gray-700">
            Sunil Gupta, the Edward W. Carter Professor of Business
            Administration at Harvard Business School, argues in Driving Digital
            Strategy that this is not leadership—it is corporate malpractice. A
            speedboat, no matter how fast, lacks the displacement to turn a
            tanker. To survive the next decade, the tanker must not just change
            direction; it must cannibalize itself.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">
            The Cannibal's Calculus
          </h3>

          <p className="text-lg leading-relaxed text-gray-700">
            Gupta's thesis is built on a radical premise: True transformation is
            an act of creative destruction directed inward. He posits that most
            "digital initiatives" are merely digital theater—performative
            agility that never touches the balance sheet.
          </p>

          <p className="text-lg leading-relaxed text-gray-700">
            For the incumbent, the enemy is not the five-year-old unicorn; it is
            the internal resistance to what Gupta calls the "Physics of
            Transition." He dismantles the traditional business model and
            reconstructs it across four uncompromising pillars.
          </p>

          <h4 className="text-lg font-semibold text-gray-900 mt-6 mb-3">
            I. From Product to Platform: The Ecosystem Sovereignty
          </h4>

          <p className="text-lg leading-relaxed text-gray-700">
            The most dangerous question a CEO can ask today is, "What do we
            sell?" Gupta argues that the answer should no longer be a physical
            object or a discrete service, but an entry point into an ecosystem.
          </p>

          <p className="text-lg leading-relaxed text-gray-700">
            Take John Deere. By embedding sensors into every tractor, they
            ceased being a hardware manufacturer and became the architects of a
            data-driven agricultural operating system. They moved from selling
            "iron" to selling "yield." In Gupta's world, you are either the
            platform or a commodity plug-in for someone else's.
          </p>

          <h4 className="text-lg font-semibold text-gray-900 mt-6 mb-3">
            II. The Open Innovation Mandate
          </h4>

          <p className="text-lg leading-relaxed text-gray-700">
            The era of the "Secret R&D Lab" is over. Gupta highlights a
            fundamental shift in the value chain: the move from fixed assets to
            variable agility. Legacy firms that survive are those that treat
            their boundaries as porous. By utilizing Digital Twins and
            open-source innovation, firms like Goldman Sachs and Adobe have
            turned rigid legacy structures into fluid, responsive networks.
            Efficiency, once a competitive advantage, is now merely the price of
            entry. Agility is the only sustainable moat.
          </p>

          <h4 className="text-lg font-semibold text-gray-900 mt-6 mb-3">
            III. The 200-20 Paradox: The Death of the Average Customer
          </h4>

          <p className="text-lg leading-relaxed text-gray-700">
            Perhaps Gupta's most jarring indictment is his assault on the Pareto
            Principle. Through "Nano-Economics," he proves that in the digital
            age, 20% of your customers generate 200% of your profit, while the
            bottom 80% are often value-destructive.
          </p>

          <p className="text-lg leading-relaxed text-gray-700">
            Digital strategy, therefore, is not about "reaching everyone." It is
            about the surgical use of data-driven contextual engagement to
            "fire" low-value customers and obsessively over-serve the
            "Super-User." In this new economy, data is not just information; it
            is the currency of survival.
          </p>

          <h4 className="text-lg font-semibold text-gray-900 mt-6 mb-3">
            IV. Navigating the "U-Curve" of Death
          </h4>

          <p className="text-lg leading-relaxed text-gray-700">
            The final pillar is a test of leadership character: The U-Curve.
            Transformation requires a near-religious commitment to the
            "transitional profit dip."
          </p>

          <p className="text-lg leading-relaxed text-gray-700">
            When The New York Times pivoted to a digital paywall, it wasn't a
            project—it was a near-death experience. Gupta argues that if a Board
            of Directors is not prepared to watch margins contract before they
            skyrocket, they will inevitably fire the visionary CEO just as the
            transformation begins to take hold. It is a warning to every leader:
            The bridge to the future is built with the bones of your current
            quarterly dividends.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">
            The Verdict: The Architecture of Resurrection
          </h3>

          <p className="text-lg leading-relaxed text-gray-700">
            Driving Digital Strategy is not a book for the timid or the Silicon
            Valley startup enthusiast. It is a high-friction "war manual" for
            the institutional elite. Gupta provides the transition physics that
            allow a 100-year-old firm to out-maneuver a 5-year-old unicorn, but
            he offers no easy exits.
          </p>

          <p className="text-lg leading-relaxed text-gray-700">
            In the next five years, the market will bifurcate into two distinct
            categories: The Reimagined and The Irrelevant. Gupta has provided
            the border crossing. Reading this book is the difference between
            orchestrating a corporate resurrection and merely managing a
            funeral.
          </p>
        </div>
      ),
    };
  }

  if (bookId === "economics-of-data-analytics") {
    return {
      title:
        "The Post-Industrial Manifesto: Data as the New Economic Sovereign",
      content: (
        <div className="space-y-6">
          <p className="text-lg leading-relaxed text-gray-700">
            <em>
              A Definitive Review of The Economics of Data, Analytics, and
              Digital Transformation by Bill Schmarzo
            </em>
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">
            The Premise: Beyond the "Data as Oil" Delusion
          </h3>

          <p className="text-lg leading-relaxed text-gray-700">
            For a decade, the C-Suite has been seduced by a dangerous metaphor:
            "Data is the new oil." In this seminal work, Bill
            Schmarzo—rightfully dubbed the "Dean of Big Data"—dismantles this
            myth with surgical precision. Oil is a finite, depleting commodity.
            Data, Schmarzo argues, is a non-depletable, regenerative asset that
            actually appreciates the more it is utilized.
          </p>

          <p className="text-lg leading-relaxed text-gray-700">
            This isn't a book about technology; it is a financial framework for
            the 21st-century enterprise. It is a cold bucket of water for
            leaders who have spent millions on "Innovation Theater" without
            seeing a single line-item shift on the balance sheet.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">
            The Three "Atomic Shifts" for Transformation Leaders
          </h3>

          <h4 className="text-lg font-semibold text-gray-900 mt-6 mb-3">
            1. The Law of Infinite Returns (The EvD Theorem)
          </h4>

          <p className="text-lg leading-relaxed text-gray-700">
            Schmarzo's most disruptive contribution is the Economic Value of
            Data (EvD) Theorem. He proves that while physical assets (like a
            factory or a fleet) suffer from depreciation and physical
            constraints, digital assets possess near-zero marginal cost.
          </p>

          <p className="text-lg leading-relaxed text-gray-700">
            <strong>The Strategic Edge:</strong> A single dataset can power
            infinite use cases simultaneously. If your organization isn't
            exploiting this "multiplier effect," you are mathematically
            guaranteed to be out-competed by an autonomous enterprise that
            understands how to compound its digital wealth.
          </p>

          <h4 className="text-lg font-semibold text-gray-900 mt-6 mb-3">
            2. The "Decision-First" Mandate: Killing the Science Fair
          </h4>

          <p className="text-lg leading-relaxed text-gray-700">
            The industry is littered with failed "Data Lakes" and "AI Pilots"
            that never leave the lab. Schmarzo introduces Value Engineering—a
            6-step shotgun marriage between Data Science and Business Strategy.
          </p>

          <p className="text-lg leading-relaxed text-gray-700">
            <strong>The Strategic Edge:</strong> He mandates that leaders stop
            asking "What data do we have?" and start asking "What high-value
            business decision do we need to win?" By tying every algorithm to a
            High-Value Business Initiative (HVBI), Schmarzo provides the "secret
            sauce" to bridging the gap between the IT department and the
            Boardroom.
          </p>

          <h4 className="text-lg font-semibold text-gray-900 mt-6 mb-3">
            3. The Cultural Metamorphosis (The BMMI)
          </h4>

          <p className="text-lg leading-relaxed text-gray-700">
            Transformation fails when it is treated as a destination rather than
            a muscle. The book provides the Big Data Business Model Maturity
            Index (BMMI)—a rigorous roadmap from Monitoring (hindsight) to
            Metamorphosis (predictive autonomy).
          </p>

          <p className="text-lg leading-relaxed text-gray-700">
            <strong>The Strategic Edge:</strong> The "outstanding" insight here
            is that you cannot buy maturity. Schmarzo proves that digital
            transformation is a cultural evolution where the "Digital Worker" is
            empowered with "Nano-Economics"—making individualized, real-time
            decisions that aggregate into massive corporate wins.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">
            The Critical Verdict: A War Manual for the Digital Sovereign
          </h3>

          <p className="text-lg leading-relaxed text-gray-700">
            <strong>The Strength:</strong> Schmarzo writes with the
            battle-scarred authority of a practitioner. He provides the
            "theorems" that allow a CDO to walk into a CFO's office and speak
            the language of NPV, IRR, and Asset Appreciation. It transforms data
            from a "tech concern" into a "leadership currency."
          </p>

          <p className="text-lg leading-relaxed text-gray-700">
            <strong>The Challenge:</strong> This is not a "light read" for a
            Sunday afternoon. It is dense, tactical, and demands
            cross-functional literacy. It is a War Manual for those ready to do
            the heavy lifting of restructuring their organization's economic
            DNA.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">
            Final Thought
          </h3>

          <p className="text-lg leading-relaxed text-gray-700">
            In the coming decade, there will be two types of companies: Digital
            Sovereigns (who own the economics of their data) and Digital Serfs
            (who pay the sovereigns for insights). Bill Schmarzo's book is your
            border crossing.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">
            How to leverage this review for maximum impact:
          </h3>

          <p className="text-lg leading-relaxed text-gray-700">
            <strong>The "Elevator Pitch":</strong> "We need to stop treating
            data as a cost to be managed and start treating it as a regenerative
            asset with zero marginal cost. Schmarzo's framework shows us how."
          </p>

          <p className="text-lg leading-relaxed text-gray-700">
            <strong>The "Boardroom Mic-Drop":</strong> "If our digital strategy
            doesn't have an 'Economic Value of Data' theorem, we aren't
            transforming; we're just spending."
          </p>
        </div>
      ),
    };
  }

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
