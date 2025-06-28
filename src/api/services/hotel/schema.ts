import { z } from 'zod';

export const hotelSchema = z.object({
  id: z.string().uuid().optional(),
  brand_id: z.string().uuid(),
  region: z.string().max(50),
  name: z.string({ message: '請輸入店名' }).max(50),
  address: z.string({ message: '請輸入地址' }).max(100),
  phone: z.string({ message: '請輸入電話' }).max(20),
  transportation: z.string().max(255),
  hotel_policies: z.string().max(255),
  latitude: z
    .string()
    .regex(/^(-?\d+(\.\d+)?)$/, '經度必須是有效的數字字串')
    .refine((val) => parseFloat(val) >= -90 && parseFloat(val) <= 90, '緯度必須在 -90 到 90 之間'),
  longitude: z
    .string()
    .regex(/^(-?\d+(\.\d+)?)$/, '緯度必須是有效的數字字串')
    .refine((val) => parseFloat(val) >= -180 && parseFloat(val) <= 180, '經度必須在 -180 到 180 之間'),
  hotel_facilities: z.array(z.string()).max(50),
  is_active: z.boolean(),
  image_url: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
  brand_title: z.string(),
});

export const hotelQueryParamsSchema = z.object({
  name: z.string().email().optional(),
  currentPage: z.number().optional(),
  perPage: z.number().optional(),
});
