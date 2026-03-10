"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AuthCard } from "@/components/auth/AuthCard";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

type Errors = {
  email?: string;
  senha?: string;
};

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [errors, setErrors] = useState<Errors>({});

  const canSubmit = useMemo(() => email.length > 0 && senha.length > 0, [email, senha]);

  function validate() {
    const nextErrors: Errors = {};

    if (!email.trim()) nextErrors.email = "Informe seu e-mail";

    if (!senha.trim()) nextErrors.senha = "Informe sua senha";

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    router.push("/map");
  }

  return (
    <AuthCard
      title="Entrar"
      subtitle="Mobilidade sustentável ao seu alcance"
    >
      <form className="space-y-4" onSubmit={onSubmit} noValidate>
        <Input
          label="E-mail"
          type="email"
          name="email"
          placeholder="voce@exemplo.com"
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

        <div className="flex items-center justify-end">
          <Link
            href="#"
            className="text-sm font-medium text-emerald-700 hover:text-emerald-800"
          >
            Esqueci minha senha
          </Link>
        </div>

        <Button type="submit" disabled={!canSubmit}>
          Entrar
        </Button>

        <div className="relative py-2">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200" />
          </div>
          <div className="relative flex justify-center">
            <span className="bg-white px-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
              ou
            </span>
          </div>
        </div>

        <Button type="button" variant="secondary">
          Entrar com Google
        </Button>

        <Button
          type="button"
          variant="ghost"
          onClick={() => router.push("/cadastro")}
        >
          Criar conta
        </Button>

        <p className="pt-2 text-center text-xs text-slate-500">
          Ao entrar, você concorda com os termos do EcoBike.
        </p>
      </form>
    </AuthCard>
  );
}
