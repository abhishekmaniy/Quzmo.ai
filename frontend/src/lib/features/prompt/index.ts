import PromptLayout from "@/components/common/PromptLayout";
import { rootRoute } from "@/routes/__root";
import { createRoute } from "@tanstack/react-router";

export const promptRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/prompt",
  component: PromptLayout,
})