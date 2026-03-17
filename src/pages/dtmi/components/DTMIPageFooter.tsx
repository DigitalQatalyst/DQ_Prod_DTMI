import React from "react";
import { Link } from "react-router-dom";
import { Linkedin, Twitter, Instagram, ExternalLink } from "lucide-react";

export function DTMIPageFooter() {
  return (
    <section className="bg-brand-navy text-white py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div>
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center mr-3">
                <span className="text-brand-navy font-bold text-lg">DQ</span>
              </div>
            </div>
            <p className="text-gray-300 mb-6 text-sm leading-relaxed">
              Perfecting Life Transactions
            </p>
            <p className="text-gray-300 mb-6 text-sm leading-relaxed">
              Stay updated with the latest digital transformation insights,
              solutions, and innovations from Digital Qatalyst.
            </p>
          </div>

          {/* Insights */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Insights</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  to="/dtmi/insights"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Insights Hub
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
                  to="/marketplace/dtmi?contentType=research-reports"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Research Reports
                </Link>
              </li>
              <li>
                <Link
                  to="/dtmi/deep-analysis"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Deep Analysis
                </Link>
              </li>
            </ul>
          </div>

          {/* Signals */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Signals</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  to="/dtmi/signals"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Signals Hub
                </Link>
              </li>
              <li>
                <Link
                  to="/marketplace/dtmi?contentType=trend-alerts"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Trend Alerts
                </Link>
              </li>
              <li>
                <Link
                  to="/marketplace/dtmi?contentType=frontier-watch"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Frontier Watch
                </Link>
              </li>
              <li>
                <Link
                  to="/marketplace/dtmi?contentType=early-indicators"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Early Indicators
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
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
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
                  to="/marketplace/dtmi?contentType=podcasts"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Podcast
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

          {/* Connect */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect</h3>
            <ul className="space-y-3 text-sm">
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
                  <Twitter className="w-4 h-4" />X
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
                  <ExternalLink className="w-4 h-4" />
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
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-blue-700/30 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2024 Digital Qatalyst. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
