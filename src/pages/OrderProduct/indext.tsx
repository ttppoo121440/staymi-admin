import { DataTablePagination } from '@/components/Table/DataTablePagination';
import useTableConfig from '@/hooks/useTableConfig';
import TableFilters from '@/components/Table/TableFilters';
import TableContent from '@/components/Table/TableContent';
import usePaginationStore from '@/store/paginationStore';
import { Columns } from './Columns';
import { useMemo, useState } from 'react';
import RadioGroup from '@/components/RadioGroup';
import { blackListedOptions } from './RadioGroupConfig';
import { useSetLoading } from '@/hooks/useLoading';
import useDialogStore from '@/store/dialogStore';
import ModalDialog from '@/components/ModalDialog';
import { adminUserType } from '@/api/services/user/types';
import useFormConfig from './formConfig';
import { useGetOrderAll } from '@/hooks/useOrder';

const OrderProduct = () => {
  const { openDialog } = useDialogStore();
  const { form, formFields, initialValues } = useFormConfig();
  const { currentPage, pageSize, setCurrentPage } = usePaginationStore();
  const [search, setSearch] = useState('');
  const [orderState, setOrderState] = useState<string | undefined>(undefined);

  const orderStateMap: Record<string, string> = {
    pending: 'pending',
    confirmed: 'confirmed',
  };
  const orderStateValue = orderState !== undefined ? orderStateMap[orderState] : undefined;

  const queryParams = useMemo(
    () => ({
      keyword: search,
      status: orderStateValue,
      currentPage: currentPage + 1,
      perPage: pageSize,
    }),
    [search, orderStateValue, currentPage, pageSize],
  );

  const { data, isPending } = useGetOrderAll(queryParams);

  const orders = data?.data.orders ?? [];
  const totalPages = data?.data.pagination.totalPages ?? 0;

  const table = useTableConfig(orders, () => Columns({ openDialog }));

  const handleSearch = (newSearch: string) => {
    setSearch(newSearch);
    setCurrentPage(0);
  };

  useSetLoading(isPending);

  return (
    <div className="w-full">
      <div className="mb-5 flex p-5">
        <h1 className="mr-auto text-5xl">會員資料</h1>
      </div>

      <TableFilters table={table} handleSearch={handleSearch} name="會員資料" filterName="信箱" />

      <RadioGroup
        selectedValue={orderState}
        onChange={(value) => setOrderState(value as string | undefined)}
        name="list-radio-orderState"
        options={blackListedOptions}
      />

      <TableContent table={table} isLoading={isPending} />
      <DataTablePagination totalPages={totalPages} />
      <ModalDialog<adminUserType>
        initialValues={initialValues}
        FormFields={formFields}
        methods={form}
        loading={isPending}
      />
    </div>
  );
};

export default OrderProduct;
