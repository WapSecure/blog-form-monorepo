import axios from "axios";

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export const fetchPosts = async (limit = 6, page = 1): Promise<Post[]> => {
  const { data } = await axios.get<Post[]>(
    `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`
  );
  return data;
};

export const fetchPostById = async (id: number): Promise<Post> => {
  const { data } = await axios.get<Post>(
    `https://jsonplaceholder.typicode.com/posts/${id}`
  );
  return data;
};

export const createPost = async (post: Omit<Post, "id">): Promise<Post> => {
  const { data } = await axios.post<Post>(
    "https://jsonplaceholder.typicode.com/posts",
    post
  );
  return data;
};

export const updatePost = async (
  id: number,
  post: Partial<Post>
): Promise<Post> => {
  const { data } = await axios.put<Post>(
    `https://jsonplaceholder.typicode.com/posts/${id}`,
    post
  );
  return data;
};

export const deletePost = async (id: number): Promise<void> => {
  await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
};
