import { z } from 'zod';

export const FormLoginSchema = z.object({
  email: z.string().email({
    message: '請輸入有效的電子郵件地址',
  }),
  password: z.string().nonempty('密碼不可為空'),
});

export const FormLoginResponseSchema = z.object({
  data: z.object({
    token: z.string(),
    user: z.object({
      avatar: z.string(),
      name: z.string(),
    }),
  }),
});
