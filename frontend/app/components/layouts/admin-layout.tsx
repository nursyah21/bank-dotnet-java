import { Link, useLocation } from "react-router"
import { SharedSidebar } from "~/components/shared-sidebar"
import {
  Breadcrumb
} from "~/components/ui/breadcrumb"
import { Separator } from "~/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "~/components/ui/sidebar"
import { NavUser } from "../nav-user"

const myNavData = {
  navMain: [
    {
      title: "Admin",
      url: "/admin",
    },
    {
      title: "Transaction",
      url: "/admin/transaction",
    },
    {
      title: "Customer",
      url: "/admin/customer",
    },
    {
      title: "Top Up Customer",
      url: "/admin/top-up-customer",
    },
  ],
}

const user = {
  name: 'admin',
  email: 'admin@mail.com'
}

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation()

  const currentBreadcrumb = myNavData.navMain.find(item => item.url === pathname)

  return (
    <SidebarProvider>
      <SharedSidebar data={myNavData} navuser={
        <NavUser user={user}/>
      } />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b">
          <div className="flex items-center gap-2 px-3">
            <SidebarTrigger />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <Link to={currentBreadcrumb?.url || ""}>
                {currentBreadcrumb?.title}
              </Link>
            </Breadcrumb>
          </div>
        </header>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
