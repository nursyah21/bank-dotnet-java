import { RegisterForm } from "~/components/register-form";
import type { Route } from "./+types/register";
import { AuthLayout } from "~/components/layouts/auth-layout";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Register" },
  ];
}


export default function Page() {
  return (
    <AuthLayout>
      <RegisterForm />
    </AuthLayout>
  )
}
