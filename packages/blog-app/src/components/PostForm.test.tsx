import { render, screen, fireEvent } from '@testing-library/react';
import { PostForm } from './PostForm';
import userEvent from '@testing-library/user-event';

describe('PostForm', () => {
  const mockSubmit = jest.fn();

  it('validates required fields', async () => {
    render(<PostForm onSubmit={mockSubmit} />);
    
    fireEvent.click(screen.getByText('Save Post'));
    
    expect(await screen.findByText('Title is required')).toBeInTheDocument();
    expect(await screen.findByText('Content is required')).toBeInTheDocument();
    expect(mockSubmit).not.toHaveBeenCalled();
  });

  it('submits valid form', async () => {
    render(<PostForm onSubmit={mockSubmit} />);
    
    await userEvent.type(screen.getByLabelText('Title'), 'Test Title');
    await userEvent.type(screen.getByLabelText('Content'), 'Test Content');
    fireEvent.click(screen.getByText('Save Post'));
    
    expect(mockSubmit).toHaveBeenCalledWith({
      title: 'Test Title',
      body: 'Test Content'
    });
  });
});