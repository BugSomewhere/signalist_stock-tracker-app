"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import authService from "@/services/auth.service";
import { ROUTES } from "@/constants";
import type { LoginCredentials, RegisterCredentials, User } from "@/types";
import { getErrorMessage } from "@/lib/utils";

interface UseAuthReturn {
   user: User | null;
   isLoading: boolean;
   isAuthenticated: boolean;
   login: (credentials: LoginCredentials) => Promise<void>;
   register: (credentials: RegisterCredentials) => Promise<void>;
   logout: () => Promise<void>;
}

export function useAuth(): UseAuthReturn {
   const [user, setUser] = useState<User | null>(() => authService.getCurrentUser());
   const [isLoading, setIsLoading] = useState(false);
   const router = useRouter();

   const login = useCallback(async (credentials: LoginCredentials) => {
      setIsLoading(true);
      try {
         const nextUser = await authService.login(credentials);
         authService.setCurrentUser(nextUser);
         setUser(nextUser);
         router.push(ROUTES.HOME);
      } catch (error) {
         throw new Error(getErrorMessage(error));
      } finally {
         setIsLoading(false);
      }
   }, [router]);

   const register = useCallback(async (credentials: RegisterCredentials) => {
      setIsLoading(true);
      try {
         await authService.register(credentials);
         router.push(ROUTES.LOGIN);
      } catch (error) {
         throw new Error(getErrorMessage(error));
      } finally {
         setIsLoading(false);
      }
   }, [router]);

   const logout = useCallback(async () => {
      setIsLoading(true);
      try {
         authService.logout();
         setUser(null);
         router.push(ROUTES.LOGIN);
      } catch (error) {
         throw new Error(getErrorMessage(error));
      } finally {
         setIsLoading(false);
      }
   }, [router]);

   return {
      user,
      isLoading,
      isAuthenticated: !!user,
      login,
      register,
      logout,
   };
}

export default useAuth;
