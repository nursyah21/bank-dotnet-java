import { Metadata } from "next";
import { WithdrawalForm } from "./withdrawal-form";

export const metadata: Metadata = {
  title: "Withdrawal",
}

export default function Withdrawal() {
  return (
    <>
      <WithdrawalForm />
    </>
  );
}
