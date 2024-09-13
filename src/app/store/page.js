import StoreWrapper from "./store-wrapper"
import { getAllProducts } from "@/lib/userService"

export default async function Page() {
  const data = await getAllProducts()

  return <StoreWrapper data={data} />
}
