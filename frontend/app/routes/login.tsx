import type { Route } from "./+types/login";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Login" },
  ];
}

export default function Index() {
  return <div className="center">
    ini di login
  </div>;
}
