import { z } from 'zod';
import { hotelQueryParamsSchema, hotelSchema } from './schema';

export type hotelType = z.infer<typeof hotelSchema>;
export type hotelQueryParamsType = z.infer<typeof hotelQueryParamsSchema>;
