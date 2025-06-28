export interface PaginationStore {
  currentPage: number;
  pageSize: number;
  apiPage: () => number;
  setCurrentPage: (page: number) => void;
  setPageSize: (size: number) => void;
}
