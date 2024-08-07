export default function CustomerInfo() {
    return (
        <div className="w-7/12">
            <span className="text-3xl font-semibold">Delivery Information</span>
            <form className="w-full mt-6 flex flex-col gap-6">
                <div className="flex w-full gap-7">
                    <div className="flex flex-col gap-1 w-1/2">
                        <label className="text-sm font-medium" htmlFor="firstName">First name</label>
                        <input className="w-full rounded-[24px] py-2 px-4 border border-[#dfdfdf]" type="text" id="firstName" required />
                    </div>
                    <div className="flex flex-col gap-1 w-1/2">
                        <label className="text-sm font-medium" htmlFor="lastName">Last name</label>
                        <input className="w-full rounded-[24px] py-2 px-4 border border-[#dfdfdf]" type="text" id="lastName" required />
                    </div>
                </div>
                <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium" htmlFor="address">Address</label>
                    <input className="w-full rounded-[24px] py-2 px-4 border border-[#dfdfdf]" type="text" id="address" required />
                </div>
            </form>
        </div>
    )
}