import { Link } from "react-router-dom";
import {
  BookOpen,
  Users,
  FileText,
  UserCheck,
  TrendingUp,
  Loader2,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import AdminLayout from "../shared/AdminLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

// ── Data fetching ─────────────────────────────────────────────────────────────
async function fetchDashboardStats() {
  const [{ count: posts }, { count: categories }, { data: users }] =
    await Promise.all([
      supabase
        .from("content_items")
        .select("*", { count: "exact", head: true }),
      supabase.from("categories").select("*", { count: "exact", head: true }),
      supabase
        .from("users")
        .select("id, email, name, role, is_active, created_at")
        .order("created_at", { ascending: false }),
    ]);

  const allUsers = users || [];
  return {
    publishedPosts: posts ?? 0,
    totalCategories: categories ?? 0,
    totalUsers: allUsers.length,
    activeUsers: allUsers.filter((u) => u.is_active).length,
    recentUsers: allUsers.slice(0, 5),
  };
}

// ── Stat card ─────────────────────────────────────────────────────────────────
function StatCard({
  label,
  value,
  icon: Icon,
}: Readonly<{
  label: string;
  value: number;
  icon: React.ElementType;
}>) {
  return (
    <Card className="border-r-[3px] border-r-secondary">
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-2xl font-bold text-foreground">{value}</p>
            <p className="text-xs text-muted-foreground mt-1">{label}</p>
          </div>
          <div className="bg-primary/10 p-2 rounded-lg">
            <Icon className="h-5 w-5 text-primary" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// ── Quick action item ─────────────────────────────────────────────────────────
function QuickAction({
  to,
  icon: Icon,
  label,
  description,
}: Readonly<{
  to: string;
  icon: React.ElementType;
  label: string;
  description: string;
}>) {
  return (
    <Link
      to={to}
      className="flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-primary/5 hover:border-primary/20 transition-all group"
    >
      <div className="bg-primary/10 p-2 rounded-lg group-hover:bg-primary/20 transition-colors shrink-0">
        <Icon className="h-4 w-4 text-primary" />
      </div>
      <div>
        <p className="text-sm font-semibold text-foreground">{label}</p>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
    </Link>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function DashboardPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["admin-dashboard"],
    queryFn: fetchDashboardStats,
    staleTime: 2 * 60 * 1000,
  });

  const actions = (
    <Button asChild variant="outline" size="sm">
      <Link to="/admin/analytics">
        <TrendingUp className="mr-2 h-4 w-4" />
        View Analytics
      </Link>
    </Button>
  );

  let recentUsersContent: React.ReactNode;
  if (isLoading) {
    recentUsersContent = (
      <CardContent className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </CardContent>
    );
  } else if (data?.recentUsers.length) {
    recentUsersContent = (
      <div className="divide-y divide-border">
        {data.recentUsers.map((user) => (
          <div
            key={user.id}
            className="flex items-center gap-3 px-6 py-3 hover:bg-muted/50 transition-colors"
          >
            <div className="w-9 h-9 rounded-full bg-muted border border-border flex items-center justify-center text-foreground font-bold text-sm shrink-0">
              {(user.name || user.email)[0].toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-foreground truncate">
                {user.name || user.email}
              </p>
              <p className="text-xs text-muted-foreground capitalize">
                {user.role}
              </p>
            </div>
            <Badge
              variant="outline"
              className={
                user.role === "admin"
                  ? "border-primary/30 text-primary bg-primary/5"
                  : "border-border text-muted-foreground"
              }
            >
              {user.role}
            </Badge>
          </div>
        ))}
      </div>
    );
  } else {
    recentUsersContent = (
      <CardContent className="text-center py-12">
        <p className="text-xs text-muted-foreground italic">No users yet.</p>
      </CardContent>
    );
  }

  return (
    <AdminLayout title="Dashboard" actions={actions}>
      <div className="space-y-6">
        {/* Sub-header */}
        <div>
          <p className="text-sm text-muted-foreground">
            Content management at a glance.
          </p>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            label="Published Posts"
            value={data?.publishedPosts ?? 0}
            icon={BookOpen}
          />
          <StatCard
            label="Categories"
            value={data?.totalCategories ?? 0}
            icon={FileText}
          />
          <StatCard
            label="Active Users"
            value={data?.activeUsers ?? 0}
            icon={UserCheck}
          />
          <StatCard
            label="Total Users"
            value={data?.totalUsers ?? 0}
            icon={Users}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Quick Actions */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <QuickAction
                to="/admin/library/new"
                icon={BookOpen}
                label="Create New Post"
                description="Blog, article, research, whitepaper and more"
              />
              <QuickAction
                to="/admin/authors"
                icon={Users}
                label="Manage Authors"
                description="Add or update author profiles"
              />
              <QuickAction
                to="/admin/categories"
                icon={FileText}
                label="Manage Categories"
                description="Organise content taxonomy"
              />
              <QuickAction
                to="/admin/users"
                icon={UserCheck}
                label="User Management"
                description="Manage admin access and roles"
              />
            </CardContent>
          </Card>

          {/* Recent Users */}
          <Card>
            <CardHeader className="pb-0 flex flex-row items-center justify-between">
              <CardTitle className="text-base">Recent Users</CardTitle>
              <Link
                to="/admin/users"
                className="text-xs text-muted-foreground hover:text-primary underline underline-offset-4 transition-colors"
              >
                View All
              </Link>
            </CardHeader>
            <Separator className="mt-4" />
            {recentUsersContent}
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}
