import { Outlet } from "react-router";
import { AdminLayout } from "~/components/layouts/admin-layout";
import type { Route } from "./+types/admin";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Admin" },
  ];
}

export default function Page() {
  return (
    <AdminLayout>
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <Outlet />
        </div>
      </div>
    </AdminLayout>
  )
}
