"use client"
import ItemBox from "./item-box"
import Link from "next/link"
import { useShoppingCart } from "./useShoppingCart"

export default function LatestArrivals({ products }) {
    const { addToCart } = useShoppingCart()
    return (
        <section className="w-full mt-16 lg:mt-36">
            <div className="flex flex-col lg:gap-6 gap-4">
                <h2 className="lg:text-5xl text-4xl font-semibold font-sans">Our latest arrivals</h2>
                <p className="text-[#636363] lg:max-w-[400px]">Introducing Our Latest Arrivals - Elevate Your Space with Contemporary Elegance!</p>
                <div className=" flex flex-wrap lg:gap-7 gap-4 justify-center lg:justify-between items-center">
                    {products.slice(0, 6).map((item) => (
                        <ItemBox key={item.id} product={item} addToCart={addToCart} />
                    ))}
                </div>
                <Link href="/store" className="bg-[#FFD873] rounded-3xl lg:py-3.5 lg:px-6 lg:text-sm py-3 px-4 text-xs self-center inline-block">
                    Open Store
                </Link>
            </div>
        </section>
    )
}