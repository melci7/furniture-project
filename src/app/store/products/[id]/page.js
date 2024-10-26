import ItemDetails from "./item-details"
import Recommended from "./recommended"
import ServiceSection from "./product-process"
import { getAllProducts, getProductById } from "@/lib/userService"

export default async function ProductPage({ params }) {
  const { id } = params

  const product = await getProductById(id)

  const { data } = await getAllProducts()

  return (
    <section className="">
      <ItemDetails product={product} />
      <ServiceSection />
      <Recommended product={data} />
    </section>
  )
}
