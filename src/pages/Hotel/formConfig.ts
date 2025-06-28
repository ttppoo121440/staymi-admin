import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { FormFieldConfig } from '@/components/FormRenderer/types';
import { hotelSchema } from '@/api/services/hotel/schema';
import { hotelType } from '@/api/services/hotel/type';
import { hotelFacilities } from '@/components/FormRenderer/FormCheckboxGroup/hotelFacilitiesConfig';

const initialValues: z.infer<typeof hotelSchema> = {
  id: '',
  name: '',
  phone: '',
  created_at: '',
  updated_at: '',
  brand_id: '',
  region: '',
  address: '',
  transportation: '',
  hotel_policies: '',
  latitude: '',
  longitude: '',
  hotel_facilities: [],
  is_active: false,
  image_url: '',
  brand_title: '',
};

const useFormConfig = (defaultValues?: hotelType) => {
  const form = useForm<hotelType>({
    resolver: zodResolver(hotelSchema),
    defaultValues: defaultValues ?? initialValues,
  });

  const formFields: FormFieldConfig<hotelType>[] = [
    {
      key: 'name',
      name: 'name',
      type: 'text',
      label: '飯店名稱',
    },
    {
      key: 'phone',
      name: 'phone',
      type: 'text',
      label: '電話',
    },
    {
      key: 'brand_title',
      name: 'brand_title',
      type: 'text',
      label: '品牌',
    },
    {
      key: 'region',
      name: 'region',
      type: 'text',
      label: '地區',
    },
    {
      key: 'address',
      name: 'address',
      type: 'text',
      label: '地址',
    },
    {
      key: 'transportation',
      name: 'transportation',
      type: 'editor',
      label: '交通方式',
    },
    {
      key: 'hotel_policies',
      name: 'hotel_policies',
      type: 'editor',
      label: '酒店政策',
    },
    {
      key: 'latitude',
      name: 'latitude',
      type: 'text',
      label: '緯度',
    },
    {
      key: 'longitude',
      name: 'longitude',
      type: 'text',
      label: '經度',
    },
    {
      key: 'hotel_facilities',
      name: 'hotel_facilities',
      type: 'checkboxGroup',
      label: '酒店設施',
      options: hotelFacilities.map((facility) => ({
        value: facility.value,
        label: facility.value,
        icon: facility.icon,
      })),
    },
    {
      key: 'image_url',
      name: 'image_url',
      type: 'text',
      label: '圖片URL',
    },
  ];

  return {
    form,
    formFields,
    initialValues,
  };
};

export default useFormConfig;
