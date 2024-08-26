"use client"
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import CustomerInfo from "./customer-info";
import OrderSummaryBox from "./order-summary-box";
import { useShoppingCart } from "@/components/useShoppingCart";
import PaymentMethod from "./payment-method";
import Link from "next/link";
import { CircleCheck, X } from 'lucide-react';

export default function OrderWrapper() {
    const { cartItems } = useShoppingCart()
    const [isClicked, setIsClicked] = useState(false)
    const [isValid, setIsValid] = useState(false)
    const [hydrated, setHydrated] = useState(false)
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
        //localStorage.clear()
    }

    const onSubmit = (data) => {
        console.log("Form submitted with data: ", data)
        setIsClicked(true)
    }

    useEffect(() => {
        setHydrated(true);
    }, []);

    if (!hydrated) {
        return <div>Loading...</div>;
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
                        <Link
                            href="#"
                            className="flex-1 whitespace-nowrap bg-[#455EA0] py-3 px-5 text-white rounded-3xl w-full hover:bg-[#304170] duration-300 ease-out text-center mt-2"
                        >
                            Go to Orders
                        </Link>
                    </div>
                </div>
            )}
            <div className="w-full flex items-baseline">
                <div className="w-4/6">
                    <CustomerInfo register={register} errors={errors} handleSubmit={handleSubmit(onSubmit)} />
                </div>
                <div className="w-2/6 sticky top-4">
                    <OrderSummaryBox product={cartItems} />
                </div>
            </div>
            <div className="w-4/6">
                <PaymentMethod isClicked={isClicked} purchaseCompleted={purchaseCompleted} isValid={isValid} />
            </div>
        </div>
    )
}