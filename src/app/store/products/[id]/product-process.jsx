"use client"
import { Package, Truck, Undo2 } from 'lucide-react';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { useEffect, useState } from 'react';

export default function ProductProcess() {
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [scrollSnaps, setScrollSnaps] = useState([])
    const [carouselApi, setCarouselApi] = useState(null)

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

    const services = [
        {
            icon: Package,
            title: "Shipping",
            description: "Fast and secure shipping options to meet your needs. Our shipping service offers multiple speed options, package tracking, and insurance for valuable items. We partner with reliable carriers to ensure your package arrives safely and on time."
        },
        {
            icon: Truck,
            title: "Delivery",
            description: "Reliable delivery service right to your doorstep. Our delivery service covers both local and international destinations. We offer flexible delivery windows, real-time tracking, and the option for contactless delivery to ensure your convenience and safety."
        },
        {
            icon: Undo2,
            title: "Returns",
            description: "Hassle-free returns within 30 days of purchase. Our return policy allows you to return items within 30 days of receipt. We provide prepaid return labels and process refunds quickly. For damaged items, we offer instant replacements."
        }
    ];

    return (
        <div className="flex flex-col md:flex-row gap-8 lg:mt-20 mt-8">
            <div className='hidden gap-8 mt-12 lg:flex'>
                {services.map((service, index) => (
                    <div key={index} className="flex-1 p-6 rounded-[24px] shadow-md hover:shadow-lg transition-shadow duration-300 ease-out group">
                        <div className="flex items-center gap-2 mb-3">
                            <service.icon strokeWidth={1.5} size={36} className="text-[#455EA0]" />
                            <h3 className="font-semibold text-xl relative pb-0.5">
                                {service.title}
                                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#455EA0] transition-all duration-300 group-hover:w-full"></div>
                            </h3>
                        </div>
                        <p className="text-[#636363] mb-3 leading-7">{service.description}</p>
                    </div>
                ))}
            </div>
            <div className="w-full lg:hidden">
                <Carousel
                    opts={{
                        align: "start",
                        loop: false,
                    }}
                    className="w-full"
                    setApi={setCarouselApi}
                >
                    <CarouselContent className="gap-12 pb-4 pt-2 mx-auto items-center">
                        {services.map((service, index) => (
                            <CarouselItem key={index} className="py-2 px-4 pt-6 rounded-[24px] border border-[#455EA0] transition-shadow duration-300 ease-out group text-[15px]">
                                <div className="flex items-center gap-1.5 mb-1 ">
                                    <service.icon strokeWidth={1.5} size={26} className="text-[#455EA0]" />
                                    <h3 className="font-semibold text-lg relative ">
                                        {service.title}
                                    </h3>
                                </div>
                                <p className="text-[#636363] mb-2 leading-7">{service.description}</p>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>
                <div className="flex justify-center mt-2">
                    {scrollSnaps.map((_, index) => (
                        <button
                            key={index}
                            className={`w-1.5 h-1.5 rounded-full mx-1 transition-colors duration-300 ease-in-out ${index === selectedIndex ? 'bg-[#455EA0]' : 'bg-gray-300'
                                }`}
                            onClick={() => carouselApi && carouselApi.scrollTo(index)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}