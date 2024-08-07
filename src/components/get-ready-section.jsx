import Image from "next/image"
import Link from "next/link"
export default function GetReadySection() {
    return (
        <section className="w-full flex px-8 gap-28 mt-24 items-center">
            <Image
                src={"/image_3.jpg"}
                className="object-none object-left rounded-[24px] h-[460px]"
                width={550}
                height={550}
                alt="Blue sofa"
            />
            <div className="flex flex-col w-full gap-12">
                <h2 className="text-5xl font-semibold max-w-[380px] font-sans">Get ready for winter</h2>
                <p className="text-xl text-[#636363] font-sans">Curl up loved ones on our plush <span className="font-bold text-black">sofas</span> and sink into the soft embrace of <span className="font-bold text-black">winter-ready</span> fabrics. <span className="font-bold text-black">Enjoy</span> the season's festivities surrounded by our <span className="font-bold text-black">stylish</span> and inviting living room <span className="font-bold text-black">furniture.</span></p>
                <Link href="/store" className="bg-[#FFD873] rounded-3xl py-3.5 px-6 text-sm self-start inline-block">
                    Open Store
                </Link>
            </div>
        </section>
    )
}