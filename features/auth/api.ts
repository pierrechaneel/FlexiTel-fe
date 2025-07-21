import { API_URL } from "@/common/constants/api";
import type { LoginDTO, LoginResponse } from "./types";
import { SignupDTO } from "./schemas";

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