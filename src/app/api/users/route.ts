import { createUser, getUserByUsername } from "@/data/user";
import bcrypt from 'bcryptjs'
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const session = await getAuthSession()
    if (!session?.user || session.user.role !== 'ADMIN') return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );

    const { name, username, password, role } = await request.json()

    // Check if username already exists
    const existingUser = await getUserByUsername(username)

    if (existingUser) return NextResponse.json(
      { error: 'Username already exists' },
      { status: 400 }
    )

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create new user
    const newUser = await createUser(
      {
        username,
        password: hashedPassword,
        name,
        role
      }
    )
    return NextResponse.json(newUser)
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}