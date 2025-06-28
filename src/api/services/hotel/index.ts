import axiosClient from '@/api/axiosClient';
import { hotelQueryParamsType } from './type';

export const hotelApi = {
  getBaseUrl: '/admin/hotel',
  getAll: async (queryParams: hotelQueryParamsType) => {
    const response = await axiosClient.get(`${hotelApi.getBaseUrl}`, {
      params: queryParams,
    });
    return response.data;
  },
  getCount: async () => {
    const response = await axiosClient.get<{ data: { count: number } }>(`${hotelApi.getBaseUrl}/count`);
    return response.data;
  },
};
