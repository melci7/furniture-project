"use client";
import Item from "./item";
import { useState, useEffect } from "react";
import SummaryBox from "./summary-box";
import Link from "next/link";
import { X, Check } from 'lucide-react';
import { useShoppingCart } from "@/components/useShoppingCart";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function ItemList() {
    const [isClicked, setIsClicked] = useState(false);
    const { cartItems, addToCart, decreaseFromCart, removeFromCart } = useShoppingCart();
    const { data: session } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (isClicked) {
            document.body.classList.add('overflow-hidden');
        } else {
            document.body.classList.remove('overflow-hidden');
        }

        return () => {
            document.body.classList.remove('overflow-hidden');
        };
    }, [isClicked]);

    const handleCheckout = () => {
        const returnUrl = encodeURIComponent('/order');
        router.push(`/login?returnUrl=${returnUrl}`);
    };

    const handleClick = () => {
        if (session) {
            router.push("/order");
        } else {
            setIsClicked(prev => !prev);
        }
    };

    return (
        <div className="w-full flex flex-col lg:flex-row lg:gap-20 desktop:gap-32 gap-8 items-baseline">
            {isClicked && !session && (
                <div
                    className="fixed inset-0 bg-black/30 z-20 transition-opacity duration-300 ease-out"
                    onClick={handleClick}
                    style={{
                        opacity: isClicked ? 1 : 0,
                    }}
                ></div>
            )}
            <div className="flex flex-col lg:w-3/5 desktop:w-4/6 w-full gap-6 h-screen">
                {cartItems.length > 0 ? (
                    <>
                        <span className="text-2xl font-semibold">Cart</span>
                        {cartItems.map(item =>
                            <Item
                                key={item.id}
                                product={item}
                                addToCart={addToCart}
                                decreaseFromCart={decreaseFromCart}
                                removeFromCart={removeFromCart}
                            />
                        )}
                    </>
                ) : (
                    <div className="flex flex-col">
                        <span className="text-3xl font-semibold mb-4">Your cart is empty</span>
                        <Link
                            href="/store"
                            className="self-start inline-block text-xl pb-0.5 font-semibold text-black relative group"
                        >
                            <span className="relative z-10">Go to Store</span>
                            <div className="absolute bottom-0 left-0 w-1/2 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></div>
                        </Link>
                    </div>
                )}
            </div>
            <div className="lg:w-2/5 desktop:w-2/6 w-full flex flex-col">
                <SummaryBox product={cartItems} handleClick={handleClick} />
                {!session && (
                    <div
                        className={`fixed top-0 right-0 z-30 h-screen lg:max-w-[480px] flex flex-col gap-14 px-6 py-5 lg:rounded-tl-[8px] lg:rounded-bl-[8px] border bg-white transition-transform duration-300 ease-out ${isClicked ? 'translate-x-0' : 'translate-x-full'
                            }`}
                    >
                        <div className="flex justify-end">
                            <button onClick={handleClick}><X size={22} /></button>
                        </div>
                        <div className="px-4 flex flex-col gap-8">
                            <h2 className="lg:text-2xl text-xl font-bold lg:mb-4">Choose how you would like to check out</h2>
                            <div className="flex flex-col gap-1">
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
                                    <span>Save time during checkout</span>
                                </span>
                            </div>

                            <button
                                onClick={handleCheckout}
                                className="bg-black py-3 mt-3 text-white lg:text-lg rounded-3xl w-full hover:bg-opacity-75 duration-300 ease-out text-center"
                            >
                                Join or log in
                            </button>
                            <div className="lg:my-3 my-1 text-[#636363] text-xs lg:text-sm text-center border-b border-[#dfdfdf]">
                                OR
                            </div>
                            <Link
                                href="/order"
                                className="bg-[#455EA0] py-3 text-white lg:text-lg rounded-3xl w-full hover:bg-[#304170] duration-300 ease-out text-center"
                            >
                                Continue as guest
                            </Link>
                            <p className="text-[#636363] text-xs text-center -mt-2 lg:mt-0">
                                By continuing as a guest, you might miss out member discounts.
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}