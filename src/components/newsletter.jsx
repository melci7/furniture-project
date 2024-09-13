import Image from "next/image"

export default function Newsletter() {
    return (
        <section className="w-full px-8 mt-24 flex flex-col items-center gap-6">
            <p className="font-medium text-4xl max-w-[600px] text-center leading-snug font-sans">Subscribe to our newsletter and grab <span className="font-bold">30% OFF!</span></p>
            <div className="flex items-center gap-3 w-[750px]">
                <Image
                    src={"/letter.png"}
                    className="mr-4"
                    alt="Letter Icon"
                    width={100}
                    height={100}
                />
                <input className="w-full py-3 px-8 rounded-[24px] border border-[#455EA0] focus-visible:outline" placeholder="Your email" type="email" />
                <button className="bg-[#2D2D2D] rounded-3xl py-3.5 px-7 text-sm text-white duration-300 ease-out hover:bg-opacity-75">Subscribe</button>
            </div>
        </section>
    )
}