"use client";
import { FC } from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

interface LoginButtonProps {}

const LoginButton: FC<LoginButtonProps> = ({}) => {
  const router = useRouter();
  return (
    <>
      <Button onClick={() => router.push("/sign-in")} variant="ghost">
        Login
      </Button>
    </>
  );
};

export default LoginButton;
