export default function CustomerInfo({ register, errors, handleSubmit, isClicked }) {
    return (
        <div className="">
            <span className="text-3xl font-semibold">Delivery Information</span>
            <form className="w-10/12 mt-6 flex flex-col gap-5" onSubmit={handleSubmit}>
                <div className="flex w-full gap-7">
                    <div className="flex flex-col gap-1 w-1/2">
                        <label className="text-sm font-medium" htmlFor="firstName">First name</label>
                        <input
                            className={`w-full rounded-[24px] py-2 px-4 border border-[#dfdfdf] ${isClicked ? 'bg-gray-100' : ''}`}
                            type="text"
                            id="firstName"
                            {...register("firstName", { required: "First name is required" })}
                            disabled={isClicked}
                        />
                        {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName.message}</p>}
                    </div>
                    <div className="flex flex-col gap-1 w-1/2">
                        <label className="text-sm font-medium" htmlFor="lastName">Last name</label>
                        <input
                            className={`w-full rounded-[24px] py-2 px-4 border border-[#dfdfdf] ${isClicked ? 'bg-gray-100' : ''}`}
                            type="text"
                            id="lastName"
                            {...register("lastName", { required: "Last name is required" })}
                            disabled={isClicked}
                        />
                        {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName.message}</p>}
                    </div>
                </div>
                <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium" htmlFor="address">Address</label>
                    <input
                        className={`w-full rounded-[24px] py-2 px-4 border border-[#dfdfdf] ${isClicked ? 'bg-gray-100' : ''}`}
                        type="text"
                        id="address"
                        {...register("address", { required: "Address is required" })}
                        disabled={isClicked}
                    />
                    {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}
                </div>
                <div className="flex w-full gap-7">
                    <div className="flex flex-col gap-1 w-1/2">
                        <label className="text-sm font-medium" htmlFor="postalCode">Postal code</label>
                        <input
                            className={`w-full rounded-[24px] py-2 px-4 border border-[#dfdfdf] ${isClicked ? 'bg-gray-100' : ''}`}
                            type="text"
                            id="postalCode"
                            {...register("postalCode", { required: "Postal code is required" })}
                            disabled={isClicked}
                        />
                        {errors.postalCode && <p className="text-red-500 text-sm">{errors.postalCode.message}</p>}
                    </div>
                    <div className="flex flex-col gap-1 w-1/2">
                        <label className="text-sm font-medium" htmlFor="phoneNumber">Phone number</label>
                        <input
                            className={`w-full rounded-[24px] py-2 px-4 border border-[#dfdfdf] ${isClicked ? 'bg-gray-100' : ''}`}
                            type="tel"
                            id="phoneNumber"
                            {...register("phoneNumber", { required: "Phone number is required" })}
                            disabled={isClicked}
                        />
                        {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber.message}</p>}
                    </div>
                </div>
                <div className="flex gap-7 items-center">
                    <div className="flex flex-col gap-1 w-1/2">
                        <label className="text-sm font-medium" htmlFor="city">City</label>
                        <input
                            className={`w-full rounded-[24px] py-2 px-4 border border-[#dfdfdf] ${isClicked ? 'bg-gray-100' : ''}`}
                            type="text"
                            id="city"
                            {...register("city", { required: "City is required" })}
                            disabled={isClicked}
                        />
                        {errors.city && <p className="text-red-500 text-sm">{errors.city.message}</p>}
                    </div>
                    <div className="flex flex-col gap-1 w-1/2">
                        <label className="text-sm font-medium" htmlFor="country">Country</label>
                        <select
                            className={`w-full rounded-[24px] py-2 px-4 border border-[#dfdfdf] ${isClicked ? 'bg-gray-100' : ''}`}
                            id="country"
                            {...register("country", { required: "Country is required" })}
                            disabled={isClicked}
                        >
                            <option value="" disabled>Choose a country</option>
                            <option value="Australia">Australia</option>
                            <option value="Brazil">Brazil</option>
                            <option value="Canada">Canada</option>
                            <option value="China">China</option>
                            <option value="France">France</option>
                            <option value="Germany">Germany</option>
                            <option value="India">India</option>
                            <option value="Italy">Italy</option>
                            <option value="Japan">Japan</option>
                            <option value="Mexico">Mexico</option>
                            <option value="Netherlands">Netherlands</option>
                            <option value="Norway">Norway</option>
                            <option value="Russia">Russia</option>
                            <option value="Singapore">Singapore</option>
                            <option value="South-korea">South Korea</option>
                            <option value="Spain">Spain</option>
                            <option value="Sweden">Sweden</option>
                            <option value="Switzerland">Switzerland</option>
                            <option value="Turkey">Turkey</option>
                            <option value="UK">United Kingdom</option>
                            <option value="USA">United States</option>
                        </select>
                        {errors.country && <p className="text-red-500 text-sm">{errors.country.message}</p>}
                    </div>
                </div>
                <button
                    type="submit"
                    className={`bg-black mt-4 py-3 text-white rounded-3xl w-full ${isClicked ? 'opacity-50 cursor-not-allowed' : 'hover:bg-opacity-75'
                        } duration-300 ease-out text-center`}
                    disabled={isClicked}
                >
                    Continue
                </button>
            </form>
        </div>
    )
}