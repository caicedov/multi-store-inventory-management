import { object, string } from "zod";

export const signInSchema = object({
  username: string({ required_error: "El nombre de usuario es requerido" })
    .min(2, "El nombre de usuario debe tener al menos 2 caracteres")
    .max(50, "El nombre de usuario debe tener como máximo 50 caracteres"),
  password: string({ required_error: "La contraseña es requerida" })
    .min(1, "La contraseña es requerida")
    .min(4, "La contraseña debe tener al menos 4 caracteres")
    .max(50, "La contraseña debe tener como máximo 50 caracteres"),
})