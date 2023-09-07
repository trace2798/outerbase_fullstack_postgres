"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const LoginButton = ({}) => {
  const router = useRouter();
  return (
    <>
      <Button onClick={() => router.push("/sign-in")}>
        Login to Contribute
      </Button>
    </>
  );
};

export default LoginButton;
