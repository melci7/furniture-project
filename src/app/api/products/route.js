// app/api/products/route.js
import { query } from "@/lib/db"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const result = await query("SELECT * FROM products")
    console.log("Database result:", result.rows) // For debugging
    return NextResponse.json(result.rows)
  } catch (error) {
    console.error("Database query error:", error)
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )
  }
}
