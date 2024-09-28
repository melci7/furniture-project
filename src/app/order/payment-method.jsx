"use client";
import Image from "next/image";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState, useEffect, useRef } from "react";
import CardInputFields from "./card-input-fields";
import CashPaymentSection from "./cash-payment-section";
import { useForm } from "react-hook-form";
import Spinner from "@/components/spinner";

export default function PaymentMethod({ isClicked, purchaseCompleted, isValid, isLoading }) {
    const [payment, setPayment] = useState("creditcard");
    const hasRendered = useRef(false);
    const { register, handleSubmit, formState: { errors }, watch } = useForm({
        defaultValues: {
            cardNumber: '',
            cvv: '',
            nameOnCard: '',
            expirationMonth: '',
            expirationYear: ''
        }
    });

    function handleClick() {
        handleSubmit(onSubmit)()

    }

    const handleNumericInput = (e) => {
        let input = e.target.value.replace(/\D/g, "");
        input = input.replace(/(.{4})/g, "$1 ");
        e.target.value = input.trim();
    };

    useEffect(() => {
        if (isValid) {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        } else if (hasRendered.current) {
            if (isClicked && payment !== "cash") {
                window.scrollTo({
                    top: document.body.scrollHeight,
                    behavior: "smooth"
                });
            }
        } else {
            hasRendered.current = true;
        }
    }, [isClicked, payment, isValid]);

    const onSubmit = (data) => {
        console.log("Form submitted with data:", data);
        purchaseCompleted();
    };

    return (
        <div className="w-full lg:w-10/12">
            <span className="lg:text-3xl text-2xl font-semibold">Payment Method</span>
            <div className={`w-full lg:mt-6 mt-3 min-h-48 rounded-md flex flex-col items-center ${!isClicked && `opacity-50 pointer-events-none`}`}>
                <RadioGroup defaultValue="creditcard" className="w-full flex flex-col lg:flex-row lg:justify-between justify-center items-start text-[15px] font-medium">
                    <div className="flex items-center space-x-3">
                        <RadioGroupItem value="creditcard" id="r2" disabled={!isClicked} onClick={() => setPayment("creditcard")} />
                        <label htmlFor="r2" className="flex items-center gap-3">
                            <Image
                                src={'/mastercard2.svg'}
                                width={36}
                                height={84}
                                alt="Mastercard"
                            />
                            Credit card
                        </label>
                    </div>
                    <div className="flex items-center space-x-3">
                        <RadioGroupItem value="paypal" id="r1" disabled={!isClicked} onClick={() => setPayment("paypal")} />
                        <label htmlFor="r1" className="flex items-center gap-3">
                            <Image
                                src={'/paypal2.svg'}
                                width={36}
                                height={84}
                                alt="PayPal"
                            />
                            Paypal
                        </label>
                    </div>
                    <div className="flex items-center space-x-3">
                        <RadioGroupItem value="cash" id="r3" disabled={!isClicked} onClick={() => setPayment("cash")} />
                        <label htmlFor="r3" className="flex items-center gap-3">
                            <Image
                                src={'/cash.svg'}
                                width={36}
                                height={84}
                                alt="Cash"
                            />
                            Cash on delivery
                        </label>
                    </div>
                </RadioGroup>
                {isClicked && payment !== "cash" && (
                    <form className="w-full lg:mt-8 mt-6 flex flex-col lg:gap-7 gap-4 border-t border-[#dfdfdf] lg:pt-8 pt-6 mb-20" onSubmit={handleSubmit(onSubmit)}>
                        <CardInputFields
                            register={register}
                            errors={errors}
                            handleNumericInput={handleNumericInput}
                            watch={watch}
                        />
                        <button type="submit" className={`flex fixed lg:static z-30 lg:z-0 w-1/2 bottom-6 right-6 bg-black lg:mt-2 py-3 text-white rounded-3xl lg:w-full hover:bg-opacity-75 duration-300 ease-out text-center items-center justify-center lg:h-[52px] ${isLoading ? 'opacity-75 cursor-not-allowed ' : ''}`}
                            onClick={handleClick}
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <Spinner size='small' color='primary' />
                            ) : (
                                "Pay Now"
                            )}
                        </button>
                    </form>
                )}
                {isClicked && payment === "cash" && (
                    <div className="flex flex-col gap-5 mb-20">
                        <CashPaymentSection />
                        <button className={`flex fixed lg:static z-30 lg:z-0 w-1/2 bottom-6 right-6 bg-black lg:mt-2 py-3 text-white rounded-3xl lg:w-full hover:bg-opacity-75 duration-300 ease-out text-center items-center justify-center lg:h-[52px] ${isLoading ? 'opacity-75 cursor-not-allowed ' : ''}`}
                            onClick={handleClick}
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <Spinner size='small' color='primary' />
                            ) : (
                                "Continue"
                            )}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}