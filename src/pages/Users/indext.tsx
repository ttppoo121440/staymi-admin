import { DataTablePagination } from '@/components/Table/DataTablePagination';
import useTableConfig from '@/hooks/useTableConfig';
import TableFilters from '@/components/Table/TableFilters';
import TableContent from '@/components/Table/TableContent';
import usePaginationStore from '@/store/paginationStore';
import { useGetUsers, useUpdateUserBlacklistMutation } from '@/hooks/useUsers';
import { Columns } from './Columns';
import { useMemo, useState } from 'react';
import RadioGroup from '@/components/RadioGroup';
import { blackListedOptions } from './RadioGroupConfig';
import { useSetLoading } from '@/hooks/useLoading';
import useDialogStore from '@/store/dialogStore';
import ModalDialog from '@/components/ModalDialog';
import { adminUserType } from '@/api/services/user/types';
import useFormConfig from './formConfig';

const Users = () => {
  const { openDialog } = useDialogStore();
  const { form, formFields, initialValues } = useFormConfig();
  const { currentPage, pageSize, setCurrentPage } = usePaginationStore();
  const [searchEmail, setSearchEmail] = useState('');
  const [blackListedFilter, setBlackListedFilter] = useState<string | undefined>(undefined);

  const blacklistedMap: Record<string, boolean | undefined> = {
    true: true,
    false: false,
  };
  const isBlacklisted = blackListedFilter !== undefined ? blacklistedMap[blackListedFilter] : undefined;

  const queryParams = useMemo(
    () => ({
      email: searchEmail,
      is_blacklisted: isBlacklisted,
      currentPage: currentPage + 1,
      perPage: pageSize,
    }),
    [searchEmail, isBlacklisted, currentPage, pageSize],
  );

  const { data, isPending } = useGetUsers(queryParams);
  const { mutate: updateUserBlacklist } = useUpdateUserBlacklistMutation();

  const handleChangeStatus = (id: string) => {
    updateUserBlacklist(id);
  };

  const users = data?.data.users ?? [];
  const totalPages = data?.data.pagination.totalPages ?? 0;

  const table = useTableConfig(users, () => Columns({ onChangeStatus: handleChangeStatus, openDialog }));

  const handleSearch = (newSearch: string) => {
    setSearchEmail(newSearch);
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
        selectedValue={blackListedFilter}
        onChange={(value) => setBlackListedFilter(value as string | undefined)}
        name="list-radio-blackListedFilter"
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

export default Users;
