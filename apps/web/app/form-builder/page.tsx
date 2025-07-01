"use client";

import { FormBuilder } from '@assessment/form-builder';
import { FormField } from '@assessment/core';
import { useState } from 'react';

const formConfig: FormField[] = [
  {
    type: 'text',
    name: 'name',
    label: 'Full Name',
    required: true,
    placeholder: 'Enter your full name',
  },
  {
    type: 'email',
    name: 'email',
    label: 'Email Address',
    required: true,
    placeholder: 'your.email@example.com',
  },
  {
    type: 'select',
    name: 'gender',
    label: 'Gender',
    options: ['Male', 'Female', 'Other'],
  },
  {
    type: 'radio',
    name: 'contactPreference',
    label: 'Preferred Contact Method',
    options: ['Email', 'Phone', 'Mail'],
  },
  {
    type: 'checkbox',
    name: 'subscribe',
    label: 'Subscribe to newsletter',
  },
  {
    type: 'text',
    name: 'phone',
    label: 'Phone Number',
    conditional: {
      field: 'contactPreference',
      value: 'Phone',
    },
  },
];

export default function FormBuilderPage() {
  const [submittedData, setSubmittedData] = useState<any>(null);

  const handleSubmit = (data: any) => {
    console.log('Form submitted:', data);
    setSubmittedData(data);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-lg mx-auto">
        <h1 className="text-2xl font-bold mb-6">Dynamic Form Builder</h1>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <FormBuilder config={formConfig} onSubmit={handleSubmit} />
        </div>

        {submittedData && (
          <div className="mt-8 bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Submitted Data</h2>
            <pre className="text-sm bg-white p-4 rounded overflow-auto">
              {JSON.stringify(submittedData, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
