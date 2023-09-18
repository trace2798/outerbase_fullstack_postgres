import { cn } from "@/lib/utils";
import { UserButton, auth } from "@clerk/nextjs";
import { Poppins } from "next/font/google";
import Link from "next/link";
import { FC } from "react";
import LoginButton from "./login-button";
import { MobileSidebar } from "./mobile-sidebar";
import { ModeToggle } from "./mode-toggle";
import { SearchSheet } from "./search-sheet";

const font = Poppins({ weight: "600", subsets: ["latin"] });
interface navbarProps {}

export const Navbar: FC<navbarProps> = ({}) => {
  const { userId } = auth();
  return (
    <>
      <div className="fixed w-full z-50 flex justify-between items-center py-2 px-4 h-16 border-b border-primary/10 dark:bg-zinc-900">
        <div className="flex items-center">
          <MobileSidebar />
          <Link href="/">
            <h1
              className={cn(
                "hidden md:block text-xl md:text-3xl font-bold text-primary",
                font.className
              )}
            >
              Summize
            </h1>
          </Link>
        </div>
        <div className="flex items-center gap-x-3">
          {userId && <SearchSheet />}
          <ModeToggle />
          {userId ? <UserButton afterSignOutUrl="/" /> : <LoginButton />}
        </div>
      </div>
    </>
  );
};
