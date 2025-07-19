import { z } from "zod";
import { loginSchema } from "./schemas"; 


export type LoginDTO = z.infer<typeof loginSchema>; 

export interface User {
  id: string;
  email: string;
  role: "USER" | "ADMIN";
}


export interface LoginResponse {
  user: User;
  token?: string;
}
