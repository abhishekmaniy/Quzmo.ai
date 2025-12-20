import { loginRoute } from "./lib/features/auth";
import { landingRoute } from "./lib/features/home";
import { promptRoute } from "./lib/features/prompt";
import { rootRoute } from "./routes/__root";


export const routeTree = rootRoute.addChildren([
  landingRoute,
  loginRoute,
  promptRoute
])