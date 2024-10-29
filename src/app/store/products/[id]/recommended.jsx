"use client"
import ItemBox from "@/components/item-box"
import Image from "next/image"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { useState, useEffect } from 'react'
import { useShoppingCart } from "@/components/useShoppingCart"

export default function Recommended({ product }) {
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [scrollSnaps, setScrollSnaps] = useState([])
    const [carouselApi, setCarouselApi] = useState(null)
    const [recommended, setRecommended] = useState(true)
    const { addToCart } = useShoppingCart()

    useEffect(() => {
        if (!carouselApi) return

        setScrollSnaps(carouselApi.scrollSnapList())
        const onSelect = () => {
            setSelectedIndex(carouselApi.selectedScrollSnap())
        }

        carouselApi.on('select', onSelect)
        onSelect()

        return () => {
            carouselApi.off('select', onSelect)
        }
    }, [carouselApi])

    return (
        <div className="my-8 mb-6 lg:my-20 lg:mb-20">
            <h2 className="text-2xl font-semibold lg:text-4xl md:text-3xl">Recommended For You</h2>
            <Carousel
                opts={{
                    align: "start",
                    loop: false,
                }}
                className="w-full mt-2"
                setApi={setCarouselApi}
            >
                <CarouselContent>
                    {product.map((item) => (
                        <CarouselItem key={item.id} className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                            <div className="flex pt-1 pb-2 lg:pt-4 lg:pb-4">
                                <ItemBox product={item} recommended={recommended} addToCart={addToCart} />
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <div className="hidden md:block">
                    <CarouselPrevious />
                    <CarouselNext />
                </div>
            </Carousel>
            <div className="md:hidden relative w-full h-0.5 mt-3 bg-[#dfdfdf] rounded-full">
                <div
                    className="absolute h-0.5 bg-[#455EA0] rounded-full transition-all duration-300 ease-out"
                    style={{
                        width: `${((selectedIndex + 1) / 15) * 100}%`,
                    }}
                />
            </div>

        </div>
    )
}