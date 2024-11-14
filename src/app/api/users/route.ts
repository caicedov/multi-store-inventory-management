import userService from "@/services/userService";
import type { Role } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const skip = Number(searchParams.get('skip')) || 0
  const take = Number(searchParams.get('take')) || 10
  const search = searchParams.get('search') || undefined
  const role = searchParams.get('role') as Role || undefined

  try {
    const {
      users, total, hasMore
    } = await userService.getUsers({ skip, take, search, role })
    return NextResponse.json({ users, total, hasMore }, { status: 200 })
  } catch (_error) {
    return NextResponse.json({ error: 'Error fetching users' }, { status: 500 })
  }
}