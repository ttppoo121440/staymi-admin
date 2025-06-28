import { z } from 'zod';
import { adminUserType } from './types';

export const adminUserSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1).max(50),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  birthday: z.string(),
  gender: z.enum(['f', 'm'], { message: '請選擇性別' }).nullable().optional(),
  avatar: z.string().nullable().optional(),
  provider: z.string().optional(),
  role: z.enum(['consumer', 'store', 'admin'], { message: '無效的角色值' }),
  is_blacklisted: z.boolean(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const adminUserQueryParamsSchema = z.object({
  email: z.string().email().optional(),
  is_blacklisted: z.union([z.boolean(), z.undefined()]).optional(),
  currentPage: z.number().optional(),
  perPage: z.number().optional(),
});

export const adminUserResponseSchema = z.object({
  success: z.boolean(),
  data: z.object({
    users: z.array(adminUserSchema),
    pagination: z.object({
      currentPage: z.number(),
      perPage: z.number(),
      totalItems: z.number(),
      totalPages: z.number(),
    }),
  }),
  message: z.string(),
});

export const updateUserBlacklistResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
});

export const adminUserFormSchema = adminUserSchema.extend({
  gender: z.enum(['男生', '女生']).optional(),
  provider: z.string().optional(),
  role: z.enum(['消費者', '店家', '管理員'], { message: '無效的角色值' }),
});

export const mapUserToFormDisplay = (user: adminUserType): z.infer<typeof adminUserFormSchema> => ({
  ...user,
  gender: user.gender === 'm' ? '男生' : user.gender === 'f' ? '女生' : undefined,
  provider: user.provider || '平台',
  role: user.role === 'consumer' ? '消費者' : user.role === 'store' ? '店家' : '管理員',
});
