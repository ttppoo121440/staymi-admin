import { ColumnDef } from '@tanstack/react-table';
import 'react-medium-image-zoom/dist/styles.css';
import { adminUserType } from '@/api/services/user/types';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';
import { mapUserToFormDisplay } from '@/api/services/user/schema'; // <- 載入轉換函式
import { z } from 'zod';
import { adminUserFormSchema } from '@/api/services/user/schema'; // <- 用來推斷轉換後型別

type ColumnsProps = {
  onChangeStatus: (id: string, newStatus: boolean) => void;
  openDialog: (type: 'info', item: z.infer<typeof adminUserFormSchema>) => void; // <-- 使用轉換後型別
};

export const Columns = ({ onChangeStatus, openDialog }: ColumnsProps): ColumnDef<adminUserType>[] => [
  {
    accessorKey: 'email',
    header: '電子郵件',
  },
  {
    accessorKey: 'name',
    header: '姓名',
  },
  {
    accessorKey: 'phone',
    header: '電話',
  },
  {
    accessorKey: 'birthday',
    header: '生日',
  },
  {
    accessorKey: 'gender',
    header: '性別',
    cell: ({ row }) => {
      const gender = row.getValue('gender');
      return <div className="lowercase">{gender === 'f' ? '女生' : gender === 'm' ? '男生' : '-'}</div>;
    },
  },
  {
    accessorKey: 'role',
    header: '角色',
    cell: ({ row }) => {
      const role = row.getValue('role');
      const roleText = role === 'consumer' ? '消費者' : role === 'store' ? '店家' : role === 'admin' ? '管理員' : '-';
      return <div>{roleText}</div>;
    },
  },
  {
    accessorKey: 'provider',
    header: 'provider',
    cell: ({ row }) => {
      const provider = row.getValue('provider');
      return <div className="lowercase">{provider === '' || provider === undefined ? '平台' : String(provider)}</div>;
    },
  },
  {
    accessorKey: 'is_blacklisted',
    header: '黑名單',
    cell: ({ row }) => {
      const is_blacklisted = row.getValue('is_blacklisted');
      const userId = row.original.id;
      const handleToggle = (newValue: boolean) => {
        onChangeStatus(userId, newValue);
      };
      return <Switch checked={is_blacklisted as boolean} onCheckedChange={handleToggle} />;
    },
  },
  {
    accessorKey: '操作',
    header: '操作',
    cell: ({ row }) => {
      const item = mapUserToFormDisplay(row.original); // <-- 轉換格式
      return (
        <Button className="mr-3 text-white" variant="outline" onClick={() => openDialog('info', item)}>
          <Icons.info />
        </Button>
      );
    },
  },
];
