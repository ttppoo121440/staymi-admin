import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { FormFieldConfig } from '@/components/FormRenderer/types';
import { adminUserSchema } from '@/api/services/user/schema';
import { adminUserType } from '@/api/services/user/types';

const initialValues: z.infer<typeof adminUserSchema> = {
  id: '',
  name: '',
  email: '',
  phone: '',
  birthday: '',
  role: 'consumer',
  is_blacklisted: false,
  gender: undefined,
  provider: undefined,
  created_at: '',
  updated_at: '',
};

const useFormConfig = (defaultValues?: adminUserType) => {
  const form = useForm<adminUserType>({
    resolver: zodResolver(adminUserSchema),
    defaultValues: defaultValues ?? initialValues,
  });

  const formFields: FormFieldConfig<adminUserType>[] = [
    {
      key: 'name',
      name: 'name',
      type: 'text',
      label: '姓名',
    },
    {
      key: 'email',
      name: 'email',
      type: 'email',
      label: '電子郵件',
    },
    {
      key: 'phone',
      name: 'phone',
      type: 'text',
      label: '電話',
    },
    {
      key: 'birthday',
      name: 'birthday',
      type: 'date',
      label: '生日',
    },
    {
      key: 'gender',
      name: 'gender',
      type: 'text',
      label: '性別',
    },
    {
      key: 'role',
      name: 'role',
      type: 'text',
      label: '角色',
    },
    {
      key: 'provider',
      name: 'provider',
      type: 'text',
      label: 'Provider',
    },
  ];

  return {
    form,
    formFields,
    initialValues,
  };
};

export default useFormConfig;
