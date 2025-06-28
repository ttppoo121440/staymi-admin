import { FormProvider } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

import { FormLogin } from '@/api/services/signFlow/types';
import useFormConfig from './formConfig';
import FormRenderer from '@/components/FormRenderer';
import { useLoginMutation } from '@/hooks/useLogin';
import { useSetLoading } from '@/hooks/useLoading';

const Login = () => {
  const { form, loginFormFields } = useFormConfig();
  const { mutate: login, isPending } = useLoginMutation();

  const handleSubmit = (data: FormLogin) => {
    login(data);
    console.log('Login data:', data);
  };

  useSetLoading(isPending);

  return (
    <div className="container mx-auto flex h-screen items-center justify-center">
      <div className={cn('flex w-96 flex-col gap-6')}>
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">登入</CardTitle>
            <CardDescription>在下面輸入您的電子郵件以登入您的帳戶</CardDescription>
          </CardHeader>
          <CardContent>
            <FormProvider {...form}>
              <form onSubmit={form.handleSubmit(handleSubmit)} noValidate>
                <FormRenderer<FormLogin> FormFields={loginFormFields} methods={form} />
                <Button type="submit">登入</Button>
              </form>
            </FormProvider>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
