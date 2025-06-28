import { z } from 'zod';
import { RecentPaymentSchema } from './schema';

export type RecentPaymentType = z.infer<typeof RecentPaymentSchema>;
