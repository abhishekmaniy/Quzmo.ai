export const selectLoading = <T extends { loading: boolean }>(state: T) =>
  state.loading;

export const selectError = <T extends { error: string | null }>(state: T) =>
  state.error;
