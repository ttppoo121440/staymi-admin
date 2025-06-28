import { paymentApi } from '@/api/services/payment';
import { useQuery } from '@tanstack/react-query';

const paymentKeys = {
  all: ['payment'] as const,
};

export const useGetRevenue = () => {
  return useQuery({
    queryKey: paymentKeys.all,
    queryFn: async () => {
      const response = await paymentApi.getRevenue();
      console.log('response', response);

      return response;
    },
  });
};

export const useGetRecentPayments = () => {
  return useQuery({
    queryKey: [...paymentKeys.all, 'recent'],
    queryFn: async () => {
      const response = await paymentApi.getRecentPayments();
      console.log('response', response);
      return response;
    },
  });
};
