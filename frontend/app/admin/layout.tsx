import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AdminSidebar } from "./admin-sidebar";
import { DashboardHeader } from "@/components/dashboard-header";


export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <SidebarProvider>
      <AdminSidebar />
      <SidebarInset>
        <DashboardHeader />
        <main className="p-4">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
