import React from 'react';

const currentDate = new Date();
const currentMonth = currentDate.getMonth() + 1; // JavaScript months are 0-indexed
const currentYear = currentDate.getFullYear();

const months = [
    "01", "02", "03", "04", "05", "06",
    "07", "08", "09", "10", "11", "12"
];

const years = Array.from({ length: 10 }, (_, i) => (currentYear + i).toString());

export default function CardInputFields({ register, errors, handleNumericInput, watch }) {
    const watchExpiryYear = watch("expiryYear");

    return (
        <>
            <div className="flex flex-col gap-1">
                <label className="text-sm font-medium" htmlFor="cardNumber">Card Number</label>
                <input
                    className={`w-full rounded-[24px] py-2 px-4 border ${errors.cardNumber ? 'border-red-500' : 'border-[#dfdfdf]'}`}
                    type="tel"
                    id="cardNumber"
                    placeholder="1234 5678 9101 1121"
                    maxLength="19"
                    {...register("cardNumber", {
                        required: "Card number is required",
                        pattern: {
                            value: /^(\d{4}\s?){4}$/,
                            message: "Invalid card number format"
                        }
                    })}
                    onChange={(e) => {
                        handleNumericInput(e);
                        register("cardNumber").onChange(e);
                    }}
                />
                {errors.cardNumber && <p className="text-red-500 text-sm mt-1">{errors.cardNumber.message}</p>}
            </div>

            <div className="flex w-full gap-3">
                <div className="flex flex-col gap-1 w-1/4">
                    <label className="text-sm font-medium" htmlFor="expiryMonth">Expiration Month</label>
                    <select
                        id="expiryMonth"
                        className={`w-full rounded-[24px] py-2 px-4 border ${errors.expiryMonth ? 'border-red-500' : 'border-[#dfdfdf]'}`}
                        {...register("expiryMonth", {
                            required: "Expiration month is required",
                            validate: (value) => {
                                const selectedMonth = parseInt(value, 10);
                                const selectedYear = parseInt(watchExpiryYear, 10);
                                if (selectedYear === currentYear && selectedMonth < currentMonth) {
                                    return "Expiration date must be in the future";
                                }
                                return true;
                            }
                        })}
                    >
                        <option value="">Month</option>
                        {months.map((month, index) => (
                            <option key={index} value={month}>
                                {month}
                            </option>
                        ))}
                    </select>
                    {errors.expiryMonth && <p className="text-red-500 text-sm mt-1">{errors.expiryMonth.message}</p>}
                </div>
                <div className="flex flex-col gap-1 w-1/4 mr-4">
                    <label className="text-sm font-medium" htmlFor="expiryYear">Expiration Year</label>
                    <select
                        id="expiryYear"
                        className={`w-full rounded-[24px] py-2 px-4 border ${errors.expiryYear ? 'border-red-500' : 'border-[#dfdfdf]'}`}
                        {...register("expiryYear", {
                            required: "Expiration year is required",
                            validate: (value) => parseInt(value, 10) >= currentYear || "Invalid expiration year"
                        })}
                    >
                        <option value="">Year</option>
                        {years.map((year, index) => (
                            <option key={index} value={year}>
                                {year}
                            </option>
                        ))}
                    </select>
                    {errors.expiryYear && <p className="text-red-500 text-sm mt-1">{errors.expiryYear.message}</p>}
                </div>
                <div className="flex flex-col gap-1 w-1/2">
                    <label className="text-sm font-medium" htmlFor="cvv">CVV</label>
                    <input
                        className={`w-full rounded-[24px] py-2 px-4 border ${errors.cvv ? 'border-red-500' : 'border-[#dfdfdf]'}`}
                        type="tel"
                        id="cvv"
                        placeholder="123"
                        maxLength="3"
                        {...register("cvv", {
                            required: "CVV is required",
                            pattern: {
                                value: /^\d{3}$/,
                                message: "CVV must be 3 digits"
                            }
                        })}
                    />
                    {errors.cvv && <p className="text-red-500 text-sm mt-1">{errors.cvv.message}</p>}
                </div>
            </div>

            <div className="flex flex-col gap-1">
                <label className="text-sm font-medium" htmlFor="nameOnCard">Name on Card</label>
                <input
                    className={`w-full rounded-[24px] py-2 px-4 border ${errors.nameOnCard ? 'border-red-500' : 'border-[#dfdfdf]'}`}
                    type="text"
                    id="nameOnCard"
                    placeholder="John Doe"
                    {...register("nameOnCard", {
                        required: "Name on card is required",
                        pattern: {
                            value: /^[A-Za-z\s]+$/,
                            message: "Name should only contain letters and spaces"
                        }
                    })}
                />
                {errors.nameOnCard && <p className="text-red-500 text-sm mt-1">{errors.nameOnCard.message}</p>}
            </div>
        </>
    );
}