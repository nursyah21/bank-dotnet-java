import { Metadata } from "next";
import { columns } from "./columns";
import { DataTable } from "@/components/data-table";
import { Suspense } from "react";
import { Loading } from "@/components/loading";

export const metadata: Metadata = {
  title: "Transaction",
}

async function getData() {
  const data = Array.from({ length: 10 }, () => ({
    id: "2fa85f64-5717-4562-b3fc-2c963f66afa6",
    no_id: "2fa85f64-5717-4562-b3fc-2c963f66afa6",
    username: "andi",
    email: "andi@mail",
    birth_date: "2000-12-30",
    balance: 300,
    created_at: "2024-05-18T10:00:00Z"
  })
  )

  return {
    data,
    current_page: 1,
    total_items: 100,
    total_pages: 10
  }

}

export default async function AdminCustomer() {
  const { data, total_items, total_pages } = await getData()

  const rows_length = data.length;
  const search_placeholder = "Search transactions...";

  return (
    <>
      <Suspense fallback={<Loading />}>
        <DataTable
          columns={columns}
          data={data}
          total_items={total_items}
          total_pages={total_pages}
          rows_length={rows_length}
          search_placeholder={search_placeholder}
        />
      </Suspense>
    </>
  );
}
