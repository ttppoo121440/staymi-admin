import { z } from 'zod';

export const orderRoomProductItemWithProductSchema = z.object({
  id: z.string().uuid(),
  order_id: z.string().uuid(),
  product_plans_id: z.string().uuid(),
  quantity: z.number(),
  unit_price: z.number(),
  products_name: z.string(),
  products_imageUrl: z.string(),
  products_description: z.string(),
  products_features: z.string(),
  product_plans_price: z.number(),
  product_plans_start_time: z.string(),
  product_plans_end_time: z.string(),
});

export const orderRoomProductWithItemsSchema = z.object({
  id: z.string().uuid(),
  user_id: z.string().uuid(),
  hotel_id: z.string().uuid(),
  room_plans_id: z.string().uuid(),
  check_in_date: z.string(),
  check_out_date: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
  status: z.string(),
  payment_name: z.string(),
  payment_phone: z.string(),
  payment_email: z.string(),
  contact_name: z.string(),
  contact_phone: z.string(),
  contact_email: z.string(),
  total_price: z.number(),
  order_item: orderRoomProductItemWithProductSchema.nullable().optional(),
});

export const orderRoomProductKeywordSchema = z.object({
  keyword: z.string().optional(),
  currentPage: z.number().optional(),
  perPage: z.number().optional(),
});

export const orderRoomProductWithItemsList = z.object({
  success: z.boolean(),
  data: z.object({
    orders: z.array(orderRoomProductWithItemsSchema),
    pagination: z.object({
      currentPage: z.number(),
      perPage: z.number(),
      totalItems: z.number(),
      totalPages: z.number(),
    }),
  }),
  message: z.string(),
});

export type OrderRoomProductWithItemsListType = z.infer<typeof orderRoomProductWithItemsList>;
export type OrderRoomProductItemWithProductType = z.infer<typeof orderRoomProductWithItemsSchema>;
export type OrderRoomProductKeywordType = z.infer<typeof orderRoomProductKeywordSchema>;
