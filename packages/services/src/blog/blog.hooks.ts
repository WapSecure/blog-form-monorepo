import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchPosts, createPost, updatePost, deletePost, Post, fetchPostById } from './blog.service';

export const usePosts = (page = 1) => {
  return useQuery<Post[], Error>({
    queryKey: ['posts', page],
    queryFn: () => fetchPosts(9, page),
    placeholderData: (previousData) => previousData,
  });
};

export const usePost = (id: number) => {
  return useQuery<Post, Error>({
    queryKey: ['post', id],
    queryFn: () => fetchPostById(id),
  });
};


export const useCreatePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
};

export const useUpdatePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...post }: { id: number } & Partial<Post>) => updatePost(id, post),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
};

export const useDeletePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
};

export type { Post };