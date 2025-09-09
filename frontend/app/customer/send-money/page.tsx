import { Metadata } from "next";
import { SendMoneyForm } from "./send-money-form";

export const metadata: Metadata = {
  title: "Send Money",
}

export default function SendMoney() {
  return (
    <>
      <SendMoneyForm />
    </>
  );
}
