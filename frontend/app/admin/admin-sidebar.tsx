"use client"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { GalleryVerticalEnd } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const sidebarItems = [
  {
    title: "Transaction",
    url: "/admin/transaction"
  },
  {
    title: "Customer",
    url: "/admin/customer"
  },
  {
    title: "Top Up Customer",
    url: "/admin/top-up-customer"
  },
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="p-2 text-sm">
              <Link href="/" className="flex items-center gap-2 font-medium">
                <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
                  <GalleryVerticalEnd className="size-4" />
                </div>
                Bank Acme Inc.
              </Link>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
        {sidebarItems.map((item) => (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton
              asChild
              data-active={pathname === item.url}
              className={cn(
                "font-medium",
                pathname === item.url
              )}
            >
              <Link href={item.url}>{item.title}</Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
        </SidebarGroup>
        <SidebarGroup />
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}