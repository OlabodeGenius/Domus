"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { Reveal } from "@/components/estate/reveal";
import { SiteFooter } from "@/components/estate/site-footer";
import { SiteHeader } from "@/components/estate/site-header";

export function SiteFrame({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  if (pathname.startsWith("/admin")) {
    return children;
  }

  if (pathname === "/") {
    return children;
  }

  return (
    <>
      <SiteHeader />
      <main className="flex flex-col gap-32 sm:gap-40">{children}</main>
      <SiteFooter />
      <Reveal />
    </>
  );
}
