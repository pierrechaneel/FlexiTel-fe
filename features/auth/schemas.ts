import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email("Adresse e‑mail invalide"),
  password: z
    .string()
    .min(6, "Le mot de passe doit contenir au moins 6 caractères"),
});


export const signupSchema = z.object({
  email:    z.string().email({ message: "E‑mail invalide" }),
  password: z.string().min(6, { message: "6 caractères minimum" }),
  firstName: z.string().min(2).optional(),
  lastName:  z.string().min(2).optional(),
});

export type SignupDTO = z.infer<typeof signupSchema>;

