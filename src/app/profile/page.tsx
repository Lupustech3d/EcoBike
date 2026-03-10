"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AppShell } from "@/components/app/AppShell";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";

export default function ProfilePage() {
  const router = useRouter();

  const [name, setName] = useState("Ana Eco");
  const [email, setEmail] = useState("teste@ecobike.com");
  const [phone, setPhone] = useState("(11) 99999-9999");
  const [editing, setEditing] = useState(false);

  return (
    <AppShell title="Perfil" subtitle="Sua conta EcoBike">
      <div className="space-y-4">
        <Card>
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-bold text-slate-900">Dados do usuário</p>
              <p className="mt-1 text-xs text-slate-600">Cidade sustentável, mobilidade real</p>
            </div>
            <Button
              type="button"
              variant="secondary"
              fullWidth={false}
              className="h-10"
              onClick={() => setEditing((v) => !v)}
            >
              {editing ? "Salvar" : "Editar perfil"}
            </Button>
          </div>

          <div className="mt-4 space-y-4">
            <Input
              label="Nome"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={!editing}
            />
            <Input
              label="E-mail"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={!editing}
            />
            <Input
              label="Telefone"
              name="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              disabled={!editing}
            />
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-white to-emerald-50">
          <p className="text-sm font-bold text-slate-900">Impacto</p>
          <p className="mt-2 text-sm text-slate-600">
            Estimativa: você economizou <span className="font-semibold text-emerald-700">2.4 kg</span> de CO₂ este mês (mock).
          </p>
        </Card>

        <Button type="button" variant="danger" onClick={() => router.push("/login")}>
          Sair
        </Button>

        <p className="pt-2 text-center text-xs text-slate-500">
          Mock UI: perfil sem persistência.
        </p>
      </div>
    </AppShell>
  );
}
