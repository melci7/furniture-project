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
        <div className="flex flex-col md:flex-row gap-8 lg:mt-20 mt-12">
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
            <Carousel
                opts={{
                    align: "start",
                    loop: false,
                }}
                className="flex lg:mt-20 mt-12"
            >
                <CarouselContent>
                    {services.map((service, index) => (
                        <CarouselItem key={index} className="rounded-[24px] shadow-md hover:shadow-lg transition-shadow duration-300 ease-out group">
                            <div className="flex items-center gap-2 mb-3">
                                <service.icon strokeWidth={1.5} size={36} className="text-[#455EA0]" />
                                <h3 className="font-semibold text-xl relative pb-0.5">
                                    {service.title}
                                    <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#455EA0] transition-all duration-300 group-hover:w-full"></div>
                                </h3>
                            </div>
                            <p className="text-[#636363] mb-3 leading-7">{service.description}</p>
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
        </div>
    );
}