import React from "react";
import { Link } from "react-router-dom";
import {
  Linkedin,
  Twitter,
  Instagram,
  ExternalLink,
  BookOpen,
} from "lucide-react";

export function DTMIFooter() {
  return (
    <footer className="bg-gradient-to-r from-brand-navy to-blue-900 text-white">
      <div className="container mx-auto px-4 md:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="md:col-span-1">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center mr-3">
                <span className="text-brand-navy font-bold text-lg">DQ</span>
              </div>
              <span className="text-xl font-bold">Digital Qatalyst</span>
            </div>
            <p className="text-gray-300 mb-6 text-sm leading-relaxed">
              Perfecting Life Transactions
            </p>
            <p className="text-gray-300 mb-6 text-sm leading-relaxed">
              Stay updated with the latest digital transformation insights,
              solutions, and innovations from Digital Qatalyst.
            </p>
          </div>

          {/* DTMI Intelligence Layers */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Intelligence Layers</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  to="/signals"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Signals
                </Link>
              </li>
              <li>
                <Link
                  to="/insights"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Insights
                </Link>
              </li>
              <li>
                <Link
                  to="/research"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Deep Analysis
                </Link>
              </li>
              <li>
                <Link
                  to="/dtmi/6xd"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  6xD Framework
                </Link>
              </li>
              <li>
                <Link
                  to="/marketplace/dtmi"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  DTMI Marketplace
                </Link>
              </li>
            </ul>
          </div>

          {/* Content & Research */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Content & Research</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  to="/dtmi/contributors"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Contributors Marketplace
                </Link>
              </li>
              <li>
                <Link
                  to="/dtmi/research-panel"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Research Panel
                </Link>
              </li>
              <li>
                <Link
                  to="/marketplace/dtmi?contentType=articles"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Articles
                </Link>
              </li>
              <li>
                <Link
                  to="/marketplace/dtmi?contentType=expert-interviews"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Expert Interviews
                </Link>
              </li>
              <li>
                <Link
                  to="/marketplace/dtmi?contentType=podcasts"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Podcast{" "}
                  <span className="text-xs text-orange-400">(Coming Soon)</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/marketplace/dtmi?contentType=research-reports"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Research Reports
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect & Company */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect</h3>
            <ul className="space-y-3 text-sm mb-6">
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors flex items-center gap-2"
                >
                  <Linkedin className="w-4 h-4" />
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors flex items-center gap-2"
                >
                  <Twitter className="w-4 h-4" />X (Twitter)
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors flex items-center gap-2"
                >
                  <Instagram className="w-4 h-4" />
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://medium.com/@admin_39247/about"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-colors flex items-center gap-2"
                >
                  <BookOpen className="w-4 h-4" />
                  Medium (DQ DTMI)
                </a>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-gray-300 hover:text-white transition-colors flex items-center gap-2"
                >
                  <ExternalLink className="w-4 h-4" />
                  Contact Us
                </Link>
              </li>
            </ul>

            <h4 className="text-md font-semibold mb-3">Company</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/about-us"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  About Digital Qatalyst
                </Link>
              </li>
              <li>
                <Link
                  to="/careers"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy-policy"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms-of-service"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-blue-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2024 Digital Qatalyst. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
