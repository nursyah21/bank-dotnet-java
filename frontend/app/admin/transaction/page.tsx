import { Metadata } from "next";
import { columns } from "./columns";
import { DataTable } from "@/components/data-table";

export const metadata: Metadata = {
  title: "Transaction",
}

async function getData() {
  const data = Array.from({ length: 10 }, () => ({
    id: "1a85f64-5717-4562-b3fc-2c963f66afa6",
    type: "send",
    amount: Math.floor(Math.random() * (1000 - 10 + 1)) + 10,
    receiver_id: "2fa85f64-5717-4562-b3fc-2c963f66afa6",
    sender_id: "54a85f64-5717-4562-b3fc-2c963f66afa6",
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

export default async function AdminTransaction() {
  const { data, total_items, total_pages } = await getData()

  const filterOptions = ["all transaction","send", "receive", "withdrawal"];
  const rows_length = data.length;
  const search_placeholder = "Search transactions...";

  return (
    <>
     <DataTable
      columns={columns}
      data={data}
      total_items={total_items}
      total_pages={total_pages}
      rows_length={rows_length}
      search_placeholder={search_placeholder}
      filter_options={filterOptions}
    />
    </>
  );
}
