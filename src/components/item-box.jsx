import { Heart, ShoppingCart } from 'lucide-react'
import Link from "next/link"

export default function ItemBox({ product, addToCart }) {

    function formatPrice(price) {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    return (
        <Link href={`/store/${product.id}`} className={`relative rounded-[24px] bg-[#F5F5F5] hover:bg-[#FDEDD6] ease-out duration-300 flex flex-col justify-between p-6 ${product.category === "Sofa" ? "max-w-[600px]" : "max-w-[335px]"}  w-fit h-full flex-auto`}>
            <Heart className='absolute left-6 top-6' strokeWidth={1.25} size={32} />
            {product.discount &&
                <div className='bg-[#ffd873] rounded-full py-1 px-2 absolute right-6 top-6 text-sm font-medium'>
                    -{product.discount}%
                </div>
            }
            <img
                src={product.image}
                className={`${product.category !== "Sofa" ? "w-[360px]" : "w-full"} h-[300px] self-center p-2 object-contain`}
                alt={product.name}
            />
            <div className='flex flex-col'>
                <span className='font-medium'>{product.name}</span>
                <div className='flex gap-1.5'>
                    <span className={`text-sm ${product.discount && 'line-through text-[#636363]'}`}>
                        ${formatPrice(product.price)}
                    </span>
                    {product.discount &&
                        <span className='text-sm'>
                            ${formatPrice(product.price - (product.price * product.discount / 100))}
                        </span>
                    }
                </div>
            </div>
            <button
                onClick={(e) => {
                    e.preventDefault();
                    addToCart(product);
                }}
                className='bg-[#455EA0] absolute right-6 bottom-6 rounded-full p-3 
                transition-all duration-300 
                hover:bg-[#3A4F85] hover:scale-110 
                active:bg-[#304170] active:scale-95
                group '>
                <ShoppingCart className='transition-transform duration-300 
                    group-hover:rotate-12 
                    group-active:rotate-0'
                    strokeWidth={1.5} size={24} color='white' />
            </button>
        </Link >
    )
}