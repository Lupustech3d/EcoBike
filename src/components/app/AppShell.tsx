"use client";

import type { ReactNode } from "react";
import { EcoBikeBrand } from "@/components/branding/EcoBikeBrand";
import { BottomNav } from "@/components/app/BottomNav";

type Props = {
  title: string;
  subtitle?: string;
  right?: ReactNode;
  children: ReactNode;
};

export function AppShell({ title, subtitle, right, children }: Props) {
  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900">
      <div className="mx-auto w-full max-w-md px-4 pt-6 pb-24">
        <header className="mb-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="mb-3">
                <EcoBikeBrand />
              </div>
              <h1 className="text-xl font-bold tracking-tight">{title}</h1>
              {subtitle ? <p className="mt-1 text-sm text-slate-600">{subtitle}</p> : null}
            </div>
            {right ? <div className="pt-1">{right}</div> : null}
          </div>
        </header>

        {children}
      </div>

      <BottomNav />
    </div>
  );
}
