
export default function OrderSummaryBox({ product }) {

    function formatPrice(price) {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    const subtotal = product.reduce((total, item) => total + (item.price * item.quantity), 0)
    const delivery = 169
    return (
        <div className="">
            <h2 className="text-2xl font-semibold mb-4">Summary</h2>
            <div className="w-full p-6 rounded-[24px] shadow-md flex flex-col gap-3">
                <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between pb-1">
                    <span>Delivery</span>
                    <span>${subtotal > 0 ? delivery : "0"}</span>
                </div>
                <div className="flex justify-between border-t border-[#dfdfdf] pt-4">
                    <span className="font-semibold">Total</span>
                    <span className="font-semibold">${subtotal > 0 ? formatPrice(subtotal + delivery) : "0"}</span>
                </div>
            </div>
        </div>
    )
}