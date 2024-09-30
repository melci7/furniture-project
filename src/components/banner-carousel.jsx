import Image from "next/image"
import Link from "next/link"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel-demo"
export default function BannerCarousel() {
    return (
        <section className="lg:mt-10 mt-6 w-full relative">
            <div className="bg-[#5c75b8] rounded-[24px] lg:py-16 py-8 px-6">
                <div className="flex flex-col lg:gap-6 gap-4 items-center lg:max-w-[1090px] m-auto">
                    <h1 className="lg:text-7xl lg:mt-3 text-4xl text-white font-semibold font-sans">Modern Minimalist Furniture</h1>
                    <div className="flex flex-col max-w-[420px] lg:gap-6 gap-4 self-end">
                        <p className="text-white lg:text-base text-sm">
                            Discover a curated collection of handcrafted pieces designed to transform your living spaces into expressions of your unique taste and lifestyle.
                        </p>
                        <Link href="/store" className="bg-[#FFD873] rounded-3xl lg:py-3.5 lg:px-6 py-3 px-4 text-xs lg:text-sm self-start inline-block">
                            Explore More
                        </Link>
                    </div>
                </div>

            </div>
            <div className="flex flex-col lg:flex-row gap-4 mt-4 ">
                <Carousel className="lg:w-3/5 w-full bg-[#DFE5F3] rounded-[24px] py-4 lg:py-0">
                    <CarouselContent className="duration-300 ease-out" >
                        {Array.from({ length: 5 }).map((_, index) => (
                            <CarouselItem key={index} >
                                <Image
                                    src={"/couch_7.png"}
                                    className=""
                                    alt="Sofa"
                                    width={1200}
                                    height={400}
                                />
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className="hidden lg:flex" />
                    <CarouselNext className="hidden lg:flex" />

                </Carousel>
                <div className="lg:w-2/5 w-full bg-[#FFD873] rounded-[24px] lg:p-8 py-8 px-6 flex flex-col lg:flex-row lg:relative lg:h-[280px]">
                    <div className="flex flex-col justify-between lg:items-start items-center gap-4">
                        <h2 className="lg:text-4xl text-2xl text-center lg:text-start lg:max-w-[250px] font-semibold text-[#876c29] font-sans">Wooden Chair 50% OFF</h2>
                        <Link href="/store" className="bg-white rounded-3xl lg:py-3.5 lg:px-6 py-3 px-4 text-xs lg:text-sm lg:self-start inline-block order-3">
                            Explore More
                        </Link>
                        <Image
                            src={"/chair_1.png"}
                            className="lg:absolute lg:w-1/2 right-6 top-4 order-2"
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