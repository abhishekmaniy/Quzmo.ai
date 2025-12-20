import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"

export default function PromptPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-50 px-6 dark:bg-neutral-950">
      <Card className="w-full max-w-3xl border-neutral-200 dark:border-neutral-800">
        <CardContent className="space-y-6 p-8">
          {/* HEADING */}
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
              What are you looking to buy?
            </h1>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              Describe your needs in plain English. We’ll find the best matches.
            </p>
          </div>

          {/* PROMPT INPUT */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
              Your prompt
            </label>

            <Textarea
              placeholder="Example: Best laptop under ₹80,000 for coding, gaming, and long battery life"
              className="min-h-[160px] resize-none"
            />
          </div>

          {/* ACTION */}
          <div className="flex justify-end">
            <Button className="px-8">
              Find Products
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
