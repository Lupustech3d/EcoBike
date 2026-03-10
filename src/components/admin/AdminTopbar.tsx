"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";

const titles: Record<string, string> = {
  "/admin/dashboard": "Dashboard",
  "/admin/bikes": "Bikes",
  "/admin/users": "Usuários",
  "/admin/rides": "Corridas",
  "/admin/reports": "Relatórios",
};

export function AdminTopbar() {
  const pathname = usePathname();
  const router = useRouter();

  const title = titles[pathname] ?? "Admin";

  return (
    <div className="sticky top-0 z-10 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-wrap items-start justify-between gap-3 px-4 py-3 sm:flex-nowrap sm:items-center lg:px-6">
        <div>
          <p className="text-xs font-semibold text-slate-500">EcoBike Admin</p>
          <h1 className="text-lg font-extrabold tracking-tight text-slate-900">{title}</h1>
        </div>

        <div className="flex w-full items-center justify-end gap-2 sm:w-auto">
          <Link
            href="/map"
            className="hidden rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 sm:inline"
          >
            Ver app
          </Link>
          <Button
            type="button"
            variant="secondary"
            fullWidth={false}
            className="h-9 px-3 text-xs sm:h-10 sm:text-sm"
            onClick={() => router.push("/login")}
          >
            Sair
          </Button>
        </div>
      </div>
    </div>
  );
}
