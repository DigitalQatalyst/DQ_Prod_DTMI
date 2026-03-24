import { useState, useEffect } from "react";
import AppLayout from "../../shared/components/AppLayout";
import { useAuth } from "../../../../shared/Header/context/AuthContext";
import { blogService, categoryService } from "../../shared/utils/supabase";
import {
  BarChart3,
  Loader,
  Eye,
  FileText,
  TrendingUp,
  BookOpen,
  Newspaper,
  Mic,
  Book,
  Briefcase,
  User,
  FlaskConical,
} from "lucide-react";

const CONTENT_TYPE_META: Record<string, { label: string; color: string; icon: any }> = {
  blog:                { label: "Blog Post",          color: "#6366f1", icon: BookOpen },
  article:             { label: "Article",            color: "#3b82f6", icon: Newspaper },
  research:            { label: "Research Report",    color: "#8b5cf6", icon: FlaskConical },
  whitepaper:          { label: "Whitepaper",         color: "#0ea5e9", icon: Book },
  "case-study":        { label: "Case Study",         color: "#f59e0b", icon: Briefcase },
  "expert-interview":  { label: "Expert Interview",   color: "#10b981", icon: User },
  podcast:             { label: "Podcast",            color: "#f97316", icon: Mic },
  "prediction-analysis": { label: "Prediction",      color: "#ec4899", icon: TrendingUp },
};

interface ContentStats {
  totalPosts: number;
  totalCategories: number;
  byType: Record<string, number>;
}

export default function Analytics() {
  const { isAdmin } = useAuth();
  const [stats, setStats] = useState<ContentStats>({ totalPosts: 0, totalCategories: 0, byType: {} });
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState("30");

  useEffect(() => {
    loadAnalytics();
  }, [dateRange]);

  const loadAnalytics = async () => {
    setLoading(true);
    try {
      const [posts, categories] = await Promise.all([
        blogService.getBlogs(),
        categoryService.getCategories(),
      ]);

      const byType: Record<string, number> = {};
      if (posts) {
        posts.forEach((p: any) => {
          const t = p.type || "blog";
          byType[t] = (byType[t] || 0) + 1;
        });
      }

      setStats({
        totalPosts: posts?.length || 0,
        totalCategories: categories?.length || 0,
        byType,
      });
    } catch (err) {
      console.error("Analytics load error:", err);
    } finally {
      setLoading(false);
    }
  };

  const maxTypeCount = Math.max(...Object.values(stats.byType), 1);

  if (loading) {
    return (
      <AppLayout title="Analytics & Reports">
        <div className="flex items-center justify-center h-64">
          <Loader className="animate-spin text-gray-400" size={32} />
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout title="Analytics & Reports">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BarChart3 size={20} className="text-gray-400" />
            <span className="text-sm text-gray-500">Content Performance Overview</span>
          </div>
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium focus:ring-2 focus:ring-black focus:border-transparent"
          >
            <option value="7">Last 7 Days</option>
            <option value="30">Last 30 Days</option>
            <option value="90">Last 90 Days</option>
            <option value="365">Last Year</option>
          </select>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl border border-gray-200 p-4 border-r-[3px] border-r-[#030F35]">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-2xl font-semibold text-gray-900">{stats.totalPosts}</div>
                <div className="text-xs text-gray-500 mt-1">Total Published Posts</div>
              </div>
              <div className="bg-indigo-50 p-2 rounded-lg">
                <FileText className="text-indigo-600" size={20} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-4 border-r-[3px] border-r-[#030F35]">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-2xl font-semibold text-gray-900">{stats.totalCategories}</div>
                <div className="text-xs text-gray-500 mt-1">Content Categories</div>
              </div>
              <div className="bg-indigo-50 p-2 rounded-lg">
                <BookOpen className="text-indigo-600" size={20} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-4 border-r-[3px] border-r-[#030F35]">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-2xl font-semibold text-gray-900">{Object.keys(stats.byType).length}</div>
                <div className="text-xs text-gray-500 mt-1">Content Types in Use</div>
              </div>
              <div className="bg-indigo-50 p-2 rounded-lg">
                <Eye className="text-indigo-600" size={20} />
              </div>
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Content by Type — bar chart */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-sm font-semibold text-gray-900 mb-6">Posts by Content Type</h3>
            {Object.keys(stats.byType).length === 0 ? (
              <div className="flex items-center justify-center h-48 text-gray-400 text-sm italic">No content yet</div>
            ) : (
              <div className="space-y-3">
                {Object.entries(stats.byType)
                  .sort(([, a], [, b]) => b - a)
                  .map(([type, count]) => {
                    const meta = CONTENT_TYPE_META[type] || { label: type, color: "#6b7280", icon: FileText };
                    const Icon = meta.icon;
                    const pct = Math.round((count / maxTypeCount) * 100);
                    return (
                      <div key={type} className="space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span className="flex items-center gap-1.5 font-medium text-gray-700">
                            <Icon size={12} style={{ color: meta.color }} />
                            {meta.label}
                          </span>
                          <span className="font-bold text-gray-900">{count}</span>
                        </div>
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-500"
                            style={{ width: `${pct}%`, backgroundColor: meta.color }}
                          />
                        </div>
                      </div>
                    );
                  })}
              </div>
            )}
          </div>

          {/* Content distribution donut-style summary */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-sm font-semibold text-gray-900 mb-6">Content Distribution</h3>
            {stats.totalPosts === 0 ? (
              <div className="flex items-center justify-center h-48 text-gray-400 text-sm italic">No content yet</div>
            ) : (
              <div className="space-y-2">
                {Object.entries(stats.byType)
                  .sort(([, a], [, b]) => b - a)
                  .map(([type, count]) => {
                    const meta = CONTENT_TYPE_META[type] || { label: type, color: "#6b7280", icon: FileText };
                    const pct = ((count / stats.totalPosts) * 100).toFixed(1);
                    return (
                      <div key={type} className="flex items-center justify-between p-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: meta.color }} />
                          <span className="text-sm text-gray-700">{meta.label}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-xs text-gray-400">{pct}%</span>
                          <span className="text-sm font-bold text-gray-900 w-6 text-right">{count}</span>
                        </div>
                      </div>
                    );
                  })}
                <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 border border-gray-200 mt-2">
                  <span className="text-sm font-semibold text-gray-700">Total</span>
                  <span className="text-sm font-bold text-gray-900">{stats.totalPosts}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
