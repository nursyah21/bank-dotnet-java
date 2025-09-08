"use client"

import { Breadcrumb } from "@/components/ui/breadcrumb";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { getLastPathSegment } from "@/lib/utils";
import { Separator } from "@radix-ui/react-separator";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";

export function DashboardHeader() {
  const pathname = usePathname()

  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b">
      <div className="flex w-full items-center gap-2 px-3">
        <SidebarTrigger />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <div className="flex-grow">
          <Breadcrumb>
            <Link href={pathname}>
              {getLastPathSegment(pathname)}
            </Link>
          </Breadcrumb>
        </div>
        <form action="/api/logout" method="post" className="ml-auto">
          <Button type="submit" variant={"ghost"}>
            <LogOut className="ml-auto size-4" />
          </Button>
        </form>
      </div>
    </header>
  )
}