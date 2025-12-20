import { rootRoute } from "@/routes/__root";
import { createRoute } from "@tanstack/react-router";
import LoginPage from "./pages/LoginPage";

export const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: LoginPage,
})