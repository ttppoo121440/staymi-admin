import { FormLogin, FormLoginResponseType } from '@/api/services/signFlow/types';
import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useToast } from '../use-toast';
import { signFlowApi } from '@/api/services/signFlow';
import LocalStorageService from '@/utils/LocalStorageService';
import { useNavigate } from '@tanstack/react-router';

const localStorageService = LocalStorageService.getInstance();

export const useLoginMutation = (): UseMutationResult<FormLoginResponseType, AxiosError<AxiosError>, FormLogin> => {
  const { toast } = useToast();
  const navigate = useNavigate();
  return useMutation<FormLoginResponseType, AxiosError<AxiosError>, FormLogin>({
    mutationFn: async (data: FormLogin) => await signFlowApi.login(data),
    onSuccess: async (data) => {
      toast({
        description: '登入成功!',
      });
      console.log('Login successful:', data);

      localStorageService.setItem('staymi-token', data.data.token);
      localStorageService.setItem('user', JSON.stringify(data.data.user));
      navigate({ to: '/' });
    },
    onError: (error: AxiosError<AxiosError>) => {
      toast({
        variant: 'destructive',
        description: error.response?.data.message || '登入失敗!',
      });
      console.error('Error creating News:', error.response?.data.message);
    },
  });
};
