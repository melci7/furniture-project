import Pagination from "./pagination"
import StoreItemBox from "./store-item-box"
import StoreWrapper from "./store-wrapper"
import { getAllProducts } from "@/lib/userService"

export default async function Page({ searchParams }) {
  const { page } = await searchParams
  const { data, totalPages } = await getAllProducts(page)

  return (
    <>
      <StoreItemBox />
      <StoreWrapper data={data} />
      <Pagination totalPages={totalPages} />
    </>
  )
}
