import { render, screen, fireEvent } from '@testing-library/react';
import { FormBuilder } from './FormBuilder';
import { FormField } from '@assessment/core';

const mockConfig: FormField[] = [
  {
    type: 'text',
    name: 'name',
    label: 'Full Name',
    required: true
  },
  {
    type: 'email',
    name: 'email',
    label: 'Email',
    required: true
  }
];

describe('FormBuilder', () => {
  it('renders form fields', () => {
    render(<FormBuilder config={mockConfig} onSubmit={jest.fn()} />);
    
    expect(screen.getByLabelText('Full Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
  });

  it('validates required fields', async () => {
    render(<FormBuilder config={mockConfig} onSubmit={jest.fn()} />);
    
    fireEvent.click(screen.getByText('Submit'));
    
    expect(await screen.findByText('Full Name is required')).toBeInTheDocument();
    expect(await screen.findByText('Email is required')).toBeInTheDocument();
  });

  it('submits valid form', async () => {
    const mockSubmit = jest.fn();
    render(<FormBuilder config={mockConfig} onSubmit={mockSubmit} />);
    
    fireEvent.input(screen.getByLabelText('Full Name'), {
      target: { value: 'John Doe' }
    });
    fireEvent.input(screen.getByLabelText('Email'), {
      target: { value: 'john@example.com' }
    });
    fireEvent.click(screen.getByText('Submit'));
    
    expect(mockSubmit).toHaveBeenCalledWith({
      name: 'John Doe',
      email: 'john@example.com'
    });
  });
});