// src/hooks/useLogin.ts
import { useRef } from "react";
import { useNavigate } from "react-router";
import apiService from "~/services/apiService";

export function useLogin() {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;

    if (!username || !password) {
      console.error("Username and password are required.");
      return;
    }

    try {
      const response = await apiService.auth.login(username, password);
      
      if (response) {
        console.log("Login successful!");
        navigate("/");
      } else {
        console.error("Login failed:", response);
      }
    } catch (e) {
      console.error("An unexpected error occurred during login:", e);
    }
  };

  return { usernameRef, passwordRef, handleLogin };
}