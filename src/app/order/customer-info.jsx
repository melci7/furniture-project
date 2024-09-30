export default function CustomerInfo({ register, errors, handleSubmit, isClicked }) {
    return (
        <div className="mb-10 lg:mb-0">
            <span className="lg:text-3xl text-2xl font-semibold">Delivery Information</span>
            <form className="lg:w-10/12 w-full lg:mt-6 mt-3 flex flex-col gap-5" onSubmit={handleSubmit}>
                <div className="flex flex-col lg:flex-row w-full lg:gap-7 gap-5">
                    <div className="flex flex-col gap-1 lg:w-1/2 w-full">
                        <label className="lg:text-sm text-[13px] font-medium" htmlFor="firstName">First name</label>
                        <input
                            className={`w-full rounded-[24px] py-2 px-4 border border-[#dfdfdf] ${isClicked ? 'bg-gray-100' : ''}`}
                            type="text"
                            id="firstName"
                            {...register("firstName", { required: "First name is required" })}
                            disabled={isClicked}
                        />
                        {errors.firstName && <p className="text-red-500 lg:text-sm text-[13px]">{errors.firstName.message}</p>}
                    </div>
                    <div className="flex flex-col gap-1 lg:w-1/2 w-full">
                        <label className="lg:text-sm text-[13px] font-medium" htmlFor="lastName">Last name</label>
                        <input
                            className={`w-full rounded-[24px] py-2 px-4 border border-[#dfdfdf] ${isClicked ? 'bg-gray-100' : ''}`}
                            type="text"
                            id="lastName"
                            {...register("lastName", { required: "Last name is required" })}
                            disabled={isClicked}
                        />
                        {errors.lastName && <p className="text-red-500 lg:text-sm text-[13px]">{errors.lastName.message}</p>}
                    </div>
                </div>
                <div className="flex flex-col gap-1">
                    <label className="lg:text-sm text-[13px] font-medium" htmlFor="address">Address</label>
                    <input
                        className={`w-full rounded-[24px] py-2 px-4 border border-[#dfdfdf] ${isClicked ? 'bg-gray-100' : ''}`}
                        type="text"
                        id="address"
                        {...register("address", { required: "Address is required" })}
                        disabled={isClicked}
                    />
                    {errors.address && <p className="text-red-500 lg:text-sm text-[13px]">{errors.address.message}</p>}
                </div>
                <div className="flex w-full gap-7">
                    <div className="flex flex-col gap-1 w-1/2">
                        <label className="lg:text-sm text-[13px] font-medium" htmlFor="postalCode">Postal code</label>
                        <input
                            className={`w-full rounded-[24px] py-2 px-4 border border-[#dfdfdf] ${isClicked ? 'bg-gray-100' : ''}`}
                            type="text"
                            id="postalCode"
                            {...register("postalCode", { required: "Postal code is required" })}
                            disabled={isClicked}
                        />
                        {errors.postalCode && <p className="text-red-500 lg:text-sm text-[13px]">{errors.postalCode.message}</p>}
                    </div>
                    <div className="flex flex-col gap-1 w-1/2">
                        <label className="lg:text-sm text-[13px] font-medium" htmlFor="phoneNumber">Phone number</label>
                        <input
                            className={`w-full rounded-[24px] py-2 px-4 border border-[#dfdfdf] ${isClicked ? 'bg-gray-100' : ''}`}
                            type="tel"
                            id="phoneNumber"
                            {...register("phoneNumber", { required: "Phone number is required" })}
                            disabled={isClicked}
                        />
                        {errors.phoneNumber && <p className="text-red-500 lg:text-sm text-[13px]">{errors.phoneNumber.message}</p>}
                    </div>
                </div>
                <div className="flex gap-7 items-center">
                    <div className="flex flex-col gap-1 w-1/2">
                        <label className="lg:text-sm text-[13px] font-medium" htmlFor="city">City</label>
                        <input
                            className={`w-full rounded-[24px] py-2 px-4 border border-[#dfdfdf] ${isClicked ? 'bg-gray-100' : ''}`}
                            type="text"
                            id="city"
                            {...register("city", { required: "City is required" })}
                            disabled={isClicked}
                        />
                        {errors.city && <p className="text-red-500 lg:text-sm text-[13px]">{errors.city.message}</p>}
                    </div>
                    <div className="flex flex-col gap-1 w-1/2">
                        <label className="lg:text-sm text-[13px] font-medium" htmlFor="country">Country</label>
                        <select
                            className={`w-full text-sm lg:text-base font-medium rounded-[24px] py-2.5 lg:py-2 px-4 border border-[#dfdfdf] ${isClicked ? 'bg-gray-100' : ''}`}
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
                        {errors.country && <p className="text-red-500 lg:text-sm text-[13px]">{errors.country.message}</p>}
                    </div>
                </div>
                <button
                    type="submit"
                    className={`bg-black lg:mt-4 mt-2 lg:py-3 py-2.5 text-[15px] text-white rounded-3xl w-full ${isClicked ? 'opacity-50 cursor-not-allowed' : 'hover:bg-opacity-75'
                        } duration-300 ease-out text-center`}
                    disabled={isClicked}
                >
                    Continue
                </button>
            </form>
        </div>
    )
}