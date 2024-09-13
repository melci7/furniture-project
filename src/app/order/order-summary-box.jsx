import React from 'react';
import { ShoppingBag, Truck, Tag } from 'lucide-react';

export default function OrderSummaryBox({ product }) {
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

    const freeShippingThreshold = 2000; // Free shipping for orders over $1000
    const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
    console.log(subtotal)
    return (
        <div className="w-full">
            <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
            <div className="w-full p-6 rounded-[24px] shadow-md flex flex-col gap-4">
                <div className="flex justify-between items-center">
                    <span className="flex items-center"><ShoppingBag size={18} className="mr-2" /> Items ({product.length})</span>
                    <span>${formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="flex items-center"><Truck size={18} className="mr-2" /> Delivery</span>
                    <span className={`${subtotal > 2000 && "line-through"}`}>${subtotal > 0 ? formatPrice(delivery) : "0.00"}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="flex items-center"><Tag size={18} className="mr-2" /> Estimated Tax</span>
                    <span>${formatPrice(tax)}</span>
                </div>
                {remainingForFreeShipping > 0 && (
                    <div className="text-sm text-green-600 mt-2">
                        Add ${formatPrice(remainingForFreeShipping)} more to your order for free shipping!
                    </div>
                )}
                <div className="flex justify-between border-t border-[#dfdfdf] pt-4 font-semibold text-lg">
                    <span>Total</span>
                    <span>${formatPrice(total)}</span>
                </div>
            </div>
        </div>
    );
}