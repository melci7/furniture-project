"use client"

import ItemBox from "@/components/item-box"
import { useShoppingCart } from "@/components/useShoppingCart"

export default function SaleWrapper({ data }) {
    const { addToCart } = useShoppingCart()

    return (
        <>
            <div className="flex flex-wrap items-center justify-start gap-4 mt-4 lg:gap-7 lg:mt-8">
                {data.map((item) => (
                    <ItemBox key={item.id} product={item} addToCart={addToCart} />
                ))}
            </div>
        </>
    )
}
