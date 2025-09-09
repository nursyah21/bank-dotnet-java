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

const withdrawalSchema = z.object({
  amount: z
    .number()
    .min(10, {
      message: "Minimum withdrawal amount is 10.",
    })
});

type WithdrawalFormInputs = z.infer<typeof withdrawalSchema>

export function WithdrawalForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter()
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<WithdrawalFormInputs>({
    resolver: zodResolver(withdrawalSchema),
  })

  const onSubmit = async (data: WithdrawalFormInputs) => {
    setErrorMessage(null);

    try {
      const response = await fetch('/api/customer/withdrawal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: data.amount,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        console.log("Withdrawal successful!", result);
        router.push("/customer/transaction");
      } else {
        setErrorMessage(result.message || "Withdrawal failed. Please try again.");
      }
    } catch (error) {
      console.error("Withdrawal error:", error);
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
                  {isSubmitting ? "Withdrawal..." : "Withrawal"}
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
