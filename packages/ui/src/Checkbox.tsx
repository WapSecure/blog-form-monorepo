import React from 'react';
import { twMerge } from 'tailwind-merge';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  description?: string;
  containerClassName?: string;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, error, description, className, containerClassName, ...props }, ref) => {
    const baseClasses = 'h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded';
    const errorClasses = error ? 'border-red-500 focus:ring-red-500' : '';

    return (
      <div className={twMerge('relative flex items-start', containerClassName)}>
        <div className="flex items-center h-5">
          <input
            ref={ref}
            type="checkbox"
            className={twMerge(baseClasses, errorClasses, className)}
            {...props}
          />
        </div>
        <div className="ml-3 text-sm">
          {label && (
            <label htmlFor={props.id} className="font-medium text-gray-700">
              {label}
            </label>
          )}
          {description && (
            <p className="text-gray-500">{description}</p>
          )}
          {error && (
            <p className="mt-1 text-sm text-red-600">{error}</p>
          )}
        </div>
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';