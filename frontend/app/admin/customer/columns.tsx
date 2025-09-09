"use client"

import { ColumnDef } from "@tanstack/react-table"

export type Customer = {
  id: string,
  no_id: string,
  username: string,
  email: string,
  birth_date: string,
  balance: number,
  created_at: string
}

export const columns: ColumnDef<Customer>[] = [
  {
    accessorKey: "no_id",
    header: "No ID",
  },
  {
    accessorKey: "username",
    header: "Username"
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "birth_date",
    header: "Birth Date",
  },
  {
    accessorKey: "balance",
    header: "Balance",
    cell: ({ row }) => {
      const balance = parseFloat(row.getValue("balance"))
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(balance)
    },
  },
  {
    accessorKey: "created_at",
    header: "Created At",
    cell: ({ row }) => {
      const created_at = String(row.getValue("created_at"))
      return created_at.replace(/[TZ]/g, " ")
    },
  },
]
