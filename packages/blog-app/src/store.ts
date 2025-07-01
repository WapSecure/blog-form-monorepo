import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import {
  fetchPosts,
  createPost,
  updatePost,
  deletePost,
} from "@assessment/services";
import type { Post } from "@assessment/services";

interface BlogState {
  posts: Post[];
  loading: boolean;
  error: string | null;
  fetchPosts: () => Promise<void>;
  addPost: (post: Omit<Post, "id">) => Promise<void>;
  updatePost: (id: number, post: Partial<Post>) => Promise<void>;
  deletePost: (id: number) => Promise<void>;
}

export const useBlogStore = create<BlogState>()(
  immer((set) => ({
    posts: [],
    loading: false,
    error: null,

    fetchPosts: async () => {
      set({ loading: true, error: null });
      try {
        const data = await fetchPosts();
        set({ posts: data, loading: false });
      } catch (error) {
        set({ error: "Failed to fetch posts", loading: false });
      }
    },

    addPost: async (post) => {
      set({ loading: true, error: null });
      try {
        // Optimistic update
        const newPost = { ...post, id: Math.floor(Math.random() * 10000) };
        set((state) => {
          state.posts.unshift(newPost);
        });

        await createPost(post);
        set({ loading: false });
      } catch (error) {
        set((state) => {
          state.posts.shift();
          state.error = "Failed to add post";
          state.loading = false;
        });
      }
    },

    updatePost: async (id, post) => {
      set({ loading: true, error: null });
      try {
        set((state) => {
          const index = state.posts.findIndex((p: Post) => p.id === id);
          if (index !== -1) {
            state.posts[index] = { ...state.posts[index], ...post };
          }
        });

        await updatePost(id, post);
        set({ loading: false });
      } catch (error) {
        set({ error: "Failed to update post", loading: false });
      }
    },

    deletePost: async (id) => {
      set({ loading: true, error: null });
      let deletedPost: Post | undefined;

      try {
        set((state) => {
          const index = state.posts.findIndex((p: Post) => p.id === id);
          if (index !== -1) {
            deletedPost = state.posts[index];
            state.posts.splice(index, 1);
          }
        });

        await deletePost(id);
        set({ loading: false });
      } catch (error) {
        set((state) => {
          if (deletedPost) {
            state.posts.push(deletedPost);
          }
          state.error = "Failed to delete post";
          state.loading = false;
        });
      }
    },
  }))
);
