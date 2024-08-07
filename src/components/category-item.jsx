import Image from "next/image"
import Link from 'next/link'
export default function CategoryItem({ icon, category, width = 80 }) {
    return (
        <div className="bg-[#f5f5f5] rounded-[24px] py-8 px-20 cursor-pointer hover:bg-[#ffd873] ease-out duration-300">
            <Link href={"#"}>
                <Image
                    src={icon}
                    className="stroke-slate-300 m-auto"
                    alt="Chair Icon"
                    width={width}
                    height={80}
                />
                <h3 className="text-center font-bold text-xl mt-5">{category}</h3>
            </Link>
        </div>
    )
}