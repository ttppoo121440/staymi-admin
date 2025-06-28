import { ColumnDef } from '@tanstack/react-table';

import 'react-medium-image-zoom/dist/styles.css';
import { hotelType } from '@/api/services/hotel/type';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';
import { z } from 'zod';
import { hotelSchema } from '@/api/services/hotel/schema';

type ColumnsProps = {
  openDialog: (type: 'info', item: z.infer<typeof hotelSchema>) => void; // <-- 使用轉換後型別
};
export const Columns = ({ openDialog }: ColumnsProps): ColumnDef<hotelType>[] => [
  {
    accessorKey: 'brand_title',
    header: '飯店品牌',
  },
  {
    accessorKey: 'name',
    header: '飯店名稱',
  },
  {
    accessorKey: 'region',
    header: '地區',
  },
  {
    accessorKey: 'address',
    header: '地址',
  },
  {
    accessorKey: 'phone',
    header: '電話',
  },
  {
    accessorKey: '操作',
    header: '操作',
    cell: ({ row }) => {
      const item = row.original;
      return (
        <Button className="mr-3 text-white" variant="outline" onClick={() => openDialog('info', item)}>
          <Icons.info />
        </Button>
      );
    },
  },
];
