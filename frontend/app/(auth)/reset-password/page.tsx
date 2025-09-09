import { Metadata } from "next";
import { ResetPasswordForm } from "./reset-password-form";
import { UpdatePasswordForm } from "./update-password-form";

export const metadata: Metadata = {
  title: "Reset Password",
};

interface ResetPasswordProps {
  searchParams: {
    token_reset_password?: string;
  };
}

export default function ResetPassword({ searchParams }: ResetPasswordProps) {
  const { token_reset_password } = searchParams;

  return (
    <>
      {token_reset_password ? (
        <UpdatePasswordForm token={token_reset_password} />
      ) : (
        <ResetPasswordForm />
      )}
    </>
  );
}
