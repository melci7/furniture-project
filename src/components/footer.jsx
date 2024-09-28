import { Package, Truck, Undo2 } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
    return (
        <footer className="w-full mt-auto">

            <div className='flex flex-col lg:flex-row lg:items-baseline lg:justify-between text-[#636363]'>
                <div className='flex flex-col lg:gap-3 gap-2 text-black items-center lg:items-start text-center lg:text-start'>
                    <span className='lg:text-4xl text-3xl font-semibold'>Logo</span>
                    <span className='max-w-[300px] lg:text-base text-sm'>Rotonda Giuliani 3 Bianco veneto, 62383 Bergamo (VS)</span>
                    <span className='lg:text-base text-sm'>logo@gmail.com</span>
                    <button className="bg-[#2D2D2D] rounded-3xl py-3.5 px-6 lg:px-7 lg:text-sm text-xs text-white lg:self-start mt-3 hover:bg-opacity-75 duration-300 ease-out">Contact Us</button>
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
                <div className='flex flex-wrap justify-evenly mt-6 gap-6 lg:w-3/5 lg:justify-between'>
                    <div className='flex-col gap-3 hidden lg:flex'>
                        <span className='font-semibold lg:text-lg text-base text-black'>Useful Link</span>
                        <ul className='flex flex-col gap-1.5 lg:text-base text-sm'>
                            <li><Link href="/">Home</Link></li>
                            <li><Link href="/about">About</Link></li>
                            <li><Link href="/store">Store</Link></li>
                            <li><Link href="/sale">Sale</Link></li>
                        </ul>
                    </div>
                    <div className='flex flex-col gap-3'>
                        <span className='font-semibold lg:text-lg text-base text-black'>Contact Us</span>
                        <div className='flex flex-col lg:text-lg text-base'>
                            <span>+61 3 8376 6284</span>
                            <span>+61 3 8376 6284</span>
                        </div>
                        <div className='flex flex-col lg:mt-4 gap-1.5 lg:text-base text-sm'>
                            <span>Monday - Friday</span>
                            <span>8AM - 5PM</span>
                            <span>Saturday - Sunday</span>
                            <span>10AM - 2PM</span>
                        </div>
                    </div>
                    <div className='flex flex-col gap-3'>
                        <span className='font-semibold lg:text-lg text-base text-black'>Customer Service</span>
                        <div>
                            <ul className='flex flex-col gap-1.5 lg:text-base text-sm'>
                                <li>Orders</li>
                                <li>Cart</li>
                                <li>Wishlist</li>
                                <li>Account</li>
                                <li>Privacy Policy</li>
                            </ul>
                        </div>
                    </div>
                </div>

            </div>
            <div className='bg-[#f5f6fb] rounded-t-[24px] text-center text-[#636363] py-4 mt-8 lg:mt-12 lg:text-sm text-xs'>Copyright &copy; 2024. All Rights Reserved.</div>
        </footer>
    )
}
