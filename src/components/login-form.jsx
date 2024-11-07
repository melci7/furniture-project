"use client"

import Link from "next/link"
import { useForm } from "react-hook-form"
import { signIn } from "next-auth/react"
import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useSession } from "next-auth/react"
import Spinner from "./spinner"

export default function LoginForm() {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const [serverError, setServerError] = useState("")
    const router = useRouter()
    const searchParams = useSearchParams()
    const returnUrl = searchParams.get('returnUrl') || '/'
    const { data: session, status } = useSession()
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

    if (status === "loading") {
        return (
            <div className="flex h-screen items-center justify-center">
                <Spinner size="medium" color="primary" />
            </div>
        )
    }

    return (
        <div className="flex min-h-[600px] md:min-h-[670px] mb-10">
            <div className="w-full lg:w-full flex flex-col">
                <div className="flex-1 flex items-center justify-center">
                    {status === "authenticated" ? (
                        <div className="p-6">
                            <h2 className="text-2xl font-semibold mb-4">Already Logged In</h2>
                            <div className="space-y-4">
                                <p className="text-[#636363]">You are already logged in as {session.user.email}.</p>
                                <button
                                    className="w-1/2 bg-black text-white py-3 rounded-full hover:bg-opacity-75 transition duration-300 ease-out text-center"
                                    onClick={() => router.push(decodeURIComponent(returnUrl))}
                                >
                                    Go to Home
                                </button>
                            </div>
                        </div>
                    ) :
                        <div className="w-full max-w-md bg-white md:p-10 p-6 shadow-md rounded-xl border border-[#dfdfdf]">
                            <div className="mb-6">
                                <h1 className="lg:text-3xl text-2xl font-semibold">Log in</h1>
                                <p className="text-[#636363] mt-2 text-sm lg:text-base">
                                    Enter your email below to login to your account
                                </p>
                            </div>

                            {serverError && <p className="text-red-500 text-xs lg:text-sm mb-4">{serverError}</p>}
                            <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
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
                                    {errors.email && <p className="text-red-500 lg:text-sm text-xs">{errors.email.message}</p>}
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-sm font-medium" htmlFor="password">Password</label>
                                    <input
                                        className="w-full rounded-[24px] py-2 px-4 border border-[#dfdfdf]"
                                        id="password"
                                        type="password"
                                        {...register("password", {
                                            required: "Password is required"
                                        })}
                                    />
                                    {errors.password && <p className="text-red-500 lg:text-sm text-xs">{errors.password.message}</p>}
                                </div>
                                <button
                                    type="submit"
                                    className="bg-black mt-4 py-2.5 lg:py-3 text-white rounded-3xl w-full hover:bg-opacity-75 duration-300 ease-out text-center"
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
                    }
                </div>
            </div>
        </div>
    )
}