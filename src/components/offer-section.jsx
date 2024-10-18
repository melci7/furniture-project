import Image from "next/image"
import Link from 'next/link'

export default function OfferSection() {
    return (
        <section className="flex flex-col w-full gap-10 mt-16 lg:mt-24 lg:flex-row xl:gap-20 lg:gap-10 laptop:gap-40">
            <div className="lg:max-w-[360px] flex flex-col items-center lg-items-start lg:gap-8 gap-4">
                <h2 className="font-sans text-4xl font-semibold lg:text-5xl lg:self-start">Daily offer</h2>
                <p className="text-[#636363] font-sans text-center lg:text-start">Check out our daily offers that can combine big discounts on some products. Offers may change every day, do not miss your chance.</p>
                <Link href="/store" className="bg-[#FFD873] rounded-3xl lg:py-3.5 lg:px-6 lg:text-sm py-3 px-4 text-xs lg:self-start inline-block">
                    Open Store
                </Link>
            </div>
            <div className="flex flex-col w-full gap-5 font-sans lg:flex-row">
                <div className="xl:w-[45%] lg:w-1/2 bg-[#dfe5f3] rounded-[24px] py-5 px-8 flex flex-col xl:h-[390px]">
                    <Link href={"/store/8"} className="flex flex-col justify-start h-full">
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-bold">Accent Chair</h2>
                            <div className="flex flex-col rounded-full bg-white self-start font-bold xl:text-lg text-base xl:px-4 xl:py-3 px-3.5 py-2.5 justify-center ">
                                <span>30%</span>
                                <span className="-mt-2">OFF</span>
                            </div>
                        </div>

                        <Image
                            src={"/chair.png"}
                            className="self-center object-cover xl:w-full lg:h-2/3 "
                            width={400}
                            height={400}
                            alt="Chair"
                        />

                    </Link>
                </div>
                <div className="xl:w-[55%] lg:w-1/2 bg-[#fdedd6] rounded-[24px] py-5 px-8 flex flex-col relative xl:h-[440px] justify-between">
                    <Link href={"/store/6"} className="flex flex-col justify-start h-full">
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-bold">Wardrobe</h2>
                            <div className="rounded-full bg-white self-start flex flex-col xl:text-lg text-base font-bold xl:px-4 xl:py-3 px-3.5 py-2.5 justify-center">
                                <span>40%</span>
                                <span className="-mt-2">OFF</span>
                            </div>
                        </div>
                        <Image
                            src={"/product_4.png"}
                            className="laptop:-mt-4 self-center lg:object-cover xl:w-full h-full"
                            width={400}
                            height={400}
                            alt="Table"
                        />
                    </Link>

                </div>
            </div>

        </section>
    )
}