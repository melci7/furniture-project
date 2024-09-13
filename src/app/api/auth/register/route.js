import { NextResponse } from "next/server"
import { createUser, getUserByEmail } from "@/lib/userService"

export async function POST(request) {
  try {
    const { name, email, password } = await request.json()

    console.log("Received registration request for:", email)

    // Check if all required fields are present
    if (!name || !email || !password) {
      console.log("Missing required fields")
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      )
    }

    // Create new user (getUserByEmail check is now handled within createUser)
    console.log("Attempting to create new user:", email)
    const user = await createUser({ name, email, password })

    console.log("User created successfully:", user)
    return NextResponse.json(
      { message: "User created successfully", user },
      { status: 201 }
    )
  } catch (error) {
    console.error("Server error during registration:", error)

    if (error.message === "User with this email already exists") {
      return NextResponse.json(
        { message: "User with this email already exists" },
        { status: 409 }
      )
    }

    return NextResponse.json(
      { message: "Error creating user", error: error.message },
      { status: 500 }
    )
  }
}
