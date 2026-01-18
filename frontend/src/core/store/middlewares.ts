export const createAsyncActions = <T>() => ({
  data: null as T | null,
  loading: false,
  error: null as string | null,

  start: () => ({
    loading: true,
    error: null,
  }),

  success: (data: T) => ({
    data,
    loading: false,
  }),

  failure: (error: string) => ({
    error,
    loading: false,
  }),
});
