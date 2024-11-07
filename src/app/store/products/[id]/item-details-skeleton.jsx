const sections = ["Details", "Warranty", "Sustainability"];

export default function ItemDetailsSkeleton() {
    return (
        <div className="flex flex-col mt-6 lg:flex-row lg:gap-7 gap-5 lg:mt-20 animate-pulse">
            <div className="w-full lg:w-1/2 h-[400px] bg-gray-200 rounded-lg"></div>

            <div className="flex flex-col gap-4 lg:w-1/2">
                <div className="h-8 bg-gray-200 rounded w-3/4"></div>
                <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                </div>
                <div className="h-8 bg-gray-200 rounded w-1/4"></div>
                <div className="flex flex-wrap gap-3 mt-4">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="flex-1 min-w-[160px] h-16 bg-gray-200 rounded-2xl"></div>
                    ))}
                </div>
                <div className="h-12 bg-gray-200 rounded-full mt-6"></div>
                <div className="mt-6">
                    <div className="flex border-b border-gray-200">
                        {['Details', 'Warranty', 'Sustainability'].map((tab) => (
                            <div key={tab} className="flex-1 h-10 bg-gray-200 rounded-t-lg mx-1"></div>
                        ))}
                    </div>
                    <div className="mt-4 space-y-2">
                        <div className="h-4 bg-gray-200 rounded"></div>
                        <div className="h-4 bg-gray-200 rounded"></div>
                        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
