import axios from "axios";
import { ApiError } from "./apiError";
import type { ApiRequestConfig, ApiResponse } from "./apiTypes";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

/**
 * Axios instance
 */
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // important for auth / refresh token
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Generic HTTP client using Axios
 */
export async function httpClient<TResponse, TBody = unknown>(
  config: ApiRequestConfig<TBody>
): Promise<ApiResponse<TResponse>> {
  const { url, method, body, headers, signal, params } = config;

  try {
    const response = await axiosInstance.request<ApiResponse<TResponse>>({
      url,
      method,
      data: body,
      params,
      headers: headers as Record<string, string>,
      signal,
    });

    return {
      data: response.data.data,
      message: response.data.message,
      success: response.data.success,
      statusCode: response.status,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new ApiError(
        error.response?.data?.message || "Something went wrong",
        error.response?.status ?? 500,
        error.response?.data
      );
    }
    throw error;
  }
}
