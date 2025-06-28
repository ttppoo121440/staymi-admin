import { productsApi } from '@/api/services/products';
import { useQuery } from '@tanstack/react-query';

const productKeys = {
  all: ['products'] as const,
};

export const useGetProductTotal = () => {
  return useQuery({
    queryKey: productKeys.all,
    queryFn: async () => {
      const response = await productsApi.getTotal();
      console.log('response', response);

      return response;
    },
  });
};
