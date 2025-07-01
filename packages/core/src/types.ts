export type FormField = {
    type: 'text' | 'email' | 'select' | 'number' | 'checkbox';
    label: string;
    name: string;
    required?: boolean;
    options?: string[];
    defaultValue?: string | number | boolean;
    conditional?: {
      field: string;
      value: string | number | boolean;
    };
  };