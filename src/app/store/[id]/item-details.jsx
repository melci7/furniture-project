"use client"
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
    const { addToCart } = useShoppingCart()

    function formatPrice(price) {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    return (
        <div className="flex gap-14 mt-20">
            <div className="w-7/12 h-[600px] flex bg-[#f5f5f5] rounded-[24px]">
                <img
                    className="m-auto self-center object-scale-down w-full max-w-fit"
                    src={product.image}
                    alt={product.name}
                />
            </div>
            <div className="flex flex-col gap-4 w-5/12">
                <h2 className="text-4xl font-semibold">{product.name}</h2>
                <p className="text-[#636363]">{product.name}</p>
                {product.discount && (
                    <span className='text-md font-bold line-through -mb-4'>
                        ${formatPrice(product.price)}
                    </span>
                )}
                <h2 className="text-3xl font-bold">
                    ${formatPrice(product.price - (product.price * product.discount / 100))}
                </h2>
                <img
                    className="w-14 h-12 object-contain border-2 border-black rounded-sm shadow-md cursor-pointer"
                    src={product.image}
                    alt={product.name}
                />

                <button
                    className="bg-[#455EA0] py-3 text-white text-xl rounded-3xl w-full mb-4 mt-6 hover:bg-[#304170] duration-300 ease-out"
                    onClick={(e) => {
                        e.preventDefault()
                        addToCart(product)
                    }}
                >
                    Add to Cart
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
                    <div className="mt-4 text-[#636363] leading-7">
                        {sections.find(section => section.title === activeSection)?.content}
                    </div>
                </div>
            </div>
        </div>
    );
}