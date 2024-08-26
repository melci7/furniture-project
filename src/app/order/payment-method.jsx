"use client";
import Image from "next/image";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState, useEffect, useRef } from "react";
import CardInputFields from "./card-input-fields";
import CashPaymentSection from "./cash-payment-section";
import { useForm } from "react-hook-form";

export default function PaymentMethod({ isClicked, purchaseCompleted, isValid }) {
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
        <div className="w-10/12">
            <span className="text-3xl font-semibold">Payment Method</span>
            <div className={`w-full mt-6 rounded-md flex flex-col items-center ${!isClicked && `opacity-50 pointer-events-none`}`}>
                <RadioGroup defaultValue="creditcard" className="w-full flex justify-between font-medium">
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
                    <form className="w-full mt-8 flex flex-col gap-7 border-t border-[#dfdfdf] pt-8 mb-20" onSubmit={handleSubmit(onSubmit)}>
                        <CardInputFields
                            register={register}
                            errors={errors}
                            handleNumericInput={handleNumericInput}
                            watch={watch}
                        />
                        <button type="submit" className="bg-black mt-2 py-3 text-white rounded-3xl w-full hover:bg-opacity-75 duration-300 ease-out text-center">
                            Pay Now
                        </button>
                    </form>
                )}
                {isClicked && payment === "cash" && (
                    <div className="flex flex-col gap-5 mb-20">
                        <CashPaymentSection />
                        <button className="bg-black mt-2 py-3 text-white rounded-3xl w-full hover:bg-opacity-75 duration-300 ease-out text-center" onClick={purchaseCompleted}>
                            Continue
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}