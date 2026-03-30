/**
 * Hero Section Component
 * Full-screen hero section for DTMI landing page with animations
 */

import { useNavigate } from "react-router-dom";
import { ArrowRight, ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Use setTimeout to avoid synchronous state update in effect
    const timer = setTimeout(() => setIsLoaded(true), 0);
    return () => clearTimeout(timer);
  }, []);

  const handleExploreInsights = () => {
    navigate("/marketplace");
  };

  const handleScrollDown = () => {
    const nextSection = document.querySelector("main > section:nth-child(2)");
    nextSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      className="relative w-full bg-gradient-to-r from-[#0A1628] via-[#1a2942] to-[#0f1f3d] overflow-hidden"
      style={{ height: "100vh" }}
    >
      {/* Animated background image with zoom effect */}
      <div
        className="absolute inset-0 transition-transform duration-[3000ms] ease-out"
        style={{
          backgroundImage:
            "linear-gradient(rgba(10, 22, 40, 0.65), rgba(10, 22, 40, 0.65)), url('https://images.unsplash.com/photo-1521737711867-e3b97375f902?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          transform: isLoaded ? "scale(1)" : "scale(1.1)",
        }}
      />

      {/* Animated gradient overlay */}
      <div
        className="absolute inset-0 bg-linear-to-r from-primary/20 to-blue-500/20 mix-blend-multiply"
        style={{
          animation: "pulse-gradient 8s ease-in-out infinite alternate",
        }}
      />

      {/* Animated Neural Network Lines */}
      <div className="absolute inset-0 opacity-20">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient
              id="lineGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop
                offset="0%"
                stopColor="hsl(var(--primary))"
                stopOpacity="0.6"
              />
              <stop offset="100%" stopColor="#4F9CF9" stopOpacity="0.6" />
            </linearGradient>
          </defs>
          <g className="animate-pulse">
            <line
              x1="10%"
              y1="20%"
              x2="30%"
              y2="40%"
              stroke="url(#lineGradient)"
              strokeWidth="1"
            />
            <line
              x1="30%"
              y1="40%"
              x2="50%"
              y2="30%"
              stroke="url(#lineGradient)"
              strokeWidth="1"
            />
            <line
              x1="50%"
              y1="30%"
              x2="70%"
              y2="50%"
              stroke="url(#lineGradient)"
              strokeWidth="1"
            />
            <line
              x1="70%"
              y1="50%"
              x2="90%"
              y2="35%"
              stroke="url(#lineGradient)"
              strokeWidth="1"
            />
          </g>
          <circle
            cx="10%"
            cy="20%"
            r="4"
            fill="hsl(var(--primary))"
            opacity="0.8"
          >
            <animate
              attributeName="opacity"
              values="0.8;1;0.8"
              dur="3s"
              repeatCount="indefinite"
            />
          </circle>
          <circle cx="50%" cy="30%" r="4" fill="#4F9CF9" opacity="0.8">
            <animate
              attributeName="opacity"
              values="0.8;1;0.8"
              dur="3.5s"
              repeatCount="indefinite"
            />
          </circle>
          <circle
            cx="90%"
            cy="35%"
            r="4"
            fill="hsl(var(--primary))"
            opacity="0.8"
          >
            <animate
              attributeName="opacity"
              values="0.8;1;0.8"
              dur="4s"
              repeatCount="indefinite"
            />
          </circle>
        </svg>
      </div>

      {/* Content Container */}
      <div className="container mx-auto px-4 h-full flex flex-col justify-center items-center relative z-10">
        <div className="text-center max-w-4xl mx-auto mb-8">
          {/* Badge */}
          <div
            className="inline-block px-4 py-2 text-sm font-medium bg-white/10 backdrop-blur-sm text-white rounded-full mb-6 border border-white/20"
            style={{
              opacity: isLoaded ? 1 : 0,
              transform: isLoaded ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
            }}
          >
            Digital Transformation Management Insights
          </div>

          {/* Main Heading */}
          <h1
            className="font-heading text-4xl md:text-5xl font-bold text-white mb-6 leading-tight text-center"
            style={{
              opacity: isLoaded ? 1 : 0,
              transform: isLoaded ? "translateY(0)" : "translateY(20px)",
              transition:
                "opacity 0.8s ease-out 0.2s, transform 0.8s ease-out 0.2s",
            }}
          >
            Signals, Insights, and Analysis to navigate Economy 4.0
          </h1>

          {/* Subheading */}
          <p
            className="font-sans text-lg md:text-xl text-white/90 mb-10 leading-relaxed"
            style={{
              opacity: isLoaded ? 1 : 0,
              transform: isLoaded ? "translateY(0)" : "translateY(20px)",
              transition:
                "opacity 1s ease-out 0.4s, transform 1s ease-out 0.4s",
            }}
          >
            Gain knowledge and strategies needed to stay ahead in a rapidly
            evolving digital landscape, driving innovation, efficiency, and
            competitive advantage.
          </p>
        </div>

        {/* CTA Button */}
        <div
          style={{
            opacity: isLoaded ? 1 : 0,
            transform: isLoaded ? "translateY(0)" : "translateY(20px)",
            transition:
              "opacity 1.2s ease-out 0.6s, transform 1.2s ease-out 0.6s",
          }}
        >
          <Button
            onClick={handleExploreInsights}
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl group"
          >
            <span className="relative z-10">Explore Insights</span>
            <ArrowRight className="ml-2 h-5 w-5 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
          </Button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer"
        onClick={handleScrollDown}
      >
        <ChevronDown className="h-6 w-6 text-white" />
        <span className="sr-only">Scroll down</span>
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes pulse-gradient {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.6; }
        }
      `}</style>
    </section>
  );
}
