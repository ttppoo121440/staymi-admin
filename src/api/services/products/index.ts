import axiosClient from '@/api/axiosClient';

export const productsApi = {
  getBaseUrl: '/admin/products',
  getTotal: async () => {
    const response = await axiosClient.get<{
      data: { total: number; top5: [{ name: string; totalQuantitySold: number }] };
    }>(`${productsApi.getBaseUrl}/total`);
    return response.data;
  },
};
