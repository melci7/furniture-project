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


export default function OrderWrapper() {
    const { cartItems } = useShoppingCart()
    const [isClicked, setIsClicked] = useState(false)
    const [isValid, setIsValid] = useState(false)
    const [hydrated, setHydrated] = useState(false)
    const [customerData, setCustomerData] = useState(null)
    const [newAddress, setNewAddress] = useState(false)
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [addresses, setAddresses] = useState([])
    const [isLoading, setIsLoading] = useState(false)
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
        setIsLoading(true)
        setTimeout(() => (setIsValid(true), localStorage.clear(), setIsLoading(false)), 2000)

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
        setHydrated(false)
        setTimeout(() => setHydrated(true), 400)
        async function orderCompleted() {
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
            <div className="flex justify-center items-center h-[600px]">
                <Spinner size="medium" color="primary" />
            </div>
        );
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
        );
    }

    const renderContent = () => {
        if (status === "loading") {
            return <Spinner color="primary" size="medium" />;
        }

        if (status === "unauthenticated") {
            return (
                <CustomerInfo
                    register={register}
                    errors={errors}
                    handleSubmit={handleSubmit(onSubmit)}
                    isClicked={isClicked}
                />
            );
        }

        if (status === "authenticated") {
            if (addresses.length > 0 && !newAddress) {
                return (
                    <div className="lg:w-[58%] flex flex-col">
                        <div className="lg:border border-[#dfdfdf] rounded-2xl lg:p-8 mb-4">
                            <div>
                                <span className="lg:text-3xl text-2xl font-semibold">Addresses</span>
                                <p className="text-[#636363] lg:mt-2 mt-1 lg:text-base text-sm">Pick from your saved addresses</p>
                                <RadioGroup
                                    value={selectedAddress}
                                    onValueChange={(value) => !isClicked && setSelectedAddress(value)}
                                    className="mt-6 space-y-2 lg:space-y-4"
                                    disabled={isClicked}
                                >
                                    {addresses.map((address, index) => (
                                        <div
                                            key={index}
                                            className={`relative border border-[#dfdfdf] rounded-lg p-4 ${isClicked ? 'cursor-not-allowed' : 'hover:bg-slate-50 transition-colors cursor-pointer'}`}
                                            onClick={() => !isClicked && setSelectedAddress(address.id)}
                                        >
                                            <RadioGroupItem
                                                value={address.id}
                                                id={`address-${index}`}
                                                className="absolute top-4 left-4 cursor-pointer"
                                                disabled={isClicked}
                                            />
                                            <div className="pl-8">
                                                <div className="flex justify-between items-center mb-2">
                                                    <Label htmlFor={`address-${index}`} className={`font-semibold flex items-center ${isClicked ? 'cursor-not-allowed' : 'cursor-pointer'}`}>
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
                                className={`bg-black text-sm lg:mt-6 mt-5 lg:py-3 py-2.5 text-white rounded-3xl w-4/5 lg:w-2/3 mx-auto ${isClicked ? 'opacity-50 cursor-not-allowed' : 'hover:bg-opacity-75'} duration-300 ease-out text-center flex items-center justify-center`}
                                disabled={isClicked}
                            >
                                <Plus size={18} className="mr-2" /> Add New Address
                            </button>
                        </div>
                        <span className="lg:hidden border-t border-t-[#dfdfdf] my-2.5 mt-1.5"></span>
                        <button
                            onClick={() => setIsClicked(true)}
                            className={`lg:mt-4 mt-2 lg:py-3 py-2.5 text-[15px] bg-black text-white rounded-3xl w-full duration-300 ease-out text-center ${!selectedAddress ? 'opacity-50 cursor-not-allowed' : 'hover:bg-opacity-75'}`}
                            disabled={!selectedAddress}
                        >
                            Continue
                        </button>
                    </div>
                );
            } else {
                return (
                    <div className="lg:w-4/6 w-full">
                        {addresses.length > 0 && (
                            <button
                                onClick={() => setNewAddress(false)}
                                className="flex items-center pb-0.5 font-semibold text-black relative group lg:mb-4 mb-2 hover:text-gray-600 transition-colors duration-300"
                                disabled={isClicked}
                            >
                                <ArrowLeft size={18} className="mr-1 group-hover:-translate-x-0.5 transition-transform duration-300" />
                                <span className="relative text-sm lg:text-base">
                                    Back to addresses
                                </span>
                            </button>
                        )}
                        <CustomerInfo
                            register={register}
                            errors={errors}
                            handleSubmit={handleSubmit(onSubmit)}
                            isClicked={isClicked}
                        />
                    </div>
                );
            }
        }
    };

    return (
        <div className="flex flex-col lg:gap-14">
            {isValid && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-35 z-20 transition-opacity duration-300 ease-out"
                    style={{
                        opacity: isClicked ? 1 : 0,
                    }}
                ></div>
            )}

            {isValid && (
                <div className="fixed top-1/2 left-1/2 z-50 transform -translate-x-1/2 -translate-y-1/2 bg-white px-6 lg:px-10 lg:py-12 py-9 rounded-lg shadow-lg transition-transform duration-300 ease-out lg:w-1/4 w-11/12 flex flex-col lg:gap-4 gap-3 items-start">
                    <div className="fixed right-7 top-7">
                        <Link href="/" className="block">
                            <X size={22} />
                        </Link>
                    </div>
                    <CircleCheck size={68} strokeWidth={1.75} className="self-center w-14 lg:24" />
                    <h2 className="lg:text-2xl text-xl font-semibold self-center">Purchase Completed!</h2>
                    <p className="">
                        Thank you for your order. Your order is being processed and will arrive approximately within <span className="font-bold">1-3 weeks</span>.
                    </p>
                    <div className="flex flex-col lg:flex-row items-center w-full lg:gap-4 gap-1">
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
            <div className={`w-full flex flex-col lg:flex-row items-baseline ${!newAddress && "lg:gap-28 gap-10"} ${status === "unauthenticated" && "lg:gap-28 gap-0"} ${addresses.length === 0 && status === "authenticated" && "lg:gap-28 gap-0"}`}>
                {renderContent()}
                <div className="lg:w-2/6 w-full lg:sticky top-4 self-start mx-auto">
                    <OrderSummaryBox product={cartItems} purchaseCompleted={purchaseCompleted} isLoading={isLoading} />
                </div>
            </div>
            <div className="w-full lg:w-4/6">
                <PaymentMethod isClicked={isClicked} purchaseCompleted={purchaseCompleted} isValid={isValid} isLoading={isLoading} />
            </div>
        </div>
    );
}