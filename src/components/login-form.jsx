"use client"

import Image from "next/image"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { signIn } from "next-auth/react"
import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"

export default function LoginForm() {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const [serverError, setServerError] = useState("")
    const router = useRouter()
    const searchParams = useSearchParams()
    const returnUrl = searchParams.get('returnUrl') || '/'

    const onSubmit = async (data) => {
        const result = await signIn("credentials", {
            redirect: false,
            email: data.email,
            password: data.password,
        })

        console.log("SignIn result:", result)

        if (result.error) {
            setServerError(result.error)
        } else {
            // Successful login, redirect to return URL
            router.push(decodeURIComponent(returnUrl))
        }
    }

    return (
        <div className="flex h-screen w-screen -mx-[16.67%]">
            {/* Image section - 60% width */}


            {/* Login form section - 40% width */}
            <div className="w-full lg:w-2/5 flex flex-col">
                {/* Logo section */}
                <div className="p-6">
                    <Link href="/" className="font-bold text-lg block">Logo</Link>
                </div>

                {/* Form content */}
                <div className="flex-1 flex items-center justify-center p-8">
                    <div className="w-full max-w-md">
                        <div className="mb-6">
                            <h1 className="text-3xl font-semibold">Log in</h1>
                            <p className="text-[#636363] mt-2">
                                Enter your email below to login to your account
                            </p>
                        </div>
                        {serverError && <p className="text-red-500 text-sm mb-4">{serverError}</p>}
                        <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
                            <div className="flex flex-col gap-1">
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
                                {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                            </div>
                            <div className="flex flex-col gap-1">
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
                                {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                            </div>
                            <button
                                type="submit"
                                className="bg-black mt-4 py-3 text-white rounded-3xl w-full hover:bg-opacity-75 duration-300 ease-out text-center"
                            >
                                Login
                            </button>
                        </form>
                        <div className="text-center text-sm mt-6">
                            <span>{"Dont have an account?"} {" "}</span>
                            <Link href="/signup" className="underline">
                                Sign up
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="hidden lg:block w-3/5 relative">
                <Image
                    src="/background2.jpg"
                    alt="Login background"
                    layout="fill"
                    objectFit="cover"
                    className="dark:brightness-[0.2] dark:grayscale"
                />
            </div>
        </div>
    )
}