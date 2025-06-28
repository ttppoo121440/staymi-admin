import { create } from 'zustand';

import { PaginationStore } from './types';

const usePaginationStore = create<PaginationStore>((set, get) => ({
  currentPage: 0,
  pageSize: 10,
  apiPage: () => get().currentPage + 1,
  setCurrentPage: (page: number) => set({ currentPage: page }),
  setPageSize: (size: number) => set({ pageSize: size, currentPage: 0 }),
}));

export default usePaginationStore;
