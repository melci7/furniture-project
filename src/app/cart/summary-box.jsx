"use client";
import { ShoppingBag, Truck, Tag } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function SummaryBox({ product, handleClick }) {
    const [subtotal, setSubtotal] = useState(0);

    useEffect(() => {
        setSubtotal(product.reduce((total, item) => total + (item.price * item.quantity), 0));
    }, [product]);

    function formatPrice(price) {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    const delivery = 199;
    const total = subtotal + delivery

    return (
        <div className="w-full">
            <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
            <div className="w-full p-6 rounded-[24px] shadow-md flex flex-col gap-4">
                <div className="flex justify-between items-center">
                    <span className="flex items-center"><ShoppingBag size={18} className="mr-2" /> Items </span>
                    <span>${formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="flex items-center"><Truck size={18} className="mr-2" /> Delivery</span>
                    <span>${subtotal > 0 ? formatPrice(delivery) : "0"}</span>
                </div>
                <div className="flex justify-between border-t border-[#dfdfdf] pt-4 font-semibold text-lg">
                    <span>Total</span>
                    <span>${subtotal > 0 ? formatPrice(subtotal + delivery) : "0"}</span>
                </div>
                <button
                    className={`
                        bg-black py-3 mt-3 text-white text-lg rounded-3xl w-full 
                        transition-all duration-300 ease-out
                        ${subtotal === 0
                            ? 'opacity-50 cursor-not-allowed'
                            : 'hover:bg-opacity-75'
                        }
                    `}
                    disabled={subtotal === 0}
                    onClick={() => handleClick()}
                >
                    Proceed to Checkout
                </button>
            </div>
        </div>
    );
}