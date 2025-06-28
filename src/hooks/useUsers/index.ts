import { useMutation, UseMutationResult, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  adminUserQueryParams,
  adminUserResponseType,
  adminUserType,
  updateUserBlacklistResponseType,
} from '@/api/services/user/types';
import { AxiosError, AxiosResponse } from 'axios';
import { useToast } from '../use-toast';
import { adminUserApi } from '@/api/services/user';

const userKeys = {
  all: ['user'] as const,
  list: (params: adminUserQueryParams) => ['user', params] as const,
};

export const useGetUsers = (queryParams: adminUserQueryParams) => {
  return useQuery<adminUserResponseType, Error>({
    queryKey: userKeys.list(queryParams),
    queryFn: async () => {
      const response = await adminUserApi.getAll(queryParams);
      return response;
    },
  });
};

export const useGetUsersCount = () => {
  return useQuery({
    queryKey: userKeys.all,
    queryFn: async () => {
      const response = await adminUserApi.getCount();
      return response;
    },
  });
};

export const useUpdateUserBlacklistMutation = (): UseMutationResult<
  AxiosResponse<updateUserBlacklistResponseType>,
  AxiosError<AxiosError>,
  adminUserType['id']
> => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  return useMutation<AxiosResponse<updateUserBlacklistResponseType>, AxiosError<AxiosError>, adminUserType['id']>({
    mutationFn: async (id: string) => await adminUserApi.updateBlacklist(id),
    onSuccess: (result) => {
      const { message } = result.data;
      toast({
        description: message,
      });
      queryClient.invalidateQueries({ queryKey: userKeys.all });
    },
    onError: (error: AxiosError<AxiosError>) => {
      toast({
        variant: 'destructive',
        description: error.response?.data.message || '修正失敗，請稍後再試。',
      });
    },
  });
};
