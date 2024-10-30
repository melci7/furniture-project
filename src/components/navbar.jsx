"use client"
import * as React from "react"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ShoppingCart, UserRound, LogOut, Package, Home, Menu, X } from 'lucide-react'
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
    const [showMobileMenu, setShowMobileMenu] = useState(false)

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
        if (showUser || showMobileMenu) {
            document.body.classList.add('overflow-hidden');
        } else {
            document.body.classList.remove('overflow-hidden');
        }

        return () => {
            document.body.classList.remove('overflow-hidden');
        };
    }, [showUser, showMobileMenu]);

    const toggleDropdown = () => setShowDropdown(!showDropdown)

    return (
        <div className={`mx-[-1.25rem] transition-all duration-300 ease-out px-5 ${isSticky ? "sticky top-0 z-20 bg-white py-4  md:bg-transparent md:py-0 md:relative md:z-0" : ""}  `}>
            <header className={`w-full flex justify-between items-center `}>
                {(showUser || showMobileMenu) && (
                    <div
                        className="fixed inset-0 bg-black/30 z-20 transition-opacity duration-300 ease-out"
                        onClick={() => {
                            setShowUser(false)
                            setShowMobileMenu(false)
                        }}
                        style={{
                            opacity: showUser || showMobileMenu ? 1 : 0,
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

                {/* Mobile Menu */}
                <nav
                    className={`md:hidden overflow-hidden rounded-[36px] p-8 pt-7 fixed inset-x-4 top-0 h-68 w-11/12 mx-auto bg-white z-40 transform ${showMobileMenu ? 'translate-y-4' : '-translate-y-full'} transition-transform duration-200 ease-out`}
                    aria-hidden={!showMobileMenu}
                >
                    <div className="w-6 h-6 bg-[#EEF2FF] rounded-full absolute flex items-center justify-center right-8 top-7">
                        <X strokeWidth={3} size={16} color="#5C75B8" className="cursor-pointer" onClick={() => setShowMobileMenu(false)} />
                    </div>
                    <div className="flex items-center border-b border-[#dfdfdf]">
                        <h2 className="font-medium text-sm mb-4 pl-0">Navigation</h2>
                    </div>
                    <div className="flex flex-col text-[15px] text-center font-medium gap-2 px-3 py-2 mt-4 bg-[#EEF2FF] rounded-3xl"
                        onClick={() => setShowMobileMenu(false)}>
                        <Link href="/" className={` py-2 px-3 bg-white rounded-2xl ${pathname === '/' ? 'bg-white text-[#5C75B8]' : ''}`}>
                            <span className={`rounded-2xl py-1.5 px-8 ${pathname === '/' ? 'bg-[#EEF2FF]' : ''}`}>Home</span>
                        </Link>
                        <Link href="/store" className={` py-2 px-3 bg-white rounded-2xl ${pathname === '/store' ? 'bg-white text-[#5C75B8]' : ''}`}>
                            <span className={`rounded-2xl py-1.5 px-8 ${pathname === '/store' ? 'bg-[#EEF2FF]' : ''}`}>Store</span>
                        </Link>
                        <Link href="/sale" className={`py-2 px-3 bg-white rounded-2xl ${pathname === '/sale' ? 'bg-white text-[#5C75B8]' : ''}`}>
                            <span className={`rounded-2xl py-1.5 px-8 ${pathname === '/sale' ? 'bg-[#EEF2FF]' : ''}`}>Sale</span>
                        </Link>
                    </div>
                </nav>

                {/* User Menu */}
                <nav
                    className={`md:hidden overflow-hidden rounded-[36px] p-8 fixed inset-x-4 bottom-0 h-72 w-11/12 mx-auto bg-white z-40 transform ${showUser ? '-translate-y-4' : 'translate-y-full'} transition-transform duration-200 ease-out`}
                    aria-hidden={!showUser}
                >
                    <div className="w-8 h-8 bg-[#EEF2FF] rounded-full absolute flex items-center justify-center right-8 top-8 -mt-1">
                        <X strokeWidth={3} size={18} color="#5C75B8" className="cursor-pointer" onClick={() => setShowUser(false)} />
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

                <nav className="md:block hidden">
                    <ul className="flex md:gap-2 lg:gap-5 bg-indigo-50 px-3 py-2 rounded-3xl text-sm font-medium text-[#636363]">
                        <Link href="/" className={`py-1.5 px-5 rounded-3xl ease-out duration-300 hover:bg-white hover:text-black ${pathname === '/' ? 'bg-white text-black' : ''}`}>Home</Link>
                        <Link href="/store" className={`py-1.5 px-5 rounded-3xl ease-out duration-300 hover:bg-white hover:text-black ${pathname === '/store' ? 'bg-white text-black' : ''}`}>Store</Link>
                        <Link href="/sale" className={`py-1.5 px-5 rounded-3xl ease-out duration-300 hover:bg-white hover:text-black ${pathname === '/sale' ? 'bg-white text-black' : ''}`}>Sale</Link>
                    </ul>
                </nav>
                {status === "loading" ? <Loading /> : (
                    <ul className="flex md:gap-2">
                        <div className="relative">
                            {session ? (
                                <div>
                                    <button
                                        onClick={toggleDropdown}
                                        className={`hover:bg-[#FFD873] p-2.5 relative hidden transition-all active:scale-95 duration-200 ease-out md:flex rounded-full gap-2 items-center text-sm ${showDropdown && "bg-[#FFD873]"}`}
                                    >
                                        <UserRound strokeWidth={1.75} size={22} />
                                    </button>
                                    <button
                                        onClick={() => setShowUser(prevValue => !prevValue)}
                                        className="md:hidden rounded-full  p-2.5 flex gap-2 items-center text-sm"
                                    >
                                        <UserRound strokeWidth={1.75} size={22} />
                                    </button>
                                </div>
                            ) : (
                                <Link href="/login" className="rounded-full transition-all active:scale-95 duration-200 ease-out hover:bg-[#FFD873] p-2.5 relative md:px-3 flex gap-1 md:gap-2 items-center text-sm">
                                    <UserRound strokeWidth={1.75} size={22} />
                                    <span className="font-medium">Log in</span>
                                </Link>
                            )}
                            {session && (
                                <div className={`${showDropdown && "opacity-100 pointer-events-auto"} opacity-0 pointer-events-none transition-opacity duration-300 ease-out absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg py-2 z-10 border border-gray-200 font-medium`}>
                                    <h3 className="px-4 py-2 text-sm font-medium text-black border-b border-gray-200">{session.user.name}</h3>
                                    <Link href="/account/orders" className="transition-all duration-200 ease-out rounded-md flex mt-1 items-center px-3 mx-1 py-2 text-sm text-black hover:bg-[#EEF2FF] hover:text-[#5C75B8]">
                                        <Package size={18} className="mr-2" />
                                        Orders
                                    </Link>
                                    <Link href="/account/addresses" className="transition-all duration-200 ease-out rounded-md mx-1 flex items-center px-3 py-2 text-sm text-black hover:bg-[#EEF2FF] hover:text-[#5C75B8]">
                                        <Home size={18} className="mr-2" />
                                        Addresses
                                    </Link>
                                    <button
                                        onClick={() => signOut()}
                                        className="transition-all duration-200 ease-out rounded-md flex items-center w-[calc(100%-8px)] px-3 py-2 mb-1 mx-1 text-sm text-black hover:bg-red-50 hover:text-red-600 group"
                                    >
                                        <LogOut size={18} className="mr-2 group-hover:translate-x-0.5 transition-translate duration-200 ease-out" />
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                        <Link href="/cart" className="rounded-full active:scale-95 transition-all duration-200 ease-out hover:bg-[#FFD873] p-2.5 relative group">
                            {quantity !== 0 && <div className="absolute transition-all duration-200 ease-out md:top-0 md:right-0 -top-0.5 right-0 flex items-center  justify-center rounded-full md:w-[20px] md:h-[20px] w-5 h-5 bg-[#5C75B8] text-white text-xs">
                                {quantity}
                            </div>}
                            <ShoppingCart strokeWidth={1.75} size={22} />
                        </Link>
                        <button
                            className="md:hidden p-2 pr-0"
                            onClick={() => setShowMobileMenu(true)}
                        >
                            <Menu strokeWidth={1.75} size={22} />
                        </button>
                    </ul>
                )}
            </header>
        </div>
    )
}