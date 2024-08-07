import { Package, Truck, Undo2 } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
    return (
        <footer className="w-full mt-auto">

            <div className='flex items-baseline justify-between text-[#636363]'>
                <div className='flex flex-col gap-3 text-black'>
                    <span className='text-4xl font-semibold'>Logo</span>
                    <span className='max-w-[300px]'>Rotonda Giuliani 3 Bianco veneto, 62383 Bergamo (VS)</span>
                    <span>logo@gmail.com</span>
                    <button className="bg-[#2D2D2D] rounded-3xl py-3.5 px-7 text-sm text-white self-start mt-3 hover:bg-opacity-75 duration-300 ease-out">Contact Us</button>
                    <div className='flex gap-1 items-center mt-6'>
                        <div className='border-2 rounded-[4px] px-1.5'>
                            <Image
                                src={'/visa.svg'}
                                width={32}
                                height={32}
                                alt="Visa"
                            />
                        </div>
                        <div className='border-2 rounded-[4px] px-1.5'>
                            <Image
                                src={'/mastercard.svg'}
                                width={32}
                                height={32}
                                alt="MasterCard"
                            />
                        </div>
                        <div className='border-2 rounded-[4px] px-1.5'>
                            <Image
                                src={'/paypal.svg'}
                                width={32}
                                height={32}
                                alt="PayPal"
                            />
                        </div>
                        <div className='border-2 rounded-[4px] px-1.5'>
                            <Image
                                src={'/google.svg'}
                                width={32}
                                height={32}
                                alt="Google Pay"
                            />
                        </div>
                        <div className='border-2 rounded-[4px] px-1.5'>
                            <Image
                                src={'/apple.svg'}
                                width={32}
                                height={32}
                                alt="Apple Pay"
                            />
                        </div>
                    </div>
                </div>
                <div className='flex flex-col gap-3'>
                    <span className='font-semibold text-lg text-black'>Useful Link</span>
                    <ul className='flex flex-col gap-1.5'>
                        <li><Link href="/">Home</Link></li>
                        <li><Link href="/about">About</Link></li>
                        <li><Link href="/store">Store</Link></li>
                        <li><Link href="/sale">Sale</Link></li>
                    </ul>
                </div>
                <div className='flex flex-col gap-3'>
                    <span className='font-semibold text-lg text-black'>Contact Us</span>
                    <div className='flex flex-col text-lg'>
                        <span>+61 3 8376 6284</span>
                        <span>+61 3 8376 6284</span>
                    </div>
                    <div className='flex flex-col mt-4 gap-1.5'>
                        <span>Monday - Friday</span>
                        <span>8AM - 5PM</span>
                        <span>Saturday - Sunday</span>
                        <span>10AM - 2PM</span>
                    </div>
                </div>
                <div className='flex flex-col gap-3'>
                    <span className='font-semibold text-lg text-black'>Customer Service</span>
                    <div>
                        <ul className='flex flex-col gap-1.5'>
                            <li>Orders</li>
                            <li>Cart</li>
                            <li>Wishlist</li>
                            <li>Account</li>
                            <li>Privacy Policy</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className='bg-[#f5f6fb] rounded-t-[24px] text-center text-[#636363] py-4 mt-12 text-sm'>Copyright &copy; 2024. All Rights Reserved.</div>
        </footer>
    )
}
