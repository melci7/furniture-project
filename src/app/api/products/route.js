import supabase from "@/lib/supabase"
import { NextResponse } from "next/server"

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const page = parseInt(searchParams.get("page") || "1")
  const limit = parseInt(searchParams.get("limit") || "12")
  const category = searchParams.get("category")

  try {
    let query = supabase
      .from("products")
      .select("*")
      .range((page - 1) * limit, page * limit - 1)

    // Log the category for debugging
    console.log("Category filter:", category)

    // Apply category filter if present
    if (category && category !== "null") {
      query = query.eq("category", category)
    }

    const { data, error } = await query

    if (error) throw error

    return NextResponse.json({
      products: data,
      hasMore: data.length === limit,
    })
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    )
  }
}
