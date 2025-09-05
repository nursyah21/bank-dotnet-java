import { redirect } from "react-router";
import type { Route } from "./+types/_index";
export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Home" },
  ];
}

export function clientLoader() {
  throw redirect("/home");
}

export default function Index() {
  return <></>;
}
