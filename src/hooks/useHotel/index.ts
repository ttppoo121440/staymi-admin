import { hotelApi } from '@/api/services/hotel';
import { hotelQueryParamsType } from '@/api/services/hotel/type';
import { useQuery } from '@tanstack/react-query';

const hotelKeys = {
  all: ['hotel'] as const,
};

export const useGetHotelCount = () => {
  return useQuery({
    queryKey: hotelKeys.all,
    queryFn: async () => {
      const response = await hotelApi.getCount();
      return response;
    },
  });
};

export const useGetHotelAll = (queryParams: hotelQueryParamsType) => {
  return useQuery({
    queryKey: [hotelKeys.all, queryParams],
    queryFn: async () => {
      const response = await hotelApi.getAll(queryParams);
      console.log('Hotel data fetched:', response);

      return response;
    },
  });
};
