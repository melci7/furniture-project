"use client"
import ItemBox from "./item-box"
import Link from "next/link"
import { useShoppingCart } from "./useShoppingCart"

export default function LatestArrivals({ products }) {
    const { addToCart } = useShoppingCart()
    return (
        <section className="w-full mt-36">
            <div className="flex flex-col gap-6">
                <h2 className="text-5xl font-semibold font-sans">Our latest arrivals</h2>
                <p className="text-[#636363] max-w-[400px]">Introducing Our Latest Arrivals - Elevate Your Space with Contemporary Elegance!</p>
                <div className="flex flex-wrap gap-7 justify-between items-center">
                    {products.slice(0, 6).map((item) => (
                        <ItemBox key={item.id} product={item} addToCart={addToCart} />
                    ))}
                </div>
                <Link href="/store" className="bg-[#FFD873] rounded-3xl py-3.5 px-6 text-sm self-center inline-block">
                    Open Store
                </Link>
            </div>
        </section>
    )
}