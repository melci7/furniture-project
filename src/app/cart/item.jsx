"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Trash2, Minus, Plus } from "lucide-react";

export default function Item({ product, addToCart, decreaseFromCart, removeFromCart }) {
    const [count, setCount] = useState(product.quantity);

    function formatPrice(price) {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    const increase = (product) => {
        setCount(prevCount => prevCount + 1);
        addToCart(product)
    };

    const decrease = (product) => {
        setCount(prevCount => prevCount - 1)
        decreaseFromCart(product)
    }


    return (
        <div className="flex w-full lg:gap-6 gap-4">
            <Link href={`/store/${product.id}`} className="rounded-[24px] bg-[#F5F5F5] p-3">
                <Image
                    className="h-[100px] w-[180px] lg:w-[120px] object-contain"
                    src={product.image}
                    alt={product.image}
                    width={120}
                    height={120}
                />
            </Link>
            <div className="flex justify-between w-full">
                <div className="flex flex-col">
                    <span className="font-semibold">{product.name}</span>
                    <span className="text-[#636363] text-sm">{product.name}</span>
                    <div className='mt-auto w-24 flex gap-1 py-1 justify-center items-center bg-[#f5f5f5] rounded-[8px]'>
                        <button
                            onClick={() => decrease(product)}
                            className={`w-6 h-6 font-bold duration-300 ease-out flex items-center justify-center transition-all ${count === 1 ? 'hover:scale-110' : ''}`}
                        >
                            {count === 1 ? <Trash2 size={18} /> : <Minus size={16} />}
                        </button>
                        <span className='font-semibold text-center text-sm w-6'>{count}</span>
                        <button
                            onClick={() => increase(product)}
                            className='w-6 h-6 font-bold duration-300 ease-out flex items-center justify-center transition-all'
                        >
                            <Plus size={16} />
                        </button>
                    </div>

                </div>
                <div className="flex flex-col justify-between">
                    <span className="font-medium" >${product.discount ? product.price - (product.price * product.discount / 100) : product.price}</span>
                    {product.quantity !== 1 &&
                        <button
                            onClick={() => removeFromCart(product)}
                            className='w-6 h-6 font-bold duration-300 ease-out flex self-end justify-center transition-all hover:scale-110 text-red-600'
                        >
                            <Trash2 size={18} />
                        </button>
                    }
                </div>
            </div>
        </div>
    );
}
