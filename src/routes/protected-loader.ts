import LocalStorageService from '@/utils/LocalStorageService';
import { redirect } from '@tanstack/react-router';

const localStorageService = LocalStorageService.getInstance();
export const authLoader = async () => {
  const token = localStorageService.getItem('staymi-token');
  if (!token) {
    throw redirect({ to: '/login' });
  }
  return null;
};
