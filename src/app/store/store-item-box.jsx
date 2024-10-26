"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { usePathname } from 'next/navigation' // Add this
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel"

export default function StoreItemBox() {
    const [isDesktop, setIsDesktop] = useState(false)
    const pathname = usePathname() // Get current pathname

    // Get category from URL path
    const currentCategory = pathname.split('/').pop()

    const categories = [
        { icon: "/chair_icon.svg", name: "Chair" },
        { icon: "/sofa_icon.svg", name: "Sofa" },
        { icon: "/cabinet_icon.svg", name: "Cabinet" },
        { icon: "/closet_icon.svg", name: "Wardrobe" },
        { icon: "/armchair_icon.svg", name: "Armchair" }
    ]

    useEffect(() => {
        const checkIfDesktop = () => setIsDesktop(window.innerWidth >= 1024);
        checkIfDesktop();
        window.addEventListener('resize', checkIfDesktop);
        return () => window.removeEventListener('resize', checkIfDesktop);
    }, []);

    return (
        <div>
            {isDesktop ? (
                <section className="flex flex-wrap items-center justify-center w-full gap-4 m-auto mt-10 lg:gap-7">
                    {categories.map(cat => (
                        <Link
                            key={cat.name}
                            href={`/store/${cat.name}`}
                            className={`bg-[#f5f5f5] rounded-[24px] lg:px-12 flex flex-col items-center lg:py-6 px-14 py-3.5 cursor-pointer hover:bg-[#ffd873] ease-out duration-300 ${currentCategory === cat.name ? 'bg-[#ffd873]' : ''
                                }`}
                        >
                            <Image
                                src={cat.icon}
                                className="stroke-slate-300 m-auto w-10 lg:w-14"
                                alt={cat.name}
                                width={65}
                                height={65}
                            />
                            <h3 className="text-center font-semibold text-sm lg:text-base lg:mt-3 mt-1.5">{cat.name}</h3>
                        </Link>
                    ))}
                </section>
            ) : (
                <Carousel
                    opts={{
                        align: "start",
                        loop: false,
                    }}
                    className="flex items-center justify-center w-full gap-4 m-auto lg:mt-10 lg:gap-7 lg:flex-wrap"
                >
                    <CarouselContent>
                        {categories.map((cat) => (
                            <CarouselItem key={cat.name} className="basis-[37%] sm:basis-[30%] md:basis-[24%]">
                                <Link
                                    href={`/store/${cat.name}`}
                                    className={`bg-[#f5f5f5] rounded-[24px] lg:px-12 flex flex-col items-center lg:py-6 px-14 py-3.5 cursor-pointer hover:bg-[#ffd873] ease-out duration-300 ${currentCategory === cat.name ? 'bg-[#ffd873]' : ''
                                        }`}
                                >
                                    <Image
                                        src={cat.icon}
                                        className="stroke-slate-300 m-auto w-10 lg:w-14"
                                        alt={cat.name}
                                        width={65}
                                        height={65}
                                    />
                                    <h3 className="text-center font-semibold text-sm lg:text-base lg:mt-3 mt-1.5">{cat.name}</h3>
                                </Link>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>
            )}
        </div>
    )
}