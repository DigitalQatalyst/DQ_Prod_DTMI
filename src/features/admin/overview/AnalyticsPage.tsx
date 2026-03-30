import {
  BookOpen,
  Eye,
  FileText,
  Newspaper,
  Mic,
  Book,
  Briefcase,
  User,
  TrendingUp,
  FlaskConical,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import AdminLayout from "../shared/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";

// ── Type metadata ─────────────────────────────────────────────────────────────
const TYPE_META: Record<
  string,
  { label: string; color: string; icon: React.ElementType }
> = {
  blog: { label: "Blog Post", color: "#6366f1", icon: BookOpen },
  article: { label: "Article", color: "#3b82f6", icon: Newspaper },
  "future-insight": {
    label: "Future Insight",
    color: "#8b5cf6",
    icon: TrendingUp,
  },
  whitepaper: { label: "Whitepaper", color: "#0ea5e9", icon: Book },
  "research-report": {
    label: "Research Report",
    color: "#8b5cf6",
    icon: FlaskConical,
  },
  "case-study": { label: "Case Study", color: "#f59e0b", icon: Briefcase },
  "expert-interview": {
    label: "Expert Interview",
    color: "#10b981",
    icon: User,
  },
  podcast: { label: "Podcast", color: "#f97316", icon: Mic },
};

// ── Data fetching ─────────────────────────────────────────────────────────────
async function fetchAnalytics() {
  const [{ data: posts }, { count: categories }] = await Promise.all([
    supabase.from("content_items").select("type"),
    supabase.from("categories").select("*", { count: "exact", head: true }),
  ]);

  const byType: Record<string, number> = {};
  (posts || []).forEach((p) => {
    const t = (p.type || "blog").toLowerCase();
    byType[t] = (byType[t] || 0) + 1;
  });

  return {
    totalPosts: posts?.length ?? 0,
    totalCategories: categories ?? 0,
    byType,
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

// ── Page ──────────────────────────────────────────────────────────────────────
export default function AnalyticsPage() {
  const [dateRange, setDateRange] = useState("30");
  const { data, isLoading } = useQuery({
    queryKey: ["admin-analytics", dateRange],
    queryFn: fetchAnalytics,
    staleTime: 5 * 60 * 1000,
  });

  const maxCount = Math.max(...Object.values(data?.byType ?? {}), 1);
  const isEmptyContent = (data?.totalPosts ?? 0) === 0;

  const renderDistributionList = () => (
    <div className="space-y-2">
      {Object.entries(data!.byType)
        .sort(([, a], [, b]) => b - a)
        .map(([type, count]) => {
          const meta = TYPE_META[type] ?? {
            label: type,
            color: "#6b7280",
            icon: FileText,
          };
          const pct = ((count / data!.totalPosts) * 100).toFixed(1);
          return (
            <div
              key={type}
              className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-3 h-3 rounded-full shrink-0"
                  style={{ backgroundColor: meta.color }}
                />
                <span className="text-sm text-foreground">{meta.label}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-muted-foreground">{pct}%</span>
                <span className="text-sm font-bold text-foreground w-6 text-right">
                  {count}
                </span>
              </div>
            </div>
          );
        })}
      <div className="flex items-center justify-between p-3 rounded-lg bg-muted border border-border mt-2">
        <span className="text-sm font-semibold text-foreground">Total</span>
        <span className="text-sm font-bold text-foreground">
          {data!.totalPosts}
        </span>
      </div>
    </div>
  );

  const renderTypeBreakdown = () => {
    if (isLoading) {
      return (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-8 w-full" />
          ))}
        </div>
      );
    }

    if (isEmptyContent) {
      return (
        <p className="text-sm text-muted-foreground italic text-center py-12">
          No content yet
        </p>
      );
    }

    return (
      <div className="space-y-3">
        {Object.entries(data!.byType)
          .sort(([, a], [, b]) => b - a)
          .map(([type, count]) => {
            const meta = TYPE_META[type] ?? {
              label: type,
              color: "#6b7280",
              icon: FileText,
            };
            const Icon = meta.icon;
            const pct = Math.round((count / maxCount) * 100);
            return (
              <div key={type} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="flex items-center gap-1.5 font-medium text-foreground">
                    <Icon className="h-3 w-3" style={{ color: meta.color }} />
                    {meta.label}
                  </span>
                  <span className="font-bold text-foreground">{count}</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${pct}%`,
                      backgroundColor: meta.color,
                    }}
                  />
                </div>
              </div>
            );
          })}
      </div>
    );
  };

  const renderDistributionContent = () => {
    if (isLoading) {
      return (
        <div className="space-y-2">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-12 w-full rounded-lg" />
          ))}
        </div>
      );
    }

    if (isEmptyContent) {
      return (
        <p className="text-sm text-muted-foreground italic text-center py-12">
          No content yet
        </p>
      );
    }

    return renderDistributionList();
  };

  const actions = (
    <Select value={dateRange} onValueChange={setDateRange}>
      <SelectTrigger className="w-36 h-8 text-xs">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="7">Last 7 Days</SelectItem>
        <SelectItem value="30">Last 30 Days</SelectItem>
        <SelectItem value="90">Last 90 Days</SelectItem>
        <SelectItem value="365">Last Year</SelectItem>
      </SelectContent>
    </Select>
  );

  return (
    <AdminLayout title="Analytics & Reports" actions={actions}>
      <div className="space-y-6">
        <p className="text-sm text-muted-foreground flex items-center gap-2">
          <TrendingUp className="h-4 w-4" />
          Content Performance Overview
        </p>

        {/* Stat cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatCard
            label="Total Published Posts"
            value={data?.totalPosts ?? 0}
            icon={FileText}
          />
          <StatCard
            label="Content Categories"
            value={data?.totalCategories ?? 0}
            icon={BookOpen}
          />
          <StatCard
            label="Content Types in Use"
            value={Object.keys(data?.byType ?? {}).length}
            icon={Eye}
          />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Bar chart */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-semibold">
                Posts by Content Type
              </CardTitle>
            </CardHeader>
            <CardContent>{renderTypeBreakdown()}</CardContent>
          </Card>

          {/* Distribution list */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-semibold">
                Content Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>{renderDistributionContent()}</CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}
