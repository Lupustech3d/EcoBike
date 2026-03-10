"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";

type Transaction = {
  id: string;
  type: "income" | "expense";
  category: string;
  description: string;
  amount: number;
  date: string;
  time: string;
  status: "completed" | "pending" | "failed";
};

const transactions: Transaction[] = [
  { id: "TRX-1001", type: "income", category: "Corrida", description: "RIDE-901 - ECO-311", amount: 12.42, date: "09/03/2026", time: "14:32", status: "completed" },
  { id: "TRX-1002", type: "income", category: "Corrida", description: "RIDE-873 - ECO-102", amount: 6.21, date: "09/03/2026", time: "09:15", status: "completed" },
  { id: "TRX-1003", type: "expense", category: "Manutenção", description: "Troca de pneu - ECO-245", amount: 85.00, date: "08/03/2026", time: "16:20", status: "completed" },
  { id: "TRX-1004", type: "income", category: "Recarga", description: "Crédito usuário #284", amount: 50.00, date: "08/03/2026", time: "11:45", status: "completed" },
  { id: "TRX-1005", type: "expense", category: "Energia", description: "Recarga estação Centro", amount: 120.50, date: "07/03/2026", time: "08:00", status: "completed" },
  { id: "TRX-1006", type: "income", category: "Corrida", description: "RIDE-841 - ECO-245", amount: 16.56, date: "07/03/2026", time: "18:45", status: "pending" },
  { id: "TRX-1007", type: "expense", category: "Manutenção", description: "Revisão preventiva - ECO-523", amount: 150.00, date: "06/03/2026", time: "14:00", status: "completed" },
  { id: "TRX-1008", type: "income", category: "Recarga", description: "Crédito usuário #192", amount: 100.00, date: "06/03/2026", time: "10:30", status: "completed" },
];

export default function FinanceiroPage() {
  const [filter, setFilter] = useState<"all" | "income" | "expense">("all");

  const filteredTransactions = transactions.filter((t) => {
    if (filter === "all") return true;
    return t.type === filter;
  });

  const totalIncome = transactions.filter((t) => t.type === "income" && t.status === "completed").reduce((sum, t) => sum + t.amount, 0);
  const totalExpense = transactions.filter((t) => t.type === "expense" && t.status === "completed").reduce((sum, t) => sum + t.amount, 0);
  const balance = totalIncome - totalExpense;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">Financeiro</h1>
        <p className="mt-1 text-sm text-slate-600">Gestão de receitas, despesas e fluxo de caixa</p>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <Card className="bg-gradient-to-br from-emerald-50 to-white p-5">
          <p className="text-xs font-semibold text-slate-500">Receita Total</p>
          <p className="mt-2 text-2xl font-extrabold tracking-tight text-emerald-700">
            R$ {totalIncome.toFixed(2)}
          </p>
          <p className="mt-2 text-xs text-slate-600">Últimos 7 dias</p>
        </Card>

        <Card className="bg-gradient-to-br from-red-50 to-white p-5">
          <p className="text-xs font-semibold text-slate-500">Despesas Total</p>
          <p className="mt-2 text-2xl font-extrabold tracking-tight text-red-700">
            R$ {totalExpense.toFixed(2)}
          </p>
          <p className="mt-2 text-xs text-slate-600">Últimos 7 dias</p>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-white p-5">
          <p className="text-xs font-semibold text-slate-500">Saldo Líquido</p>
          <p className={`mt-2 text-2xl font-extrabold tracking-tight ${balance >= 0 ? "text-blue-700" : "text-red-700"}`}>
            R$ {balance.toFixed(2)}
          </p>
          <p className="mt-2 text-xs text-slate-600">Últimos 7 dias</p>
        </Card>
      </div>

      <Card className="p-5">
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-bold text-slate-900">Transações Recentes</p>
            <p className="mt-1 text-xs text-slate-600">{filteredTransactions.length} registros</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilter("all")}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
                filter === "all" ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              Todas
            </button>
            <button
              onClick={() => setFilter("income")}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
                filter === "income" ? "bg-emerald-600 text-white" : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
              }`}
            >
              Receitas
            </button>
            <button
              onClick={() => setFilter("expense")}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
                filter === "expense" ? "bg-red-600 text-white" : "bg-red-50 text-red-700 hover:bg-red-100"
              }`}
            >
              Despesas
            </button>
          </div>
        </div>

        <div className="space-y-2">
          {filteredTransactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4 transition-colors hover:bg-slate-50 sm:flex-row sm:items-center sm:justify-between sm:gap-4"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full ${
                    transaction.type === "income" ? "bg-emerald-100" : "bg-red-100"
                  }`}
                >
                  {transaction.type === "income" ? (
                    <svg className="h-5 w-5 text-emerald-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
                    </svg>
                  ) : (
                    <svg className="h-5 w-5 text-red-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 13l-5 5m0 0l-5-5m5 5V6" />
                    </svg>
                  )}
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">{transaction.description}</p>
                  <p className="mt-0.5 text-xs text-slate-600">
                    {transaction.category} • {transaction.date} às {transaction.time}
                  </p>
                  <p className="mt-0.5 text-[10px] text-slate-500">{transaction.id}</p>
                </div>
              </div>
              <div className="text-left sm:text-right">
                <p
                  className={`text-lg font-extrabold ${
                    transaction.type === "income" ? "text-emerald-700" : "text-red-700"
                  }`}
                >
                  {transaction.type === "income" ? "+" : "-"}R$ {transaction.amount.toFixed(2)}
                </p>
                <span
                  className={`mt-1 inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                    transaction.status === "completed"
                      ? "bg-emerald-100 text-emerald-700"
                      : transaction.status === "pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {transaction.status === "completed" ? "Concluído" : transaction.status === "pending" ? "Pendente" : "Falhou"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-5">
        <p className="text-sm font-bold text-slate-900">Resumo por Categoria</p>
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <div className="rounded-xl bg-emerald-50 p-3">
            <p className="text-xs font-semibold text-slate-500">Corridas</p>
            <p className="mt-1 text-lg font-bold text-emerald-700">
              R$ {transactions.filter((t) => t.category === "Corrida").reduce((sum, t) => sum + t.amount, 0).toFixed(2)}
            </p>
          </div>
          <div className="rounded-xl bg-blue-50 p-3">
            <p className="text-xs font-semibold text-slate-500">Recargas</p>
            <p className="mt-1 text-lg font-bold text-blue-700">
              R$ {transactions.filter((t) => t.category === "Recarga").reduce((sum, t) => sum + t.amount, 0).toFixed(2)}
            </p>
          </div>
          <div className="rounded-xl bg-orange-50 p-3">
            <p className="text-xs font-semibold text-slate-500">Manutenção</p>
            <p className="mt-1 text-lg font-bold text-orange-700">
              R$ {transactions.filter((t) => t.category === "Manutenção").reduce((sum, t) => sum + t.amount, 0).toFixed(2)}
            </p>
          </div>
          <div className="rounded-xl bg-purple-50 p-3">
            <p className="text-xs font-semibold text-slate-500">Energia</p>
            <p className="mt-1 text-lg font-bold text-purple-700">
              R$ {transactions.filter((t) => t.category === "Energia").reduce((sum, t) => sum + t.amount, 0).toFixed(2)}
            </p>
          </div>
        </div>
      </Card>

      <p className="text-xs text-slate-500">Mock UI: dados financeiros simulados localmente.</p>
    </div>
  );
}
