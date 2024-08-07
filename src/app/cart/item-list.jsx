"use client";
import Item from "./item";
import { useState, useEffect } from "react";
import SummaryBox from "./summary-box";
import Link from "next/link";
import { X, Check } from 'lucide-react';

export default function ItemList() {
    const [isClicked, setIsClicked] = useState(false)
    const [cartItems, setCartItems] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem('cartItems')) || [];
        } catch (error) {
            console.error('Error reading from localStorage:', error);
            return [];
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            window.dispatchEvent(new Event('cart-updated'));
        } catch (error) {
            console.error('Error writing to localStorage:', error);
        }
    }, [cartItems]);

    const updateCart = (productId, change, remove = false) => {
        setCartItems(prevItems => {
            const updatedItems = prevItems.map(item =>
                item.id === productId
                    ? { ...item, quantity: item.quantity + change }
                    : item
            ).filter(item => item.quantity > 0 || !remove);
            return updatedItems;
        });
    };

    function handleClick() {
        setIsClicked(prevValue => !prevValue)
    }

    useEffect(() => {
        if (isClicked) {
            document.body.classList.add('overflow-hidden');
        } else {
            document.body.classList.remove('overflow-hidden');
        }

        // Cleanup function to ensure we remove the class when component unmounts
        return () => {
            document.body.classList.remove('overflow-hidden');
        };
    }, [isClicked]);

    return (
        <div className="w-full flex gap-20 items-baseline">
            {isClicked && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-20 transition-opacity duration-300 ease-out"
                    onClick={handleClick}
                    style={{
                        opacity: isClicked ? 1 : 0,
                    }}
                ></div>
            )}
            <div className="flex flex-col w-4/6 gap-6">
                {cartItems.length > 0 ? (
                    <>
                        <span className="text-2xl font-semibold">Cart</span>
                        {cartItems.map(item =>
                            <Item key={item.id} product={item} onUpdate={updateCart} />
                        )}
                    </>
                ) : (
                    <div className="">
                        <span className="text-3xl font-semibold mb-4">Your cart is empty</span>
                        <Link
                            href="/store"
                            className="inline-block text-xl pb-0.5 font-semibold text-black relative group"
                        >
                            <span className="relative z-10">Go to Store</span>
                            <div className="absolute bottom-0 left-0 w-1/2 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></div>
                        </Link>
                    </div>
                )}
            </div>
            <div className="w-2/6 flex flex-col">
                <SummaryBox product={cartItems} handleClick={handleClick} />
                <div
                    className={`fixed top-0 right-0 z-30 h-screen max-w-[480px] flex flex-col gap-14 px-6 py-5 rounded-tl-[8px] rounded-bl-[8px] border bg-white transition-transform duration-300 ease-out ${isClicked ? 'translate-x-0' : 'translate-x-full'
                        }`}
                >
                    <div className="flex justify-end">
                        <button className="" onClick={handleClick} ><X size={22} /></button>
                    </div>
                    <div className="px-4 flex flex-col gap-8">
                        <h2 className="text-2xl font-bold mb-4">Choose how you would like to check out</h2>
                        <div className="flex flex-col gap-1 ">
                            <span className="flex items-center gap-4 text-[#636363] text-sm">
                                <Check size={18} />
                                <span>Get instant benefits</span>
                            </span>
                            <span className="flex items-center gap-4 text-[#636363] text-sm">
                                <Check size={18} />
                                <span>Keep track of your orders</span>
                            </span>
                            <span className="flex items-center gap-4 text-[#636363] text-sm">
                                <Check size={18} />
                                <span>Save time during checkout

                                </span>
                            </span>
                        </div>

                        <button className="bg-black py-3 mt-3 text-white text-lg rounded-3xl w-full hover:bg-opacity-75 duration-300 ease-out">Join or log in</button>
                        <div className="my-3 text-[#636363] text-sm text-center border-b border-[#dfdfdf]">OR</div>
                        <button className="bg-[#455EA0] py-3 text-white text-lg rounded-3xl w-full hover:bg-[#304170] duration-300 ease-out"
                        >Continue as guest</button>
                        <p className="text-[#636363] text-xs text-center">By continuing as a guest, you might miss out member discounts.</p>
                    </div>

                </div>

            </div>
        </div>
    )
}
