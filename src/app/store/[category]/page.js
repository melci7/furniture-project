import { getProductByCategory } from "@/lib/userService"
import CategoryPage from "./category-page"
import StoreItemBox from "../store-item-box"

export default async function Page({ params, searchParams }) {
  const { category } = params
  const { page } = await searchParams
  const { data } = await getProductByCategory(category, page)

  return (
    <>
      <StoreItemBox />
      <CategoryPage products={data} />
    </>
  )
}
