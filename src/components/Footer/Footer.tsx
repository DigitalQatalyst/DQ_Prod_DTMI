import React, { useState } from 'react';
import { ExternalLink, ChevronDown, ChevronUp, Linkedin, Instagram, BookOpen } from 'lucide-react';

// Custom X (Twitter) icon component
const XIcon = ({ size = 16, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);
interface FooterProps {
  'data-id'?: string;
}
interface AccordionSectionProps {
  title: string;
  children: React.ReactNode;
}
function AccordionSection({
  title,
  children
}: AccordionSectionProps) {
  const [isOpen, setIsOpen] = useState(false);
  return <div className="border-b border-gray-600 last:border-b-0">
    <button onClick={() => setIsOpen(!isOpen)} className="w-full py-4 flex items-center justify-between text-left" aria-expanded={isOpen}>
      <h3 className="font-semibold text-base text-white">{title}</h3>
      {isOpen ? <ChevronUp size={20} className="text-gray-300" /> : <ChevronDown size={20} className="text-gray-300" />}
    </button>
    {isOpen && <div className="pb-4">{children}</div>}
  </div>;
}
export function Footer({
  'data-id': dataId
}: FooterProps) {

  // Full DQ Footer
  return <footer data-id={dataId} className="bg-secondary-900 text-white w-full">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      {/* Mobile Layout */}
      <div className="block lg:hidden">
        {/* Logo */}
        <div className="mb-6">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center mr-3">
              <span className="text-secondary-900 font-bold text-lg">DQ</span>
            </div>
            <span className="text-xl font-bold">Digital Qatalyst</span>
          </div>
          <p className="text-sm text-gray-300 mt-2">Perfecting Life Transactions</p>
        </div>
        {/* Newsletter - Mobile Full Width */}
        <div className="mb-8">
          <p className="text-gray-300 text-sm mb-4 leading-relaxed">
            Stay updated with the latest digital transformation insights, solutions, and
            innovations from Digital Qatalyst.
          </p>
        </div>
        {/* Accordion Sections */}
        <div className="mb-8">
          <AccordionSection title="Intelligence Layers">
            <ul className="space-y-3">
              <li>
                <a href="/signals" className="text-gray-300 hover:text-white transition-colors text-sm block">
                  Signals
                </a>
              </li>
              <li>
                <a href="/insights" className="text-gray-300 hover:text-white transition-colors text-sm block">
                  Insights
                </a>
              </li>
              <li>
                <a href="/research" className="text-gray-300 hover:text-white transition-colors text-sm block">
                  Deep Analysis
                </a>
              </li>
              <li>
                <a href="/dtmi/6xd" className="text-gray-300 hover:text-white transition-colors text-sm block">
                  6xD Framework
                </a>
              </li>
              <li>
                <a href="/marketplace/dtmi" className="text-gray-300 hover:text-white transition-colors text-sm block">
                  DTMI Marketplace
                </a>
              </li>
            </ul>
          </AccordionSection>
          <AccordionSection title="Content & Research">
            <ul className="space-y-3">
              <li>
                <a href="/dtmi/contributors" className="text-gray-300 hover:text-white transition-colors text-sm block">
                  Contributors Marketplace
                </a>
              </li>
              <li>
                <a href="/dtmi/research-panel" className="text-gray-300 hover:text-white transition-colors text-sm block">
                  Research Panel
                </a>
              </li>
              <li>
                <a href="/marketplace/dtmi?contentType=articles" className="text-gray-300 hover:text-white transition-colors text-sm block">
                  Articles
                </a>
              </li>
              <li>
                <a href="/marketplace/dtmi?contentType=expert-interviews" className="text-gray-300 hover:text-white transition-colors text-sm block">
                  Expert Interviews
                </a>
              </li>
              <li>
                <a href="/marketplace/dtmi?contentType=podcasts" className="text-gray-300 hover:text-white transition-colors text-sm block">
                  Podcast <span className="text-xs text-orange-400">(Coming Soon)</span>
                </a>
              </li>
              <li>
                <a href="/marketplace/dtmi?contentType=research-reports" className="text-gray-300 hover:text-white transition-colors text-sm block">
                  Research Reports
                </a>
              </li>
            </ul>
          </AccordionSection>
          <AccordionSection title="Connect">
            <ul className="space-y-3">
              <li>
                <a href="https://www.linkedin.com/company/digitalqatalyst" className="text-gray-300 hover:text-white transition-colors text-sm flex items-center gap-2" target="_blank" rel="noopener noreferrer">
                  <Linkedin size={16} />
                  LinkedIn
                </a>
              </li>
              <li>
                <a href="https://x.com/drstephane_" className="text-gray-300 hover:text-white transition-colors text-sm flex items-center gap-2" target="_blank" rel="noopener noreferrer">
                  <XIcon size={16} />
                  X (Twitter)
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com/digitalqatalyst/" className="text-gray-300 hover:text-white transition-colors text-sm flex items-center gap-2" target="_blank" rel="noopener noreferrer">
                  <Instagram size={16} />
                  Instagram
                </a>
              </li>
              <li>
                <a href="https://medium.com/@admin_39247/about" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors text-sm flex items-center gap-2">
                  <BookOpen size={16} />
                  Medium (DQ DTMI)
                </a>
              </li>
              <li>
                <a href="/consultation" className="text-gray-300 hover:text-white transition-colors text-sm flex items-center gap-2">
                  <ExternalLink size={14} />
                  Contact Us
                </a>
              </li>
            </ul>
          </AccordionSection>
          <AccordionSection title="Company">
            <ul className="space-y-3">
              <li>
                <a href="/about-us" className="text-gray-300 hover:text-white transition-colors text-sm block">
                  About Digital Qatalyst
                </a>
              </li>
              <li>
                <a href="/careers" className="text-gray-300 hover:text-white transition-colors text-sm block">
                  Careers
                </a>
              </li>
              <li>
                <a href="/privacy-policy" className="text-gray-300 hover:text-white transition-colors text-sm block">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/terms-of-service" className="text-gray-300 hover:text-white transition-colors text-sm block">
                  Terms & Conditions
                </a>
              </li>
            </ul>
          </AccordionSection>
        </div>
        {/* Copyright - Mobile */}
        <div className="border-t border-blue-800 pt-6 text-center">
          <p className="text-gray-400 text-xs">
            © 2024 Digital Qatalyst. All rights reserved.
          </p>
        </div>
      </div>
      {/* Desktop Layout */}
      <div className="hidden lg:block">
        {/* Main Footer Content */}
        <div className="grid grid-cols-4 gap-12 mb-8">
          {/* Brand Section */}
          <div>
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center mr-3">
                <span className="text-secondary-900 font-bold text-lg">DQ</span>
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

          {/* Intelligence Layers */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Intelligence Layers</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="/signals" className="text-gray-300 hover:text-white transition-colors">
                  Signals
                </a>
              </li>
              <li>
                <a href="/insights" className="text-gray-300 hover:text-white transition-colors">
                  Insights
                </a>
              </li>
              <li>
                <a href="/research" className="text-gray-300 hover:text-white transition-colors">
                  Deep Analysis
                </a>
              </li>
              <li>
                <a href="/dtmi/6xd" className="text-gray-300 hover:text-white transition-colors">
                  6xD Framework
                </a>
              </li>
              <li>
                <a href="/marketplace/dtmi" className="text-gray-300 hover:text-white transition-colors">
                  DTMI Marketplace
                </a>
              </li>
            </ul>
          </div>

          {/* Content & Research */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Content & Research</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="/dtmi/contributors" className="text-gray-300 hover:text-white transition-colors">
                  Contributors Marketplace
                </a>
              </li>
              <li>
                <a href="/dtmi/research-panel" className="text-gray-300 hover:text-white transition-colors">
                  Research Panel
                </a>
              </li>
              <li>
                <a href="/marketplace/dtmi?contentType=articles" className="text-gray-300 hover:text-white transition-colors">
                  Articles
                </a>
              </li>
              <li>
                <a href="/marketplace/dtmi?contentType=expert-interviews" className="text-gray-300 hover:text-white transition-colors">
                  Expert Interviews
                </a>
              </li>
              <li>
                <a href="/marketplace/dtmi?contentType=podcasts" className="text-gray-300 hover:text-white transition-colors">
                  Podcast{" "}
                  <span className="text-xs text-orange-400">(Coming Soon)</span>
                </a>
              </li>
              <li>
                <a href="/marketplace/dtmi?contentType=research-reports" className="text-gray-300 hover:text-white transition-colors">
                  Research Reports
                </a>
              </li>
            </ul>
          </div>

          {/* Connect & Company */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect</h3>
            <ul className="space-y-3 text-sm mb-6">
              <li>
                <a href="https://www.linkedin.com/company/digitalqatalyst" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors flex items-center gap-2">
                  <Linkedin className="w-4 h-4" />
                  LinkedIn
                </a>
              </li>
              <li>
                <a href="https://x.com/drstephane_" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors flex items-center gap-2">
                  <XIcon size={16} />
                  X (Twitter)
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com/digitalqatalyst/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors flex items-center gap-2">
                  <Instagram className="w-4 h-4" />
                  Instagram
                </a>
              </li>
              <li>
                <a href="https://medium.com/@admin_39247/about" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  Medium (DQ DTMI)
                </a>
              </li>
              <li>
                <a href="/consultation" className="text-gray-300 hover:text-white transition-colors flex items-center gap-2">
                  <ExternalLink className="w-4 h-4" />
                  Contact Us
                </a>
              </li>
            </ul>

            <h4 className="text-md font-semibold mb-3">Company</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/about-us" className="text-gray-300 hover:text-white transition-colors">
                  About Digital Qatalyst
                </a>
              </li>
              <li>
                <a href="/careers" className="text-gray-300 hover:text-white transition-colors">
                  Careers
                </a>
              </li>
              <li>
                <a href="/privacy-policy" className="text-gray-300 hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/terms-of-service" className="text-gray-300 hover:text-white transition-colors">
                  Terms & Conditions
                </a>
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
    </div>
  </footer>;
}