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
