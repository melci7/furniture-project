"use client"
import ItemBox from "@/components/item-box"
import StoreItemBox from "./store-item-box"
import { useMemo, useState } from "react"
import { useShoppingCart } from "@/components/useShoppingCart"

export default function StoreWrapper({ data }) {
    const [selectedCategory, setSelectedCategory] = useState(null)

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

    return (
        <div className="w-full mt-8 mb-20">
            <section className="w-full m-auto flex mt-14 justify-center items-center gap-7 flex-wrap">
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
            <div className="flex flex-wrap gap-7 justify-center items-center mt-8 w-fit">
                {filteredData.map((item) => (
                    <ItemBox key={item.id} product={item} addToCart={addToCart} />
                ))}
            </div>
        </div>
    )
}
