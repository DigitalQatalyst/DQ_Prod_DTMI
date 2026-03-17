import { useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { CourseType } from "./types/course";
import { AuthProvider } from "./components/Header/context/AuthContext";
import { GoogleAnalytics } from "./components/GoogleAnalytics";
import { MarketplaceRouter } from "./features/marketplace";
import { ProductMarketplacePage } from "./pages/ProductMarketplacePage";
import { ProductDetailPage } from "./pages/ProductDetailPage";
import { App } from "./App";
import MarketplaceDetailsPage from "./features/marketplace/pages/MarketplaceDetailsPage";
import ProtectedRoute from "./components/ProtectedRoute";
import AboutUsPage from "./pages/AboutUsPage";
import NotFound from "./pages/NotFound";
import MediaDetailPage from "./pages/media/MediaDetailPage";
import MediaDetailBlogLayout from "./pages/media/MediaDetailBlogLayout";
import ServicesPage from "./pages/ServicesPage";
import ServiceDetailPage from "./pages/ServiceDetailPage";
import { ABBCaseStudy } from "./pages/case-studies/ABBCaseStudy";
import { PGCaseStudy } from "./pages/case-studies/PGCaseStudy";
import LoginPage from "./features/auth/LoginPage";
// Admin UI (integrated)
import AdminDashboard from "./features/admin/overview/pages/Dashboard";
import AdminMediaList from "./features/admin/content/pages/MediaList";
import BlogCreate from "./features/admin/content/pages/BlogCreate";
import BlogDetail from "./features/admin/content/pages/BlogDetail";
import AdminSettings from "./features/admin/system/pages/Settings";
import AuthorManagement from "./features/admin/authors/pages/AuthorManagement";
import AuthorCreate from "./features/admin/authors/pages/AuthorCreate";
import CategoryManagement from "./features/admin/categories/pages/CategoryManagement";
import ContentSubmissions from "./features/admin/submissions/pages/ContentSubmissions";
import JobApplications from "./features/admin/recruitment/pages/JobApplications";
import JobPostingsManagement from "./features/admin/recruitment/pages/JobPostingsManagement";
import JobPostingCreate from "./features/admin/recruitment/pages/JobPostingCreate";
import Analytics from "./features/admin/overview/pages/Analytics";
import InterviewScheduler from "./features/admin/recruitment/pages/InterviewScheduler";
import NotificationCenter from "./features/admin/notifications/pages/NotificationCenter";
import UserManagement from "./features/admin/system/pages/UserManagement";
import GrowthAreasMarketplace from "./pages/GrowthAreasMarketplace";
import GrowthAreasPage from "./pages/GrowthAreasPage";
import BusinessDirectoryMarketplace from "./pages/BusinessDirectoryMarketplace";
import { ComingSoon } from "./pages/ComingSoon";
import DtmiLandingPage from "./features/landing";
import SignalsLandingPage from "./pages/SignalsLandingPage";
import InsightsLandingPage from "./pages/InsightsLandingPage";
import ResearchLandingPage from "./pages/ResearchLandingPage";
import ContributorsMarketplacePage from "./features/dtmi/contributors/ContributorsMarketplacePage";
import ViewArticlePage from "./features/dtmi/articles/ViewArticlePage";
import { SixDimensionsPage } from "./features/dtmi/six-dimensions/SixDimensionsPage";
import ResearchReportPage from "./pages/ResearchReportPage";
import ResearchReportDetailPage from "./pages/ResearchReportDetailPage";
import WhitepaperDetailPage from "./pages/WhitepaperDetailPage";
import WhitepaperScrollPage from "./pages/WhitepaperScrollPage";
import MyDQPage from "./features/dashboard/MyDQPage";
import ResearchPanelLandingPage from "./features/dtmi/research-panel/ResearchPanelLandingPage";
import ResearchPanelApplicationPage from "./features/dtmi/research-panel/ResearchPanelApplicationPage";
import SavedItemsPage from "./features/dashboard/SavedItemsPage";
import EmailSubscriptionsPage from "./features/dashboard/EmailSubscriptionsPage";
import ProfilePage from "./features/dashboard/ProfilePage";
import SettingsPage from "./features/dashboard/SettingsPage";
import DashboardLayout from "./features/dashboard/DashboardLayout";
import DashboardContent from "./features/dashboard/DashboardContent";
import ActivityCentre from "./features/dashboard/ActivityCentre";
import MyContentPage from "./features/dashboard/MyContentPage";
import BlogListPage from "./pages/blog/BlogListPage";
import BlogPage from "./pages/blog/BlogPage";
import { AuthorBioPage } from "./pages/AuthorBioPage/AuthorBioPage";
import ConsultationPage from "./pages/ConsultationPage";
import RequestDemoPage from "./pages/RequestDemoPage";
import ServiceRequestForm from "./pages/forms/ServiceRequestForm";
import ProductDemoRequestForm from "./pages/forms/ProductDemoRequestForm";
import TourRequestForm from "./pages/forms/TourRequestForm";
import ExpertInterviewPage from "./pages/expert-interviews/ExpertInterviewPage";
import { TermsOfServicePage } from "./pages/TermsOfServicePage";
import { PrivacyPolicyPage } from "./pages/PrivacyPolicyPage";
import CareersPage from "./pages/CareersPage";
import ContactUsPage from "./pages/ContactUsPage";
import JobListingsPage from "./pages/JobListingsPage";
import JobDetailPage from "./pages/JobDetailPage";
import ProductsLandingPage from "./pages/ProductsLandingPage";
import PodcastDetailPage from "./pages/PodcastDetailPage";
import JobApplicationForm from "./pages/forms/JobApplicationForm";
import NewsletterSignupPage from "./pages/NewsletterSignupPage";
import SectorLandingPage from "./pages/sectors/SectorLandingPage";
import SignalsAlertsSignupPage from "./pages/SignalsAlertsSignupPage";
import InsightsUpdatesSignupPage from "./pages/InsightsUpdatesSignupPage";
import ResearchUpdatesSignupPage from "./pages/ResearchUpdatesSignupPage";
import BooksLandingPage from "./pages/BooksLandingPage";
import { ClientTestimonialsPage } from "./pages/ClientTestimonialsPage";

export function AppRouter() {
  const [bookmarkedCourses, setBookmarkedCourses] = useState<string[]>([]);
  const [compareCourses, setCompareCourses] = useState<CourseType[]>([]);


  const toggleBookmark = (courseId: string) => {
    setBookmarkedCourses((prev) => {
      if (prev.includes(courseId)) {
        return prev.filter((id) => id !== courseId);
      } else {
        return [...prev, courseId];
      }
    });
  };
  const handleAddToComparison = (course: CourseType) => {
    if (
      compareCourses.length < 3 &&
      !compareCourses.some((c) => c.id === course.id)
    ) {
      setCompareCourses((prev) => [...prev, course]);
    }
  };

  return (
    <BrowserRouter>
      <GoogleAnalytics />
      <AuthProvider>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/courses" element={<App />} />
            <Route path="/products" element={<ProductsLandingPage />} />
            <Route
              path="/products/marketplace"
              element={<ProductMarketplacePage />}
            />
            <Route
              path="/products/:productId"
              element={<ProductDetailPage />}
            />
            <Route
              path="/courses/:itemId"
              element={
                <MarketplaceDetailsPage
                  marketplaceType="courses"
                  bookmarkedItems={bookmarkedCourses}
                  onToggleBookmark={toggleBookmark}
                  onAddToComparison={handleAddToComparison}
                />
              }
            />
            <Route path="/marketplace/*" element={<MarketplaceRouter />} />
            <Route
              path="/dashboard"
              element={
                  <DashboardLayout />
              
              }
            >
              <Route index element={<DashboardContent />} />
              <Route path="activity" element={<ActivityCentre />} />
              <Route path="my-content" element={<MyContentPage />} />
              <Route path="saved-items" element={<SavedItemsPage />} />
              <Route
                path="subscriptions"
                element={<EmailSubscriptionsPage />}
              />
              <Route path="profile" element={<ProfilePage />} />
              <Route path="settings" element={<SettingsPage />} />
            </Route>
            <Route path="/about-us" element={<AboutUsPage />} />
            <Route
              path="/growth-areas-marketplace"
              element={<GrowthAreasMarketplace />}
            />
            <Route path="/growth-areas" element={<GrowthAreasPage />} />
            <Route
              path="/business-directory-marketplace"
              element={<BusinessDirectoryMarketplace />}
            />
            <Route path="/coming-soon" element={<ComingSoon />} />
            <Route path="/coming-soon/:feature" element={<ComingSoon />} />

       
            <Route
              path="/admin-ui/settings"
              element={<AdminSettings />}
            />
            {/* Embedded Admin UI */}
            <Route
              path="/admin-ui/dashboard"
              element={<AdminDashboard />}
            />
            <Route
              path="/admin-ui/media"
              element={<AdminMediaList />}
            />
            <Route
              path="/admin-ui/media/new"
              element={<BlogCreate />}
            />
            <Route
              path="/admin-ui/media/:id"
              element={<BlogDetail />}
            />
            <Route
              path="/admin-ui/authors"
              element={<AuthorManagement />}
            />
            <Route
              path="/admin-ui/authors/new"
              element={<AuthorCreate />}
            />
            <Route
              path="/admin-ui/categories"
              element={<CategoryManagement />}
            />
            <Route
              path="/admin-ui/submissions"
              element={<ContentSubmissions />}
            />
            <Route
              path="/admin-ui/job-applications"
              element={<JobApplications />}
            />
            <Route
              path="/admin-ui/job-postings"
              element={<JobPostingsManagement />}
            />
            <Route
              path="/admin-ui/job-postings/new"
              element={<JobPostingCreate />}
            />
            <Route
              path="/admin-ui/analytics"
              element={<Analytics />}
            />
            <Route
              path="/admin-ui/interviews"
              element={<InterviewScheduler />}
            />
            <Route
              path="/admin-ui/notifications"
              element={<NotificationCenter />}
            />
            <Route
              path="/admin-ui/users"
              element={<UserManagement />}
            />

            <Route path="/signals" element={<SignalsLandingPage />} />
            <Route
              path="/signals-alerts-signup"
              element={<SignalsAlertsSignupPage />}
            />
            <Route path="/insights" element={<InsightsLandingPage />} />
            <Route
              path="/insights-updates-signup"
              element={<InsightsUpdatesSignupPage />}
            />
            <Route path="/books" element={<BooksLandingPage />} />
            <Route path="/research" element={<ResearchLandingPage />} />
            <Route
              path="/research-updates-signup"
              element={<ResearchUpdatesSignupPage />}
            />
            <Route
              path="/dtmi/signals"
              element={<Navigate to="/signals" replace />}
            />
            <Route
              path="/dtmi/insights"
              element={<Navigate to="/insights" replace />}
            />
            <Route
              path="/dtmi/deep-analysis"
              element={<Navigate to="/research" replace />}
            />
            <Route path="/dtmi/6xd" element={<SixDimensionsPage />} />
            <Route
              path="/dtmi/contributors"
              element={<ContributorsMarketplacePage />}
            />
            <Route
              path="/dtmi/research-panel"
              element={<ResearchPanelLandingPage />}
            />
            <Route
              path="/dtmi/research-panel-application"
              element={<ResearchPanelApplicationPage />}
            />
            <Route path="/dtmi/article/:slug" element={<ViewArticlePage />} />
            <Route
              path="/newsletter-signup"
              element={<NewsletterSignupPage />}
            />

            {/* Sector Landing Pages */}
            <Route path="/sectors/:sectorId" element={<SectorLandingPage />} />

            <Route path="/research-report" element={<ResearchReportPage />} />
            <Route
              path="/research-report/:slug"
              element={<ResearchReportDetailPage />}
            />
            <Route
              path="/report/:slug"
              element={<ResearchReportDetailPage />}
            />
            <Route path="/blog" element={<BlogListPage />} />
            <Route path="/blog/:slug" element={<BlogPage />} />
            <Route path="/authors/:slug" element={<AuthorBioPage />} />
            <Route path="/my-dq" element={<MyDQPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/services/:slug" element={<ServiceDetailPage />} />
            <Route path="/client-testimonials" element={<ClientTestimonialsPage />} />
            <Route
              path="/client-testimonials/abb-dbp-design"
              element={<ABBCaseStudy />}
            />
            <Route
              path="/client-testimonials/pg-digital-research"
              element={<PGCaseStudy />}
            />
            <Route path="/consultation" element={<ConsultationPage />} />
            <Route path="/request-demo" element={<RequestDemoPage />} />
            <Route
              path="/forms/service-request"
              element={<ServiceRequestForm />}
            />
            <Route
              path="/forms/product-demo/:productCode"
              element={
                <ProtectedRoute>
                  <ProductDemoRequestForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/forms/tour-request"
              element={
                <ProtectedRoute>
                  <TourRequestForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/expert-interviews/:slug"
              element={<ExpertInterviewPage />}
            />
            <Route path="/whitepaper/:id" element={<WhitepaperDetailPage />} />
            <Route
              path="/whitepaper/digital-economy-4-0"
              element={<WhitepaperScrollPage />}
            />
            <Route path="/podcast/:id" element={<PodcastDetailPage />} />
            <Route path="/terms-of-service" element={<TermsOfServicePage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/careers" element={<CareersPage />} />
            <Route path="/contact" element={<ContactUsPage />} />
            <Route path="/jobs" element={<JobListingsPage />} />
            <Route path="/jobs/:jobId" element={<JobDetailPage />} />
            <Route
              path="/jobs/:jobId/apply"
              element={
                <ProtectedRoute>
                  <JobApplicationForm />
                </ProtectedRoute>
              }
            />
            <Route path="/media/blog/:id" element={<BlogPage />} />
            <Route
              path="/media/:type/:id"
              element={<MediaDetailBlogLayout />}
            />
            <Route path="/:type/:id" element={<MediaDetailPage />} />
            <Route path="/podcast/:id" element={<PodcastDetailPage />} />
            <Route path="/404" element={<NotFound />} />

            <Route path="*" element={<Navigate to="/404" replace />} />
          </Routes>
        </AuthProvider>
    </BrowserRouter>
  );
}
