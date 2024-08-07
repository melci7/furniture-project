import Image from "next/image"
import Link from "next/link"

export default function BottomOfferSection() {
    return (
        <section className="w-full mt-16 mb-20">
            <div className="bg-[#ffd873] rounded-[24px] flex items-center py-6 px-16 pb-0 pr-4 justify-between">
                <div className="flex flex-col items-start gap-7 pb-6">
                    <h2 className="text-5xl font-semibold font-sans">Winter offer</h2>
                    <p className="text-5xl font-medium font-sans">05d : 32h : 35m</p>
                    <Link href="/store" className="bg-white rounded-3xl py-3.5 px-6 text-sm self-start inline-block">
                        Open Page
                    </Link>
                </div>
                <Image
                    src={"/furniture.png"}
                    className="object-cover self-end"
                    width={900}
                    height={600}
                    alt="Sofa"
                />
            </div>
        </section>
    )
}