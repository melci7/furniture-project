import Spinner from "@/components/spinner"

export default function Loading() {
  return (
    <>
      <section className="hidden lg:flex flex-wrap items-center justify-center w-full gap-4 m-auto mt-10 lg:gap-7">
        {Array.from({ length: 5 }).map((_, index) => (
          <SkeletonCategoryBox key={index} />
        ))}
      </section>
      <div className="flex flex-wrap items-center justify-start gap-4 mt-4 lg:gap-7 lg:mt-8">
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
      <div className=" h-56 lg:h-[300px] flex items-center justify-center w-full self-center rounded-lg">
        <Spinner color="outline" size="medium" />
      </div>
      <div className="flex flex-col mt-4">
        <div className="h-4 bg-gray-300 rounded-sm w-2/3 mb-2"></div>
        <div className="h-4 bg-gray-300 rounded-sm w-1/2 mb-2"></div>

        <div className="flex gap-1.5 items-center mt-1">
          <div className="h-5 bg-gray-300 rounded-md w-1/4"></div>
        </div>
      </div>
      <div className="bg-gray-300 h-12 w-12 absolute right-6 bottom-6 rounded-full"></div>
    </div>
  )
}

function SkeletonCategoryBox() {
  return (
    <div
      className={`bg-[#f5f5f5] rounded-[24px] lg:px-10 flex flex-col items-center lg:py-4 px-14 py-3.5 animate-pulse`}
    >
      <div className={`m-auto w-10 lg:w-20 h-20 rounded-full `}></div>
    </div>
  )
}
