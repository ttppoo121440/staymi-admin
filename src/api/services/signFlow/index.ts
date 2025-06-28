import axiosClient from '@/api/axiosClient';

import { FormLogin, FormLoginResponseType } from './types';

export const signFlowApi = {
  login: async (user: FormLogin): Promise<FormLoginResponseType> => {
    const response = await axiosClient.post<FormLoginResponseType>(`users/login`, user);
    return response.data;
  },
};
