"use client"
import Spinner from '@/components/spinner';
import { useShoppingCart } from '@/components/useShoppingCart';
import { useEffect, useState } from 'react';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"

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
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [scrollSnaps, setScrollSnaps] = useState([])
    const [carouselApi, setCarouselApi] = useState(null)
    const [selectedImage, setSelectedImage] = useState(product.image[0])
    const { addToCart } = useShoppingCart()

    useEffect(() => {
        if (!carouselApi) return

        setScrollSnaps(carouselApi.scrollSnapList())
        const onSelect = () => {
            setSelectedIndex(carouselApi.selectedScrollSnap())
        }

        carouselApi.on('select', onSelect)
        onSelect()

        return () => {
            carouselApi.off('select', onSelect)
        }
    }, [carouselApi])

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

    function setImage(src) {
        setSelectedImage(src)
    }

    return (
        <div className="flex flex-col mt-6 lg:flex-row lg:gap-7 gap-5 lg:mt-20">
            <div className="hidden w-1/2 h-[600px] lg:flex rounded-[24px]">

                <div className='flex flex-col items-center gap-2 mr-auto'>
                    <img
                        className={`${selectedImage === product.image[0] ? "border-2 border-[#5C75B8]" : ""} object-contain h-16 rounded-md shadow-md cursor-pointer w-16`}
                        src={product.image[0]}
                        alt={product.name}
                        onClick={() => setImage(product.image[0])}
                    />
                    <img
                        className={`${selectedImage === product.image[1] ? "border-2 border-[#5C75B8] " : ""} object-contain h-16 rounded-md shadow-md cursor-pointer w-16`}
                        src={product.image[1]}
                        alt={product.name}
                        onClick={() => setImage(product.image[1])}
                    />
                </div>
                <div className='w-[600px] h-full mr-auto rounded-[24px]'>
                    <img
                        className="object-contain w-full h-full m-auto rounded-[24px]"
                        src={selectedImage}
                        alt={product.name}
                    />

                </div>
            </div>
            <Carousel
                className="lg:hidden w-full flex items-center rounded-[24px]"
                setApi={setCarouselApi}
            >
                <CarouselContent className="w-full h-full m-auto rounded-[24px]">
                    <CarouselItem className="w-full h-full p-0">
                        <img
                            className="object-contain w-full h-full m-auto rounded-[24px]"
                            src={product.image[0]}
                            alt={product.name}
                        />
                    </CarouselItem>
                    <CarouselItem className="w-full h-full p-0">
                        <img
                            className="object-contain w-full h-full m-auto rounded-[24px]"
                            src={product.image[1]}
                            alt={product.name}
                        />
                    </CarouselItem>

                </CarouselContent>
                <div className="hidden md:block">
                    <CarouselPrevious />
                    <CarouselNext />
                </div>
            </Carousel>
            <div className="flex justify-center mb-1 lg:hidden">
                {scrollSnaps.map((_, index) => (
                    <button
                        key={index}
                        className={`w-2 h-2 rounded-full mx-1 transition-colors duration-300 ease-in-out ${index === selectedIndex ? 'bg-[#455EA0]' : 'bg-gray-300'
                            }`}
                        onClick={() => carouselApi && carouselApi.scrollTo(index)}
                    />
                ))}
            </div>

            <div className="flex flex-col gap-2 lg:gap-2.5 lg:w-[48%]">
                <h2 className="text-2xl font-semibold lg:text-3xl">{product.name}</h2>
                <p className="text-[#636363]">{product.description}</p>
                {product.discount && (
                    <span className='-mb-4 text-sm font-medium text-[#636363] line-through lg:text-base'>
                        ${formatPrice(Math.ceil(product.price).toFixed(2))}
                    </span>
                )}

                <h2 className="text-2xl font-bold lg:text-3xl mt-0.5">
                    ${formatPrice(Math.ceil(product.price - (product.price * product.discount / 100)).toFixed(2))}
                </h2>



                <div className='text-sm flex items-center gap-2.5 lg:gap-4'>
                    <span className='h-5 w-5 bg-[#455EA0] text-white text-center font-semibold'>10</span>
                    <span className='text-[#636363]'>10 year limited warranty</span>
                </div>
                <div className="flex items-center flex-wrap gap-3 mt-4">
                    <div className="flex-1 min-w-[160px] bg-gray-50 p-3 rounded-2xl hover:shadow-md transition-all duration-300 ease-out select-none">
                        <div className="flex items-center gap-2">
                            <svg className="w-4 h-4 text-[#455EA0]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="font-semibold text-sm">Premium Build</span>
                        </div>
                        <p className="text-xs text-[#636363] mt-1 ml-6">Handcrafted quality</p>
                    </div>

                    <div className="flex-1 min-w-[160px] bg-gray-50 p-3 rounded-2xl hover:shadow-md transition-all duration-300 ease-out select-none">
                        <div className="flex items-center gap-2">
                            <svg className="w-4 h-4 text-[#455EA0]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="font-semibold text-sm">Easy Care</span>
                        </div>
                        <p className="text-xs text-[#636363] mt-1 ml-6">Low maintenance</p>
                    </div>

                    <div className="flex-1 min-w-[160px] bg-gray-50 p-3 rounded-2xl hover:shadow-md transition-all duration-300 ease-out select-none">
                        <div className="flex items-center gap-2">
                            <svg className="w-4 h-4 text-[#455EA0]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                            <span className="font-semibold text-sm">Comfort First</span>
                        </div>
                        <p className="text-xs text-[#636363] mt-1 ml-6">Ergonomic design</p>
                    </div>

                    <div className="flex-1 min-w-[160px] bg-gray-50 p-3 rounded-2xl hover:shadow-md transition-all duration-300 ease-out select-none">
                        <div className="flex items-center gap-2">
                            <svg className="w-4 h-4 text-[#455EA0]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                            </svg>
                            <span className="font-semibold text-sm">Perfect Finish</span>
                        </div>
                        <p className="text-xs text-[#636363] mt-1 ml-6">Premium details</p>
                    </div>
                </div>
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