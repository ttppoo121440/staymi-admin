import { useEffect, useRef, useState } from 'react';
import { FieldValues, Path, useFormContext, Controller } from 'react-hook-form';

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';

import { TextFieldConfig } from './types';

const FormInput = <T extends FieldValues>({
  label,
  name,
  placeholder,
  type,
  className,
  required,
  disabled,
  onFileUpload,
}: TextFieldConfig<T>) => {
  const { control, setValue, watch } = useFormContext<T>();
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const previousUrlRef = useRef<string | null>(null);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setValue(name as Path<T>, file as T[Path<T>]);
      const newPreviewUrl = URL.createObjectURL(file);
      setPreviewUrl(newPreviewUrl);

      if (onFileUpload) {
        try {
          await onFileUpload(file);
        } catch (error) {
          console.log(error);
        }
      }
    }
  };

  const fieldValue = watch(name as Path<T>);

  useEffect(() => {
    let newPreviewUrl: string | null = null;

    if (type === 'file' && typeof fieldValue === 'string') {
      newPreviewUrl = fieldValue;
      setPreviewUrl(newPreviewUrl);
    }

    if (type === 'text' && typeof fieldValue === 'string' && fieldValue.match(/\.(jpeg|jpg|gif|png|webp)$/i)) {
      newPreviewUrl = fieldValue;
      setPreviewUrl(newPreviewUrl);
    }

    return () => {
      if (previousUrlRef.current?.startsWith('blob:')) {
        URL.revokeObjectURL(previousUrlRef.current);
      }
      previousUrlRef.current = newPreviewUrl;
    };
  }, [fieldValue, type]);

  return (
    <div className={`my-5`}>
      <FormField
        control={control}
        name={name as Path<T>}
        render={({ field: { ref } }) => (
          <FormItem>
            {required && <span className="text-red-500">*</span>}
            <FormLabel htmlFor={name as Path<T>}>{label}</FormLabel>
            <FormControl>
              {type === 'file' ? (
                <Input type="file" placeholder={placeholder} onChange={handleFileChange} ref={ref} accept="image/*" />
              ) : (
                <Controller
                  name={name as Path<T>}
                  control={control}
                  render={({ field }) => (
                    <Input
                      id={name as Path<T>}
                      className={className}
                      placeholder={placeholder}
                      {...field}
                      type={type}
                      value={field.value ?? ''}
                      disabled={disabled}
                      autoComplete={type === 'password' ? 'current-password' : 'on'}
                      {...(type === 'tel' && {
                        inputMode: 'numeric',
                        pattern: '[0-9]*',
                        onChange: (e) => {
                          const value = e.target.value;
                          if (/^\d*$/.test(value)) {
                            const numericValue = value === '' ? '' : Number(value);
                            field.onChange(numericValue);
                          }
                        },
                      })}
                    />
                  )}
                />
              )}
            </FormControl>
            <FormMessage />
            {previewUrl && (
              <div className="flex justify-center">
                <div className="relative mt-5 flex size-full justify-center overflow-hidden rounded-lg border border-gray-300">
                  <img src={previewUrl} alt="Preview" className="object-cover" />
                </div>
              </div>
            )}
          </FormItem>
        )}
      />
    </div>
  );
};

export default FormInput;
