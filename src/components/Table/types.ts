import { Column, Table as ReactTable } from '@tanstack/react-table';

export type TableContentProps<TData> = {
  table: ReactTable<TData>;
  isLoading: boolean;
};

export interface DataTableColumnHeaderProps<TData, TValue> extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title: string;
}

export type TableFiltersProps<TData> = {
  table: ReactTable<TData>;
  handleSearch: (newSearch: string) => void;
  name: string;
  filterName: string;
};

export interface DataTablePaginationProps {
  totalPages: number;
}
