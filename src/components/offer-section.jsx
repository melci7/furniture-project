import Image from "next/image"
import Link from 'next/link'

export default function OfferSection({ products }) {
    const itemsWithDiscount = products.filter((item) => {
        return item.discount >= 10
    }).slice(0, 2)
    return (
        <section className="flex flex-col w-full gap-10 mt-16 lg:mt-24 lg:flex-row xl:gap-20 lg:gap-10 laptop:gap-40">
            <div className="lg:max-w-[360px] flex flex-col items-center lg-items-start lg:gap-8 gap-4">
                <h2 className="font-sans text-4xl font-semibold lg:text-5xl lg:self-start">Daily offer</h2>
                <p className="text-[#636363] font-sans text-center lg:text-start">Check out our daily offers that can combine big discounts on some products. Offers may change every day, do not miss your chance.</p>
                <Link href="/store" className="bg-[#FFD873] rounded-3xl xl:py-3.5 xl:px-6 lg:text-sm py-3 px-4 text-xs lg:self-start inline-block duration-200 ease-out hover:bg-[#ffc329]">
                    Open Store
                </Link>
            </div>
            <div className="flex flex-col w-full gap-5 font-sans lg:flex-row">
                <div className="xl:w-[45%] lg:w-1/2 bg-[#dfe5f3] rounded-[24px] py-5 px-8 flex flex-col xl:h-[390px]">
                    <Link href={`/store/products/${itemsWithDiscount[0].id}`} className="flex flex-col justify-start h-full">
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-bold">{itemsWithDiscount[0].name}</h2>
                            <div className="flex flex-col rounded-full bg-white self-start font-bold xl:text-lg text-base xl:px-4 xl:py-3 px-3.5 py-2.5 justify-center ">
                                <span>{itemsWithDiscount[0].discount}%</span>
                                <span className="-mt-2">OFF</span>
                            </div>
                        </div>

                        <img
                            src={itemsWithDiscount[0].image[0]}
                            className="self-center w-[230px] object-cover xl:w-[280px]"
                            alt={itemsWithDiscount[0].name}
                        />

                    </Link>
                </div>
                <div className="xl:w-[55%] lg:w-1/2 bg-[#fdedd6] rounded-[24px] py-5 px-8 flex flex-col relative xl:h-[440px] justify-between">
                    <Link href={`/store/products/${itemsWithDiscount[1].id}`} className="flex flex-col justify-start h-full">
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-bold">{itemsWithDiscount[1].name}</h2>
                            <div className="rounded-full bg-white self-start flex flex-col xl:text-lg text-base font-bold xl:px-4 xl:py-3 px-3.5 py-2.5 justify-center">
                                <span>{itemsWithDiscount[1].discount}%</span>
                                <span className="-mt-2">OFF</span>
                            </div>
                        </div>
                        <img
                            src={itemsWithDiscount[1].image[0]}
                            className="self-center w-[230px] object-cover xl:w-[320px]"
                            alt={itemsWithDiscount[1].name}
                        />
                    </Link>

                </div>
            </div>

        </section>
    )
}