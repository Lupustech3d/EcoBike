"use client";

import { useMemo, useState } from "react";
import { AppShell } from "@/components/app/AppShell";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

type Transaction = {
  id: string;
  date: string;
  description: string;
  amount: number;
};

const initialTransactions: Transaction[] = [
  { id: "TX-100", date: "08/03/2026", description: "Crédito adicionado", amount: 30.0 },
  { id: "TX-099", date: "07/03/2026", description: "Corrida ECO-245", amount: -6.21 },
  { id: "TX-098", date: "02/03/2026", description: "Corrida ECO-102", amount: -12.42 },
];

export default function WalletPage() {
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);

  const balance = useMemo(() => {
    return transactions.reduce((acc, t) => acc + t.amount, 0);
  }, [transactions]);

  function addCredit() {
    const next: Transaction = {
      id: `TX-${Math.floor(Math.random() * 900 + 100)}`,
      date: new Date().toLocaleDateString("pt-BR"),
      description: "Crédito adicionado",
      amount: 20.0,
    };
    setTransactions((prev) => [next, ...prev]);
  }

  return (
    <AppShell title="Carteira" subtitle="Gerencie seu saldo e pagamentos">
      <div className="space-y-4">
        <Card className="bg-gradient-to-br from-white to-emerald-50">
          <p className="text-xs font-semibold text-slate-500">Saldo</p>
          <p className="mt-2 text-3xl font-extrabold tracking-tight text-emerald-700">
            R$ {balance.toFixed(2)}
          </p>
          <div className="mt-4">
            <Button type="button" onClick={addCredit}>Adicionar crédito</Button>
          </div>
        </Card>

        <Card>
          <p className="text-sm font-bold text-slate-900">Método de pagamento</p>
          <p className="mt-2 text-sm text-slate-600">Cartão •••• 4242 (mock)</p>
        </Card>

        <div className="space-y-3">
          <p className="text-sm font-bold text-slate-900">Transações</p>
          {transactions.map((t) => (
            <Card key={t.id} className="p-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-slate-900">{t.description}</p>
                  <p className="mt-1 text-xs text-slate-500">{t.date} • {t.id}</p>
                </div>
                <p className={t.amount >= 0 ? "text-sm font-extrabold text-emerald-700" : "text-sm font-extrabold text-slate-900"}>
                  {t.amount >= 0 ? "+" : "-"}R$ {Math.abs(t.amount).toFixed(2)}
                </p>
              </div>
            </Card>
          ))}
        </div>

        <p className="pt-2 text-center text-xs text-slate-500">
          Mock UI: saldo e transações são simulados localmente.
        </p>
      </div>
    </AppShell>
  );
}
