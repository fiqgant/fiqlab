"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { DEFAULT_PAGE_SIZE, PAGINATION_PAGE_SIZES, type PageSize, getTotalPages } from "@/lib/pagination";
import { cn } from "@/lib/utils";

interface PaginationControlsProps {
  totalItems: number;
  currentPage: number;
  pageSize: PageSize;
  itemLabel: string;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: PageSize) => void;
  className?: string;
}

export function PaginationControls({
  totalItems,
  currentPage,
  pageSize,
  itemLabel,
  onPageChange,
  onPageSizeChange,
  className,
}: PaginationControlsProps) {
  const totalPages = getTotalPages(totalItems, pageSize);
  const safePage = Math.min(Math.max(currentPage, 1), totalPages);
  const startIndex = totalItems === 0
    ? 0
    : pageSize === "all"
      ? 1
      : (safePage - 1) * pageSize + 1;
  const endIndex = totalItems === 0
    ? 0
    : pageSize === "all"
      ? totalItems
      : Math.min(safePage * pageSize, totalItems);

  return (
    <div className={cn("glass rounded-2xl p-4 sm:p-5", className)}>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-blue-500 mb-1">
            Pagination
          </p>
          <p className="text-sm text-[#0A0A0A]/60 dark:text-[#FAFAFA]/60">
            {totalItems === 0
              ? `No ${itemLabel} available`
              : pageSize === "all"
                ? `Showing all ${totalItems} ${itemLabel}`
                : `Showing ${startIndex}-${endIndex} of ${totalItems} ${itemLabel}`}
          </p>
        </div>

        <div className="flex flex-col gap-3 lg:items-end">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-medium text-[#0A0A0A]/50 dark:text-[#FAFAFA]/50">
              Show
            </span>
            {PAGINATION_PAGE_SIZES.map((option) => {
              const label = option === "all" ? "All" : String(option);
              const isActive = pageSize === option || (pageSize === undefined && option === DEFAULT_PAGE_SIZE);

              return (
                <button
                  key={label}
                  type="button"
                  onClick={() => onPageSizeChange(option)}
                  className={cn(
                    "px-3 py-1.5 rounded-full text-xs font-medium border transition-colors",
                    isActive
                      ? "border-blue-500/60 text-blue-500 bg-blue-500/10"
                      : "glass border-white/10 text-[#0A0A0A]/60 dark:text-[#FAFAFA]/60 hover:text-blue-500 hover:border-blue-500/30",
                  )}
                >
                  {label}
                </button>
              );
            })}
          </div>

          {pageSize !== "all" && totalPages > 1 && (
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => onPageChange(safePage - 1)}
                disabled={safePage === 1}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl glass text-xs font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                Prev
              </button>

              <span className="text-xs text-[#0A0A0A]/50 dark:text-[#FAFAFA]/50 min-w-24 text-center">
                Page {safePage} of {totalPages}
              </span>

              <button
                type="button"
                onClick={() => onPageChange(safePage + 1)}
                disabled={safePage === totalPages}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl glass text-xs font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
