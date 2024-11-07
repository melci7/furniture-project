import Spinner from "@/components/spinner"

// app/store/loading.js
export default function Loading() {
  return (
    <>
      <h1 className="text-3xl lg:text-4xl lg:text-start text-center font-medium lg:max-w-[500px] font-sans mt-4 lg:mt-10">
        Limited-Time Furniture Sale: Style Meets Savings!
      </h1>
      <div className="flex flex-wrap items-center justify-start gap-4 mt-4 lg:gap-7 lg:mt-8">
        {/* Render multiple SkeletonItemBox components as placeholders */}
        {Array.from({ length: 6 }).map((_, index) => (
          <SkeletonItemBox key={index} />
        ))}
      </div>
    </>
  )
}

function SkeletonItemBox() {
  return (
    <div
      className="relative rounded-[24px] bg-[#F5F5F5] animate-pulse 
            flex flex-col justify-between p-6 w-full md:w-[calc(50%-1rem)] lg:w-[calc(33%-1rem)]"
    >
      {/* Skeleton for image */}
      <div className=" h-56 lg:h-[300px] flex items-center justify-center w-full self-center rounded-lg">
        <Spinner color="outline" size="medium" />
      </div>
      <div className="flex flex-col mt-4">
        {/* Skeleton for product name */}
        <div className="h-4 bg-gray-300 rounded-sm w-2/3 mb-2"></div>
        {/* Skeleton for product description */}
        <div className="h-4 bg-gray-300 rounded-sm w-1/2 mb-2"></div>

        <div className="flex gap-1.5 items-center mt-1">
          {/* Skeleton for price */}
          <div className="h-5 bg-gray-300 rounded-md w-1/4"></div>
        </div>
      </div>

      {/* Skeleton for add to cart button */}
      <div className="bg-gray-300 h-12 w-12 absolute right-6 bottom-6 rounded-full"></div>
    </div>
  )
}
