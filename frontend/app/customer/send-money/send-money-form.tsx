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

const sendMoneySchema = z.object({
  receiver_id: z
    .string()
    .regex(/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/, { 
      message: "Receiver ID is not a valid identifier." 
    }),
  amount: z
    .number()
    .min(10, {
      message: "Minimum transfer amount is 10.",
    })
});

type SendMoneyFormInputs = z.infer<typeof sendMoneySchema>

export function SendMoneyForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter()
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SendMoneyFormInputs>({
    resolver: zodResolver(sendMoneySchema),
  })

  const onSubmit = async (data: SendMoneyFormInputs) => {
    setErrorMessage(null);

    try {
      const response = await fetch('/api/customer/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          receiver_id: data.receiver_id,
          amount: data.amount,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        console.log("Send money successful!", result);
        router.push("/customer/transaction");
      } else {
        setErrorMessage(result.message || "Send money failed. Please try again.");
      }
    } catch (error) {
      console.error("Send Money error:", error);
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
                <Label htmlFor="receiver_id">Receiver ID</Label>
                <Input
                  id="receiver_id"
                  type="text"
                  placeholder="receiver id"
                  {...register("receiver_id")}
                />
                {errors.receiver_id && (
                  <p className="text-red-500 text-sm mt-1">{errors.receiver_id.message}</p>
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
                  {isSubmitting ? "Sending..." : "Send Money"}
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
