"use client"
import Image from "next/image"
import Link from "next/link"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel-demo"
import { useState, useEffect } from "react"
import { Plus, Tag } from "lucide-react"

export default function BannerCarousel({ product }) {
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [scrollSnaps, setScrollSnaps] = useState([])
    const [carouselApi, setCarouselApi] = useState(null)


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

    const sofas = product.filter((item) => {
        return item.category === "Sofa"
    }).slice(2, 6)
    console.log(product)
    return (
        <section className="relative w-full mt-6 lg:mt-10">
            <div className="bg-[#5c75b8] rounded-[24px] lg:py-16 md:py-12 py-8 px-6">
                <div className="flex flex-col lg:gap-6 md:gap-3 gap-4 sm:gap-2 items-center lg:max-w-[1090px] m-auto">
                    <h1 className="font-sans text-4xl md:text-5xl md:max-w-5xl sm:max-w-xl font-semibold md:text-center text-white desktop:text-7xl lg:text-6xl lg:mt-3">Modern Minimalist Furniture</h1>
                    <div className="flex flex-col max-w-[420px] xl:max-w-[420px] lg:max-w-xl lg:gap-6 gap-4 xl:self-end sm:self-center">
                        <p className="text-sm text-white md:text-[15px] lg:text-base xl:text-start sm:text-center">
                            Discover a curated collection of handcrafted pieces designed to transform your living spaces into expressions of your unique taste and lifestyle.
                        </p>
                        <Link href="/store" className="bg-[#FFD873] rounded-3xl xl:py-3.5 xl:px-6 py-3 px-4 text-xs lg:text-sm self-start inline-block sm:self-center xl:self-start duration-200 ease-out hover:bg-[#ffc329]">
                            Explore More
                        </Link>
                    </div>
                </div>

            </div>
            <div className="flex flex-col gap-4 mt-4 lg:flex-row ">
                <div className="lg:w-3/5 w-full flex flex-col relative h-[360px] lg:h-auto">
                    <Carousel className="h-full w-full bg-[#DFE5F3] rounded-[24px] py-8 lg:py-0" setApi={setCarouselApi}>
                        <CarouselContent className="duration-300 ease-out h-full" >
                            {sofas.map((item, index) => (
                                <CarouselItem key={index} className="relative h-full" >
                                    <Link href={`store/products/${item.id}`} >
                                        <img
                                            src={item.image[0]}
                                            className="lg:w-[650px] lg:h-[340px] object-cover sm:w-9/12 m-auto scale-x-[-1]"
                                            alt="Sofa"
                                        />

                                        <div className="gap-2 lg:h-10 h-8 rounded-full flex items-center justify-between px-2 lg:px-3 lg:pl-1 lg:bg-white/20 bg-[#5c75b8] text-white absolute lg:top-5 lg:right-0 desktop:top-9 desktop:right-10 top-0 sm:right-8 right-4 md:right-20 lg:-translate-x-1/2 group ">
                                            <div className="items-center justify-between bg-white/50 rounded-full w-8 h-8 hidden lg:flex lg:animate-pulse hover:animate-none">
                                                <button className="w-6 h-6 rounded-full m-auto bg-white text-black group-hover:w-8 group-hover:h-8 transition-all duration-300 ease-in-out ">
                                                    <Plus size={14} className="m-auto" strokeWidth={2.5} />
                                                </button>

                                            </div>
                                            <span className="font-medium text-sm sm:text-base sm:px-1">${item.price}</span>
                                            <div className="lg:hidden absolute bg-[#FFD873] rounded-full -bottom-1.5 -right-1 p-0.5">

                                                <Tag size={12} className=" text-[#5c75b8]" />
                                            </div>

                                        </div>
                                    </Link>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <div className="flex justify-center absolute bottom-8 inset-x-0 lg:bottom-16">
                            {scrollSnaps.map((_, index) => (
                                <button
                                    key={index}
                                    className={`lg:w-6 w-4 h-0.5 lg:h-1 rounded-full mx-1 lg:mx-1.5 transition-all duration-200 ease-out ${index === selectedIndex ? 'bg-[#455EA0] lg:w-10 w-6' : 'bg-gray-400'
                                        }`}
                                    onClick={() => carouselApi && carouselApi.scrollTo(index)}
                                />
                            ))}
                        </div>
                        <CarouselPrevious className="hidden lg:flex" />
                        <CarouselNext className="hidden lg:flex" />

                    </Carousel>

                </div>


                <div className="lg:w-2/5 w-full lg:justify-center xl:justify-start bg-[#FFD873] rounded-[24px] xl:p-8 lg:px-4 lg:py-6 py-8 px-6 flex flex-col lg:flex-row lg:relative lg:h-[300px] xl:h-[280px]">
                    <div className="flex flex-col items-center justify-between gap-4 xl:items-start">
                        <h2 className="xl:text-4xl md:text-3xl text-2xl text-center xl:text-start xl:max-w-[250px] font-semibold text-[#876c29] font-sans">Wooden Chair 50% OFF</h2>
                        <Link href="/store" className="bg-white rounded-3xl xl:py-3.5 xl:px-6 py-3 px-4 text-xs lg:text-sm xl:self-start inline-block order-3 duration-200 ease-out hover:bg-zinc-100">
                            Explore More
                        </Link>
                        <Image
                            src={"/chair_1.png"}
                            className="order-2 xl:absolute lg:w-1/2 desktop:w-2/5 right-10 top-10"
                            alt="Rocking Wooden Chair"
                            width={180}
                            height={180}
                        />
                    </div>
                </div>
            </div>

        </section>
    )
}