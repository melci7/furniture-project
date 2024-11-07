import { createAddress, deleteAddress, getAddresses } from "@/lib/userService"
import { NextResponse } from "next/server"

export async function POST(req) {
  try {
    const { addressInfo } = await req.json()

    if (!addressInfo || !addressInfo.userId) {
      return NextResponse.json(
        { error: "Invalid address information" },
        { status: 400 }
      )
    }

    await createAddress(addressInfo)
    return NextResponse.json({ message: "Address created successfully" })
  } catch (error) {
    console.error("Error in POST /api/user/addresses:", error.message)
    console.error("Error stack:", error.stack)
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )
  }
}

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url)
    const userId = searchParams.get("userId")

    if (!userId) {
      return NextResponse.json(
        { error: "Missing userId parameter" },
        { status: 400 }
      )
    }

    const address = await getAddresses(userId)
    if (!address) {
      return NextResponse.json({ error: "Address not found" }, { status: 404 })
    }

    return NextResponse.json(address)
  } catch (error) {
    console.error("Error in GET /api/user/addresses:", error.message)
    console.error("Error stack:", error.stack)
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )
  }
}

export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url)
    const addressId = searchParams.get("addressId")

    if (!addressId) {
      return NextResponse.json(
        { error: "Missing addressId parameter" },
        { status: 400 }
      )
    }

    const deletedAddress = await deleteAddress(addressId)
    if (!deletedAddress) {
      return NextResponse.json({ error: "Address not found" }, { status: 404 })
    }

    return NextResponse.json(deletedAddress)
  } catch (error) {
    console.error("Error in DELETE /api/user/addresses:", error.message)
    console.error("Error stack:", error.stack)
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )
  }
}
