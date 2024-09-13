import { createOrder } from "@/lib/userService"
import { NextResponse } from "next/server"

export async function POST(req) {
  try {
    const { cartItems, customerInfo, selectedAddressId } = await req.json()

    let orderData = { cartItems, customerInfo }

    // If selectedAddressId is present, include it in the orderData
    if (selectedAddressId) {
      orderData.selectedAddressId = selectedAddressId
    }

    const order = await createOrder(orderData)
    return NextResponse.json(order)
  } catch (error) {
    console.error("Error in POST /api/user/order:", error.message)
    console.error("Error stack:", error.stack)
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )
  }
}
