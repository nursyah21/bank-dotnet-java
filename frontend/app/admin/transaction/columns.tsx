"use client"

import { ColumnDef } from "@tanstack/react-table"

export type Transaction = {
  id: string,
  type: string,
  amount: number,
  sender_id: string,
  receiver_id: string,
  created_at: string
}

export const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"))
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount)
    },
  },
  {
    accessorKey: "receiver_id",
    header: "Receiver ID",
  },
  {
    accessorKey: "sender_id",
    header: "Receiver ID",
  },
  {
    accessorKey: "created_at",
    header: "Created At",
    cell: ({ row }) => {
      const created_at = String(row.getValue("created_at"))
      return created_at.replace(/[TZ]/g, " ")
    }
  },
]
