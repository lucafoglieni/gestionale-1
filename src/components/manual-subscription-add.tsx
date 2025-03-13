"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { createClient } from "@/supabase/client";

export default function ManualSubscriptionAdd({ userId }: { userId: string }) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();

  const handleAddSubscription = async () => {
    setLoading(true);
    setMessage(null);
    setError(null);

    try {
      // Create a manual subscription record
      const { data, error } = await supabase
        .from("subscriptions")
        .insert({
          polar_id: `manual-${Date.now()}`,
          user_id: userId,
          status: "active",
          current_period_start: Date.now(),
          current_period_end: Date.now() + 30 * 24 * 60 * 60 * 1000, // 30 days from now
          cancel_at_period_end: false,
          amount: 1000, // $10.00
          started_at: Date.now(),
          currency: "USD",
          interval: "month",
          metadata: { manuallyAdded: true },
          custom_field_data: {},
          customer_id: `manual-customer-${Date.now()}`,
          polar_price_id: "manual-price-id",
        })
        .select();

      if (error) {
        throw error;
      }

      setMessage(
        "Subscription added successfully! Refresh the page to see changes.",
      );
    } catch (err: any) {
      console.error("Error adding subscription:", err);
      setError(err.message || "Failed to add subscription");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto mt-8">
      <CardHeader>
        <CardTitle>Add Temporary Subscription</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Label htmlFor="userId">User ID</Label>
            <Input id="userId" value={userId} disabled />
          </div>
          {message && <p className="text-green-600 text-sm">{message}</p>}
          {error && <p className="text-red-600 text-sm">{error}</p>}
        </div>
      </CardContent>
      <CardFooter>
        <Button
          onClick={handleAddSubscription}
          disabled={loading}
          className="w-full"
        >
          {loading ? "Adding..." : "Add Temporary Subscription"}
        </Button>
      </CardFooter>
    </Card>
  );
}
