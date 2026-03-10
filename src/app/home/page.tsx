"use client";

import { useRouter } from "next/navigation";
import { EcoBikeBrand } from "@/components/branding/EcoBikeBrand";
import { Button } from "@/components/ui/Button";

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#f8fafc] px-4 py-10 text-slate-900">
      <div className="mx-auto w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-6 flex justify-center">
          <EcoBikeBrand />
        </div>
        <h1 className="text-2xl font-bold tracking-tight">Bem-vindo ao EcoBike</h1>
        <p className="mt-2 text-slate-600">Login realizado com sucesso</p>

        <div className="mt-6">
          <Button type="button" onClick={() => router.push("/login")}>
            Sair
          </Button>
        </div>
      </div>
    </div>
  );
}
