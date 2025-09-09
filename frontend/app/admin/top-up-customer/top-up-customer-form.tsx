"use client"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

const topUpCustomerSchema = z.object({
  customer_id: z
    .string()
    .regex(/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/, { 
      message: "Customer ID is not a valid identifier." 
    }),
  amount: z
    .number()
    .min(10, {
      message: "Minimum top up amount is 10.",
    })
});

type TopUpCustomerFormInputs = z.infer<typeof topUpCustomerSchema>

export function TopUpCustomerForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter()

  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TopUpCustomerFormInputs>({
    resolver: zodResolver(topUpCustomerSchema),
  })

  const onSubmit = async (data: TopUpCustomerFormInputs) => {
    setErrorMessage(null);

    try {
      const response = await fetch('/api/admin/top-up', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customer_id: data.customer_id,
          amount: data.amount,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        console.log("Top Up Customer successful!", result);
        router.push("/admin/transaction");
      } else {
        setErrorMessage(result.message || "Top Up Customer failed. Please try again.");
      }
    } catch (error) {
      console.error("Top up customer error:", error);
      setErrorMessage("An unexpected error occurred. Please try again.");
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="customer_id">Customer ID</Label>
                <Input
                  id="customer_id"
                  type="text"
                  placeholder="customer id"
                  {...register("customer_id")}
                />
                {errors.customer_id && (
                  <p className="text-red-500 text-sm mt-1">{errors.customer_id.message}</p>
                )}
              </div>
              <div className="grid gap-3">
                <Label htmlFor="amount">Amount</Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="10"
                  {...register("amount", { valueAsNumber: true })}
                />
                {errors.amount && (
                  <p className="text-red-500 text-sm mt-1">{errors.amount.message}</p>
                )}
              </div>
              {errorMessage && (
                <p className="text-red-500 text-center text-sm">{errorMessage}</p>
              )}
              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? "Top Up..." : "Top Up"}
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
