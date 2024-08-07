import { getData } from "@/lib/getData"
import StoreWrapper from "./store-wrapper"
import { getAllProducts } from "@/lib/data"

export default async function Page() {
  const data = await getAllProducts()

  return <StoreWrapper data={data} />
}
