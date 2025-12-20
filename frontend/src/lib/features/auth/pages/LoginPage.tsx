import Layout from "@/components/common/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";

export default function LoginPage() {
  const [mode, setMode] = useState<"login" | "signup">("login");

  return (
    <Layout>
      <div className=" w-full grid grid-cols-1 lg:grid-cols-2">
        {/* LEFT SIDE – BRAND / MESSAGE */}
        <div className="hidden lg:flex flex-col justify-center px-16 bg-neutral-100 dark:bg-neutral-950">
          <h1 className="text-5xl font-bold text-neutral-900 dark:text-neutral-100 leading-tight">
            {mode === "login" ? "Welcome back!" : "Welcome to Quzmo.ai "}
          </h1>
          <p className="mt-6 max-w-md text-lg text-neutral-600 dark:text-neutral-400">
            {mode === "login"
              ? "Sign in to continue discovering smarter shopping with AI-powered prompts."
              : "Create an account and start finding the best products using a single prompt."}
          </p>
        </div>

        {/* RIGHT SIDE – FORM */}
        <div className="flex items-center justify-center px-6">
          <Card className="w-full max-w-md border-neutral-200 dark:border-neutral-800">
            <CardHeader>
              <CardTitle className="text-2xl text-center">
                {mode === "login" ? "Sign In" : "Create Account"}
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* FORM */}
              <form className="space-y-4">
                {mode === "signup" && (
                  <div className="space-y-2">
                    <Label htmlFor="fullname">Full Name</Label>
                    <Input id="fullname" placeholder="John Doe" />
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" placeholder="••••••••" />
                </div>

                <Button variant={"secondary"} className="w-full ">
                  {mode === "login" ? "Sign In" : "Sign Up"}
                </Button>
              </form>

              {/* DIVIDER */}
              <div className="flex items-center gap-3">
                <Separator className="flex-1" />
                <span className="text-xs text-neutral-500">OR</span>
                <Separator className="flex-1" />
              </div>

              {/* GOOGLE LOGIN */}
              <Button
                variant="secondary"
                className="w-full flex items-center gap-2"
              >
                <FcGoogle className="text-lg" />
                Continue with Google
              </Button>

              {/* TOGGLE */}
              <p className="text-center text-sm text-neutral-600 dark:text-neutral-400">
                {mode === "login" ? (
                  <>
                    Don’t have an account?{" "}
                    <Button variant={"link"} onClick={() => setMode("signup")}>
                      Sign up
                    </Button>
                  </>
                ) : (
                  <>
                    Already have an account?{" "}
                    <Button variant={"link"} onClick={() => setMode("login")}>
                      Sign in
                    </Button>
                  </>
                )}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
