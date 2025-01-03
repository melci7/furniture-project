"use client"

import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { Home, Plus, Trash2 } from "lucide-react"
import { useSession } from "next-auth/react"
import Spinner from "@/components/spinner"

export const fetchAddresses = async (userId) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}api/user/addresses?userId=${userId}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    )
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
    return await response.json()
  } catch (error) {
    console.error("There was a problem fetching the address:", error)
  }
}

const deleteAddress = async (addressId, updateAddresses) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}api/user/addresses?addressId=${addressId}`,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      }
    )
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
    updateAddresses()
  } catch (error) {
    console.error("There was a problem deleting the address:", error)
  }
}

const createAddress = async (addressInfo) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}api/user/addresses`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ addressInfo }),
      }
    )

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
  } catch (error) {
    console.error("There was a problem submitting the address:", error)
  }
}

export default function Addresses() {
  const [addresses, setAddresses] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [formState, setFormState] = useState({
    isAdding: false,
    isSubmitted: false,
    addressInfo: null,
  })
  const { data: session, status } = useSession()
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm()

  const onSubmit = (data) => {
    const shippingAddress = `${data.firstName} ${data.lastName}, ${data.address}, ${data.phoneNumber}, ${data.postalCode}, ${data.city}, ${data.country}`
    setFormState({
      isAdding: false,
      isSubmitted: true,
      addressInfo: { shippingAddress },
    })
    reset()
  }

  const updateAddresses = async () => {
    if (status === "authenticated" && session?.user) {
      try {
        const fetchedAddresses = await fetchAddresses(session.user.id)
        setAddresses(Array.isArray(fetchedAddresses) ? fetchedAddresses : [])
        setIsLoading(false)
      } catch (error) {
        console.error("Failed to load addresses.")
      }
    }
  }

  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      updateAddresses()

      if (formState.isSubmitted) {
        createAddress({ ...formState.addressInfo, userId: session.user.id })
          .then(() => {
            setFormState({ ...formState, isSubmitted: false })
            updateAddresses()
          })
          .catch(() => console.error("Failed to submit address."))
      }
    }
  }, [formState, session?.user?.id, status])

  return (
    <div className="max-w-2xl w-full lg:m-0 sm:m-auto lg:border border-[#dfdfdf] rounded-2xl lg:p-8">
      <div>
        <span className="lg:text-3xl text-2xl font-semibold">Addresses</span>
        <p className="text-[#636363] lg:mt-2 mt-1 lg:text-base text-sm">
          Manage your saved addresses
        </p>
        {isLoading && (
          <div className="flex justify-center items-center pt-6 py-4">
            <Spinner size="medium" color="primary" />
          </div>
        )}
        <div className="lg:mt-6 mt-5 space-y-4">
          {addresses.map((address, index) => (
            <div key={index} className="border border-[#dfdfdf] rounded-lg p-4">
              <div className="flex justify-between items-center lg:mb-2 mb-1">
                <span className="font-semibold flex items-center">
                  <Home size={18} className="mr-2" /> Address {index + 1}
                </span>
                <div>
                  <button
                    className="text-red-600"
                    onClick={() => deleteAddress(address.id, updateAddresses)}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
              <div className="text-sm text-[#636363]">
                {address.shipping_address}
              </div>
            </div>
          ))}
        </div>
        {formState.isAdding && (
          <form
            className="w-full mt-6 flex flex-col gap-5"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex flex-col lg:flex-row w-full lg:gap-7 gap-5">
              <div className="flex flex-col gap-1 lg:w-1/2 w-full">
                <label
                  className="lg:text-sm text-[13px] font-medium"
                  htmlFor="firstName"
                >
                  First name
                </label>
                <input
                  className={`w-full rounded-[24px] py-2 px-4 border border-[#dfdfdf]`}
                  type="text"
                  id="firstName"
                  {...register("firstName", {
                    required: "First name is required",
                  })}
                />
                {errors.firstName && (
                  <p className="text-red-500 lg:text-sm text-[13px]">
                    {errors.firstName.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-1 lg:w-1/2 w-full">
                <label
                  className="lg:text-sm text-[13px] font-medium"
                  htmlFor="lastName"
                >
                  Last name
                </label>
                <input
                  className={`w-full rounded-[24px] py-2 px-4 border border-[#dfdfdf]`}
                  type="text"
                  id="lastName"
                  {...register("lastName", {
                    required: "Last name is required",
                  })}
                />
                {errors.lastName && (
                  <p className="text-red-500 lg:text-sm text-[13px]">
                    {errors.lastName.message}
                  </p>
                )}
              </div>
            </div>
            <div className="flex w-full gap-7">
              <div className="flex flex-col gap-1 w-full">
                <label className="text-sm font-medium" htmlFor="address">
                  Address
                </label>
                <input
                  className="w-full rounded-[24px] py-2 px-4 border border-[#dfdfdf]"
                  type="text"
                  id="address"
                  {...register("address", { required: "Address is required" })}
                />
                {errors.address && (
                  <p className="text-red-500 text-sm">
                    {errors.address.message}
                  </p>
                )}
              </div>
            </div>
            <div className="flex w-full gap-7">
              <div className="flex flex-col gap-1 w-1/2">
                <label className="text-sm font-medium" htmlFor="postalCode">
                  Postal code
                </label>
                <input
                  className="w-full rounded-[24px] py-2 px-4 border border-[#dfdfdf]"
                  type="text"
                  id="postalCode"
                  {...register("postalCode", {
                    required: "Postal code is required",
                  })}
                />
                {errors.postalCode && (
                  <p className="text-red-500 text-sm">
                    {errors.postalCode.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-1 w-1/2">
                <label
                  className="lg:text-sm text-[13px] font-medium"
                  htmlFor="phoneNumber"
                >
                  Phone number
                </label>
                <input
                  className={`w-full rounded-[24px] py-2 px-4 border border-[#dfdfdf]`}
                  type="tel"
                  id="phoneNumber"
                  placeholder="+123 4567 8901"
                  {...register("phoneNumber", {
                    required: "Phone number is required",
                    pattern: {
                      value: /^\+?[1-9]\d{1,14}$/,
                      message:
                        "Please enter a valid international phone number",
                    },
                  })}
                />
                {errors.phoneNumber && (
                  <p className="text-red-500 lg:text-sm text-[13px]">
                    {errors.phoneNumber.message}
                  </p>
                )}
              </div>
            </div>
            <div className="flex w-full gap-7">
              <div className="flex flex-col gap-1 w-1/2">
                <label className="text-sm font-medium" htmlFor="country">
                  Country
                </label>
                <select
                  className="w-full rounded-[24px] py-2 px-4 border border-[#dfdfdf]"
                  defaultValue=""
                  id="country"
                  {...register("country", { required: "Country is required" })}
                >
                  <option value="" disabled>
                    Choose a country
                  </option>
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
                {errors.country && (
                  <p className="text-red-500 text-sm">
                    {errors.country.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-1 w-1/2">
                <label className="text-sm font-medium" htmlFor="city">
                  City
                </label>
                <input
                  className="w-full rounded-[24px] py-2 px-4 border border-[#dfdfdf]"
                  type="text"
                  id="city"
                  {...register("city", { required: "City is required" })}
                />
                {errors.city && (
                  <p className="text-red-500 text-sm">{errors.city.message}</p>
                )}
              </div>
            </div>
            <button
              type="submit"
              className="bg-black mt-4 py-3 text-white rounded-3xl w-full hover:bg-opacity-75 duration-300 ease-out text-center flex items-center justify-center"
            >
              <Plus size={18} className="mr-2" /> Add Address
            </button>
          </form>
        )}
        {!formState.isAdding && (
          <button
            onClick={() => setFormState({ ...formState, isAdding: true })}
            className="bg-black mt-6 py-3 text-white rounded-3xl w-full hover:bg-opacity-75 duration-300 ease-out text-center flex items-center justify-center"
          >
            <Plus size={18} className="mr-2" /> Add New Address
          </button>
        )}
      </div>
    </div>
  )
}
