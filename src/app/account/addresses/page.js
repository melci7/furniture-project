"use client"

import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { Home, Plus, Edit2, Trash2 } from "lucide-react"
import { useSession } from "next-auth/react"

const API_URL = "http://localhost:3000/api/user/addresses"

export const fetchAddresses = async (userId) => {
  try {
    const response = await fetch(`${API_URL}?userId=${userId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
    return await response.json()
  } catch (error) {
    console.error("There was a problem fetching the address:", error)
  }
}

const deleteAddress = async (addressId, updateAddresses) => {
  try {
    const response = await fetch(`${API_URL}?addressId=${addressId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    })
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
    updateAddresses()
  } catch (error) {
    console.error("There was a problem deleting the address:", error)
  }
}

const createAddress = async (addressInfo) => {
  try {
    console.log("Creating address with:", addressInfo) // Debugging log
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ addressInfo }), // Ensure correct structure
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    console.log("Address successfully created")
  } catch (error) {
    console.error("There was a problem submitting the address:", error)
  }
}

export default function Addresses() {
  const [addresses, setAddresses] = useState([])
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
    const shippingAddress = `${data.address}, ${data.postalCode}, ${data.city}, ${data.country}`
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
            updateAddresses() // Refresh the address list
          })
          .catch(() => console.error("Failed to submit address."))
      }
    }
  }, [formState, session?.user?.id, status])

  return (
    <div className="max-w-2xl w-full border border-[#dfdfdf] rounded-2xl p-8">
      <div>
        <span className="text-3xl font-semibold">Addresses</span>
        <p className="text-[#636363] mt-2">Manage your saved addresses</p>
        <div className="mt-6 space-y-4">
          {addresses.map((address, index) => (
            <div key={index} className="border border-[#dfdfdf] rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold flex items-center">
                  <Home size={18} className="mr-2" /> Address {index + 1}
                </span>
                <div>
                  <button
                    className="text-red-500"
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
            <div className="flex w-full gap-7">
              <div className="flex flex-col gap-1 w-1/2">
                <label className="text-sm font-medium" htmlFor="country">
                  Country
                </label>
                <select
                  className="w-full rounded-[24px] py-2 px-4 border border-[#dfdfdf]"
                  id="country"
                  {...register("country", { required: "Country is required" })}
                >
                  <option value="" disabled>
                    Choose a country
                  </option>
                  <option value="USA">United States</option>
                  <option value="Canada">Canada</option>
                  <option value="UK">United Kingdom</option>
                  {/* Add more countries as needed */}
                </select>
                {errors.country && (
                  <p className="text-red-500 text-sm">
                    {errors.country.message}
                  </p>
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
