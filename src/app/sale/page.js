import SaleWrapper from "./sale-wrapper"
import { getDiscountedProducts } from "@/lib/userService"

export default async function Page() {
  const { data } = await getDiscountedProducts()

  return (
    <>
      <h1 className="text-3xl lg:text-4xl lg:text-start text-center font-semibold lg:max-w-[500px] font-sans mt-4 lg:mt-10">
        Limited-Time Furniture Sale: Style Meets Savings!
      </h1>
      <SaleWrapper data={data} />
    </>
  )
}
