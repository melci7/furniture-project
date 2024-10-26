"use client"

import Link from "next/link"
import { useForm } from "react-hook-form"
import { useState } from "react"

export default function SignUpForm() {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const [serverError, setServerError] = useState("")
    const [successMessage, setSuccessMessage] = useState("")

    const onSubmit = async (data) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })

            const responseData = await response.json()

            if (response.ok) {
                setSuccessMessage("Registration successful! You can now log in.")
                setServerError("")
            } else {
                setServerError(responseData.message || "An error occurred during registration.")
                setSuccessMessage("")
            }
        } catch (error) {
            console.error("Registration error:", error)
            setServerError(`An error occurred: ${error.message}`)
            setSuccessMessage("")
        }
    }

    return (
        <div className="flex min-h-[600px] md:min-h-[670px] mb-10">
            <div className="w-full lg:w-full flex flex-col">
                <div className="flex-1 flex items-center justify-center">
                    <div className="w-full max-w-md bg-white md:p-10 p-6 shadow-md rounded-xl border border-[#dfdfdf]">
                        <div className="mb-6">
                            <h1 className="lg:text-3xl text-2xl font-semibold">Sign up</h1>
                            <p className="text-[#636363] mt-2 text-sm lg:text-base">
                                Create an account to get started
                            </p>
                        </div>
                        {successMessage && (
                            <div className="text-green-600 mb-4 -mt-2 text-sm lg:text-base" role="alert">
                                <span className="block sm:inline">{successMessage}</span>
                            </div>
                        )}
                        {serverError && <p className="text-red-500 text-xs lg:text-sm mb-4">{serverError}</p>}
                        <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
                            <div className="flex flex-col gap-1.5">
                                <label className="text-sm font-medium" htmlFor="name">Full Name</label>
                                <input
                                    className="w-full rounded-[24px] py-2 px-4 border border-[#dfdfdf]"
                                    id="name"
                                    type="text"
                                    placeholder="John Doe"
                                    {...register("name", { required: "Full name is required" })}
                                />
                                {errors.name && <p className="text-red-500 lg:text-sm text-xs">{errors.name.message}</p>}
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <label className="text-sm font-medium" htmlFor="email">Email</label>
                                <input
                                    className="w-full rounded-[24px] py-2 px-4 border border-[#dfdfdf]"
                                    id="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    {...register("email", {
                                        required: "Email is required",
                                        pattern: {
                                            value: /\S+@\S+\.\S+/,
                                            message: "Invalid email address"
                                        }
                                    })}
                                />
                                {errors.email && <p className="text-red-500 text-xs lg:text-sm">{errors.email.message}</p>}
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <label className="text-sm font-medium" htmlFor="password">Password</label>
                                <input
                                    className="w-full rounded-[24px] py-2 px-4 border border-[#dfdfdf]"
                                    id="password"
                                    type="password"
                                    {...register("password", {
                                        required: "Password is required",
                                        minLength: {
                                            value: 6,
                                            message: "Password must be at least 6 characters"
                                        }
                                    })}
                                />
                                {errors.password && <p className="text-red-500 text-xs lg:text-sm">{errors.password.message}</p>}
                            </div>
                            <button
                                type="submit"
                                className="bg-black mt-4 py-2.5 lg:py-3 text-white rounded-3xl w-full hover:bg-opacity-75 duration-300 ease-out text-center"
                            >
                                Sign Up
                            </button>
                        </form>
                        <div className="text-center text-sm mt-6">
                            Already have an account?{" "}
                            <Link href="/login" className="underline">
                                Log in
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}