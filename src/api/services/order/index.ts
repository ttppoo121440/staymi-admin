import axiosClient from '@/api/axiosClient';
import { OrderRoomProductKeywordType, OrderRoomProductWithItemsListType } from './schema';

export const orderApi = {
  getBaseUrl: '/admin/order',
  getCount: async () => {
    const response = await axiosClient.get<{ data: { count: number } }>(`${orderApi.getBaseUrl}/count`);
    return response.data;
  },
  getAll: async (params: OrderRoomProductKeywordType) => {
    const response = await axiosClient.get<OrderRoomProductWithItemsListType>(`${orderApi.getBaseUrl}/all`, {
      params,
    });
    return response.data;
  },
};
