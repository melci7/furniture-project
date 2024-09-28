"use client"

import React from 'react';
import { useState } from 'react';
import { ShoppingBag, Truck, ChevronUp, ChevronDown } from 'lucide-react';
import Spinner from '@/components/spinner';

export default function OrderSummaryBox({ product, purchaseCompleted, isLoading }) {
    const [showDetails, setShowDetails] = useState(false)

    const handleOverlayClick = (e) => {
        e.stopPropagation();
        setShowDetails(false);
    }

    function formatPrice(price) {
        return price.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    const subtotal = product.reduce((total, item) => total + (item.price * item.quantity), 0);
    const delivery = 199;
    const tax = subtotal * 0.1; // Assuming 10% tax
    let total = 0
    if (subtotal > 2000) {
        total = subtotal + tax
    } else {
        total = subtotal + tax + delivery
    }

    const quantity = product.reduce((quantity, item) => (quantity + item.quantity), 0)

    const freeShippingThreshold = 2000; // Free shipping for orders over $1000
    const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
    console.log(subtotal)
    return (
        <div className="w-full mx-[-1.25rem] lg:mx-0">
            <h2 className="text-2xl font-semibold mb-4 hidden lg:block">Order Summary</h2>
            {showDetails && (
                <div
                    className="fixed inset-0 bg-black/30 z-20 transition-opacity duration-300 ease-out"
                    style={{
                        opacity: showDetails ? 1 : 0,
                    }}
                    onClick={handleOverlayClick}
                ></div>
            )}
            <div className="fixed bg-white lg:bg-transparent lg:static bottom-0 z-30 p-6 w-full border-t border-t-[#dfdfdf] lg:border-none lg:w-full lg:p-6 lg:rounded-[24px] lg:shadow-md flex lg:flex-col gap-4 items-center lg:items-stretch">
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
                            ${showDetails ? 'max-h-36' : 'max-h-0'}
                        `}
                        aria-hidden={!showDetails}
                    >
                        <div className="justify-between items-center flex pt-4 pb-0.5">
                            <span className="flex items-center">Items </span>
                            <span>${formatPrice(subtotal)}</span>
                        </div>
                        <div className="justify-between items-center flex pb-0.5">
                            <span className="flex items-center">Delivery</span>
                            <span className={`${subtotal > 2000 && "line-through"}`}>${subtotal > 0 ? formatPrice(delivery) : "0.00"}</span>
                        </div>
                        <div className={`flex justify-between items-center ${remainingForFreeShipping > 0 ? "pb-1.5" : "pb-4"}`}>
                            <span className="flex items-center">Estimated Tax</span>
                            <span>${formatPrice(tax)}</span>
                        </div>
                        {remainingForFreeShipping > 0 && (
                            <div className="text-sm text-green-600 mb-3">
                                Add ${formatPrice(remainingForFreeShipping)} more to your order for free shipping!
                            </div>
                        )}
                    </div>

                    <span className='lg:block hidden'>Total</span>
                    <span className='lg:hidden text-xs tracking-wide uppercase mb-1'>Items({quantity})</span>
                    <span className='flex gap-1'>${formatPrice(total)}
                        <button className='lg:hidden' onClick={(e) => { e.stopPropagation(); setShowDetails(prev => !prev); }}>
                            {showDetails ? <ChevronDown size={18} /> : <ChevronUp size={18} />}
                        </button>
                    </span>
                </div>
            </div>
        </div>
    );
}