import { z } from 'zod';
import { FormLoginResponseSchema, FormLoginSchema } from './signFlow.schema';

export type FormLogin = z.infer<typeof FormLoginSchema>;
export type FormLoginResponseType = z.infer<typeof FormLoginResponseSchema>;
