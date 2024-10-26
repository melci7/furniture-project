import Image from "next/image"
import Link from "next/link"

export default function BottomOfferSection() {
    return (
        <section className="w-full lg:mt-24 mt-16 lg:mb-20 mb-16">
            <div className="bg-[#ffd873] rounded-[24px] flex flex-col lg:flex-row items-center lg:py-8 lg:px-10 xl:px-16 lg:pb-0 lg:pr-4 py-8 px-6 justify-between w-full">
                <div className="flex flex-col lg:items-start items-center desktop:gap-7 gap-2 lg:gap-4 lg:pb-6 lg:w-1/4">
                    <h2 className="desktop:text-5xl text-4xl font-semibold font-sans">Winter offer</h2>
                    <p className="desktop:text-5xl text-4xl lg:text-3xl font-medium font-sans">05d : 32h : 35m</p>
                    <Link href="/store" className="bg-white rounded-3xl xl:py-3.5 xl:px-6 lg:text-sm py-3 px-4 text-xs lg:self-start lg:inline-block hidden duration-200 ease-out hover:bg-zinc-100">
                        Open Page
                    </Link>
                </div>
                <div className="flex flex-col items-center gap-4 lg:w-3/4">
                    <Image
                        src={"/furniture.png"}
                        className="object-cover self-end"
                        width={900}
                        height={600}
                        alt="Sofa"
                    />
                    <Link href="/store" className="bg-white rounded-3xl lg:py-3.5 lg:px-6 lg:text-sm py-3 px-4 text-xs lg:self-start inline-block lg:hidden duration-200 ease-out hover:bg-zinc-100">
                        Open Page
                    </Link>
                </div>

            </div>
        </section>
    )
}