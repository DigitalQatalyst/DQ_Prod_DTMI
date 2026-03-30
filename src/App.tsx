import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
  useLocation,
} from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/features/auth/context/AuthContext";
import { LandingPage } from "./features/landing";
import LoginPage from "./features/auth/LoginPage";
import MarketplacePage from "./features/marketplace";
import ContentDetailPage from "./features/content/ContentDetailPage";
import AuthorsPage from "./features/authors/AuthorsPage";
import AuthorListPage from "./features/authors/AuthorListPage";
import ContributorBioPage from "./features/authors/ContributorBioPage";
import DashboardPage from "./features/admin/overview/DashboardPage";
import AnalyticsPage from "./features/admin/overview/AnalyticsPage";
import LibraryPage from "./features/admin/library/LibraryPage";
import AuthorManagementPage from "./features/admin/authors/AuthorManagementPage";
import AuthorFormPage from "./features/admin/authors/AuthorFormPage";
import CategoriesPage from "./features/admin/categories/CategoriesPage";
import { NotFoundPage } from "./features/not-found";
import BlogEditorPage from "./features/admin/library/BlogEditorPage";
import ArticleEditorPage from "./features/admin/library/ArticleEditorPage";
import NewContentPage from "./features/admin/library/NewContentPage";

function RouteLoadingState() {
  return (
    <div className="min-h-[50vh] p-6 md:p-10 flex items-center justify-center">
      <div className="flex items-center gap-2 text-muted-foreground text-sm">
        <Loader2 className="h-4 w-4 animate-spin" />
        Loading dashboard...
      </div>
    </div>
  );
}

function RequireAuth() {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <RouteLoadingState />;
  }

  if (!user) {
    const from = `${location.pathname}${location.search}`;
    return <Navigate to={`/login?from=${encodeURIComponent(from)}`} replace />;
  }

  return <Outlet />;
}

function RequireAdmin() {
  const { user, isAdmin, isLoading } = useAuth();

  if (isLoading) {
    return <RouteLoadingState />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!isAdmin()) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/signals"
          element={<div className="p-8">Signals Page (Coming Soon)</div>}
        />
        <Route
          path="/insights"
          element={<div className="p-8">Insights Page (Coming Soon)</div>}
        />
        <Route
          path="/research"
          element={<div className="p-8">Research Page (Coming Soon)</div>}
        />
        <Route
          path="/books"
          element={<div className="p-8">Books Page (Coming Soon)</div>}
        />
        <Route
          path="/consultation"
          element={<div className="p-8">Consultation Page (Coming Soon)</div>}
        />
        <Route path="/marketplace" element={<MarketplacePage />} />
        {/* Content routes — one explicit route per content type, no fallbacks */}
        <Route path="/blog/:slugOrId" element={<ContentDetailPage />} />
        <Route path="/article/:slugOrId" element={<ContentDetailPage />} />
        <Route
          path="/future-insight/:slugOrId"
          element={<ContentDetailPage />}
        />
        <Route path="/whitepaper/:slugOrId" element={<ContentDetailPage />} />
        <Route
          path="/research-report/:slugOrId"
          element={<ContentDetailPage />}
        />
        <Route path="/podcast/:slugOrId" element={<ContentDetailPage />} />
        <Route
          path="/expert-interview/:slugOrId"
          element={<ContentDetailPage />}
        />
        <Route path="/video/:slugOrId" element={<ContentDetailPage />} />
        <Route path="/case-study/:slugOrId" element={<ContentDetailPage />} />
        <Route path="/infographic/:slugOrId" element={<ContentDetailPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/auth" element={<LoginPage />} />
        {/* Authors */}
        <Route path="/contributors" element={<AuthorsPage />} />
        <Route path="/contributors/all" element={<AuthorListPage />} />
        <Route path="/contributors/:slug" element={<ContributorBioPage />} />

        {/* Admin overview routes */}
        <Route element={<RequireAuth />}>
          <Route element={<RequireAdmin />}>
            <Route path="/admin/dashboard" element={<DashboardPage />} />
            <Route path="/admin/analytics" element={<AnalyticsPage />} />
            <Route path="/admin/library" element={<LibraryPage />} />
            <Route path="/admin/library/new" element={<NewContentPage />} />
            <Route
              path="/admin/library/blog/new"
              element={<BlogEditorPage />}
            />
            <Route
              path="/admin/library/blog/:id/edit"
              element={<BlogEditorPage />}
            />
            <Route
              path="/admin/library/article/new"
              element={<ArticleEditorPage />}
            />
            <Route
              path="/admin/library/article/:id/edit"
              element={<ArticleEditorPage />}
            />
            <Route path="/admin/categories" element={<CategoriesPage />} />
            <Route path="/admin/authors" element={<AuthorManagementPage />} />
            <Route path="/admin/authors/new" element={<AuthorFormPage />} />
            <Route
              path="/admin/authors/:id/edit"
              element={<AuthorFormPage />}
            />
          </Route>
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
