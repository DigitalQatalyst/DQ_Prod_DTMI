import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, ArrowRight, ChevronDown, ChevronUp, Linkedin, Instagram, BookOpen } from 'lucide-react';

const XIcon = ({ size = 16, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

interface FooterProps {
  'data-id'?: string;
  isLoggedIn?: boolean;
}

function AccordionSection({ title, children }: { title: string; children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-gray-600 last:border-b-0">
      <button onClick={() => setIsOpen(!isOpen)} className="w-full py-4 flex items-center justify-between text-left" aria-expanded={isOpen}>
        <h3 className="font-semibold text-base text-white">{title}</h3>
        {isOpen ? <ChevronUp size={20} className="text-gray-300" /> : <ChevronDown size={20} className="text-gray-300" />}
      </button>
      {isOpen && <div className="pb-4">{children}</div>}
    </div>
  );
}

export function Footer({ 'data-id': dataId }: FooterProps) {
  const validateEmail = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
  const [email, setEmail] = useState('');
  const [isValid, setIsValid] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    setEmail(v);
    setIsValid(v === '' ? true : validateEmail(v));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEmail(email)) { setIsValid(false); return; }
    try {
      const { submitNewsletterSubscription } = await import('../../services/airtableService');
      await submitNewsletterSubscription({ email, source: 'Footer', userAgent: navigator.userAgent });
      setIsSubmitted(true);
      setEmail('');
      setTimeout(() => setIsSubmitted(false), 3000);
    } catch {
      setIsValid(false);
    }
  };

  const emailFeedback = (
    <>
      {!isValid && <p className="mt-1 text-sm text-red-200">Please enter a valid email address</p>}
      {isSubmitted && <p className="mt-1 text-sm text-green-200">Thank you for subscribing!</p>}
    </>
  );

  return (
    <footer data-id={dataId} className="bg-secondary-900 text-white w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">

        {/* ── MOBILE ── */}
        <div className="block lg:hidden">
          <div className="mb-6">
            <img src="/logo/dq-logo-white.svg" alt="DigitalQatalyst" className="h-10 w-auto" />
            <p className="text-sm text-gray-300 mt-2">Perfecting Life Transactions</p>
          </div>

          <div className="mb-8">
            <p className="text-gray-300 text-sm mb-4 leading-relaxed">
              Stay updated with the latest digital transformation insights from DigitalQatalyst.
            </p>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <input type="email" value={email} onChange={handleChange} placeholder="Enter your email"
                  className={`w-full px-4 py-3 rounded-md text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 ${!isValid ? 'border-2 border-red-500' : 'border border-gray-300 focus:ring-primary'}`}
                  aria-label="Email for newsletter" aria-invalid={!isValid} />
                {emailFeedback}
              </div>
              <button type="submit" disabled={!email.trim()}
                className="w-full bg-primary text-white px-4 py-3 rounded-md hover:bg-primary/90 transition-colors font-medium">
                Subscribe
              </button>
            </form>
          </div>

          <div className="mb-8">
            <AccordionSection title="Company">
              <ul className="space-y-3">
                <li><Link to="/about-us" className="text-gray-300 hover:text-primary text-sm block">About DigitalQatalyst</Link></li>
                <li><Link to="/products" className="text-gray-300 hover:text-primary text-sm block">Products</Link></li>
                <li><Link to="/careers" className="text-gray-300 hover:text-primary text-sm block">Careers</Link></li>
                <li><Link to="/terms-of-service" className="text-gray-300 hover:text-primary text-sm block">Terms &amp; Conditions</Link></li>
                <li><Link to="/privacy-policy" className="text-gray-300 hover:text-primary text-sm block">Privacy Policy</Link></li>
              </ul>
            </AccordionSection>
            <AccordionSection title="Intelligence Layers">
              <ul className="space-y-3">
                <li><Link to="/signals" className="text-gray-300 hover:text-primary text-sm block">Signals</Link></li>
                <li><Link to="/insights" className="text-gray-300 hover:text-primary text-sm block">Insights</Link></li>
                <li><Link to="/research" className="text-gray-300 hover:text-primary text-sm block">Deep Analysis</Link></li>
                <li><Link to="/6xd" className="text-gray-300 hover:text-primary text-sm block">6xD Framework</Link></li>
                <li><Link to="/marketplace/dtmi" className="text-gray-300 hover:text-primary text-sm block">DTMI Marketplace</Link></li>
              </ul>
            </AccordionSection>
            <AccordionSection title="Content &amp; Research">
              <ul className="space-y-3">
                <li><Link to="/contributors" className="text-gray-300 hover:text-primary text-sm block">Contributors Marketplace</Link></li>
                <li><Link to="/research-panel" className="text-gray-300 hover:text-primary text-sm block">Research Panel</Link></li>
                <li><Link to="/marketplace/dtmi?contentType=articles" className="text-gray-300 hover:text-primary text-sm block">Articles</Link></li>
                <li><Link to="/marketplace/dtmi?contentType=expert-interviews" className="text-gray-300 hover:text-primary text-sm block">Expert Interviews</Link></li>
                <li><Link to="/marketplace/dtmi?contentType=podcasts" className="text-gray-300 hover:text-primary text-sm block">Podcast <span className="text-xs text-orange-400">(Coming Soon)</span></Link></li>
                <li><Link to="/marketplace/dtmi?contentType=research-reports" className="text-gray-300 hover:text-primary text-sm block">Research Reports</Link></li>
              </ul>
            </AccordionSection>
            <AccordionSection title="Services">
              <ul className="space-y-3">
                <li><Link to="/services" className="text-gray-300 hover:text-primary text-sm block">Primary Sector</Link></li>
                <li><Link to="/services" className="text-gray-300 hover:text-primary text-sm block">Secondary Sector</Link></li>
                <li><Link to="/services" className="text-gray-300 hover:text-primary text-sm block">Tertiary Sector</Link></li>
                <li><Link to="/services" className="text-gray-300 hover:text-primary text-sm block">Quaternary Sector</Link></li>
                <li><Link to="/services" className="text-gray-300 hover:text-primary text-sm block">Quinary Sector</Link></li>
              </ul>
            </AccordionSection>
            <AccordionSection title="Connect">
              <ul className="space-y-3">
                <li><a href="https://www.linkedin.com/company/digitalqatalyst" className="text-gray-300 hover:text-primary text-sm flex items-center gap-2" target="_blank" rel="noopener noreferrer"><Linkedin size={16} />LinkedIn</a></li>
                <li><a href="https://x.com/drstephane_" className="text-gray-300 hover:text-primary text-sm flex items-center gap-2" target="_blank" rel="noopener noreferrer"><XIcon size={16} />X</a></li>
                <li><a href="https://www.instagram.com/digitalqatalyst/" className="text-gray-300 hover:text-primary text-sm flex items-center gap-2" target="_blank" rel="noopener noreferrer"><Instagram size={16} />Instagram</a></li>
                <li><a href="https://medium.com/@admin_39247/about" className="text-gray-300 hover:text-primary text-sm flex items-center gap-2" target="_blank" rel="noopener noreferrer"><BookOpen size={16} />Medium (DQ DTMI)</a></li>
                <li><Link to="/consultation" className="text-gray-300 hover:text-primary text-sm flex items-center gap-2"><ExternalLink size={14} />Contact Us</Link></li>
              </ul>
            </AccordionSection>
          </div>

          <div className="border-t border-gray-600 pt-6 space-y-3 text-center">
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <Link to="/newsletter-signup" className="text-gray-300 hover:text-white transition-colors">Newsletter Signup</Link>
              <Link to="/request-demo" className="text-gray-300 hover:text-white transition-colors">Request Demo</Link>
              <Link to="/research-panel-application" className="bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded transition-colors text-white">Join Research Panel</Link>
            </div>
            <p className="text-gray-300 text-xs">© 2026 DigitalQatalyst. All rights reserved.</p>
            <p className="text-gray-400 text-xs">Dubai, UAE</p>
          </div>
        </div>

        {/* ── DESKTOP ── */}
        <div className="hidden lg:block">
          <div className="grid grid-cols-5 gap-10 mb-8">

            {/* Logo + Newsletter */}
            <div>
              <div className="mb-6">
                <img src="/logo/dq-logo-white.svg" alt="DigitalQatalyst" className="h-12 w-auto" />
                <p className="text-sm text-gray-300 mt-2">Perfecting Life Transactions</p>
              </div>
              <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                Stay updated with the latest digital transformation insights from DigitalQatalyst.
              </p>
              <form onSubmit={handleSubmit}>
                <div className="relative">
                  <input type="email" value={email} onChange={handleChange} placeholder="Enter your email"
                    className={`w-full px-4 py-3 pr-12 rounded-lg text-gray-900 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 ${!isValid ? 'border-2 border-red-500' : 'border border-gray-300 focus:ring-primary-500'}`}
                    aria-label="Email for newsletter" aria-invalid={!isValid} />
                  <button type="submit" disabled={!email.trim() || !isValid}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary-500 text-white p-2 rounded-md hover:bg-primary-600 transition-colors disabled:opacity-50">
                    <ArrowRight size={18} />
                  </button>
                </div>
                {emailFeedback}
              </form>
            </div>

            {/* Company */}
            <div>
              <h3 className="font-semibold text-lg mb-6">Company</h3>
              <ul className="space-y-4">
                <li><Link to="/about-us" className="text-gray-300 hover:text-primary text-sm">About DigitalQatalyst</Link></li>
                <li><Link to="/products" className="text-gray-300 hover:text-primary text-sm">Products</Link></li>
                <li><Link to="/careers" className="text-gray-300 hover:text-primary text-sm">Careers</Link></li>
                <li><Link to="/terms-of-service" className="text-gray-300 hover:text-primary text-sm">Terms &amp; Conditions</Link></li>
                <li><Link to="/privacy-policy" className="text-gray-300 hover:text-primary text-sm">Privacy Policy</Link></li>
              </ul>
            </div>

            {/* Intelligence Layers */}
            <div>
              <h3 className="font-semibold text-lg mb-6">Intelligence Layers</h3>
              <ul className="space-y-4">
                <li><Link to="/signals" className="text-gray-300 hover:text-primary text-sm">Signals</Link></li>
                <li><Link to="/insights" className="text-gray-300 hover:text-primary text-sm">Insights</Link></li>
                <li><Link to="/research" className="text-gray-300 hover:text-primary text-sm">Deep Analysis</Link></li>
                <li><Link to="/6xd" className="text-gray-300 hover:text-primary text-sm">6xD Framework</Link></li>
                <li><Link to="/marketplace/dtmi" className="text-gray-300 hover:text-primary text-sm">DTMI Marketplace</Link></li>
              </ul>
            </div>

            {/* Content & Research */}
            <div>
              <h3 className="font-semibold text-lg mb-6">Content &amp; Research</h3>
              <ul className="space-y-4">
                <li><Link to="/contributors" className="text-gray-300 hover:text-primary text-sm">Contributors Marketplace</Link></li>
                <li><Link to="/research-panel" className="text-gray-300 hover:text-primary text-sm">Research Panel</Link></li>
                <li><Link to="/marketplace/dtmi?contentType=articles" className="text-gray-300 hover:text-primary text-sm">Articles</Link></li>
                <li><Link to="/marketplace/dtmi?contentType=expert-interviews" className="text-gray-300 hover:text-primary text-sm">Expert Interviews</Link></li>
                <li><Link to="/marketplace/dtmi?contentType=podcasts" className="text-gray-300 hover:text-primary text-sm">Podcast <span className="text-xs text-orange-400">(Coming Soon)</span></Link></li>
                <li><Link to="/marketplace/dtmi?contentType=research-reports" className="text-gray-300 hover:text-primary text-sm">Research Reports</Link></li>
              </ul>
            </div>

            {/* Connect */}
            <div>
              <h3 className="font-semibold text-lg mb-6">Connect</h3>
              <ul className="space-y-4">
                <li><a href="https://www.linkedin.com/company/digitalqatalyst" className="text-gray-300 hover:text-primary text-sm flex items-center gap-2" target="_blank" rel="noopener noreferrer"><Linkedin size={16} />LinkedIn</a></li>
                <li><a href="https://x.com/drstephane_" className="text-gray-300 hover:text-primary text-sm flex items-center gap-2" target="_blank" rel="noopener noreferrer"><XIcon size={16} />X</a></li>
                <li><a href="https://www.instagram.com/digitalqatalyst/" className="text-gray-300 hover:text-primary text-sm flex items-center gap-2" target="_blank" rel="noopener noreferrer"><Instagram size={16} />Instagram</a></li>
                <li><a href="https://medium.com/@admin_39247/about" className="text-gray-300 hover:text-primary text-sm flex items-center gap-2" target="_blank" rel="noopener noreferrer"><BookOpen size={16} />Medium (DQ DTMI)</a></li>
                <li><Link to="/consultation" className="text-gray-300 hover:text-primary text-sm flex items-center gap-2"><ExternalLink size={14} />Contact Us</Link></li>
              </ul>
            </div>

          </div>

          {/* Bottom bar */}
          <div className="border-t border-gray-600 pt-6 flex items-center justify-between flex-wrap gap-4">
            <p className="text-gray-300 text-sm">© 2026 DigitalQatalyst. All rights reserved.</p>
            <div className="flex items-center gap-6 text-sm">
              <Link to="/newsletter-signup" className="text-gray-300 hover:text-white transition-colors">Newsletter Signup</Link>
              <Link to="/request-demo" className="text-gray-300 hover:text-white transition-colors">Request Demo</Link>
              <Link to="/research-panel-application" className="bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded transition-colors">Join Research Panel</Link>
            </div>
            <p className="text-gray-400 text-sm">Dubai, UAE</p>
          </div>
        </div>

      </div>
    </footer>
  );
}
