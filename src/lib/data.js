// app/services/productService.js
import { query } from "@/lib/db"

export async function getAllProducts() {
  const result = await query("SELECT * FROM products")
  return result.rows
}

export async function getProductById(id) {
  const result = await query("SELECT * FROM products WHERE id = $1", [id])
  return result.rows[0]
}

export async function searchProducts(searchTerm) {
  const result = await query(
    "SELECT * FROM products WHERE name ILIKE $1 OR description ILIKE $1",
    [`%${searchTerm}%`]
  )
  return result.rows
}

// Add more functions as needed, e.g.:
// export async function createProduct(productData) { ... }
// export async function updateProduct(id, productData) { ... }
// export async function deleteProduct(id) { ... }
