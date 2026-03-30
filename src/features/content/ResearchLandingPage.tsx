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
                  onClick={() => navigate("/research-panel")}
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
                className="text-primary-600 hover:text-primary-700 font-semibold"
              >
                View All Reports
              </button>
            </div>

            {/* 3-column grid with marketplace-style cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                <div className="h-64 bg-gradient-to-br from-purple-50 to-indigo-50 relative overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop&crop=center"
                    alt="Digital Transformation Report"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = "none";
                      const parent = target.parentElement;
                      if (parent) {
                        parent.innerHTML = `
                          <div class="w-full h-full bg-gradient-to-br from-purple-50 to-indigo-50 flex items-center justify-center">
                            <svg width="80" height="60" viewBox="0 0 80 60" fill="none" class="text-purple-300">
                              <rect x="20" y="10" width="40" height="40" rx="4" fill="none" stroke="currentColor" stroke-width="2"/>
                              <rect x="25" y="15" width="30" height="3" fill="currentColor"/>
                              <rect x="25" y="22" width="25" height="2" fill="currentColor"/>
                              <rect x="25" y="27" width="28" height="2" fill="currentColor"/>
                              <rect x="25" y="32" width="20" height="2" fill="currentColor"/>
                              <circle cx="35" cy="40" r="6" fill="currentColor" opacity="0.3"/>
                              <rect x="45" y="37" width="10" height="6" fill="currentColor" opacity="0.3"/>
                            </svg>
                          </div>
                        `;
                      }
                    }}
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-purple-100 text-purple-700 text-xs font-bold px-3 py-1 rounded-full">
                      COMPREHENSIVE
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    The State of Digital Transformation 2024
                  </h3>
                  <p className="text-gray-600 mb-4 text-sm">
                    Comprehensive analysis of digital transformation trends
                    across industries, featuring data from 500+ enterprises.
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-gray-500">45 pages</span>
                      <span className="text-xs text-gray-400">•</span>
                      <span className="text-xs text-gray-500">2 weeks ago</span>
                    </div>
                    <div className="flex items-center">
                      <div className="flex text-yellow-400">
                        {"★".repeat(5)}
                      </div>
                      <span className="text-xs text-gray-500 ml-1">
                        High Impact
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                <div className="h-64 bg-gradient-to-br from-blue-50 to-cyan-50 relative overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=300&fit=crop&crop=center"
                    alt="AI Adoption Report"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = "none";
                      const parent = target.parentElement;
                      if (parent) {
                        parent.innerHTML = `
                          <div class="w-full h-full bg-gradient-to-br from-blue-50 to-cyan-50 flex items-center justify-center">
                            <svg width="80" height="60" viewBox="0 0 80 60" fill="none" class="text-blue-300">
                              <circle cx="25" cy="25" r="12" fill="none" stroke="currentColor" stroke-width="2"/>
                              <circle cx="55" cy="35" r="8" fill="none" stroke="currentColor" stroke-width="2"/>
                              <circle cx="40" cy="15" r="6" fill="currentColor" opacity="0.5"/>
                              <circle cx="15" cy="40" r="4" fill="currentColor" opacity="0.5"/>
                              <circle cx="65" cy="20" r="4" fill="currentColor" opacity="0.5"/>
                              <path d="M25 13 L40 15" stroke="currentColor" stroke-width="1" stroke-dasharray="2,2"/>
                              <path d="M37 25 L47 35" stroke="currentColor" stroke-width="1" stroke-dasharray="2,2"/>
                              <path d="M19 37 L47 35" stroke="currentColor" stroke-width="1" stroke-dasharray="2,2"/>
                            </svg>
                          </div>
                        `;
                      }
                    }}
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full">
                      SECTOR STUDY
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    AI Adoption Patterns in Financial Services
                  </h3>
                  <p className="text-gray-600 mb-4 text-sm">
                    In-depth study of artificial intelligence implementation
                    strategies and ROI metrics across financial institutions.
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-gray-500">32 pages</span>
                      <span className="text-xs text-gray-400">•</span>
                      <span className="text-xs text-gray-500">1 month ago</span>
                    </div>
                    <div className="flex items-center">
                      <div className="flex text-yellow-400">
                        {"★".repeat(4)}
                        {"☆"}
                      </div>
                      <span className="text-xs text-gray-500 ml-1">
                        High Impact
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                <div className="h-64 bg-gradient-to-br from-teal-50 to-green-50 relative overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop&crop=center"
                    alt="Cloud Infrastructure Report"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = "none";
                      const parent = target.parentElement;
                      if (parent) {
                        parent.innerHTML = `
                          <div class="w-full h-full bg-gradient-to-br from-teal-50 to-green-50 flex items-center justify-center">
                            <svg width="80" height="60" viewBox="0 0 80 60" fill="none" class="text-teal-300">
                              <path d="M15 30 C13 30 11 28 13 26 C13 24 15 22 18 22 C21 22 23 24 23 26 C25 28 24 30 22 30 Z" fill="currentColor" opacity="0.3"/>
                              <path d="M35 35 C33 35 31 33 33 31 C33 29 35 27 38 27 C41 27 43 29 43 31 C45 33 44 35 42 35 Z" fill="currentColor" opacity="0.5"/>
                              <path d="M55 25 C53 25 51 23 53 21 C53 19 55 17 58 17 C61 17 63 19 63 21 C65 23 64 25 62 25 Z" fill="currentColor" opacity="0.7"/>
                              <rect x="10" y="40" width="12" height="8" rx="2" fill="currentColor" opacity="0.4"/>
                              <rect x="28" y="42" width="10" height="6" rx="2" fill="currentColor" opacity="0.4"/>
                              <rect x="45" y="41" width="15" height="7" rx="2" fill="currentColor" opacity="0.4"/>
                            </svg>
                          </div>
                        `;
                      }
                    }}
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-teal-100 text-teal-700 text-xs font-bold px-3 py-1 rounded-full">
                      MARKET INTEL
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    Cloud Infrastructure Investment Trends
                  </h3>
                  <p className="text-gray-600 mb-4 text-sm">
                    Strategic analysis of cloud infrastructure spending patterns
                    and investment priorities for 2024-2025.
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-gray-500">28 pages</span>
                      <span className="text-xs text-gray-400">•</span>
                      <span className="text-xs text-gray-500">3 weeks ago</span>
                    </div>
                    <div className="flex items-center">
                      <div className="flex text-yellow-400">
                        {"★".repeat(4)}
                        {"☆"}
                      </div>
                      <span className="text-xs text-gray-500 ml-1">
                        Medium Impact
                      </span>
                    </div>
                  </div>
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
                className="text-primary-600 hover:text-primary-700 font-semibold"
              >
                Explore All Deep Analysis
              </button>
            </div>

            {/* 3-column grid with marketplace-style cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                <div className="h-64 bg-gradient-to-r from-indigo-600 to-purple-600 relative overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop&crop=center"
                    alt="Digital Maturity Framework"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = "none";
                      const parent = target.parentElement;
                      if (parent) {
                        parent.innerHTML = `
                          <div class="w-full h-full bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center">
                            <svg width="80" height="60" viewBox="0 0 80 60" fill="none" class="text-white opacity-20">
                              <circle cx="25" cy="30" r="15" fill="none" stroke="currentColor" stroke-width="2"/>
                              <circle cx="25" cy="30" r="10" fill="none" stroke="currentColor" stroke-width="1"/>
                              <circle cx="25" cy="30" r="5" fill="none" stroke="currentColor" stroke-width="1"/>
                              <path d="M25 15 L30 20 L25 25 L20 20 Z" fill="currentColor" opacity="0.7"/>
                              <path d="M40 30 L35 35 L30 30 L35 25 Z" fill="currentColor" opacity="0.5"/>
                              <path d="M25 45 L20 40 L25 35 L30 40 Z" fill="currentColor" opacity="0.6"/>
                              <path d="M10 30 L15 25 L20 30 L15 35 Z" fill="currentColor" opacity="0.4"/>
                            </svg>
                          </div>
                        `;
                      }
                    }}
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-white bg-opacity-20 text-white text-xs font-bold px-3 py-1 rounded-full">
                      MATURITY MODEL
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    Digital Maturity Assessment Framework 2024
                  </h3>
                  <p className="text-gray-600 mb-4 text-sm">
                    Comprehensive framework for assessing and advancing
                    organizational digital maturity across six key dimensions.
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-gray-500">Framework</span>
                      <span className="text-xs text-gray-400">•</span>
                      <span className="text-xs text-gray-500">2 weeks ago</span>
                    </div>
                    <div className="flex items-center">
                      <div className="flex text-yellow-400">
                        {"★".repeat(5)}
                      </div>
                      <span className="text-xs text-gray-500 ml-1">
                        High Impact
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                <div className="h-64 bg-gradient-to-br from-red-50 to-pink-50 relative overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=300&fit=crop&crop=center"
                    alt="Cybersecurity Analysis"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = "none";
                      const parent = target.parentElement;
                      if (parent) {
                        parent.innerHTML = `
                          <div class="w-full h-full bg-gradient-to-br from-red-50 to-pink-50 flex items-center justify-center">
                            <svg width="80" height="60" viewBox="0 0 80 60" fill="none" class="text-red-300">
                              <path d="M40 10 L50 15 L50 25 C50 33 40 40 40 40 C40 40 30 33 30 25 L30 15 L40 10 Z" fill="none" stroke="currentColor" stroke-width="2"/>
                              <circle cx="40" cy="25" r="8" fill="currentColor" opacity="0.3"/>
                              <path d="M40 21 L40 29 M36 25 L44 25" stroke="currentColor" stroke-width="1"/>
                              <circle cx="20" cy="15" r="3" fill="currentColor" opacity="0.5"/>
                              <circle cx="60" cy="15" r="3" fill="currentColor" opacity="0.5"/>
                              <circle cx="20" cy="45" r="3" fill="currentColor" opacity="0.5"/>
                              <circle cx="60" cy="45" r="3" fill="currentColor" opacity="0.5"/>
                            </svg>
                          </div>
                        `;
                      }
                    }}
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-red-100 text-red-700 text-xs font-bold px-3 py-1 rounded-full">
                      SECURITY
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    Cybersecurity in Digital Transformation
                  </h3>
                  <p className="text-gray-600 mb-4 text-sm">
                    Analysis of security challenges and solutions in digital
                    transformation initiatives across industries.
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-gray-500">Analysis</span>
                      <span className="text-xs text-gray-400">•</span>
                      <span className="text-xs text-gray-500">1 week ago</span>
                    </div>
                    <div className="flex items-center">
                      <div className="flex text-yellow-400">
                        {"★".repeat(4)}
                        {"☆"}
                      </div>
                      <span className="text-xs text-gray-500 ml-1">
                        High Impact
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                <div className="h-64 bg-gradient-to-br from-green-50 to-emerald-50 relative overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop&crop=center"
                    alt="ROI Measurement"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = "none";
                      const parent = target.parentElement;
                      if (parent) {
                        parent.innerHTML = `
                          <div class="w-full h-full bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center">
                            <svg width="80" height="60" viewBox="0 0 80 60" fill="none" class="text-green-300">
                              <rect x="10" y="40" width="8" height="15" fill="currentColor" opacity="0.4"/>
                              <rect x="23" y="35" width="8" height="20" fill="currentColor" opacity="0.6"/>
                              <rect x="36" y="30" width="8" height="25" fill="currentColor" opacity="0.8"/>
                              <rect x="49" y="25" width="8" height="30" fill="currentColor"/>
                              <path d="M14 40 L27 35 L40 30 L53 25" stroke="currentColor" stroke-width="2" fill="none"/>
                              <circle cx="14" cy="40" r="2" fill="currentColor"/>
                              <circle cx="27" cy="35" r="2" fill="currentColor"/>
                              <circle cx="40" cy="30" r="2" fill="currentColor"/>
                              <circle cx="53" cy="25" r="2" fill="currentColor"/>
                            </svg>
                          </div>
                        `;
                      }
                    }}
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full">
                      ROI STUDY
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    Measuring Digital Transformation ROI
                  </h3>
                  <p className="text-gray-600 mb-4 text-sm">
                    Methodologies and metrics for quantifying digital
                    transformation value and business impact.
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-gray-500">Methodology</span>
                      <span className="text-xs text-gray-400">•</span>
                      <span className="text-xs text-gray-500">3 days ago</span>
                    </div>
                    <div className="flex items-center">
                      <div className="flex text-yellow-400">
                        {"★".repeat(4)}
                        {"☆"}
                      </div>
                      <span className="text-xs text-gray-500 ml-1">
                        Medium Impact
                      </span>
                    </div>
                  </div>
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
                className="text-primary-600 hover:text-primary-700 font-semibold"
              >
                Access All Market Intelligence
              </button>
            </div>

            {/* 3-column grid with marketplace-style cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                <div className="h-64 bg-gradient-to-r from-teal-50 to-cyan-50 relative overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=300&fit=crop&crop=center"
                    alt="Market Analysis"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = "none";
                      const parent = target.parentElement;
                      if (parent) {
                        parent.innerHTML = `
                          <div class="w-full h-full bg-gradient-to-r from-teal-50 to-cyan-50 flex items-center justify-center">
                            <svg width="80" height="60" viewBox="0 0 80 60" fill="none" class="text-teal-300">
                              <path d="M10 50 Q20 40 30 45 T50 35 T70 30" stroke="currentColor" stroke-width="2" fill="none"/>
                              <circle cx="20" cy="43" r="2" fill="currentColor"/>
                              <circle cx="30" cy="45" r="2" fill="currentColor"/>
                              <circle cx="40" cy="40" r="2" fill="currentColor"/>
                              <circle cx="50" cy="35" r="2" fill="currentColor"/>
                              <circle cx="70" cy="30" r="2" fill="currentColor"/>
                              <rect x="10" y="10" width="60" height="2" fill="currentColor" opacity="0.2"/>
                              <rect x="10" y="15" width="55" height="2" fill="currentColor" opacity="0.3"/>
                              <rect x="10" y="20" width="50" height="2" fill="currentColor" opacity="0.4"/>
                            </svg>
                          </div>
                        `;
                      }
                    }}
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-teal-100 text-teal-700 text-xs font-bold px-3 py-1 rounded-full">
                      MARKET TRENDS
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    Global Digital Transformation Market Analysis Q4 2024
                  </h3>
                  <p className="text-gray-600 mb-4 text-sm">
                    Comprehensive analysis of market size, growth drivers, and
                    competitive landscape across key industry verticals.
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-gray-500">52 pages</span>
                      <span className="text-xs text-gray-400">•</span>
                      <span className="text-xs text-gray-500">Quarterly</span>
                    </div>
                    <div className="flex items-center">
                      <div className="flex text-yellow-400">
                        {"★".repeat(5)}
                      </div>
                      <span className="text-xs text-gray-500 ml-1">
                        High Impact
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                <div className="h-64 bg-gradient-to-r from-orange-50 to-red-50 relative overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=400&h=300&fit=crop&crop=center"
                    alt="Investment Flows"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = "none";
                      const parent = target.parentElement;
                      if (parent) {
                        parent.innerHTML = `
                          <div class="w-full h-full bg-gradient-to-r from-orange-50 to-red-50 flex items-center justify-center">
                            <svg width="80" height="60" viewBox="0 0 80 60" fill="none" class="text-orange-300">
                              <circle cx="25" cy="30" r="15" fill="none" stroke="currentColor" stroke-width="1"/>
                              <circle cx="25" cy="30" r="8" fill="currentColor" opacity="0.3"/>
                              <path d="M40 30 L55 25" stroke="currentColor" stroke-width="2"/>
                              <path d="M40 30 L55 35" stroke="currentColor" stroke-width="2"/>
                              <path d="M40 30 L55 30" stroke="currentColor" stroke-width="2"/>
                              <circle cx="55" cy="25" r="3" fill="currentColor"/>
                              <circle cx="55" cy="30" r="3" fill="currentColor"/>
                              <circle cx="55" cy="35" r="3" fill="currentColor"/>
                              <path d="M60 22 L65 25 L60 28" stroke="currentColor" stroke-width="1" fill="none"/>
                              <path d="M60 27 L65 30 L60 33" stroke="currentColor" stroke-width="1" fill="none"/>
                              <path d="M60 32 L65 35 L60 38" stroke="currentColor" stroke-width="1" fill="none"/>
                            </svg>
                          </div>
                        `;
                      }
                    }}
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-orange-100 text-orange-700 text-xs font-bold px-3 py-1 rounded-full">
                      INVESTMENT
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    Digital Transformation Investment Flows 2024
                  </h3>
                  <p className="text-gray-600 mb-4 text-sm">
                    Analysis of venture capital, private equity, and corporate
                    investment patterns in digital transformation technologies.
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-gray-500">38 pages</span>
                      <span className="text-xs text-gray-400">•</span>
                      <span className="text-xs text-gray-500">
                        Annual Study
                      </span>
                    </div>
                    <div className="flex items-center">
                      <div className="flex text-yellow-400">
                        {"★".repeat(4)}
                        {"☆"}
                      </div>
                      <span className="text-xs text-gray-500 ml-1">
                        High Impact
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                <div className="h-64 bg-gradient-to-r from-blue-50 to-indigo-50 relative overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=400&h=300&fit=crop&crop=center"
                    alt="Technology Adoption"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = "none";
                      const parent = target.parentElement;
                      if (parent) {
                        parent.innerHTML = `
                          <div class="w-full h-full bg-gradient-to-r from-blue-50 to-indigo-50 flex items-center justify-center">
                            <svg width="80" height="60" viewBox="0 0 80 60" fill="none" class="text-blue-300">
                              <rect x="10" y="45" width="10" height="10" fill="currentColor" opacity="0.4"/>
                              <rect x="25" y="40" width="10" height="15" fill="currentColor" opacity="0.5"/>
                              <rect x="40" y="35" width="10" height="20" fill="currentColor" opacity="0.6"/>
                              <rect x="55" y="30" width="10" height="25" fill="currentColor" opacity="0.7"/>
                              <path d="M15 45 L30 40 L45 35 L60 30" stroke="currentColor" stroke-width="2" fill="none"/>
                              <circle cx="15" cy="45" r="2" fill="currentColor"/>
                              <circle cx="30" cy="40" r="2" fill="currentColor"/>
                              <circle cx="45" cy="35" r="2" fill="currentColor"/>
                              <circle cx="60" cy="30" r="2" fill="currentColor"/>
                              <text x="15" y="20" fontSize="8" fill="currentColor">AI</text>
                              <text x="27" y="20" fontSize="8" fill="currentColor">Cloud</text>
                              <text x="42" y="20" fontSize="8" fill="currentColor">IoT</text>
                              <text x="57" y="20" fontSize="8" fill="currentColor">5G</text>
                            </svg>
                          </div>
                        `;
                      }
                    }}
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full">
                      TECHNOLOGY
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    Enterprise Technology Adoption Survey 2024
                  </h3>
                  <p className="text-gray-600 mb-4 text-sm">
                    Survey results from 1,200+ enterprise leaders on technology
                    adoption priorities and implementation challenges.
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-gray-500">41 pages</span>
                      <span className="text-xs text-gray-400">•</span>
                      <span className="text-xs text-gray-500">
                        Biannual Survey
                      </span>
                    </div>
                    <div className="flex items-center">
                      <div className="flex text-yellow-400">
                        {"★".repeat(4)}
                        {"☆"}
                      </div>
                      <span className="text-xs text-gray-500 ml-1">
                        Medium Impact
                      </span>
                    </div>
                  </div>
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
