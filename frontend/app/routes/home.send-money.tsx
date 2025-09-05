import { DataTable } from "~/components/data-table"
import { SectionCards } from "~/components/section-cards"

import data from "../dashboard/data.json"
import type { Route } from "./+types/home.send-money"

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Send Money" },
  ];
}

export default function Page() {
  return (
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
      <SectionCards />
      <DataTable data={data} />
    </div>
  )
}
