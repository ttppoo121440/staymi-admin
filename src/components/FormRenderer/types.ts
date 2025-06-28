import { ArrayPath, FieldValues, UseFormReturn } from 'react-hook-form';

export interface Option {
  value: string;
  label: string;
}

interface BaseFieldConfig<T extends FieldValues> {
  id?: string;
  label: string;
  key: string;
  name: keyof T;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  placeholder?: string;
  onFileUpload?: (file: File) => void;
}

export type TextFieldConfig<T extends FieldValues> = BaseFieldConfig<T> & {
  type:
    | 'text'
    | 'password'
    | 'email'
    | 'number'
    | 'tel'
    | 'textarea'
    | 'date'
    | 'switch'
    | 'file'
    | 'imagesUrl'
    | 'checkboxGroup';
};

export type SelectFieldConfig<T extends FieldValues> = BaseFieldConfig<T> & {
  type: 'select' | 'radio';
  options: Option[];
  onChange?: (value: string) => void;
};

export type CheckboxFieldConfig<T extends FieldValues> = BaseFieldConfig<T> & {
  type: 'checkbox' | 'checkboxGroup';
  options: Option[];
};

export type FileFieldConfig<T extends FieldValues> = BaseFieldConfig<T> & {
  type: 'imagesUrl';
  maxCount?: number;
  name: ArrayPath<T>;
};

export type EditorFieldConfig<T extends FieldValues> = BaseFieldConfig<T> & {
  type: 'editor';
  buttonList?: string[][];
};

export type FormFieldConfig<T extends FieldValues> =
  | TextFieldConfig<T>
  | SelectFieldConfig<T>
  | CheckboxFieldConfig<T>
  | FileFieldConfig<T>
  | EditorFieldConfig<T>;

export interface FormRendererProps<T extends FieldValues> {
  FormFields: FormFieldConfig<T>[];
  methods: UseFormReturn<T>;
}

export interface FormImagesInputProps<T extends FieldValues> {
  name: ArrayPath<T>;
  maxCount?: number;
}
