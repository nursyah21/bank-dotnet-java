import {
  IconLogout
} from "@tabler/icons-react"
import { Link } from "react-router"

import {
  SidebarMenu,
  SidebarMenuItem,
  useSidebar
} from "~/components/ui/sidebar"

export function NavUser({
  user,
}: {
  user: {
    name: string
    email: string
  }
}) {
  const { isMobile } = useSidebar()

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <div className="flex items-center mb-4 gap-2 px-4 text-left text-sm">
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-medium">{user.name}</span>
            <span className="text-muted-foreground truncate text-xs">
              {user.email}
            </span>
          </div>
          <Link to={'/logout'}>
            <IconLogout className="ml-auto size-4" />
          </Link>
        </div>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
