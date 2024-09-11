
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { getAddresses } from "@/lib/userService"

export default async function Address() {
    const session = await getServerSession(authOptions)
    const userId = session.user.id
    const addressInfo = await getAddresses(userId)
    if (!addressInfo.length) return <p>No addresses found</p>
    return (
        <div className="mt-6 space-y-4">
            {addressInfo.map(address => (
                <div
                    key={address.id}
                    className="border border-[#dfdfdf] rounded-lg p-4"
                >
                    <div className="flex justify-between items-center mb-2">
                        <span className="font-semibold flex items-center">
                            <Home size={18} className="mr-2" /> {address.name}
                        </span>
                        <div>
                            <button className="text-blue-500 mr-2">
                                <Edit2 size={18} />
                            </button>
                            <button
                                className="text-red-500"
                                onClick={() => deleteAddress(address.id)}
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>
                    </div>
                    <div className="text-sm text-[#636363]">
                        {address.street}, {address.city}, {address.state}{" "}
                        {address.postalCode}, {address.country}
                    </div>
                </div>
            ))}
        </div>
    )
}