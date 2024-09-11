import { query } from "@/lib/db"

export async function createUser(userData) {
  const { name, email, password } = userData

  try {
    const result = await query(
      "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email",
      [name, email, password]
    )
    return result.rows[0]
  } catch (error) {
    console.error("Error in createUser:", error.message)
    console.error("Error stack:", error.stack)
    throw error
  }
}

export async function getUserByEmail(email) {
  try {
    const result = await query(
      "SELECT id, name, email, password FROM users WHERE email = $1",
      [email]
    )

    console.log(
      "User fetch result:",
      result.rows.length > 0 ? "User found" : "User not found"
    )

    // If a user is found, return the first (and should be only) result
    // If no user is found, this will return undefined
    return result.rows[0]
  } catch (error) {
    console.error("Error in getUserByEmail:", error.message)
    console.error("Error stack:", error.stack)
    throw error
  }
}

export async function createOrder(orderData) {
  const { cartItems, customerInfo } = orderData
  try {
    // Start a transaction
    await query("BEGIN")

    // Create order
    const orderResult = await query(
      "INSERT INTO orders (user_id, order_date, customer_name, shipping_address) VALUES ($1, NOW(), $2, $3) RETURNING id",
      [customerInfo.userId, customerInfo.name, customerInfo.shippingAddress]
    )
    const orderId = orderResult.rows[0].id

    // Insert order items
    for (const item of cartItems) {
      await query(
        "INSERT INTO order_items (order_id, product_id, quantity, price) VALUES ($1, $2, $3, $4)",
        [orderId, item.id, item.quantity, item.price]
      )
    }

    // Commit the transaction
    await query("COMMIT")

    return { orderId }
  } catch (error) {
    // Rollback the transaction in case of error
    await query("ROLLBACK")
    console.error("Error in createOrder:", error.message)
    console.error("Error stack:", error.stack)
    throw error
  }
}

export async function getUserOrders(userId) {
  const result = await query(
    "SELECT id FROM orders WHERE user_id = $1 ORDER BY order_date DESC",
    [userId]
  )
  return result.rows.map((row) => row.id)
}

export async function getOrderDetails(orderId) {
  const orderResult = await query(
    `SELECT o.id, o.user_id, o.order_date, o.customer_name, o.shipping_address
     FROM orders o
     WHERE o.id = $1`,
    [orderId]
  )

  if (orderResult.rows.length === 0) {
    throw new Error("Order not found")
  }

  const order = orderResult.rows[0]

  const itemsResult = await query(
    `SELECT oi.product_id, oi.quantity, oi.price, p.name as product_name, p.image
     FROM order_items oi
     JOIN products p ON oi.product_id = p.id
     WHERE oi.order_id = $1`,
    [orderId]
  )

  order.items = itemsResult.rows

  return order
}

export async function createAddress(addressInfo) {
  const { userId, shippingAddress } = addressInfo
  try {
    await query(
      "INSERT INTO addresses (user_id, shipping_address) VALUES ($1, $2)",
      [userId, shippingAddress] // Ensure the correct field names are used
    )
  } catch (error) {
    console.error("Error in createAddress:", error.message)
    throw error
  }
}

export async function getAddresses(userId) {
  try {
    const result = await query(
      "SELECT shipping_address, id FROM addresses WHERE user_id = $1",
      [userId]
    )
    return result.rows // Return all rows as the frontend expects an array
  } catch (error) {
    console.error("Error in getAddresses:", error.message)
    throw error
  }
}

export async function deleteAddress(addressId) {
  try {
    const result = await query("DELETE FROM addresses WHERE id = $1", [
      addressId,
    ])

    if (result.rowCount === 0) {
      throw new Error(`No address found with id ${addressId}`)
    }

    return { message: `Address with id ${addressId} deleted successfully.` }
  } catch (error) {
    console.error("Error in deleteAddress:", error.message)
    throw error
  }
}
