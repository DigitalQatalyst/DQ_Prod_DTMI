import { Header } from "../../shared/Header/Header";
import { useNavigate } from "react-router-dom";
import { ContributorAdvertCards } from "../landing/components/ContributorAdvertCards";
import { NewsletterSignupForm } from "../landing/components/NewsletterSignupForm";
import { Footer } from "../../shared/Footer/Footer";
import ModernDQChatbot from "../../shared/ModernDQChatbot";
import { LeadCaptureModal } from "../../shared/LeadCaptureModal";
import { useState } from "react";

const ResearchLandingPage = () => {
  const navigate = useNavigate();
  const [modalState, setModalState] = useState({
    isOpen: false,
    contentTitle: "",
    contentType: "report" as "report" | "analysis",
  });

  const handleDownloadClick = (title: string, type: "report" | "analysis") => {
    setModalState({
      isOpen: true,
      contentTitle: title,
      contentType: type,
    });
  };

  const handleModalClose = () => {
    setModalState({
      isOpen: false,
      contentTitle: "",
      contentType: "report",
    });
  };

  const handleFormSubmit = async (data: {
    name: string;
    email: string;
    company: string;
  }) => {
    // Here you would typically send the data to your backend
    console.log("Lead capture data:", data);
    console.log("Content requested:", modalState.contentTitle);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // After successful submission, you could:
    // 1. Redirect to a download page
    // 2. Show a success message
    // 3. Automatically download the file
    alert(`Thank you ${data.name}! Your download will begin shortly.`);
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-white">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-brand-navy via-brand-navy to-blue-900 text-white py-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Digital Transformation Research
              </h1>
              <p className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed">
                Comprehensive research reports and strategic deep analysis that
                inform critical digital transformation decisions and strategies
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() =>
                    navigate("/marketplace/dtmi?tab=deep-analysis")
                  }
                  className="bg-primary-500 hover:bg-primary-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 shadow-lg"
                >
                  Explore Research Reports
                </button>
                <button
                  onClick={() => navigate("/research-updates-signup")}
                  className="border-2 border-white text-white hover:bg-white hover:text-brand-navy px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200"
                >
                  Subscribe to Updates
                </button>
              </div>

              {/* Additional CTA for Research Panel */}
              <div className="mt-6 text-center">
                <button
                  onClick={() => navigate("/dtmi/research-panel")}
                  className="text-blue-100 hover:text-white underline font-medium transition-colors"
                >
                  Or join our Research Panel →
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Research Reports Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex items-center justify-between mb-12">
              <div>
                <div className="flex items-center mb-4">
                  <div className="w-4 h-4 bg-purple-600 rounded-full mr-3"></div>
                  <span className="text-sm font-bold text-purple-600 uppercase tracking-wider">
                    Research Reports
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Comprehensive Analysis
                </h2>
              </div>
              <button
                onClick={() =>
                  navigate("/marketplace/dtmi?tab=deep-analysis&filter=reports")
                }
                className="hidden md:flex items-center text-primary-600 hover:text-primary-700 font-semibold"
              >
                View All Reports
                <svg
                  className="w-4 h-4 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>

            {/* Horizontal scrolling cards */}
            <div className="flex gap-6 overflow-x-auto pb-4">
              <div className="flex-shrink-0 w-80 bg-gradient-to-br from-purple-50 to-indigo-50 border border-purple-200 rounded-xl p-6 relative overflow-hidden">
                {/* Research report visual placeholder */}
                <div className="absolute top-4 right-4 opacity-10">
                  <svg width="50" height="40" viewBox="0 0 50 40" fill="none">
                    <rect
                      x="10"
                      y="5"
                      width="30"
                      height="30"
                      rx="2"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1"
                    />
                    <rect
                      x="15"
                      y="10"
                      width="20"
                      height="2"
                      fill="currentColor"
                    />
                    <rect
                      x="15"
                      y="15"
                      width="15"
                      height="1"
                      fill="currentColor"
                    />
                    <rect
                      x="15"
                      y="18"
                      width="18"
                      height="1"
                      fill="currentColor"
                    />
                    <rect
                      x="15"
                      y="21"
                      width="12"
                      height="1"
                      fill="currentColor"
                    />
                    <circle
                      cx="20"
                      cy="27"
                      r="3"
                      fill="currentColor"
                      opacity="0.3"
                    />
                    <rect
                      x="26"
                      y="25"
                      width="8"
                      height="4"
                      fill="currentColor"
                      opacity="0.3"
                    />
                  </svg>
                </div>
                <div className="flex items-center justify-between mb-4">
                  <span className="bg-purple-100 text-purple-700 text-xs font-bold px-3 py-1 rounded-full">
                    COMPREHENSIVE
                  </span>
                  <span className="text-sm text-gray-500">2 weeks ago</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  The State of Digital Transformation 2024
                </h3>
                <p className="text-gray-600 mb-4 text-sm">
                  Comprehensive analysis of digital transformation trends across
                  industries, featuring data from 500+ enterprises and strategic
                  recommendations for leaders navigating the digital landscape.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">45 pages</span>
                  <button
                    onClick={() =>
                      handleDownloadClick(
                        "The State of Digital Transformation 2024",
                        "report",
                      )
                    }
                    className="text-purple-600 hover:text-purple-700 text-sm font-semibold"
                  >
                    Download Report →
                  </button>
                </div>
              </div>

              <div className="flex-shrink-0 w-80 bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200 rounded-xl p-6 relative overflow-hidden">
                {/* AI analysis visual placeholder */}
                <div className="absolute top-4 right-4 opacity-10">
                  <svg width="50" height="40" viewBox="0 0 50 40" fill="none">
                    <circle
                      cx="15"
                      cy="15"
                      r="8"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1"
                    />
                    <circle
                      cx="35"
                      cy="25"
                      r="6"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1"
                    />
                    <circle
                      cx="25"
                      cy="8"
                      r="4"
                      fill="currentColor"
                      opacity="0.5"
                    />
                    <circle
                      cx="8"
                      cy="28"
                      r="3"
                      fill="currentColor"
                      opacity="0.5"
                    />
                    <circle
                      cx="42"
                      cy="12"
                      r="3"
                      fill="currentColor"
                      opacity="0.5"
                    />
                    <path
                      d="M15 7 L25 8"
                      stroke="currentColor"
                      strokeWidth="1"
                      strokeDasharray="1,1"
                    />
                    <path
                      d="M23 15 L29 25"
                      stroke="currentColor"
                      strokeWidth="1"
                      strokeDasharray="1,1"
                    />
                    <path
                      d="M11 25 L29 25"
                      stroke="currentColor"
                      strokeWidth="1"
                      strokeDasharray="1,1"
                    />
                  </svg>
                </div>
                <div className="flex items-center justify-between mb-4">
                  <span className="bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full">
                    SECTOR STUDY
                  </span>
                  <span className="text-sm text-gray-500">1 month ago</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  AI Adoption Patterns in Financial Services
                </h3>
                <p className="text-gray-600 mb-4 text-sm">
                  In-depth study of artificial intelligence implementation
                  strategies, ROI metrics, and success factors across major
                  financial institutions and emerging fintech companies.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">32 pages</span>
                  <button
                    onClick={() =>
                      handleDownloadClick(
                        "AI Adoption Patterns in Financial Services",
                        "report",
                      )
                    }
                    className="text-blue-600 hover:text-blue-700 text-sm font-semibold"
                  >
                    Download Report →
                  </button>
                </div>
              </div>

              <div className="flex-shrink-0 w-80 bg-gradient-to-br from-teal-50 to-green-50 border border-teal-200 rounded-xl p-6 relative overflow-hidden">
                {/* Cloud infrastructure visual placeholder */}
                <div className="absolute top-4 right-4 opacity-10">
                  <svg width="50" height="40" viewBox="0 0 50 40" fill="none">
                    <path
                      d="M10 20 C8 20 6 18 8 16 C8 14 10 12 13 12 C16 12 18 14 18 16 C20 18 19 20 17 20 Z"
                      fill="currentColor"
                      opacity="0.3"
                    />
                    <path
                      d="M25 25 C23 25 21 23 23 21 C23 19 25 17 28 17 C31 17 33 19 33 21 C35 23 34 25 32 25 Z"
                      fill="currentColor"
                      opacity="0.5"
                    />
                    <path
                      d="M35 15 C33 15 31 13 33 11 C33 9 35 7 38 7 C41 7 43 9 43 11 C45 13 44 15 42 15 Z"
                      fill="currentColor"
                      opacity="0.7"
                    />
                    <rect
                      x="5"
                      y="30"
                      width="8"
                      height="5"
                      rx="1"
                      fill="currentColor"
                      opacity="0.4"
                    />
                    <rect
                      x="18"
                      y="32"
                      width="6"
                      height="3"
                      rx="1"
                      fill="currentColor"
                      opacity="0.4"
                    />
                    <rect
                      x="30"
                      y="31"
                      width="10"
                      height="4"
                      rx="1"
                      fill="currentColor"
                      opacity="0.4"
                    />
                  </svg>
                </div>
                <div className="flex items-center justify-between mb-4">
                  <span className="bg-teal-100 text-teal-700 text-xs font-bold px-3 py-1 rounded-full">
                    MARKET INTEL
                  </span>
                  <span className="text-sm text-gray-500">3 weeks ago</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Cloud Infrastructure Investment Trends
                </h3>
                <p className="text-gray-600 mb-4 text-sm">
                  Strategic analysis of cloud infrastructure spending patterns,
                  emerging technologies, and investment priorities for 2024-2025
                  across enterprise segments.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">28 pages</span>
                  <button
                    onClick={() =>
                      handleDownloadClick(
                        "Cloud Infrastructure Investment Trends",
                        "report",
                      )
                    }
                    className="text-teal-600 hover:text-teal-700 text-sm font-semibold"
                  >
                    Download Report →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Deep Analysis Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex items-center justify-between mb-12">
              <div>
                <div className="flex items-center mb-4">
                  <div className="w-4 h-4 bg-indigo-600 rounded-full mr-3"></div>
                  <span className="text-sm font-bold text-indigo-600 uppercase tracking-wider">
                    Deep Analysis
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Strategic Intelligence
                </h2>
              </div>
              <button
                onClick={() =>
                  navigate(
                    "/marketplace/dtmi?tab=deep-analysis&filter=analysis",
                  )
                }
                className="hidden md:flex items-center text-primary-600 hover:text-primary-700 font-semibold"
              >
                Explore All Deep Analysis
                <svg
                  className="w-4 h-4 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>

            {/* Grid layout with featured card */}
            <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {/* Featured large card */}
              <div className="lg:col-span-2 bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="h-48 bg-gradient-to-r from-indigo-600 to-purple-600 relative">
                  <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                  {/* Digital maturity visual placeholder */}
                  <div className="absolute inset-0 opacity-10">
                    <svg
                      className="w-full h-full"
                      viewBox="0 0 400 200"
                      fill="none"
                    >
                      <circle
                        cx="100"
                        cy="100"
                        r="60"
                        fill="none"
                        stroke="white"
                        strokeWidth="3"
                      />
                      <circle
                        cx="100"
                        cy="100"
                        r="40"
                        fill="none"
                        stroke="white"
                        strokeWidth="2"
                      />
                      <circle
                        cx="100"
                        cy="100"
                        r="20"
                        fill="none"
                        stroke="white"
                        strokeWidth="1"
                      />
                      <path
                        d="M100 40 L120 60 L100 80 L80 60 Z"
                        fill="white"
                        opacity="0.7"
                      />
                      <path
                        d="M160 100 L140 120 L120 100 L140 80 Z"
                        fill="white"
                        opacity="0.5"
                      />
                      <path
                        d="M100 160 L80 140 L100 120 L120 140 Z"
                        fill="white"
                        opacity="0.6"
                      />
                      <path
                        d="M40 100 L60 80 L80 100 L60 120 Z"
                        fill="white"
                        opacity="0.4"
                      />
                      <line
                        x1="200"
                        y1="50"
                        x2="350"
                        y2="50"
                        stroke="white"
                        strokeWidth="2"
                      />
                      <line
                        x1="200"
                        y1="80"
                        x2="320"
                        y2="80"
                        stroke="white"
                        strokeWidth="2"
                      />
                      <line
                        x1="200"
                        y1="110"
                        x2="340"
                        y2="110"
                        stroke="white"
                        strokeWidth="2"
                      />
                      <line
                        x1="200"
                        y1="140"
                        x2="300"
                        y2="140"
                        stroke="white"
                        strokeWidth="2"
                      />
                    </svg>
                  </div>
                  <div className="absolute bottom-4 left-6 text-white">
                    <span className="bg-white bg-opacity-20 text-xs font-bold px-3 py-1 rounded-full mb-2 inline-block">
                      MATURITY MODEL
                    </span>
                    <h3 className="text-2xl font-bold mb-2">
                      Digital Maturity Assessment Framework 2024
                    </h3>
                    <p className="text-sm opacity-90">
                      Comprehensive framework for assessing and advancing
                      organizational digital maturity
                    </p>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 mb-4">
                    A detailed methodology for evaluating digital transformation
                    progress across six key dimensions: strategy, technology,
                    data, processes, people, and culture. Includes benchmarking
                    data from 300+ organizations.
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      Published 2 weeks ago
                    </span>
                    <button
                      onClick={() =>
                        handleDownloadClick(
                          "Digital Maturity Assessment Framework 2024",
                          "analysis",
                        )
                      }
                      className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-semibold"
                    >
                      Access Framework
                    </button>
                  </div>
                </div>
              </div>

              {/* Side cards */}
              <div className="space-y-6">
                <div className="bg-white rounded-xl p-6 shadow-md relative overflow-hidden">
                  {/* Cybersecurity visual placeholder */}
                  <div className="absolute top-2 right-2 opacity-10">
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                      <path
                        d="M20 5 L30 10 L30 20 C30 28 20 35 20 35 C20 35 10 28 10 20 L10 10 L20 5 Z"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1"
                      />
                      <circle
                        cx="20"
                        cy="20"
                        r="6"
                        fill="currentColor"
                        opacity="0.3"
                      />
                      <path
                        d="M20 16 L20 24 M16 20 L24 20"
                        stroke="currentColor"
                        strokeWidth="1"
                      />
                      <circle
                        cx="8"
                        cy="8"
                        r="2"
                        fill="currentColor"
                        opacity="0.5"
                      />
                      <circle
                        cx="32"
                        cy="8"
                        r="2"
                        fill="currentColor"
                        opacity="0.5"
                      />
                      <circle
                        cx="8"
                        cy="32"
                        r="2"
                        fill="currentColor"
                        opacity="0.5"
                      />
                      <circle
                        cx="32"
                        cy="32"
                        r="2"
                        fill="currentColor"
                        opacity="0.5"
                      />
                    </svg>
                  </div>
                  <span className="bg-red-100 text-red-700 text-xs font-bold px-3 py-1 rounded-full mb-3 inline-block">
                    SECURITY
                  </span>
                  <h4 className="text-lg font-bold text-gray-900 mb-2">
                    Cybersecurity in Digital Transformation
                  </h4>
                  <p className="text-gray-600 text-sm mb-3">
                    Analysis of security challenges and solutions in digital
                    transformation initiatives
                  </p>
                  <button
                    onClick={() =>
                      handleDownloadClick(
                        "Cybersecurity in Digital Transformation",
                        "analysis",
                      )
                    }
                    className="text-primary-600 hover:text-primary-700 text-sm font-semibold"
                  >
                    Read Analysis →
                  </button>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-md relative overflow-hidden">
                  {/* ROI measurement visual placeholder */}
                  <div className="absolute top-2 right-2 opacity-10">
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                      <rect
                        x="5"
                        y="25"
                        width="6"
                        height="10"
                        fill="currentColor"
                        opacity="0.4"
                      />
                      <rect
                        x="13"
                        y="20"
                        width="6"
                        height="15"
                        fill="currentColor"
                        opacity="0.6"
                      />
                      <rect
                        x="21"
                        y="15"
                        width="6"
                        height="20"
                        fill="currentColor"
                        opacity="0.8"
                      />
                      <rect
                        x="29"
                        y="10"
                        width="6"
                        height="25"
                        fill="currentColor"
                      />
                      <path
                        d="M8 25 L16 20 L24 15 L32 10"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="none"
                      />
                      <circle cx="8" cy="25" r="2" fill="currentColor" />
                      <circle cx="16" cy="20" r="2" fill="currentColor" />
                      <circle cx="24" cy="15" r="2" fill="currentColor" />
                      <circle cx="32" cy="10" r="2" fill="currentColor" />
                    </svg>
                  </div>
                  <span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full mb-3 inline-block">
                    ROI STUDY
                  </span>
                  <h4 className="text-lg font-bold text-gray-900 mb-2">
                    Measuring Digital Transformation ROI
                  </h4>
                  <p className="text-gray-600 text-sm mb-3">
                    Methodologies and metrics for quantifying digital
                    transformation value
                  </p>
                  <button
                    onClick={() =>
                      handleDownloadClick(
                        "Measuring Digital Transformation ROI",
                        "analysis",
                      )
                    }
                    className="text-primary-600 hover:text-primary-700 text-sm font-semibold"
                  >
                    Read Analysis →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Market Intelligence Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex items-center justify-between mb-12">
              <div>
                <div className="flex items-center mb-4">
                  <div className="w-4 h-4 bg-teal-600 rounded-full mr-3"></div>
                  <span className="text-sm font-bold text-teal-600 uppercase tracking-wider">
                    Market Intelligence
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Industry Insights
                </h2>
              </div>
              <button
                onClick={() =>
                  navigate(
                    "/marketplace/dtmi?tab=deep-analysis&filter=market-intelligence",
                  )
                }
                className="hidden md:flex items-center text-primary-600 hover:text-primary-700 font-semibold"
              >
                Access All Market Intelligence
                <svg
                  className="w-4 h-4 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>

            {/* List-style layout */}
            <div className="max-w-4xl mx-auto space-y-6">
              <div className="bg-gradient-to-r from-teal-50 to-cyan-50 border-l-4 border-teal-600 rounded-lg p-6 hover:shadow-md transition-shadow relative overflow-hidden">
                {/* Market trends visual placeholder */}
                <div className="absolute top-4 right-4 opacity-10">
                  <svg width="60" height="40" viewBox="0 0 60 40" fill="none">
                    <path
                      d="M5 35 Q15 25 25 30 T45 20 T55 15"
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="none"
                    />
                    <circle cx="15" cy="28" r="2" fill="currentColor" />
                    <circle cx="25" cy="30" r="2" fill="currentColor" />
                    <circle cx="35" cy="25" r="2" fill="currentColor" />
                    <circle cx="45" cy="20" r="2" fill="currentColor" />
                    <circle cx="55" cy="15" r="2" fill="currentColor" />
                    <rect
                      x="5"
                      y="5"
                      width="50"
                      height="2"
                      fill="currentColor"
                      opacity="0.2"
                    />
                    <rect
                      x="5"
                      y="10"
                      width="45"
                      height="2"
                      fill="currentColor"
                      opacity="0.3"
                    />
                    <rect
                      x="5"
                      y="15"
                      width="40"
                      height="2"
                      fill="currentColor"
                      opacity="0.4"
                    />
                  </svg>
                </div>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <span className="bg-teal-100 text-teal-700 text-xs font-bold px-2 py-1 rounded mr-3">
                        MARKET TRENDS
                      </span>
                      <span className="text-sm text-gray-500">
                        Quarterly Report • 52 pages
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      Global Digital Transformation Market Analysis Q4 2024
                    </h3>
                    <p className="text-gray-600 mb-3">
                      Comprehensive analysis of market size, growth drivers,
                      competitive landscape, and emerging opportunities across
                      key industry verticals and geographic regions.
                    </p>
                    <div className="flex items-center text-sm text-gray-500">
                      <span>
                        Key Topics: Market Size, Growth Projections, Competitive
                        Analysis
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() =>
                      handleDownloadClick(
                        "Global Digital Transformation Market Analysis Q4 2024",
                        "report",
                      )
                    }
                    className="ml-6 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg text-sm font-semibold"
                  >
                    Download Report
                  </button>
                </div>
              </div>

              <div className="bg-gradient-to-r from-orange-50 to-red-50 border-l-4 border-orange-600 rounded-lg p-6 hover:shadow-md transition-shadow relative overflow-hidden">
                {/* Investment flows visual placeholder */}
                <div className="absolute top-4 right-4 opacity-10">
                  <svg width="60" height="40" viewBox="0 0 60 40" fill="none">
                    <circle
                      cx="20"
                      cy="20"
                      r="12"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1"
                    />
                    <circle
                      cx="20"
                      cy="20"
                      r="6"
                      fill="currentColor"
                      opacity="0.3"
                    />
                    <path
                      d="M32 20 L45 15"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <path
                      d="M32 20 L45 25"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <path
                      d="M32 20 L45 20"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <circle cx="45" cy="15" r="3" fill="currentColor" />
                    <circle cx="45" cy="20" r="3" fill="currentColor" />
                    <circle cx="45" cy="25" r="3" fill="currentColor" />
                    <path
                      d="M50 12 L55 15 L50 18"
                      stroke="currentColor"
                      strokeWidth="1"
                      fill="none"
                    />
                    <path
                      d="M50 17 L55 20 L50 23"
                      stroke="currentColor"
                      strokeWidth="1"
                      fill="none"
                    />
                    <path
                      d="M50 22 L55 25 L50 28"
                      stroke="currentColor"
                      strokeWidth="1"
                      fill="none"
                    />
                  </svg>
                </div>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <span className="bg-orange-100 text-orange-700 text-xs font-bold px-2 py-1 rounded mr-3">
                        INVESTMENT
                      </span>
                      <span className="text-sm text-gray-500">
                        Annual Study • 38 pages
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      Digital Transformation Investment Flows 2024
                    </h3>
                    <p className="text-gray-600 mb-3">
                      Analysis of venture capital, private equity, and corporate
                      investment patterns in digital transformation
                      technologies, including funding trends and valuation
                      metrics.
                    </p>
                    <div className="flex items-center text-sm text-gray-500">
                      <span>
                        Key Topics: VC Funding, Corporate Investment, Valuations
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() =>
                      handleDownloadClick(
                        "Digital Transformation Investment Flows 2024",
                        "report",
                      )
                    }
                    className="ml-6 bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg text-sm font-semibold"
                  >
                    Download Report
                  </button>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-600 rounded-lg p-6 hover:shadow-md transition-shadow relative overflow-hidden">
                {/* Technology adoption visual placeholder */}
                <div className="absolute top-4 right-4 opacity-10">
                  <svg width="60" height="40" viewBox="0 0 60 40" fill="none">
                    <rect
                      x="5"
                      y="30"
                      width="8"
                      height="8"
                      fill="currentColor"
                      opacity="0.4"
                    />
                    <rect
                      x="18"
                      y="25"
                      width="8"
                      height="13"
                      fill="currentColor"
                      opacity="0.5"
                    />
                    <rect
                      x="31"
                      y="20"
                      width="8"
                      height="18"
                      fill="currentColor"
                      opacity="0.6"
                    />
                    <rect
                      x="44"
                      y="15"
                      width="8"
                      height="23"
                      fill="currentColor"
                      opacity="0.7"
                    />
                    <path
                      d="M9 30 L22 25 L35 20 L48 15"
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="none"
                    />
                    <circle cx="9" cy="30" r="2" fill="currentColor" />
                    <circle cx="22" cy="25" r="2" fill="currentColor" />
                    <circle cx="35" cy="20" r="2" fill="currentColor" />
                    <circle cx="48" cy="15" r="2" fill="currentColor" />
                    <text x="9" y="12" fontSize="6" fill="currentColor">
                      AI
                    </text>
                    <text x="20" y="12" fontSize="6" fill="currentColor">
                      Cloud
                    </text>
                    <text x="31" y="12" fontSize="6" fill="currentColor">
                      IoT
                    </text>
                    <text x="44" y="12" fontSize="6" fill="currentColor">
                      5G
                    </text>
                  </svg>
                </div>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-1 rounded mr-3">
                        TECHNOLOGY
                      </span>
                      <span className="text-sm text-gray-500">
                        Biannual Survey • 41 pages
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      Enterprise Technology Adoption Survey 2024
                    </h3>
                    <p className="text-gray-600 mb-3">
                      Survey results from 1,200+ enterprise leaders on
                      technology adoption priorities, implementation challenges,
                      and success metrics across emerging technologies.
                    </p>
                    <div className="flex items-center text-sm text-gray-500">
                      <span>
                        Key Topics: Adoption Rates, Implementation Challenges,
                        Success Metrics
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() =>
                      handleDownloadClick(
                        "Enterprise Technology Adoption Survey 2024",
                        "report",
                      )
                    }
                    className="ml-6 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold"
                  >
                    Download Report
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Cross-layer Promotion */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Explore Other Intelligence Layers
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Signals
                </h3>
                <p className="text-gray-600 mb-6">
                  Early indicators and trend alerts that help you stay ahead of
                  the curve
                </p>
                <button
                  onClick={() => navigate("/signals")}
                  className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200"
                >
                  Explore Signals
                </button>
              </div>
              <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Insights
                </h3>
                <p className="text-gray-600 mb-6">
                  Actionable intelligence and expert perspectives on digital
                  transformation trends
                </p>
                <button
                  onClick={() => navigate("/insights")}
                  className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200"
                >
                  Explore Insights
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Contributor Cards */}
        <ContributorAdvertCards />

        {/* Newsletter Signup */}
        <NewsletterSignupForm />

        {/* DTMI Footer */}
        <Footer />
      </main>

      <ModernDQChatbot />

      {/* Lead Capture Modal */}
      <LeadCaptureModal
        isOpen={modalState.isOpen}
        onClose={handleModalClose}
        onSubmit={handleFormSubmit}
        contentTitle={modalState.contentTitle}
        contentType={modalState.contentType}
      />
    </div>
  );
};

export default ResearchLandingPage;

