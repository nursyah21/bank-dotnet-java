import { Link, useLocation } from "react-router"
import { CustomerSidebar } from "~/components/customer-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
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
      title: "Home",
      url: "/home",
    },
    {
      title: "Transaction",
      url: "/home/transaction",
    },
    {
      title: "Send",
      url: "/home/send",
    },
    {
      title: "Withdrawal",
      url: "/home/withdrawal",
    },
  ],
}

const user = {
  name: 'customer',
  email: 'customer@mail.com'
}

export function CustomerLayout({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation()

  const currentBreadcrumb = myNavData.navMain.find(item => item.url === pathname)

  return (
    <SidebarProvider>
      <CustomerSidebar data={myNavData} navuser={
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
