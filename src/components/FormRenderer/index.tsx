import { FieldValues, FormProvider } from 'react-hook-form';

import FormCheckbox from './FormCheckbox';
import FormImagesInput from './FormImagesUrl';
import FormInput from './FormInput';
import FormRadioGroup from './FormRadioGroup';
import FormSelect from './FormSelect';
import FormSwitch from './FormSwitch';
import FormTextarea from './FormTextarea';
import { FormRendererProps, FormFieldConfig, Option } from './types';
import FormSunEditor from './FormSunEditor';
import FormCheckboxGroup from './FormCheckboxGroup';

const FormRenderer = <T extends FieldValues>({ FormFields, methods }: FormRendererProps<T>) => {
  return (
    <FormProvider {...methods}>
      <div className="my-5">
        {FormFields.map((field: FormFieldConfig<T>) => {
          const { name, label, type, placeholder, id, required, onFileUpload } = field;

          const hasOptions = (f: typeof field): f is typeof field & { options: Option[] } => 'options' in f;

          switch (type) {
            case 'textarea':
              return (
                <FormTextarea
                  key={name as string}
                  label={label}
                  name={name as string}
                  type={type}
                  placeholder={placeholder}
                />
              );
            case 'switch':
              return <FormSwitch key={name as string} label={label} name={name} type={type} id={id} />;
            case 'select':
              if (hasOptions(field)) {
                return (
                  <FormSelect
                    key={name as string}
                    label={label}
                    name={name}
                    type={type}
                    id={id}
                    options={field.options}
                  />
                );
              }
              break;
            case 'checkbox':
              if (hasOptions(field)) {
                return (
                  <FormCheckbox
                    key={name as string}
                    label={label}
                    name={name}
                    type={type}
                    id={id}
                    options={field.options}
                  />
                );
              }
              break;
            case 'checkboxGroup':
              if (hasOptions(field)) {
                return (
                  <FormCheckboxGroup
                    key={name as string}
                    label={label}
                    name={name}
                    type={type}
                    id={id}
                    options={field.options}
                  />
                );
              }
              break;
            case 'radio':
              if (hasOptions(field)) {
                return (
                  <FormRadioGroup
                    key={name as string}
                    label={label}
                    name={name}
                    type={type}
                    id={id}
                    options={field.options}
                  />
                );
              }
              break;
            case 'imagesUrl':
              return (
                <FormImagesInput
                  label={label}
                  key={name as string}
                  name={name as string}
                  maxCount={5}
                  onFileUpload={onFileUpload}
                />
              );
            case 'editor':
              return (
                <FormSunEditor
                  key={name as string}
                  label={label}
                  name={name}
                  type={type}
                  placeholder={placeholder}
                  required={required}
                />
              );
            default:
              return (
                <FormInput
                  key={name as string}
                  label={label}
                  name={name}
                  type={type}
                  placeholder={placeholder}
                  required={required}
                  onFileUpload={onFileUpload}
                />
              );
          }
        })}
      </div>
    </FormProvider>
  );
};

export default FormRenderer;
