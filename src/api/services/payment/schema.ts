import { z } from 'zod';

export const RecentPaymentSchema = z.object({
  id: z.string().uuid(),
  order_type: z.enum(['room', 'subscription']),
  amount: z.number().int(),
  name: z.string().max(100),
  email: z.string().email(),
  avatar: z.string().url().optional(),
});
