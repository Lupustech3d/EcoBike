import type { ReactNode } from "react";
import { EcoBikeBrand } from "@/components/branding/EcoBikeBrand";

type Props = {
  title: string;
  subtitle: string;
  children: ReactNode;
};

export function AuthCard({ title, subtitle, children }: Props) {
  return (
    <div className="min-h-screen bg-[#f8fafc] px-4 py-10 text-slate-900">
      <div className="mx-auto w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="mb-3 flex justify-center">
            <EcoBikeBrand />
          </div>
          <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
          <p className="mt-2 text-sm text-slate-600">{subtitle}</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          {children}
        </div>

        <p className="mt-6 text-center text-xs text-slate-500">
          Mobilidade urbana com energia limpa
        </p>
      </div>
    </div>
  );
}
