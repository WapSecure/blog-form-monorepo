import { z } from "zod";

export type BaseFormField = {
  name: string;
  required?: boolean;
  className?: string;
  hidden?: boolean;
  disabled?: boolean;
  conditional?: {
    field: string;
    value: any;
  };
};

export type TextFormField = BaseFormField & {
  type: "text" | "email" | "number" | "date";
  label: string;
  placeholder?: string;
  defaultValue?: string | number;
  validation?: z.ZodTypeAny;
  description?: string;
};

export type TextareaFormField = BaseFormField & {
  type: "textarea";
  label: string;
  placeholder?: string;
  defaultValue?: string;
  validation?: z.ZodTypeAny;
  description?: string;
};

export type SelectFormField = BaseFormField & {
  type: "select";
  label: string;
  options: string[] | { value: string; label: string }[];
  defaultValue?: string;
  validation?: z.ZodTypeAny;
  description?: string;
};

export type CheckboxFormField = BaseFormField & {
  type: "checkbox";
  label: string;
  defaultValue?: boolean;
  validation?: z.ZodTypeAny;
  description?: string;
};

export type RadioFormField = BaseFormField & {
  type: "radio";
  label: string;
  options: string[] | { value: string; label: string }[];
  defaultValue?: string;
  validation?: z.ZodTypeAny;
  description?: string;
};

export type GroupFormField = BaseFormField & {
  type: "group";
  name: string;
  fields: FormField[];
  className?: string;
};

export type FormField =
  | TextFormField
  | TextareaFormField
  | SelectFormField
  | CheckboxFormField
  | RadioFormField
  | GroupFormField;

export type FormConfig = FormField[];
