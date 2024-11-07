import CategoryItem from "./category-item"

export default function CategoryItemBox() {
    return (
        <section className="w-full flex mt-14 justify-center items-center gap-4 flex-wrap">
            <CategoryItem icon={"/chair_icon.svg"} category={"Chair"} />
            <CategoryItem icon={"/sofa_icon.svg"} category={"Sofa"} />
            <CategoryItem icon={"/cabinet_icon.svg"} category={"Cabinet"} />
            <CategoryItem icon={"/closet_icon.svg"} category={"Wardrobe"} />
            <CategoryItem icon={"/armchair_icon.svg"} category={"Armchair"} />

        </section>
    )
}