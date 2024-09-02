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
        <section className="mt-10 w-full relative">
            <div className="bg-[#5c75b8] rounded-[24px] py-16 ">
                <div className="flex flex-col gap-6 items-center max-w-[1090px] m-auto">
                    <h1 className="text-[80px] text-white font-semibold font-sans">Modern Minimalist Furniture</h1>
                    <div className="flex flex-col max-w-[420px] gap-6 self-end">
                        <p className="text-white">
                            Discover a curated collection of handcrafted pieces designed to transform your living spaces into expressions of your unique taste and lifestyle.
                        </p>
                        <Link href="/store" className="bg-[#FFD873] rounded-3xl py-3.5 px-6 text-sm self-start inline-block">
                            Explore More
                        </Link>
                    </div>
                </div>

            </div>
            <div className="flex gap-4 mt-4 ">
                <Carousel className="w-3/5 bg-[#DFE5F3] rounded-[24px] ">
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
                    <CarouselPrevious className="" />
                    <CarouselNext className="" />

                </Carousel>
                <div className="w-2/5 bg-[#FFD873] rounded-[24px] p-8 flex relative h-[280px]">
                    <div className="flex flex-col justify-between items-start">
                        <h2 className="text-4xl max-w-[250px] font-semibold text-[#876c29] font-sans">Wooden Chair 50% OFF</h2>
                        <Link href="/store" className="bg-white rounded-3xl py-3.5 px-6 text-sm self-start inline-block">
                            Explore More
                        </Link>
                    </div>
                    <Image
                        src={"/chair_1.png"}
                        className="absolute right-6 top-4"
                        alt="Rocking Wooden Chair"
                        width={280}
                        height={280}
                    />
                </div>
            </div>

        </section>
    )
}