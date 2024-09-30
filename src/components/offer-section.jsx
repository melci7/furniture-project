import Image from "next/image"
import Link from 'next/link'

export default function OfferSection() {
    return (
        <section className="w-full lg:mt-24 mt-16 flex flex-col lg:flex-row laptop:gap-40 lg:gap-20 gap-10">
            <div className="lg:max-w-[360px] flex flex-col items-center lg-items-start lg:gap-8 gap-4">
                <h2 className="lg:text-5xl text-4xl lg:self-start font-semibold font-sans">Daily offer</h2>
                <p className="text-[#636363] font-sans text-center lg:text-start">Check out our daily offers that can combine big discounts on some products. Offers may change every day, do not miss your chance.</p>
                <Link href="/store" className="bg-[#FFD873] rounded-3xl lg:py-3.5 lg:px-6 lg:text-sm py-3 px-4 text-xs lg:self-start inline-block">
                    Open Store
                </Link>
            </div>
            <div className="flex w-full flex-col lg:flex-row gap-5 font-sans">
                <div className="lg:w-5/12 bg-[#dfe5f3] rounded-[24px] py-5 px-8 flex flex-col lg:h-[390px]">
                    <Link href={"/store/8"} className="flex flex-col h-full">
                        <div className="flex justify-between items-center">
                            <h2 className="text-2xl font-semibold">Accent Chair</h2>
                            <div className="flex flex-col rounded-full bg-white self-start font-bold lg:text-lg text-base lg:px-4 lg:py-3 px-3.5 py-2.5 justify-center ">
                                <span>30%</span>
                                <span className="-mt-2">OFF</span>
                            </div>
                        </div>

                        <Image
                            src={"/product_7.png"}
                            className="object-cover lg:h-[240px] w-full"
                            width={700}
                            height={700}
                            alt="Chair"
                        />

                    </Link>
                </div>
                <div className="lg:w-7/12 bg-[#fdedd6] rounded-[24px] py-5 px-8 flex flex-col relative lg:h-[440px] justify-between">
                    <Link href={"#"} className="flex flex-col h-full">
                        <div className="flex justify-between items-center">
                            <h2 className="text-2xl font-semibold">Tables</h2>
                            <div className="rounded-full bg-white self-start flex flex-col lg:text-lg text-base font-bold lg:px-4 lg:py-3 px-3.5 py-2.5 justify-center">
                                <span>40%</span>
                                <span className="-mt-2">OFF</span>
                            </div>
                        </div>
                        <Image
                            src={"/table_3.png"}
                            className="object-cover lg:h-[300px] lg:mt-8"
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