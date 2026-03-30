/**
 * Footer Component
 * Main footer for DTMI landing page with responsive accordion on mobile
 */

import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ExternalLink,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  BookOpen,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const LinkedinIcon = ({ size = 16, className = "" }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const XIcon = ({
  size = 16,
  className = "",
}: {
  size?: number;
  className?: string;
}) => (
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

const InstagramIcon = ({
  size = 16,
  className = "",
}: {
  size?: number;
  className?: string;
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

interface AccordionSectionProps {
  title: string;
  children: React.ReactNode;
}

function AccordionSection({ title, children }: AccordionSectionProps) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-border/50 last:border-b-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-4 flex items-center justify-between text-left"
        aria-expanded={isOpen}
      >
        <h3 className="font-heading font-semibold text-base text-white">
          {title}
        </h3>
        {isOpen ? (
          <ChevronUp size={20} className="text-muted-foreground" />
        ) : (
          <ChevronDown size={20} className="text-muted-foreground" />
        )}
      </button>
      {isOpen && <div className="pb-4">{children}</div>}
    </div>
  );
}

export function Footer() {
  const validateEmail = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
  const [email, setEmail] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    setEmail(v);
    setIsValid(v === "" ? true : validateEmail(v));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setIsValid(false);
      return;
    }
    // TODO: Connect to Supabase for newsletter subscription
    setIsSubmitted(true);
    setEmail("");
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <footer className="bg-secondary text-white w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Mobile Layout */}
        <div className="block lg:hidden">
          <div className="mb-6">
            <img
              src="/images/DQ Logo White.svg"
              alt="DigitalQatalyst"
              className="h-10 w-auto"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
            <p className="font-sans text-sm text-muted-foreground mt-2">
              Perfecting Life Transactions
            </p>
          </div>

          <div className="mb-8">
            <p className="font-sans text-muted-foreground text-sm mb-4 leading-relaxed">
              Stay updated with the latest digital transformation insights from
              DigitalQatalyst.
            </p>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <Input
                  type="email"
                  value={email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className={`w-full ${!isValid ? "border-destructive" : ""}`}
                  aria-label="Email for newsletter"
                  aria-invalid={!isValid}
                />
                {!isValid && (
                  <p className="mt-1 text-sm text-destructive">
                    Please enter a valid email address
                  </p>
                )}
                {isSubmitted && (
                  <p className="mt-1 text-sm text-green-400">
                    Thank you for subscribing!
                  </p>
                )}
              </div>
              <Button
                type="submit"
                disabled={!email.trim()}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Subscribe
              </Button>
            </form>
          </div>

          <div className="mb-8">
            <AccordionSection title="Company">
              <ul className="space-y-3 font-sans">
                <li>
                  <Link
                    to="/about-us"
                    className="text-muted-foreground hover:text-primary text-sm block"
                  >
                    About DigitalQatalyst
                  </Link>
                </li>
                <li>
                  <Link
                    to="/products"
                    className="text-muted-foreground hover:text-primary text-sm block"
                  >
                    Products
                  </Link>
                </li>
                <li>
                  <Link
                    to="/careers"
                    className="text-muted-foreground hover:text-primary text-sm block"
                  >
                    Careers
                  </Link>
                </li>
                <li>
                  <Link
                    to="/terms-of-service"
                    className="text-muted-foreground hover:text-primary text-sm block"
                  >
                    Terms &amp; Conditions
                  </Link>
                </li>
                <li>
                  <Link
                    to="/privacy-policy"
                    className="text-muted-foreground hover:text-primary text-sm block"
                  >
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </AccordionSection>
            <AccordionSection title="Intelligence Layers">
              <ul className="space-y-3 font-sans">
                <li>
                  <Link
                    to="/signals"
                    className="text-muted-foreground hover:text-primary text-sm block"
                  >
                    Signals
                  </Link>
                </li>
                <li>
                  <Link
                    to="/insights"
                    className="text-muted-foreground hover:text-primary text-sm block"
                  >
                    Insights
                  </Link>
                </li>
                <li>
                  <Link
                    to="/research"
                    className="text-muted-foreground hover:text-primary text-sm block"
                  >
                    Deep Analysis
                  </Link>
                </li>
                <li>
                  <Link
                    to="/marketplace/dtmi"
                    className="text-muted-foreground hover:text-primary text-sm block"
                  >
                    DTMI Marketplace
                  </Link>
                </li>
              </ul>
            </AccordionSection>
            <AccordionSection title="Content & Research">
              <ul className="space-y-3 font-sans">
                <li>
                  <Link
                    to="/contributors"
                    className="text-muted-foreground hover:text-primary text-sm block"
                  >
                    Contributors Marketplace
                  </Link>
                </li>
                <li>
                  <Link
                    to="/research-panel"
                    className="text-muted-foreground hover:text-primary text-sm block"
                  >
                    Research Panel
                  </Link>
                </li>
                <li>
                  <Link
                    to="/marketplace/dtmi?contentType=articles"
                    className="text-muted-foreground hover:text-primary text-sm block"
                  >
                    Articles
                  </Link>
                </li>
                <li>
                  <Link
                    to="/marketplace/dtmi?contentType=expert-interviews"
                    className="text-muted-foreground hover:text-primary text-sm block"
                  >
                    Expert Interviews
                  </Link>
                </li>
              </ul>
            </AccordionSection>
            <AccordionSection title="Connect">
              <ul className="space-y-3 font-sans">
                <li>
                  <a
                    href="https://www.linkedin.com/company/digitalqatalyst"
                    className="text-muted-foreground hover:text-primary text-sm flex items-center gap-2"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <LinkedinIcon size={16} />
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a
                    href="https://x.com/drstephane_"
                    className="text-muted-foreground hover:text-primary text-sm flex items-center gap-2"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <XIcon size={16} />X
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.instagram.com/digitalqatalyst/"
                    className="text-muted-foreground hover:text-primary text-sm flex items-center gap-2"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <InstagramIcon size={16} />
                    Instagram
                  </a>
                </li>
                <li>
                  <a
                    href="https://medium.com/@admin_39247/about"
                    className="text-muted-foreground hover:text-primary text-sm flex items-center gap-2"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <BookOpen size={16} />
                    Medium
                  </a>
                </li>
                <li>
                  <Link
                    to="/consultation"
                    className="text-muted-foreground hover:text-primary text-sm flex items-center gap-2"
                  >
                    <ExternalLink size={14} />
                    Contact Us
                  </Link>
                </li>
              </ul>
            </AccordionSection>
          </div>

          <div className="border-t border-border/50 pt-6 space-y-3 text-center">
            <div className="flex flex-wrap justify-center gap-4 text-sm font-sans">
              <Link
                to="/newsletter-signup"
                className="text-muted-foreground hover:text-white transition-colors"
              >
                Newsletter Signup
              </Link>
              <Link
                to="/request-demo"
                className="text-muted-foreground hover:text-white transition-colors"
              >
                Request Demo
              </Link>
              <Link
                to="/research-panel-application"
                className="bg-primary hover:bg-primary/90 px-4 py-2 rounded transition-colors text-primary-foreground"
              >
                Join Research Panel
              </Link>
            </div>
            <p className="text-muted-foreground text-xs font-sans">
              © 2026 DigitalQatalyst. All rights reserved.
            </p>
            <p className="text-muted-foreground/70 text-xs font-sans">
              Dubai, UAE
            </p>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:block">
          <div className="grid grid-cols-5 gap-10 mb-8">
            {/* Logo + Newsletter */}
            <div>
              <div className="mb-6">
                <img
                  src="/images/DQ Logo White.svg"
                  alt="DigitalQatalyst"
                  className="h-12 w-auto"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
                <p className="font-sans text-sm text-muted-foreground mt-2">
                  Perfecting Life Transactions
                </p>
              </div>
              <p className="font-sans text-muted-foreground text-sm mb-4 leading-relaxed">
                Stay updated with the latest digital transformation insights.
              </p>
              <form onSubmit={handleSubmit}>
                <div className="relative">
                  <Input
                    type="email"
                    value={email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className={`w-full pr-12 ${
                      !isValid ? "border-destructive" : ""
                    }`}
                    aria-label="Email for newsletter"
                    aria-invalid={!isValid}
                  />
                  <button
                    type="submit"
                    disabled={!email.trim() || !isValid}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary text-primary-foreground p-2 rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50"
                  >
                    <ArrowRight size={18} />
                  </button>
                </div>
                {!isValid && (
                  <p className="mt-1 text-sm text-destructive">
                    Please enter a valid email address
                  </p>
                )}
                {isSubmitted && (
                  <p className="mt-1 text-sm text-green-400">
                    Thank you for subscribing!
                  </p>
                )}
              </form>
            </div>

            {/* Company */}
            <div>
              <h3 className="font-heading font-semibold text-lg mb-6">
                Company
              </h3>
              <ul className="space-y-4 font-sans">
                <li>
                  <Link
                    to="/about-us"
                    className="text-muted-foreground hover:text-primary text-sm"
                  >
                    About DigitalQatalyst
                  </Link>
                </li>
                <li>
                  <Link
                    to="/products"
                    className="text-muted-foreground hover:text-primary text-sm"
                  >
                    Products
                  </Link>
                </li>
                <li>
                  <Link
                    to="/careers"
                    className="text-muted-foreground hover:text-primary text-sm"
                  >
                    Careers
                  </Link>
                </li>
                <li>
                  <Link
                    to="/terms-of-service"
                    className="text-muted-foreground hover:text-primary text-sm"
                  >
                    Terms &amp; Conditions
                  </Link>
                </li>
                <li>
                  <Link
                    to="/privacy-policy"
                    className="text-muted-foreground hover:text-primary text-sm"
                  >
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>

            {/* Intelligence Layers */}
            <div>
              <h3 className="font-heading font-semibold text-lg mb-6">
                Intelligence Layers
              </h3>
              <ul className="space-y-4 font-sans">
                <li>
                  <Link
                    to="/signals"
                    className="text-muted-foreground hover:text-primary text-sm"
                  >
                    Signals
                  </Link>
                </li>
                <li>
                  <Link
                    to="/insights"
                    className="text-muted-foreground hover:text-primary text-sm"
                  >
                    Insights
                  </Link>
                </li>
                <li>
                  <Link
                    to="/research"
                    className="text-muted-foreground hover:text-primary text-sm"
                  >
                    Deep Analysis
                  </Link>
                </li>
                <li>
                  <Link
                    to="/marketplace/dtmi"
                    className="text-muted-foreground hover:text-primary text-sm"
                  >
                    DTMI Marketplace
                  </Link>
                </li>
              </ul>
            </div>

            {/* Content & Research */}
            <div>
              <h3 className="font-heading font-semibold text-lg mb-6">
                Content &amp; Research
              </h3>
              <ul className="space-y-4 font-sans">
                <li>
                  <Link
                    to="/contributors"
                    className="text-muted-foreground hover:text-primary text-sm"
                  >
                    Contributors Marketplace
                  </Link>
                </li>
                <li>
                  <Link
                    to="/research-panel"
                    className="text-muted-foreground hover:text-primary text-sm"
                  >
                    Research Panel
                  </Link>
                </li>
                <li>
                  <Link
                    to="/marketplace/dtmi?contentType=articles"
                    className="text-muted-foreground hover:text-primary text-sm"
                  >
                    Articles
                  </Link>
                </li>
                <li>
                  <Link
                    to="/marketplace/dtmi?contentType=expert-interviews"
                    className="text-muted-foreground hover:text-primary text-sm"
                  >
                    Expert Interviews
                  </Link>
                </li>
              </ul>
            </div>

            {/* Connect */}
            <div>
              <h3 className="font-heading font-semibold text-lg mb-6">
                Connect
              </h3>
              <ul className="space-y-4 font-sans">
                <li>
                  <a
                    href="https://www.linkedin.com/company/digitalqatalyst"
                    className="text-muted-foreground hover:text-primary text-sm flex items-center gap-2"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <LinkedinIcon size={16} />
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a
                    href="https://x.com/drstephane_"
                    className="text-muted-foreground hover:text-primary text-sm flex items-center gap-2"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <XIcon size={16} />X
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.instagram.com/digitalqatalyst/"
                    className="text-muted-foreground hover:text-primary text-sm flex items-center gap-2"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <InstagramIcon size={16} />
                    Instagram
                  </a>
                </li>
                <li>
                  <a
                    href="https://medium.com/@admin_39247/about"
                    className="text-muted-foreground hover:text-primary text-sm flex items-center gap-2"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <BookOpen size={16} />
                    Medium
                  </a>
                </li>
                <li>
                  <Link
                    to="/consultation"
                    className="text-muted-foreground hover:text-primary text-sm flex items-center gap-2"
                  >
                    <ExternalLink size={14} />
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-border/50 pt-6 flex items-center justify-between flex-wrap gap-4">
            <p className="font-sans text-muted-foreground text-sm">
              © 2026 DigitalQatalyst. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm font-sans">
              <Link
                to="/newsletter-signup"
                className="text-muted-foreground hover:text-white transition-colors"
              >
                Newsletter Signup
              </Link>
              <Link
                to="/request-demo"
                className="text-muted-foreground hover:text-white transition-colors"
              >
                Request Demo
              </Link>
              <Link
                to="/research-panel-application"
                className="bg-primary hover:bg-primary/90 px-4 py-2 rounded transition-colors text-primary-foreground"
              >
                Join Research Panel
              </Link>
            </div>
            <p className="font-sans text-muted-foreground/70 text-sm">
              Dubai, UAE
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
