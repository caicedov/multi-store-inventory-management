import bcrypt from 'bcryptjs'
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10)
  return await bcrypt.hash(password, salt)
}

export const comparePassword = async (plainTextPassword: string, hashedPassword: string): Promise<boolean> => {
  return await bcrypt.compare(plainTextPassword, hashedPassword)
}