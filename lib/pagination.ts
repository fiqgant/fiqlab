export const PAGINATION_PAGE_SIZES = [6, 12, "all"] as const;

export type PageSize = (typeof PAGINATION_PAGE_SIZES)[number];

export const DEFAULT_PAGE_SIZE: PageSize = PAGINATION_PAGE_SIZES[0];

export function getTotalPages(totalItems: number, pageSize: PageSize): number {
  if (totalItems === 0 || pageSize === "all") {
    return 1;
  }

  return Math.ceil(totalItems / pageSize);
}

export function slicePageItems<T>(items: T[], currentPage: number, pageSize: PageSize): T[] {
  if (pageSize === "all") {
    return items;
  }

  const safePage = Math.max(currentPage, 1);
  const startIndex = (safePage - 1) * pageSize;

  return items.slice(startIndex, startIndex + pageSize);
}
