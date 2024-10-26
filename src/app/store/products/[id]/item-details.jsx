"use client"
import Spinner from '@/components/spinner';
import { useShoppingCart } from '@/components/useShoppingCart';
import { useState } from 'react';

const sections = [
    {
        title: "Details",
        content: "Black sofas are a popular choice in modern interior design, offering a sleek and versatile foundation for various decor styles. These elegant pieces of furniture can serve as a striking focal point in a living room or blend seamlessly into a minimalist aesthetic. The dark hue provides a sophisticated backdrop for colorful throw pillows and blankets, allowing for easy seasonal updates to your decor."
    },
    {
        title: "Warranty",
        content: "We stand behind the quality and craftsmanship of our furniture with a comprehensive 3-year warranty. Each piece is designed to meet the highest standards of durability and functionality, ensuring long-lasting satisfaction. Our warranty covers manufacturing defects and workmanship issues, giving you peace of mind with your purchase."
    },
    {
        title: "Sustainability",
        content: "In our commitment to sustainability, we proudly offer a curated selection of eco-friendly furniture crafted from responsibly sourced materials. We prioritize products that minimize environmental impact, from pieces made with reclaimed wood to those featuring non-toxic finishes. Our mission is to provide stylish, durable furniture that not only enhances your home but also contributes to the well-being of our planet."
    }
];

export default function ItemDetails({ product }) {
    const [activeSection, setActiveSection] = useState('Details');
    const [isLoading, setIsLoading] = useState(false);
    const { addToCart } = useShoppingCart()

    async function handleClick(e) {
        e.preventDefault()
        setIsLoading(true)

        await new Promise(resolve => setTimeout(resolve, 400))

        addToCart(product)
        setIsLoading(false)
    }

    function formatPrice(price) {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    return (
        <div className="flex flex-col mt-8 lg:flex-row lg:gap-14 gap-7 lg:mt-20">
            <div className="lg:w-6/12 w-full lg:h-[600px] h-[460px] flex rounded-[24px]">
                <div className='w-[600px] h-full m-auto bg-zinc-300 rounded-[24px]'>
                    <img
                        className="object-contain w-full h-full m-auto rounded-[24px]"
                        src={product.image[0]}
                        alt={product.name}
                    />

                </div>
            </div>
            <div className="flex flex-col gap-2 lg:gap-4 lg:w-6/12">
                <h2 className="text-2xl font-semibold lg:text-4xl">{product.name}</h2>
                <p className="text-[#636363]">{product.name}</p>
                {product.discount && (
                    <span className='-mb-4 text-sm font-bold line-through lg:text-base'>
                        ${formatPrice(product.price)}
                    </span>
                )}
                <h2 className="text-xl font-bold lg:text-3xl">
                    ${formatPrice(product.price - (product.price * product.discount / 100))}
                </h2>
                <img
                    className="object-contain h-12 border-2 border-black rounded-sm shadow-md cursor-pointer w-14"
                    src={product.image}
                    alt={product.name}
                />

                <button
                    className={`
                        bg-[#455EA0] py-3 text-white text-xl rounded-3xl w-full lg:mb-4 mb-2 lg:mt-6 mt-4 
                        hover:bg-[#304170] duration-300 ease-out transition-all 
                        flex items-center justify-center h-[52px]
                        ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}
                    `}
                    onClick={handleClick}
                    disabled={isLoading}
                    aria-label={isLoading ? "Adding to cart" : "Add to cart"}
                >
                    {isLoading ? (
                        <Spinner size='small' color='secondary' />
                    ) : (
                        "Add to Cart"
                    )}
                </button>
                <div>
                    <div className="flex border-b border-gray-200">
                        {sections.map((section) => (
                            <button
                                key={section.title}
                                className={`
                                    flex justify-center w-full py-2 px-4 
                                    focus:outline-none font-medium
                                    relative
                                `}
                                onClick={() => setActiveSection(section.title)}
                            >
                                {section.title}
                                <div
                                    className={`
                                        absolute bottom-0 left-0 w-full h-0.5
                                        transition-all duration-300 ease-out
                                        ${activeSection === section.title
                                            ? 'bg-[#455EA0] scale-x-100'
                                            : 'bg-transparent scale-x-0'
                                        }
                                    `}
                                />
                            </button>
                        ))}
                    </div>
                    <div className="mt-4 text-[#636363] lg:leading-7 text-[15px] lg:text-base text-center lg:text-start">
                        {sections.find(section => section.title === activeSection)?.content}
                    </div>
                </div>
            </div>
        </div>
    );
}