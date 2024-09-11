"use client"
import * as React from "react"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ShoppingCart, Heart, UserRound, LogOut, Package, Home } from 'lucide-react'
import { useCart } from "@/app/cart/useCart"
import { useSession, signOut } from "next-auth/react"
import Loading from "./loading"

export default function Navbar() {
    const pathname = usePathname()
    const quantity = useCart();
    const { data: session, status } = useSession()
    const [showDropdown, setShowDropdown] = React.useState(false)

    const toggleDropdown = () => setShowDropdown(!showDropdown)


    return (
        <header className="w-full flex justify-between items-center">
            <div className="font-bold text-lg">Logo</div>
            <nav>
                <ul className="flex gap-5 bg-indigo-50 px-3 py-2 rounded-3xl text-sm font-medium text-[#636363]">
                    <Link href="/" className={`py-1.5 px-5 rounded-3xl ease-out duration-300 hover:bg-white hover:text-black ${pathname === '/' ? 'bg-white text-black' : ''}`}>Home</Link>
                    <Link href="/about" className={`py-1.5 px-5 rounded-3xl ease-out duration-300 hover:bg-white hover:text-black ${pathname === '/about' ? 'bg-white text-black' : ''}`}>About</Link>
                    <Link href="/store" className={`py-1.5 px-5 rounded-3xl ease-out duration-300 hover:bg-white hover:text-black ${pathname === '/store' ? 'bg-white text-black' : ''}`}>Store</Link>
                    <Link href="/sale" className={`py-1.5 px-5 rounded-3xl ease-out duration-300 hover:bg-white hover:text-black ${pathname === '/sale' ? 'bg-white text-black' : ''}`}>Sale</Link>
                </ul>
            </nav>
            {status === "loading" ? <Loading /> : (
                <ul className="flex gap-2">
                    <div className="relative">
                        {session ? (
                            <button
                                onClick={toggleDropdown}
                                className="rounded-full border border-gray-400 p-2 flex gap-2 items-center text-sm"
                            >
                                <UserRound strokeWidth={1.5} size={22} />
                            </button>
                        ) : (
                            <Link href="/login" className="rounded-full border border-gray-400 py-2 px-3 flex gap-2 items-center text-sm">
                                <UserRound strokeWidth={1.5} size={22} />
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
                    <Link href="#" className="rounded-full border border-gray-400 p-2">
                        <Heart strokeWidth={1.5} size={22} />
                    </Link>
                    <Link href="/cart" className="rounded-full border border-gray-400 p-2 relative">
                        {quantity !== 0 && <div className="absolute -top-3 -right-1.5 flex items-center justify-center rounded-full w-[22px] h-[22px] bg-[#5C75B8] text-white text-sm">
                            {quantity}
                        </div>}
                        <ShoppingCart strokeWidth={1.5} size={22} />
                    </Link>
                </ul>
            )}
        </header>
    )
}