import api from './api';
import type { User, UpdateUserDto, PaginatedResponse, PaginationQuery } from '@/types';

class UsersService {
   private endpoint = 'auth/users';

   async findAll(params?: PaginationQuery): Promise<PaginatedResponse<User>> {
      const queryString = params
         ? `?${new URLSearchParams(params as Record<string, string>).toString()}`
         : '';
      return api.get<PaginatedResponse<User>>(`${this.endpoint}${queryString}`);
   }

   async findOne(id: string): Promise<User> {
      return api.get<User>(`${this.endpoint}/${id}`);
   }

   async update(data: UpdateUserDto): Promise<User> {
      return api.put<User>(this.endpoint, data);
   }

   async remove(id: string): Promise<void> {
      return api.delete<void>(`${this.endpoint}/${id}`);
   }

   async deleteAll(): Promise<void> {
      return api.delete<void>(`${this.endpoint}/all`);
   }
}

export const usersService = new UsersService();
export default usersService;
