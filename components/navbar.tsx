import Link from "next/link";
import { FC } from "react";
import { ModeToggle } from "./mode-toggle";
import { UserButton } from "@clerk/nextjs";
import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";
import { MobileSidebar } from "./mobile-sidebar";

const font = Poppins({ weight: "600", subsets: ["latin"] });
interface navbarProps {}

export const Navbar: FC<navbarProps> = ({}) => {
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
              SumRev
            </h1>
          </Link>
        </div>
        <div className="flex items-center gap-x-3">
          {/* {!isPro && (
          <Button onClick={proModal.onOpen} size="sm" variant="premium">
            Upgrade
            <Sparkles className="h-4 w-4 fill-white text-white ml-2" />
          </Button>
        )} */}
          <ModeToggle />
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </>
  );
};
