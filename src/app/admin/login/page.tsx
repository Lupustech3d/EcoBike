"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { EcoBikeBrand } from "@/components/branding/EcoBikeBrand";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

type Errors = {
  email?: string;
  senha?: string;
};

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export default function AdminLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [errors, setErrors] = useState<Errors>({});

  const canSubmit = useMemo(() => email.length > 0 && senha.length > 0, [email, senha]);

  function validate() {
    const nextErrors: Errors = {};

    if (!email.trim()) nextErrors.email = "Informe seu e-mail";
    else if (!isValidEmail(email.trim())) nextErrors.email = "Digite um e-mail válido";

    if (!senha.trim()) nextErrors.senha = "Informe sua senha";

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    router.push("/admin/dashboard");
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] px-4 py-10 text-slate-900">
      <div className="mx-auto w-full max-w-md">
        <div className="mb-6 flex justify-center">
          <EcoBikeBrand caption="Admin • Operação urbana em tempo real" />
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h1 className="text-xl font-extrabold tracking-tight">Login do Admin</h1>
          <p className="mt-2 text-sm text-slate-600">Acesse o painel para acompanhar bikes e corridas</p>

          <form className="mt-5 space-y-4" onSubmit={onSubmit} noValidate>
            <Input
              label="E-mail"
              type="email"
              name="email"
              placeholder="admin@ecobike.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={errors.email}
              autoComplete="email"
            />

            <Input
              label="Senha"
              type="password"
              name="senha"
              placeholder="Sua senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              error={errors.senha}
              autoComplete="current-password"
            />

            <Button type="submit" disabled={!canSubmit}>
              Entrar no painel
            </Button>

            <div className="flex items-center justify-between pt-1">
              <Link href="/login" className="text-sm font-semibold text-emerald-700 hover:text-emerald-800">
                Voltar ao app
              </Link>
              <span className="text-xs text-slate-500">Mock • sem auth real</span>
            </div>
          </form>
        </div>

        <p className="mt-6 text-center text-xs text-slate-500">
          Dica: qualquer e-mail válido + senha preenchida funciona por enquanto.
        </p>
      </div>
    </div>
  );
}
