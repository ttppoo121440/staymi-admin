import { orderApi } from '@/api/services/order';
import { useQuery } from '@tanstack/react-query';

const orderKeys = {
  all: ['order'] as const,
};

export const useGetOrderCount = () => {
  return useQuery({
    queryKey: orderKeys.all,
    queryFn: async () => {
      const response = await orderApi.getCount();
      return response;
    },
  });
};

export const useGetOrderAll = (params: { keyword?: string; currentPage?: number; perPage?: number }) => {
  return useQuery({
    queryKey: [...orderKeys.all, params],
    queryFn: async () => {
      const response = await orderApi.getAll(params);
      console.log('Order data fetched:', response);

      return response;
    },
  });
};
