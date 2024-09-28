import Image from "next/image"
import Link from "next/link"

export default function BottomOfferSection() {
    return (
        <section className="w-full lg:mt-24 mt-16 lg:mb-20 mb-16">
            <div className="bg-[#ffd873] rounded-[24px] flex flex-col lg:flex-row items-center lg:py-6 lg:px-16 lg:pb-0 lg:pr-4 py-8 px-6 justify-between">
                <div className="flex flex-col lg:items-start items-center lg:gap-7 gap-2 lg:pb-6">
                    <h2 className="lg:text-5xl text-4xl font-semibold font-sans">Winter offer</h2>
                    <p className="lg:text-5xl text-4xl font-medium font-sans">05d : 32h : 35m</p>
                    <Link href="/store" className="bg-white rounded-3xl lg:py-3.5 lg:px-6 lg:text-sm py-3 px-4 text-xs lg:self-start lg:inline-block hidden">
                        Open Page
                    </Link>
                </div>
                <div className="flex flex-col items-center gap-4">
                    <Image
                        src={"/furniture.png"}
                        className="object-cover self-end"
                        width={900}
                        height={600}
                        alt="Sofa"
                    />
                    <Link href="/store" className="bg-white rounded-3xl lg:py-3.5 lg:px-6 lg:text-sm py-3 px-4 text-xs lg:self-start inline-block lg:hidden">
                        Open Page
                    </Link>
                </div>

            </div>
        </section>
    )
}