"use client"
import ItemBox from "@/components/item-box"
import StoreItemBox from "./store-item-box"
import { useMemo, useState, useEffect } from "react"
import { useShoppingCart } from "@/components/useShoppingCart"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"

export default function StoreWrapper({ data }) {
    const [selectedCategory, setSelectedCategory] = useState(null)
    const [isDesktop, setIsDesktop] = useState(false)

    const { addToCart } = useShoppingCart()

    function handleClick(category) {
        setSelectedCategory(prev => prev === category ? null : category)
    }

    const filteredData = useMemo(() => {
        if (!selectedCategory) return data
        return data.filter(item => selectedCategory === item.category)
    }, [data, selectedCategory])

    const categories = [
        { icon: "/chair_icon.svg", name: "Chair" },
        { icon: "/sofa_icon.svg", name: "Sofa" },
        { icon: "/cabinet_icon.svg", name: "Cabinet" },
        { icon: "/closet_icon.svg", name: "Wardrobe" },
        { icon: "/armchair_icon.svg", name: "Armchair" }
    ]



    useEffect(() => {
        const checkIfDesktop = () => setIsDesktop(window.innerWidth >= 1024);
        checkIfDesktop();
        window.addEventListener('resize', checkIfDesktop);
        return () => window.removeEventListener('resize', checkIfDesktop);
    }, []);

    return (
        <div className="w-full mt-8 mb-20">
            {isDesktop ?
                <section className="flex flex-wrap items-center justify-center w-full gap-4 m-auto mt-10 lg:gap-7">
                    {categories.map(cat => (
                        <StoreItemBox
                            key={cat.name}
                            icon={cat.icon}
                            category={cat.name}
                            handleClick={handleClick}
                            isSelected={selectedCategory === cat.name}
                        />
                    ))}
                </section>
                :
                <Carousel
                    opts={{
                        align: "start",
                        loop: false,
                    }}
                    className="flex items-center justify-center w-full gap-4 m-auto lg:mt-10 lg:gap-7 lg:flex-wrap"
                >
                    <CarouselContent>
                        {categories.map((cat) => (
                            <CarouselItem key={cat.id} className="basis-1/2 ">
                                <div className="">
                                    <StoreItemBox
                                        key={cat.name}
                                        icon={cat.icon}
                                        category={cat.name}
                                        handleClick={handleClick}
                                        isSelected={selectedCategory === cat.name}
                                    />
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>
            }
            <div className="flex flex-wrap items-center justify-center gap-4 mt-4 lg:gap-7 lg:mt-8">
                {filteredData.map((item) => (
                    <ItemBox key={item.id} product={item} addToCart={addToCart} />
                ))}
            </div>
        </div>
    )
}
