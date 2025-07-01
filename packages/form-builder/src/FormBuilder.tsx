import React from 'react';
import { useForm, FormProvider, SubmitHandler, useWatch, FieldError } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z, ZodObject, ZodRawShape, ZodTypeAny } from 'zod';
import { FormField, FormConfig, GroupFormField } from '@assessment/core';
import { Button, Input, Select, Checkbox, Textarea } from '@assessment/ui';

type ExtendedFormField = FormField | GroupFormField;

interface FormBuilderProps {
  config: ExtendedFormField[];
  onSubmit: SubmitHandler<any>;
  defaultValues?: Record<string, any>;
  className?: string;
}

export const FormBuilder: React.FC<FormBuilderProps> = ({
  config,
  onSubmit,
  defaultValues,
  className = '',
}) => {
  const generateSchema = (fields: ExtendedFormField[]): ZodObject<ZodRawShape> => {
    const shape: ZodRawShape = {};

    const processField = (field: ExtendedFormField) => {
      if (field.type === 'group') {
        const groupSchema = generateSchema(field.fields);
        shape[field.name] = groupSchema;
        return;
      }

      let fieldSchema = field.validation || getBaseSchema(field);

      if (field.required) {
        fieldSchema = fieldSchema.refine(
          (val) => val !== '' && val !== undefined && val !== null,
          { message: `${field.label} is required` }
        );
      }

      shape[field.name] = fieldSchema;
    };

    fields.forEach(processField);
    return z.object(shape);
  };

  const getBaseSchema = (field: FormField): ZodTypeAny => {
    switch (field.type) {
      case 'email':
        return z.string().email('Invalid email address');
      case 'number':
        return z.number().or(z.string().regex(/^\d+$/).transform(Number));
      case 'checkbox':
        return z.boolean().default(false);
      case 'date':
        return z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format');
      default:
        return z.string();
    }
  };

  const schema = generateSchema(config);
  type FormValues = z.infer<typeof schema>;

  const methods = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues,
    mode: 'onTouched',
  });

  const shouldRenderField = (field: ExtendedFormField): boolean => {
    if (field.type === 'group') return true;
    if (!field.conditional) return true;
    
    const watchedValue = useWatch({
      control: methods.control,
      name: field.conditional.field,
    });

    return watchedValue === field.conditional.value;
  };

  const renderField = (field: ExtendedFormField) => {
    if ((field.type !== 'group' && field.hidden) || !shouldRenderField(field)) return null;

    const error = methods.formState.errors[field.name] as FieldError | undefined;
    const commonProps = {
      key: field.name,
      label: field.type !== 'group' ? field.label : undefined,
      error: error?.message,
      className: field.className,
      description: field.type !== 'group' ? field.description : undefined,
      disabled: field.type !== 'group' ? field.disabled : undefined,
    };

    switch (field.type) {
      case 'text':
      case 'email':
      case 'number':
      case 'date':
        return (
          <Input
            {...commonProps}
            type={field.type}
            {...methods.register(field.name)}
            placeholder={field.placeholder}
          />
        );
      
      case 'textarea':
        return (
          <Textarea
            {...commonProps}
            {...methods.register(field.name)}
            placeholder={field.placeholder}
          />
        );
      
      case 'select':
        return (
          <Select
            {...commonProps}
            {...methods.register(field.name)}
            options={
              field.options?.map(opt => 
                typeof opt === 'string' ? { value: opt, label: opt } : opt
              ) || []
            }
          />
        );
      
      case 'checkbox':
        return (
          <Checkbox
            {...commonProps}
            {...methods.register(field.name)}
            defaultChecked={field.defaultValue}
          />
        );
      
      case 'radio':
        return (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {field.label}
            </label>
            <div className="space-y-2">
              {field.options?.map(option => {
                const value = typeof option === 'string' ? option : option.value;
                const label = typeof option === 'string' ? option : option.label;
                
                return (
                  <div key={value} className="flex items-center">
                    <input
                      type="radio"
                      id={`${field.name}-${value}`}
                      value={value}
                      {...methods.register(field.name)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <label
                      htmlFor={`${field.name}-${value}`}
                      className="ml-2 block text-sm text-gray-700"
                    >
                      {label}
                    </label>
                  </div>
                );
              })}
            </div>
            {error && (
              <p className="mt-1 text-sm text-red-600">{error.message}</p>
            )}
          </div>
        );
      
      case 'group':
        return (
          <div className="border-l-2 border-gray-200 pl-4 mb-4">
            {field.fields.map(renderField)}
          </div>
        );
      
      default:
        const _exhaustiveCheck: never = field;
        return null;
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className={`space-y-4 ${className}`}
      >
        {config.map(renderField)}
        
        <div className="mt-6">
          <Button
            type="submit"
            variant="primary"
            disabled={methods.formState.isSubmitting}
          >
            {methods.formState.isSubmitting ? 'Submitting...' : 'Submit'}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};