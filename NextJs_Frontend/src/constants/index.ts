import type { NavItem } from "@/types";

// API Constants
export const API_BASE_URL = process.env.NEST_PUBLIC_API_URL || 'http://localhost:3000/api';

// Routes
export const ROUTES = {
   HOME: '/',
   LOGIN: '/login',
   REGISTER: '/register',
} as const;

// Local Storage Keys
export const STORAGE_KEYS = {
   ACCESS_TOKEN: 'access_token',
   USER: 'user',
} as const;

// Validation
export const VALIDATION = {
   PASSWORD_MIN_LENGTH: 6,
   NAME_MIN_LENGTH: 2,
   NAME_MAX_LENGTH: 50,
} as const;

// Status codes
export const STATUS_CODES = {
   OK: 200,
   CREATED: 201,
   BAD_REQUEST: 400,
   UNAUTHORIZED: 401,
   FORBIDDEN: 403,
   NOT_FOUND: 404,
   INTERNAL_SERVER_ERROR: 500,
} as const;


export const siteConfig = {
  name: "NextApp",
  description: "Ứng dụng web hiện đại với Next.js, TailwindCSS và shadcn/ui",
  url: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
};

export const navItems: NavItem[] = [
  { title: "Tính năng", href: "/#features" },
  { title: "Bảng giá", href: "/#pricing" },
  { title: "Blog", href: "/blog" },
  { title: "Liên hệ", href: "/contact" },
];