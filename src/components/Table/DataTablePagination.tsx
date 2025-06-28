import { ChevronLeftIcon, ChevronRightIcon, DoubleArrowLeftIcon, DoubleArrowRightIcon } from '@radix-ui/react-icons';

import { Button } from '@/components/ui/button';
import usePaginationStore from '@/store/paginationStore';

import { DataTablePaginationProps } from './types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

export const DataTablePagination = ({ totalPages }: DataTablePaginationProps) => {
  const { currentPage, pageSize, setPageSize, setCurrentPage } = usePaginationStore();

  const canPreviousPage = currentPage > 0;
  const canNextPage = currentPage < totalPages - 1;
  const handlePageChange = (newPage: number, newPageSize?: number) => {
    if (newPageSize && newPageSize !== pageSize) {
      setPageSize(newPageSize);
      setCurrentPage(0);
    } else {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="flex items-center justify-end px-2">
      <div className="flex items-center space-x-6 lg:space-x-8">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">每頁行數</p>
          <Select value={`${pageSize}`} onValueChange={(value) => handlePageChange(0, Number(value))}>
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 20, 30, 40, 50].map((size) => (
                <SelectItem key={size} value={`${size}`}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          第 {currentPage + 1} 到 {totalPages} 頁
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="hidden size-8 p-0 lg:flex"
            onClick={() => handlePageChange(0)}
            disabled={!canPreviousPage}
          >
            <span className="sr-only">轉到第一頁</span>
            <DoubleArrowLeftIcon className="size-4" />
          </Button>
          <Button
            variant="outline"
            className="size-8 p-0"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={!canPreviousPage}
          >
            <span className="sr-only">轉到上一頁</span>
            <ChevronLeftIcon className="size-4" />
          </Button>
          <Button
            variant="outline"
            className="size-8 p-0"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={!canNextPage}
          >
            <span className="sr-only">轉到下一頁</span>
            <ChevronRightIcon className="size-4" />
          </Button>
          <Button
            variant="outline"
            className="hidden size-8 p-0 lg:flex"
            onClick={() => handlePageChange(totalPages - 1)}
            disabled={!canNextPage}
          >
            <span className="sr-only">轉到最後一頁</span>
            <DoubleArrowRightIcon className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
