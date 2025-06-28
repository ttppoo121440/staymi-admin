import axiosClient from '@/api/axiosClient';
import { RecentPaymentType } from './types';

export const paymentApi = {
  getBaseUrl: '/admin/payment',
  getRevenue: async () => {
    const response = await axiosClient.get<{ data: { total: number } }>(`${paymentApi.getBaseUrl}/revenue`);
    return response.data;
  },
  getRecentPayments: async () => {
    const response = await axiosClient.get<{ data: { recent: RecentPaymentType[] } }>(
      `${paymentApi.getBaseUrl}/recent`,
    );
    return response.data;
  },
};
