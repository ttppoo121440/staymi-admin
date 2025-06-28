import { ControllerRenderProps, FieldValues, Path, useFormContext } from 'react-hook-form';

import { cn } from '@/lib/utils';

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

import { SelectFieldConfig } from './types';

const FormSelect = <T extends FieldValues>({
  label,
  name,
  options,
  placeholder,
  disabled,
  onChange,
}: SelectFieldConfig<T>) => {
  const { control } = useFormContext<T>();

  const handleChange = (value: string, field: ControllerRenderProps<T, Path<T>>) => {
    field.onChange(value);
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <div className={cn('my-5')}>
      <FormField
        control={control}
        name={name as Path<T>}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{label}</FormLabel>
            <Select
              onValueChange={(value: string) => handleChange(value, field)}
              value={field.value}
              defaultValue={field.value}
              disabled={disabled}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder={placeholder} />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {options?.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default FormSelect;
