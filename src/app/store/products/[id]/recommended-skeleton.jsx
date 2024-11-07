export default function RecommendedSkeleton() {
    return (
        <div className="my-20 animate-pulse">
            <h2 className="w-3/4 h-8 mb-4 text-4xl font-semibold bg-gray-300 rounded-md"></h2>

            <div className="relative">
                <div className="flex gap-4 pb-4 overflow-x-auto">
                    {[...Array(4)].map((_, index) => (
                        <div key={index} className="w-full bg-gray-200 rounded-lg h-60 md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                            <div className="p-4 space-y-4">
                                <div className="w-full h-32 mb-4 bg-gray-300 rounded-lg" />
                                <div className="w-3/4 h-4 mb-2 bg-gray-300 rounded-md" />
                                <div className="w-1/2 h-4 bg-gray-300 rounded-md" />
                            </div>
                        </div>
                    ))}
                </div>
                <div className="absolute flex items-center justify-center w-10 h-10 transform -translate-y-1/2 bg-gray-300 rounded-full top-1/2 left-4">
                    <div className="w-4 h-4 bg-gray-400 rounded-full" />
                </div>
                <div className="absolute flex items-center justify-center w-10 h-10 transform -translate-y-1/2 bg-gray-300 rounded-full top-1/2 right-4">
                    <div className="w-4 h-4 bg-gray-400 rounded-full" />
                </div>
            </div>
        </div>
    );
}
