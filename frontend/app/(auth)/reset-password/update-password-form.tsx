"use client";

import React, { useState } from 'react';
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

const formSchema = z.object({
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long." })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
      message: "Password must contain at least one lowercase letter, one uppercase letter, one number, and one symbol (@, $, !, %, *, ?, &)."
    }),
  confirm_password: z.string()
}).refine((data) => data.password === data.confirm_password, {
  message: "Passwords do not match.",
  path: ["confirm_password"],
});

type UpdatePasswordFormInputs = z.infer<typeof formSchema>

interface UpdatePasswordFormProps extends React.ComponentProps<"div"> {
  token: string;
}

export function UpdatePasswordForm({ token, className, ...props }: UpdatePasswordFormProps) {
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UpdatePasswordFormInputs>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirm_password: "",
    },
  });

  const onSubmit = async (values: UpdatePasswordFormInputs) => {
    setErrorMessage(null);

    try {
      // Logic untuk mengirim permintaan API ke endpoint reset password
      // dengan menggunakan 'token' dan 'password' baru
      console.log("Token:", token);
      console.log("New Password:", values.password);
      console.log("Confirm Password:", values.confirm_password);

      // Contoh kode API (saat ini dikomentari)
      // const response = await fetch(`/api/auth/reset-password?token=${token}`, {
      //   method: 'PUT',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({ password: values.password }),
      // });

      // if (response.ok) {
      //   router.push("/login?success=password-reset");
      // } else {
      //   const result = await response.json();
      //   setErrorMessage(result.message || "Failed to reset password. Please try again.");
      // }
    } catch (error) {
      console.error("Reset password error:", error);
      setErrorMessage("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Reset your password</CardTitle>
          <CardDescription>
            Enter your new password below.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="password">New Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="new password"
                  {...register("password")}
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                )}
              </div>
              <div className="grid gap-3">
                <Label htmlFor="confirm_password">Confirm Password</Label>
                <Input
                  id="confirm_password"
                  type="password"
                  placeholder="confirm password"
                  {...register("confirm_password")}
                />
                {errors.confirm_password && (
                  <p className="text-red-500 text-sm mt-1">{errors.confirm_password.message}</p>
                )}
              </div>
              {errorMessage && (
                <p className="text-red-500 text-center text-sm">{errorMessage}</p>
              )}
              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? "Updating..." : "Update Password"}
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
