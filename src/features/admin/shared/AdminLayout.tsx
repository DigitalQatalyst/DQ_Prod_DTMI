import { Link } from "react-router-dom";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { AppSidebar } from "./AppSidebar";

interface AdminLayoutProps {
  children: React.ReactNode;
  title: string;
  actions?: React.ReactNode;
}

export default function AdminLayout({
  children,
  title,
  actions,
}: Readonly<AdminLayoutProps>) {
  return (
    <SidebarProvider>
      <AppSidebar />

      <SidebarInset>
        {/* Top bar */}
        <header className="flex h-14 items-center gap-3 border-b border-border px-4 bg-background sticky top-0 z-10">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="h-5" />
          {/* Breadcrumb-style title */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link
              to="/admin/dashboard"
              className="hover:text-foreground transition-colors"
            >
              Admin
            </Link>
            <span>/</span>
            <span className="text-foreground font-medium">{title}</span>
          </div>
          <div className="ml-auto flex items-center gap-3">{actions}</div>
        </header>

        {/* Page content */}
        <div className="flex-1 p-6 md:p-8 max-w-350 w-full">
          <div className="mb-6">
            <h1 className="font-heading text-2xl font-bold text-foreground">
              {title}
            </h1>
          </div>
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
