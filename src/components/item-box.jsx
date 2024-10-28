import { Heart, ShoppingCart, CircleCheckBig } from 'lucide-react'
import Link from "next/link"
import { toast } from 'sonner'

export default function ItemBox({ product, addToCart, recommended }) {

    function formatPrice(price) {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    const handleAddToCart = (e) => {
        e.preventDefault();
        addToCart(product);
        toast.success(`${product.name} added to cart`, {
            position: 'top-right',
            closeButton: "true"
        });
    }

    return (
        <Link href={`/store/products/${product.id}`} className={`relative rounded-[24px] bg-[#F5F5F5] hover:bg-[#FDEDD6] ease-out duration-300 flex flex-col justify-between p-6 ${recommended ? "w-full" : "w-full md:w-[calc(50%-1rem)] lg:w-[calc(33%-1rem)]"}`}>
            <Heart className='absolute left-6 top-6 ' strokeWidth={1.25} size={32} />
            {product.discount &&
                <div className='bg-[#ffd873] rounded-full py-1 px-2 absolute right-6 top-6 text-sm font-medium'>
                    -{product.discount}%
                </div>
            }
            <img
                src={product.image[0]}
                className={` lg:h-[300px] h-56 self-center ${recommended ? "p-6" : "p-2"} object-contain`}
                alt={product.name}
            />
            <div className='flex flex-col'>
                <span className='font-medium text-sm'>{product.name}</span>
                <span className='text-sm'>{product.description.split(",")[0]}</span>
                <div className='flex gap-1.5 items-center mt-1'>
                    <span className={`text-lg font-medium ${product.discount && 'text-sm line-through text-[#636363]'}`}>
                        ${formatPrice(Math.ceil(product.price).toFixed(2))}
                    </span>
                    {product.discount &&
                        <span className='text-lg font-medium'>
                            ${formatPrice(Math.ceil(product.price - (product.price * product.discount / 100)).toFixed(2))}
                        </span>
                    }
                </div>

            </div>
            <button
                onClick={handleAddToCart}
                className='bg-[#455EA0] absolute right-6 bottom-6 rounded-full p-3 
                transition-all duration-200 ease-out
                hover:bg-[#3A4F85] hover:scale-105
                active:bg-[#304170] active:scale-95'>
                <ShoppingCart strokeWidth={1.5} size={24} color='white' />
            </button>
        </Link >
    )
}