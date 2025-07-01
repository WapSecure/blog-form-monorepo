import React from 'react';
import { twMerge } from 'tailwind-merge';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  description?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, description, className, ...props }, ref) => {
    const baseClasses = 'block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm';
    const errorClasses = error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : '';

    return (
      <div>
        {label && (
          <label htmlFor={props.id} className="block text-sm font-medium text-gray-700 mb-1">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          className={twMerge(baseClasses, errorClasses, className)}
          {...props}
        />
        {description && (
          <p className="mt-1 text-sm text-gray-500">{description}</p>
        )}
        {error && (
          <p className="mt-1 text-sm text-red-600">{error}</p>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';