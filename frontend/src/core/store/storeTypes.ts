export interface AsyncState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export interface PaginationState {
  page: number;
  limit: number;
  total: number;
}

export interface UiState {
  loading: boolean;
  modalOpen: boolean;
}
