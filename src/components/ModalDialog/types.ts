import { UseMutateFunction } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { FieldValues, UseFormReturn } from 'react-hook-form';

import { FormFieldConfig } from '../FormRenderer/types';

export interface ModalDialogProps<T extends FieldValues> {
  closeDialog?: () => void;
  methods: UseFormReturn<T>;
  FormFields: FormFieldConfig<T>[];
  initialValues: T;
  createData?: UseMutateFunction<AxiosResponse<T>, AxiosError, T>;
  updateData?: UseMutateFunction<AxiosResponse<T>, AxiosError, T>;
  transformToDto?: (data: T) => T;
  loading: boolean;
}
