import { X } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { FieldValues, useFieldArray, useFormContext, ArrayPath, Path, PathValue } from 'react-hook-form';

import { Button } from '../ui/button';
import { FormLabel } from '../ui/form';
import { Input } from '../ui/input';

const FormImagesInput = <T extends FieldValues>({
  label,
  name,
  maxCount = 5,
  onFileUpload,
}: {
  label: string;
  name: ArrayPath<T>;
  maxCount?: number;
  onFileUpload?: (file: File) => void;
}) => {
  const { control, watch, setValue } = useFormContext<T>();
  const { fields, append, remove } = useFieldArray({
    control,
    name,
  });

  const [previews, setPreviews] = useState<string[]>([]);

  const fieldValues = watch(name as Path<T>);

  const handleFileInputAdd = () => {
    if (fields.length < maxCount) {
      append('' as T[typeof name][string]);
    }
  };

  const handleFileChange = (index: number) => async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const previewUrl = URL.createObjectURL(file);

      const newPreviews = [...previews];
      newPreviews[index] = previewUrl;
      setPreviews(newPreviews);

      const updatedFieldValues = [...(fieldValues || [])] as (typeof fieldValues)[];
      updatedFieldValues[index] = file as (typeof fieldValues)[number];
      setValue(name as Path<T>, updatedFieldValues as unknown as PathValue<T, Path<T>>);

      if (onFileUpload) {
        try {
          await onFileUpload(file);
        } catch (error) {
          console.log(error);
        }
      }
    }
  };

  const handleRemove = (index: number) => {
    remove(index);

    const newPreviews = [...previews];
    newPreviews.splice(index, 1);
    setPreviews(newPreviews);
  };

  useEffect(() => {
    const urls = (fieldValues || []).map((value) =>
      typeof value === 'string' ? value : URL.createObjectURL(value as File),
    );
    setPreviews(urls);

    return () => {
      urls.forEach((url) => {
        if (url.startsWith('blob:')) {
          URL.revokeObjectURL(url);
        }
      });
    };
  }, [fieldValues]);

  return (
    <div>
      <FormLabel>{label}</FormLabel>
      <div>
        {fields.map((field, index) => (
          <div key={field.id} className="relative">
            <Input type="file" onChange={handleFileChange(index)} accept="image/*" />
            {previews[index] && (
              <div className="mb-5">
                <div className="flex justify-center">
                  <div className="relative mt-5 flex size-full justify-center overflow-hidden rounded-lg border border-gray-300">
                    <img src={previews[index]} alt="Preview" className="object-cover" />
                  </div>
                </div>
                <Button
                  type="button"
                  size="icon"
                  variant="destructive"
                  className="absolute right-1 top-1 h-6 w-6 rounded-full"
                  onClick={() => handleRemove(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>

      {fields.length < maxCount && (
        <Button type="button" variant="outline" onClick={handleFileInputAdd} className="mt-2">
          新增檔案
        </Button>
      )}
    </div>
  );
};

export default FormImagesInput;
