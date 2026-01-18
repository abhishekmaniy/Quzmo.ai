import Layout from "@/components/common/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod"; // Try this import instead
import { useAuthActions, useAuthState } from "../hooks/useAuth";
import { useNavigate } from "@tanstack/react-router";

/* =========================
   ZOD SCHEMAS
========================= */

const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const signupSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;
type SignupFormData = z.infer<typeof signupSchema>;

/* =========================
   COMPONENT
========================= */

export default function LoginPage() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const navigate = useNavigate();

  // Auth hooks - rename register to avoid conflict
  const { login, register: registerUser } = useAuthActions();
  const { loading, error } = useAuthState();
  const { resetError } = useAuthActions(); // Get resetError from actions

  // Login form
  const loginForm = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Signup form
  const signupForm = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  // Handle mode toggle
  const handleModeToggle = () => {
    setMode((prev) => (prev === "login" ? "signup" : "login"));
    loginForm.reset();
    signupForm.reset();
    resetError();
  };

  // Handle login submit
  const onLoginSubmit = async (data: LoginFormData) => {
    try {
      await login(data);
      navigate({ to: "/dashboard" });
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  // Handle signup submit
  const onSignupSubmit = async (data: SignupFormData) => {
    try {
      await registerUser(data);
      navigate({ to: "/dashboard" });
    } catch (error) {
      console.error("Signup failed:", error);
    }
  };

  return (
    <Layout>
      <div className="w-full grid grid-cols-1 lg:grid-cols-2">
        {/* LEFT SIDE – BRAND / MESSAGE */}
        <div className="hidden lg:flex flex-col justify-center px-16 bg-neutral-100 dark:bg-neutral-950">
          <h1 className="text-5xl font-bold text-neutral-900 dark:text-neutral-100 leading-tight">
            {mode === "login" ? "Welcome back!" : "Welcome to Quzmo.ai"}
          </h1>
          <p className="mt-6 max-w-md text-lg text-neutral-600 dark:text-neutral-400">
            {mode === "login"
              ? "Sign in to continue discovering smarter shopping with AI-powered prompts."
              : "Create an account and start finding the best products using a single prompt."}
          </p>
        </div>

        {/* RIGHT SIDE – FORM */}
        <div className="flex items-center justify-center px-6 py-12">
          <Card className="w-full max-w-md border-neutral-200 dark:border-neutral-800">
            <CardHeader>
              <CardTitle className="text-2xl text-center">
                {mode === "login" ? "Sign In" : "Create Account"}
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* ERROR MESSAGE */}
              {error && (
                <div className="p-3 text-sm text-red-600 bg-red-50 dark:bg-red-950/20 dark:text-red-400 rounded-md border border-red-200 dark:border-red-900">
                  {error}
                </div>
              )}

              {/* LOGIN FORM */}
              {mode === "login" ? (
                <Form {...loginForm}>
                  <form
                    onSubmit={loginForm.handleSubmit(onLoginSubmit)}
                    className="space-y-4"
                  >
                    <FormField
                      control={loginForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="you@example.com"
                              disabled={loading}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={loginForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input
                              type="password"
                              placeholder="••••••••"
                              disabled={loading}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      variant="secondary"
                      className="w-full"
                      disabled={loading}
                    >
                      {loading ? "Please wait..." : "Sign In"}
                    </Button>
                  </form>
                </Form>
              ) : (
                /* SIGNUP FORM */
                <Form {...signupForm}>
                  <form
                    onSubmit={signupForm.handleSubmit(onSignupSubmit)}
                    className="space-y-4"
                  >
                    <FormField
                      control={signupForm.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="John Doe"
                              disabled={loading}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={signupForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="you@example.com"
                              disabled={loading}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={signupForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input
                              type="password"
                              placeholder="••••••••"
                              disabled={loading}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      variant="secondary"
                      className="w-full"
                      disabled={loading}
                    >
                      {loading ? "Please wait..." : "Sign Up"}
                    </Button>
                  </form>
                </Form>
              )}

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
                disabled={loading}
              >
                <FcGoogle className="text-lg" />
                Continue with Google
              </Button>

              {/* TOGGLE */}
              <p className="text-center text-sm text-neutral-600 dark:text-neutral-400">
                {mode === "login" ? (
                  <>
                    Don't have an account?{" "}
                    <Button
                      variant="link"
                      onClick={handleModeToggle}
                      disabled={loading}
                      type="button"
                    >
                      Sign up
                    </Button>
                  </>
                ) : (
                  <>
                    Already have an account?{" "}
                    <Button
                      variant="link"
                      onClick={handleModeToggle}
                      disabled={loading}
                      type="button"
                    >
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