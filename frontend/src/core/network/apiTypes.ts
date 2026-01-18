export enum HttpMethod {
    GET="GET" ,
    POST ="POST" ,
    PUT="PUT" ,
    DELETE="DELETE"
}

export interface ApiRequestConfig<TBody = unknown> {
  url: string;
  method: HttpMethod;
  body?: TBody;
  params?: Record<string, string | number | boolean | undefined>;
  headers?: HeadersInit;
  signal?: AbortSignal;
}

export interface ApiResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T | null;
}
