"use client";

import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { NavBar } from "@/components/nav-bar";
import QueryProvider from "./provider/queryProvider";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <TooltipProvider>
        <AppSidebar />
        <main className="w-full h-[100vh] overflow-hidden">
          <NavBar />
          <QueryProvider>
            {children}
          </QueryProvider>
        </main>
      </TooltipProvider>
    </SidebarProvider>
  );
}
