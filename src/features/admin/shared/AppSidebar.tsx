import { Link, useLocation } from "react-router-dom";
import {
  Home, BarChart3, BookOpen, Users, Tag,
  MessageSquare, Bell, Settings,
} from "lucide-react";
import {
  Sidebar, SidebarContent, SidebarFooter, SidebarGroup,
  SidebarGroupContent, SidebarGroupLabel, SidebarHeader,
  SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarSeparator,
} from "@/components/ui/sidebar";
import { useAuthStore } from "@/store/authStore";

const NAV = [
  {
    section: "Overview",
    items: [
      { path: "/admin/dashboard", label: "Dashboard", icon: Home },
      { path: "/admin/analytics", label: "Analytics", icon: BarChart3 },
    ],
  },
  {
    section: "Content",
    items: [
      { path: "/admin/library", label: "Library", icon: BookOpen },
      { path: "/admin/authors", label: "Authors", icon: Users },
      { path: "/admin/categories", label: "Categories", icon: Tag },
      { path: "/admin/submissions", label: "Submissions", icon: MessageSquare },
    ],
  },
  {
    section: "System",
    items: [
      { path: "/admin/notifications", label: "Notifications", icon: Bell },
      { path: "/admin/users", label: "User Management", icon: Users },
      { path: "/admin/settings", label: "Settings", icon: Settings },
    ],
  },
];

export function AppSidebar() {
  const location = useLocation();
  const user = useAuthStore((s) => s.user);

  return (
    <Sidebar collapsible="icon">
      {/* Logo */}
      <SidebarHeader className="border-b border-sidebar-border px-4 py-3">
        <Link to="/" className="flex items-center gap-2 min-w-0">
          <img
            src="/images/DQ Logo White.svg"
            alt="DQ"
            className="h-7 shrink-0"
            onError={(e) => { e.currentTarget.style.display = "none"; }}
          />
          <span className="font-heading font-bold text-sm text-sidebar-foreground/70 truncate group-data-[collapsible=icon]:hidden">
            Admin
          </span>
        </Link>
      </SidebarHeader>

      <SidebarContent>
        {NAV.map((section, i) => (
          <SidebarGroup key={section.section}>
            {i > 0 && <SidebarSeparator />}
            <SidebarGroupLabel>{section.section}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const active = location.pathname === item.path;
                  return (
                    <SidebarMenuItem key={item.path}>
                      <SidebarMenuButton asChild isActive={active} tooltip={item.label}>
                        <Link to={item.path}>
                          <Icon />
                          <span>{item.label}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      {/* User footer */}
      {user && (
        <SidebarFooter className="border-t border-sidebar-border">
          <div className="flex items-center gap-2 px-2 py-2 min-w-0">
            <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xs shrink-0">
              {user.name?.[0]?.toUpperCase() ?? user.email?.[0]?.toUpperCase() ?? "A"}
            </div>
            <div className="flex-1 min-w-0 group-data-[collapsible=icon]:hidden">
              <p className="text-xs font-semibold text-sidebar-foreground truncate">{user.name || user.email}</p>
              <p className="text-[10px] text-sidebar-foreground/60 capitalize">{user.role ?? "admin"}</p>
            </div>
          </div>
        </SidebarFooter>
      )}
    </Sidebar>
  );
}
