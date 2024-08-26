export default function CashPaymentSection() {
    return (
        <div className="w-full mt-8 flex flex-col gap-5 border-t border-[#dfdfdf] pt-8">
            <p className="text-lg font-medium">
                You have selected <strong>Cash on Delivery</strong>. Please have the exact amount ready when your order is delivered.
            </p>
            <p className="text-sm">
                We will confirm your order details via phone before delivery. Please ensure your phone number is accurate for confirmation.
            </p>

        </div>
    );
}
