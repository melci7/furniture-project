import Image from "next/image"
import Link from "next/link"
export default function GetReadySection() {
    return (
        <section className="w-full flex flex-col lg:flex-row lg:gap-16 xl:gap-28 gap-10 lg:mt-36 mt-16 items-center">
            <div className="order-2 lg:order-1 flex flex-col items-center lg:items-start w-full gap-6">
                <img
                    src={"/blue-img.jpg"}
                    className="object-cover rounded-[24px]"
                    alt="Blue sofa"
                />
                <Link href="/store" className=" bg-[#FFD873] rounded-3xl xl:py-3.5 xl:px-6 xl:text-sm py-3 px-4 text-xs lg:self-start inline-block lg:hidden duration-200 ease-out hover:bg-[#ffc329]">
                    Open Store
                </Link>
            </div>

            <div className="flex flex-col w-full lg:gap-12 gap-4 order-1 items-center lg-items-start">
                <h2 className="lg:text-5xl text-4xl lg:self-start font-semibold lg:max-w-[380px] font-sans">Get ready for winter</h2>
                <p className="text-base lg:text-xl text-[#636363] font-sans text-center lg:text-start">Curl up loved ones on our plush <span className="font-bold text-black">sofas</span> and sink into the soft embrace of <span className="font-bold text-black">winter-ready</span> fabrics. <span className="font-bold text-black">Enjoy </span><span>{"the seasons festivities surrounded by our"}</span> <span className="font-bold text-black">stylish</span> and inviting living room <span className="font-bold text-black">furniture.</span></p>
                <Link href="/store" className="bg-[#FFD873] rounded-3xl xl:py-3.5 xl:px-6 lg:text-sm py-3 px-4 text-xs lg:self-start hidden lg:inline-block duration-200 ease-out hover:bg-[#ffc329]">
                    Open Store
                </Link>
            </div>
        </section>
    )
}