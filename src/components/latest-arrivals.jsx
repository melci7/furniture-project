"use client"
import ItemBox from "./item-box"
import Link from "next/link"
import { useShoppingCart } from "./useShoppingCart"

export default function LatestArrivals({ products }) {
    const { addToCart } = useShoppingCart()
    return (
        <section className="w-full mt-16 lg:mt-36">
            <div className="flex flex-col gap-4 lg:gap-6">
                <h2 className="font-sans text-4xl font-semibold lg:text-5xl">Our latest arrivals</h2>
                <p className="text-[#636363] lg:max-w-[400px]">Introducing Our Latest Arrivals - Elevate Your Space with Contemporary Elegance!</p>
                <div className="flex flex-wrap items-center justify-center gap-4  lg:gap-7 lg:justify-between">
                    {products.slice(0, 6).map((item) => (
                        <ItemBox key={item.id} product={item} addToCart={addToCart} />
                    ))}
                </div>
                <Link href="/store" className="bg-[#FFD873] rounded-3xl xl:py-3.5 xl:px-6 lg:text-sm py-3 px-4 text-xs self-center inline-block duration-200 ease-out hover:bg-[#ffc329]">
                    Open Store
                </Link>
            </div>
        </section>
    )
}