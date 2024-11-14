import userService from "@/services/userService"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const userData = await request.json()
    const user = await userService.createUser(userData)
    return NextResponse.json(user, { status: 201 })
  } catch (_error) {
    return NextResponse.json({ error: 'Error creating user' }, { status: 500 })
  }
}