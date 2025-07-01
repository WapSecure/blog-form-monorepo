'use client'

import { PostForm } from '@assessment/blog-app';
import { useCreatePost } from '@assessment/services';
import { useRouter } from 'next/navigation';

export default function NewPostPage() {
  const router = useRouter();
  const { mutate: createPost, isPending } = useCreatePost();

  const handleSubmit = (values: { title: string; body: string }) => {
    createPost({ ...values, userId: 1 }, {
      onSuccess: () => {
        router.push('/blog');
      },
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Create New Post</h1>
      <PostForm onSubmit={handleSubmit} isSubmitting={isPending} />
    </div>
  );
}