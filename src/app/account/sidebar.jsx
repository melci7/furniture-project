"use client"

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { House, UserRound, Package, LogOut } from 'lucide-react';
import { useRouter } from "next/navigation";

export default function Sidebar() {
    const { data: session } = useSession()
    const router = useRouter()

    async function handleLogout() {
        await signOut({ redirect: false })
        router.push("/")
    }
    return (
        <div className="w-[30%] flex gap-3 text-sm font-medium flex-col bg-white border border-[#dfdfdf] rounded-2xl p-3.5">
            <span className="text-sm text-[#636363]">Hello,</span>
            <h3 className="text-lg font-semibold mb-1 -mt-2">{session?.user?.name}</h3>

            <Link href="/account/orders" className="flex items-center gap-2 rounded-2xl bg-[#f5f5f5] p-4 w-full hover:bg-[#2d2d2d] hover:text-white"><Package size={20} /> Orders</Link>
            <Link href="/account/addresses" className="flex items-center gap-2 rounded-2xl bg-[#f5f5f5] p-4 w-full hover:bg-[#2d2d2d] hover:text-white"><House size={20} /> Addresses</Link>
            <button onClick={handleLogout} className="flex items-center gap-2 rounded-2xl bg-[#f5f5f5] p-4 w-full hover:bg-red-500 hover:text-white"><LogOut size={20} /> Logout</button>
        </div>
    )
}