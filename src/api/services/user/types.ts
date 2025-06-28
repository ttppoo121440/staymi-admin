import { z } from 'zod';
import {
  adminUserQueryParamsSchema,
  adminUserResponseSchema,
  adminUserSchema,
  updateUserBlacklistResponseSchema,
} from './schema';

export type adminUserType = z.infer<typeof adminUserSchema>;
export type adminUserResponseType = z.infer<typeof adminUserResponseSchema>;
export type adminUserQueryParams = z.infer<typeof adminUserQueryParamsSchema>;
export type updateUserBlacklistResponseType = z.infer<typeof updateUserBlacklistResponseSchema>;
