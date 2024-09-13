import { Home, Plus } from "lucide-react"

export default function Loading() {
  return (
    <div className="w-[58%] flex flex-col animate-pulse">
      <div className="border border-[#dfdfdf] rounded-2xl p-8 mb-4">
        <div>
          <div className="h-8 w-48 bg-gray-200 rounded mb-2"></div>
          <div className="h-4 w-64 bg-gray-200 rounded mb-6"></div>

          {[1, 2, 3].map((_, index) => (
            <div
              key={index}
              className="relative border border-[#dfdfdf] rounded-lg p-4 mb-4"
            >
              <div className="absolute top-4 left-4 w-4 h-4 bg-gray-200 rounded-full"></div>
              <div className="pl-8">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center">
                    <Home size={18} className="mr-2 text-gray-300" />
                    <div className="h-4 w-24 bg-gray-200 rounded"></div>
                  </div>
                </div>
                <div className="h-4 w-full bg-gray-200 rounded"></div>
              </div>
            </div>
          ))}
        </div>
        <div className="bg-gray-200 mt-6 py-3 rounded-3xl w-2/3 mx-auto flex items-center justify-center">
          <Plus size={18} className="mr-2 text-gray-300" />
          <div className="h-4 w-32 bg-gray-300 rounded"></div>
        </div>
      </div>
      <div className="mt-4 py-3 bg-gray-200 rounded-3xl w-full h-12"></div>
    </div>
  )
}
