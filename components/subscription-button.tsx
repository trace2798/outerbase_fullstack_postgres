"use client";

import axios from "axios";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

export const SubscriptionButton = ({ isPro = false }: { isPro: boolean }) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const onClick = async () => {
    try {
      setLoading(true);

      const response = await axios.get("/api/stripe");
      console.log(response.data, "RESPONSE");
      window.location.href = response.data;
    } catch (error) {
      toast({
        description: "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button size="sm" disabled={loading} onClick={onClick}>
      {isPro ? "Manage Subscription" : "Upgrade To Pro"}
    </Button>
  );
};
