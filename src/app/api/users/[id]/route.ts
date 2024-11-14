import userService from "@/services/userService";
import { NextResponse } from "next/server";

export async function GET(_request: Request, { params }: { params: { id: string } }) {
  try {
    const user = await userService.getUserById(params.id)
    if (!user) return { status: 404, body: { message: 'User not found' } }
    return NextResponse.json(user, { status: 200 })
  } catch (_error) {
    return NextResponse.json({ error: 'Error fetching user' }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const userData = await request.json()
    const user = await userService.updateUser(params.id, userData)
    return NextResponse.json(user, { status: 200 })
  } catch (_error) {
    return NextResponse.json({ error: 'Error updating user' }, { status: 500 })
  }
}