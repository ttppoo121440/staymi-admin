import { ColumnDef } from '@tanstack/react-table';
import 'react-medium-image-zoom/dist/styles.css';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';
import { z } from 'zod';
import { OrderRoomProductItemWithProductType, orderRoomProductWithItemsSchema } from '@/api/services/order/schema';

type ColumnsProps = {
  openDialog: (type: 'info', item: z.infer<typeof orderRoomProductWithItemsSchema>) => void;
};

export const Columns = ({ openDialog }: ColumnsProps): ColumnDef<OrderRoomProductItemWithProductType>[] => [
  {
    accessorKey: 'hotel_name',
    header: '飯店名稱',
  },
  {
    accessorKey: 'room_name',
    header: '房型名稱',
  },
  {
    accessorKey: 'payment_name',
    header: '付款人姓名',
  },
  {
    accessorKey: 'payment_phone',
    header: '付款人電話',
  },
  {
    accessorKey: 'payment_email',
    header: '付款人電子郵件',
  },
  {
    accessorKey: 'contact_name',
    header: '聯絡人姓名',
  },
  {
    accessorKey: 'contact_phone',
    header: '聯絡人電話',
  },
  {
    accessorKey: 'contact_email',
    header: '聯絡人電子郵件',
  },
  {
    accessorKey: 'check_in_date',
    header: '入住日期',
  },
  {
    accessorKey: 'check_out_date',
    header: '退房日期',
  },
  {
    accessorKey: 'total_price',
    header: '總金額',
    cell: ({ row }) => {
      const item = row.original;
      return `NT$ ${item.total_price.toLocaleString('zh-TW')}`;
    },
  },
  {
    accessorKey: 'status',
    header: '訂單狀態',
    cell: ({ row }) => {
      const item = row.original;
      return <span>{item.status}</span>;
    },
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
