import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { PostCard } from './PostCard';
import { Post } from '@assessment/services';

const mockPost: Post = {
  id: 1,
  title: 'Test Post',
  body: 'This is a test post body',
  userId: 1
};

describe('PostCard', () => {
  it('renders post title and body', () => {
    render(<PostCard post={mockPost} />);
    expect(screen.getByText(mockPost.title)).toBeInTheDocument();
    expect(screen.getByText(mockPost.body)).toBeInTheDocument();
  });

  it('has working view and edit buttons', () => {
    render(<PostCard post={mockPost} />);
    expect(screen.getByText('View')).toHaveAttribute('href', `/blog/${mockPost.id}`);
    expect(screen.getByText('Edit')).toHaveAttribute('href', `/blog/edit/${mockPost.id}`);
  });
});