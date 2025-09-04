import { useEffect } from "react";
import type { Route } from "./+types/login";
import apiService from "~/services/apiService";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Login" },
  ];
}

export default function Login() {
  useEffect(()=>{
    async function i(){
      await apiService.auth.login("admin", "password").then(e=>console.log(e))
    }
    i()
  },[])

  return <div className="flex h-screen items-center justify-center">
    {/* buat navbar */}
    {/* buat form yg berisi input username, password */}
  </div>;
}
