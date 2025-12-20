import { Button } from "@/components/ui/button"
import { Link } from "@tanstack/react-router"
import {Sparkles} from "lucide-react"

export default function Navbar() {
  return (
    <nav className="w-full border-b border-black/5 bg-white/70 backdrop-blur-md dark:border-white/10 dark:bg-black/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Left: Brand */}
         <Link
          to="/"
          className="text-xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100"
        >
          <span className="font-extrabold">Quzmo</span>
          <span className="text-neutral-500">.ai</span>
        </Link>

        {/* Right: Actions */}
        <div className="flex items-center gap-4">
          <Button variant={"outline"}  className="rounded-full px-6">
            <Sparkles className="w-4 h-4 text-white"  />
            Upgrade
          </Button>
          <Link to="/login">
            <Button variant="outline" className="hidden sm:inline-flex">
              Login
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  )
}
