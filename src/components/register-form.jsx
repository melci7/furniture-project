"use client"

import { useForm } from 'react-hook-form';

export default function RegisterForm() {
    const { register, handleSubmit, formState: { errors }, watch } = useForm();

    const onSubmit = (data) => {
        console.log(data);
        // TODO: Implement registration logic
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                <input
                    id="name"
                    type="text"
                    {...register("name", { required: "Name is required" })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                />
                {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
            </div>
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input
                    id="email"
                    type="email"
                    {...register("email", {
                        required: "Email is required",
                        pattern: {
                            value: /\S+@\S+\.\S+/,
                            message: "Invalid email address"
                        }
                    })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                />
                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
            </div>
            <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                <input
                    id="password"
                    type="password"
                    {...register("password", {
                        required: "Password is required",
                        minLength: {
                            value: 8,
                            message: "Password must be at least 8 characters"
                        }
                    })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                />
                {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>}
            </div>
            <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                <input
                    id="confirmPassword"
                    type="password"
                    {...register("confirmPassword", {
                        required: "Please confirm your password",
                        validate: (val) => {
                            if (watch('password') != val) {
                                return "Your passwords do not match";
                            }
                        }
                    })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                />
                {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>}
            </div>
            <button type="submit" className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700">
                Register
            </button>
        </form>
    );
}