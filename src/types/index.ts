export type { Database, Tables, InsertTables, UpdateTables } from "./database.types";

// API response wrapper
export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
}

// Pagination
export interface PaginatedResponse<T> {
  data: T[];
  count: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// Common component props
export interface WithClassName {
  className?: string;
}

export interface WithChildren {
  children: React.ReactNode;
}
