
const sections = ["Details", "Warranty", "Sustainability"];

export default function ItemDetailsSkeleton() {
    return (
        <div className="flex gap-14 mt-20 animate-pulse">
            {/* Left Section: Image Skeleton */}
            <div className="w-7/12 h-[600px] flex bg-gray-200 rounded-[24px]">
                <div className="m-auto self-center object-scale-down w-full max-w-fit bg-gray-300 rounded-lg h-full" />
            </div>

            {/* Right Section: Content Skeleton */}
            <div className="flex flex-col gap-4 w-5/12">
                {/* Title Skeleton */}
                <div className="h-8 bg-gray-300 rounded-md w-3/4"></div>
                <div className="h-4 bg-gray-300 rounded-md w-1/2"></div>

                {/* Price Skeleton */}
                <div className="h-6 bg-gray-300 rounded-md w-1/4"></div>

                {/* Image Thumbnail Skeleton */}
                <div className="w-14 h-12 bg-gray-300 rounded-md"></div>

                {/* Button Skeleton */}
                <div className="bg-gray-300 py-3 rounded-3xl w-full mt-6"></div>

                {/* Tabs Skeleton */}
                <div className="flex border-b border-gray-200 mt-4">
                    {sections.map((section) => (
                        <div key={section} className="flex justify-center w-full py-2 px-4">
                            <div className="h-4 bg-gray-300 rounded-md w-1/2"></div>
                        </div>
                    ))}
                </div>

                {/* Tab Content Skeleton */}
                <div className="mt-4 space-y-4">
                    <div className="h-4 bg-gray-300 rounded-md"></div>
                    <div className="h-4 bg-gray-300 rounded-md w-5/6"></div>
                    <div className="h-4 bg-gray-300 rounded-md w-4/6"></div>
                </div>
            </div>
        </div>
    );
}
