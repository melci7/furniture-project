"use client"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import ItemDetails from "./item-details"
import Recommended from "./recommended"
import { getData } from "@/lib/getData"
import ProductProcess from "./product-process"
import ServiceSection from "./product-process"

export default function ProductPage() {
  const params = useParams()
  const id = params.id
  const [product, setProduct] = useState(null)
  const [productList, setProductList] = useState(null)

  useEffect(() => {
    fetchProductList()
    if (id) {
      fetchProductData(id)
    }
  }, [id])

  const fetchProductData = async (productId) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/products/${productId}`
      )
      const data = await response.json()
      setProduct(data)
    } catch {
      console.error("Error fetching product data:", error)
    }
  }

  const fetchProductList = async () => {
    try {
      const productData = await getData()
      setProductList(productData)
    } catch {
      console.error("Error fetching product data:", error)
    }
  }

  if (!product) {
    return <div>Loading...</div>
  }

  return (
    <section className="">
      <ItemDetails product={product} />
      <ServiceSection />
      <Recommended product={productList} />
    </section>
  )
}
