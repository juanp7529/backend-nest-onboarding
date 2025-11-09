export interface ApiResponse<T> {
  statusCode: number;
  data: T;
  timestamp: string;
}

export interface ErrorResponse {
  statusCode: number;
  timestamp: string;
  path: string;
  method: string;
  message: string | string[];
}
