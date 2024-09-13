"use client"
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import CustomerInfo from "./customer-info";
import OrderSummaryBox from "./order-summary-box";
import { useShoppingCart } from "@/components/useShoppingCart";
import PaymentMethod from "./payment-method";
import Link from "next/link";
import { CircleCheck, X, Home, ArrowLeft, Plus } from 'lucide-react';
import { useSession } from "next-auth/react";
import Spinner from "@/components/spinner";
import { fetchAddresses } from "../account/addresses/page";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import Loading from "./loading";


export default function OrderWrapper() {
    const { cartItems } = useShoppingCart()
    const [isClicked, setIsClicked] = useState(false)
    const [isValid, setIsValid] = useState(false)
    const [hydrated, setHydrated] = useState(false)
    const [customerData, setCustomerData] = useState(null)
    const [loading, setLoading] = useState(false)
    const [newAddress, setNewAddress] = useState(false)
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [addresses, setAddresses] = useState([])
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            firstName: "",
            lastName: "",
            address: "",
            postalCode: "",
            city: "",
            country: "",
        }
    });

    function purchaseCompleted() {
        setIsValid(true)
        localStorage.clear()
    }

    const onSubmit = (data) => {
        const shippingAddress = `${data.address}, ${data.city}, ${data.postalCode}, ${data.country}`;
        const customerData = {
            name: `${data.firstName} ${data.lastName}`,
            shippingAddress
        };
        console.log("Form submitted with data: ", customerData);
        setIsClicked(true);
        setCustomerData(customerData);
    }

    const { data: session, status } = useSession();

    useEffect(() => {
        async function fetchedAddresses() {
            const address = await fetchAddresses(session.user.id)
            setAddresses(Array.isArray(address) ? address : [])
        }
        if (status === "authenticated" && session?.user) {
            try {
                fetchedAddresses()
            } catch (error) {
                console.error("Failed to load addresses.")
            }
        }
    }, [session?.user?.id, status])

    useEffect(() => {
        setHydrated(true);
        async function orderCompleted() {
            setLoading(true)
            let orderData = {
                cartItems,
                customerInfo: {
                    ...customerData,
                    userId: session.user.id
                }
            };

            if (!newAddress && selectedAddress) {
                orderData.selectedAddressId = selectedAddress;
            }

            await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/user/order`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(orderData)
            })
                .then(response => response.json())
                .then(data => {
                    console.log("Order created successfully:", data)
                    setLoading(false)
                })
                .catch(error => {
                    console.error("Error creating order:", error)
                })
        }
        if (status === "authenticated" && isValid) {
            orderCompleted()
        }
    }, [isValid, status]);

    if (!hydrated) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Spinner size="large" color="text-[#535353]" />
            </div>
        )
    }

    if (loading) {
        return (
            <div className="flex justify-center items-center">
                <Spinner size="large" color="text-[#535353]" />
            </div>
        )
    }
    if (!cartItems.length) {
        return (
            <div className="flex flex-col">
                <span className="text-3xl font-semibold mb-4">Your cart is empty</span>
                <Link
                    href="/store"
                    className="self-start inline-block text-xl pb-0.5 font-semibold text-black relative group"
                >
                    <span className="relative z-10">Go to Store</span>
                    <div className="absolute bottom-0 left-0 w-1/2 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></div>
                </Link>
            </div>
        )
    }

    return (
        <div className="flex flex-col gap-14">
            {isValid && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-35 z-20 transition-opacity duration-300 ease-out"
                    style={{
                        opacity: isClicked ? 1 : 0,
                    }}
                ></div>
            )}

            {isValid && (
                <div className="fixed top-1/2 left-1/2 z-30 transform -translate-x-1/2 -translate-y-1/2 bg-white px-10 py-12 rounded-lg shadow-lg transition-transform duration-300 ease-out w-1/4 flex flex-col gap-4 items-start">
                    <div className="fixed right-7 top-7">
                        <Link href="/" className="block">
                            <X size={22} />
                        </Link>
                    </div>
                    <CircleCheck size={68} strokeWidth={1.75} className="self-center" />
                    <h2 className="text-2xl font-semibold self-center">Purchase Completed!</h2>
                    <p className="">
                        Thank you for your order. Your order is being processed and will arrive approximately within <span className="font-bold">1-3 weeks</span>.
                    </p>
                    <div className="flex items-center w-full gap-4">
                        <Link
                            href="/store"
                            className="flex-1 whitespace-nowrap bg-black py-3 px-5 text-white rounded-3xl w-full hover:bg-opacity-75 duration-300 ease-out text-center mt-2"
                        >
                            Continue Shopping
                        </Link>
                        {status === "authenticated" && <Link
                            href="/account/orders"
                            className="flex-1 whitespace-nowrap bg-[#455EA0] py-3 px-5 text-white rounded-3xl w-full hover:bg-[#304170] duration-300 ease-out text-center mt-2"
                        >
                            Go to Orders
                        </Link>}
                    </div>
                </div>
            )}
            {status === "loading" ? <Loading /> :
                <div className={`w-full flex items-baseline ${!newAddress && "gap-28"}`}>
                    {addresses.length > 0 && !newAddress ? (
                        <div className="w-[58%] flex flex-col">
                            <div className="border border-[#dfdfdf] rounded-2xl p-8 mb-4">
                                <div>
                                    <span className="text-3xl font-semibold">Addresses</span>
                                    <p className="text-[#636363] mt-2">Pick from your saved addresses</p>
                                    <RadioGroup
                                        value={selectedAddress}
                                        onValueChange={setSelectedAddress}
                                        className="mt-6 space-y-4"
                                    >
                                        {addresses.map((address, index) => (
                                            <div
                                                key={index}
                                                className="relative border border-[#dfdfdf] rounded-lg p-4 hover:bg-slate-50 transition-colors cursor-pointer"
                                                onClick={() => setSelectedAddress(address.id)}
                                            >
                                                <RadioGroupItem
                                                    value={address.id}
                                                    id={`address-${index}`}
                                                    className="absolute top-4 left-4 cursor-pointer"
                                                />
                                                <div className="pl-8">
                                                    <div className="flex justify-between items-center mb-2">
                                                        <Label htmlFor={`address-${index}`} className="font-semibold flex items-center cursor-pointer">
                                                            <Home size={18} className="mr-2" /> Address {index + 1}
                                                        </Label>
                                                    </div>
                                                    <div className="text-sm text-[#636363]">
                                                        {address.shipping_address}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </RadioGroup>
                                </div>
                                <button
                                    onClick={() => setNewAddress(true)}
                                    className="bg-black mt-6 py-3 text-white rounded-3xl w-2/3 mx-auto hover:bg-opacity-75 duration-300 ease-out text-center flex items-center justify-center"
                                >
                                    <Plus size={18} className="mr-2" /> Add New Address
                                </button>
                            </div>
                            <button
                                onClick={() => setIsClicked(true)}
                                className={`mt-4 py-3 bg-black text-white rounded-3xl w-full duration-300 ease-out text-center ${!selectedAddress
                                    ? 'opacity-50 cursor-not-allowed'
                                    : 'hover:bg-opacity-75'
                                    }`}
                                disabled={!selectedAddress}
                            >
                                Continue
                            </button>
                        </div>
                    )
                        : (status !== "loading" &&
                            <div className="w-4/6">
                                {addresses.length > 0 &&
                                    <button
                                        onClick={() => setNewAddress(false)}
                                        className="flex items-center pb-0.5 font-semibold text-black relative group mb-4 hover:text-gray-600 transition-colors duration-300"
                                    >
                                        <ArrowLeft size={18} className="mr-1 group-hover:-translate-x-0.5 transition-transform duration-300" />
                                        <span className="relative z-10">
                                            Back to addresses
                                        </span>
                                    </button>
                                }
                                <CustomerInfo register={register} errors={errors} handleSubmit={handleSubmit(onSubmit)} />
                            </div>
                        )
                    }
                    <div className="w-2/6 sticky top-4 self-start mx-auto">
                        <OrderSummaryBox product={cartItems} />
                    </div>

                </div>
            }
            <div className="w-4/6">
                <PaymentMethod isClicked={isClicked} purchaseCompleted={purchaseCompleted} isValid={isValid} />
            </div>
        </div>
    )
}