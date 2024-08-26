
export default function RecommendedSkeleton() {
    return (
        <div className="my-20 animate-pulse">
            {/* Title Skeleton */}
            <h2 className="font-semibold text-4xl bg-gray-300 rounded-md h-8 mb-4 w-3/4"></h2>

            {/* Carousel Skeleton */}
            <div className="relative">
                <div className="flex overflow-x-auto gap-4 pb-4">
                    {/* Carousel Item Skeletons */}
                    {[...Array(4)].map((_, index) => (
                        <div key={index} className="bg-gray-200 rounded-lg w-full h-60 md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                            <div className="p-4 space-y-4">
                                {/* Image Placeholder */}
                                <div className="bg-gray-300 rounded-lg h-32 w-full mb-4" />
                                {/* Text Placeholder */}
                                <div className="bg-gray-300 rounded-md h-4 w-3/4 mb-2" />
                                <div className="bg-gray-300 rounded-md h-4 w-1/2" />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Navigation Buttons Skeleton */}
                <div className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-300 rounded-full h-10 w-10 flex items-center justify-center">
                    <div className="w-4 h-4 bg-gray-400 rounded-full" />
                </div>
                <div className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-300 rounded-full h-10 w-10 flex items-center justify-center">
                    <div className="w-4 h-4 bg-gray-400 rounded-full" />
                </div>
            </div>
        </div>
    );
}
