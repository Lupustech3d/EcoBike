"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type NavItem = {
  href: string;
  label: string;
  icon: (active: boolean) => ReactNode;
};

function IconMap(active: boolean) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={active ? "h-5 w-5 text-emerald-700" : "h-5 w-5 text-slate-500"}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 18l-6 3V6l6-3 6 3 6-3v15l-6 3-6-3z" />
      <path d="M9 3v15" />
      <path d="M15 6v15" />
    </svg>
  );
}

function IconHistory(active: boolean) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={active ? "h-5 w-5 text-emerald-700" : "h-5 w-5 text-slate-500"}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 3v5h5" />
      <path d="M3.05 13a9 9 0 1 0 .5-4" />
      <path d="M12 7v5l3 3" />
    </svg>
  );
}

function IconWallet(active: boolean) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={active ? "h-5 w-5 text-emerald-700" : "h-5 w-5 text-slate-500"}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
      <path d="M21 12H17a2 2 0 0 0 0 4h4" />
      <path d="M16 3h5v5" />
      <path d="M16 8l5-5" />
    </svg>
  );
}

function IconProfile(active: boolean) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={active ? "h-5 w-5 text-emerald-700" : "h-5 w-5 text-slate-500"}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 21a8 8 0 1 0-16 0" />
      <circle cx="12" cy="8" r="4" />
    </svg>
  );
}

const items: NavItem[] = [
  { href: "/map", label: "Mapa", icon: IconMap },
  { href: "/history", label: "Histórico", icon: IconHistory },
  { href: "/wallet", label: "Carteira", icon: IconWallet },
  { href: "/profile", label: "Perfil", icon: IconProfile },
];

function isActivePath(pathname: string, href: string) {
  if (href === "/map") return pathname === "/map" || pathname.startsWith("/bike/") || pathname.startsWith("/ride/");
  return pathname === href;
}

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-20 border-t border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-md items-center justify-between px-4 py-2">
        {items.map((item) => {
          const active = isActivePath(pathname, item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex w-1/4 flex-col items-center gap-1 rounded-xl px-2 py-2"
            >
              {item.icon(active)}
              <span
                className={
                  active
                    ? "text-[11px] font-semibold text-emerald-700"
                    : "text-[11px] font-medium text-slate-500"
                }
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
