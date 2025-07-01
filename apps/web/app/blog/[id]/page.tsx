"use client";

import { usePost } from "@assessment/services";
import { notFound } from "next/navigation";
import { Button } from "@assessment/ui";
import Link from "next/link";
import LoadingSpinner from "components/LoadingSpinner";

export default function ViewPostPage({ params }: { params: { id: string } }) {
  const { data: post, isLoading, error } = usePost(Number(params.id));

  if (isLoading)
    return (
      <div>
        <LoadingSpinner />
      </div>
    );
  if (error || !post) return notFound();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-4">
        <Link href="/blog">
          <Button variant="secondary">Back to Posts</Button>
        </Link>
      </div>

      <article className="prose max-w-none">
        <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
        <p className="text-gray-700">{post.body}</p>
      </article>
    </div>
  );
}
