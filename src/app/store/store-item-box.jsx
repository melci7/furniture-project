"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { usePathname } from 'next/navigation'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel"

export default function StoreItemBox() {
    const pathname = usePathname()

    const currentCategory = pathname.split('/').pop()

    const categories = [
        { icon: "/chair.png", name: "Chair" },
        { icon: "/sofa.png", name: "Sofa" },
        { icon: "/table.png", name: "Table" },
        { icon: "/armchair.png", name: "Armchair" },
        { icon: "/cabinet.png", name: "Cabinet" },
    ]

    return (
        <div>
            <section className="hidden lg:flex flex-wrap items-center justify-center w-full gap-4 m-auto mt-6 lg:gap-7">
                {categories.map(cat => (
                    <Link
                        key={cat.name}
                        href={`/store/${cat.name}`}
                        className={` rounded-[24px] lg:px-10 flex flex-col items-center lg:py-4 px-14 py-3.5 cursor-pointer hover:bg-[#ffd873] ease-out duration-300 ${currentCategory === cat.name ? 'bg-[#ffd873]' : ''
                            }`}
                    >
                        <Image
                            src={cat.icon}
                            className={`stroke-slate-300 m-auto w-10 lg:w-20`}
                            alt={cat.name}
                            width={65}
                            height={65}
                        />
                        <h3 className="text-center font-medium text-sm lg:text-base mt-1">{cat.name}</h3>
                    </Link>
                ))}
            </section>
            <Carousel
                opts={{
                    align: "start",
                    loop: false,
                }}
                className="flex lg:hidden items-center justify-center w-full gap-4 m-auto lg:mt-10 mt-6 lg:gap-7 lg:flex-wrap"
            >
                <CarouselContent>
                    {categories.map((cat) => (
                        <CarouselItem key={cat.name} className="basis-[37%] sm:basis-[30%] md:basis-[24%]">
                            <Link
                                href={`/store/${cat.name}`}
                                className={` rounded-[24px] lg:px-10 flex flex-col items-center lg:py-4 px-7 py-2 cursor-pointer hover:bg-[#ffd873] ease-out duration-300 ${currentCategory === cat.name ? 'bg-[#ffd873]' : ''
                                    }`}
                            >
                                <Image
                                    src={cat.icon}
                                    className="stroke-slate-300 m-auto w-14"
                                    alt={cat.name}
                                    width={65}
                                    height={65}
                                />
                                <h3 className="text-center font-medium text-sm lg:text-base lg:mt-3 mt-0.5">{cat.name}</h3>
                            </Link>
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
        </div>
    )
}