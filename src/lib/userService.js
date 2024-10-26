import supabase from "./supabase"

export async function getAllProducts(page = 1) {
  const limit = 12
  try {
    const { data, error, count } = await supabase
      .from("products")
      .select("*", { count: "exact" }) // 'exact' will return the total count of products
      .range((page - 1) * limit, page * limit - 1)

    if (error) throw error

    const totalProducts = count
    const totalPages = Math.ceil(totalProducts / limit)

    return { data, totalPages }
  } catch (error) {
    console.error("Error in getAllProducts:", error.message)
    throw error
  }
}

export async function getProductByCategory(category, page = 1) {
  const limit = 12
  try {
    const { data, error, count } = await supabase
      .from("products")
      .select("*", { count: "exact" })
      .eq("category", category)
      .range((page - 1) * limit, page * limit - 1)

    if (error) throw error

    const totalProducts = count
    const totalPages = Math.ceil(totalProducts / limit)

    return { data, totalPages }
  } catch (error) {
    console.error("Error in getProductByCategory:", error.message)
    throw error
  }
}

export async function getProductById(id) {
  try {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("id", id)
      .single()

    if (error) throw error
    return data
  } catch (error) {
    console.error("Error in getProductById:", error.message)
    throw error
  }
}

export async function getUserByEmail(email) {
  try {
    const { data, error } = await supabase
      .from("users")
      .select("id, name, email, password")
      .eq("email", email)
      .maybeSingle()

    if (error) throw error

    return data // This will be null if no user is found
  } catch (error) {
    console.error("Error in getUserByEmail:", error.message)
    throw error
  }
}

// ... (other functions remain the same)

export async function createUser(userData) {
  const { name, email, password } = userData

  try {
    const existingUser = await getUserByEmail(email)
    if (existingUser) {
      throw new Error("User with this email already exists")
    }

    const { data, error } = await supabase
      .from("users")
      .insert({ name, email, password })
      .select("id, name, email")
      .single()

    if (error) throw error
    return data
  } catch (error) {
    console.error("Error in createUser:", error.message)
    throw error
  }
}

export async function createOrder(orderData) {
  const { cartItems, customerInfo, selectedAddressId } = orderData
  try {
    let userId, customerName, shippingAddress

    if (selectedAddressId) {
      const { data: addressData, error: addressError } = await supabase
        .from("addresses")
        .select("user_id, shipping_address")
        .eq("id", selectedAddressId)
        .single()

      if (addressError) throw addressError
      if (!addressData) throw new Error("Selected address not found")

      userId = addressData.user_id
      shippingAddress = addressData.shipping_address

      const { data: userData, error: userError } = await supabase
        .from("users")
        .select("name")
        .eq("id", userId)
        .single()

      if (userError) throw userError
      customerName = userData.name
    } else {
      userId = customerInfo.userId
      customerName = customerInfo.name
      shippingAddress = customerInfo.shippingAddress
    }

    const { data: orderData, error: orderError } = await supabase
      .from("orders")
      .insert({
        user_id: userId,
        order_date: new Date(),
        customer_name: customerName,
        shipping_address: shippingAddress,
      })
      .select("id")
      .single()

    if (orderError) throw orderError

    const orderId = orderData.id

    const orderItems = cartItems.map((item) => ({
      order_id: orderId,
      product_id: item.id,
      quantity: item.quantity,
      price: item.price,
    }))

    const { error: itemsError } = await supabase
      .from("order_items")
      .insert(orderItems)

    if (itemsError) throw itemsError

    return { orderId }
  } catch (error) {
    console.error("Error in createOrder:", error.message)
    throw error
  }
}

export async function getUserOrders(userId) {
  try {
    const { data, error } = await supabase
      .from("orders")
      .select("id")
      .eq("user_id", userId)
      .order("order_date", { ascending: false })

    if (error) throw error
    return data.map((row) => row.id)
  } catch (error) {
    console.error("Error in getUserOrders:", error.message)
    throw error
  }
}

export async function getOrderDetails(orderId) {
  try {
    const { data: orderData, error: orderError } = await supabase
      .from("orders")
      .select("id, user_id, order_date, customer_name, shipping_address")
      .eq("id", orderId)
      .single()

    if (orderError) throw orderError
    if (!orderData) throw new Error("Order not found")

    const { data: itemsData, error: itemsError } = await supabase
      .from("order_items")
      .select("product_id, quantity, price, products(name, image)")
      .eq("order_id", orderId)

    if (itemsError) throw itemsError

    orderData.items = itemsData.map((item) => ({
      ...item,
      product_name: item.products.name,
      image: item.products.image,
    }))

    return orderData
  } catch (error) {
    console.error("Error in getOrderDetails:", error.message)
    throw error
  }
}

export async function createAddress(addressInfo) {
  const { userId, shippingAddress } = addressInfo
  try {
    const { error } = await supabase
      .from("addresses")
      .insert({ user_id: userId, shipping_address: shippingAddress })

    if (error) throw error
  } catch (error) {
    console.error("Error in createAddress:", error.message)
    throw error
  }
}

export async function getAddresses(userId) {
  try {
    const { data, error } = await supabase
      .from("addresses")
      .select("shipping_address, id")
      .eq("user_id", userId)

    if (error) throw error
    return data
  } catch (error) {
    console.error("Error in getAddresses:", error.message)
    throw error
  }
}

export async function deleteAddress(addressId) {
  try {
    const { error } = await supabase
      .from("addresses")
      .delete()
      .eq("id", addressId)

    if (error) throw error
    return { message: `Address with id ${addressId} deleted successfully.` }
  } catch (error) {
    console.error("Error in deleteAddress:", error.message)
    throw error
  }
}
