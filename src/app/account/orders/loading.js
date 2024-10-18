import Spinner from "@/components/spinner"

export default function Loading() {
  return (
    <div className="max-w-2xl w-full lg:border border-[#dfdfdf] rounded-2xl lg:p-8">
      <div className="flex flex-col">
        <div className="flex-1">
          <div className="w-full">
            <div className="lg:mb-6 mb-5">
              <h1 className="lg:text-3xl text-2xl font-semibold">Orders</h1>
              <p className="text-[#636363] lg:mt-2 mt-0.5 lg:text-base text-sm">
                View your order history
              </p>
            </div>
            <div className="flex justify-center items-center py-4 pb-8">
              <Spinner size="medium" color="primary" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
