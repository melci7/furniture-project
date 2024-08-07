// app/api/products/[productId]/route.js
import { query } from "@/lib/db" // Note: You might want to rename this to something like "@/lib/db"
import { NextResponse } from "next/server"

export async function GET(request, { params }) {
  const { productId } = params

  try {
    const result = await query("SELECT * FROM products WHERE id = $1", [
      productId,
    ])
    console.log("Database result:", result.rows) // For debugging

    if (result.rows.length === 0) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }

    return NextResponse.json(result.rows[0])
  } catch (error) {
    console.error("Database query error:", error)
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )
  }
}
