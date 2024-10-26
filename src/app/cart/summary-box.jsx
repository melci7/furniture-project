"use client";
import { ShoppingBag, Truck, ChevronUp, ChevronDown } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function SummaryBox({ product, handleClick }) {
    const [subtotal, setSubtotal] = useState(0);
    const [quantity, setQuantity] = useState(0)
    const [showDetails, setShowDetails] = useState(false)

    useEffect(() => {
        setSubtotal(product.reduce((total, item) => total + (item.price * item.quantity), 0));
        setQuantity(product.reduce((quantity, item) => (quantity + item.quantity), 0))
    }, [product]);

    function formatPrice(price) {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    const delivery = 199;
    const total = subtotal + delivery

    const handleOverlayClick = (e) => {
        e.stopPropagation();
        setShowDetails(false);
    }

    return (
        <div className="w-full mx-[-1.25rem] lg:mx-0 md:mx-[-5.25rem]">
            <h2 className="text-2xl font-semibold mb-4 hidden lg:block">Order Summary</h2>
            {showDetails && (
                <div
                    className="fixed inset-0 bg-black/30 z-10 transition-opacity duration-300 ease-out"
                    style={{
                        opacity: showDetails ? 1 : 0,
                    }}
                    onClick={handleOverlayClick}
                ></div>
            )}
            <div className="fixed bg-white lg:bg-transparent lg:static bottom-0 z-10 p-6 w-full border-t border-t-[#dfdfdf] lg:border-none lg:w-full lg:p-6 lg:rounded-[24px] lg:shadow-md flex lg:flex-col gap-4 items-center lg:items-stretch">
                <div className="justify-between items-center lg:flex hidden">
                    <span className="flex items-center"><ShoppingBag size={18} className="mr-2" /> Items </span>
                    <span>${formatPrice(subtotal)}</span>
                </div>
                <div className="justify-between items-center lg:flex hidden">
                    <span className="flex items-center"><Truck size={18} className="mr-2" /> Delivery</span>
                    <span>${subtotal > 0 ? formatPrice(delivery) : "0"}</span>
                </div>
                <div className="flex flex-col lg:flex-row justify-between lg:border-t border-[#dfdfdf] lg:pt-4 font-semibold text-lg">
                    <div
                        className={`
                            lg:hidden rounded-t-[12px] flex flex-col justify-center gap-1 
                            absolute inset-x-0 bottom-24 px-6 w-full mx-auto bg-white 
                            border-y border-[#dfdfdf] overflow-hidden
                            transition-all duration-300 ease-out text-sm
                            ${showDetails ? 'max-h-24' : 'max-h-0'}
                        `}
                        aria-hidden={!showDetails}
                    >
                        <div className="justify-between items-center flex pt-4 pb-1">
                            <span className="flex items-center">Items </span>
                            <span>${formatPrice(subtotal)}</span>
                        </div>
                        <div className="justify-between items-center flex pb-4">
                            <span className="flex items-center">Delivery</span>
                            <span>${subtotal > 0 ? formatPrice(delivery) : "0"}</span>
                        </div>
                    </div>

                    <span className='lg:block hidden'>Total</span>
                    <span className='lg:hidden text-xs tracking-wide uppercase mb-1'>Items({quantity})</span>
                    <span className='flex gap-1'>${subtotal > 0 ? formatPrice(subtotal + delivery) : "0"}
                        <button className='lg:hidden' onClick={(e) => { e.stopPropagation(); setShowDetails(prev => !prev); }}>
                            {showDetails ? <ChevronDown size={18} /> : <ChevronUp size={18} />}
                        </button>
                    </span>
                </div>
                <button
                    className={`
                        bg-black py-2.5 lg:mt-3 text-white lg:text-lg rounded-3xl lg:w-full ml-auto w-3/5 
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