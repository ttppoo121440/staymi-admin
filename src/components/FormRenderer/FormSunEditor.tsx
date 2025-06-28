import { FieldValues, Path, useFormContext } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { EditorFieldConfig } from './types';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';
import './suneditor-dark.css';

const FormSunEditor = <T extends FieldValues>({ label, name }: EditorFieldConfig<T>) => {
  const { control } = useFormContext<T>();

  return (
    <div className="my-5">
      <FormField
        control={control}
        name={name as Path<T>}
        render={({ field }) => (
          <FormItem className="block">
            <FormLabel>{label}</FormLabel>
            <div className="mr-2">
              <SunEditor
                height="auto"
                setContents={field.value}
                setOptions={{ buttonList: [] }}
                disable={true}
                onChange={field.onChange}
              />
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default FormSunEditor;
