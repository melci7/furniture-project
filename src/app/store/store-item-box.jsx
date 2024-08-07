import Image from "next/image"
import Link from 'next/link'
export default function StoreItemBox({ icon, category, handleClick, isSelected }) {
    return (
        <div
            className={`bg-[#f5f5f5] rounded-[24px] py-6 px-14 cursor-pointer hover:bg-[#ffd873] ease-out duration-300 ${isSelected && 'bg-[#ffd873]'}`}
            onClick={() => handleClick(category)}
        >

            <Image
                src={icon}
                className="stroke-slate-300 m-auto"
                alt="Chair Icon"
                width={65}
                height={65}
            />
            <h3 className="text-center font-bold text-md mt-3">{category}</h3>

        </div>
    )
}