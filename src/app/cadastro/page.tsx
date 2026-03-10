"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AuthCard } from "@/components/auth/AuthCard";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

type Errors = {
  nome?: string;
  email?: string;
  telefone?: string;
  cpf?: string;
  senha?: string;
  confirmarSenha?: string;
};

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function digitsOnly(value: string) {
  return value.replace(/\D/g, "");
}

export default function CadastroPage() {
  const router = useRouter();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [cpf, setCpf] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [aceitoTermos, setAceitoTermos] = useState(false);
  const [errors, setErrors] = useState<Errors>({});

  const canSubmit = useMemo(() => {
    return (
      nome.trim().length > 0 &&
      email.trim().length > 0 &&
      telefone.trim().length > 0 &&
      cpf.trim().length > 0 &&
      senha.trim().length > 0 &&
      confirmarSenha.trim().length > 0
    );
  }, [nome, email, telefone, cpf, senha, confirmarSenha]);

  function validate() {
    const nextErrors: Errors = {};

    if (!nome.trim()) nextErrors.nome = "Informe seu nome completo";

    if (!email.trim()) nextErrors.email = "Informe seu e-mail";
    else if (!isValidEmail(email.trim())) nextErrors.email = "Digite um e-mail válido";

    const telDigits = digitsOnly(telefone);
    if (!telefone.trim()) nextErrors.telefone = "Informe seu telefone";
    else if (telDigits.length < 10) nextErrors.telefone = "Digite um telefone válido";

    const cpfDigits = digitsOnly(cpf);
    if (!cpf.trim()) nextErrors.cpf = "Informe seu CPF";
    else if (cpfDigits.length !== 11) nextErrors.cpf = "Digite um CPF válido (11 dígitos)";

    if (!senha.trim()) nextErrors.senha = "Crie uma senha";
    else if (senha.trim().length < 6) nextErrors.senha = "A senha deve ter no mínimo 6 caracteres";

    if (!confirmarSenha.trim()) nextErrors.confirmarSenha = "Confirme sua senha";
    else if (senha !== confirmarSenha) nextErrors.confirmarSenha = "As senhas não coincidem";

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    router.push("/login");
  }

  return (
    <AuthCard title="Cadastro" subtitle="Crie sua conta para começar a pedalar">
      <form className="space-y-4" onSubmit={onSubmit} noValidate>
        <Input
          label="Nome completo"
          name="nome"
          placeholder="Seu nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          error={errors.nome}
          autoComplete="name"
        />

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
          label="Telefone"
          name="telefone"
          placeholder="(11) 99999-9999"
          value={telefone}
          onChange={(e) => setTelefone(e.target.value)}
          error={errors.telefone}
          inputMode="tel"
          autoComplete="tel"
        />

        <Input
          label="CPF"
          name="cpf"
          placeholder="000.000.000-00"
          value={cpf}
          onChange={(e) => setCpf(e.target.value)}
          error={errors.cpf}
          inputMode="numeric"
        />

        <Input
          label="Senha"
          type="password"
          name="senha"
          placeholder="Crie uma senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          error={errors.senha}
          autoComplete="new-password"
        />

        <Input
          label="Confirmar senha"
          type="password"
          name="confirmarSenha"
          placeholder="Repita a senha"
          value={confirmarSenha}
          onChange={(e) => setConfirmarSenha(e.target.value)}
          error={errors.confirmarSenha}
          autoComplete="new-password"
        />

        <label className="flex select-none items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
          <input
            type="checkbox"
            className="mt-1 h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-200"
            checked={aceitoTermos}
            onChange={(e) => setAceitoTermos(e.target.checked)}
          />
          <span>
            Aceito os termos de uso e política de privacidade
          </span>
        </label>

        <Button type="submit" disabled={!canSubmit}>
          Cadastrar
        </Button>

        <p className="text-center text-sm text-slate-600">
          Já tenho conta{" "}
          <Link href="/login" className="font-semibold text-emerald-700 hover:text-emerald-800">
            Entrar
          </Link>
        </p>

        {aceitoTermos ? null : (
          <p className="text-center text-xs text-slate-500">
            Você pode aceitar os termos depois.
          </p>
        )}
      </form>
    </AuthCard>
  );
}
