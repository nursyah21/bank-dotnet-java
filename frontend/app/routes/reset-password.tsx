import { ResetPasswordForm } from "~/components/reset-password-form"
import type { Route } from "./+types/reset-password";
import { AuthLayout } from "~/components/layouts/auth-layout";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Reset Password" },
  ];
}


export default function Page() {
  return (
    <AuthLayout>
      <ResetPasswordForm />
    </AuthLayout>
  )
}
