export default function CustomerInfo({ register, errors, handleSubmit }) {
    return (
        <div className="">
            <span className="text-3xl font-semibold">Delivery Information</span>
            <form className="w-10/12 mt-6 flex flex-col gap-5" onSubmit={handleSubmit}>
                <div className="flex w-full gap-7">
                    <div className="flex flex-col gap-1 w-1/2">
                        <label className="text-sm font-medium" htmlFor="firstName">First name</label>
                        <input
                            className="w-full rounded-[24px] py-2 px-4 border border-[#dfdfdf]"
                            type="text"
                            id="firstName"
                            {...register("firstName", { required: "First name is required" })}
                        />
                        {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName.message}</p>}
                    </div>
                    <div className="flex flex-col gap-1 w-1/2">
                        <label className="text-sm font-medium" htmlFor="lastName">Last name</label>
                        <input
                            className="w-full rounded-[24px] py-2 px-4 border border-[#dfdfdf]"
                            type="text"
                            id="lastName"
                            {...register("lastName", { required: "Last name is required" })}
                        />
                        {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName.message}</p>}
                    </div>
                </div>
                <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium" htmlFor="address">Address</label>
                    <input
                        className="w-full rounded-[24px] py-2 px-4 border border-[#dfdfdf]"
                        type="text"
                        id="address"
                        {...register("address", { required: "Address is required" })}
                    />
                    {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}
                </div>
                <div className="flex w-full gap-7">
                    <div className="flex flex-col gap-1 w-1/2">
                        <label className="text-sm font-medium" htmlFor="postalCode">Postal code</label>
                        <input
                            className="w-full rounded-[24px] py-2 px-4 border border-[#dfdfdf]"
                            type="text"
                            id="postalCode"
                            {...register("postalCode", { required: "Postal code is required" })}
                        />
                        {errors.postalCode && <p className="text-red-500 text-sm">{errors.postalCode.message}</p>}
                    </div>
                    <div className="flex flex-col gap-1 w-1/2">
                        <label className="text-sm font-medium" htmlFor="phoneNumber">Phone number</label>
                        <input
                            className="w-full rounded-[24px] py-2 px-4 border border-[#dfdfdf]"
                            type="tel"
                            id="phoneNumber"
                            {...register("phoneNumber", { required: "Phone number is required" })}
                        />
                        {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber.message}</p>}
                    </div>
                </div>
                <div className="flex gap-7 items-center">
                    <div className="flex flex-col gap-1 w-1/2">
                        <label className="text-sm font-medium" htmlFor="city">City</label>
                        <input
                            className="w-full rounded-[24px] py-2 px-4 border border-[#dfdfdf]"
                            type="text"
                            id="city"
                            {...register("city", { required: "City is required" })}
                        />
                        {errors.city && <p className="text-red-500 text-sm">{errors.city.message}</p>}
                    </div>
                    <div className="flex flex-col gap-1 w-1/2">
                        <label className="text-sm font-medium" htmlFor="country">Country</label>
                        <select
                            className="w-full rounded-[24px] py-2 px-4 border border-[#dfdfdf]"
                            id="country"
                            {...register("country", { required: "Country is required" })}
                        >
                            <option value="" disabled>Choose a country</option>
                            <option value="australia">Australia</option>
                            <option value="brazil">Brazil</option>
                            <option value="canada">Canada</option>
                            <option value="china">China</option>
                            <option value="france">France</option>
                            <option value="germany">Germany</option>
                            <option value="india">India</option>
                            <option value="italy">Italy</option>
                            <option value="japan">Japan</option>
                            <option value="mexico">Mexico</option>
                            <option value="netherlands">Netherlands</option>
                            <option value="norway">Norway</option>
                            <option value="russia">Russia</option>
                            <option value="singapore">Singapore</option>
                            <option value="south-korea">South Korea</option>
                            <option value="spain">Spain</option>
                            <option value="sweden">Sweden</option>
                            <option value="switzerland">Switzerland</option>
                            <option value="turkey">Turkey</option>
                            <option value="uk">United Kingdom</option>
                            <option value="usa">United States</option>
                        </select>
                        {errors.country && <p className="text-red-500 text-sm">{errors.country.message}</p>}
                    </div>
                </div>
                <button type="submit" className="bg-black mt-4 py-3 text-white rounded-3xl w-full hover:bg-opacity-75 duration-300 ease-out text-center"
                >Continue</button>
            </form>
        </div>
    )
}