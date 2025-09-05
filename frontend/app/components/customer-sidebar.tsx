import * as React from "react"
import { GalleryVerticalEnd } from "lucide-react"
import { useLocation } from "react-router"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "~/components/ui/sidebar"
import { cn } from "~/lib/utils"
import { Link } from "react-router"

interface CustomerSidebarProps extends React.ComponentProps<typeof Sidebar> {
  data: {
    navMain: {
      title: string;
      url: string;
      items?: { title: string; url: string; isActive?: boolean }[];
    }[];
  };
}

export function CustomerSidebar({ data, ...props }: CustomerSidebarProps) {
  const { pathname } = useLocation()

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link to="/" className="flex items-center gap-2 font-medium">
                <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
                  <GalleryVerticalEnd className="size-4" />
                </div>
                Bank Acme Inc.
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {data.navMain.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  asChild
                  data-active={pathname === item.url}
                  className={cn(
                    "font-medium",
                    pathname === item.url
                  )}
                >
                  <Link to={item.url}>{item.title}</Link>
                </SidebarMenuButton>
                {/* @ts-ignore */}
                {item.items?.length ? (
                  <SidebarMenuSub>
                    {/* @ts-ignore */}
                    {item.items.map((subItem) => (
                      <SidebarMenuSubItem key={subItem.title}>
                        <SidebarMenuSubButton asChild isActive={subItem.isActive}>
                          <Link to={subItem.url}>{subItem.title}</Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                ) : null}
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
        {props.navuser}
      <SidebarRail />
    </Sidebar>
  )
}