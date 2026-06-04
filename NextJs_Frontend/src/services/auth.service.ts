import api from './api';
import { STORAGE_KEYS } from '@/constants';
import type { LoginCredentials, RegisterCredentials, User } from '@/types';

interface LoginResponse {
   access_token: string;
}

class AuthService {
   async login(credentials: LoginCredentials): Promise<User> {
      const response = await api.post<LoginResponse>('/auth/login', credentials, false);
      if (!response?.access_token) {
         throw new Error('Login failed: access token is missing in server response');
      }
      this.setAccessToken(response.access_token);
      // Fetch user profile after login
      const user = await this.getProfile();
      return user;
   }

   async register(credentials: RegisterCredentials): Promise<User> {
      const response = await api.post<User>('/users/register', credentials, false);
      return response;
   }

   async getProfile(): Promise<User> {
      return api.post<User>('/auth/profile', {});
   }

   logout(): void {
      this.clearTokens();
   }

   private setAccessToken(token: string): void {
      if (typeof window === 'undefined') return;
      if (!token || token === 'undefined' || token === 'null') {
         throw new Error('Received invalid access token');
      }
      localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, token);
   }

   private clearTokens(): void {
      if (typeof window === 'undefined') return;
      localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
      localStorage.removeItem(STORAGE_KEYS.USER);
   }

   getAccessToken(): string | null {
      if (typeof window === 'undefined') return null;
      return localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
   }

   getCurrentUser(): User | null {
      if (typeof window === 'undefined') return null;
      const user = localStorage.getItem(STORAGE_KEYS.USER);
      return user ? JSON.parse(user) : null;
   }

   setCurrentUser(user: User): void {
      if (typeof window === 'undefined') return;
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
   }

   isAuthenticated(): boolean {
      return !!this.getAccessToken();
   }
}

export const authService = new AuthService();
export default authService;
