"use client";

import { PostForm } from "@assessment/blog-app";
import { usePost, useUpdatePost } from "@assessment/services";
import { notFound, useRouter } from "next/navigation";
import { Button } from "@assessment/ui";
import Link from "next/link";
import LoadingSpinner from "components/LoadingSpinner";

export default function EditPostPage({ params }: { params: { id: string } }) {
  const { data: post, isLoading, error } = usePost(Number(params.id));
  const { mutate: updatePost, isPending } = useUpdatePost();
  const router = useRouter();

  if (isLoading)
    return (
      <div>
        <LoadingSpinner />
      </div>
    );
  if (error || !post) return notFound();

  const handleSubmit = (values: { title: string; body: string }) => {
    updatePost(
      { id: post.id, ...values },
      {
        onSuccess: () => {
          router.push("/blog");
        },
      }
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-4">
        <Link href="/blog">
          <Button variant="secondary">Back to Posts</Button>
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-8">Edit Post</h1>
      <PostForm
        defaultValues={post}
        onSubmit={handleSubmit}
        isSubmitting={isPending}
      />
    </div>
  );
}
