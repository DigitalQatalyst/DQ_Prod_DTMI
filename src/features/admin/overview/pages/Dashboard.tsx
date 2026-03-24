import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AppLayout from "../../shared/components/AppLayout";
import { getAdminUsers } from "../../../../services/adminUserService";
import type { AdminUser } from "../../../../types/admin";
import { useAuth } from "../../../../shared/Header/context/AuthContext";
import {
  TrendingUp as TrendingUpIcon,
  Loader,
  FileText,
  UserCheck,
  BookOpen,
  Users,
} from "lucide-react";
import { Toast, ToastType } from "../../shared/components/Toast";
import { blogService, categoryService } from "../../shared/utils/supabase";

interface DashboardStats {
  totalUsers: number;
  activeUsers: number;
  publishedPosts: number;
  totalCategories: number;
}

const Dashboard: React.FC = () => {
  const { isAdmin } = useAuth();
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    activeUsers: 0,
    publishedPosts: 0,
    totalCategories: 0,
  });
  const [recentUsers, setRecentUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const [usersResult, postsResult, categoriesResult] = await Promise.all([
        getAdminUsers(),
        blogService.getBlogs(),
        categoryService.getCategories(),
      ]);

      if (!usersResult.error && usersResult.data) {
        const users = usersResult.data;
        const sorted = [...users].sort(
          (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
        );
        setRecentUsers(sorted.slice(0, 5));
        setStats((prev) => ({
          ...prev,
          totalUsers: users.length,
          activeUsers: users.filter((u) => u.is_active).length,
        }));
      }

      if (postsResult) {
        setStats((prev) => ({ ...prev, publishedPosts: postsResult.length }));
      }

      if (categoriesResult) {
        setStats((prev) => ({ ...prev, totalCategories: categoriesResult.length }));
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppLayout title="Dashboard">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-gray-100">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Overview</h2>
            <p className="text-sm text-gray-500">Content management at a glance.</p>
          </div>
          <Link
            to="/admin-ui/analytics"
            className="inline-flex items-center px-4 py-2 bg-white border border-gray-200 text-black text-xs font-medium rounded-md hover:bg-gray-50 transition-colors shadow-sm"
          >
            <TrendingUpIcon className="w-4 h-4 mr-2" />
            View Analytics
          </Link>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl border border-gray-200 p-4 border-r-[3px] border-r-[#030F35]">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-2xl font-semibold text-gray-900">{stats.publishedPosts}</div>
                <div className="text-xs text-gray-500 mt-1">Published Posts</div>
              </div>
              <div className="bg-indigo-50 p-2 rounded-lg">
                <BookOpen className="text-indigo-600" size={20} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-4 border-r-[3px] border-r-[#030F35]">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-2xl font-semibold text-gray-900">{stats.totalCategories}</div>
                <div className="text-xs text-gray-500 mt-1">Categories</div>
              </div>
              <div className="bg-indigo-50 p-2 rounded-lg">
                <FileText className="text-indigo-600" size={20} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-4 border-r-[3px] border-r-[#030F35]">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-2xl font-semibold text-gray-900">{stats.activeUsers}</div>
                <div className="text-xs text-gray-500 mt-1">Active Users</div>
              </div>
              <div className="bg-indigo-50 p-2 rounded-lg">
                <UserCheck className="text-indigo-600" size={20} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-4 border-r-[3px] border-r-[#030F35]">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-2xl font-semibold text-gray-900">{stats.totalUsers}</div>
                <div className="text-xs text-gray-500 mt-1">Total Users</div>
              </div>
              <div className="bg-indigo-50 p-2 rounded-lg">
                <Users className="text-indigo-600" size={20} />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Quick Actions */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <Link to="/admin-ui/media/new"
                className="flex items-center gap-3 p-3 rounded-lg border border-gray-100 hover:bg-indigo-50 hover:border-indigo-100 transition-all group">
                <div className="bg-indigo-50 p-2 rounded-lg group-hover:bg-indigo-100 transition-colors">
                  <BookOpen className="text-indigo-600" size={16} />
                </div>
                <div>
                  <div className="text-sm font-semibold text-gray-900">Create New Post</div>
                  <div className="text-xs text-gray-500">Blog, article, research, whitepaper and more</div>
                </div>
              </Link>
              <Link to="/admin-ui/authors"
                className="flex items-center gap-3 p-3 rounded-lg border border-gray-100 hover:bg-indigo-50 hover:border-indigo-100 transition-all group">
                <div className="bg-indigo-50 p-2 rounded-lg group-hover:bg-indigo-100 transition-colors">
                  <Users className="text-indigo-600" size={16} />
                </div>
                <div>
                  <div className="text-sm font-semibold text-gray-900">Manage Authors</div>
                  <div className="text-xs text-gray-500">Add or update author profiles</div>
                </div>
              </Link>
              <Link to="/admin-ui/categories"
                className="flex items-center gap-3 p-3 rounded-lg border border-gray-100 hover:bg-indigo-50 hover:border-indigo-100 transition-all group">
                <div className="bg-indigo-50 p-2 rounded-lg group-hover:bg-indigo-100 transition-colors">
                  <FileText className="text-indigo-600" size={16} />
                </div>
                <div>
                  <div className="text-sm font-semibold text-gray-900">Manage Categories</div>
                  <div className="text-xs text-gray-500">Organise content taxonomy</div>
                </div>
              </Link>
              <Link to="/admin-ui/users"
                className="flex items-center gap-3 p-3 rounded-lg border border-gray-100 hover:bg-indigo-50 hover:border-indigo-100 transition-all group">
                <div className="bg-indigo-50 p-2 rounded-lg group-hover:bg-indigo-100 transition-colors">
                  <UserCheck className="text-indigo-600" size={16} />
                </div>
                <div>
                  <div className="text-sm font-semibold text-gray-900">User Management</div>
                  <div className="text-xs text-gray-500">Manage admin access and roles</div>
                </div>
              </Link>
            </div>
          </div>

          {/* Recent Users */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
              <h3 className="font-semibold text-gray-900">Recent Users</h3>
              <Link to="/admin-ui/users"
                className="text-gray-500 hover:text-black text-xs font-medium underline underline-offset-4">
                View All
              </Link>
            </div>

            {loading ? (
              <div className="p-12 flex items-center justify-center text-gray-400">
                <Loader className="animate-spin" size={32} />
              </div>
            ) : recentUsers.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-400 text-xs italic">No users yet.</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {recentUsers.map((user) => (
                  <div key={user.id} className="px-6 py-4 hover:bg-gray-50/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 font-bold text-sm border border-gray-200 shrink-0">
                        {user.email[0].toUpperCase()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-semibold text-gray-900 truncate">{user.email}</h4>
                        <div className="text-xs text-gray-500">{user.role}</div>
                      </div>
                      <span className={`px-2 py-1 rounded-lg text-xs font-medium capitalize border shrink-0 ${
                        user.role === "super_admin"
                          ? "bg-purple-50 text-purple-700 border-purple-100"
                          : user.role === "admin"
                          ? "bg-indigo-50 text-indigo-700 border-indigo-100"
                          : "bg-gray-50 text-gray-700 border-gray-100"
                      }`}>
                        {user.role.replace("_", " ")}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
      )}
    </AppLayout>
  );
};

export default Dashboard;
