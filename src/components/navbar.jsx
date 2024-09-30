"use client"
import * as React from "react"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ShoppingCart, Heart, UserRound, LogOut, Package, Home, Menu, X } from 'lucide-react'
import { useCart } from "@/app/cart/useCart"
import { useSession, signOut } from "next-auth/react"
import Loading from "./loading"
import { useState, useEffect } from "react"

export default function Navbar() {
    const pathname = usePathname()
    const quantity = useCart();
    const { data: session, status } = useSession()
    const [showDropdown, setShowDropdown] = useState(false)
    const [isSticky, setIsSticky] = useState(false)
    const [showUser, setShowUser] = useState(false)

    useEffect(() => {
        function sticky() {
            if (window.scrollY >= 180) {
                setIsSticky(true)
            } else {
                setIsSticky(false)
            }
        }

        window.addEventListener("scroll", sticky)
        return () => {
            window.removeEventListener("scroll", sticky)
        }
    }, [])

    useEffect(() => {
        if (showUser) {
            document.body.classList.add('overflow-hidden');
        } else {
            document.body.classList.remove('overflow-hidden');
        }

        return () => {
            document.body.classList.remove('overflow-hidden');
        };
    }, [showUser]);

    const toggleDropdown = () => setShowDropdown(!showDropdown)

    return (
        <div className={`mx-[-1.25rem] transition-all duration-300 ease-out px-5 ${isSticky ? "sticky top-0 z-20 bg-white py-4  lg:bg-transparent lg:py-0 lg:relative lg:z-0" : ""}  `}>
            <header className={`w-full flex justify-between items-center `}>
                {showUser && (
                    <div
                        className="fixed inset-0 bg-black/30 z-20 transition-opacity duration-300 ease-out"
                        onClick={() => setShowUser(false)}
                        style={{
                            opacity: showUser ? 1 : 0,
                        }}
                    ></div>
                )}
                {showDropdown && (
                    <div
                        className="fixed inset-0 "
                        onClick={toggleDropdown}
                    ></div>
                )}
                <Link href={"/"} className="font-bold text-lg">Logo</Link>
                <nav
                    className={`lg:hidden overflow-hidden rounded-[36px] p-8 fixed inset-x-4 bottom-0 h-72 w-11/12 mx-auto bg-white z-40 transform ${showUser ? '-translate-y-4' : 'translate-y-full'} transition-transform duration-200 ease-out`}
                    aria-hidden={!showUser}
                >
                    <div className="w-8 h-8 bg-[#EEF2FF] rounded-full absolute flex items-center justify-center right-8 top-8 -mt-1">

                        <X strokeWidth={3} size={18} color="#5C75B8" onClick={() => setShowUser(false)} />
                    </div>
                    {session && <div className="flex items-center border-b border-[#dfdfdf]">
                        <h2 className="font-semibold text-[19px] mb-4 pl-2">{session.user.name}</h2>
                    </div>
                    }
                    <div className="flex flex-col text-[17px] font-semibold mt-4 gap-3"
                        onClick={() => setShowUser(false)}>
                        <Link href="/account/orders" className="flex items-center py-2.5 px-4 text-black bg-[#EEF2FF] rounded-2xl">
                            <Package size={21} className="mr-3" color="#5C75B8" />
                            Orders
                        </Link>
                        <Link href="/account/addresses" className="flex items-center py-2.5 px-4 text-black bg-[#EEF2FF] rounded-2xl">
                            <Home size={21} className="mr-3" color="#5C75B8" />
                            Addresses
                        </Link>
                        <button
                            onClick={() => signOut()}
                            className="flex items-center w-full px-4 py-2.5 text-red-600 bg-red-50 rounded-2xl"
                        >
                            <LogOut size={21} className="mr-3" />
                            Logout
                        </button>
                    </div>
                </nav>
                <nav className="lg:block hidden">
                    <ul className="flex gap-5 bg-indigo-50 px-3 py-2 rounded-3xl text-sm font-medium text-[#636363]">
                        <Link href="/" className={`py-1.5 px-5 rounded-3xl ease-out duration-300 hover:bg-white hover:text-black ${pathname === '/' ? 'bg-white text-black' : ''}`}>Home</Link>
                        <Link href="/about" className={`py-1.5 px-5 rounded-3xl ease-out duration-300 hover:bg-white hover:text-black ${pathname === '/about' ? 'bg-white text-black' : ''}`}>About</Link>
                        <Link href="/store" className={`py-1.5 px-5 rounded-3xl ease-out duration-300 hover:bg-white hover:text-black ${pathname === '/store' ? 'bg-white text-black' : ''}`}>Store</Link>
                        <Link href="/sale" className={`py-1.5 px-5 rounded-3xl ease-out duration-300 hover:bg-white hover:text-black ${pathname === '/sale' ? 'bg-white text-black' : ''}`}>Sale</Link>
                    </ul>
                </nav>
                {status === "loading" ? <Loading /> : (
                    <ul className="flex lg:gap-2">
                        <div className="relative">
                            {session ? (
                                <div>
                                    <button
                                        onClick={toggleDropdown}
                                        className="hidden lg:flex rounded-full border border-gray-400 p-2 gap-2 items-center text-sm"
                                    >
                                        <UserRound strokeWidth={1.75} size={22} />
                                    </button>
                                    <button
                                        onClick={() => setShowUser(prevValue => !prevValue)}
                                        className="lg:hidden rounded-full lg:border border-gray-400 p-2 flex gap-2 items-center text-sm"
                                    >
                                        <UserRound strokeWidth={1.75} size={22} />
                                    </button>
                                </div>


                            ) : (
                                <Link href="/login" className="rounded-full lg:border border-gray-400 p-2 lg:px-3 flex gap-1 lg:gap-2 items-center text-sm">
                                    <UserRound strokeWidth={1.75} size={22} />
                                    <span className="font-medium">Log in</span>
                                </Link>
                            )}
                            {showDropdown && session && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg py-2 z-10 border border-gray-200">
                                    <h3 className="px-4 py-2 text-sm font-medium text-black border-b border-gray-200">{session.user.name}</h3>
                                    <Link href="/account/orders" className="flex items-center px-4 py-2 text-sm text-black hover:bg-[#EEF2FF] hover:text-[#5C75B8]">
                                        <Package size={18} className="mr-2" />
                                        Orders
                                    </Link>
                                    <Link href="/account/addresses" className="flex items-center px-4 py-2 text-sm text-black hover:bg-[#EEF2FF] hover:text-[#5C75B8]">
                                        <Home size={18} className="mr-2" />
                                        Addresses
                                    </Link>
                                    <button
                                        onClick={() => signOut()}
                                        className="flex items-center w-full px-4 py-2 text-sm text-black hover:bg-red-50 hover:text-red-600"
                                    >
                                        <LogOut size={18} className="mr-2" />
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                        <Link href="#" className="rounded-full lg:border border-gray-400 p-2">
                            <Heart strokeWidth={1.75} size={22} />
                        </Link>
                        <Link href="/cart" className="rounded-full lg:border border-gray-400 p-2 relative">
                            {quantity !== 0 && <div className="absolute lg:-top-3 lg:-right-1.5 -top-0.5 right-0 flex items-center justify-center rounded-full lg:w-[22px] lg:h-[22px] w-5 h-5 bg-[#5C75B8] text-white lg:text-sm text-xs">
                                {quantity}
                            </div>}
                            <ShoppingCart strokeWidth={1.75} size={22} />
                        </Link>
                        <button
                            className="lg:hidden p-2 pr-0"

                        >
                            <Menu strokeWidth={1.75} size={22} />
                        </button>
                    </ul>
                )}
            </header>
        </div>
    )
}