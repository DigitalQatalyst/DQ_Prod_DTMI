import React from "react";
import { Link } from "react-router-dom";
import { TrendingUp, BookOpen, Users, Lightbulb } from "lucide-react";

export function InsightsFooter() {
  return (
    <section className="bg-blue-600 text-white py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Explore More Intelligence Layers
          </h2>
          <p className="text-blue-100 text-lg max-w-3xl mx-auto">
            Dive deeper into our comprehensive digital transformation
            intelligence ecosystem
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Signals */}
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center hover:bg-white/20 transition-all duration-300">
            <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Signals</h3>
            <p className="text-blue-100 mb-4 text-sm">
              Stay ahead with emerging trends and weak signals in digital
              transformation
            </p>
            <Link
              to="/dtmi/signals"
              className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
            >
              Explore Signals
            </Link>
          </div>

          {/* Deep Analysis */}
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center hover:bg-white/20 transition-all duration-300">
            <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Deep Analysis</h3>
            <p className="text-blue-100 mb-4 text-sm">
              Comprehensive research and in-depth analysis of digital
              transformation patterns
            </p>
            <Link
              to="/dtmi/deep-analysis"
              className="inline-block bg-purple-500 hover:bg-purple-600 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
            >
              Explore Analysis
            </Link>
          </div>

          {/* Contributors */}
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center hover:bg-white/20 transition-all duration-300">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Contributors</h3>
            <p className="text-blue-100 mb-4 text-sm">
              Join our community of experts and thought leaders shaping the
              future
            </p>
            <Link
              to="/dtmi/contributors"
              className="inline-block bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
            >
              Join Community
            </Link>
          </div>
        </div>

        {/* Research Panel CTA */}
        <div className="bg-gradient-to-r from-blue-800 to-blue-900 rounded-lg p-8 text-center">
          <div className="flex items-center justify-center mb-4">
            <Lightbulb className="w-8 h-8 text-yellow-400 mr-3" />
            <h3 className="text-2xl font-bold">Become a Contributor?</h3>
          </div>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Share your insights on digital transformation and be a part of our
            research panel.
          </p>
          <Link
            to="/dtmi/research-panel"
            className="inline-block bg-white text-blue-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Apply now
          </Link>
        </div>

        {/* The Week's Highlights Categories */}
        <div className="mt-12 pt-8 border-t border-blue-500">
          <h4 className="text-lg font-semibold mb-6 text-center">
            The Week's Highlights Categories
          </h4>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/marketplace/dtmi?contentType=articles&category=ai-automation"
              className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full text-sm transition-colors"
            >
              AI & Automation
            </Link>
            <Link
              to="/marketplace/dtmi?contentType=articles&category=digital-strategy"
              className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full text-sm transition-colors"
            >
              Digital Strategy
            </Link>
            <Link
              to="/marketplace/dtmi?contentType=articles&category=data-analytics"
              className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full text-sm transition-colors"
            >
              Data Analytics
            </Link>
            <Link
              to="/marketplace/dtmi?contentType=articles&category=cloud-computing"
              className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full text-sm transition-colors"
            >
              Cloud Computing
            </Link>
            <Link
              to="/marketplace/dtmi?contentType=articles&category=cybersecurity"
              className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full text-sm transition-colors"
            >
              Cybersecurity
            </Link>
            <Link
              to="/marketplace/dtmi?contentType=articles&category=innovation"
              className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full text-sm transition-colors"
            >
              Innovation Management
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
