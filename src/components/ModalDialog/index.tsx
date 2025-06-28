import { DialogClose } from '@radix-ui/react-dialog';
import { useEffect } from 'react';
import { FormProvider } from 'react-hook-form';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import useDialogStore from '@/store/dialogStore';

import FormRenderer from '../FormRenderer';
import { Button } from '../ui/button';

import { ModalDialogProps } from './types';

const ModalDialog = <T extends object>({
  initialValues,
  methods,
  FormFields,
  createData,
  updateData,
  loading,
}: ModalDialogProps<T>) => {
  const { isOpen, dialogType, closeDialog, currentItem } = useDialogStore();

  const handleCancel = () => {
    methods.reset();
    if (closeDialog) closeDialog();
  };

  const onSubmit = async (data: T) => {
    console.log('data:', data);

    try {
      if (dialogType === 'edit') {
        if (updateData) {
          await updateData(data);
        }
      } else {
        if (createData) {
          await createData(data);
        }
      }
      handleCancel();
    } catch (error) {
      console.error('提交失敗：', error);
    }
  };

  useEffect(() => {
    if (isOpen) {
      methods.reset({
        ...initialValues,
        ...(dialogType === 'edit' || dialogType === 'info' ? (currentItem as Partial<T>) : {}),
      });
    }
  }, [currentItem, isOpen, dialogType, methods, initialValues]);

  return (
    <Dialog open={isOpen} onOpenChange={handleCancel}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {dialogType === 'edit' ? '修改資料' : dialogType === 'info' ? '查看資料' : '新增資料'}
          </DialogTitle>
          <DialogDescription>請填寫以下表單以提交資料。</DialogDescription>
        </DialogHeader>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
            <FormRenderer<T> FormFields={FormFields} methods={methods} />
            <DialogFooter className="mt-10">
              <DialogClose asChild>
                <Button type="button" variant="outline" className="mr-auto" onClick={handleCancel} disabled={loading}>
                  取消
                </Button>
              </DialogClose>
              {dialogType && dialogType !== 'info' && (
                <Button type="submit" disabled={loading}>
                  {dialogType === 'edit' ? '修改' : '新增'}
                </Button>
              )}
            </DialogFooter>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};

export default ModalDialog;
