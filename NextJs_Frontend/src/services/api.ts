import { API_BASE_URL, STORAGE_KEYS } from '@/constants';

interface ApiEnvelope<T> {
   statusCode: number;
   message: string;
   data: T;
   timestamp: string;
}

interface RequestOptions {
   method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
   body?: unknown;
   headers?: Record<string, string>;
   requireAuth?: boolean;
}

class ApiService {
   private baseUrl: string;

   constructor(baseUrl: string) {
      this.baseUrl = baseUrl;
   }

   private getAccessToken(): string | null {
      if (typeof window === 'undefined') return null;
      const token = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
      if (!token || token === 'undefined' || token === 'null') {
         return null;
      }
      return token;
   }

   private async request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
      const { method = 'GET', body, headers = {}, requireAuth = true } = options;

      const requestHeaders: Record<string, string> = {
         'Content-Type': 'application/json',
         ...headers,
      };

      if (requireAuth) {
         const token = this.getAccessToken();
         if (token) {
            requestHeaders['Authorization'] = `Bearer ${token}`;
         }
      }

      const config: RequestInit = {
         method,
         headers: requestHeaders,
      };

      if (body) {
         config.body = JSON.stringify(body);
      }

      const response = await fetch(`${this.baseUrl}${endpoint}`, config);
      const payload = await response.json().catch(() => null);

      if (!response.ok) {
         const message =
            payload && typeof payload === 'object' && 'message' in payload
               ? String((payload as { message: unknown }).message)
               : `HTTP Error: ${response.status}`;
         throw new Error(message);
      }

      if (payload && typeof payload === 'object' && 'data' in payload) {
         return (payload as ApiEnvelope<T>).data;
      }

      return payload as T;
   }

   // GET request
   async get<T>(endpoint: string, requireAuth = true): Promise<T> {
      return this.request<T>(endpoint, { method: 'GET', requireAuth });
   }

   // POST request
   async post<T>(endpoint: string, body: unknown, requireAuth = true): Promise<T> {
      return this.request<T>(endpoint, { method: 'POST', body, requireAuth });
   }

   // PUT request
   async put<T>(endpoint: string, body: unknown, requireAuth = true): Promise<T> {
      return this.request<T>(endpoint, { method: 'PUT', body, requireAuth });
   }

   // PATCH request
   async patch<T>(endpoint: string, body: unknown, requireAuth = true): Promise<T> {
      return this.request<T>(endpoint, { method: 'PATCH', body, requireAuth });
   }

   // DELETE request
   async delete<T>(endpoint: string, requireAuth = true): Promise<T> {
      return this.request<T>(endpoint, { method: 'DELETE', requireAuth });
   }
}

export const api = new ApiService(API_BASE_URL);
export default api;
