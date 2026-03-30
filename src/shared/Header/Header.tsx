/**
 * Header Component
 * Main navigation header for DTMI landing page
 */

import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ArrowRight, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleGetInTouch = () => {
    navigate("/consultation");
  };

  const navLinks = [
    { label: "Home", path: "/" },
    { label: "Signals", path: "/signals" },
    { label: "Insights", path: "/insights" },
    { label: "Research", path: "/research" },
    { label: "Books", path: "/books" },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 w-full bg-secondary shadow-md">
        <div className="container mx-auto px-4 md:px-6 py-3">
          <div className="flex items-center justify-between gap-6">
            {/* Logo */}
            <Link to="/" className="flex items-center px-4 py-2 rounded-md">
              <img
                src="/images/DQ Logo White.svg"
                alt="DigitalQatalyst"
                className="h-12"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                  const parent = e.currentTarget.parentElement;
                  if (parent) {
                    const span = document.createElement("span");
                    span.className =
                      "font-heading text-2xl font-bold text-white";
                    span.textContent = "DQ";
                    parent.appendChild(span);
                  }
                }}
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex flex-1 items-center justify-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-sm font-medium transition-colors ${
                    location.pathname === link.path
                      ? "text-white"
                      : "text-white/80 hover:text-primary"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-4">
              <Button
                onClick={handleGetInTouch}
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Get In Touch
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>

            {/* Mobile Menu */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon" className="text-white">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-75 bg-secondary text-white"
              >
                <div className="flex flex-col space-y-4 mt-8">
                  {navLinks.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`text-lg font-medium transition-colors px-4 py-2 rounded-lg ${
                        location.pathname === link.path
                          ? "bg-secondary-foreground/10 text-white"
                          : "text-white/80 hover:text-white hover:bg-secondary-foreground/5"
                      }`}
                    >
                      {link.label}
                    </Link>
                  ))}
                  <Button
                    onClick={() => {
                      handleGetInTouch();
                      setMobileMenuOpen(false);
                    }}
                    className="bg-primary text-primary-foreground hover:bg-primary/90 w-full mt-4"
                  >
                    Get In Touch
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* Spacer to offset fixed header */}
      <div className="h-18" aria-hidden="true" />
    </>
  );
}
