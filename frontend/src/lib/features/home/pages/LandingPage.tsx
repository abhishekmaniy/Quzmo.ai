import Layout from "../../../../components/common/Layout";
import { BackgroundRippleEffect } from "../../../../components/ui/background-ripple-effect";
import { Button } from "../../../../components/ui/button";
import { useNavigate } from "@tanstack/react-router";

export default function LandingPage() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate({ to: "/prompt" });
  };

  return (
    <Layout>
      <BackgroundRippleEffect />

      <div className="mt-30 w-full">
        <h2 className="relative z-10 mx-auto max-w-4xl text-center text-2xl font-bold text-neutral-800 md:text-4xl lg:text-7xl dark:text-neutral-100">
          Smarter Shopping, One Prompt at a Time
        </h2>

        <p className="relative z-10 mx-auto mt-4 max-w-xl text-center text-neutral-800 dark:text-neutral-500">
          Describe what you want—like ‘15-inch laptop for coding under
          ₹70,000’—and get the best matches from multiple stores in seconds.
        </p>
      </div>

      <div className="mt-15 flex gap-5 z-50 ">
        <Button onClick={handleGetStarted} variant="outline">
          Get Started
        </Button>

        <Button variant="link">
          See how Quzmo.ai works
        </Button>
      </div>
    </Layout>
  );
}
