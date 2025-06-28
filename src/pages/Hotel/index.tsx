import { DataTablePagination } from '@/components/Table/DataTablePagination';
import useTableConfig from '@/hooks/useTableConfig';
import TableFilters from '@/components/Table/TableFilters';
import TableContent from '@/components/Table/TableContent';
import usePaginationStore from '@/store/paginationStore';
import { useMemo, useState } from 'react';
import { useSetLoading } from '@/hooks/useLoading';
import { Columns } from './Columns';
import { useGetHotelAll } from '@/hooks/useHotel';
import useDialogStore from '@/store/dialogStore';
import ModalDialog from '@/components/ModalDialog';
import { hotelType } from '@/api/services/hotel/type';
import useFormConfig from './formConfig';
const Hotel = () => {
  const { openDialog } = useDialogStore();
  const { form, formFields, initialValues } = useFormConfig();
  const { currentPage, pageSize, setCurrentPage } = usePaginationStore();
  const [searchName, setSearchName] = useState('');

  const queryParams = useMemo(
    () => ({
      name: searchName,
      currentPage: currentPage + 1,
      perPage: pageSize,
    }),
    [searchName, currentPage, pageSize],
  );

  const { data, isPending } = useGetHotelAll(queryParams);

  const hotels = data?.data.hotels ?? [];
  const totalPages = data?.data.pagination.totalPages ?? 0;

  const table = useTableConfig(hotels, () => Columns({ openDialog }));

  const handleSearch = (newSearch: string) => {
    setSearchName(newSearch);
    setCurrentPage(0);
  };

  useSetLoading(isPending);

  return (
    <div className="w-full">
      <div className="mb-5 flex p-5">
        <h1 className="mr-auto text-5xl">商家資料</h1>
      </div>

      <TableFilters table={table} handleSearch={handleSearch} name="商家資料" filterName="Hotel名稱" />

      <TableContent table={table} isLoading={isPending} />
      <DataTablePagination totalPages={totalPages} />
      <ModalDialog<hotelType>
        initialValues={initialValues}
        FormFields={formFields}
        methods={form}
        loading={isPending}
      />
    </div>
  );
};

export default Hotel;
