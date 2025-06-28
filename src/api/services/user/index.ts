import axiosClient from '@/api/axiosClient';
import { adminUserQueryParams, adminUserResponseType } from './types';

export const adminUserApi = {
  getBaseUrl: '/admin/users',

  getAll: async (queryParams: adminUserQueryParams) => {
    const response = await axiosClient.get<adminUserResponseType>(adminUserApi.getBaseUrl, {
      params: queryParams,
    });
    return response.data;
  },

  updateBlacklist: async (id: string) => {
    const response = await axiosClient.patch(`${adminUserApi.getBaseUrl}/${id}/toggleUserBlacklist`);
    return response.data;
  },

  getCount: async () => {
    const response = await axiosClient.get<{ data: { count: number } }>(`${adminUserApi.getBaseUrl}/count`);
    return response.data;
  },
};
