"use client";

import { Button } from "@assessment/ui";
import Link from "next/link";
import { Post, usePosts } from "@assessment/services";
import { PostCard } from "@assessment/blog-app";
import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import LoadingSpinner from "../../components/LoadingSpinner";

export default function BlogPage() {
  const [page, setPage] = useState(1);
  const [allPosts, setAllPosts] = useState<Post[]>([]);
  const { data: posts, isLoading, error } = usePosts(page);
  const { ref, inView } = useInView();

  useEffect(() => {
    if (posts && posts.length > 0) {
      setAllPosts((prev) => [...prev, ...posts]);
    }
  }, [posts]);

  useEffect(() => {
    if (inView && !isLoading) {
      setPage((prev) => prev + 1);
    }
  }, [inView, isLoading]);

  if (error) return <div>Error loading posts</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Blog Posts</h1>
        <Link href="/blog/new">
          <Button>Create New Post</Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {allPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>

      <div ref={ref} className="py-8 text-center">
        {isLoading && (
          <div>
            <LoadingSpinner />
          </div>
        )}
      </div>
    </div>
  );
}
