import { create } from "zustand";
import type { StateCreator } from "zustand";
import { devtools, persist, subscribeWithSelector } from "zustand/middleware";

type StoreOptions = {
  name?: string;
  persist?: boolean;
};

export function createAppStore<T>(
  initializer: StateCreator<T, [], []>,
  options?: StoreOptions
) {
  // Build middleware chain with proper typing
  if (options?.persist) {
    return create<T>()(
      devtools(
        subscribeWithSelector(
          persist(initializer, {
            name: options.name ?? "app-store",
          })
        ),
        { name: options?.name }
      )
    );
  }

  return create<T>()(
    devtools(
      subscribeWithSelector(initializer),
      { name: options?.name }
    )
  );
}