import LandingPage from "@/lib/features/home/pages/LandingPage";
import { rootRoute } from "@/routes/__root";
import { createRoute } from "@tanstack/react-router";

export const landingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: LandingPage,
})