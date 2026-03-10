"use client";

import type { ReactNode } from "react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminTopbar } from "@/components/admin/AdminTopbar";

type Props = {
  children: ReactNode;
};

export function AdminShell({ children }: Props) {
  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900">
      <div className="flex">
        <AdminSidebar />
        <div className="min-w-0 flex-1">
          <AdminTopbar />
          <main className="mx-auto max-w-6xl px-4 py-6 lg:px-6">{children}</main>
        </div>
      </div>
    </div>
  );
}
