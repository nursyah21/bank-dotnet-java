import { Metadata } from "next";
import { TopUpCustomerForm } from "./top-up-customer-form";

export const metadata: Metadata = {
  title: "Top Up Customer",
}

export default function TopUpCustomer() {
  return (
    <>
      <TopUpCustomerForm />
    </>
  );
}
