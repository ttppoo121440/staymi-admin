'use client';

import { useFormContext, FieldValues, Path } from 'react-hook-form';

import { Checkbox } from '@/components/ui/checkbox';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { cn } from '@/lib/utils';
import { CheckboxFieldConfig } from '../types';

const FormCheckboxGroup = <T extends FieldValues>({ label, name, options = [], className }: CheckboxFieldConfig<T>) => {
  const { control } = useFormContext<T>();

  return (
    <div className="my-5">
      <FormField
        control={control}
        name={name as Path<T>}
        render={({ field }) => {
          const selectedValues: string[] = Array.isArray(field.value) ? field.value : [];

          const handleChange = (value: string) => {
            if (selectedValues.includes(value)) {
              field.onChange(selectedValues.filter((v) => v !== value));
            } else {
              field.onChange([...selectedValues, value]);
            }
          };

          return (
            <FormItem className={className}>
              {label && <FormLabel className="mb-2 block text-base font-medium">{label}</FormLabel>}
              <div className="flex flex-wrap gap-3">
                {options.map((option) => {
                  const isChecked = selectedValues.includes(option.value);
                  return (
                    <FormControl key={option.value}>
                      <label
                        htmlFor={`${String(name)}-${option.value}`}
                        className={cn(
                          'flex cursor-pointer items-center justify-center rounded-md border px-4 py-2 text-sm',
                          isChecked
                            ? 'border-primary bg-primary/10 text-primary'
                            : 'border-muted text-muted-foreground hover:bg-muted',
                        )}
                      >
                        <Checkbox
                          id={`${String(name)}-${option.value}`}
                          checked={isChecked}
                          onCheckedChange={() => handleChange(option.value)}
                          className="sr-only"
                        />
                        <span>{option.label}</span>
                      </label>
                    </FormControl>
                  );
                })}
              </div>
              <FormMessage />
            </FormItem>
          );
        }}
      />
    </div>
  );
};

export default FormCheckboxGroup;
