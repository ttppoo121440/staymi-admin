import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { FormLogin } from '@/api/services/signFlow/types';
import { FormLoginSchema } from '@/api/services/signFlow/signFlow.schema';
import { FormFieldConfig } from '@/components/FormRenderer/types';

const initialValues: z.infer<typeof FormLoginSchema> = {
  email: '',
  password: '',
};

const loginFormFields: FormFieldConfig<FormLogin>[] = [
  {
    label: '信箱',
    name: 'email',
    type: 'email',
    required: true,
    placeholder: 'test@gmail.com',
    key: 'email',
  },
  {
    label: '密碼',
    name: 'password',
    type: 'password',
    required: true,
    placeholder: '請輸入您的密碼',
    key: 'password',
  },
];

const useFormConfig = () => {
  const form = useForm<FormLogin>({
    resolver: zodResolver(FormLoginSchema),
    defaultValues: initialValues,
  });

  return {
    form,
    initialValues,
    loginFormFields,
  };
};

export default useFormConfig;
