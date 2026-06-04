export interface ApiResponse<T = any> {
	statusCode: number;
	message: string;
	data?: T;
	timestamp: string;
}

export interface PaginationMeta {
	page: number;
	limit: number;
	total: number;
	totalPages: number;
	hasNextPage: boolean;
	hasPreviousPage: boolean;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
	meta: PaginationMeta;
}
