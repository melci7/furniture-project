import Image from "next/image"
import Link from 'next/link'

export default function OfferSection({ product }) {
    return (
        <section className="w-full px-8 mt-24 flex gap-40">
            <div className="max-w-[360px] flex flex-col gap-8">
                <h2 className="text-5xl font-semibold font-sans">Daily offer</h2>
                <p className="text-[#636363] font-sans">Check out our daily offers that can combine big discounts on some products. Offers may change every day, do not miss your chance.</p>
                <Link href="/store" className="bg-[#FFD873] rounded-3xl py-3.5 px-6 text-sm self-start inline-block">
                    Open Store
                </Link>
            </div>
            <div className="flex w-full gap-5 font-sans">
                <div className="w-5/12 bg-[#dfe5f3] rounded-[24px] py-5 px-8 flex flex-col h-[390px]">
                    <Link href={"/store/8"} className="flex flex-col h-full">
                        <div className="flex justify-between items-center">
                            <h2 className="text-2xl font-semibold">Accent Chair</h2>
                            <div className="flex flex-col rounded-full bg-white self-start font-bold text-lg px-4 py-3 justify-center ">
                                <span>30%</span>
                                <span className="-mt-2">OFF</span>
                            </div>
                        </div>

                        <Image
                            src={"/chair.png"}
                            className="object-cover h-full"
                            width={700}
                            height={700}
                            alt="Chair"
                        />

                    </Link>
                </div>
                <div className="w-7/12 bg-[#fdedd6] rounded-[24px] py-5 px-8 flex flex-col relative h-[440px] justify-between">
                    <Link href={"#"} className="flex flex-col h-full">
                        <div className="flex justify-between items-center">
                            <h2 className="text-4xl font-semibold">Tables</h2>
                            <div className="rounded-full bg-white self-start flex flex-col text-lg font-bold px-4 py-3 justify-center">
                                <span>40%</span>
                                <span className="-mt-2">OFF</span>
                            </div>
                        </div>
                        <Image
                            src={"/table_3.png"}
                            className="object-cover h-[300px] mt-8"
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