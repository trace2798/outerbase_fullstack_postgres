"use client";

import { Book, Plus, Settings } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

import { cn } from "@/lib/utils";

interface SidebarProps {}

export const Sidebar = ({}: SidebarProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const onNavigate = (url: string) => {
    return router.push(url);
  };

  const routes = [
    {
      icon: Book,
      href: "/book",
      label: "Books",
    },
    {
      icon: Plus,
      href: "/book/new",
      label: "Publish",
    },
    {
      icon: Settings,
      href: "/settings",
      label: "Settings",
    },
  ];

  return (
    <div className="space-y-4 flex flex-col h-full text-primary bg-secondary">
      <div className="p-3 flex-1 flex justify-center">
        <div className="space-y-2">
          {routes.map((route) => (
            <div
              onClick={() => onNavigate(route.href)}
              key={route.href}
              className={cn(
                "text-muted-foreground text-xs group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-primary hover:bg-primary/10 rounded-lg transition",
                pathname === route.href && "bg-primary/10 text-primary"
              )}
            >
              <div className="flex flex-col gap-y-2 items-center flex-1">
                <route.icon className="h-5 w-5" />
                {route.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
