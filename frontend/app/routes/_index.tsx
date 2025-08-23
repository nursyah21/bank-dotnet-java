import type { Route } from "./+types/_index";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Home" },
  ];
}

export default function Index() {
  
  return <div className="center">
    ini di index
  </div>;
}
