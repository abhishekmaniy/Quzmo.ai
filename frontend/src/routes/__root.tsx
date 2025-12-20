import { ThemeProvider } from "@/components/theme-provider";
import { Outlet, createRootRoute } from "@tanstack/react-router";

export const rootRoute = createRootRoute({
  component: () => {
    return (
      <ThemeProvider>
        <Outlet />
      </ThemeProvider>
    );
  },
});
