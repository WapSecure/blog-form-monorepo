import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchUsers, deleteUsers, User } from './users.service';

export const useUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });
};

export const useDeleteUsers = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: deleteUsers,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
};

export type { User };