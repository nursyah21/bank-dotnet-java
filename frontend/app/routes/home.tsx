import { DataTable } from "~/components/data-table"
import { SectionCards } from "~/components/section-cards"

import { CustomerLayout } from "~/components/layouts/customer-layout"
import data from "../dashboard/data.json"
import type { Route } from "./+types/home"

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Home" },
  ];
}

export default function Page() {
  return (
    <CustomerLayout>
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <SectionCards />
            <DataTable data={data} />
          </div>
        </div>
      </div>
    </CustomerLayout>
  )
}
