import { httpClient } from "./httpClient";
import { HttpMethod, type ApiResponse } from "./apiTypes";

export const api = {
  get: <T>(
    url: string,
    params?: Record<string, any>,
    headers?: HeadersInit
  ): Promise<ApiResponse<T>> =>
    httpClient<T>({
      url,
      method: HttpMethod.GET,
      params,
      headers,
    }),

  post: <T, B = unknown>(
    url: string,
    body?: B,
    headers?: HeadersInit
  ): Promise<ApiResponse<T>> =>
    httpClient<T, B>({
      url,
      method: HttpMethod.POST,
      body,
      headers,
    }),

  put: <T, B = unknown>(
    url: string,
    body?: B,
    headers?: HeadersInit
  ): Promise<ApiResponse<T>> =>
    httpClient<T, B>({
      url,
      method: HttpMethod.PUT,
      body,
      headers,
    }),

  delete: <T>(
    url: string,
    headers?: HeadersInit
  ): Promise<ApiResponse<T>> =>
    httpClient<T>({
      url,
      method: HttpMethod.DELETE,
      headers,
    }),
};
