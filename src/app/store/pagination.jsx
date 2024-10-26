"use client"

import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react"
import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { useCallback } from "react"

export default function Pagination({ totalPages }) {
    const searchParams = useSearchParams()
    const router = useRouter()
    const pathname = usePathname()
    const currentPage = Number(searchParams.get("page")) || 1

    const createQueryString = useCallback(
        (name, value) => {
            const params = new URLSearchParams(searchParams)
            params.set(name, value)
            return params.toString()
        },
        [searchParams]
    )

    return (
        <div className={`gap-2 items-center justify-center mt-6 lg:text-base text-sm ${totalPages <= 1 ? "hidden" : "flex"}`}>
            {/* Previous button */}
            <button
                onClick={() => {
                    if (currentPage > 1) {
                        router.push(
                            `${pathname}?${createQueryString('page', (currentPage - 1).toString())}`
                        )
                    }
                }}
                disabled={currentPage <= 1}
                className="rounded-full lg:w-10 lg:h-10 w-5 h-5 flex items-center justify-center  disabled:opacity-50 disabled:cursor-not-allowed mr-1 active:scale-95"
                aria-label="Previous page"
            >
                <ChevronLeft />
            </button>

            {/* Page numbers */}
            {[...Array(totalPages)].map((_, index) => {
                const pageNumber = index + 1
                return (
                    <button
                        key={pageNumber}
                        onClick={() => {
                            router.push(
                                `${pathname}?${createQueryString('page', pageNumber.toString())}`
                            )
                        }}
                        className={`
              rounded-full lg:w-10 lg:h-10 w-9 h-9 flex items-center justify-center transition-all duration-200 ease-out
              ${currentPage === pageNumber
                                ? "bg-[#3A4F85] text-white"
                                : "bg-white text-black hover:bg-[#EEF2FF]"
                            }
            `}
                        aria-label={`Page ${pageNumber}`}
                        aria-current={currentPage === pageNumber ? "page" : undefined}
                    >
                        {pageNumber}
                    </button>
                )
            })}

            {/* Next button */}
            <button
                onClick={() => {
                    if (currentPage < totalPages) {
                        router.push(
                            `${pathname}?${createQueryString('page', (currentPage + 1).toString())}`
                        )
                    }
                }}
                disabled={currentPage >= totalPages}
                className="rounded-full lg:w-10 lg:h-10 w-5 h-5 flex items-center justify-center  disabled:opacity-50 disabled:cursor-not-allowed ml-1 active:scale-95 "
                aria-label="Next page"
            >
                <ChevronRight />
            </button>
        </div>
    )
}