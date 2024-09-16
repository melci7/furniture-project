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

export default function Recommended({ product }) {
    return (
        <div className="my-20">
            <h2 className="font-semibold text-4xl">Recommended For You</h2>
            <Carousel
                opts={{
                    align: "start",
                    loop: true,
                }}
                className="w-full mt-2"
            >
                <CarouselContent>
                    {product.map((item) => (
                        <CarouselItem key={item.id} className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                            <div className="py-4 flex">
                                <ItemBox product={item} />
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>

    )
}