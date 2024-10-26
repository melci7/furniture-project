import Image from "next/image"

export default function Newsletter() {
    return (
        <section className="w-full lg:px-8 px-6 lg:mt-24 mt-16 flex flex-col items-center lg:gap-6 gap-3">
            <p className="font-medium lg:text-4xl text-3xl lg:max-w-[600px] text-center lg:leading-snug font-sans">Subscribe to our newsletter and grab <span className="font-bold">30% OFF!</span></p>
            <div className="flex flex-col md:flex-row items-center lg:gap-3 gap-4  w-full lg:w-[750px]">
                <Image
                    src={"/letter.png"}
                    className="lg:mr-4 lg:w-[100px]"
                    alt="Letter Icon"
                    width={72}
                    height={72}
                />
                <input className="text-sm lg:text-base w-full xl:py-3 xl:px-6 py-2 px-4 -mt-3 md:mt-0 rounded-[24px] border border-[#455EA0] focus-visible:outline" placeholder="Your email" type="email" />
                <button className="bg-[#2D2D2D] rounded-3xl py-3 xl:py-3.5 px-6 text-xs lg:text-sm text-white duration-300 ease-out hover:bg-opacity-75">Subscribe</button>
            </div>
        </section>
    )
}