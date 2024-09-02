"use client"
import * as React from "react"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ShoppingCart, Heart, UserRound, LogOut } from 'lucide-react'
import { useCart } from "@/app/cart/useCart"
import { useSession, signOut } from "next-auth/react"

export default function Navbar() {
    const pathname = usePathname()
    const quantity = useCart();
    const { data: session } = useSession()
    const [showDropdown, setShowDropdown] = React.useState(false)

    const toggleDropdown = () => setShowDropdown(!showDropdown)

    return (
        <header className="w-full flex justify-between items-center">
            <div className="font-bold text-lg">Logo</div>
            <nav>
                <ul className="flex gap-5 bg-indigo-50 px-3 py-2 rounded-3xl text-sm font-medium text-[#636363]">
                    <Link href="/" className={`py-1.5 px-5 rounded-3xl ${pathname === '/' ? 'bg-white text-black' : ''}`}>Home</Link>
                    <Link href="/about" className={`py-1.5 px-5 rounded-3xl ${pathname === '/about' ? 'bg-white text-black' : ''}`}>About</Link>
                    <Link href="/store" className={`py-1.5 px-5 rounded-3xl ${pathname === '/store' ? 'bg-white text-black' : ''}`}>Store</Link>
                    <Link href="/sale" className={`py-1.5 px-5 rounded-3xl ${pathname === '/sale' ? 'bg-white text-black' : ''}`}>Sale</Link>
                </ul>
            </nav>
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
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                            <button
                                onClick={() => signOut()}
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                            >
                                <LogOut className="inline-block mr-2" size={18} />
                                Log out
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
        </header>
    )
}