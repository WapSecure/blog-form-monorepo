import axios from 'axios';

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  age: number;
  gender: string;
  image: string;
}

export interface UsersResponse {
  users: User[];
  total: number;
  skip: number;
  limit: number;
}

export const fetchUsers = async (): Promise<User[]> => {
  const { data } = await axios.get<UsersResponse>('https://dummyjson.com/users');
  return data.users;
};

export const deleteUsers = async (userIds: number[]): Promise<void> => {

  await Promise.all(
    userIds.map(id => 
      axios.delete(`https://dummyjson.com/users/${id}`)
    )
  );
};