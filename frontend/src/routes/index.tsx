import { createFileRoute } from "@tanstack/react-router"
import LandingPage from "@/lib/features/home/pages/LandingPage"

const RouteComponent = () => {
  return <LandingPage />
}

export const Route = createFileRoute("/")({
  component: RouteComponent,
})
