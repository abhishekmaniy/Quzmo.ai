import { ApiError } from "@/core/network";

// Match Zustand's actual SetState signature with overloads
type SetState<T> = {
  (partial: T | Partial<T> | ((state: T) => T | Partial<T>), replace?: false): void;
  (state: T | ((state: T) => T), replace: true): void;
};

interface AsyncHandlerOptions {
  onError?: (error: unknown) => void;
  throwError?: boolean;
}

export async function asyncHandler<TState, TResult extends Partial<TState>>(
  set: SetState<TState>,
  asyncFn: () => Promise<TResult>,
  options?: AsyncHandlerOptions
): Promise<TResult | undefined> {
  try {
    // Type assertion to ensure loading and error are treated as part of TState
    set({
      loading: true,
      error: null,
    } as unknown as Partial<TState>);

    const result = await asyncFn();

    set({
      ...result,
      loading: false,
    } as Partial<TState>);

    return result;
  } catch (error: any) {
    let message = "Something went wrong";

    if (error instanceof ApiError) {
      message = error.message;
    } else if (error instanceof Error) {
      message = error.message;
    }

    set({
      error: message,
      loading: false,
    } as unknown as Partial<TState>);

    options?.onError?.(error);

    if (options?.throwError) {
      throw error;
    }

    return undefined;
  }
}