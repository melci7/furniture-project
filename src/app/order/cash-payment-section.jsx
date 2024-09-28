export default function CashPaymentSection() {
    return (
        <div className="w-full lg:mt-8 mt-6 flex flex-col lg:gap-5 gap-4 border-t border-[#dfdfdf] lg:pt-8 pt-6">
            <p className="lg:text-lg font-medium">
                You have selected <strong>Cash on Delivery</strong>. Please have the exact amount ready when your order is delivered.
            </p>
            <p className="lg:text-sm text-[13px]">
                We will confirm your order details via phone before delivery. Please ensure your phone number is accurate for confirmation.
            </p>

        </div>
    );
}
