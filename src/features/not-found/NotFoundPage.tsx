import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Home, BookOpen, MessageSquare } from "lucide-react";
import { Header } from "@/shared/Header";
import { Footer } from "@/shared/Footer";
import NotFoundSVG from "./NotFoundSVG";

export default function NotFoundPage() {
  const helpfulLinks = [
    { label: "Home", href: "/", icon: Home },
    { label: "Browse Content", href: "/content", icon: BookOpen },
    { label: "Contact Support", href: "/support", icon: MessageSquare },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-linear-to-br from-background via-background to-secondary/5">
      <Header />
      <main className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-3xl">
          {/* Error Code Section */}
          <div className="flex justify-center mb-12">
            <div className="relative">
              <NotFoundSVG className="w-full max-w-sm mx-auto" />
            </div>
          </div>

          {/* Content Section */}
          <div className="text-center mb-12">
            <div className="inline-block mb-4 px-4 py-2 bg-destructive/10 rounded-full">
              <p className="text-sm font-semibold text-destructive">
                Error 404
              </p>
            </div>
            <h1 className="font-heading text-5xl md:text-6xl font-bold text-foreground mb-4">
              Page Not Found
            </h1>
            <p className="text-muted-foreground text-lg mb-2 max-w-lg mx-auto">
              We couldn't find the page you're looking for. It may have been
              moved or no longer exists.
            </p>
            <p className="text-sm text-muted-foreground max-w-lg mx-auto">
              Let us help you get back on track with one of the options below.
            </p>
          </div>

          {/* Primary Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Button
              asChild
              variant="outline"
              className="w-full sm:w-auto border-primary text-primary hover:bg-primary/10"
            >
              <Link to="..">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Go Back
              </Link>
            </Button>
            <Button
              asChild
              className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <Link to="/">
                <Home className="mr-2 h-4 w-4" />
                Back to Home
              </Link>
            </Button>
          </div>

          {/* Helpful Links Section */}
          <div className="bg-card border border-border rounded-lg p-8">
            <h2 className="text-lg font-semibold text-foreground mb-6 text-center">
              What would you like to do?
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {helpfulLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.href}
                    to={link.href}
                    className="flex flex-col items-center justify-center p-6 rounded-lg border border-border hover:border-primary hover:bg-primary/5 transition-all duration-200 group"
                  >
                    <Icon className="h-6 w-6 text-muted-foreground group-hover:text-primary mb-3 transition-colors" />
                    <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                      {link.label}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-12 text-center text-sm text-muted-foreground">
            <p>
              Still having trouble? Feel free to{" "}
              <Link
                to="/support"
                className="text-primary hover:underline font-medium"
              >
                contact our support team
              </Link>
              .
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
