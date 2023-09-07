"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";

const LoginButton = ({}) => {
  const router = useRouter();
  return (
    <>
      <Button>
        <Link href="/sign-in">Login to Contribute</Link>
      </Button>
    </>
  );
};

export default LoginButton;
