import { API_URL } from "@/common/constants/api";
import type { LoginDTO, LoginResponse } from "./types";
import { SignupDTO } from "./schemas";
import { redirect } from "next/navigation";

export async function login(data: LoginDTO) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
    credentials: "include",
  });
  return res;
}


export async function signup(dto: SignupDTO) {
  return fetch(`${API_URL}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dto),
    credentials: "include",          
  });
}


export async function fetchCurrentUser(token?: string) {
  const res = await fetch(`${API_URL}/users/me`, {
    credentials: "include",
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  })
  if (!res.ok) throw new Error("Impossible de récupérer le profil")
  return res.json() as Promise<{
    userId: string
    email: string
    firstName?: string
    lastName?: string
    role: "USER" | "ADMIN"
  }>
}


export async function logout() {
  return fetch(`${API_URL}/auth/logout`, {
    method: "POST",
    credentials: "include",   
  });
}
