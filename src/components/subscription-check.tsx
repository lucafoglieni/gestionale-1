"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/supabase/client";

interface SubscriptionCheckProps {
  children: React.ReactNode;
  redirectTo?: string;
}

export function SubscriptionCheck({
  children,
  redirectTo = "/pricing",
}: SubscriptionCheckProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isAllowed, setIsAllowed] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    async function checkSubscription() {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
          router.push("/sign-in");
          return;
        }

        // In development mode or for specific user, always allow access
        if (
          process.env.NODE_ENV === "development" ||
          user.email === "lucafoglieni@gmail.com"
        ) {
          setIsAllowed(true);
          setIsLoading(false);
          return;
        }

        // Check for active subscription
        const { data: subscription, error } = await supabase
          .from("subscriptions")
          .select("*")
          .eq("user_id", user.id)
          .eq("status", "active");

        if (error) {
          console.error("Error checking subscription status:", error);
          // For development purposes, allow access even if check fails
          if (process.env.NODE_ENV !== "production") {
            setIsAllowed(true);
          } else {
            router.push(redirectTo);
          }
        } else if (subscription && subscription.length > 0) {
          setIsAllowed(true);
        } else if (process.env.NODE_ENV === "production") {
          router.push(redirectTo);
        } else {
          setIsAllowed(true); // Allow in development even without subscription
        }
      } catch (error) {
        console.error("Error in subscription check:", error);
        if (process.env.NODE_ENV !== "production") {
          setIsAllowed(true);
        } else {
          router.push(redirectTo);
        }
      } finally {
        setIsLoading(false);
      }
    }

    checkSubscription();
  }, [router, redirectTo]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );
  }

  return isAllowed ? <>{children}</> : null;
}
